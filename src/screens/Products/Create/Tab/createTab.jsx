import { FlexibleDiv, GridableDiv } from "../../../../components/lib/Box/styles";
import Select from "../../../../components/lib/Select";
import { Input, Upload } from "antd";
import { use, useEffect, useState } from "react";
import { CustomUpload } from "../../../../components/lib/CustomUpload";
import { createProduct, getUploadUrl } from "@/network/product";
import axios from "axios";
import Button from "@/components/lib/Button";
import { StyledModal } from "@/components/lib/NoBusinessModal/index.styles";
import { CustomInput } from "@/components/lib/CustomInput/index.styles";
import { sanitizeHTML } from "@/utils/sanitize-dom";
import TextEditor from "../../Product/text-editor";

const { TextArea } = Input;

export const CreateTab = ({ subCategories, category, categoryName, selectedCategory }) => {
  const [img1, setImg1] = useState();
  const [img2, setImg2] = useState();
  const [img3, setImg3] = useState();
  const [img4, setImg4] = useState();
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [brandArtist, setBrandArtist] = useState("");
  const [weight, setWeight] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [categoryItem, setCategoryItem] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [productType, setProductType] = useState();
  const [regularPrice, setRegularPrice] = useState(0);
  const [salesPrice, setSalesPrice] = useState(0);
  const [salesError, setSalesError] = useState(false);
  const [dynamicAttributes, setDynamicAttributes] = useState({});
  const [modalError, setModalError] = useState(false);
  const [errorText, setErrorText] = useState(" ");
  const [clearImage, setClearImg] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAttributeChange = (code, value) => {
    setDynamicAttributes(prev => ({
      ...prev,
      [code]: value
    }));
  };

  // Extract subcategoryId as a primitive string to avoid object serialization issues
  const subcategoryIdValue = subCategory?._id || subCategory?.id;

  const payload = {
    categoryId: category, // category is now the ObjectId from activeTab
    subcategoryId: subcategoryIdValue, // Use the extracted string value
    productName: productName,
    productDescription: productDescription,
    brandArtist: brandArtist,
    images: [img1, img2, img3, img4],
    salesPrice: salesPrice,
    regularPrice: regularPrice,
    productType: productType,
    salesPrice: salesPrice,
    regularPrice: regularPrice,
    productType: productType,
    attributes: dynamicAttributes // Include dynamic attributes
  };

  const handleModalClose = () => {
    setClearImg(true);
    setImg1(null);
    setImg2(null);
    setImg3(null);
    setImg4(null);
    setProductName("");
    setProductDescription("");
    setBrandArtist("");
    setWeight("");
    setProductType("");
    setRegularPrice("");
    setSalesPrice();
    setProductType("");
    setRegularPrice("");
    setSalesPrice();
    setDynamicAttributes({}); // Reset dynamic attributes
    setSubCategory(null); // Reset subcategory when form is cleared
    setOpenModal(false);
    setModalError(false);
  };
  useEffect(() => {
    if (subCategories) {
      const item = [];
      for (let index = 0; index < subCategories.length; index++) {
        item.push({
          value: subCategories[index].name,
          label: subCategories[index].name,
          _id: subCategories[index]._id || subCategories[index].id, // Preserve the ObjectId
        });
      }
      console.log('CategoryItem array:', item);
      setCategoryItem(item);
      console.log('Setting initial subCategory to:', item[0]);
      setSubCategory(item[0]);
    }
  }, [subCategories]);

  useEffect(() => {
    handleModalClose();
  }, [category]);
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

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
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
          // Future: Update UI state with progress
        }
      });
      return uploadRes.data.secure_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      // Enhance error message
      const msg = error.response?.data?.error?.message || error.message || "Image upload failed";
      throw new Error(`Failed to upload ${file.name}: ${msg}`);
    }
  };

  const handleCreateProduct = async () => {
    const cleanDescription = await sanitizeHTML(productDescription);

    // Extract subcategoryId as a string to ensure it's not sent as an object
    const subcategoryIdString = subCategory?._id || subCategory?.id || null;

    setModalError(false); // Reset error state
    setIsSubmitting(true);

    try {
      // Upload images first
      const imageFiles = [img1, img2, img3, img4].filter(img => img);

      if (imageFiles.length === 0) {
        setModalError(true);
        setErrorText("At least one product image is required.");
        handleModalOpen();
        setIsSubmitting(false); // Ensure loader stops
        return;
      }

      // Upload images in parallel 
      // We use Promise.all to fail fast if any upload fails
      let imageUrls;
      try {
        imageUrls = await Promise.all(imageFiles.map(file => handleImageUpload(file)));
      } catch (uploadError) {
        // If any upload fails, we catch it here
        setModalError(true);
        setErrorText(uploadError.message);
        handleModalOpen();
        setIsSubmitting(false);
        return;
      }

      const productObj = {
        ...payload,
        subcategoryId: subcategoryIdString, // Override with the string value
        productDescription: cleanDescription,
        images: imageUrls // Send URLs
      }

      console.log('Final productObj:', productObj);

      const response = await createProduct(productObj);
      setModalError(false);
      console.log(response);
      handleModalOpen();
    } catch (errors) {
      setModalError(true);
      handleModalOpen();
      console.log(errors);
      setErrorText(errors.response?.data?.error || errors.message || "Failed to create product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleSalesPrice = (e) => {
    setRegularPrice(e);
    setSalesPrice(e - (e * 5) / 100);
  };

  return (
    <>
      <FlexibleDiv className="tab__item">
        <FlexibleDiv className="container_wrapper" alignItems="start">
          {/* Left section */}
          <FlexibleDiv
            className="50%"
            flexDir="column"
            alignItems="start"
            gap="24px"
          >
            <FlexibleDiv justifyContent="start" alignItems="start" gap="16px">
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
                options={categoryItem}
                value={subCategory?.value || subCategory}
                onChange={(value) => {
                  // Find the full option object from categoryItem
                  const selectedOption = categoryItem.find(item => item.value === value);
                  console.log('Selected subcategory option:', selectedOption);
                  setSubCategory(selectedOption);
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
            {/* Product Type */}
            <div className="product__item">
              <label htmlFor="Name">Product Type</label>
              <Select
                placeholder="Input product display type"
                backgroundColor="#FAFAFA"
                value={productType}
                options={productTypeItem}
                onChange={(e) => {
                  setProductType(e);
                }}
                width="100%"
              />
            </div>
            {/* Regular Price */}
            <div className="product__item">
              <label htmlFor="Name">Regular Price(NGN)</label>
              <CustomInput
                placeholder="Input Product Price"
                value={regularPrice}
                backgroundColor="#FAFAFA"
                type="number"
                onChange={(e) => {
                  handleSalesPrice(e.target.value);
                }}
              />
            </div>
            {/* Sales Price */}
            <div className="product__item">
              <label htmlFor="Name">Sales Price(NGN)</label>
              <CustomInput
                placeholder="Input Product Price"
                value={salesPrice}
                backgroundColor="#FAFAFA"
                disabled
                type="number"
              />
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
                initialImage={img1}
                clearImage={clearImage}
                setClearImg={setClearImg}
              />
              <CustomUpload
                editable
                setFile={setImg2}
                initialImage={img2}
                clearImage={clearImage}
                setClearImg={setClearImg}
              />
              <FlexibleDiv
                flexDir="column"
                className="column_item"
                width="fit-content"
              >
                <CustomUpload
                  editable
                  setFile={setImg3}
                  initialImage={img3}
                  clearImage={clearImage}
                  setClearImg={setClearImg}
                />
                <CustomUpload
                  editable
                  setFile={setImg4}
                  initialImage={img4}
                  clearImage={clearImage}
                  setClearImg={setClearImg}
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
        {selectedCategory?.attributes?.length > 0 && (
          <FlexibleDiv width="100%" margin="30px 0 0 0" flexDir="column" alignItems="start">
            <h3 style={{ marginBottom: '16px', color: '#1A1A1A', fontSize: '18px', fontWeight: '600' }}>Product Specifications</h3>
            <GridableDiv gridCol="1fr 1fr 1fr" gap="20px" width="100%">
              {selectedCategory.attributes.map((attrItem) => {
                const attr = attrItem.details; // Access populated attribute details
                if (!attr) return null;

                return (
                  <div className="product__item" key={attr.code}>
                    <label htmlFor={attr.code}>{attr.label}</label>
                    {attr.type === 'select' ? (
                      <Select
                        placeholder={`Select ${attr.label}`}
                        backgroundColor="#FAFAFA"
                        width="100%"
                        options={attr.options.map(opt => ({ value: opt, label: opt }))}
                        value={dynamicAttributes[attr.code]}
                        onChange={(value) => handleAttributeChange(attr.code, value)}
                      />
                    ) : attr.type === 'boolean' ? (
                      <Select
                        placeholder={`Select ${attr.label}`}
                        backgroundColor="#FAFAFA"
                        width="100%"
                        options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
                        value={dynamicAttributes[attr.code]}
                        onChange={(value) => handleAttributeChange(attr.code, value)}
                      />
                    ) : (
                      <CustomInput
                        placeholder={`Input ${attr.label}`}
                        backgroundColor="#FAFAFA"
                        type={attr.type === 'number' ? 'number' : 'text'}
                        value={dynamicAttributes[attr.code] || ''}
                        onChange={(e) => handleAttributeChange(attr.code, e.target.value)}
                      />
                    )}
                  </div>
                );
              })}
            </GridableDiv>
          </FlexibleDiv>
        )}

        {/* Add Button */}
        <FlexibleDiv
          justifyContent="end"
          margin="30px 0px 0px 0px"
          className="add_btn"
        >
          <Button
            onClick={handleCreateProduct}
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Add Product
          </Button>
        </FlexibleDiv>
      </FlexibleDiv>
      {/* Modal */}
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
              modalError ? setOpenModal(false) : handleModalClose();
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
            Go to All Product
          </Button>
        </FlexibleDiv>
      </StyledModal>
    </>
  );
};
