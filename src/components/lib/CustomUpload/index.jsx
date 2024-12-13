import { useState, useEffect } from "react";
import { CustomUploaderWrapper } from "./index.styles";
import { IoMdAdd } from "react-icons/io";

export function CustomUpload({ setFile, initialImage,editable, title }){
  const [error, setError] = useState(null);
  const [imageSrc, setImageSrc] = useState(initialImage || null);
  const [isImageVisible, setIsImageVisible] = useState(!!initialImage);

  // Effect to handle displaying initial image if available
  useEffect(() => {
    setImageSrc(initialImage || null);
    setIsImageVisible(!!initialImage);
  }, [initialImage]);

  // Handler for file input change
  const handleFileChange = (event) => {
    const target = event.target;
    const selectedFile = target.files?.[0] || null;

    if (selectedFile) {
      const fileType = selectedFile.type;
      if (fileType.startsWith("image/")) {
        // Validate file type
        if (!["image/svg+xml", "image/png", "image/jpeg"].includes(fileType)) {
          setError("Invalid file type. Please select an SVG, PNG, or JPG file.");
          setFile(null);
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = function () {
            if (img.width > 2000 || img.height > 2000) { // Set the limit for the width and height of the image
              setError("Image dimensions exceed the maximum allowed size of 2000x2000 pixels.");
              setFile(null);
              setIsImageVisible(false); // Hide the preview
            } else {
              setError(null);
              setImageSrc(e.target?.result); // Update preview
              setIsImageVisible(true); // Show the image
              setFile(selectedFile);
            }
          };
          img.onerror = function () {
            setError("Error loading image.");
            setFile(null);
            setIsImageVisible(false); // Hide the preview
          };
          img.src = URL.createObjectURL(selectedFile);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setError("Invalid file type. Please select an SVG, PNG, or JPG file.");
        setFile(null);
      }
    }
  };

  return (
    <CustomUploaderWrapper>
        <p className="upload__title">{title}</p>
      <div className="upload__container"
       style={
        {backgroundColor:editable?"rgba(0, 0, 0, 0.5)":"transparent",borderStyle:editable?"solid":"dashed"}}
      >
        {editable&&(
            <input
                type="file"
                id="fileInput"
                className="upload__input"
                accept="image/svg+xml, image/png, image/jpeg"
                onChange={handleFileChange}
            />
        )}
        {isImageVisible && (
          <img
            id="previewImage"
            className="upload__image"
            src={imageSrc || ""}
            alt="Image Preview"
          />
        )}
        {!isImageVisible && (
          <div className="placeholder__container">
            <IoMdAdd />
              <p className="main__text">Upload Image</p>
          </div>
        )}
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </CustomUploaderWrapper>
  );
};