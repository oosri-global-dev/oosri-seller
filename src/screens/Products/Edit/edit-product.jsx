import { useEffect, useState, useMemo } from "react";
import { CreateProductPageWrapper } from "../Create/index.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import Select from "@/components/lib/Select";
import { StyledModal } from "@/components/lib/NoBusinessModal/index.styles";
import { CustomInput } from "@/components/lib/CustomInput/index.styles";
import { CustomUpload } from "@/components/lib/CustomUpload";
import { editProduct } from "@/network/product";
import Button from "@/components/lib/Button";
import CustomLoader from "@/components/lib/CustomLoader";
import "react-quill/dist/quill.snow.css";
import { sanitizeHTML } from "@/utils/sanitize-dom";
import TextEditor from "@/screens/Products/Product/text-editor";
import {
  createUploadSlot,
  uploadProductImage,
} from "@/utils/cloudinary-upload";
import { Select as AntSelect } from "antd";

const NUM_SLOTS = 4;

const buildInitialSlots = (images = []) => {
  const existingSlots = images
    .slice(0, NUM_SLOTS)
    .map((imageUrl) => createUploadSlot(imageUrl));

  while (existingSlots.length < NUM_SLOTS) {
    existingSlots.push(createUploadSlot());
  }

  return existingSlots;
};

