import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import {SellersProfileWrapper} from "./seller-profile.styles";
import { Tabs, Form, DatePicker } from "antd";
import { useState,useContext } from "react";
import TextField from "@/components/lib/TextField";
import Select from "@/components/lib/Select";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import  SellerImage from "@/assets/images/sellerimage.png";
import Button from "@/components/lib/Button";
import useNotification from "@/hooks/useNotification";
import { countries } from "@/data-helpers/auth-helpers";
import { CustomUpload } from "@/components/lib/CustomUpload";
import { MainContext } from "@/context";
import dayjs from "dayjs";
import { UpdateProfileData, UpdateProfilePicture } from "@/network/profile";


export default function SellerProfile() {

    const [file, setFile] = useState(null);
    const [activeTab, setActiveTab] = useState("1");
    const [isEditMode, setIsEditMode] = useState(true); // State for edit mode
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [success, error] = useNotification();
    const {state: { user },} = useContext(MainContext);  
    const activeBusinessItems= user?.businessType==="Corporate"

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


  const businessItemsTab = [
    {
      key: "1",
      label: "Business Details",
    },
    {
      key: "2",
      label: "Bank Details",
    },
  ];
  
  const personalItemsTab = [
    {
      key: "1",
      label: "Personal Details",
    },
    {
      key: "2",
      label: "Bank Details",
    },
  ];
  

  const profileData = {
    lastName: user?.lastName,
    firstName:  user?.firstName,
    sex: "Male",
    email: user?.email,
    phone_number: user?.phone_number,
    address: user?.personalBusinessAccount?.residentialAddress,
    dateOfBirth: user?.personalBusinessAccount?.dateOfBirth,
    country: user?.country,
    regDate: user?.createdAt,
  };  

  const businessData = {
    name: user?.corporateBusinessAccount?.companyName,
    type: "partnership",
    regNum: user?.corporateBusinessAccount?.companyRegNum,
    address: user?.corporateBusinessAccount?.companyAddress,
    description: "MobileMaster is your trusted destination for all things mobile technology. With years of experience in the industry, we are dedicated to delivering top-notch products and services to meet your mobile needs.e offer a wide range of the latest smartphones, from top brands to budget-friendly options. Our knowledgeable staff can help you find the perfect phone to suit your needs.",
    companyCertificate:user?.corporateBusinessAccount?.vatCertificate,
    businessCertificate:user?.corporateBusinessAccount?.companyCertificate,
  };  

  const bankInformationData = {
    accountname: user?.bankDetails?.accountName,
    bankname: user?.bankDetails?.bank,
    accountnumber: user?.bankDetails?.accountNumber,
    nin: "49583837293939",
  }

  const businessTypeOptions = [
    { value: "Corporate", label: "Corporate" },
    { value: "Personal", label: "Personal" },
  ];

  const handleImageUpload= async ()=>{
    if(file){
    try{
        const data = await UpdateProfilePicture({profilePicture:file},user?._id)
        console.log(data)
      }catch(errors){
        console.log(errors)
      }
    }
  }
  const handleDataUpdate=async(payload)=>{
    try{
      const data= await UpdateProfileData(payload,user?._id)
    }catch(errors){
      console.log(errors)
    }
  }
  const handleSubmit = async (type) => {
    setIsLoading(true);
    try {
      await handleImageUpload()
      if(type=="personal"){
       await handleDataUpdate(
        {profileData}
       )
      }else{
       await handleDataUpdate(
        {businessData}
       )
      }
      console.log("Submitted Values:", type);
      success("Personal details saved successfully!");
      setIsLoading(false);
      toggleEditMode()
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
            items={activeBusinessItems?businessItemsTab:personalItemsTab}
            onChange={(e) => {
             setActiveTab(e)
            }}
            />

            {/* Profile Content */}
            {
              !activeBusinessItems &&
                activeTab === "1" && (
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
                                            defaultValue={`${profileData.lastName} ${profileData.firstName}`}
                                            disabled
                                        />
                                    ) : (
                                    <p>{profileData.lastName} {profileData.firstName}</p>
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
                                            disabled
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
                                            defaultValue={profileData.phone_number}
                                            onChange={(e)=>{profileData.phone_number = e.target.value}}
                                        />
                                    ) : (
                                    <p>{profileData.phone_number}</p>
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
                                            onChange={(e)=>{profileData.address = e.target.value}}
                                        />
                                    ) : (
                                    <p>{profileData.address}</p>
                                    )}
                                </FlexibleDiv>

                                <FlexibleDiv className="info2"> 
                                    <p>Date of Birth</p>
                                    {isEditMode ? (
                                        <DatePicker
                                        name="regNum"
                                        defaultValue={dayjs(profileData.dateOfBirth)}
                                        placeholder="Enter registration number"
                                        style={{width:"100%"}}
                                        onChange={(e)=>{profileData.dateOfBirth = e, console.log(profileData.dateOfBirth)}}
                                        />
                                        
                                    ) : (
                                    <p>{dayjs(profileData.dateOfBirth).format('DD/MM/YYYY')}</p>
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
                                        defaultValue={profileData.country}
                                        onChange={(e)=>{profileData.country=e}}
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
                                        <DatePicker
                                            name="regNum"
                                            defaultValue={dayjs(profileData.regDate)}
                                            disabled
                                            style={{width:"100%"}}
                                        />
                                    ) : (
                                    <p>{dayjs(profileData.regDate).format("DD/MM/YYYY")}</p>
                                    )}
                                </FlexibleDiv>
                            </FlexibleDiv>
                            </FlexibleDiv>

                        </FlexibleDiv>

                        <FlexibleDiv className="profile__image__wrapper" flexDir="column" gap="29px">
                        <CustomUpload setFile={setFile} editable={isEditMode} initialImage={user?.profilePicture} />
                            
                            <Button
                                onClick={()=>{isEditMode ? handleSubmit("personal") : toggleEditMode()}}
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
                )
            }

            {/* business details Content */}
            {
              activeBusinessItems&&
                activeTab === "1" && (
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

              <FlexibleDiv >
                  <FlexibleDiv style={{
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"flex-start",
                    width:"100%"
                }}>
                    <CustomUpload setFile={setFile} editable={isEditMode} title="Government Identification" initialImage={businessData.companyCertificate}/>
                  </FlexibleDiv>

                  <FlexibleDiv style={{
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"flex-start",
                    width:"100%",
                  }}>
                    <CustomUpload setFile={setFile} editable={isEditMode} title="Business Registration Certificate" initialImage={businessData.businessCertificate}/>
                  </FlexibleDiv>
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
                )
            }

            {/* bank information Content */}
            {activeTab === "2" && (
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