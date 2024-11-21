import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import { Tabs } from "antd";
import { useState } from "react";
import { SellersProfileWrapper } from "../SellerProfile/seller-profile.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { Form } from "antd";
import SellerImage from "@/assets/images/sellerimage.png";
import Button from "@/components/lib/Button";
import TextField from "@/components/lib/TextField";
import useNotification from "@/hooks/useNotification";
import Select from "@/components/lib/Select";
import { useRouter } from "next/router";
import { countries } from "@/data-helpers/auth-helpers";
import CustomLoader from "@/components/lib/CustomLoader";

export default function EditProfile() {
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

  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(undefined);
  const [imageObjectURL, setImageObjectURL] = useState(undefined);
  const [success, error, info] = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [selectedImageGender, setSelectedImageGender] = useState({
    type: "",
    url: "",
  });
  const { push } = useRouter();
  const businessType = [
    { value: "Corporate", label: "Corporate" },
    { value: "Personal", label: "Personal" },
  ];

  const handleMediaChange = (event) => {
    //10mb check
    const maxFileLimit = 10485760;
    let file = event.target.files[0];

    if (!event?.target?.files[0]) {
      error("Please select an image file to continue");
      return;
    }

    if (!isValidImageFile(file.name)) {
      error("Image format must be either PNG, JPG, or JPEG");
      return;
    }

    setImageFile(file);

    if (file.size > maxFileLimit) {
      error("File must be a max of 10mb");
      return;
    }

    //set imageURL object
    setImageObjectURL(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmitLogin = async (values) => {
    setIsLoading(true);
    if (!imageObjectURL && !selectedImageGender.type) {
      info("Please upload a profile picture to continue");
      setIsLoading(false);
      return;
    }

    if (!values?.business_type) {
      info("Please select a business type");
      setIsLoading(false);
      return;
    }

    if (!values?.country) {
      info("Please select a country");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();

    //set the formData
    formData.append("firstName", values?.first_name);
    formData.append("lastName", values?.last_name);
    formData.append("email", values?.email);
    formData.append("password", values?.password);
    formData.append("businessType", values?.business_type);
    formData.append("country", values?.country);

    if (selectedImageGender.type) {
      formData.append("profilePicture", selectedImageGender.type);
    } else {
      formData.append("profilePicture", imageFile);
    }

    //call api
    try {
      const res = await handleRegistration(formData);
      success(`${res?.data?.message}, redirecting you to the OTP page`);

      setPageLoading(true);
      setTimeout(() => {
        //Store the tokens in cookie
        storeDataInCookie(
          "access_token",
          res?.data?.data?.authorization?.token,
          1
        );
        window.location.href = `/check-email?email=${encodeURIComponent(
          values?.email
        )}`;
      }, 1500);

      //redirect to the OTP page
      setIsLoading(false);
    } catch (err) {
      error(`${err?.response?.data?.message}`);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <DashboardLayout>
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
            <FlexibleDiv className="profile__info__wrapper"
                style={{ 
                  flexDir: "column",
                //   border: "1px solid rgba(224, 224, 224, 0.6)",
                  padding: "30px",
                 }}>
              <h2
                style={{
                  justifyContent: "flex-start",
                  textAlign: "left",
                  width: "100%",
                  marginBottom: "20px",
                //   paddingLeft: "30px",
                }}
              >
                Personal Information
              </h2>

              <Form
                form={form}
                onFinish={handleSubmitLogin}
                className="profile__form"
                style={{ 
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "25px",
                    
                 }}
              >
                <FlexibleDiv
                  justifyContent="space-between"
                  flexWrap="nowrap"
                  gap="15px"
                  width="100%"
                  className="single__row"
                >
                  {/* first name */}
                  <FlexibleDiv
                    flexDir="column"
                    alignItems="flex-start"
                    width="100%"
                    gap="5px"
                    className="half__box"
                  >
                    <label>Full Legal Name</label>
                    <Form.Item name={"first_name"}>
                      <TextField
                        name="fullName"
                        type="text"
                        maxLength={50}
                        required
                        bgColor="#FAFAFA"
                      />
                    </Form.Item>
                  </FlexibleDiv>
                  {/* last name */}
                  <FlexibleDiv
                    flexDir="column"
                    alignItems="flex-start"
                    width="100%"
                    gap="5px"
                    className="half__box"
                  >
                    <label>Sex</label>
                    <Form.Item name={"last_name"}>
                      <TextField
                        name="lastName"
                        type="text"
                        maxLength={50}
                        required
                        bgColor="#FAFAFA"
                      />
                    </Form.Item>
                  </FlexibleDiv>
                </FlexibleDiv>

                <FlexibleDiv
                  justifyContent="space-between"
                  flexWrap="nowrap"
                  gap="15px"
                  width="100%"
                  className="input__single__row__wrapper"
                >
                  {/* email*/}
                  <FlexibleDiv
                    flexDir="column"
                    alignItems="flex-start"
                    width="100%"
                    gap="5px"
                    className="single__row"
                  >
                    <label>Email</label>
                    <Form.Item name={"email"}>
                      <TextField
                        name="email"
                        type="email"
                        maxLength={50}
                        required
                        bgColor="#FAFAFA"
                      />
                    </Form.Item>
                  </FlexibleDiv>
                  {/* Phone Number */}
                  <FlexibleDiv
                    flexDir="column"
                    alignItems="flex-start"
                    width="100%"
                    gap="5px"
                    className="half__box"
                  >
                    <label>Phone Number</label>
                    <Form.Item name={"phone_number"}>
                      <TextField
                        name="number"
                        type="number"
                        maxLength={50}
                        required
                        bgColor="#FAFAFA"
                      />
                    </Form.Item>
                  </FlexibleDiv>
                </FlexibleDiv>

                <FlexibleDiv
                  justifyContent="space-between"
                  flexWrap="nowrap"
                  gap="15px"
                  width="100%"
                  className="input__single__row__wrapper"
                >
                  {/*Physical Address */}
                  <FlexibleDiv
                    flexDir="column"
                    alignItems="flex-start"
                    width="100%"
                    gap="5px"
                    className="half__box"
                  >
                    <label>Physical Address</label>
                    <Form.Item name={"physical_address"}>
                      <TextField
                        name="physicalAddress"
                        type="text"
                        maxLength={100}
                        required
                        bgColor="#FAFAFA"
                      />
                    </Form.Item>
                  </FlexibleDiv>
                  {/* Date of Birth */}
                  <FlexibleDiv
                    flexDir="column"
                    alignItems="flex-start"
                    width="100%"
                    gap="5px"
                    className="half__box"
                  >
                    <label>Date of Birth</label>
                    <Form.Item name={"dob"}>
                      <TextField
                        name="DateOfBirth"
                        type="number"
                        maxLength={50}
                        required
                        bgColor="#FAFAFA"
                      />
                    </Form.Item>
                  </FlexibleDiv>
                </FlexibleDiv>

                <FlexibleDiv
                  justifyContent="space-between"
                  flexWrap="nowrap"
                  gap="15px"
                  width="100%"
                  className="input__single__row__wrapper"
                >
                  {/* Country */}
                  <FlexibleDiv
                    flexDir="column"
                    alignItems="flex-start"
                    width="100%"
                    gap="5px"
                    className="half__box"
                  >
                    <label>Country</label>
                    <Form.Item name={"country"}>
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
                    </Form.Item>
                  </FlexibleDiv>
                  {/* Registration Date */}
                  <FlexibleDiv
                    flexDir="column"
                    alignItems="flex-start"
                    width="100%"
                    gap="5px"
                    className="half__box"
                  >
                    <label>Registration Date</label>
                    <Form.Item name={"registration_date"}>
                      <TextField
                        name="registrationDate"
                        type="text"
                        maxLength={50}
                        required
                        bgColor="#FAFAFA"
                      />
                    </Form.Item>
                  </FlexibleDiv>
                </FlexibleDiv>            
              </Form>
            </FlexibleDiv>

            <FlexibleDiv
              className="profile__image__wrapper"
              flexDir="column"
              gap="29px"
            >
              <img
                src={SellerImage.src}
                style={{
                  width: "200px",
                  borderRadius: "10px",
                }}
                alt="Seller Image"
              />
            </FlexibleDiv>
          </FlexibleDiv>


          <FlexibleDiv
            style={{ 
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                    }}
          >
          <Button
                style={{ 
                    marginTop: "20px",
                    marginRight: "20px",
                    width: "20%",
                        }}
                width="50%"
                radius="8px"
                color="var(--oosriWhite)"
                backgroundColor="var(--oosriPrimary)"
                className="submit__btn"
                htmlType="submit"
              >
                Save Changes
          </Button>
          </FlexibleDiv>
          
        </SellersProfileWrapper>
      </DashboardLayout>
    </div>
  );
}
