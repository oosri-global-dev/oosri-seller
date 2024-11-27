import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import {DashboardWrapper} from "../Dashboard/dashboard.styles";
import { Tabs, Form } from "antd";
import { useState } from "react";

import { SellersProfileWrapper } from "../SellerProfile/seller-profile.styles";
import TextField from "@/components/lib/TextField";
import Select from "@/components/lib/Select";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import  SellerImage from "@/assets/images/sellerimage.png";
import Button from "@/components/lib/Button";
import useNotification from "@/hooks/useNotification";
import CustomLoader from "@/components/lib/CustomLoader";

export default function EditBusiness() {
    const [activeTab, setActiveTab] = useState("personal-details");
  const items = [
    {
      key: "1",
      label: "Personal Details",
    },
    {
      key: "2",
      label: "Business Details",
    },
    {
      key: "3",
      label: "Bank Details",
    },
  ];

  const profileData = {
    name: "Henry Collins",
    sex: "Male",
    email: "henrycollins23@gmail.com",
    phone: "+2347011046109",
    address: "123 Main Street, Suite 456, Anytown, CA 98765, United States",
    dob: "14th August 1995",
    country: "United States",
    regDate: "11th August 2023",
  };  

  const businessData = {
    name: "Henry Collins",
    type: "partnership",
    regNum: "+2347011046109",
    address: "123 Main Street, Suite 456, Anytown, CA 98765, United States",
    description: "MobileMaster is your trusted destination for all things mobile technology. With years of experience in the industry, we are dedicated to delivering top-notch products and services to meet your mobile needs.e offer a wide range of the latest smartphones, from top brands to budget-friendly options. Our knowledgeable staff can help you find the perfect phone to suit your needs."
  };  

  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [success, error] = useNotification();

  const businessTypeOptions = [
    { value: "Corporate", label: "Corporate" },
    { value: "Personal", label: "Personal" },
  ];

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      // Replace with your API call or logic
      console.log("Submitted Values:", values);
      success("Business details saved successfully!");
      setIsLoading(false);
    } catch (err) {
      error("An error occurred while saving your details.");
      setIsLoading(false);
    }
  };

    return (
        <DashboardLayout title="My Profile">
            <SellersProfileWrapper>
            <Tabs
            className="tabs__custom"
            defaultActiveKey="1"
            items={items}
            onChange={(e) => {
                if (e === "1") setActiveTab("personal-details");
                else if (e === "2") setActiveTab("business-details");
                else setActiveTab("bank-details");
            }}
            />

            {/* Profile Content */}
            {activeTab === "personal-details" && (
                <FlexibleDiv className="profile__details__section">
                
                <FlexibleDiv className="profile__info__wrapper">
                        <h2 style={{
                            justifyContent: "flex-start", textAlign:"left",
                            width:"100%",
                            paddingLeft:"30px"
                        }}>Personal Information</h2>

                        <FlexibleDiv className="info_cont">
                        <FlexibleDiv className="info__inner_cont1" flexDir="row"> 
                            <FlexibleDiv className="info1" flexDir="column"> 
                                <p>Full Legal Name</p>
                                <p>{profileData.name}</p>
                            </FlexibleDiv>

                            <FlexibleDiv className="info2" flexDir="column"> 
                                <p>Sex</p>
                                <p>{profileData.sex}</p>
                            </FlexibleDiv>
                        </FlexibleDiv>

                        <FlexibleDiv className="info__inner_cont2"> 
                            <FlexibleDiv className="info1"> 
                                <p>Email Address</p>
                                <p>{profileData.email}</p>
                            </FlexibleDiv>

                            <FlexibleDiv className="info2"> 
                                <p>Phone Number</p>
                                <p>{profileData.phone}</p>
                            </FlexibleDiv>
                        </FlexibleDiv>

                        <FlexibleDiv className="info__inner_cont3"> 
                            <FlexibleDiv className="info1"> 
                                <p>Physical Address</p>
                                <p style={{
                                    width:"60%",
                                }}>{profileData.address}</p>
                            </FlexibleDiv>

                            <FlexibleDiv className="info2"> 
                                <p>Date of Birth</p>
                                <p>{profileData.dob}</p>
                            </FlexibleDiv>
                        </FlexibleDiv>

                        <FlexibleDiv className="info__inner_cont4"> 
                            <FlexibleDiv className="info1"> 
                                <p>Country</p>
                                <p>{profileData.country}</p>
                            </FlexibleDiv>

                            <FlexibleDiv className="info2"> 
                                <p>Registration Date</p>
                                <p>{profileData.regDate}</p>
                            </FlexibleDiv>
                        </FlexibleDiv>
                        </FlexibleDiv>

                </FlexibleDiv>

                <FlexibleDiv className="profile__image__wrapper" flexDir="column" gap="29px">
                        <img src={SellerImage.src} style={{
                            width:"200px", borderRadius:"10px"
                        }} alt="Seller Image" />
                        
                        <Button
                            width="50%"
                            radius="8px"
                            color="var(--oosriWhite)"
                            backgroundColor="var(--oosriPrimary)"
                            className="submit__btn"
                            htmlType="submit"
                        >
                            Edit Profile
                        </Button>
                </FlexibleDiv>
        </FlexibleDiv>
            )}

            {activeTab === "business-details" && (
                <FlexibleDiv 
                className="business__details__section"
                style={{
                    border:"1px solid red",
                    display: "flex",
                    justifyContent: " space-around"
                }}
                >
                    <FlexibleDiv 
                    className="business__info__wrapper"
                    style={{
                        border: "1px solid red",
                        width: "50%"
                    }}
                    >
                        <h2 style={{
                            justifyContent: "flex-start", 
                            textAlign: "left",
                            width: "100%", 
                            paddingLeft: "30px"
                        }}>Business Details</h2>

                <Form
                    form={form}
                    onFinish={handleSubmit}
                    className="business__details__form"
                    style={{
                        width: "100%",
                        border: "1px solid red",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "left",
                        gap: "25px",
                    }}
                >
          {/* Business Name and type */}
            <FlexibleDiv
            style={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                {/* Business name */}
            <FlexibleDiv
            flexDir="column"
            alignItems="flex-start"
            width="40%"
            gap="5px"
            className="single__row"
          >
            <label>Business Name</label>
            <Form.Item name="business_name" rules={[{ required: true, message: "Business name is required" }]}>
              <TextField
                name="businessName"
                type="text"
                maxLength={100}
                required
                bgColor="#FAFAFA"
              />
            </Form.Item>
          </FlexibleDiv>

          {/* Business Type */}
          <FlexibleDiv
            flexDir="column"
            alignItems="flex-start"
            width="40%"
            gap="5px"
            className="single__row"
          >
            <label>Business Type</label>
            <Form.Item name="business_type" rules={[{ required: true, message: "Business type is required" }]}>
              <Select
                name="businessType"
                options={businessTypeOptions}
                required
                bgColor="#FAFAFA"
              />
            </Form.Item>
          </FlexibleDiv>
            </FlexibleDiv>

            <FlexibleDiv
            style={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                {/* Industry */}
          <FlexibleDiv
            flexDir="column"
            alignItems="flex-start"
            width="40%"
            gap="5px"
            className="single__row"
          >
            <label>Industry</label>
            <Form.Item name="industry" rules={[{ required: true, message: "Please select your industry" }]}>
            <TextField
                name="registrationNumber"
                type="text"
                maxLength={50}
                required
                bgColor="#FAFAFA"
              />
            </Form.Item>
          </FlexibleDiv>

          {/* Registration Number */}
          <FlexibleDiv
            flexDir="column"
            alignItems="flex-start"
            width="40%"
            gap="5px"
            className="single__row"
          >
            <label>Registration Number</label>
            <Form.Item name="registration_number" rules={[{ required: true, message: "Registration number is required" }]}>
              <TextField
                name="registrationNumber"
                type="text"
                maxLength={50}
                required
                bgColor="#FAFAFA"
              />
            </Form.Item>
          </FlexibleDiv>

            </FlexibleDiv>
          

          {/* Business Address */}
          <FlexibleDiv
            flexDir="column"
            alignItems="flex-start"
            width="100%"
            gap="5px"
            className="single__row"
          >
            <label>Business Address</label>
            <Form.Item name="business_address" rules={[{ required: true, message: "Business address is required" }]}>
              <TextField
                name="businessAddress"
                type="text"
                maxLength={150}
                required
                bgColor="#FAFAFA"
              />
            </Form.Item>
          </FlexibleDiv>

          {/* Submit Button */}
          <FlexibleDiv width="100%" justifyContent="center">
            <Button
              type="submit"
              isLoading={isLoading}
              bgColor="#1890FF"
              textColor="#FFFFFF"
            >
              Save Business Details
            </Button>
          </FlexibleDiv>
        </Form>

                        
                    </FlexibleDiv>

                    <FlexibleDiv 
                        className="edit__details__cont"
                        style={{
                            width:"30%",
                            border:"1px solid red"
                        }}
                        >
                            ddd
                    </FlexibleDiv>
                </FlexibleDiv>
            )}


            </SellersProfileWrapper>
            
        </DashboardLayout>
    );
}