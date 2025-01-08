import { FlexibleDiv } from "../../../../components/lib/Box/styles"
import Select from "../../../../components/lib/Select"
import { Input } from "antd"
import HeaderTextAndSub from "../../Product/simple-components/simple-components"
import { useState } from "react"
import { CustomUpload } from "../../../../components/lib/CustomUpload"

const {TextArea}=Input

export const MobileTab=()=>{
    const [img1,setImg1]=useState()
    const [img2,setImg2]=useState()
    const [img3,setImg3]=useState()
    const [img4,setImg4]=useState()

    const colorOptions=[
        { value: 'red', label: 'Red' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'Yiminghe', label: 'yiminghe' },
        { value: 'disabled', label: 'Disabled', disabled: true },
      ]
    return(
        <FlexibleDiv className="container_wrapper" alignItems="start">
            {/* Left section */}
          <FlexibleDiv className="50%" flexDir="column" alignItems="start" gap="24px">
            <FlexibleDiv justifyContent="start">
              {/* Name */}
              <div className="product__item">
                <label htmlFor="Name">Product Name</label>
                <HeaderTextAndSub title={<Input placeholder="Input product name" />} content={<p>Do not exceed 40 characters while entering name</p>} />
              </div>
              {/* Color */}
              <div>
                <label htmlFor="Color">Color</label>
                <Select options={colorOptions} placeholder="Select color"/>
              </div>
            </FlexibleDiv>
            {/* Category */}
            <div className="product__item">
                <label htmlFor="Name">Product Category</label>
                <Input placeholder="Mobile Phone" />
            </div>
            {/* Country */}
            <div className="product__item">
                <label htmlFor="Name">Country</label>
                <Input placeholder="Input country" />
            </div>
            {/* Brand */}
            <div className="product__item">
                <label htmlFor="Name">Brand</label>
                <Select options={colorOptions} placeholder="Select product brand"/>
            </div>
            {/* Model */}
            <div className="product__item">
                <label htmlFor="Name">Model</label>
                <Input placeholder="Input model" />
            </div>
            {/* Condition */}
            <div className="product__item">
                <label htmlFor="Name">Condition</label>
                <Select options={colorOptions} placeholder="Select product brand"/>
            </div>
            {/* Sub-Condition */}
            <div className="product__item">
                <label htmlFor="Name">Sub Condition</label>
              <Input placeholder="e.g: Cracked Body only, Cracked Camera...." />
            </div>
            {/* Quantity available */}
            <div className="product__item">
                <label htmlFor="Name">Quantity Available (Stock)</label>
                <Input placeholder="Input quantity available"/>
            </div>
            {/* Display Type */}
            <div className="product__item">
                <label htmlFor="Name">Display Type</label>
                <Input placeholder="Input product display type"/>
            </div>
          </FlexibleDiv>
          {/* right section */}
          <FlexibleDiv flexDir="column" gap="24px" alignItems="start" width="100%">
            <FlexibleDiv className="img__upload" justifyContent="start">
              <CustomUpload editable setFile={setImg1} />
              <CustomUpload editable setFile={setImg1} />
              <FlexibleDiv flexDir="column" className="column_item" width="fit-content">
                <CustomUpload editable setFile={setImg1} />
                <CustomUpload editable setFile={setImg1} />
              </FlexibleDiv>
            </FlexibleDiv>
            {/* Sim Type */}
            <div className="product__item">
                <label htmlFor="Name">SIM Type</label>
                <Input placeholder="Input type"/>
            </div>
            {/* Price */}
            <div className="product__item">
                <label htmlFor="Name">Price</label>
                <Input placeholder="Input Product Price"/>
            </div>
            {/* Operating System */}
            <div className="product__item">
                <label htmlFor="Name">Operating  System</label>
                <Input placeholder="Input product operating system"/>
            </div>
            {/* Discounts */}
            <div className="product__item">
                <label htmlFor="Name">Dsicounts</label>
                <Input placeholder="Specify if there are promotions, discounts"/>
            </div>
            {/* Storage Capacity */}
            <div className="product__item">
                <label htmlFor="Name">Storage Capacity</label>
                <Input placeholder="Select Storage"/>
            </div>
            {/*Product Description*/}
            <div className="product__item">
                <label htmlFor="Name">Product Description</label>
                <TextArea placeholder="Minimum of 1000 words"/>
            </div>
          </FlexibleDiv>
        </FlexibleDiv>
    )
}