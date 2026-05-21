import { FlexibleDiv, GridableDiv } from "../../../../components/lib/Box/styles";
import Select from "../../../../components/lib/Select";
import { useEffect, useState, useMemo } from "react";
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

export const CreateTab = ({ categories = [] }) => {
  // ── Image slots ────────────────────────────────────────────────────────────
  const [slots, setSlots] = useState([
    createUploadSlot(),
    createUploadSlot(),
    createUploadSlot(),
    createUploadSlot(),
  ]);

  // ── Category selection (now internal) ─────────────────────────────────────
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const selectedCategory = useMemo(
    () => categories.find((c) => c._id === selectedCategoryId) || null,
    [categories, selectedCategoryId]
  );

  const categoryName = selectedCategory?.name || "";

  const categoryOptions = useMemo(
    () => categories.map((c) => ({ value: c._id, label: c.name })),
    [categories]
  );

  // Subcategory list derived from selected category
  const subCategoryList = useMemo(
    () =>
      (selectedCategory?.subcategories || []).map((sub) => ({
        value: sub.name,
        label: sub.name,
        _id: sub._id || sub.id,
      })),
    [selectedCategory]
  );

  // Sub-category field visibility and requirement
  const hasSubcategories    = subCategoryList.length > 0;
  const subcategoryRequired = hasSubcategories && selectedCategory?.requiresSubcategory !== false;

  // ── Product fields ────────────────────────────────────────────────────────
  const [productName, setProductName]               = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [brandArtist, setBrandArtist]               = useState("");
  const [weight, setWeight]                         = useState("");
  const [subCategory, setSubCategory]               = useState(null);
  const [productType, setProductType]               = useState();
  const [regularPrice, setRegularPrice]             = useState("");
  const [inStock, setInStock]                       = useState("");
  const [discountPrice, setDiscountPrice]           = useState("");
  const [discountPercent, setDiscountPercent]       = useState("");
  const [dynamicAttributes, setDynamicAttributes]   = useState({});

  // ── UI state ──────────────────────────────────────────────────────────────
  const [openModal, setOpenModal]       = useState(false);
  const [modalError, setModalError]     = useState(false);
  const [errorText, setErrorText]       = useState(" ");
  const [clearImage, setClearImg]       = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors]     = useState({});

  // ── Helpers ───────────────────────────────────────────────────────────────
  const setSlot = (index, patch) =>
    setSlots((prev) =>
      prev.map((s, i) => (i === index ? { ...s, ...patch } : s))
    );

  const handleAttributeChange = (code, value) => {
    setDynamicAttributes((prev) => ({ ...prev, [code]: value }));
    setFormErrors((prev) => {
      if (!prev.attributes?.[code]) return prev;
      return { ...prev, attributes: { ...prev.attributes, [code]: false } };
    });
  };

  // ── Eager upload ──────────────────────────────────────────────────────────
  const handleFileSelected = async (slotIndex, file) => {
    if (!file) return;

    if (formErrors.images) {
      setFormErrors((prev) => ({ ...prev, images: false }));
    }

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
        onProgress: (pct) => setSlot(slotIndex, { progress: pct }),
        onStageChange: (stage) => setSlot(slotIndex, { stage }),
      });

      setSlot(slotIndex, {
        url: result.secureUrl,
        stableUrl: result.secureUrl,
        progress: 100,
        uploading: false,
        error: null,
        warning: result.warning,
        file: null,
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

  // ── Full form reset (after successful submit) ──────────────────────────────
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
    setSelectedCategoryId("");
    setOpenModal(false);
    setModalError(false);
    setFormErrors({});
  };

  // ── When category changes, only reset category-dependent fields ────────────
  useEffect(() => {
    setSubCategory(subCategoryList[0] || null);
    setDynamicAttributes({});
    setFormErrors((prev) => {
      const { subCategory: _s, attributes: _a, category: _c, ...rest } = prev;
      return rest;
    });
  }, [selectedCategoryId]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Pricing helpers ────────────────────────────────────────────────────────
  const productTypeItem = [
    { value: "simple",   label: "Simple"   },
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
      setFormErrors((prev) => ({ ...prev, regularPrice: false, discountPrice: false }));
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
    const subcategoryIdString = subCategory?._id || subCategory?.id || null;

    setModalError(false);
    setFormErrors({});

    const errorsObj = {};
    if (!selectedCategoryId) errorsObj.category = true;
    if (!productName || !productName.trim()) errorsObj.productName = true;
    if (subcategoryRequired && !subcategoryIdString) errorsObj.subCategory = true;
    if (!productType) errorsObj.productType = true;
    if (!regularPrice) errorsObj.regularPrice = true;
    if (!inStock || Number(inStock) < 1) errorsObj.inStock = true;
    if (
      !productDescription ||
      productDescription.trim() === "<p><br></p>" ||
      !cleanDescription ||
      cleanDescription === "<p><br></p>"
    )
      errorsObj.productDescription = true;
    if (!slots.some((slot) => slot.url)) errorsObj.images = true;

    const attributeErrors = {};
    (selectedCategory?.attributes || []).forEach((attrItem) => {
      const attr = attrItem.details;
      if (!attr || !attrItem.isRequired) return;
      const value = dynamicAttributes[attr.code];
      const isEmptyArray = Array.isArray(value) && value.length === 0;
      const isEmptyValue =
        value === undefined || value === null || value === "" || isEmptyArray;
      if (isEmptyValue) attributeErrors[attr.code] = true;
    });

    if (Object.keys(attributeErrors).length > 0) {
      errorsObj.attributes = attributeErrors;
    }

    if (Object.keys(errorsObj).length > 0) {
      setFormErrors(errorsObj);
      setModalError(true);
      setErrorText(
        "Please complete all highlighted required fields before submitting."
      );
      setOpenModal(true);
      return;
    }

    setIsSubmitting(true);

    try {
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

      const imageUrls = slots.map((s) => s.url).filter(Boolean);
      if (imageUrls.length === 0) {
        setFormErrors((prev) => ({ ...prev, images: true }));
        setModalError(true);
        setErrorText("At least one product image is required.");
        setOpenModal(true);
        setIsSubmitting(false);
        return;
      }

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
        categoryId: selectedCategoryId,
        subcategoryId: subcategoryIdString,
        productName,
        productDescription: cleanDescription,
        brandArtist,
        images: imageUrls,
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

  const anyUploading = slots.some((s) => s.uploading);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <div className="create__form">

        {/* ── Section 1: Basic Info ── */}
        <div className="section__card">
          <div className="section__card__header">
            <h3>Basic Information</h3>
            <p>Help buyers identify and find your product</p>
          </div>
          <div className="section__card__body">

            {/* Category — full width, first */}
            <div className="product__item">
              <label htmlFor="category">
                Category <span className="req">*</span>
              </label>
              <Select
                id="category"
                showSearch
                optionFilterProp="label"
                placeholder="Search or select a category…"
                backgroundColor="#FAFAFA"
                width="100%"
                border={formErrors.category ? "1px solid #FC5353" : undefined}
                options={categoryOptions}
                value={selectedCategoryId || undefined}
                onChange={(val) => {
                  setSelectedCategoryId(val);
                  if (formErrors.category)
                    setFormErrors((prev) => ({ ...prev, category: false }));
                }}
                filterOption={(input, option) =>
                  (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                }
              />
              {formErrors.category ? (
                <p className="field__error">Please select a category.</p>
              ) : (
                <p className="field__hint">
                  This determines which attributes and sub-categories apply to your product.
                </p>
              )}
            </div>

            <div className="field__row">
              {/* Product Name */}
              <div className="product__item">
                <label htmlFor="productName">
                  Product Name <span className="req">*</span>
                </label>
                <CustomInput
                  id="productName"
                  width="100%"
                  placeholder="Enter product name (max 40 characters)"
                  backgroundColor="#FAFAFA"
                  style={{
                    border: formErrors.productName
                      ? "1px solid #FC5353"
                      : undefined,
                  }}
                  status={formErrors.productName ? "error" : undefined}
                  value={productName}
                  onChange={(e) => {
                    setProductName(e.target.value);
                    if (formErrors.productName)
                      setFormErrors((prev) => ({ ...prev, productName: false }));
                  }}
                />
                {formErrors.productName ? (
                  <p className="field__error">Product name is required.</p>
                ) : (
                  <p className="field__hint">Do not exceed 40 characters</p>
                )}
              </div>

              {/* Brand */}
              <div className="product__item">
                <label htmlFor="brandArtist">Brand / Artist</label>
                <CustomInput
                  id="brandArtist"
                  placeholder="Enter brand or artist name"
                  backgroundColor="#FAFAFA"
                  value={brandArtist}
                  onChange={(e) => setBrandArtist(e.target.value)}
                />
              </div>
            </div>

            <div className="field__row">
              {/* Subcategory — shown only when category has subs */}
              {hasSubcategories ? (
                <div className="product__item">
                  <label htmlFor="subCategory">
                    Sub-category{" "}
                    {subcategoryRequired
                      ? <span className="req">*</span>
                      : <span className="opt">(optional)</span>}
                  </label>
                  <Select
                    options={subCategoryList}
                    border={
                      formErrors.subCategory ? "1px solid #FC5353" : undefined
                    }
                    value={subCategory?.value || subCategory}
                    onChange={(value) => {
                      const selected = subCategoryList.find(
                        (item) => item.value === value
                      );
                      setSubCategory(selected);
                      if (formErrors.subCategory)
                        setFormErrors((prev) => ({
                          ...prev,
                          subCategory: false,
                        }));
                    }}
                    backgroundColor="#FAFAFA"
                    width="100%"
                  />
                  {formErrors.subCategory && (
                    <p className="field__error">
                      Please select a sub-category.
                    </p>
                  )}
                </div>
              ) : selectedCategoryId ? (
                <div className="product__item">
                  <label>Sub-category</label>
                  <div className="no__subcategory">
                    No sub-categories defined for this category
                  </div>
                </div>
              ) : null}

              {/* Product Type */}
              <div className="product__item">
                <label htmlFor="productType">
                  Product Type <span className="req">*</span>
                </label>
                <Select
                  placeholder="Select product type"
                  border={
                    formErrors.productType ? "1px solid #FC5353" : undefined
                  }
                  backgroundColor="#FAFAFA"
                  value={productType}
                  options={productTypeItem}
                  onChange={(e) => {
                    setProductType(e);
                    if (formErrors.productType)
                      setFormErrors((prev) => ({
                        ...prev,
                        productType: false,
                      }));
                  }}
                  width="100%"
                />
                {formErrors.productType && (
                  <p className="field__error">Please select a product type.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Section 2: Pricing & Inventory ── */}
        <div className="section__card">
          <div className="section__card__header">
            <h3>Pricing &amp; Inventory</h3>
            <p>Set your price, stock quantity, and optional discount</p>
          </div>
          <div className="section__card__body">
            <div className="field__row">
              {/* Regular Price */}
              <div className="product__item">
                <label htmlFor="regularPrice">
                  Regular Price (₦) <span className="req">*</span>
                </label>
                <CustomInput
                  id="regularPrice"
                  placeholder="e.g. 15000"
                  style={{
                    border: formErrors.regularPrice
                      ? "1px solid #FC5353"
                      : undefined,
                  }}
                  status={formErrors.regularPrice ? "error" : undefined}
                  value={regularPrice}
                  backgroundColor="#FAFAFA"
                  type="number"
                  onChange={(e) => {
                    handleRegularPrice(e);
                    if (formErrors.regularPrice)
                      setFormErrors((prev) => ({
                        ...prev,
                        regularPrice: false,
                      }));
                  }}
                />
                {formErrors.regularPrice && (
                  <p className="field__error">Regular price is required.</p>
                )}
              </div>

              {/* Stock */}
              <div className="product__item">
                <label htmlFor="inStock">
                  Stock Quantity <span className="req">*</span>
                </label>
                <CustomInput
                  id="inStock"
                  placeholder="How many units do you have?"
                  style={{
                    border: formErrors.inStock ? "1px solid #FC5353" : undefined,
                  }}
                  status={formErrors.inStock ? "error" : undefined}
                  backgroundColor="#FAFAFA"
                  type="number"
                  min={1}
                  value={inStock}
                  onChange={(e) => {
                    setInStock(e.target.value);
                    if (formErrors.inStock)
                      setFormErrors((prev) => ({ ...prev, inStock: false }));
                  }}
                />
                {formErrors.inStock && (
                  <p className="field__error">
                    Stock quantity is required (min 1).
                  </p>
                )}
              </div>
            </div>

            <div className="field__row">
              {/* Discount % */}
              <div className="product__item">
                <label htmlFor="discountPercent">Discount % (Optional)</label>
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
                <label htmlFor="discountPrice">
                  Discount Price (₦) (Optional)
                </label>
                <CustomInput
                  id="discountPrice"
                  placeholder="Discounted selling price"
                  backgroundColor="#FAFAFA"
                  style={{
                    border: formErrors.discountPrice
                      ? "1px solid #FC5353"
                      : undefined,
                  }}
                  status={formErrors.discountPrice ? "error" : undefined}
                  onChange={(e) => {
                    handleDiscountPrice(e);
                    if (formErrors.discountPrice)
                      setFormErrors((prev) => ({
                        ...prev,
                        discountPrice: false,
                      }));
                  }}
                  type="number"
                  value={discountPrice}
                />
                {formErrors.discountPrice ? (
                  <p className="field__error">
                    Discount price must be less than regular price.
                  </p>
                ) : (
                  <p className="field__hint">Leave empty for no discount.</p>
                )}
              </div>
            </div>

            {/* Payout preview */}
            {regularPrice && (
              <div className="payout__preview">
                <div className="payout__row">
                  <span>Selling price</span>
                  <strong>₦{Number(effectivePrice).toLocaleString()}</strong>
                </div>
                <div className="payout__row highlight">
                  <span>Your estimated payout (85%)</span>
                  <strong>₦{Number(payoutAmount).toLocaleString()}</strong>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Section 3: Product Images ── */}
        <div className="section__card">
          <div className="section__card__header">
            <h3>Product Images</h3>
            <p>Upload up to 4 images — first image is the cover</p>
          </div>
          <div className="section__card__body">
            <div
              className="img__upload__wrap"
              style={{
                outline: formErrors.images ? "2px solid #FC5353" : undefined,
                borderRadius: formErrors.images ? "10px" : undefined,
                padding: formErrors.images ? "8px" : undefined,
              }}
            >
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
              <div className="upload__stack">
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
              </div>
            </div>

            {formErrors.images && (
              <p className="field__error" style={{ marginTop: 8 }}>
                Please upload at least one product image.
              </p>
            )}
            {anyUploading && (
              <p className="upload__hint">
                Uploading images… please wait before submitting.
              </p>
            )}
          </div>
        </div>

        {/* ── Section 4: Description ── */}
        <div className="section__card">
          <div className="section__card__header">
            <h3>
              Product Description <span className="req">*</span>
            </h3>
            <p>Describe your product in detail — minimum 1000 words recommended</p>
          </div>
          <div className="section__card__body">
            <TextEditor
              placeholder="Describe your product in detail…"
              hasError={formErrors.productDescription}
              value={productDescription}
              onChange={(val) => {
                setProductDescription(val);
                if (formErrors.productDescription)
                  setFormErrors((prev) => ({
                    ...prev,
                    productDescription: false,
                  }));
              }}
            />
            {formErrors.productDescription && (
              <p className="field__error" style={{ marginTop: 8 }}>
                Product description is required.
              </p>
            )}
          </div>
        </div>

        {/* ── Section 5: Specifications ── */}
        {selectedCategory?.attributes?.length > 0 && (
          <div className="section__card">
            <div className="section__card__header">
              <h3>Product Specifications</h3>
              <p>Category-specific attributes for {categoryName}</p>
            </div>
            <div className="section__card__body">
              <GridableDiv gridCol="1fr 1fr 1fr" gap="20px" width="100%">
                {selectedCategory.attributes.map((attrItem) => {
                  const attr = attrItem.details;
                  if (!attr) return null;
                  return (
                    <div className="product__item" key={attr.code}>
                      <label htmlFor={attr.code}>
                        {attr.label}
                        {attrItem.isRequired && (
                          <span className="req"> *</span>
                        )}
                      </label>
                      {attr.type === "select" ? (
                        <Select
                          placeholder={`Select ${attr.label}`}
                          backgroundColor="#FAFAFA"
                          width="100%"
                          border={
                            formErrors.attributes?.[attr.code]
                              ? "1px solid #FC5353"
                              : undefined
                          }
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
                          border={
                            formErrors.attributes?.[attr.code]
                              ? "1px solid #FC5353"
                              : undefined
                          }
                          options={[
                            { value: true,  label: "Yes" },
                            { value: false, label: "No"  },
                          ]}
                          value={dynamicAttributes[attr.code]}
                          onChange={(value) =>
                            handleAttributeChange(attr.code, value)
                          }
                        />
                      ) : (
                        <CustomInput
                          placeholder={`Enter ${attr.label}`}
                          backgroundColor="#FAFAFA"
                          type={attr.type === "number" ? "number" : "text"}
                          style={{
                            border: formErrors.attributes?.[attr.code]
                              ? "1px solid #FC5353"
                              : undefined,
                          }}
                          status={
                            formErrors.attributes?.[attr.code]
                              ? "error"
                              : undefined
                          }
                          value={dynamicAttributes[attr.code] || ""}
                          onChange={(e) =>
                            handleAttributeChange(attr.code, e.target.value)
                          }
                        />
                      )}
                      {formErrors.attributes?.[attr.code] && (
                        <p className="field__error">
                          {attr.label} is required.
                        </p>
                      )}
                    </div>
                  );
                })}
              </GridableDiv>
            </div>
          </div>
        )}

        {/* ── Submit bar ── */}
        <div className="submit__bar">
          <p className="submit__note">
            {anyUploading
              ? "Images are uploading — please wait…"
              : "Review your listing before submitting. It will be reviewed by our team."}
          </p>
          <Button
            onClick={handleCreateProduct}
            loading={isSubmitting}
            disabled={isSubmitting || anyUploading}
            title={
              anyUploading
                ? "Please wait for images to finish uploading"
                : undefined
            }
          >
            {anyUploading ? "Uploading images…" : "Submit Product"}
          </Button>
        </div>

      </div>

      {/* ── Result Modal ── */}
      <StyledModal
        maskClosable
        open={openModal}
        centered
        closeIcon={null}
        footer={null}
      >
        {modalError ? (
          <>
            <h2 style={{ textAlign: "center" }}>Submission Failed</h2>
            <p style={{ textAlign: "center", margin: "16px 0", color: "#777" }}>
              {errorText}
            </p>
          </>
        ) : (
          <>
            <h2 style={{ textAlign: "center" }}>Product Submitted!</h2>
            <p style={{ textAlign: "center", margin: "16px 0", color: "#777" }}>
              Your listing has been received and is now in the review process.
              Our team will assess it against our quality standards.
            </p>
          </>
        )}

        <FlexibleDiv flexWrap="nowrap" gap="12px">
          <Button
            border="1px solid #FC5353"
            color="#FC5353"
            hoverBg="rgba(252,83,83,0.08)"
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
            {modalError ? "Close" : "Add Another"}
          </Button>
          <Button
            onClick={() => (window.location = "/products")}
            border="1px solid #FC5353"
            color="white"
            backgroundColor="var(--oosriPrimary)"
            width="100%"
          >
            Go to Products
          </Button>
        </FlexibleDiv>
      </StyledModal>
    </>
  );
};
