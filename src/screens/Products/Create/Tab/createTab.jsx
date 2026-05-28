import { FlexibleDiv, GridableDiv } from "../../../../components/lib/Box/styles";
import Select from "../../../../components/lib/Select";
import { useEffect, useState } from "react";
import { CustomUpload } from "../../../../components/lib/CustomUpload";
import { createProduct } from "@/network/product";
import Button from "@/components/lib/Button";
import { StyledModal } from "@/components/lib/NoBusinessModal/index.styles";
import { CustomInput } from "@/components/lib/CustomInput/index.styles";
import { sanitizeHTML } from "@/utils/sanitize-dom";
import TextEditor from "../../Product/text-editor";
import {
  createUploadSlot,
  uploadProductImage,
} from "@/utils/cloudinary-upload";

export const CreateTab = ({
  subCategories,
  category,
  categoryName,
  selectedCategory,
}) => {
  // ── Image slots ────────────────────────────────────────────────────────────
  const [slots, setSlots] = useState([
    createUploadSlot(),
    createUploadSlot(),
    createUploadSlot(),
    createUploadSlot(),
  ]);

  // ── Product fields ────────────────────────────────────────────────────────
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [brandArtist, setBrandArtist] = useState("");
  const [weight, setWeight] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [productType, setProductType] = useState();
  const [regularPrice, setRegularPrice] = useState("");
  const [inStock, setInStock] = useState("");
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
  const [formErrors, setFormErrors] = useState({});

  // ── Helpers ───────────────────────────────────────────────────────────────
  const setSlot = (index, patch) =>
    setSlots((prev) =>
      prev.map((s, i) => (i === index ? { ...s, ...patch } : s))
    );

  const handleAttributeChange = (code, value) => {
    setDynamicAttributes((prev) => ({ ...prev, [code]: value }));
    setFormErrors((prev) => {
      if (!prev.attributes?.[code]) {
        return prev;
      }

      return {
        ...prev,
        attributes: {
          ...prev.attributes,
          [code]: false,
        },
      };
    });
  };

  const subcategoryIdValue = subCategory?._id || subCategory?.id;

  // ── Eager upload — fires as soon as seller picks a file ───────────────────
  const handleFileSelected = async (slotIndex, file) => {
    if (!file) return;

    if (formErrors.images) {
      setFormErrors((prev) => ({
        ...prev,
        images: false,
      }));
    }

    // Mark slot as uploading
    setSlot(slotIndex, {
      file,
      url: null,
      progress: 0,
      uploading: true,
      error: null,
      warning: null,
      stage: "compressing",
    });

    try {
      const result = await uploadProductImage(file, {
        onProgress: (pct) => {
          setSlot(slotIndex, { progress: pct });
        },
        onStageChange: (stage) => {
          setSlot(slotIndex, { stage });
        },
      });

      setSlot(slotIndex, {
        url: result.secureUrl,
        stableUrl: result.secureUrl,
        progress: 100,
        uploading: false,
        error: null,
        warning: result.warning,
        file: null, // release reference; we have the URL
        stage: "completed",
      });
    } catch (err) {
      setSlot(slotIndex, {
        uploading: false,
        progress: 0,
        error: err.message,
        warning: null,
        url: null,
        file: null,
        stage: "failed",
      });
    }
  };

  // ── Reset form ─────────────────────────────────────────────────────────────
  const resetForm = () => {
    setClearImg(true);
    setSlots([
      createUploadSlot(),
      createUploadSlot(),
      createUploadSlot(),
      createUploadSlot(),
    ]);
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
    setFormErrors({});
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
    if (formErrors.regularPrice || formErrors.discountPrice) {
      setFormErrors((prev) => ({
        ...prev,
        regularPrice: false,
        discountPrice: false,
      }));
    }
    if (val && discountPercent && Number(discountPercent) > 0) {
      setDiscountPrice(
        (Number(val) * (1 - Number(discountPercent) / 100)).toFixed(2)
      );
    }
  };

  const handleDiscountPrice = (e) => {
    const val = e.target.value;
    setDiscountPrice(val);
    if (formErrors.discountPrice) {
      setFormErrors((prev) => ({ ...prev, discountPrice: false }));
    }
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
    if (formErrors.discountPrice) {
      setFormErrors((prev) => ({ ...prev, discountPrice: false }));
    }
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
    setFormErrors({});

    const errorsObj = {};
    if (!productName || !productName.trim()) errorsObj.productName = true;
    if (!subcategoryIdString) errorsObj.subCategory = true;
    if (!productType) errorsObj.productType = true;
    if (!regularPrice) errorsObj.regularPrice = true;
    if (!inStock || Number(inStock) < 1) errorsObj.inStock = true;
    if (!productDescription || productDescription.trim() === "<p><br></p>" || !cleanDescription || cleanDescription === "<p><br></p>") errorsObj.productDescription = true;
    if (!slots.some((slot) => slot.url)) errorsObj.images = true;

    const attributeErrors = {};
    (selectedCategory?.attributes || []).forEach((attrItem) => {
      const attr = attrItem.details;
      if (!attr || !attrItem.isRequired) {
        return;
      }

      const value = dynamicAttributes[attr.code];
      const isEmptyArray = Array.isArray(value) && value.length === 0;
      const isEmptyValue =
        value === undefined || value === null || value === "" || isEmptyArray;

      if (isEmptyValue) {
        attributeErrors[attr.code] = true;
      }
    });

    if (Object.keys(attributeErrors).length > 0) {
      errorsObj.attributes = attributeErrors;
    }

    if (Object.keys(errorsObj).length > 0) {
      setFormErrors(errorsObj);
      setModalError(true);
      setErrorText("Please complete all highlighted required fields before submitting.");
      setOpenModal(true);
      return;
    }

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
        setFormErrors((prev) => ({ ...prev, images: true }));
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
        setFormErrors((prev) => ({ ...prev, discountPrice: true }));
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
        inStock: Number(inStock),
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
                  style={{ border: formErrors.productName ? "1px solid #FC5353" : undefined }}
                  status={formErrors.productName ? "error" : undefined}
                  borderColor={formErrors.productName ? "#FC5353" : undefined}
                  value={productName}
                  onChange={(e) => {
                    setProductName(e.target.value);
                    if (formErrors.productName) setFormErrors((prev) => ({ ...prev, productName: false }));
                  }}
                />
                <p>Do not exceed 40 characters while entering name</p>
              </div>
            </FlexibleDiv>

            {/* Subcategory */}
            <div className="product__item">
              <label htmlFor="subCategory">Product Category</label>
              <Select
                options={categoryItem}
                border={formErrors.subCategory ? "1px solid #FC5353" : undefined}
                value={subCategory?.value || subCategory}
                onChange={(value) => {
                  const selected = categoryItem.find(
                    (item) => item.value === value
                  );
                  setSubCategory(selected);
                  if (formErrors.subCategory) setFormErrors((prev) => ({ ...prev, subCategory: false }));
                }}
                backgroundColor="#FAFAFA"
                width="100%"
              />
              {formErrors.subCategory && (
                <p style={{ color: "#FC5353", fontSize: "12px", marginTop: "4px" }}>
                  Please select a product category.
                </p>
              )}
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
                border={formErrors.productType ? "1px solid #FC5353" : undefined}
                backgroundColor="#FAFAFA"
                value={productType}
                options={productTypeItem}
                onChange={(e) => {
                  setProductType(e);
                  if (formErrors.productType) setFormErrors((prev) => ({ ...prev, productType: false }));
                }}
                width="100%"
              />
              {formErrors.productType && (
                <p style={{ color: "#FC5353", fontSize: "12px", marginTop: "4px" }}>
                  Please select a product type.
                </p>
              )}
            </div>

            {/* Regular Price */}
            <div className="product__item">
              <label htmlFor="regularPrice">Regular Price (NGN)</label>
              <CustomInput
                id="regularPrice"
                placeholder="Input Product Price"
                style={{ border: formErrors.regularPrice ? "1px solid #FC5353" : undefined }}
                status={formErrors.regularPrice ? "error" : undefined}
                borderColor={formErrors.regularPrice ? "#FC5353" : undefined}
                value={regularPrice}
                backgroundColor="#FAFAFA"
                type="number"
                onChange={(e) => {
                  handleRegularPrice(e);
                  if (formErrors.regularPrice) setFormErrors((prev) => ({ ...prev, regularPrice: false }));
                }}
              />
              {formErrors.regularPrice && (
                <p style={{ color: "#FC5353", fontSize: "12px", marginTop: "4px" }}>
                  Regular price is required.
                </p>
              )}
            </div>

            {/* Stock quantity */}
            <div className="product__item">
              <label htmlFor="inStock">Quantity Available (Stock)</label>
              <CustomInput
                id="inStock"
                placeholder="How many units do you have?"
                style={{ border: formErrors.inStock ? "1px solid #FC5353" : undefined }}
                status={formErrors.inStock ? "error" : undefined}
                borderColor={formErrors.inStock ? "#FC5353" : undefined}
                backgroundColor="#FAFAFA"
                type="number"
                min={1}
                value={inStock}
                onChange={(e) => {
                  setInStock(e.target.value);
                  if (formErrors.inStock) setFormErrors((prev) => ({ ...prev, inStock: false }));
                }}
              />
              {formErrors.inStock && (
                <p style={{ color: "#FC5353", fontSize: "12px", marginTop: "4px" }}>
                  Stock quantity is required (minimum 1).
                </p>
              )}
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
                style={{ border: formErrors.discountPrice ? "1px solid #FC5353" : undefined }}
                status={formErrors.discountPrice ? "error" : undefined}
                borderColor={formErrors.discountPrice ? "#FC5353" : undefined}
                onChange={(e) => {
                  handleDiscountPrice(e);
                  if (formErrors.discountPrice) setFormErrors((prev) => ({ ...prev, discountPrice: false }));
                }}
                type="number"
                value={discountPrice}
              />
              <p style={{ color: "grey", fontSize: "12px", marginTop: "4px" }}>
                Leave empty for no discount. Must be less than Regular Price.
              </p>
              {formErrors.discountPrice && (
                <p style={{ color: "#FC5353", fontSize: "12px", marginTop: "4px" }}>
                  Discount price must be less than regular price.
                </p>
              )}
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
            <FlexibleDiv
              className="img__upload"
              justifyContent="start"
              style={{
                outline: formErrors.images ? "1px solid #FC5353" : undefined,
                borderRadius: formErrors.images ? "8px" : undefined,
                padding: formErrors.images ? "8px" : undefined,
              }}
            >
              {/* Slot 0 & 1 — full-height */}
              <CustomUpload
                editable
                onFileSelected={(file) => handleFileSelected(0, file)}
                uploadProgress={slots[0].progress}
                uploadedUrl={slots[0].url}
                uploadError={slots[0].error}
                uploadWarning={slots[0].warning}
                uploadStage={slots[0].stage}
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
                uploadWarning={slots[1].warning}
                uploadStage={slots[1].stage}
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
                  uploadWarning={slots[2].warning}
                  uploadStage={slots[2].stage}
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
                  uploadWarning={slots[3].warning}
                  uploadStage={slots[3].stage}
                  uploading={slots[3].uploading}
                  clearImage={clearImage}
                  setClearImg={setClearImg}
                />
              </FlexibleDiv>
            </FlexibleDiv>
            {formErrors.images && (
              <p
                style={{
                  color: "#FC5353",
                  fontSize: "12px",
                  marginTop: "-12px",
                }}
              >
                Please upload at least one product image.
              </p>
            )}

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
                hasError={formErrors.productDescription}
                value={productDescription}
                onChange={(val) => {
                  setProductDescription(val);
                  if (formErrors.productDescription) setFormErrors((prev) => ({ ...prev, productDescription: false }));
                }}
              />
              {formErrors.productDescription && (
                <p style={{ color: "#FC5353", fontSize: "12px", marginTop: "4px" }}>
                  Product description is required.
                </p>
              )}
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
                        border={formErrors.attributes?.[attr.code] ? "1px solid #FC5353" : undefined}
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
                        border={formErrors.attributes?.[attr.code] ? "1px solid #FC5353" : undefined}
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
                        style={{ border: formErrors.attributes?.[attr.code] ? "1px solid #FC5353" : undefined }}
                        status={formErrors.attributes?.[attr.code] ? "error" : undefined}
                        borderColor={formErrors.attributes?.[attr.code] ? "#FC5353" : undefined}
                        value={dynamicAttributes[attr.code] || ""}
                        onChange={(e) =>
                          handleAttributeChange(attr.code, e.target.value)
                        }
                      />
                    )}
                    {formErrors.attributes?.[attr.code] && (
                      <p style={{ color: "#FC5353", fontSize: "12px", marginTop: "4px" }}>
                        {attr.label} is required.
                      </p>
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
