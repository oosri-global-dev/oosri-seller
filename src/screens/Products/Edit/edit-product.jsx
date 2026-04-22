import { useEffect, useState } from "react";
import { CreateProductPageWrapper } from "../Create/index.styles";
import { FlexibleDiv, GridableDiv } from "@/components/lib/Box/styles";
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
  subCategories,
}) {
  const [slots, setSlots] = useState(() => buildInitialSlots(data?.images));
  const [productName, setProductName] = useState(data?.productName || "");
  const [productDescription, setProductDescription] = useState(
    data?.productDescription || ""
  );
  const [brandArtist, setBrandArtist] = useState(data?.brandArtist || "");
  const [subCategory, setSubCategory] = useState(data?.subcategory || null);
  const [productType, setProductType] = useState(data?.productType || "simple");
  const [regularPrice, setRegularPrice] = useState(data?.regularPrice || "");
  const [discountPrice, setDiscountPrice] = useState(
    data?.discountPrice ?? ""
  );
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
  const [categoryItem, setCategoryItem] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (!subCategories) {
      return;
    }

    const item = subCategories.map((sub) => ({
      value: sub.name,
      label: sub.name,
      _id: sub._id || sub.id,
    }));

    setCategoryItem(item);

    if (data?.subcategory) {
      const existingSubcategoryId =
        data.subcategory?._id || data.subcategory?.id || data.subcategory;
      const matchedSubcategory = item.find(
        (sub) => sub._id === existingSubcategoryId
      );

      if (matchedSubcategory) {
        setSubCategory(matchedSubcategory);
      }
    }
  }, [data?.subcategory, subCategories]);

  const setSlot = (index, patch) =>
    setSlots((prev) =>
      prev.map((slot, slotIndex) =>
        slotIndex === index ? { ...slot, ...patch } : slot
      )
    );

  const handleFileSelected = async (slotIndex, file) => {
    if (!file) {
      return;
    }

    if (formErrors.images) {
      setFormErrors((prev) => ({
        ...prev,
        images: false,
      }));
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
        onProgress: (progress) => {
          setSlot(slotIndex, { progress });
        },
        onStageChange: (stage) => {
          setSlot(slotIndex, { stage });
        },
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
    setDynamicAttributes((prev) => ({
      ...prev,
      [code]: value,
    }));

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

  const validateForm = async () => {
    const cleanDescription = await sanitizeHTML(productDescription);
    const imageUrls = slots.map((slot) => slot.url).filter(Boolean);
    const nextErrors = {};
    const attributeErrors = {};

    if (!productName || !productName.trim()) {
      nextErrors.productName = true;
    }

    if (!subCategory?._id && !subCategory?.id && !subCategory) {
      nextErrors.subCategory = true;
    }

    if (!productType) {
      nextErrors.productType = true;
    }

    if (!regularPrice) {
      nextErrors.regularPrice = true;
    }

    if (
      !productDescription ||
      productDescription.trim() === "<p><br></p>" ||
      !cleanDescription ||
      cleanDescription === "<p><br></p>"
    ) {
      nextErrors.productDescription = true;
    }

    if (imageUrls.length === 0) {
      nextErrors.images = true;
    }

    const categoryAttributes = data?.category?.attributes || [];
    categoryAttributes.forEach((attrItem) => {
      const detail = attrItem.attributeId;
      if (!detail || !attrItem.isRequired) {
        return;
      }

      const value = dynamicAttributes[detail.code];
      const isEmptyArray = Array.isArray(value) && value.length === 0;
      const isEmptyValue =
        value === undefined || value === null || value === "" || isEmptyArray;

      if (isEmptyValue) {
        attributeErrors[detail.code] = true;
      }
    });

    if (Object.keys(attributeErrors).length > 0) {
      nextErrors.attributes = attributeErrors;
    }

    setFormErrors(nextErrors);

    return {
      cleanDescription,
      hasErrors: Object.keys(nextErrors).length > 0,
      imageUrls,
    };
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
      setFormErrors((prev) => ({
        ...prev,
        regularPrice: false,
        discountPrice: false,
      }));
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
      setFormErrors((prev) => ({
        ...prev,
        discountPrice: false,
      }));
    }

    if (value && regularPrice && Number(regularPrice) > 0) {
      const percentage =
        ((Number(regularPrice) - Number(value)) / Number(regularPrice)) * 100;
      setDiscountPercent(percentage.toFixed(2));
    } else if (!value) {
      setDiscountPercent("");
    }
  };

  const handleDiscountPercent = (e) => {
    const value = e.target.value;
    setDiscountPercent(value);

    if (formErrors.discountPrice) {
      setFormErrors((prev) => ({
        ...prev,
        discountPrice: false,
      }));
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
      const {
        cleanDescription,
        hasErrors,
        imageUrls,
      } = await validateForm();

      if (hasErrors) {
        throw new Error(
          "Please complete all highlighted required fields before saving."
        );
      }

      if (slots.some((slot) => slot.uploading)) {
        throw new Error(
          "Please wait for image uploads to finish before saving this product."
        );
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
        setFormErrors((prev) => ({
          ...prev,
          discountPrice: true,
        }));
        throw new Error("Discount Price must be less than Regular Price.");
      }
      const categoryId = data?.category?._id || data?.category;
      const subcategoryId =
        subCategory?._id || subCategory?.id || subCategory || null;

      const payload = {
        categoryId,
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
    { value: "simple", label: "Simple" },
    { value: "variable", label: "Variable" },
  ];

  const anyUploading = slots.some((slot) => slot.uploading);

  return (
    <>
      {loading ? (
        <CustomLoader />
      ) : (
        <CreateProductPageWrapper>
          <FlexibleDiv className="tab__item">
            <FlexibleDiv className="container_wrapper" alignItems="start">
              <FlexibleDiv
                className="50%"
                flexDir="column"
                alignItems="start"
                gap="24px"
              >
                <FlexibleDiv
                  justifyContent="start"
                  alignItems="start"
                  gap="16px"
                >
                  <div className="product__item">
                    <label htmlFor="productName">Product Name</label>
                    <CustomInput
                      width="100%"
                      placeholder="Input product name"
                      backgroundColor="#FAFAFA"
                      style={{
                        border: formErrors.productName
                          ? "1px solid #FC5353"
                          : undefined,
                      }}
                      status={formErrors.productName ? "error" : undefined}
                      borderColor={formErrors.productName ? "#FC5353" : undefined}
                      value={productName}
                      onChange={(e) => {
                        setProductName(e.target.value);
                        if (formErrors.productName) {
                          setFormErrors((prev) => ({
                            ...prev,
                            productName: false,
                          }));
                        }
                      }}
                    />
                    <p>Do not exceed 40 characters while entering name</p>
                  </div>
                </FlexibleDiv>

                <div className="product__item">
                  <label htmlFor="subCategory">Product Category</label>
                  <Select
                    options={categoryItem}
                    border={formErrors.subCategory ? "1px solid #FC5353" : undefined}
                    value={subCategory?.value || subCategory}
                    onChange={(value) => {
                      setSubCategory(value);
                      if (formErrors.subCategory) {
                        setFormErrors((prev) => ({
                          ...prev,
                          subCategory: false,
                        }));
                      }
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

                <div className="product__item">
                  <label htmlFor="brandArtist">Brand</label>
                  <CustomInput
                    placeholder="Select product brand"
                    backgroundColor="#FAFAFA"
                    onChange={(e) => setBrandArtist(e.target.value)}
                    value={brandArtist}
                  />
                </div>

                <div className="product__item">
                  <label htmlFor="stock">Quantity Available (Stock)</label>
                  <CustomInput
                    placeholder="Input quantity available"
                    backgroundColor="#FAFAFA"
                    onChange={(e) => setStock(e.target.value)}
                    type="number"
                    value={stock}
                  />
                </div>

                <div className="product__item">
                  <label htmlFor="productType">Product Type</label>
                  <Select
                    placeholder="Input product display type"
                    backgroundColor="#FAFAFA"
                    options={productTypeItem}
                    border={formErrors.productType ? "1px solid #FC5353" : undefined}
                    onChange={(value) => {
                      setProductType(value);
                      if (formErrors.productType) {
                        setFormErrors((prev) => ({
                          ...prev,
                          productType: false,
                        }));
                      }
                    }}
                    width="100%"
                    value={productType}
                  />
                  {formErrors.productType && (
                    <p style={{ color: "#FC5353", fontSize: "12px", marginTop: "4px" }}>
                      Please select a product type.
                    </p>
                  )}
                </div>

                <div className="product__item">
                  <label htmlFor="regularPrice">Regular Price(NGN)</label>
                  <CustomInput
                    placeholder="Input Product Price"
                    backgroundColor="#FAFAFA"
                    type="number"
                    style={{
                      border: formErrors.regularPrice
                        ? "1px solid #FC5353"
                        : undefined,
                    }}
                    status={formErrors.regularPrice ? "error" : undefined}
                    borderColor={formErrors.regularPrice ? "#FC5353" : undefined}
                    onChange={handleRegularPrice}
                    value={regularPrice}
                  />
                  {formErrors.regularPrice && (
                    <p style={{ color: "#FC5353", fontSize: "12px", marginTop: "4px" }}>
                      Regular price is required.
                    </p>
                  )}
                </div>

                <div className="product__item">
                  <label htmlFor="discountPercent">Discount (%) (Optional)</label>
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
                    Discount Price(NGN) (Optional)
                  </label>
                  <CustomInput
                    placeholder="Input Discount Price"
                    backgroundColor="#FAFAFA"
                    style={{
                      border: formErrors.discountPrice
                        ? "1px solid #FC5353"
                        : undefined,
                    }}
                    status={formErrors.discountPrice ? "error" : undefined}
                    borderColor={formErrors.discountPrice ? "#FC5353" : undefined}
                    onChange={handleDiscountPrice}
                    type="number"
                    value={discountPrice}
                  />
                  <p
                    style={{
                      color: "grey",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    Leave empty for no discount. Must be less than Regular Price.
                  </p>
                  {formErrors.discountPrice && (
                    <p style={{ color: "#FC5353", fontSize: "12px", marginTop: "4px" }}>
                      Discount price must be less than regular price.
                    </p>
                  )}
                </div>

                <div className="product__item">
                  <label htmlFor="payoutAmount">Your Payout(NGN) (Estimated)</label>
                  <CustomInput
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

              <FlexibleDiv
                flexDir="column"
                gap="24px"
                alignItems="start"
                width="100%"
              >
                <FlexibleDiv
                  className="img__upload"
                  justifyContent="start"
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
                  <FlexibleDiv
                    flexDir="column"
                    className="column_item"
                    width="fit-content"
                  >
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
                  </FlexibleDiv>
                </FlexibleDiv>
                {formErrors.images && (
                  <p style={{ color: "#FC5353", fontSize: "12px", marginTop: "-12px" }}>
                    Please upload at least one product image.
                  </p>
                )}

                {anyUploading && (
                  <p
                    style={{
                      color: "#3b82f6",
                      fontSize: "13px",
                      marginTop: "-12px",
                    }}
                  >
                    Uploading images… please wait before saving.
                  </p>
                )}

                <div className="product__item">
                  <label htmlFor="productDescription">Product Description</label>
                  <TextEditor
                    placeholder="Minimum of 1000 words"
                    width="1000px"
                    hasError={formErrors.productDescription}
                    value={productDescription}
                    onChange={(value) => {
                      setProductDescription(value);
                      if (formErrors.productDescription) {
                        setFormErrors((prev) => ({
                          ...prev,
                          productDescription: false,
                        }));
                      }
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

            {data?.category?.attributes?.length > 0 && (
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
                  {data.category.attributes.map((attrItem) => {
                    const detail = attrItem.attributeId;
                    if (!detail) {
                      return null;
                    }

                    return (
                      <div className="product__item" key={detail.code}>
                        <label htmlFor={detail.code}>{detail.label}</label>
                        {detail.type === "select" ? (
                          <Select
                            placeholder={`Select ${detail.label}`}
                            backgroundColor="#FAFAFA"
                            width="100%"
                            border={
                              formErrors.attributes?.[detail.code]
                                ? "1px solid #FC5353"
                                : undefined
                            }
                            options={detail.options.map((option) => ({
                              value: option,
                              label: option,
                            }))}
                            value={dynamicAttributes[detail.code]}
                            onChange={(value) =>
                              handleAttributeChange(detail.code, value)
                            }
                          />
                        ) : detail.type === "boolean" ? (
                          <Select
                            placeholder={`Select ${detail.label}`}
                            backgroundColor="#FAFAFA"
                            width="100%"
                            border={
                              formErrors.attributes?.[detail.code]
                                ? "1px solid #FC5353"
                                : undefined
                            }
                            options={[
                              { value: true, label: "Yes" },
                              { value: false, label: "No" },
                            ]}
                            value={dynamicAttributes[detail.code]}
                            onChange={(value) =>
                              handleAttributeChange(detail.code, value)
                            }
                          />
                        ) : (
                          <CustomInput
                            placeholder={`Input ${detail.label}`}
                            backgroundColor="#FAFAFA"
                            type={detail.type === "number" ? "number" : "text"}
                            style={{
                              border: formErrors.attributes?.[detail.code]
                                ? "1px solid #FC5353"
                                : undefined,
                            }}
                            status={
                              formErrors.attributes?.[detail.code]
                                ? "error"
                                : undefined
                            }
                            borderColor={
                              formErrors.attributes?.[detail.code]
                                ? "#FC5353"
                                : undefined
                            }
                            value={dynamicAttributes[detail.code] || ""}
                            onChange={(e) =>
                              handleAttributeChange(detail.code, e.target.value)
                            }
                          />
                        )}
                        {formErrors.attributes?.[detail.code] && (
                          <p style={{ color: "#FC5353", fontSize: "12px", marginTop: "4px" }}>
                            {detail.label} is required.
                          </p>
                        )}
                      </div>
                    );
                  })}
                </GridableDiv>
              </FlexibleDiv>
            )}
          </FlexibleDiv>

          <FlexibleDiv justifyContent="end" alignItems="start">
            <Button className="edit__button" onClick={handleEdit}>
              Save Changes
            </Button>
          </FlexibleDiv>

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
                <p
                  style={{
                    textAlign: "center",
                    margin: "16px 0px",
                    color: "#777777",
                  }}
                >
                  {errorText ||
                    "We ran into a problem while trying to update this product. Please try again."}
                </p>
                <FlexibleDiv flexWrap="nowrap" gap="24px">
                  <Button
                    border="1px solid #FC5353"
                    color="#FC5353"
                    hoverBg="white"
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
                <h2 style={{ textAlign: "center" }}>
                  Product Updated Successfully
                </h2>
                <p
                  style={{
                    textAlign: "center",
                    margin: "16px 0px",
                    color: "#777777",
                  }}
                >
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
