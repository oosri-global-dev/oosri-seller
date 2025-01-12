import { FlexibleDiv } from "../../../../components/lib/Box/styles"
import Select from "../../../../components/lib/Select"
import { Input } from "antd"
import { useEffect, useState } from "react"
import { CustomUpload } from "../../../../components/lib/CustomUpload"
import { createProduct } from "@/network/product"
import Button from "@/components/lib/Button"
import { StyledModal } from "@/components/lib/NoBusinessModal/index.styles"
import { CustomInput } from "@/components/lib/CustomInput/index.styles"
import { CountrySelect } from "@/components/lib/CountrySelect"

const {TextArea}=Input

export const CreateTab=({subCategories,category})=>{
    const [img1,setImg1]=useState()
    const [img2,setImg2]=useState()
    const [img3,setImg3]=useState()
    const [img4,setImg4]=useState()
    const[productName,setProductName]=useState("")
    const[productDescription,setProductDescription]=useState("")
    const[brandArtist,setBrandArtist]=useState("")
    const[discount,setDiscount]=useState("")
    const[weight,setWeight]=useState("")
    const[country,setCountry]=useState("")
    const [openModal,setOpenModal]=useState(false)
    const [categoryItem,setCategoryItem]=useState([])
    const[subCategory,setSubCategory]=useState("")
    const [productType,setProductType]=useState()
    const [regularPrice,setRegularPrice]=useState("")
    const [salesPrice,setSalesPrice]=useState("")
    const [width,setWidth]=useState("")
    const [height,setHeight]=useState("")
    const [technique,setTechnique]=useState("")
    const [length,setLength]=useState("")
    const [fabricType,setFabricType]=useState("")
    const [clayType,setClayType]=useState("")
    const [glaze,setGlaze]=useState("")
    const [diameter,setDiameter]=useState("")
    const [pattern,setPattern]=useState("")
    const [stoneType,setStoneType]=useState("")
    const [metalType,setMetalType]=useState("")
    const [medium,setMedium]=useState("")
    const [condition,setCondition]=useState("")
    const [size,setSize]=useState("")
    const[modalError,setModalError]=useState(false)
    const[errorText,setErrorText]=useState(" ")

  const payload={
    category:category,
    productName:productName,
    productDescription:productDescription,
    brandArtist:brandArtist,
    images:[img1,img2,img3,img4],
    country:country,
    subcategory:subCategory?.value,
    salesPrice:salesPrice,
    regularPrice:regularPrice,
    productType:productType,
    discount:discount,
    ...(category === "Sculpture" && {
      width: width,
      weight:weight,
      height: height,
      technique: technique,
    }),
    ...(category === "Jewelry" && {
      length: length,
      diameter:diameter,
      stoneType: stoneType,
      metalType: metalType,
    }),
    ...(category === "Paintings" && {
      medium: medium,
      condition:condition,
      size:size,
    }),
    ...(category === "Pottery" && {
      height: height,
      diameter:diameter,
      clayType: clayType,
      glaze: glaze,
    }),
    ...(category === "Textiles/Fabrics" && {
      length: length,
      weight:weight,
      width: width,
      fabricType: fabricType,
      pattern:pattern,
    }),
  }
  
      useEffect(()=>{
        if(subCategories){
          const item=[]
          for (let index = 0; index < subCategories.length; index++) {
            item.push(
              {
                value:subCategories[index].name,
                label:subCategories[index].name,
              }
            )
          }
          setCategoryItem(item)
          setSubCategory(item[0])
        }
      },[subCategories])

      const productTypeItem=[
        {value:"simple",label:"Simple"},
        {value:"variable",label:"Variable"}
      ]

      const conditionItem=[
        {value:"New",label:"New"},
        {value:"Used",label:"Used"},
        {value:"Antique",label:"Antique"}
      ]

      const handleCreateProduct=async ()=>{
        try{
          const response=await createProduct(payload)
          setModalError(false)
          console.log(response)
          handleModalOpen()
        }catch(errors){
          setModalError(true)
          handleModalOpen()
          console.log(errors)
          setErrorText(errors.response.data.error)
        }
      }

      const handleModalOpen=()=>{
        setOpenModal(true)
      }
      
    return(
      <>
      <FlexibleDiv className="tab__item">
          <FlexibleDiv className="container_wrapper" alignItems="start">
            {/* Left section */}
          <FlexibleDiv className="50%" flexDir="column" alignItems="start" gap="24px">
            <FlexibleDiv justifyContent="start" alignItems="start" gap="16px">
              {/* Name */}
              <div className="product__item">
                <label htmlFor="Name">Product Name</label>
                  <CustomInput width={"100%"} placeholder="Input product name" backgroundColor="#FAFAFA" value={productName} onChange={(e)=>{setProductName(e.target.value)}}/>
                  <p>Do not exceed 40 characters while entering name</p>
              </div>
            </FlexibleDiv>
            {/* Category */}
            <div className="product__item">
                <label htmlFor="Name">Product Category</label>
                <Select options={categoryItem} value={subCategory} onChange={(e)=>{setSubCategory(e)}} backgroundColor="#FAFAFA" width="100%"/>
            </div>
            {/* Brand */}
            <div className="product__item">
                <label htmlFor="Name">Brand</label>
                <CustomInput placeholder="Select product brand" backgroundColor="#FAFAFA" onChange={(e)=>{setBrandArtist(e.target.value)}}/>
            </div>
            {/* Country */}
            <div className="product__item">
                <label htmlFor="Name">Country</label>
                <CountrySelect  placeholder="Input country" onChange={(e)=>{setCountry(e)}}/>
            </div>
            {/* Quantity available */}
            <div className="product__item">
                <label htmlFor="Name">Quantity Available (Stock)</label>
                <CustomInput placeholder="Input quantity available" backgroundColor="#FAFAFA"/>
            </div>
            {/* Product Type */}
            <div className="product__item">
                <label htmlFor="Name">Product Type</label>
                <Select placeholder="Input product display type" backgroundColor="#FAFAFA" options={productTypeItem} onChange={(e)=>{setProductType(e)}} width="100%"/>
            </div>
            {/* Regular Price */}
            <div className="product__item">
                <label htmlFor="Name">Regular Price(NGN)</label>
                <CustomInput placeholder="Input Product Price" backgroundColor="#FAFAFA" type="number" onChange={(e)=>{setSalesPrice(e.target.value)}} />
            </div>
            {/* Sales Price */}
            <div className="product__item">
                <label htmlFor="Name">Sales Price(NGN)</label>
                <CustomInput placeholder="Input Product Price" backgroundColor="#FAFAFA" onChange={((e)=>{setRegularPrice(e.target.value)})} type="number"/>
            </div>
          </FlexibleDiv>
          {/* right section */}
          <FlexibleDiv flexDir="column" gap="24px" alignItems="start" width="100%">
            <FlexibleDiv className="img__upload" justifyContent="start">
              <CustomUpload editable setFile={setImg1} />
              <CustomUpload editable setFile={setImg2} />
              <FlexibleDiv flexDir="column" className="column_item" width="fit-content">
                <CustomUpload editable setFile={setImg3} />
                <CustomUpload editable setFile={setImg4} />
              </FlexibleDiv>
            </FlexibleDiv>
            {/* Discounts */}
            <div className="product__item">
                <label htmlFor="Name">Dsicounts</label>
                <CustomInput placeholder="Specify if there are promotions, discounts" backgroundColor="#FAFAFA" onChange={(e)=>{setDiscount(e.target.value)}} type="number"/>
            </div>
            {/*Product Description*/}
            <div className="product__item">
                <label htmlFor="Name">Product Description</label>
                <TextArea placeholder="Minimum of 1000 words" width="100%" value={productDescription} onChange={(e)=>{setProductDescription(e.target.value)}}/>
            </div>
            {
              category==="Sculpture"?
              <>
              {/* Weight */}
              <div className="product__item">
                  <label htmlFor="Name">Weight</label>
                  <CustomInput placeholder="Input Product Weight" backgroundColor="#FAFAFA" onChange={((e)=>{setWeight(e.target.value)})} type="number"/>
              </div>
              {/* Width */}
              <div className="product__item">
                  <label htmlFor="Name">Width</label>
                  <CustomInput placeholder="Input Product Width" backgroundColor="#FAFAFA" onChange={((e)=>{setWidth(e.target.value)})} type="number"/>
              </div>
              {/* Height */}
              <div className="product__item">
                  <label htmlFor="Name">Height</label>
                  <CustomInput placeholder="Input Product Height" backgroundColor="#FAFAFA" onChange={((e)=>{setHeight(e.target.value)})} type="number"/>
              </div>
              {/* Technique */}
              <div className="product__item">
                  <label htmlFor="Name">Technique</label>
                  <CustomInput placeholder="Input Product Technique" backgroundColor="#FAFAFA" onChange={((e)=>{setTechnique(e.target.value)})}/>
              </div>
              </>:category==="Textiles/Fabrics"?
              <>
              {/* Weight */}
              <div className="product__item">
                  <label htmlFor="Name">Weight</label>
                  <CustomInput placeholder="Input Product Weight" backgroundColor="#FAFAFA" onChange={((e)=>{setWeight(e.target.value)})} type="number"/>
              </div>
              {/* Width */}
              <div className="product__item">
                  <label htmlFor="Name">Width</label>
                  <CustomInput placeholder="Input Product Width" backgroundColor="#FAFAFA" onChange={((e)=>{setWidth(e.target.value)})} type="number"/>
              </div>
              {/* length */}
              <div className="product__item">
                  <label htmlFor="Name">Length</label>
                  <CustomInput placeholder="Input Product Length" backgroundColor="#FAFAFA" onChange={((e)=>{setLength(e.target.value)})} type="number"/>
              </div>
              {/* Pattern */}
              <div className="product__item">
                  <label htmlFor="Name">Pattern</label>
                  <CustomInput placeholder="Input Product Pattern" backgroundColor="#FAFAFA" onChange={((e)=>{setPattern(e.target.value)})}/>
              </div>
              {/* FabricType */}
              <div className="product__item">
                  <label htmlFor="Name">Fabric Type</label>
                  <CustomInput placeholder="Input Product Fabric Type" backgroundColor="#FAFAFA" onChange={((e)=>{setFabricType(e.target.value)})}/>
              </div>
              </>:category==="Pottery"?
              <>
                  {/* Diameter */}
                  <div className="product__item">
                  <label htmlFor="Name">Diameter</label>
                  <CustomInput placeholder="Input Product Diameter" backgroundColor="#FAFAFA" onChange={((e)=>{setDiameter(e.target.value)})} type="number"/>
                   </div>
                  {/* ClayType */}
                  <div className="product__item">
                      <label htmlFor="Name">Clay Type</label>
                      <CustomInput placeholder="Input Clay Type" backgroundColor="#FAFAFA" onChange={((e)=>{setClayType(e.target.value)})}/>
                  </div>
                  {/* Height */}
                  <div className="product__item">
                      <label htmlFor="Name">Height</label>
                      <CustomInput placeholder="Input Product Height" backgroundColor="#FAFAFA" onChange={((e)=>{setHeight(e.target.value)})} type="number"/>
                  </div>
                  {/* Glaze */}
                  <div className="product__item">
                      <label htmlFor="Name">Glaze</label>
                      <CustomInput placeholder="Input Product Glaze" backgroundColor="#FAFAFA" onChange={((e)=>{setGlaze(e.target.value)})}/>
                  </div>
              </>:category==="Paintings"?
              <>
                  {/* Medium */}
                  <div className="product__item">
                  <label htmlFor="Name">Medium</label>
                  <CustomInput placeholder="Input Painting Medium" backgroundColor="#FAFAFA" onChange={((e)=>{setMedium(e.target.value)})}/>
                   </div>
                  {/* Condition */}
                  <div className="product__item">
                      <label htmlFor="Name">Condition</label>
                       <Select width="100%" placeholder="Input Painting Condition" backgroundColor="#FAFAFA" options={conditionItem} value={condition} onChange={(e)=>{setCondition(e)}} />
                  </div>
                  {/* Size */}
                  <div className="product__item">
                      <label htmlFor="Name">Size</label>
                      <CustomInput placeholder="Input Painting Size" backgroundColor="#FAFAFA" onChange={((e)=>{setSize(e.target.value)})} type="number"/>
                  </div>
              </>:category==="Jewelry"&&
              <>
                {/* length */}
                <div className="product__item">
                    <label htmlFor="Name">Length</label>
                    <CustomInput placeholder="Input Product Length" backgroundColor="#FAFAFA" onChange={((e)=>{setLength(e.target.value)})} type="number"/>
                </div>
                {/* Diameter */}
                <div className="product__item">
                    <label htmlFor="Name">Diameter</label>
                    <CustomInput placeholder="Input Product Diameter" backgroundColor="#FAFAFA" onChange={((e)=>{setDiameter(e.target.value)})} type="number"/>
                </div>
                {/* stoneType */}
                <div className="product__item">
                    <label htmlFor="Name">Stone Type</label>
                    <CustomInput placeholder="Input Stone Type" backgroundColor="#FAFAFA" onChange={((e)=>{setStoneType(e.target.value)})} />
                </div>
                {/* Metal type */}
                <div className="product__item">
                    <label htmlFor="Name">Metal Type</label>
                    <CustomInput placeholder="Input Metal Type" backgroundColor="#FAFAFA" onChange={((e)=>{setMetalType(e.target.value)})} />
                </div>
              </>
            }
          </FlexibleDiv>
        </FlexibleDiv>
          {/* Add Button */}
          <FlexibleDiv justifyContent="end" margin="15px 0px 0px 0px"> 
            <Button onClick={handleCreateProduct}>
              Add Product
            </Button>
          </FlexibleDiv>
          </FlexibleDiv>
            {/* Modal */}
            <StyledModal maskClosable={true} open={openModal} centered closeIcon={null} className="modal" footer={null}>
            {
              modalError?
              <>
                <h2 style={{textAlign:"center"}}>Product Submission Failed</h2>
                <p style={{textAlign:"center",margin:"16px 0px", color:"#777777"}}>{errorText}</p>
              </>:
              <>
                <h2 style={{textAlign:"center"}}>Product Submission Received</h2>
                <p style={{textAlign:"center",margin:"16px 0px", color:"#777777"}}>Thank you for adding your product to our platform. Your listing has been received and is now in the review process. Our team will carefully assess your product to ensure it meets our quality standards and guidelines.</p>
              </>
            }
              <FlexibleDiv flexWrap="nowrap" gap="24px">
                <Button border="1px solid #FC5353" color="#FC5353" hoverBg="white" hoverColor="var(--oosriPrimary)" width="100%" onClick={()=>setOpenModal(false)}>Cancel</Button>
                <Button onClick={()=>window.location="/products"} border="1px solid #FC5353" color="white" backgroundColor="var(--oosriPrimary)" width="100%">Go to All Product</Button>
              </FlexibleDiv>
            </StyledModal>
      </>
    )
}