export default function EditProduct({
  data,
  id,
  setEdit,
  fetchData,
  categories = [],
}) {
  const initialCategoryId =
    data?.category?._id ||
    (typeof data?.category === "string" ? data.category : "") ||
    "";

  const initialSubcategoryId = (() => {
    const sc = data?.subcategory;
    if (!sc) return null;
    return sc._id || sc.id || sc;
  })();

  const [slots, setSlots] = useState(() => buildInitialSlots(data?.images));
  const [productName, setProductName] = useState(data?.productName || "");
  const [productDescription, setProductDescription] = useState(
    data?.productDescription || ""
  );
  const [brandArtist, setBrandArtist] = useState(data?.brandArtist || "");
  const [selectedCategoryId, setSelectedCategoryId] = useState(initialCategoryId);
  const [subCategory, setSubCategory] = useState(initialSubcategoryId);
  const [productType, setProductType] = useState(data?.productType || "simple");
  const [regularPrice, setRegularPrice] = useState(data?.regularPrice || "");
  const [discountPrice, setDiscountPrice] = useState(data?.discountPrice ?? "");
  const [discountPercent, setDiscountPercent] = useState(
    data?.discount ? String(data.discount) : ""
  );
  const [dynamicAttributes, setDynamicAttributes] = useState(
    data?.attributes || {}
  );
  const [modalError, setModalError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stock, setStock] = useState(data?.inStock || 0);
  const [formErrors, setFormErrors] = useState({});

  /* ── Derived category/subcategory state ── */
  const categoryOptions = useMemo(
    () => categories.map((c) => ({ value: c._id, label: c.name })),
    [categories]
  );

  const selectedCategory = useMemo(
    () => categories.find((c) => c._id === selectedCategoryId) || null,
    [categories, selectedCategoryId]
  );

  const subCategoryList = useMemo(
    () => selectedCategory?.subcategories || [],
    [selectedCategory]
  );

  const subCategoryOptions = useMemo(
    () => subCategoryList.map((sub) => ({ value: sub._id || sub.name, label: sub.name })),
    [subCategoryList]
  );

  const hasSubcategories    = subCategoryList.length > 0;
  const subcategoryRequired = hasSubcategories && selectedCategory?.requiresSubcategory !== false;

  /* Reset subcategory + attributes when category changes (skip initial mount) */
  const [categoryInitialized, setCategoryInitialized] = useState(false);
  useEffect(() => {
    if (!categoryInitialized) {
      setCategoryInitialized(true);
      return;
    }
    setSubCategory(null);
    setDynamicAttributes({});
    setFormErrors((prev) => {
      const { subCategory: _s, attributes: _a, category: _c, ...rest } = prev;
      return rest;
    });
  }, [selectedCategoryId]);

  const setSlot = (index, patch) =>
    setSlots((prev) =>
      prev.map((slot, slotIndex) =>
        slotIndex === index ? { ...slot, ...patch } : slot
      )
    );

  const handleFileSelected = async (slotIndex, file) => {
    if (!file) return;

    if (formErrors.images) {
      setFormErrors((prev) => ({ ...prev, images: false }));
    }

    const previousUrl = slots[slotIndex]?.stableUrl || null;

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
        onProgress: (progress) => setSlot(slotIndex, { progress }),
        onStageChange: (stage)  => setSlot(slotIndex, { stage }),
      });

      setSlot(slotIndex, {
        file: null,
        url: result.secureUrl,
        stableUrl: result.secureUrl,
        progress: 100,
        uploading: false,
        error: null,
        warning: result.warning,
        stage: "completed",
      });
    } catch (error) {
      setSlot(slotIndex, {
        file: null,
        url: previousUrl,
        progress: 0,
        uploading: false,
        error: error.message,
        warning: null,
        stage: "failed",
      });
    }
  };

  const handleAttributeChange = (code, value) => {
    setDynamicAttributes((prev) => ({ ...prev, [code]: value }));
    setFormErrors((prev) => {
      if (!prev.attributes?.[code]) return prev;
      return { ...prev, attributes: { ...prev.attributes, [code]: false } };
    });
  };

  const validateForm = async () => {
    const cleanDescription = await sanitizeHTML(productDescription);
    const imageUrls = slots.map((slot) => slot.url).filter(Boolean);
    const nextErrors = {};
    const attributeErrors = {};

    if (!selectedCategoryId) nextErrors.category = true;

    if (!productName?.trim()) nextErrors.productName = true;

    if (subcategoryRequired && !subCategory) nextErrors.subCategory = true;

    if (!productType) nextErrors.productType = true;

    if (!regularPrice) nextErrors.regularPrice = true;

    if (
      !productDescription ||
      productDescription.trim() === "<p><br></p>" ||
      !cleanDescription ||
      cleanDescription === "<p><br></p>"
    ) {
      nextErrors.productDescription = true;
    }

    if (imageUrls.length === 0) nextErrors.images = true;

    const categoryAttributes = selectedCategory?.attributes || [];
    categoryAttributes.forEach((attrItem) => {
      const detail = attrItem.attributeId;
      if (!detail || !attrItem.isRequired) return;
      const value = dynamicAttributes[detail.code];
      const isEmpty =
        value === undefined ||
        value === null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0);
      if (isEmpty) attributeErrors[detail.code] = true;
    });

    if (Object.keys(attributeErrors).length > 0) {
      nextErrors.attributes = attributeErrors;
    }

    setFormErrors(nextErrors);
    return { cleanDescription, hasErrors: Object.keys(nextErrors).length > 0, imageUrls };
  };

  const closeModal = async () => {
    if (!modalError) {
      await fetchData();
      setEdit(false);
      return;
    }
    setOpenModal(false);
  };

  const effectivePrice =
    discountPrice &&
    Number(discountPrice) > 0 &&
    Number(discountPrice) < Number(regularPrice)
      ? Number(discountPrice)
      : Number(regularPrice || 0);

  const payoutAmount = (effectivePrice * 0.85).toFixed(2);

  const handleRegularPrice = (e) => {
    const value = e.target.value;
    setRegularPrice(value);
    if (formErrors.regularPrice || formErrors.discountPrice) {
      setFormErrors((prev) => ({ ...prev, regularPrice: false, discountPrice: false }));
    }
    if (value && discountPercent && Number(discountPercent) > 0) {
      setDiscountPrice(
        (Number(value) * (1 - Number(discountPercent) / 100)).toFixed(2)
      );
    }
  };

  const handleDiscountPrice = (e) => {
    const value = e.target.value;
    setDiscountPrice(value);
    if (formErrors.discountPrice) {
      setFormErrors((prev) => ({ ...prev, discountPrice: false }));
    }
    if (value && regularPrice && Number(regularPrice) > 0) {
      const pct = ((Number(regularPrice) - Number(value)) / Number(regularPrice)) * 100;
      setDiscountPercent(pct.toFixed(2));
    } else if (!value) {
      setDiscountPercent("");
    }
  };

  const handleDiscountPercent = (e) => {
    const value = e.target.value;
    setDiscountPercent(value);
    if (formErrors.discountPrice) {
      setFormErrors((prev) => ({ ...prev, discountPrice: false }));
    }
    if (value && regularPrice && Number(regularPrice) > 0) {
      setDiscountPrice(
        (Number(regularPrice) * (1 - Number(value) / 100)).toFixed(2)
      );
    } else if (!value) {
      setDiscountPrice("");
    }
  };

  const handleEdit = async () => {
    setLoading(true);
    setModalError(false);
    setErrorText("");

    try {
      const { cleanDescription, hasErrors, imageUrls } = await validateForm();

      if (hasErrors) {
        throw new Error("Please complete all highlighted required fields before saving.");
      }

      if (slots.some((slot) => slot.uploading)) {
        throw new Error("Please wait for image uploads to finish before saving this product.");
      }

      const failedSlots = slots.filter((slot) => slot.error);
      if (failedSlots.length > 0) {
        throw new Error(
          `${failedSlots.length} image(s) failed to upload. Please re-upload them before saving.`
        );
      }

      if (
        discountPrice &&
        regularPrice &&
        Number(discountPrice) >= Number(regularPrice)
      ) {
        setFormErrors((prev) => ({ ...prev, discountPrice: true }));
        throw new Error("Discount Price must be less than Regular Price.");
      }

      const subcategoryId = subCategory || null;

      const payload = {
        categoryId: selectedCategoryId,
        subcategoryId,
        productName,
        productDescription: cleanDescription,
        brandArtist,
        images: imageUrls,
        regularPrice,
        discountPrice: discountPrice === "" ? null : Number(discountPrice),
        discount: discountPercent === "" ? 0 : Number(discountPercent),
        productType,
        inStock: Number(stock) || 0,
        attributes: dynamicAttributes,
        replaceImages: true,
      };

      await editProduct(id, payload);
      setOpenModal(true);
    } catch (error) {
      setModalError(true);
      setErrorText(
        error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          "Failed to update product"
      );
      setOpenModal(true);
    } finally {
      setLoading(false);
    }
  };

  const productTypeItem = [
    { value: "simple",   label: "Simple"   },
    { value: "variable", label: "Variable" },
  ];

  const anyUploading = slots.some((slot) => slot.uploading);

  return (
    <>
      {loading ? (
        <CustomLoader />
      ) : (
        <CreateProductPageWrapper>
          <div className="create__form">

            {/* ── Basic Info ── */}
            <div className="section__card">
              <div className="section__card__header">
                <h3>Basic Information</h3>
                <p>Name and brand details for your product</p>
              </div>
              <div className="section__card__body">
                <div className="product__item">
                  <label htmlFor="productName">
                    Product Name <span className="req">*</span>
                  </label>
                  <CustomInput
                    width="100%"
                    placeholder="Enter product name"
                    backgroundColor="#FAFAFA"
                    style={{ border: formErrors.productName ? "1px solid #FC5353" : undefined }}
                    status={formErrors.productName ? "error" : undefined}
                    borderColor={formErrors.productName ? "#FC5353" : undefined}
                    value={productName}
                    onChange={(e) => {
                      setProductName(e.target.value);
                      if (formErrors.productName) {
                        setFormErrors((prev) => ({ ...prev, productName: false }));
                      }
                    }}
                  />
                  {formErrors.productName
                    ? <p className="field__error">Product name is required.</p>
                    : <p className="field__hint">Do not exceed 40 characters.</p>
                  }
                </div>

                <div className="field__row">
                  <div className="product__item">
                    <label htmlFor="brandArtist">Brand / Artist <span className="opt">(optional)</span></label>
                    <CustomInput
                      placeholder="e.g. Nike, Sony…"
                      backgroundColor="#FAFAFA"
                      onChange={(e) => setBrandArtist(e.target.value)}
                      value={brandArtist}
                    />
                  </div>

                  <div className="product__item">
                    <label htmlFor="productType">
                      Product Type <span className="req">*</span>
                    </label>
                    <Select
                      placeholder="Select type"
                      backgroundColor="#FAFAFA"
                      options={productTypeItem}
                      border={formErrors.productType ? "1px solid #FC5353" : undefined}
                      onChange={(value) => {
                        setProductType(value);
                        if (formErrors.productType) {
                          setFormErrors((prev) => ({ ...prev, productType: false }));
                        }
                      }}
                      width="100%"
                      value={productType}
                    />
                    {formErrors.productType && (
                      <p className="field__error">Please select a product type.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Category ── */}
            <div className="section__card">
              <div className="section__card__header">
                <h3>Category</h3>
                <p>Change the category and sub-category if needed</p>
              </div>
              <div className="section__card__body">
                <div className="product__item">
                  <label htmlFor="category">
                    Category <span className="req">*</span>
                  </label>
                  <AntSelect
                    showSearch
                    placeholder="Search or select a category"
                    optionFilterProp="label"
                    options={categoryOptions}
                    value={selectedCategoryId || undefined}
                    onChange={(value) => {
                      setSelectedCategoryId(value);
                      if (formErrors.category) {
                        setFormErrors((prev) => ({ ...prev, category: false }));
                      }
                    }}
                    style={{ width: "100%" }}
                    status={formErrors.category ? "error" : undefined}
                  />
                  {formErrors.category && (
                    <p className="field__error">Please select a category.</p>
                  )}
                </div>

                {hasSubcategories ? (
                  <div className="product__item">
                    <label htmlFor="subCategory">
                      Sub-category{" "}
                      {subcategoryRequired
                        ? <span className="req">*</span>
                        : <span className="opt">(optional)</span>
                      }
                    </label>
                    <Select
                      options={subCategoryOptions}
                      border={formErrors.subCategory ? "1px solid #FC5353" : undefined}
                      value={subCategory || undefined}
                      onChange={(value) => {
                        setSubCategory(value);
                        if (formErrors.subCategory) {
                          setFormErrors((prev) => ({ ...prev, subCategory: false }));
                        }
                      }}
                      backgroundColor="#FAFAFA"
                      width="100%"
                    />
                    {formErrors.subCategory && (
                      <p className="field__error">Please select a sub-category.</p>
                    )}
                  </div>
                ) : selectedCategoryId ? (
                  <div className="product__item">
                    <div className="no__subcategory">No sub-categories for this category</div>
                  </div>
                ) : null}
              </div>
            </div>

            {/* ── Pricing & Inventory ── */}
            <div className="section__card">
              <div className="section__card__header">
                <h3>Pricing &amp; Inventory</h3>
                <p>Set your price and manage stock levels</p>
              </div>
              <div className="section__card__body">
                <div className="field__row">
                  <div className="product__item">
                    <label htmlFor="regularPrice">
                      Regular Price (₦) <span className="req">*</span>
                    </label>
                    <CustomInput
                      placeholder="0.00"
                      backgroundColor="#FAFAFA"
                      type="number"
                      style={{ border: formErrors.regularPrice ? "1px solid #FC5353" : undefined }}
                      status={formErrors.regularPrice ? "error" : undefined}
                      borderColor={formErrors.regularPrice ? "#FC5353" : undefined}
                      onChange={handleRegularPrice}
                      value={regularPrice}
                    />
                    {formErrors.regularPrice && (
                      <p className="field__error">Regular price is required.</p>
                    )}
                  </div>

                  <div className="product__item">
                    <label htmlFor="stock">Stock Quantity <span className="req">*</span></label>
                    <CustomInput
                      placeholder="0"
                      backgroundColor="#FAFAFA"
                      onChange={(e) => setStock(e.target.value)}
                      type="number"
                      value={stock}
                    />
                  </div>
                </div>

                <div className="field__row">
                  <div className="product__item">
                    <label htmlFor="discountPercent">
                      Discount <span className="opt">(% optional)</span>
                    </label>
                    <CustomInput
                      placeholder="e.g. 10"
                      backgroundColor="#FAFAFA"
                      onChange={handleDiscountPercent}
                      type="number"
                      value={discountPercent}
                    />
                  </div>

                  <div className="product__item">
                    <label htmlFor="discountPrice">
                      Discount Price (₦) <span className="opt">(optional)</span>
                    </label>
                    <CustomInput
                      placeholder="0.00"
                      backgroundColor="#FAFAFA"
                      style={{ border: formErrors.discountPrice ? "1px solid #FC5353" : undefined }}
                      status={formErrors.discountPrice ? "error" : undefined}
                      borderColor={formErrors.discountPrice ? "#FC5353" : undefined}
                      onChange={handleDiscountPrice}
                      type="number"
                      value={discountPrice}
                    />
                    {formErrors.discountPrice
                      ? <p className="field__error">Must be less than regular price.</p>
                      : <p className="field__hint">Leave empty for no discount.</p>
                    }
                  </div>
                </div>

                <div className="payout__preview">
                  <div className="payout__row">
                    <span>Selling price</span>
                    <strong>₦{Number(effectivePrice).toLocaleString()}</strong>
                  </div>
                  <div className="payout__row">
                    <span>Platform fee (15%)</span>
                    <strong>- ₦{(effectivePrice * 0.15).toLocaleString()}</strong>
                  </div>
                  <div className="payout__row highlight">
                    <span>Your estimated payout</span>
                    <strong>₦{Number(payoutAmount).toLocaleString()}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Images ── */}
            <div className="section__card">
              <div className="section__card__header">
                <h3>Product Images</h3>
                <p>Upload up to 4 images — first image is the cover</p>
              </div>
              <div className="section__card__body">
                <div
                  className="img__upload__wrap"
                  style={{
                    outline: formErrors.images ? "1px solid #FC5353" : undefined,
                    borderRadius: formErrors.images ? "8px" : undefined,
                    padding: formErrors.images ? "8px" : undefined,
                  }}
                >
                  <CustomUpload
                    editable
                    initialImage={data?.images?.[0]}
                    onFileSelected={(file) => handleFileSelected(0, file)}
                    uploadProgress={slots[0].progress}
                    uploadedUrl={slots[0].url}
                    uploadError={slots[0].error}
                    uploadWarning={slots[0].warning}
                    uploadStage={slots[0].stage}
                    uploading={slots[0].uploading}
                  />
                  <CustomUpload
                    editable
                    initialImage={data?.images?.[1]}
                    onFileSelected={(file) => handleFileSelected(1, file)}
                    uploadProgress={slots[1].progress}
                    uploadedUrl={slots[1].url}
                    uploadError={slots[1].error}
                    uploadWarning={slots[1].warning}
                    uploadStage={slots[1].stage}
                    uploading={slots[1].uploading}
                  />
                  <div className="upload__stack">
                    <CustomUpload
                      editable
                      initialImage={data?.images?.[2]}
                      onFileSelected={(file) => handleFileSelected(2, file)}
                      uploadProgress={slots[2].progress}
                      uploadedUrl={slots[2].url}
                      uploadError={slots[2].error}
                      uploadWarning={slots[2].warning}
                      uploadStage={slots[2].stage}
                      uploading={slots[2].uploading}
                    />
                    <CustomUpload
                      editable
                      initialImage={data?.images?.[3]}
                      onFileSelected={(file) => handleFileSelected(3, file)}
                      uploadProgress={slots[3].progress}
                      uploadedUrl={slots[3].url}
                      uploadError={slots[3].error}
                      uploadWarning={slots[3].warning}
                      uploadStage={slots[3].stage}
                      uploading={slots[3].uploading}
                    />
                  </div>
                </div>

                {formErrors.images && (
                  <p className="field__error">Please upload at least one product image.</p>
                )}
                {anyUploading && (
                  <p className="upload__hint">Uploading images… please wait before saving.</p>
                )}
              </div>
            </div>

            {/* ── Description ── */}
            <div className="section__card">
              <div className="section__card__header">
                <h3>Description</h3>
                <p>Detailed product description shown to buyers</p>
              </div>
              <div className="section__card__body">
                <div className="product__item">
                  <TextEditor
                    placeholder="Describe your product in detail…"
                    width="100%"
                    hasError={formErrors.productDescription}
                    value={productDescription}
                    onChange={(value) => {
                      setProductDescription(value);
                      if (formErrors.productDescription) {
                        setFormErrors((prev) => ({ ...prev, productDescription: false }));
                      }
                    }}
                  />
                  {formErrors.productDescription && (
                    <p className="field__error">Product description is required.</p>
                  )}
                </div>
              </div>
            </div>

            {/* ── Specifications ── */}
            {selectedCategory?.attributes?.length > 0 && (
              <div className="section__card">
                <div className="section__card__header">
                  <h3>Specifications</h3>
                  <p>Technical details specific to {selectedCategory.name}</p>
                </div>
                <div className="section__card__body">
                  <div className="field__row" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                    {selectedCategory.attributes.map((attrItem) => {
                      const detail = attrItem.attributeId;
                      if (!detail) return null;

                      return (
                        <div className="product__item" key={detail.code}>
                          <label htmlFor={detail.code}>
                            {detail.label}{" "}
                            {attrItem.isRequired
                              ? <span className="req">*</span>
                              : <span className="opt">(optional)</span>
                            }
                          </label>
                          {detail.type === "select" ? (
                            <Select
                              placeholder={`Select ${detail.label}`}
                              backgroundColor="#FAFAFA"
                              width="100%"
                              border={formErrors.attributes?.[detail.code] ? "1px solid #FC5353" : undefined}
                              options={detail.options.map((option) => ({ value: option, label: option }))}
                              value={dynamicAttributes[detail.code]}
                              onChange={(value) => handleAttributeChange(detail.code, value)}
                            />
                          ) : detail.type === "boolean" ? (
                            <Select
                              placeholder={`Select ${detail.label}`}
                              backgroundColor="#FAFAFA"
                              width="100%"
                              border={formErrors.attributes?.[detail.code] ? "1px solid #FC5353" : undefined}
                              options={[
                                { value: true,  label: "Yes" },
                                { value: false, label: "No"  },
                              ]}
                              value={dynamicAttributes[detail.code]}
                              onChange={(value) => handleAttributeChange(detail.code, value)}
                            />
                          ) : (
                            <CustomInput
                              placeholder={`Enter ${detail.label}`}
                              backgroundColor="#FAFAFA"
                              type={detail.type === "number" ? "number" : "text"}
                              style={{ border: formErrors.attributes?.[detail.code] ? "1px solid #FC5353" : undefined }}
                              status={formErrors.attributes?.[detail.code] ? "error" : undefined}
                              borderColor={formErrors.attributes?.[detail.code] ? "#FC5353" : undefined}
                              value={dynamicAttributes[detail.code] || ""}
                              onChange={(e) => handleAttributeChange(detail.code, e.target.value)}
                            />
                          )}
                          {formErrors.attributes?.[detail.code] && (
                            <p className="field__error">{detail.label} is required.</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ── Submit bar ── */}
            <div className="submit__bar">
              <p className="submit__note">All required fields must be filled before saving.</p>
              <Button
                border="1px solid #e0e0e0"
                color="#666"
                hoverBg="rgba(0,0,0,0.04)"
                hoverColor="#333"
                onClick={() => setEdit(false)}
              >
                Cancel
              </Button>
              <Button
                backgroundColor="var(--oosriPrimary)"
                color="white"
                onClick={handleEdit}
              >
                Save Changes
              </Button>
            </div>

          </div>

          <StyledModal
            maskClosable
            open={openModal}
            centered
            closeIcon={null}
            className="modal"
            footer={null}
          >
            {modalError ? (
              <>
                <h2 style={{ textAlign: "center" }}>Product Update Failed</h2>
                <p style={{ textAlign: "center", margin: "16px 0px", color: "#777777" }}>
                  {errorText ||
                    "We ran into a problem while trying to update this product. Please try again."}
                </p>
                <FlexibleDiv flexWrap="nowrap" gap="24px">
                  <Button
                    border="1px solid #FC5353"
                    color="#FC5353"
                    hoverBg="rgba(252,83,83,0.08)"
                    hoverColor="var(--oosriPrimary)"
                    width="100%"
                    onClick={() => setOpenModal(false)}
                  >
                    Retry
                  </Button>
                  <Button
                    onClick={() => setEdit(false)}
                    border="1px solid #FC5353"
                    color="white"
                    backgroundColor="var(--oosriPrimary)"
                    width="100%"
                  >
                    Back to Products
                  </Button>
                </FlexibleDiv>
              </>
            ) : (
              <>
                <h2 style={{ textAlign: "center" }}>Product Updated Successfully</h2>
                <p style={{ textAlign: "center", margin: "16px 0px", color: "#777777" }}>
                  Your product data has been updated successfully.
                </p>
                <FlexibleDiv flexWrap="nowrap" gap="24px">
                  <Button
                    onClick={closeModal}
                    border="1px solid #FC5353"
                    color="white"
                    backgroundColor="var(--oosriPrimary)"
                    width="100%"
                  >
                    Continue
                  </Button>
                </FlexibleDiv>
              </>
            )}
          </StyledModal>
        </CreateProductPageWrapper>
      )}
    </>
  );
}
