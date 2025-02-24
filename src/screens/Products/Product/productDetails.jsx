import { useState } from "react"
import { CreateProductPageWrapper } from "../Create/index.styles"
import { FlexibleDiv } from "@/components/lib/Box/styles"
import Button from "@/components/lib/Button"


export const ProductDetails=({data,setEdit})=>{
    const [category,setCategory]=useState(data?.category)
    const[productName,setProductName]=useState(data?.productName)
    const[productDescription,setProductDescription]=useState(data?.productDescription)
    const[brandArtist,setBrandArtist]=useState(data?.brandArtist)
    const[discount,setDiscount]=useState(data?.discount)
    const[weight,setWeight]=useState(data?.weight)
    const [categoryItem,setCategoryItem]=useState([])
    const[subCategory,setSubCategory]=useState(data.subcategory)
    const [productType,setProductType]=useState(data.productType)
    const [regularPrice,setRegularPrice]=useState(data?.regularPrice)
    const [salesPrice,setSalesPrice]=useState(data?.salesPrice)
    const [width,setWidth]=useState(data?.width)
    const [height,setHeight]=useState(data.height)
    const [technique,setTechnique]=useState(data?.technique)
    const [length,setLength]=useState(data?.length)
    const [fabricType,setFabricType]=useState(data?.fabricType)
    const [clayType,setClayType]=useState(data?.clayType)
    const [glaze,setGlaze]=useState(data?.glaze)
    const [diameter,setDiameter]=useState(data?.diameter)
    const [pattern,setPattern]=useState(data?.pattern)
    const [stoneType,setStoneType]=useState(data?.stoneType)
    const [metalType,setMetalType]=useState(data?.metalType)
    const [medium,setMedium]=useState(data?.medium)
    const [condition,setCondition]=useState(data?.condition)
    const [size,setSize]=useState(data?.size)

    return(
        <CreateProductPageWrapper style={{width:"100%"}}>
            <FlexibleDiv className="tab__item">
                <FlexibleDiv className="container_wrapper" alignItems="start">
                {/* Left section */}
                <FlexibleDiv className="50%" flexDir="column" alignItems="start" gap="24px">
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
                <div className="product__item">
                    <label htmlFor="Name">Regular Price(NGN)</label>
                    <h5>{data?.regularPrice}</h5>
                </div>
                {/* Sales Price */}
                <div className="product__item">
                    <label htmlFor="Name">Sales Price(NGN)</label>
                    <h5>{data?.salesPrice}</h5>
                </div>
                </FlexibleDiv>
                {/* right section */}
                <FlexibleDiv flexDir="column" gap="24px" alignItems="start" width="100%">
                    <FlexibleDiv gap="16px" justifyContent="start">
                        {
                            data.images.map((item)=>{
                                return(
                                    <img src={item} key={item} className="details__img" />
                                )
                            })
                        }
                    </FlexibleDiv>
                {/* Discounts */}
                <div className="product__item">
                    <label htmlFor="Name">Dsicounts</label>
                    <h5>{data?.discount}</h5>
                </div>
                {/*Product Description*/}
                <div className="product__item">
                    <label htmlFor="Name">Product Description</label>
                    <h5>{data?.productDescription}</h5>
                </div>
                {
                    category==="Sculpture"?
                    <>
                    {/* Weight */}
                    <div className="product__item">
                        <label htmlFor="Name">Weight</label>
                        <h5>{weight}</h5>
                    </div>
                    {/* Width */}
                    <div className="product__item">
                        <label htmlFor="Name">Width</label>
                        <h5>{width}</h5>
                    </div>
                    {/* Height */}
                    <div className="product__item">
                        <label htmlFor="Name">Height</label>
                        <h5>{height}</h5>
                    </div>
                    {/* Technique */}
                    <div className="product__item">
                        <label htmlFor="Name">Technique</label>
                        <h5>{technique}</h5>
                    </div>
                    </>:category==="Textiles/Fabrics"?
                    <>
                    {/* Weight */}
                    <div className="product__item">
                        <label htmlFor="Name">Weight</label>
                        <h5>{weight}</h5>
                    </div>
                    {/* Yard */}
                    <div className="product__item">
                        <label htmlFor="Name">Yard</label>
                        <h5>{data?.yard}</h5>
                    </div>
                    {/* Pattern */}
                    <div className="product__item">
                        <label htmlFor="Name">Pattern</label>
                        <h5>{pattern}</h5>
                    </div>
                    {/* FabricType */}
                    <div className="product__item">
                        <label htmlFor="Name">Fabric Type</label>
                        <h5>{fabricType}</h5>
                    </div>
                    </>:category==="Pottery"?
                    <>
                        {/* Diameter */}
                        <div className="product__item">
                        <label htmlFor="Name">Diameter</label>
                        <h5>{diameter}</h5>
                        </div>
                        {/* ClayType */}
                        <div className="product__item">
                            <label htmlFor="Name">Clay Type</label>
                            <h5>{clayType}</h5>
                        </div>
                        {/* Height */}
                        <div className="product__item">
                            <label htmlFor="Name">Height</label>
                            <h5>{height}</h5>
                        </div>
                        {/* Glaze */}
                        <div className="product__item">
                            <label htmlFor="Name">Glaze</label>
                            <h5>{glaze}</h5>
                        </div>
                    </>:
                    category==="Paintings"?
                    <>
                    {/* Medium */}
                        <div className="product__item">
                        <label htmlFor="Name">Medium</label>
                        <h5>{medium}</h5>
                        </div>
                        {/* Condition */}
                        <div className="product__item">
                            <label htmlFor="Name">Condition</label>
                            <h5>{condition}</h5>
                        </div>
                        {/* Size */}
                        <div className="product__item">
                            <label htmlFor="Name">Size</label>
                            <h5>{size}</h5>
                        </div>
                    </>:category==="Jewelry"&&
                    <>
                    {/* length */}
                    <div className="product__item">
                        <label htmlFor="Name">Length</label>
                        <h5>{length}</h5>
                    </div>
                    {/* Diameter */}
                    <div className="product__item">
                        <label htmlFor="Name">Diameter</label>
                        <h5>{diameter}</h5>
                    </div>
                    {/* stoneType */}
                    <div className="product__item">
                        <label htmlFor="Name">Stone Type</label>
                        <h5>{stoneType}</h5>
                    </div>
                    {/* Metal type */}
                    <div className="product__item">
                        <label htmlFor="Name">Metal Type</label>
                        <h5>{metalType}</h5>
                    </div>
                    </>
                }
                </FlexibleDiv>
              </FlexibleDiv>
            </FlexibleDiv>
              <FlexibleDiv justifyContent="end" alignItems="start">
                  <Button className="edit__button" onClick={()=>{setEdit(true)}}>
                   Edit
                  </Button>
              </FlexibleDiv>
        </CreateProductPageWrapper>
    )
}