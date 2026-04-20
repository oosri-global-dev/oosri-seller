import { FlexibleDiv, GridableDiv } from "../../../../components/lib/Box/styles";
import Select from "../../../../components/lib/Select";
import { Input } from "antd";
import { useEffect, useState } from "react";
import { CustomUpload } from "../../../../components/lib/CustomUpload";
import { createProduct, getUploadUrl } from "@/network/product";
import axios from "axios";
import Button from "@/components/lib/Button";
import { StyledModal } from "@/components/lib/NoBusinessModal/index.styles";
import { CustomInput } from "@/components/lib/CustomInput/index.styles";
import { sanitizeHTML } from "@/utils/sanitize-dom";
import TextEditor from "../../Product/text-editor";

const { TextArea } = Input;

// ── Per-image slot structure ──────────────────────────────────────────────────
const createSlot = () => ({
  file: null,      // File object (cleared after upload starts)
  url: null,       // Cloudinary secure_url after upload
  progress: 0,     // 0-100
  uploading: false,
  error: null,
});

const NUM_SLOTS = 4;

// ── Cloudinary upload helper ──────────────────────────────────────────────────
/**
 * Upload a single file using a backend-issued presigned URL.
 * Calls onProgress(percent) throughout.
 * Returns the Cloudinary secure_url on success.
 * Throws with a user-friendly message on failure.
 */
