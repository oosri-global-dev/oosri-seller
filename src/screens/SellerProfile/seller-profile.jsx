import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import {DashboardWrapper} from "../Dashboard/dashboard.styles";
import {SellersProfileWrapper} from "./seller-profile.styles";
import { Tabs, Form } from "antd";
import { useState } from "react";
import TextField from "@/components/lib/TextField";
import Select from "@/components/lib/Select";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import  SellerImage from "@/assets/images/sellerimage.png";
import Button from "@/components/lib/Button";
import useNotification from "@/hooks/useNotification";
import { countries } from "@/data-helpers/auth-helpers";
import { CustomUpload } from "@/components/lib/CustomUpload";

export default function SellerProfile() {

    const [file, setFile] = useState(null);
    const [activeTab, setActiveTab] = useState("personal-details");
    const [isEditMode, setIsEditMode] = useState(true); // State for edit mode
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [success, error] = useNotification();

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode); // Toggle edit mode
      };

    const handleSaveDetails = () => {
        form.validateFields()
          .then((values) => {
            handleSubmit(values); // Save details
            setIsEditMode(false); // Exit edit mode after saving
          })
          .catch((err) => {
            console.error("Validation Error:", err);
          });
      };


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

  const bankInformationData = {
    accountname: "Opeyemi Gadgets",
    bankname: "Access Bank",
    accountnumber: "1234567890",
    nin: "49583837293939",
  }

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

  const handleBankSubmit = async (values) => {
    setIsLoading(true);
    try {
      // Replace with your API call or logic
      console.log("Submitted Values:", values);
      success("Bank details saved successfully!");
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
                                {isEditMode ? (
                                    <TextField
                                        name="regNum"
                                        placeholder="Enter registration number"
                                        defaultValue={profileData.name}
                                    />
                                ) : (
                                <p>{profileData.name}</p>
                                )}
                                </FlexibleDiv>

                                <FlexibleDiv className="info2" flexDir="column"> 
                                <p>Sex</p>
                                {isEditMode ? (
                                    <TextField
                                        name="regNum"
                                        placeholder="Enter registration number"
                                        defaultValue={profileData.sex}
                                    />
                                ) : (
                                <p>{profileData.sex}</p>
                                )}
                                </FlexibleDiv>
                        </FlexibleDiv>

                        <FlexibleDiv className="info__inner_cont2"> 
                            <FlexibleDiv className="info1"> 
                                <p>Email Address</p>
                                {isEditMode ? (
                                    <TextField
                                        name="regNum"
                                        placeholder="Enter registration number"
                                        defaultValue={profileData.email}
                                    />
                                ) : (
                                <p>{profileData.email}</p>
                                )}
                            </FlexibleDiv>

                            <FlexibleDiv className="info2"> 
                                <p>Phone Number</p>
                                {isEditMode ? (
                                    <TextField
                                        name="regNum"
                                        placeholder="Enter registration number"
                                        defaultValue={profileData.phone}
                                    />
                                ) : (
                                <p>{profileData.phone}</p>
                                )}
                            </FlexibleDiv>
                        </FlexibleDiv>

                        <FlexibleDiv className="info__inner_cont3"> 
                            <FlexibleDiv className="info1"> 
                                <p>Physical Address</p>
                                {isEditMode ? (
                                    <TextField
                                        name="regNum"
                                        placeholder="Enter registration number"
                                        defaultValue={profileData.address}
                                    />
                                ) : (
                                <p>{profileData.address}</p>
                                )}
                            </FlexibleDiv>

                            <FlexibleDiv className="info2"> 
                                <p>Date of Birth</p>
                                {isEditMode ? (
                                    <TextField
                                        name="regNum"
                                        placeholder="Enter registration number"
                                        defaultValue={profileData.dob}
                                    />
                                ) : (
                                <p>{profileData.dob}</p>
                                )}
                            </FlexibleDiv>
                        </FlexibleDiv>

                        <FlexibleDiv className="info__inner_cont4"> 
                            <FlexibleDiv className="info1"> 
                                <p>Country</p>
                                {isEditMode ? (
                                    <Select
                                    name="country"
                                    required
                                    bgColor="#FAFAFA"
                                    height="40px"
                                    showSearch
                                    className="country__select"
                                  >
                                    {countries.map((cty, idx) => (
                                      <Select.Option
                                        key={idx}
                                        value={cty.name}
                                        className="select__public__content"
                                      >
                                        <img
                                          className="small__drop__down__img"
                                          src={`https://flagsapi.com/${cty?.code}/flat/64.png`}
                                          alt={`${cty?.name?.toLowerCase()}-icon`}
                                        />
                                        <p>{cty.name}</p>
                                      </Select.Option>
                                    ))}
                                  </Select>
                                ) : (
                                <p>{profileData.country}</p>
                                )}
                            </FlexibleDiv>

                            <FlexibleDiv className="info2"> 
                                <p>Registration Date</p>
                                {isEditMode ? (
                                    <TextField
                                        name="regNum"
                                        placeholder="Enter registration number"
                                        defaultValue={profileData.regDate}
                                    />
                                ) : (
                                <p>{profileData.regDate}</p>
                                )}
                            </FlexibleDiv>
                        </FlexibleDiv>
                        </FlexibleDiv>

                    </FlexibleDiv>

                    <FlexibleDiv className="profile__image__wrapper" flexDir="column" gap="29px">
                    <CustomUpload setFile={setFile} editable={isEditMode} />
                        
                        <Button
                            onClick={isEditMode ? handleSaveDetails : toggleEditMode}
                            width="50%"
                            radius="8px"
                            color="var(--oosriWhite)"
                            backgroundColor="var(--oosriPrimary)"
                            className="submit__btn"
                            htmlType="submit"
                        >
                            {isEditMode ? "Save Details" : "Edit Details"}
                        </Button>
                    </FlexibleDiv>
                </FlexibleDiv>
            )}

            {/* business details Content */}
            {activeTab === "business-details" && (
                <FlexibleDiv 
                className="business__details__section"
                >
                    <FlexibleDiv 
                    className="business__info__wrapper"
                    >
                        <h2 style={{
                            justifyContent: "flex-start", 
                            textAlign: "left",
                            width: "100%", 
                            paddingBottom: "15px"
                        }}>Business Details</h2>

                    <Form
                    form={form}
                    onFinish={isEditMode ? handleSaveDetails : undefined}
                    className="business__details__form"
                    >
                        {/* Business Name and type */}
                      <FlexibleDiv
                        style={{
                          display: "flex",
                          justifyContent: "space-between"
                      }}
                      className="input__container">
                          {/* Business name */}
                          <FlexibleDiv
            flexDir="column"
            alignItems="flex-start"
            width="40%"
            gap="5px"
            className="single__row"
          >
            <label>Business Name</label>
            {isEditMode ? (
                      <TextField
                        name="name"
                        placeholder="Enter business name"
                        defaultValue={businessData.name}
                      />
                    ) : (
                      <p>{businessData.name}</p>
                    )}
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
            {isEditMode ? (
                      <Select
                        name="type"
                        placeholder="Select business type"
                        defaultValue={businessData.type}
                        options={businessTypeOptions}
                      />
                    ) : (
                      <p>{businessData.type}</p>
                    )}
                          </FlexibleDiv>
                      </FlexibleDiv>

                      <FlexibleDiv
                        style={{
                          display: "flex",
                          justifyContent: "space-between"
                        }}
                        className="input__container"
                      >
                        {/* reg num and business address */}
                        <FlexibleDiv
                          flexDir="column"
                          alignItems="flex-start"
                          width="40%"
                          gap="5px"
                          className="single__row"
                        >
                          {/* Registration Number */}
                            <label>Business Registration Number</label>
                            {isEditMode ? (
                                    <TextField
                                      name="regNum"
                                      placeholder="Enter registration number"
                                      defaultValue={businessData.regNum}
                            />
                            ) : (
                          <p>{businessData.regNum}</p>
                            )}
                        </FlexibleDiv>

          {/* Business Desc */}
          <FlexibleDiv
            flexDir="column"
            alignItems="flex-start"
            width="40%"
            gap="5px"
            className="single__row"
          >
            <label>Business Address</label>
            {isEditMode ? (
                    <TextField
                      name="regNum"
                      placeholder="Enter registration number"
                      defaultValue={businessData.address}
                    />
                  ) : (
                    <p>{businessData.address}</p>
                  )}
          </FlexibleDiv>

                        </FlexibleDiv>

                        {/* Business Desc */}
                        <FlexibleDiv
            flexDir="column"
            alignItems="flex-start"
            width="100%"
            gap="5px"
            className="single__row"
          >
            <label>Business Description</label>
            {isEditMode ? (
                    <TextField
                      name="description"
                      placeholder="Enter business description"
                      defaultValue={businessData.description}
                    />
                  ) : (
                    <p>{businessData.description}</p>
                  )}
                        </FlexibleDiv>

                        <FlexibleDiv style={{
                display:"flex",
                flexDirection:"column",
                alignItems:"flex-start",
                width:""
            }}>
                <CustomUpload setFile={setFile} editable={isEditMode} title="Government Identification"/>
                        </FlexibleDiv>

                        <FlexibleDiv style={{
                display:"flex",
                flexDirection:"column",
                alignItems:"flex-start",
            }}>
                <CustomUpload setFile={setFile} editable={isEditMode} title="Business Registration Certificate"/>
                        </FlexibleDiv>

            
                    </Form>
                    </FlexibleDiv>

                    <FlexibleDiv 
                    className="edit__details__cont"
                    >
                        <Button
                        onClick={isEditMode ? handleSaveDetails : toggleEditMode}
                        type="submit"
                        radius="8px"
                        color="var(--oosriWhite)"
                        backgroundColor="var(--oosriPrimary)"
                        isLoading={isLoading}
                    >
                            {isEditMode ? "Save Details" : "Edit Details"}
                        </Button>
                    </FlexibleDiv>
                </FlexibleDiv>
            )}

            {/* bank information Content */}
            {activeTab === "bank-details" && (
                <FlexibleDiv 
                className="business__details__section"
                style={{
                    display: "flex",
                    justifyContent: " space-around",
                }}
                >
                    <FlexibleDiv 
                    className="business__info__wrapper"
                    >
                        <h2 style={{
                            justifyContent: "flex-start", 
                            textAlign: "left",
                            width: "100%", 
                            paddingBottom: "15px"
                        }}>Bank Information</h2>

                <Form
                    form={form}
                    onFinish={isEditMode ? handleSaveDetails : undefined}
                    className="business__details__form"
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "left",
                        gap: "25px",
                    }}
                >
          {/* account Name and bank name */}
            <FlexibleDiv
            style={{
                display: "flex",
                justifyContent: "space-between"
            }}
            className="input__container">
                {/* Account name */}
            <FlexibleDiv
            flexDir="column"
            alignItems="flex-start"
            width="40%"
            gap="5px"
            className="single__row"
          >
            <label>Account Name</label>
            {isEditMode ? (
                      <TextField
                        name="name"
                        placeholder="Enter business name"
                        defaultValue={bankInformationData.accountname}
                      />
                    ) : (
                      <p>{bankInformationData.accountname}</p>
                    )}
          </FlexibleDiv>

          {/* Bank name */}
          <FlexibleDiv
            flexDir="column"
            alignItems="flex-start"
            width="40%"
            gap="5px"
            className="single__row"
          >
            <label>Bank</label>
            {isEditMode ? (
                      <TextField
                        name="name"
                        placeholder="Enter business name"
                        defaultValue={bankInformationData.bankname}
                      />
                    ) : (
                      <p>{bankInformationData.bankname}</p>
                    )}
          </FlexibleDiv>
            </FlexibleDiv>

            <FlexibleDiv
            style={{
                display: "flex",
                justifyContent: "space-between"
            }}
            className="input__container">
                {/* acc no and nin no */}
          <FlexibleDiv
            flexDir="column"
            alignItems="flex-start"
            width="40%"
            gap="5px"
            className="single__row"
          >
          {/* Acc Number */}
            <label>Account Number</label>
            {isEditMode ? (
                    <TextField
                      name="regNum"
                      placeholder="Enter registration number"
                      defaultValue={bankInformationData.accountnumber}
                    />
                  ) : (
                    <p>{bankInformationData.accountnumber}</p>
                  )}
          </FlexibleDiv>

          {/* nin no */}
          <FlexibleDiv
            flexDir="column"
            alignItems="flex-start"
            width="40%"
            gap="5px"
            className="single__row"
          >
            <label>National Identification Number</label>
            {isEditMode ? (
                    <TextField
                      name="regNum"
                      placeholder="Enter registration number"
                      defaultValue={bankInformationData.nin}
                    />
                  ) : (
                    <p>{bankInformationData.nin}</p>
                  )}
          </FlexibleDiv>

            </FlexibleDiv>

            
        </Form>

        
                        
                    </FlexibleDiv>

                    <FlexibleDiv 
                    className="edit__details__cont edit__bank__details__cont"
                    >
                <Button
                onClick={isEditMode ? handleSaveDetails : toggleEditMode}
                type="submit"
                radius="8px"
                color="var(--oosriWhite)"
                backgroundColor="var(--oosriPrimary)"
                isLoading={isLoading}
              >
                {isEditMode ? "Save Details" : "Edit Details"}
              </Button>
          </FlexibleDiv>
                </FlexibleDiv>
            )}
            </SellersProfileWrapper>
            
        </DashboardLayout>
    );
}