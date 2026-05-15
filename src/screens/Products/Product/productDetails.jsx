import { useState } from "react";
import { ProductDetailsWrapper } from "./product.styles";
import { sanitizeHTML } from "@/utils/sanitize-dom";
import { getOptimizedCloudinaryUrl } from "@/utils/cloudinary-helper";
import { FiEdit2 } from "react-icons/fi";

export function ProductDescription({ html }) {
  return (
    <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(html || "") }} />
  );
}

export const ProductDetails = ({ data, setEdit }) => {
  const [activeImg, setActiveImg] = useState(0);

  const category   = data?.category;
  const images     = data?.images || [];
  const stockQty   = Number(data?.inStock ?? data?.quantity ?? 0);

  const sellingPrice  = data?.discountPrice || data?.regularPrice || 0;
  const originalPrice = data?.discountPrice ? data?.regularPrice : null;
  const discount      = originalPrice
    ? Math.round(((originalPrice - sellingPrice) / originalPrice) * 100)
    : null;

  const estimatedPayout = Number(sellingPrice * 0.9).toLocaleString("en-NG", {
    minimumFractionDigits: 0,
  });

  return (
    <ProductDetailsWrapper>

      {/* ── Hero: gallery + summary ── */}
      <div className="hero__section">

        {/* Gallery */}
        <div className="gallery">
          <div className="gallery__main">
            {images[activeImg] ? (
              <img
                src={getOptimizedCloudinaryUrl(images[activeImg], 600)}
                alt={data?.productName}
              />
            ) : (
              <span style={{ color: "#ccc", fontSize: "0.85rem" }}>No image</span>
            )}
          </div>

          {images.length > 1 && (
            <div className="gallery__thumbs">
              {images.map((img, i) => (
                <button
                  key={img}
                  className={`thumb${i === activeImg ? " active" : ""}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img
                    src={getOptimizedCloudinaryUrl(img, 120)}
                    alt={`Product view ${i + 1}`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="product__summary">
          <div className="summary__badges">
            <span className={`status__badge ${data?.isVisible ? "active" : "hidden"}`}>
              {data?.isVisible ? "Active" : "Hidden"}
            </span>
            {data?.productType && (
              <span className="type__badge">{data.productType}</span>
            )}
          </div>

          <h1 className="product__title">{data?.productName}</h1>

          <div className="price__block">
            <span className="price__main">₦{Number(sellingPrice).toLocaleString()}</span>
            {originalPrice && (
              <span className="price__old">₦{Number(originalPrice).toLocaleString()}</span>
            )}
            {discount > 0 && (
              <span className="discount__badge">-{discount}%</span>
            )}
          </div>

          <div className="meta__grid">
            <div className="meta__item">
              <span className="meta__label">Category</span>
              <span className="meta__value">{category?.name || "—"}</span>
            </div>
            <div className="meta__item">
              <span className="meta__label">Sub-category</span>
              <span className="meta__value">{data?.subCategory || "—"}</span>
            </div>
            <div className="meta__item">
              <span className="meta__label">Brand / Artist</span>
              <span className="meta__value">{data?.brandArtist || "—"}</span>
            </div>
            <div className="meta__item">
              <span className="meta__label">Stock</span>
              <span className="meta__value">{stockQty} units</span>
            </div>
          </div>

          <div className="payout__info">
            <span>Estimated payout (after fees)</span>
            <strong>₦{estimatedPayout}</strong>
          </div>

          <button className="edit__cta" onClick={() => setEdit(true)}>
            <FiEdit2 size={15} />
            Edit Product
          </button>
        </div>
      </div>

      {/* ── Description ── */}
      {data?.productDescription && (
        <div className="detail__card">
          <div className="detail__card__header">
            <h3>Description</h3>
          </div>
          <div className="detail__card__body prose">
            <ProductDescription html={data.productDescription} />
          </div>
        </div>
      )}

      {/* ── Specifications ── */}
      {category?.attributes?.length > 0 && (
        <div className="detail__card">
          <div className="detail__card__header">
            <h3>Specifications</h3>
          </div>
          <div className="detail__card__body">
            <div className="specs__grid">
              {category.attributes.map((attrItem) => {
                const detail = attrItem.attributeId;
                if (!detail) return null;
                const value = data?.attributes?.[detail.code];
                if (value === undefined || value === null || value === "") return null;
                return (
                  <div className="spec__item" key={detail.code}>
                    <span className="spec__label">{detail.label}</span>
                    {detail.type === "rich_text" ? (
                      <ProductDescription html={String(value)} />
                    ) : (
                      <span className="spec__value">{String(value)}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </ProductDetailsWrapper>
  );
};
