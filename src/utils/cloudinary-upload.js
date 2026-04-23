import axios from "axios";
import imageCompression from "browser-image-compression";
import { getUploadUrl } from "@/network/product";

export const createUploadSlot = (url = null) => ({
  file: null,
  url,
  stableUrl: url,
  progress: url ? 100 : 0,
  uploading: false,
  error: null,
  warning: null,
  stage: "idle",
});

const VALID_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
const MAX_FILE_SIZE_BYTES = 80 * 1024 * 1024;
const DEFAULT_COMPRESSION_OPTIONS = {
  maxSizeMB: 0.5,
  maxWidthOrHeight: 1280,
  useWebWorker: true,
  fileType: "image/webp",
};
const CLOUDINARY_UPLOAD_TIMEOUT_MS = 3 * 60 * 1000;

export const validateImageFile = (file) => {
  if (!file) {
    throw new Error("No image file provided.");
  }

  if (!VALID_MIME_TYPES.includes(file.type)) {
    throw new Error("Invalid type. Allowed: JPG, PNG, WEBP.");
  }

  if (file.name?.toLowerCase().endsWith(".jfif")) {
    throw new Error("JFIF files are not supported.");
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    const fileSizeMb = Math.round(file.size / 1024 / 1024);
    throw new Error(`File too large (${fileSizeMb} MB). Max 80 MB.`);
  }
};

export const compressImageForUpload = async (file) => {
  try {
    const compressedFile = await imageCompression(file, DEFAULT_COMPRESSION_OPTIONS);

    return {
      file: compressedFile,
      compressed: true,
      warning: null,
    };
  } catch (error) {
    console.error("Compression failed, falling back to original file:", error);

    return {
      file,
      compressed: false,
      warning:
        "We could not compress this image in the browser, so we uploaded the original file instead.",
    };
  }
};

const getUploadErrorMessage = (error, fileName) => {
  if (error.code === "ECONNABORTED") {
    return `Failed to upload ${fileName}: upload timed out. Please try again on a stronger connection or use a smaller image.`;
  }

  const cloudinaryMessage = error.response?.data?.error?.message;
  if (cloudinaryMessage) {
    return `Failed to upload ${fileName}: ${cloudinaryMessage}`;
  }

  if (error.message) {
    return `Failed to upload ${fileName}: ${error.message}`;
  }

  return `Failed to upload ${fileName}: upload failed`;
};

export const uploadProductImage = async (
  file,
  { onProgress = () => {}, onStageChange = () => {} } = {}
) => {
  validateImageFile(file);

  onStageChange("compressing");
  const compressionResult = await compressImageForUpload(file);
  const uploadFile = compressionResult.file;

  onStageChange("signing");
  const response = await getUploadUrl(file.name);

  if (!response?.success) {
    throw new Error(response?.message || "Could not obtain upload credentials.");
  }

  const {
    url,
    signature,
    timestamp,
    apiKey,
    publicId,
    folder,
    tags,
    transformation,
    allowed_formats,
  } = response.data;

  const formData = new FormData();
  formData.append("file", uploadFile);
  formData.append("api_key", apiKey);
  formData.append("timestamp", String(timestamp));
  formData.append("signature", signature);
  formData.append("public_id", publicId);
  formData.append("folder", folder);
  formData.append("tags", tags);
  formData.append("transformation", transformation);
  if (allowed_formats) {
    formData.append("allowed_formats", allowed_formats);
  }

  try {
    onStageChange("uploading");
    const uploadRes = await axios.post(url, formData, {
      timeout: CLOUDINARY_UPLOAD_TIMEOUT_MS,
      onUploadProgress: (evt) => {
        if (evt.total) {
          const percentCompleted = Math.round((evt.loaded * 100) / evt.total);
          onProgress(percentCompleted);
        }
      },
    });

    onStageChange("completed");

    return {
      secureUrl: uploadRes.data.secure_url,
      warning: compressionResult.warning,
      compressed: compressionResult.compressed,
    };
  } catch (error) {
    onStageChange("failed");
    throw new Error(getUploadErrorMessage(error, file.name));
  }
};
