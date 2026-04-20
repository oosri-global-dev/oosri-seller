import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { CustomUploaderWrapper } from "./index.styles";
import { IoMdAdd } from "react-icons/io";
import { MdErrorOutline, MdCheckCircleOutline } from "react-icons/md";

/**
 * CustomUpload
 *
 * Props:
 *  - onFileSelected(file)  → called immediately when a valid file is picked.
 *                            The parent is responsible for uploading.
 *  - uploadProgress        → 0–100 number. Show progress bar while > 0 && < 100.
 *  - uploadedUrl           → Cloudinary secure_url after a successful upload.
 *                            Used as the preview src.
 *  - uploadError           → Error string; shown in red on failure.
 *  - uploading             → boolean; disables interactions while true.
 *  - initialImage          → Bootstrap with an already-known URL (edit flow).
 *  - editable              → Whether the upload input is rendered.
 *  - title                 → Optional label above the widget.
 *  - clearImage            → Rising-edge trigger from parent to reset state.
 *  - setClearImg           → Acknowledge the reset.
 *
 * Legacy compat:
 *  - setFile(file)         → Still called when a file is selected so callers
 *                            that only use the File object continue to work.
 */
export function CustomUpload({
  onFileSelected,
  setFile,
  uploadProgress,
  uploadedUrl,
  uploadError,
  uploading,
  initialImage,
  editable,
  title,
  clearImage,
  setClearImg,
}) {
  const [localError, setLocalError] = useState(null);
  // Local object URL for immediate preview before upload completes
  const [localPreview, setLocalPreview] = useState(null);
  const localPreviewRef = useRef(null);

  // Sync with parent-provided uploadedUrl once upload succeeds
  const previewSrc = uploadedUrl || localPreview;

  // ── Reset ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (clearImage) {
      if (localPreviewRef.current) {
        URL.revokeObjectURL(localPreviewRef.current);
        localPreviewRef.current = null;
      }
      setLocalPreview(null);
      setLocalError(null);
      if (setFile) setFile(null);
      setClearImg(false);
    }
  }, [clearImage]); // eslint-disable-line react-hooks/exhaustive-deps

  // Revoke object URL on unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      if (localPreviewRef.current) {
        URL.revokeObjectURL(localPreviewRef.current);
      }
    };
  }, []);

  // ── File validation & selection ──────────────────────────────────────────
  const VALID_MIME = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
  const MAX_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB — generous; backend/Cloudinary will enforce further

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset previous errors
    setLocalError(null);

    // MIME type check
    if (!VALID_MIME.includes(file.type)) {
      setLocalError("Invalid type. Allowed: JPG, PNG, WEBP.");
      if (setFile) setFile(null);
      return;
    }

    // JFIF guard
    if (file.name.toLowerCase().endsWith(".jfif")) {
      setLocalError("JFIF files are not supported.");
      if (setFile) setFile(null);
      return;
    }

    // Max size check
    if (file.size > MAX_SIZE_BYTES) {
      setLocalError(`File too large (${Math.round(file.size / 1024 / 1024)} MB). Max 20 MB.`);
      if (setFile) setFile(null);
      return;
    }

    // Show local preview immediately while upload happens in background
    if (localPreviewRef.current) {
      URL.revokeObjectURL(localPreviewRef.current);
    }
    const objectUrl = URL.createObjectURL(file);
    localPreviewRef.current = objectUrl;
    setLocalPreview(objectUrl);

    // Notify parent
    if (setFile) setFile(file);
    if (onFileSelected) onFileSelected(file);

    // Reset the input so the same file can be re-selected after an error
    event.target.value = "";
  };

  // ── Derived display state ────────────────────────────────────────────────
  const isUploading = uploading && !uploadedUrl;
  const hasError = uploadError || localError;
  const progress = isUploading ? (uploadProgress ?? 0) : 0;

  return (
    <CustomUploaderWrapper>
      {title && <p className="upload__title">{title}</p>}

      <div
        className={`upload__container${isUploading ? " uploading" : ""}${hasError ? " has-error" : ""}`}
        style={{
          backgroundColor: editable ? "rgba(0, 0, 0, 0.5)" : "transparent",
          borderStyle: editable ? "solid" : "dashed",
        }}
      >
        {/* Hidden file input */}
        {editable && (
          <input
            type="file"
            className="upload__input"
            accept="image/jpeg, image/png, image/webp"
            onChange={handleFileChange}
            disabled={isUploading}
            aria-label="Upload product image"
          />
        )}

        {/* Preview / placeholder */}
        {previewSrc ? (
          <img
            className="upload__image"
            src={previewSrc}
            alt="Product preview"
          />
        ) : (
          <div className="placeholder__container">
            <IoMdAdd />
            <p className="main__text">Upload Image</p>
          </div>
        )}

        {/* Progress overlay */}
        {isUploading && (
          <div className="progress__overlay" aria-live="polite" aria-label={`Uploading: ${progress}%`}>
            <div className="progress__track">
              <div
                className="progress__bar"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="progress__label">{progress}%</p>
          </div>
        )}

        {/* Success badge */}
        {uploadedUrl && !isUploading && (
          <div className="status__badge success__badge" aria-label="Upload complete">
            <MdCheckCircleOutline />
          </div>
        )}
      </div>

      {/* Error message */}
      {hasError && (
        <p className="upload__error" role="alert">
          <MdErrorOutline style={{ verticalAlign: "middle", marginRight: 4 }} />
          {hasError}
        </p>
      )}
    </CustomUploaderWrapper>
  );
}

CustomUpload.defaultProps = {
  editable: false,
  title: "",
  initialImage: null,
  uploading: false,
  uploadProgress: 0,
  uploadedUrl: null,
  uploadError: null,
  onFileSelected: null,
  setFile: null,
};

CustomUpload.propTypes = {
  onFileSelected: PropTypes.func,
  /** @deprecated use onFileSelected */
  setFile: PropTypes.func,
  uploadProgress: PropTypes.number,
  uploadedUrl: PropTypes.string,
  uploadError: PropTypes.string,
  uploading: PropTypes.bool,
  initialImage: PropTypes.string,
  editable: PropTypes.bool,
  title: PropTypes.string,
  clearImage: PropTypes.bool,
  setClearImg: PropTypes.func,
};
