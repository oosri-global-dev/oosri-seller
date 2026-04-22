import { CreateProductPageWrapper } from "../Create/index.styles";
import { FlexibleDiv, GridableDiv } from "@/components/lib/Box/styles";
import Select from "@/components/lib/Select";
import { Input } from "antd";
import { StyledModal } from "@/components/lib/NoBusinessModal/index.styles";
import { CustomInput } from "@/components/lib/CustomInput/index.styles";
import { CustomUpload } from "@/components/lib/CustomUpload";
import { useState } from "react";
import { editProduct, getUploadUrl } from "@/network/product";
import axios from "axios";
import Button from "@/components/lib/Button";
import CustomLoader from "@/components/lib/CustomLoader";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { sanitizeHTML } from "@/utils/sanitize-dom";
import TextEditor from "@/screens/Products/Product/text-editor";

const { TextArea } = Input;

export default function EditProduct({
  data,
  id,
  setEdit,
  fetchData,
  subCategories,
}) {
  const [category, setCategory] = useState(data?.category);
  const [images, setImages] = useState(data?.images);
  const [img1, setImg1] = useState(data?.images[0]);
  const [img2, setImg2] = useState(data?.images[1]);
  const [img3, setImg3] = useState(data?.images[2]);
  const [img4, setImg4] = useState(data?.images[3]);
  const [productName, setProductName] = useState(data?.productName);
  const [productDescription, setProductDescription] = useState(
    data?.productDescription
  );
  const [brandArtist, setBrandArtist] = useState(data?.brandArtist);
  const [discount, setDiscount] = useState(data?.discount);
  const [weight, setWeight] = useState(data?.weight);
  const [country, setCountry] = useState(data?.country);
  const [openModal, setOpenModal] = useState(false);
  const [subCategory, setSubCategory] = useState(data.subcategory);
  const [productType, setProductType] = useState(data.productType);
  const [regularPrice, setRegularPrice] = useState(data?.regularPrice);
  const [salesPrice, setSalesPrice] = useState(data?.salesPrice);
  const [dynamicAttributes, setDynamicAttributes] = useState(data?.attributes || {});
  const [modalError, setModalError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stock, setStock] = useState(data?.inStock);
  const [yard, setYard] = useState(data?.yard);

  const handleAttributeChange = (code, value) => {
    setDynamicAttributes(prev => ({
      ...prev,
      [code]: value
    }));
  };

  const payload = {
    category: category?._id || category, // Ensure ID is sent
    productName: productName,
    productDescription: productDescription,
    brandArtist: brandArtist,
    images: [img1, img2, img3, img4].filter(Boolean),
    country: country,
    subcategory: subCategory?.value,
    regularPrice: regularPrice,
    discountPrice: discountPrice === "" ? null : Number(discountPrice),
    discount: discountPercent === "" ? 0 : Number(discountPercent),
    productType: productType,
    inStock: stock,
    attributes: dynamicAttributes // Include dynamic attributes
  };

  const productTypeItem = [
    { value: "simple", label: "Simple" },
    { value: "variable", label: "Variable" },
  ];
  const conditionItem = [
    { value: "New", label: "New" },
    { value: "Used", label: "Used" },
    { value: "Antique", label: "Antique" },
  ];

  const handleImageUpload = async (file) => {
    if (!file) return null;

    // Check if it's already a URL (e.g. from existing product)
    if (typeof file === "string") return file;
    if (!(file instanceof File) && !(file instanceof Blob)) return null;

    // Client-side validation
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      throw new Error(`Invalid file type: ${file.type}. Allowed: jpg, png, webp`);
    }

    if (file.size > 80 * 1024 * 1024) { // 10MB limit
      throw new Error(`File too large: ${Math.round(file.size / 1024 / 1024)}MB. Max 10MB.`);
    }

    try {
      // 1. Get Presigned URL
      const response = await getUploadUrl(file.name);
      if (!response.success) throw new Error("Failed to get upload URL");

      const { url, signature, timestamp, apiKey, publicId, folder, tags, transformation, eager, allowed_formats } = response.data;

      // 2. Prepare Form Data for Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("folder", folder);
      formData.append("public_id", publicId);
      formData.append("tags", tags);
      formData.append("transformation", transformation);
      if (eager) formData.append("eager", eager);
      if (allowed_formats) formData.append("allowed_formats", allowed_formats);

      // 3. Upload to Cloudinary
      const uploadRes = await axios.post(url, formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Upload progress for ${file.name}: ${percentCompleted}%`);
        }
      });
      return uploadRes.data.secure_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      const msg = error.response?.data?.error?.message || error.message || "Image upload failed";
      throw new Error(`Failed to upload ${file.name}: ${msg}`);
    }
  };

  const handleEdit = async () => {
    setLoading(true);
    try {
      const cleanDescription = await sanitizeHTML(productDescription);

      // Upload images first
      const imageFiles = [img1, img2, img3, img4].filter(Boolean);
      const imageUrls = await Promise.all(imageFiles.map(file => handleImageUpload(file)));

      const response = await editProduct(id, {
        ...payload,
        productDescription: cleanDescription,
        images: imageUrls, // Send URLs
        replaceImages: true // Flag to replace entire image list
      });
      setLoading(false);
      console.log(response);
      setOpenModal(true);
    } catch (errors) {
      console.log(errors);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = async () => {
    await fetchData();
    setEdit(false);
  };

  const effectivePrice =
    discountPrice && Number(discountPrice) > 0 && Number(discountPrice) < Number(regularPrice)
      ? Number(discountPrice)
      : Number(regularPrice || 0);

  const payoutAmount = (effectivePrice * 0.85).toFixed(2);

  const handleRegularPrice = (e) => {
    const val = e.target.value;
    setRegularPrice(val);
    if (val && discountPercent && Number(discountPercent) > 0) {
      setDiscountPrice((Number(val) * (1 - Number(discountPercent) / 100)).toFixed(2));
    }
  };

  const handleDiscountPrice = (e) => {
    const val = e.target.value;
    setDiscountPrice(val);
    if (val && regularPrice && Number(regularPrice) > 0) {
      const perc = ((Number(regularPrice) - Number(val)) / Number(regularPrice)) * 100;
      setDiscountPercent(perc.toFixed(2));
    } else if (!val) {
      setDiscountPercent("");
    }
  };

  const handleDiscountPercent = (e) => {
    const val = e.target.value;
    setDiscountPercent(val);
    if (val && regularPrice && Number(regularPrice) > 0) {
      setDiscountPrice((Number(regularPrice) * (1 - Number(val) / 100)).toFixed(2));
    } else if (!val) {
      setDiscountPrice("");
    }
  };

  const validateAndHandleEdit = () => {
    if (discountPrice && regularPrice && Number(discountPrice) >= Number(regularPrice)) {
      alert("Discount Price must be less than Regular Price.");
      return;
    }
    handleEdit();
  };

  return (
    <>
      {loading ? (
        <CustomLoader />
      ) : (
        <CreateProductPageWrapper>
          <FlexibleDiv className="tab__item">
            <FlexibleDiv className="container_wrapper" alignItems="start">
              {/* Left section */}
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
                  {/* Name */}
                  <div className="product__item">
                    <label htmlFor="Name">Product Name</label>
                    <CustomInput
                      width={"100%"}
                      placeholder="Input product name"
                      backgroundColor="#FAFAFA"
                      value={productName}
                      onChange={(e) => {
                        setProductName(e.target.value);
                      }}
                    />
                    <p>Do not exceed 40 characters while entering name</p>
                  </div>
                </FlexibleDiv>
                {/* Category */}
                <div className="product__item">
                  <label htmlFor="Name">Product Category</label>
                  <Select
                    options={subCategories}
                    value={subCategory}
                    onChange={(e) => {
                      setSubCategory(e);
                    }}
                    backgroundColor="#FAFAFA"
                    width="100%"
                  />
                </div>
                {/* Brand */}
                <div className="product__item">
                  <label htmlFor="Name">Brand</label>
                  <CustomInput
                    placeholder="Select product brand"
                    backgroundColor="#FAFAFA"
                    onChange={(e) => {
                      setBrandArtist(e.target.value);
                    }}
                    value={brandArtist}
                  />
                </div>
                {/* Quantity available */}
                <div className="product__item">
                  <label htmlFor="Name">Quantity Available (Stock)</label>
                  <CustomInput
                    placeholder="Input Product Price"
                    backgroundColor="#FAFAFA"
                    onChange={(e) => {
                      setStock(e.target.value);
                    }}
                    type="number"
                    value={stock}
                  />
                </div>
                {/* Product Type */}
                <div className="product__item">
                  <label htmlFor="Name">Product Type</label>
                  <Select
                    placeholder="Input product display type"
                    backgroundColor="#FAFAFA"
                    options={productTypeItem}
                    onChange={(e) => {
                      setProductType(e);
                    }}
                    width="100%"
                    defaultValue={productType}
                  />
                </div>
                {/* Regular Price */}
                <div className="product__item">
                  <label htmlFor="Name">Regular Price(NGN)</label>
                  <CustomInput
                    placeholder="Input Product Price"
                    backgroundColor="#FAFAFA"
                    type="number"
                    onChange={handleRegularPrice}
                    value={regularPrice}
                  />
                </div>
                {/* Discount Percentage */}
                <div className="product__item">
                  <label htmlFor="Name">Discount (%) (Optional)</label>
                  <CustomInput
                    placeholder="e.g. 10"
                    backgroundColor="#FAFAFA"
                    onChange={handleDiscountPercent}
                    type="number"
                    value={discountPercent}
                  />
                </div>
                {/* Discount Price */}
                <div className="product__item">
                  <label htmlFor="Name">Discount Price(NGN) (Optional)</label>
                  <CustomInput
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
                {/* Seller Payout */}
                <div className="product__item">
                  <label htmlFor="Name">Your Payout(NGN) (Estimated)</label>
                  <CustomInput
                    backgroundColor="#EEEEEE"
                    type="number"
                    value={payoutAmount}
                    disabled
                  />
                  <p style={{ color: "var(--oosriPrimary)", fontSize: "12px", marginTop: "4px" }}>
                    You receive 85% of the final buyer price ({effectivePrice} NGN).
                  </p>
                </div>
              </FlexibleDiv>
              {/* right section */}
              <FlexibleDiv
                flexDir="column"
                gap="24px"
                alignItems="start"
                width="100%"
              >
                <FlexibleDiv className="img__upload" justifyContent="start">
                  <CustomUpload
                    editable
                    setFile={setImg1}
                    initialImage={images[0]}
                  />
                  <CustomUpload
                    editable
                    initialImage={images[1]}
                    setFile={setImg2}
                  />
                  <FlexibleDiv
                    flexDir="column"
                    className="column_item"
                    width="fit-content"
                  >
                    <CustomUpload
                      initialImage={images[2]}
                      editable
                      setFile={setImg3}
                    />
                    <CustomUpload
                      initialImage={images[3]}
                      editable
                      setFile={setImg4}
                    />
                  </FlexibleDiv>
                </FlexibleDiv>
                {/*Product Description*/}
                <div className="product__item">
                  <label htmlFor="Name">Product Description</label>
                  <TextEditor
                    placeholder="Minimum of 1000 words"
                    width="1000px"
                    value={productDescription}
                    onChange={setProductDescription}
                  />
                </div>


              </FlexibleDiv>
            </FlexibleDiv>

            {/* Dynamic Attributes Rendering - Moved to bottom full width grid */}
            {category?.attributes?.length > 0 && (
              <FlexibleDiv width="100%" margin="30px 0 0 0" flexDir="column" alignItems="start">
                <h3 style={{ marginBottom: '16px', color: '#1A1A1A', fontSize: '18px', fontWeight: '600' }}>Product Specifications</h3>
                <GridableDiv gridCol="1fr 1fr 1fr" gap="20px" width="100%">
                  {category.attributes.map((attrItem) => {
                    const detail = attrItem.attributeId;
                    if (!detail) return null;

                    return (
                      <div className="product__item" key={detail.code}>
                        <label htmlFor={detail.code}>{detail.label}</label>
                        {detail.type === 'select' ? (
                          <Select
                            placeholder={`Select ${detail.label}`}
                            backgroundColor="#FAFAFA"
                            width="100%"
                            options={detail.options.map(opt => ({ value: opt, label: opt }))}
                            value={dynamicAttributes[detail.code]}
                            onChange={(value) => handleAttributeChange(detail.code, value)}
                          />
                        ) : detail.type === 'boolean' ? (
                          <Select
                            placeholder={`Select ${detail.label}`}
                            backgroundColor="#FAFAFA"
                            width="100%"
                            options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
                            value={dynamicAttributes[detail.code]}
                            onChange={(value) => handleAttributeChange(detail.code, value)}
                          />
                        ) : (
                          <CustomInput
                            placeholder={`Input ${detail.label}`}
                            backgroundColor="#FAFAFA"
                            type={detail.type === 'number' ? 'number' : 'text'}
                            value={dynamicAttributes[detail.code] || ''}
                            onChange={(e) => handleAttributeChange(detail.code, e.target.value)}
                          />
                        )}
                      </div>
                    );
                  })}
                </GridableDiv>
              </FlexibleDiv>
            )}
          </FlexibleDiv>
          <FlexibleDiv justifyContent="end" alignItems="start">
            <Button
              className="edit__button"
              onClick={() => {
                validateAndHandleEdit();
              }}
            >
              Save Changes
            </Button>
          </FlexibleDiv>

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
                <h2 style={{ textAlign: "center" }}>Product Update Failed</h2>
                <p
                  style={{
                    textAlign: "center",
                    margin: "16px 0px",
                    color: "#777777",
                  }}
                >
                  We ran into a problem while trying to update this product
                  please try again
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
                    onClick={() => {
                      push("/products");
                    }}
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
                  Product Updated Succesfully
                </h2>
                <p
                  style={{
                    textAlign: "center",
                    margin: "16px 0px",
                    color: "#777777",
                  }}
                >
                  Your Produt Data has been updated Successfully
                </p>
                <FlexibleDiv flexWrap="nowrap" gap="24px">
                  <Button
                    onClick={() => {
                      closeModal();
                    }}
                    border="1px solid #FC5353"
                    color="white"
                    backgroundColor="var(--oosriPrimary)"
                    width="100%"
                  >
                    Close
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