async function uploadToCloudinary(file, onProgress) {
  // 1. Get presigned params from our backend
  const response = await getUploadUrl(file.name);
  if (!response.success) {
    throw new Error(response.message || "Could not obtain upload credentials.");
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

  // 2. Build FormData — keys must exactly mirror the signed params.
  //    Do NOT add, remove, or change any value here; doing so invalidates the
  //    Cloudinary signature and causes the "Invalid Signature" error.
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", String(timestamp));
  formData.append("signature", signature);
  formData.append("public_id", publicId);
  formData.append("folder", folder);
  formData.append("tags", tags);
  formData.append("transformation", transformation);
  if (allowed_formats) formData.append("allowed_formats", allowed_formats);

  // 3. POST to Cloudinary with progress tracking
  try {
    const uploadRes = await axios.post(url, formData, {
      onUploadProgress: (evt) => {
        if (evt.total) {
          const pct = Math.round((evt.loaded * 100) / evt.total);
          onProgress(pct);
        }
      },
    });
    return uploadRes.data.secure_url;
  } catch (err) {
    const cloudinaryMsg =
      err.response?.data?.error?.message || err.message || "Upload failed";
    throw new Error(`Failed to upload ${file.name}: ${cloudinaryMsg}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────

export const CreateTab = ({
  subCategories,
  category,
  categoryName,
  selectedCategory,
}) => {
  // ── Image slots ────────────────────────────────────────────────────────────
  const [slots, setSlots] = useState([
    createSlot(),
    createSlot(),
    createSlot(),
    createSlot(),
  ]);

  // ── Product fields ────────────────────────────────────────────────────────
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [brandArtist, setBrandArtist] = useState("");
  const [weight, setWeight] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [productType, setProductType] = useState();
  const [regularPrice, setRegularPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [dynamicAttributes, setDynamicAttributes] = useState({});

  // ── UI state ──────────────────────────────────────────────────────────────
  const [openModal, setOpenModal] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [errorText, setErrorText] = useState(" ");
  const [clearImage, setClearImg] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryItem, setCategoryItem] = useState([]);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const setSlot = (index, patch) =>
    setSlots((prev) =>
      prev.map((s, i) => (i === index ? { ...s, ...patch } : s))
    );

  const handleAttributeChange = (code, value) => {
    setDynamicAttributes((prev) => ({ ...prev, [code]: value }));
  };

  const subcategoryIdValue = subCategory?._id || subCategory?.id;

  // ── Eager upload — fires as soon as seller picks a file ───────────────────
  const handleFileSelected = async (slotIndex, file) => {
    if (!file) return;

    // Mark slot as uploading
    setSlot(slotIndex, {
      file,
      url: null,
      progress: 0,
      uploading: true,
      error: null,
    });

    try {
      const url = await uploadToCloudinary(file, (pct) => {
        setSlot(slotIndex, { progress: pct });
      });

      setSlot(slotIndex, {
        url,
        progress: 100,
        uploading: false,
        error: null,
        file: null, // release reference; we have the URL
      });
    } catch (err) {
      setSlot(slotIndex, {
        uploading: false,
        progress: 0,
        error: err.message,
        url: null,
      });
    }
  };

  // ── Reset form ─────────────────────────────────────────────────────────────
  const resetForm = () => {
    setClearImg(true);
    setSlots([createSlot(), createSlot(), createSlot(), createSlot()]);
    setProductName("");
    setProductDescription("");
    setBrandArtist("");
    setWeight("");
    setProductType("");
    setRegularPrice("");
    setDiscountPrice("");
    setDiscountPercent("");
    setDynamicAttributes({});
    setSubCategory(null);
    setOpenModal(false);
    setModalError(false);
  };

  // ── Effects ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (subCategories) {
      const item = subCategories.map((sub) => ({
        value: sub.name,
        label: sub.name,
        _id: sub._id || sub.id,
      }));
      setCategoryItem(item);
      setSubCategory(item[0] || null);
    }
  }, [subCategories]);

  useEffect(() => {
    resetForm();
  }, [category]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Pricing helpers ────────────────────────────────────────────────────────
  const productTypeItem = [
    { value: "simple", label: "Simple" },
    { value: "variable", label: "Variable" },
  ];

  const effectivePrice =
    discountPrice &&
    Number(discountPrice) > 0 &&
    Number(discountPrice) < Number(regularPrice)
      ? Number(discountPrice)
      : Number(regularPrice || 0);

  const payoutAmount = (effectivePrice * 0.85).toFixed(2);

  const handleRegularPrice = (e) => {
    const val = e.target.value;
    setRegularPrice(val);
    if (val && discountPercent && Number(discountPercent) > 0) {
      setDiscountPrice(
        (Number(val) * (1 - Number(discountPercent) / 100)).toFixed(2)
      );
    }
  };

  const handleDiscountPrice = (e) => {
    const val = e.target.value;
    setDiscountPrice(val);
    if (val && regularPrice && Number(regularPrice) > 0) {
      const perc =
        ((Number(regularPrice) - Number(val)) / Number(regularPrice)) * 100;
      setDiscountPercent(perc.toFixed(2));
    } else if (!val) {
      setDiscountPercent("");
    }
  };

  const handleDiscountPercent = (e) => {
    const val = e.target.value;
    setDiscountPercent(val);
    if (val && regularPrice && Number(regularPrice) > 0) {
      setDiscountPrice(
        (Number(regularPrice) * (1 - Number(val) / 100)).toFixed(2)
      );
    } else if (!val) {
      setDiscountPrice("");
    }
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleCreateProduct = async () => {
    const cleanDescription = await sanitizeHTML(productDescription);
    const subcategoryIdString =
      subCategory?._id || subCategory?.id || null;

    setModalError(false);
    setIsSubmitting(true);

    try {
      // Any slot still uploading? Block submission.
      const stillUploading = slots.some((s) => s.uploading);
      if (stillUploading) {
        setModalError(true);
        setErrorText(
          "Please wait — some images are still uploading. Try again in a moment."
        );
        setOpenModal(true);
        setIsSubmitting(false);
        return;
      }

      // Collect successfully uploaded URLs
      const imageUrls = slots.map((s) => s.url).filter(Boolean);

      if (imageUrls.length === 0) {
        setModalError(true);
        setErrorText("At least one product image is required.");
        setOpenModal(true);
        setIsSubmitting(false);
        return;
      }

      // Check for slots that have a file chosen but failed to upload
      const failedSlots = slots.filter((s) => s.error);
      if (failedSlots.length > 0) {
        setModalError(true);
        setErrorText(
          `${failedSlots.length} image(s) failed to upload. Please remove them or retry before submitting.`
        );
        setOpenModal(true);
        setIsSubmitting(false);
        return;
      }

      if (discountPrice && Number(discountPrice) >= Number(regularPrice)) {
        setModalError(true);
        setErrorText("Discount Price must be less than Regular Price.");
        setOpenModal(true);
        setIsSubmitting(false);
        return;
      }

      const productObj = {
        categoryId: category,
        subcategoryId: subcategoryIdString,
        productName,
        productDescription: cleanDescription,
        brandArtist,
        images: imageUrls,          // Only Cloudinary URLs — no File objects
        regularPrice,
        discountPrice: discountPrice === "" ? null : Number(discountPrice),
        discount: discountPercent === "" ? 0 : Number(discountPercent),
        productType,
        attributes: dynamicAttributes,
      };

      await createProduct(productObj);
      setModalError(false);
      setOpenModal(true);
    } catch (errors) {
      setModalError(true);
      setOpenModal(true);
      setErrorText(
        errors.response?.data?.error ||
          errors.message ||
          "Failed to create product"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Any slot actively uploading right now?
  const anyUploading = slots.some((s) => s.uploading);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <FlexibleDiv className="tab__item">
        <FlexibleDiv className="container_wrapper" alignItems="start">
          {/* ── Left column ── */}
          <FlexibleDiv
            className="50%"
            flexDir="column"
            alignItems="start"
            gap="24px"
          >
            <FlexibleDiv justifyContent="start" alignItems="start" gap="16px">
              {/* Product Name */}
              <div className="product__item">
                <label htmlFor="productName">Product Name</label>
                <CustomInput
                  id="productName"
                  width={"100%"}
                  placeholder="Input product name"
                  backgroundColor="#FAFAFA"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
                <p>Do not exceed 40 characters while entering name</p>
              </div>
            </FlexibleDiv>

            {/* Subcategory */}
            <div className="product__item">
              <label htmlFor="subCategory">Product Category</label>
              <Select
                options={categoryItem}
                value={subCategory?.value || subCategory}
                onChange={(value) => {
                  const selected = categoryItem.find(
                    (item) => item.value === value
                  );
                  setSubCategory(selected);
                }}
                backgroundColor="#FAFAFA"
                width="100%"
              />
            </div>

            {/* Brand */}
            <div className="product__item">
              <label htmlFor="brandArtist">Brand</label>
              <CustomInput
                id="brandArtist"
                placeholder="Select product brand"
                backgroundColor="#FAFAFA"
                value={brandArtist}
                onChange={(e) => setBrandArtist(e.target.value)}
              />
            </div>

            {/* Product Type */}
            <div className="product__item">
              <label htmlFor="productType">Product Type</label>
              <Select
                placeholder="Input product display type"
                backgroundColor="#FAFAFA"
                value={productType}
                options={productTypeItem}
                onChange={(e) => setProductType(e)}
                width="100%"
              />
            </div>

            {/* Regular Price */}
            <div className="product__item">
              <label htmlFor="regularPrice">Regular Price (NGN)</label>
              <CustomInput
                id="regularPrice"
                placeholder="Input Product Price"
                value={regularPrice}
                backgroundColor="#FAFAFA"
                type="number"
                onChange={handleRegularPrice}
              />
            </div>

            {/* Discount % */}
            <div className="product__item">
              <label htmlFor="discountPercent">Discount (%) (Optional)</label>
              <CustomInput
                id="discountPercent"
                placeholder="e.g. 10"
                backgroundColor="#FAFAFA"
                onChange={handleDiscountPercent}
                type="number"
                value={discountPercent}
              />
            </div>

            {/* Discount Price */}
            <div className="product__item">
              <label htmlFor="discountPrice">Discount Price (NGN) (Optional)</label>
              <CustomInput
                id="discountPrice"
                placeholder="Input Discount Price"
                backgroundColor="#FAFAFA"
                onChange={handleDiscountPrice}
                type="number"
                value={discountPrice}
              />
              <p style={{ color: "grey", fontSize: "12px", marginTop: "4px" }}>
                Leave empty for no discount. Must be less than Regular Price.
              </p>
            </div>

            {/* Payout */}
            <div className="product__item">
              <label htmlFor="payout">Your Payout (NGN) — Estimated</label>
              <CustomInput
                id="payout"
                backgroundColor="#EEEEEE"
                type="number"
                value={payoutAmount}
                disabled
              />
              <p
                style={{
                  color: "var(--oosriPrimary)",
                  fontSize: "12px",
                  marginTop: "4px",
                }}
              >
                You receive 85% of the final buyer price ({effectivePrice} NGN).
              </p>
            </div>
          </FlexibleDiv>

          {/* ── Right column ── */}
          <FlexibleDiv
            flexDir="column"
            gap="24px"
            alignItems="start"
            width="100%"
          >
            {/* Image upload slots */}
            <FlexibleDiv className="img__upload" justifyContent="start">
              {/* Slot 0 & 1 — full-height */}
              <CustomUpload
                editable
                onFileSelected={(file) => handleFileSelected(0, file)}
                uploadProgress={slots[0].progress}
                uploadedUrl={slots[0].url}
                uploadError={slots[0].error}
                uploading={slots[0].uploading}
                clearImage={clearImage}
                setClearImg={setClearImg}
              />
              <CustomUpload
                editable
                onFileSelected={(file) => handleFileSelected(1, file)}
                uploadProgress={slots[1].progress}
                uploadedUrl={slots[1].url}
                uploadError={slots[1].error}
                uploading={slots[1].uploading}
                clearImage={clearImage}
                setClearImg={setClearImg}
              />

              {/* Slot 2 & 3 — stacked */}
              <FlexibleDiv
                flexDir="column"
                className="column_item"
                width="fit-content"
              >
                <CustomUpload
                  editable
                  onFileSelected={(file) => handleFileSelected(2, file)}
                  uploadProgress={slots[2].progress}
                  uploadedUrl={slots[2].url}
                  uploadError={slots[2].error}
                  uploading={slots[2].uploading}
                  clearImage={clearImage}
                  setClearImg={setClearImg}
                />
                <CustomUpload
                  editable
                  onFileSelected={(file) => handleFileSelected(3, file)}
                  uploadProgress={slots[3].progress}
                  uploadedUrl={slots[3].url}
                  uploadError={slots[3].error}
                  uploading={slots[3].uploading}
                  clearImage={clearImage}
                  setClearImg={setClearImg}
                />
              </FlexibleDiv>
            </FlexibleDiv>

            {/* Upload status hint */}
            {anyUploading && (
              <p
                style={{
                  color: "#3b82f6",
                  fontSize: "13px",
                  marginTop: "-12px",
                }}
              >
                Uploading images… please wait before submitting.
              </p>
            )}

            {/* Description */}
            <div className="product__item">
              <label htmlFor="productDescription">Product Description</label>
              <TextEditor
                placeholder="Minimum of 1000 words"
                width="1000px"
                value={productDescription}
                onChange={setProductDescription}
              />
            </div>
          </FlexibleDiv>
        </FlexibleDiv>

        {/* ── Dynamic Attributes ─────────────────────────────────────────── */}
        {selectedCategory?.attributes?.length > 0 && (
          <FlexibleDiv
            width="100%"
            margin="30px 0 0 0"
            flexDir="column"
            alignItems="start"
          >
            <h3
              style={{
                marginBottom: "16px",
                color: "#1A1A1A",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              Product Specifications
            </h3>
            <GridableDiv gridCol="1fr 1fr 1fr" gap="20px" width="100%">
              {selectedCategory.attributes.map((attrItem) => {
                const attr = attrItem.details;
                if (!attr) return null;

                return (
                  <div className="product__item" key={attr.code}>
                    <label htmlFor={attr.code}>{attr.label}</label>
                    {attr.type === "select" ? (
                      <Select
                        placeholder={`Select ${attr.label}`}
                        backgroundColor="#FAFAFA"
                        width="100%"
                        options={attr.options.map((opt) => ({
                          value: opt,
                          label: opt,
                        }))}
                        value={dynamicAttributes[attr.code]}
                        onChange={(value) =>
                          handleAttributeChange(attr.code, value)
                        }
                      />
                    ) : attr.type === "boolean" ? (
                      <Select
                        placeholder={`Select ${attr.label}`}
                        backgroundColor="#FAFAFA"
                        width="100%"
                        options={[
                          { value: true, label: "Yes" },
                          { value: false, label: "No" },
                        ]}
                        value={dynamicAttributes[attr.code]}
                        onChange={(value) =>
                          handleAttributeChange(attr.code, value)
                        }
                      />
                    ) : (
                      <CustomInput
                        placeholder={`Input ${attr.label}`}
                        backgroundColor="#FAFAFA"
                        type={attr.type === "number" ? "number" : "text"}
                        value={dynamicAttributes[attr.code] || ""}
                        onChange={(e) =>
                          handleAttributeChange(attr.code, e.target.value)
                        }
                      />
                    )}
                  </div>
                );
              })}
            </GridableDiv>
          </FlexibleDiv>
        )}

        {/* ── Submit button ────────────────────────────────────────────────── */}
        <FlexibleDiv
          justifyContent="end"
          margin="30px 0px 0px 0px"
          className="add_btn"
        >
          <Button
            onClick={handleCreateProduct}
            loading={isSubmitting}
            disabled={isSubmitting || anyUploading}
            title={anyUploading ? "Please wait for images to finish uploading" : undefined}
          >
            {anyUploading ? "Uploading images…" : "Add Product"}
          </Button>
        </FlexibleDiv>
      </FlexibleDiv>

      {/* ── Result Modal ──────────────────────────────────────────────────── */}
      <StyledModal
        maskClosable={true}
        open={openModal}
        centered
        closeIcon={null}
        className="modal"
        footer={null}
      >
        {modalError ? (
          <>
            <h2 style={{ textAlign: "center" }}>Product Submission Failed</h2>
            <p
              style={{
                textAlign: "center",
                margin: "16px 0px",
                color: "#777777",
              }}
            >
              {errorText}
            </p>
          </>
        ) : (
          <>
            <h2 style={{ textAlign: "center" }}>Product Submission Received</h2>
            <p
              style={{
                textAlign: "center",
                margin: "16px 0px",
                color: "#777777",
              }}
            >
              Thank you for adding your product to our platform. Your listing
              has been received and is now in the review process. Our team will
              carefully assess your product to ensure it meets our quality
              standards and guidelines.
            </p>
          </>
        )}

        <FlexibleDiv flexWrap="nowrap" gap="24px">
          <Button
            border="1px solid #FC5353"
            color="#FC5353"
            hoverBg="white"
            hoverColor="var(--oosriPrimary)"
            width="100%"
            onClick={() => {
              if (modalError) {
                setOpenModal(false);
              } else {
                resetForm();
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => (window.location = "/products")}
            border="1px solid #FC5353"
            color="white"
            backgroundColor="var(--oosriPrimary)"
            width="100%"
          >
            Go to All Products
          </Button>
        </FlexibleDiv>
      </StyledModal>
    </>
  );
};
