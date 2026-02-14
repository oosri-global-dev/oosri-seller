import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import { SellersProfileWrapper } from "./seller-profile.styles";
import { Tabs, Form, DatePicker, Input } from "antd";
import { useState, useContext, useEffect } from "react";
import TextField from "@/components/lib/TextField";
import Select from "@/components/lib/Select";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import SellerImage from "@/assets/images/sellerimage.png";
import Button from "@/components/lib/Button";
import useNotification from "@/hooks/useNotification";
import { countries } from "@/data-helpers/auth-helpers";
import { CustomUpload } from "@/components/lib/CustomUpload";
import { MainContext } from "@/context";
import dayjs from "dayjs";
import { UpdateProfileData, UpdateProfilePicture, UpdateSellerProfile } from "@/network/profile";
import { BusinessProfile } from "./profile";
import { getBanks, resolveBankAccount } from "@/network/bank";


export default function SellerProfile() {

  const [file, setFile] = useState(null);
  const [activeTab, setActiveTab] = useState("1");
  const [isEditMode, setIsEditMode] = useState(true); // State for edit mode
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [success, error] = useNotification();
  const { state: { user }, } = useContext(MainContext);
  const activeBusinessItems = user?.businessType === "Corporate"
  const [payload, setPayload] = useState();
  const [vatCertificate, setVatCertificate] = useState(null)
  const [companyCertificate, setCompantCertificate] = useState(null)
  const [bankDetails, setBankDetails] = useState(
    {
      accountName: user?.bankDetails?.accountName,
      bank: user?.bankDetails?.bank,
      accountNumber: user?.bankDetails?.accountNumber,
    }
  )
  const [businessData, setBusinessData] = useState(
    {
      name: user?.corporateBusinessAccount?.companyName,
      regNum: user?.corporateBusinessAccount?.companyRegNum,
      address: user?.corporateBusinessAccount?.companyAddress,
      companyCertificate: user?.corporateBusinessAccount?.vatCertificate,
      businessCertificate: user?.corporateBusinessAccount?.companyCertificate,
      businessType: user?.businessType,
    }
  )
  const [profileData, setProfileData] = useState(
    {
      lastName: user?.lastName,
      firstName: user?.firstName,
      email: user?.email,
      phone_number: user?.phone_number,
      personalBusinessAccount: {
        residentialAddress: user?.personalBusinessAccount?.residentialAddress,
        dateOfBirth: user?.personalBusinessAccount?.dateOfBirth,
        countryIdentificationCard: user?.personalBusinessAccount?.countryIdentificationCard
      },
      country: user?.country,
    }
  )
  const [banks, setBanks] = useState([]);
  const [isResolvingAccount, setIsResolvingAccount] = useState(false);


  const toggleEditMode = () => {
    setIsEditMode(!isEditMode); // Toggle edit mode
  };

  const handleTabChange = () => {
    setIsEditMode(false)
    setPayload()
    setCompantCertificate(null)
    setVatCertificate(null)
  }

  const handleDataUpdate = async (payload) => {
    try {
      const data = await UpdateProfileData(payload, user?._id)
      return data
    } catch (errors) {
      console.log(errors)
    }
  }

  const handleSaveDetails = async () => {
    setIsLoading(true)
    try {
      const payload = { bankDetails }
      // Use JSON endpoint for bank details
      const data = await UpdateSellerProfile(payload, user?._id);
      success("Bank details saved successfully!");
      setIsEditMode(false)
    } catch (errors) {
      console.log(errors)
      error("There was a problem when saving your details!");
    } finally {
      setIsLoading(false)
    }

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

  const businessTypeOptions = [
    { value: "Corporate", label: "Corporate" },
    { value: "Personal", label: "Personal" },
  ];

  const handleImageUpload = async () => {
    if (file) {
      try {
        const data = await UpdateProfilePicture({ profilePicture: file }, user?._id)
        console.log(data)
        setFile(null)
      } catch (errors) {
        console.log(errors)
      }
    }
  }

  const handleSubmit = async (type) => {
    setIsLoading(true);
    try {
      if (type == "personal") {
        await handleImageUpload()
      }
      if (payload) {
        await handleDataUpdate(payload)
        console.log("Submitted Values:", type);
        success("Personal details saved successfully!");
        setIsLoading(false);
        handleTabChange()
      }
    } catch (err) {
      error("An error occurred while saving your details.");
      setIsLoading(false);
    } finally {
      toggleEditMode()
    }
  };

  useEffect(() => {
    handleTabChange()
  }, [activeTab])

  useEffect(() => {
    const handleImages = () => {
      if (vatCertificate) {
        setPayload({ ...payload, vatCertificate: vatCertificate })
      } else if (companyCertificate) {
        setPayload({ ...payload, companyCertificate: companyCertificate })
      }
    }
    handleImages()

  }, [vatCertificate, companyCertificate])

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await getBanks();
        if (response && response.data) {
          setBanks(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch banks", err);
      }
    };
    fetchBanks();
  }, []);

  useEffect(() => {
    const resolveAccount = async () => {
      if (bankDetails.accountNumber && bankDetails.accountNumber.length === 10 && bankDetails.bank) {
        // Find bank code
        const selectedBank = banks.find(b => b.name === bankDetails.bank);
        if (selectedBank) {
          setIsResolvingAccount(true);
          try {
            const resolved = await resolveBankAccount({
              account_number: bankDetails.accountNumber,
              bank_code: selectedBank.code
            });
            if (resolved && resolved.data) {
              setBankDetails(prev => ({
                ...prev,
                accountName: resolved.data.account_name
              }));
              success("Account details verified successfully!");
            }
          } catch (err) {
            console.error("Failed to resolve account", err);
            error("Could not verify account details. Please check your inputs.");
            setBankDetails(prev => ({
              ...prev,
              accountName: ""
            }));
          } finally {
            setIsResolvingAccount(false);
          }
        }
      }
    };

    // Debounce or just check conditions
    const timer = setTimeout(() => {
      resolveAccount();
    }, 1000);

    return () => clearTimeout(timer);

  }, [bankDetails.accountNumber, bankDetails.bank, banks]);

  return (
    <DashboardLayout title="My Profile">
      <SellersProfileWrapper>
        <Tabs className="tabs__custom" defaultActiveKey="1"
          items={activeBusinessItems ? businessItemsTab : personalItemsTab}
          onChange={(e) => { setActiveTab(e) }}
        />

        {/* Profile Content */}
        {!activeBusinessItems && activeTab === "1" && (
          <FlexibleDiv className="profile__details__section">
            <FlexibleDiv className="profile__info__wrapper">
              <h2>Personal Information</h2>
              <FlexibleDiv className="info_cont">
                <FlexibleDiv className="info__inner_cont1" flexDir="row">
                  <FlexibleDiv className="info1" flexDir="column">
                    <p>Full Legal Name</p>
                    {isEditMode ? (
                      <TextField
                        name="regNum"
                        placeholder="Enter registration number"
                        defaultValue={`${profileData.lastName} ${profileData.firstName}`}
                        disabled />
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
                      />) : (
                      <p>{profileData.email}</p>)}
                  </FlexibleDiv>
                  <FlexibleDiv className="info2">
                    <p>Phone Number</p>
                    {isEditMode ? (
                      <Input
                        type="number"
                        name="regNum"
                        placeholder="Enter registration number"
                        defaultValue={profileData.phone_number || " "}
                        onChange={(e) => {
                          setProfileData((prev) => ({
                            ...prev,
                            phone_number: e.target.value
                          }))
                          setPayload({ ...payload, phone_number: e.target.value })
                        }} />) : (
                      <p>{profileData.phone_number}</p>)}
                  </FlexibleDiv>
                </FlexibleDiv>
                <FlexibleDiv className="info__inner_cont3">
                  <FlexibleDiv className="info1">
                    <p>Physical Address</p>
                    {isEditMode ? (
                      <TextField
                        name="regNum"
                        placeholder="Enter registration number"
                        defaultValue={profileData.personalBusinessAccount.residentialAddress}
                        onChange={(e) => {
                          profileData.residentialAddress = e.target.value;
                          setProfileData((prev) => ({
                            ...prev,
                            personalBusinessAccount: {
                              residentialAddress: e.target.value,
                              dateOfBirth: profileData.personalBusinessAccount.dateOfBirth,
                              countryIdentificationCard: profileData.personalBusinessAccount.countryIdentificationCard,
                            }
                          }))
                          setPayload({ ...payload, personalBusinessAccount: profileData.personalBusinessAccount })
                        }} />
                    ) : (<p>{profileData.personalBusinessAccount.residentialAddress}</p>)}
                  </FlexibleDiv>
                  <FlexibleDiv className="info2">
                    <p>Date of Birth</p>
                    {isEditMode ? (
                      <DatePicker
                        name="regNum"
                        defaultValue={dayjs(profileData.personalBusinessAccount.dateOfBirth)}
                        placeholder="Enter registration number"
                        style={{ width: "100%" }}
                        onChange={(e) => {
                          setProfileData((prev) => ({
                            ...prev,
                            personalBusinessAccount: {
                              dateOfBirth: e,
                              countryIdentificationCard: profileData.personalBusinessAccount.countryIdentificationCard,
                              residentialAddress: profileData.personalBusinessAccount.residentialAddress,
                            }
                          }))
                          setPayload({ ...payload, personalBusinessAccount: profileData.personalBusinessAccount })
                        }} />
                    ) : (
                      <p>{dayjs(profileData.personalBusinessAccount.dateOfBirth).format('DD/MM/YYYY')}</p>
                    )}
                  </FlexibleDiv>
                </FlexibleDiv>
                <FlexibleDiv className="info__inner_cont4">
                  <FlexibleDiv className="info1">
                    <p>Country</p>
                    {isEditMode ? (
                      <Select name="country" required bgColor="#FAFAFA" height="40px" showSearch className="country__select" defaultValue={profileData.country}
                        onChange={(e) => {
                          profileData.country = e
                          setPayload({ ...payload, country: e })
                          setProfileData((prev) => ({
                            ...prev,
                            country: e
                          }))
                        }}>
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
                        defaultValue={dayjs(user?.createdAt)}
                        disabled
                        style={{ width: "100%" }} />
                    ) : (
                      <p>{dayjs(user?.createdAt).format("DD/MM/YYYY")}</p>
                    )}
                  </FlexibleDiv>
                </FlexibleDiv>
              </FlexibleDiv>

            </FlexibleDiv>

            <FlexibleDiv className="profile__image__wrapper" flexDir="column" gap="29px">
              <CustomUpload setFile={setFile} editable={isEditMode} initialImage={user?.profilePicture} />

              <Button
                onClick={() => { isEditMode ? handleSubmit("personal") : toggleEditMode() }}
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
        {activeBusinessItems &&
          activeTab === "1" && (
            <BusinessProfile
              businessData={businessData}
              setBusinessData={setBusinessData}
              handleSubmit={handleSubmit}
              businessTypeOptions={businessTypeOptions}
              setPayload={setPayload}
              payload={payload}
              setVatCertificate={setVatCertificate}
              setCompantCertificate={setCompantCertificate}
              isLoading={isLoading}
              toggleEditMode={toggleEditMode}
              isEditMode={isEditMode}
            />
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
                onFinish={isEditMode ? handleSubmit : undefined}
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
                        name="accountName"
                        placeholder={isResolvingAccount ? "Resolving account..." : "Account Name"}
                        value={bankDetails.accountName}
                        disabled // Make it read-only as it is auto-populated
                      />
                    ) : (
                      <p>{bankDetails.accountName}</p>
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
                      <Select
                        name="bank"
                        placeholder="Select bank"
                        defaultValue={bankDetails.bank}
                        showSearch
                        onChange={(e) => {
                          setBankDetails((prev) => ({
                            ...prev,
                            bank: e
                          }))
                        }}
                      >
                        {banks.map((bank) => (
                          <Select.Option key={bank.code} value={bank.name}>
                            {bank.name}
                          </Select.Option>
                        ))}
                      </Select>
                    ) : (
                      <p>{bankDetails.bank}</p>
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
                        defaultValue={bankDetails.accountNumber}
                        onChange={(e) => {
                          setBankDetails((prev) => ({
                            ...prev,
                            accountNumber: e.target.value
                          }))
                        }}
                      />
                    ) : (
                      <p>{bankDetails.accountNumber}</p>
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