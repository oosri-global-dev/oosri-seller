import { useState, useEffect } from "react";
import { ProductDetailsWrapper } from "./product.styles";
import { sanitizeHTML } from "@/utils/sanitize-dom";
import { getOptimizedCloudinaryUrl } from "@/utils/cloudinary-helper";
import { FiEdit2, FiAlertTriangle } from "react-icons/fi";
import { AiFillStar as StarIcon } from "react-icons/ai";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { MdOutlineInventory2 as StockIcon } from "react-icons/md";
import { HiOutlineCurrencyDollar as PayoutIcon } from "react-icons/hi2";
import { getProductReviews } from "@/network/product";

const STATUS_LABELS = { active: "Active", flagged: "Flagged", hidden: "Hidden" };

function StockIndicator({ qty }) {
  const level = qty === 0 ? "out" : qty <= 5 ? "critical" : qty <= 20 ? "low" : "good";
  const widthMap = { out: "0%", critical: "12%", low: "40%", good: "85%" };
  const colorMap = { out: "#ef4444", critical: "#ef4444", low: "#f59e0b", good: "#16a34a" };
  const labelMap = { out: "Out of stock", critical: "Critical — restock now", low: "Low stock", good: "In stock" };

  return (
    <div className="stock__indicator">
      <div className="stock__bar__track">
        <div
          className="stock__bar__fill"
          style={{ width: widthMap[level], background: colorMap[level] }}
        />
      </div>
      <div className="stock__meta" style={{ color: colorMap[level] }}>
        {level === "out" || level === "critical" ? (
          <FiAlertTriangle size={12} />
        ) : null}
        <span>{labelMap[level]}</span>
        <span className="stock__count">{qty} units</span>
      </div>
    </div>
  );
}

function ProductReviewsCard({ productId }) {
  const [page, setPage]       = useState(1);
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;
    setLoading(true);
    getProductReviews(productId, page)
      .then((res) => setData(res?.body || null))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [productId, page]);

  const reviews    = data?.reviews || [];
  const pagination = data?.pagination || {};
  const totalPages = pagination.totalPages || 1;
  const total      = pagination.total || 0;
  const avgRating  = reviews.length
    ? (reviews.reduce((s, r) => s + (r.productRating || 0), 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div className="detail__card">
      <div className="detail__card__header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3>Customer Reviews</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {avgRating && (
            <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.82rem", fontWeight: 700, color: "#111" }}>
              <StarIcon size={13} color="#FCCB1B" />
              {avgRating}
            </span>
          )}
          {total > 0 && (
            <span style={{ fontSize: "0.78rem", color: "#999" }}>{total} review{total !== 1 ? "s" : ""}</span>
          )}
        </div>
      </div>

      <div className="detail__card__body" style={{ padding: "0 24px" }}>
        {loading ? (
          <p style={{ padding: "32px 0", textAlign: "center", color: "#bbb", fontSize: "0.85rem" }}>Loading…</p>
        ) : reviews.length === 0 ? (
          <p className="reviews__empty">No reviews yet for this product.</p>
        ) : (
          <div className="reviews__list">
            {reviews.map((r) => (
              <div key={r.id} className="review__item">
                <div className="reviewer__avatar">
                  {(r.reviewer || "?")[0].toUpperCase()}
                </div>
                <div className="review__body">
                  <div className="review__top">
                    <span className="reviewer__name">{r.reviewer || "Buyer"}</span>
                    <span className="review__date">{r.reviewDate || ""}</span>
                  </div>
                  <div className="stars__row">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <StarIcon key={i} size={13} color={i <= (r.productRating || 0) ? "#FCCB1B" : "#E0E0E0"} />
                    ))}
                  </div>
                  {r.review && <p className="review__text">&ldquo;{r.review}&rdquo;</p>}
                  {r.status && r.status !== "active" && (
                    <span className={`status__pill ${r.status}`}>
                      {STATUS_LABELS[r.status] || r.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {!loading && totalPages > 1 && (
        <div className="reviews__pagination">
          <p className="page__info">
            Page <span>{page}</span> of <span>{totalPages}</span>
          </p>
          <div className="page__btns">
            <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
              <IoChevronBackOutline size={13} />
            </button>
            <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
              <IoChevronForwardOutline size={13} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

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
  const originalPrice = data?.discountPrice && data?.regularPrice > data?.discountPrice
    ? data?.regularPrice
    : null;

  // Use stored sellerPayout from DB (set at create/update time), fall back to 85%
  const payoutAmount  = data?.sellerPayout ?? Number((sellingPrice * 0.85).toFixed(2));
  const platformFee   = Number((sellingPrice - payoutAmount).toFixed(2));

  const stockLevel = stockQty === 0 ? "out" : stockQty <= 5 ? "critical" : stockQty <= 20 ? "low" : "good";

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
          </div>

          {/* ── Payout breakdown card ── */}
          <div className="payout__breakdown">
            <div className="payout__row">
              <span className="payout__row__label">
                <PayoutIcon size={14} />
                Your Payout (85%)
              </span>
              <span className="payout__row__value green">₦{Number(payoutAmount).toLocaleString()}</span>
            </div>
            <div className="payout__row">
              <span className="payout__row__label">Platform fee (15%)</span>
              <span className="payout__row__value muted">₦{Number(platformFee).toLocaleString()}</span>
            </div>
          </div>

          {/* ── Stock inventory ── */}
          <div className="stock__section">
            <div className="stock__header">
              <span className="stock__title">
                <StockIcon size={14} />
                Inventory
              </span>
              <button className="edit__cta small" onClick={() => setEdit(true)}>
                Update Stock
              </button>
            </div>
            <div className="stock__qty__display">
              <span className={`stock__number ${stockLevel}`}>{stockQty}</span>
              <span className="stock__unit">units available</span>
            </div>
            <StockIndicator qty={stockQty} />
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
              <span className="meta__label">Product Type</span>
              <span className="meta__value">{data?.productType || "—"}</span>
            </div>
            {data?.weight && (
              <div className="meta__item">
                <span className="meta__label">Weight</span>
                <span className="meta__value">{data.weight} kg</span>
              </div>
            )}
            {data?.sku && (
              <div className="meta__item">
                <span className="meta__label">SKU</span>
                <span className="meta__value" style={{ fontFamily: "ui-monospace, monospace" }}>{data.sku}</span>
              </div>
            )}
          </div>

          {data?.tags?.length > 0 && (
            <div className="tags__row">
              {data.tags.map((tag) => (
                <span key={tag} className="tag__pill">{tag}</span>
              ))}
            </div>
          )}

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

      {/* ── Reviews ── */}
      {data?._id && <ProductReviewsCard productId={data._id} />}

    </ProductDetailsWrapper>
  );
};
