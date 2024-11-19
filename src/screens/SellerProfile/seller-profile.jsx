import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import {DashboardWrapper} from "../Dashboard/dashboard.styles";
import {SellersProfileWrapper} from "./seller-profile.styles";
import { Tabs } from "antd";
import { useState } from "react";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import  SellerImage from "@/assets/images/sellerimage.png";
import Button from "@/components/lib/Button";


export default function SellerProfile() {
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

    return (
        <DashboardLayout title="My Profile">
            <SellersProfileWrapper>
            <Tabs
            className="tabs__custom"
            defaultActiveKey="1"
            items={items}
            onChange={(e) =>
            e === "1"
                ? setActiveTab("personal-details")
                : e === "2"
                ? setActiveTab("business-details")
                : setActiveTab("bank-details")
            }
            />

            {/* Profile Content */}
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
            </SellersProfileWrapper>
            
        </DashboardLayout>
    );
}