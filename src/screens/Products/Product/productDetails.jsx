import { CreateProductPageWrapper } from "../Create/index.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import Button from "@/components/lib/Button";
import { ProductWrapper } from "./product.styles";
import { sanitizeHTML } from "@/utils/sanitize-dom";
import { getOptimizedCloudinaryUrl } from "@/utils/cloudinary-helper";

export function ProductDescription({ html }) {
  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizeHTML(html || "") }}
    />
  );
}

export const ProductDetails = ({ data, setEdit }) => {
  // data.category is now an object with populated attributes
  const category = data?.category;

  return (
    <CreateProductPageWrapper style={{ width: "100%" }}>
      <ProductWrapper className="tab__item">
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
                <h5 width={"100%"}>{data?.productName}</h5>
              </div>
            </FlexibleDiv>
            {/* Category */}
            <div className="product__item">
              <label htmlFor="Name">Product Category</label>
              <h5>{data?.subCategory}</h5>
            </div>
            {/* Brand */}
            <div className="product__item">
              <label htmlFor="Name">Brand</label>
              <h5>{data?.brandArtist}</h5>
            </div>
            {/* Product Type */}
            <div className="product__item">
              <label htmlFor="Name">Product Type</label>
              <h5>{data?.productType}</h5>
            </div>
            {/* Regular Price */}
            {data?.previousPrice === data?.regularPrice ? (
              <div className="product__item">
                <label htmlFor="Name">Regular Price(NGN)</label>
                <h5>{data?.regularPrice}</h5>
              </div>
            ) : (
              <div>
                <label htmlFor="Name">Regular Price(NGN)</label>
                <FlexibleDiv
                  justifyContent="start"
                  flexWrap="nowrap"
                  gap="20px"
                >
                  <h5>{data?.regularPrice}</h5>
                  <h5 style={{ textDecoration: "line-through", color: "gray" }}>
                    {data?.previousPrice}
                  </h5>
                </FlexibleDiv>
              </div>
            )}
            {/* Sales Price */}
            <div className="product__item">
              <label htmlFor="Name">Sales Price(NGN)</label>
              <h5>{data?.salesPrice}</h5>
            </div>
          </FlexibleDiv>
          {/* right section */}
          <FlexibleDiv
            flexDir="column"
            gap="24px"
            alignItems="start"
            width="100%"
          >
            <FlexibleDiv gap="16px" justifyContent="start">
              {data.images.map((item) => {
                return <img src={getOptimizedCloudinaryUrl(item, 800)} key={item} className="details__img" />;
              })}
            </FlexibleDiv>
            {/* Discounts */}
            <div className="product__item">
              <label htmlFor="Name">Discounts</label>
              <h5>{data?.discount}</h5>
            </div>
            {/*Product Description*/}
            <div className="product__item">
              <label htmlFor="Name">Product Description</label>
              {/* <h5>{data?.productDescription}</h5> */}
              <ProductDescription html={data?.productDescription} />
            </div>
            {/* Dynamic Attributes Rendering */}
            {category?.attributes?.length > 0 && category.attributes.map((attrItem) => {
              const detail = attrItem.attributeId;
              if (!detail) return null;

              const value = data.attributes?.[detail.code];
              if (value === undefined || value === null || value === '') return null;

              return (
                <div className="product__item" key={detail.code}>
                  <label htmlFor={detail.code}>{detail.label}</label>
                  {detail.type === 'rich_text' ? (
                    <ProductDescription html={String(value)} />
                  ) : (
                    <h5 width={"100%"}>{String(value)}</h5>
                  )}
                </div>
              );
            })}
          </FlexibleDiv>
        </FlexibleDiv>
      </ProductWrapper>

      <FlexibleDiv justifyContent="end" alignItems="start">
        <Button
          className="edit__button"
          onClick={() => {
            setEdit(true);
          }}
        >
          Edit
        </Button>
      </FlexibleDiv>
    </CreateProductPageWrapper >
  );
};
