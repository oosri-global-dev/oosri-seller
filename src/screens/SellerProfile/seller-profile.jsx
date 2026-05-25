import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import { SellersProfileWrapper } from "./seller-profile.styles";
import { DatePicker, Input } from "antd";
import { useState, useContext, useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import TextField from "@/components/lib/TextField";
import Select from "@/components/lib/Select";
import { CustomUpload } from "@/components/lib/CustomUpload";
import { MainContext } from "@/context";
import dayjs from "dayjs";
import useNotification from "@/hooks/useNotification";
import { countries } from "@/data-helpers/auth-helpers";
import { UpdateProfileData, UpdateProfilePicture, UpdateSellerProfile } from "@/network/profile";
import { getBanks, resolveBankAccount } from "@/network/bank";
import {
  IoPersonOutline as PersonIcon,
  IoWalletOutline as BankIcon,
  IoBriefcaseOutline as BusinessIcon,
  IoCreateOutline as EditIcon,
  IoStorefrontOutline as StoreIcon,
} from "react-icons/io5";
import { UpdateStoreProfile } from "@/network/profile";
import { uploadProductImage } from "@/utils/cloudinary-upload";
import { IoOpenOutline as PreviewIcon } from "react-icons/io5";
import { useRouter } from "next/router";

export default function SellerProfile() {
  const router = useRouter();
  const isSetupMode = router.query.setup === "store";

  const [file, setFile] = useState(null);
  const [activeSection, setActiveSection] = useState(isSetupMode ? "store" : "personal");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, error] = useNotification();
  const { state: { user } } = useContext(MainContext);

  const isCorporate = user?.businessType === "Corporate";

  const [payload, setPayload] = useState();
  const [vatCertificate, setVatCertificate] = useState(null);
  const [companyCertificate, setCompantCertificate] = useState(null);

  const [bankDetails, setBankDetails] = useState({
    accountName: user?.bankDetails?.accountName || "",
    bank: user?.bankDetails?.bank || "",
    accountNumber: user?.bankDetails?.accountNumber || "",
  });

  const [businessData, setBusinessData] = useState({
    name: user?.corporateBusinessAccount?.companyName || "",
    regNum: user?.corporateBusinessAccount?.companyRegNum || "",
    address: user?.corporateBusinessAccount?.companyAddress || "",
    companyCertificate: user?.corporateBusinessAccount?.vatCertificate || "",
    businessCertificate: user?.corporateBusinessAccount?.companyCertificate || "",
    businessType: user?.businessType || "",
  });

  const [profileData, setProfileData] = useState({
    lastName: user?.lastName || "",
    firstName: user?.firstName || "",
    email: user?.email || "",
    phone_number: user?.phone_number || "",
    personalBusinessAccount: {
      residentialAddress: user?.personalBusinessAccount?.residentialAddress || "",
      dateOfBirth: user?.personalBusinessAccount?.dateOfBirth || null,
      countryIdentificationCard: user?.personalBusinessAccount?.countryIdentificationCard || "",
    },
    country: user?.country || "",
  });

  const [banks, setBanks] = useState([]);
  const [isResolvingAccount, setIsResolvingAccount] = useState(false);
  const [accountResolved, setAccountResolved] = useState(false);
  // Tracks whether the user manually changed bank fields during an edit session
  const [bankFieldsDirty, setBankFieldsDirty] = useState(false);

  // Ref so sync effects can check whether a section is being actively edited
  const isEditModeRef = useRef(isEditMode);
  useEffect(() => { isEditModeRef.current = isEditMode; }, [isEditMode]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setIsEditMode(false);
    setPayload(undefined);
    setCompantCertificate(null);
    setVatCertificate(null);
    setBankFieldsDirty(false);
  };

  const handleDataUpdate = async (p) => {
    try {
      return await UpdateProfileData(p, user?._id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSaveBankDetails = async () => {
    setIsLoading(true);
    try {
      await UpdateSellerProfile({ bankDetails }, user?._id);
      success("Bank details saved successfully!");
      setIsEditMode(false);
    } catch (err) {
      console.log(err);
      error("There was a problem when saving your details!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async () => {
    if (file) {
      try {
        await UpdateProfilePicture({ profilePicture: file }, user?._id);
        setFile(null);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSubmit = async (type = "personal") => {
    setIsLoading(true);
    try {
      if (type === "personal") await handleImageUpload();
      if (payload) {
        await handleDataUpdate(payload);
        success(`${type === "personal" ? "Personal" : "Business"} details saved successfully!`);
      }
    } catch (err) {
      error("An error occurred while saving your details.");
    } finally {
      setIsLoading(false);
      setIsEditMode(false);
    }
  };

  useEffect(() => {
    const handleImages = () => {
      if (vatCertificate) setPayload((p) => ({ ...p, vatCertificate }));
      else if (companyCertificate) setPayload((p) => ({ ...p, companyCertificate }));
    };
    handleImages();
  }, [vatCertificate, companyCertificate]);

  useEffect(() => {
    getBanks()
      .then((res) => { if (res?.data) setBanks(res.data); })
      .catch(console.error);
  }, []);

  // Sync all form states when user data arrives/changes — but never overwrite an active edit
  useEffect(() => {
    if (!user?._id) return;
    if (!isEditModeRef.current) {
      setProfileData({
        lastName:    user.lastName    || "",
        firstName:   user.firstName   || "",
        email:       user.email       || "",
        phone_number: user.phone_number || "",
        personalBusinessAccount: {
          residentialAddress:         user.personalBusinessAccount?.residentialAddress         || "",
          dateOfBirth:                user.personalBusinessAccount?.dateOfBirth                || null,
          countryIdentificationCard:  user.personalBusinessAccount?.countryIdentificationCard  || "",
        },
        country: user.country || "",
      });
      setBankDetails({
        accountName:   user.bankDetails?.accountName   || "",
        bank:          user.bankDetails?.bank          || "",
        accountNumber: user.bankDetails?.accountNumber || "",
      });
      setBusinessData({
        name:                user.corporateBusinessAccount?.companyName        || "",
        regNum:              user.corporateBusinessAccount?.companyRegNum      || "",
        address:             user.corporateBusinessAccount?.companyAddress     || "",
        companyCertificate:  user.corporateBusinessAccount?.vatCertificate    || "",
        businessCertificate: user.corporateBusinessAccount?.companyCertificate || "",
        businessType:        user.businessType || "",
      });
    }
  }, [user]);

  // Bank account resolution — only runs when user explicitly edits bank fields
  useEffect(() => {
    if (!isEditMode || !bankFieldsDirty) return;
    setAccountResolved(false);
    const timer = setTimeout(async () => {
      if (bankDetails.accountNumber?.length === 10 && bankDetails.bank) {
        const selectedBank = banks.find((b) => b.name === bankDetails.bank);
        if (selectedBank) {
          setIsResolvingAccount(true);
          try {
            const resolved = await resolveBankAccount({
              account_number: bankDetails.accountNumber,
              bank_code: selectedBank.code,
            });
            if (resolved?.data) {
              setBankDetails((prev) => ({ ...prev, accountName: resolved.data.account_name }));
              setAccountResolved(true);
              success("Account verified!");
            }
          } catch (err) {
            error("Could not verify account. Please check your inputs.");
            setBankDetails((prev) => ({ ...prev, accountName: "" }));
          } finally {
            setIsResolvingAccount(false);
            setBankFieldsDirty(false);
          }
        }
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [bankDetails.accountNumber, bankDetails.bank, bankFieldsDirty, isEditMode, banks]);

  const initials =
    `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`.toUpperCase() || "S";
  const fullName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Seller";

  const [storeData, setStoreData] = useState({
    storeName: user?.storeProfile?.storeName || "",
    bannerImage: user?.storeProfile?.bannerImage || "",
    description: user?.storeProfile?.description || "",
    instagram: user?.storeProfile?.socialLinks?.instagram || "",
    twitter: user?.storeProfile?.socialLinks?.twitter || "",
    facebook: user?.storeProfile?.socialLinks?.facebook || "",
    tiktok: user?.storeProfile?.socialLinks?.tiktok || "",
    website: user?.storeProfile?.socialLinks?.website || "",
  });
  const [isStoreLoading, setIsStoreLoading] = useState(false);
  const [storeEditMode, setStoreEditMode] = useState(false);
  const [bannerUpload, setBannerUpload] = useState({ uploading: false, progress: 0, stage: "idle", error: null });
  const queryClient = useQueryClient();
  const storeEditModeRef = useRef(storeEditMode);
  useEffect(() => { storeEditModeRef.current = storeEditMode; }, [storeEditMode]);

  useEffect(() => {
    if (user?.storeProfile && !storeEditModeRef.current) {
      setStoreData({
        storeName: user.storeProfile.storeName || "",
        bannerImage: user.storeProfile.bannerImage || "",
        description: user.storeProfile.description || "",
        instagram: user.storeProfile.socialLinks?.instagram || "",
        twitter: user.storeProfile.socialLinks?.twitter || "",
        facebook: user.storeProfile.socialLinks?.facebook || "",
        tiktok: user.storeProfile.socialLinks?.tiktok || "",
        website: user.storeProfile.socialLinks?.website || "",
      });
    }
  }, [user]);

  const handleBannerFileSelected = async (file) => {
    setBannerUpload({ uploading: true, progress: 0, stage: "compressing", error: null });
    try {
      const result = await uploadProductImage(file, {
        onProgress: (pct) => setBannerUpload((p) => ({ ...p, progress: pct })),
        onStageChange: (stage) => setBannerUpload((p) => ({ ...p, stage })),
      });
      setStoreData((p) => ({ ...p, bannerImage: result.secureUrl }));
      setBannerUpload({ uploading: false, progress: 100, stage: "completed", error: null });
    } catch (err) {
      setBannerUpload({ uploading: false, progress: 0, stage: "failed", error: err.message });
    }
  };

  const handleSaveStore = async () => {
    setIsStoreLoading(true);
    try {
      await UpdateStoreProfile({
        storeName: storeData.storeName,
        bannerImage: storeData.bannerImage,
        description: storeData.description,
        socialLinks: {
          instagram: storeData.instagram,
          twitter: storeData.twitter,
          facebook: storeData.facebook,
          tiktok: storeData.tiktok,
          website: storeData.website,
        },
      }, user?._id);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      success("Store profile saved successfully!");
      setStoreEditMode(false);
      if (isSetupMode) {
        router.replace("/profile", undefined, { shallow: true });
      }
    } catch (err) {
      error("Failed to save store profile. Please try again.");
    } finally {
      setIsStoreLoading(false);
    }
  };

  const navItems = [
    { key: "personal",  label: "Personal Info",     icon: <PersonIcon size={16} /> },
    { key: "bank",      label: "Bank Details",       icon: <BankIcon size={16} /> },
    ...(isCorporate
      ? [{ key: "business", label: "Business Details", icon: <BusinessIcon size={16} /> }]
      : []),
    { key: "store", label: "My Store", icon: <StoreIcon size={16} /> },
  ];

  return (
    <DashboardLayout title="My Profile">
      <SellersProfileWrapper>

        {/* ── Sidebar ── */}
        <aside className="profile__sidebar">
          <div className="avatar__section">
            <div className="avatar__wrap">
              {user?.profilePicture
                ? <img src={user.profilePicture} alt={fullName} />
                : <span className="avatar__initials">{initials}</span>}
            </div>
            <p className="profile__name">{fullName}</p>
            <p className="profile__email">{user?.email}</p>
            <span className="biz__badge">{user?.businessType || "Personal"}</span>
          </div>

          <nav className="sidebar__nav">
            {navItems.map((item) => (
              <button
                key={item.key}
                className={`nav__item${activeSection === item.key ? " active" : ""}`}
                onClick={() => handleSectionChange(item.key)}
              >
                <span className="nav__icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="member__since">
            <span className="since__label">Member since</span>
            <span className="since__value">
              {user?.createdAt ? dayjs(user.createdAt).format("MMM YYYY") : "—"}
            </span>
          </div>
        </aside>

        {/* ── Content area ── */}
        <div className="profile__content">

          {/* ── Personal Info ── */}
          {activeSection === "personal" && (
            <div className="section__card">
              <div className="section__header">
                <div className="header__left">
                  <h3>Personal Information</h3>
                  <p>Your basic profile and contact details</p>
                </div>
                <div className="header__actions">
                  {isEditMode ? (
                    <>
                      <button className="edit__btn cancel" onClick={() => setIsEditMode(false)}>
                        Cancel
                      </button>
                      <button
                        className="edit__btn save"
                        onClick={() => handleSubmit("personal")}
                        disabled={isLoading}
                      >
                        {isLoading ? "Saving…" : "Save Changes"}
                      </button>
                    </>
                  ) : (
                    <button className="edit__btn" onClick={() => setIsEditMode(true)}>
                      <EditIcon size={13} /> Edit
                    </button>
                  )}
                </div>
              </div>

              <div className="section__body">
                {isEditMode && (
                  <div className="avatar__upload__row">
                    <CustomUpload
                      setFile={setFile}
                      editable
                      initialImage={user?.profilePicture}
                    />
                    <div className="upload__meta">
                      <h4>Profile Photo</h4>
                      <p>JPG, PNG or WebP · Max 80 MB</p>
                    </div>
                  </div>
                )}

                <div className="fields__grid">
                  <div className="field__item">
                    <span className="field__label">Full Name</span>
                    {isEditMode ? (
                      <TextField
                        placeholder="Full name"
                        defaultValue={`${profileData.firstName || ""} ${profileData.lastName || ""}`.trim()}
                        disabled
                      />
                    ) : (
                      <span className="field__value">{fullName}</span>
                    )}
                  </div>

                  <div className="field__item">
                    <span className="field__label">Email Address</span>
                    {isEditMode ? (
                      <TextField
                        placeholder="Email"
                        defaultValue={profileData.email}
                        disabled
                      />
                    ) : (
                      <span className="field__value">
                        {profileData.email || <span className="field__empty">Not set</span>}
                      </span>
                    )}
                  </div>

                  <div className="field__item">
                    <span className="field__label">Phone Number</span>
                    {isEditMode ? (
                      <Input
                        type="number"
                        placeholder="Phone number"
                        defaultValue={profileData.phone_number}
                        onChange={(e) => {
                          setProfileData((prev) => ({ ...prev, phone_number: e.target.value }));
                          setPayload((p) => ({ ...p, phone_number: e.target.value }));
                        }}
                      />
                    ) : (
                      <span className="field__value">
                        {profileData.phone_number || <span className="field__empty">Not set</span>}
                      </span>
                    )}
                  </div>

                  <div className="field__item">
                    <span className="field__label">Date of Birth</span>
                    {isEditMode ? (
                      <DatePicker
                        style={{ width: "100%" }}
                        defaultValue={
                          profileData.personalBusinessAccount.dateOfBirth
                            ? dayjs(profileData.personalBusinessAccount.dateOfBirth)
                            : null
                        }
                        onChange={(val) => {
                          setProfileData((prev) => ({
                            ...prev,
                            personalBusinessAccount: {
                              ...prev.personalBusinessAccount,
                              dateOfBirth: val,
                            },
                          }));
                          setPayload((p) => ({
                            ...p,
                            personalBusinessAccount: {
                              ...profileData.personalBusinessAccount,
                              dateOfBirth: val,
                            },
                          }));
                        }}
                      />
                    ) : (
                      <span className="field__value">
                        {profileData.personalBusinessAccount.dateOfBirth
                          ? dayjs(profileData.personalBusinessAccount.dateOfBirth).format("DD MMM YYYY")
                          : <span className="field__empty">Not set</span>}
                      </span>
                    )}
                  </div>

                  <div className="field__item full__width">
                    <span className="field__label">Residential Address</span>
                    {isEditMode ? (
                      <TextField
                        placeholder="Enter your address"
                        defaultValue={profileData.personalBusinessAccount.residentialAddress}
                        onChange={(e) => {
                          setProfileData((prev) => ({
                            ...prev,
                            personalBusinessAccount: {
                              ...prev.personalBusinessAccount,
                              residentialAddress: e.target.value,
                            },
                          }));
                          setPayload((p) => ({
                            ...p,
                            personalBusinessAccount: {
                              ...profileData.personalBusinessAccount,
                              residentialAddress: e.target.value,
                            },
                          }));
                        }}
                      />
                    ) : (
                      <span className="field__value">
                        {profileData.personalBusinessAccount.residentialAddress ||
                          <span className="field__empty">Not set</span>}
                      </span>
                    )}
                  </div>

                  <div className="field__item">
                    <span className="field__label">Country</span>
                    {isEditMode ? (
                      <Select
                        showSearch
                        defaultValue={profileData.country}
                        bgColor="#FAFAFA"
                        height="40px"
                        onChange={(val) => {
                          setProfileData((prev) => ({ ...prev, country: val }));
                          setPayload((p) => ({ ...p, country: val }));
                        }}
                      >
                        {countries.map((cty, idx) => (
                          <Select.Option key={idx} value={cty.name}>
                            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              <img
                                src={`https://flagsapi.com/${cty.code}/flat/64.png`}
                                alt={cty.name}
                                style={{ width: 18, height: 13, objectFit: "cover", borderRadius: 2 }}
                              />
                              {cty.name}
                            </span>
                          </Select.Option>
                        ))}
                      </Select>
                    ) : (
                      <span className="field__value">
                        {profileData.country ? (
                          <span className="country__row">
                            <img
                              src={`https://flagsapi.com/${
                                countries.find((c) => c.name === profileData.country)?.code
                              }/flat/64.png`}
                              alt={profileData.country}
                            />
                            {profileData.country}
                          </span>
                        ) : (
                          <span className="field__empty">Not set</span>
                        )}
                      </span>
                    )}
                  </div>

                  <div className="field__item">
                    <span className="field__label">Member Since</span>
                    <span className="field__value">
                      {user?.createdAt ? dayjs(user.createdAt).format("DD MMM YYYY") : "—"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Bank Details ── */}
          {activeSection === "bank" && (
            <div className="section__card">
              <div className="section__header">
                <div className="header__left">
                  <h3>Bank Details</h3>
                  <p>Your payout account information</p>
                </div>
                <div className="header__actions">
                  {isEditMode ? (
                    <>
                      <button className="edit__btn cancel" onClick={() => { setIsEditMode(false); setBankFieldsDirty(false); }}>
                        Cancel
                      </button>
                      <button
                        className="edit__btn save"
                        onClick={handleSaveBankDetails}
                        disabled={isLoading}
                      >
                        {isLoading ? "Saving…" : "Save Changes"}
                      </button>
                    </>
                  ) : (
                    <button className="edit__btn" onClick={() => setIsEditMode(true)}>
                      <EditIcon size={13} /> Edit
                    </button>
                  )}
                </div>
              </div>

              <div className="section__body">
                <div className="fields__grid">
                  <div className="field__item">
                    <span className="field__label">Account Number</span>
                    {isEditMode ? (
                      <>
                        <TextField
                          placeholder="10-digit account number"
                          defaultValue={bankDetails.accountNumber}
                          onChange={(e) => {
                            setBankDetails((prev) => ({ ...prev, accountNumber: e.target.value }));
                            setBankFieldsDirty(true);
                          }}
                        />
                        {isResolvingAccount && (
                          <span className="resolve__hint resolving">Verifying account…</span>
                        )}
                        {accountResolved && !isResolvingAccount && (
                          <span className="resolve__hint resolved">Account verified</span>
                        )}
                      </>
                    ) : (
                      <span className="field__value">
                        {bankDetails.accountNumber || <span className="field__empty">Not set</span>}
                      </span>
                    )}
                  </div>

                  <div className="field__item">
                    <span className="field__label">Bank Name</span>
                    {isEditMode ? (
                      <Select
                        showSearch
                        placeholder="Select bank"
                        defaultValue={bankDetails.bank}
                        bgColor="#FAFAFA"
                        height="40px"
                        onChange={(val) => {
                          setBankDetails((prev) => ({ ...prev, bank: val }));
                          setBankFieldsDirty(true);
                        }}
                      >
                        {banks.map((bank) => (
                          <Select.Option key={bank.code} value={bank.name}>
                            {bank.name}
                          </Select.Option>
                        ))}
                      </Select>
                    ) : (
                      <span className="field__value">
                        {bankDetails.bank || <span className="field__empty">Not set</span>}
                      </span>
                    )}
                  </div>

                  <div className="field__item full__width">
                    <span className="field__label">Account Name</span>
                    {isEditMode ? (
                      <TextField
                        placeholder={isResolvingAccount ? "Resolving…" : "Auto-populated after verification"}
                        value={bankDetails.accountName || ""}
                        disabled
                      />
                    ) : (
                      <span className="field__value">
                        {bankDetails.accountName || <span className="field__empty">Not verified yet</span>}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Business Details (corporate only) ── */}
          {activeSection === "business" && isCorporate && (
            <div className="section__card">
              <div className="section__header">
                <div className="header__left">
                  <h3>Business Details</h3>
                  <p>Your corporate account information</p>
                </div>
                <div className="header__actions">
                  {isEditMode ? (
                    <>
                      <button className="edit__btn cancel" onClick={() => setIsEditMode(false)}>
                        Cancel
                      </button>
                      <button
                        className="edit__btn save"
                        onClick={() => handleSubmit("business")}
                        disabled={isLoading}
                      >
                        {isLoading ? "Saving…" : "Save Changes"}
                      </button>
                    </>
                  ) : (
                    <button className="edit__btn" onClick={() => setIsEditMode(true)}>
                      <EditIcon size={13} /> Edit
                    </button>
                  )}
                </div>
              </div>

              <div className="section__body">
                <div className="fields__grid">
                  <div className="field__item">
                    <span className="field__label">Business Name</span>
                    {isEditMode ? (
                      <TextField
                        placeholder="Business name"
                        defaultValue={businessData.name}
                        disabled
                      />
                    ) : (
                      <span className="field__value">
                        {businessData.name || <span className="field__empty">Not set</span>}
                      </span>
                    )}
                  </div>

                  <div className="field__item">
                    <span className="field__label">Business Type</span>
                    {isEditMode ? (
                      <TextField
                        placeholder="Business type"
                        defaultValue={businessData.businessType}
                        disabled
                      />
                    ) : (
                      <span className="field__value">
                        {businessData.businessType || <span className="field__empty">Not set</span>}
                      </span>
                    )}
                  </div>

                  <div className="field__item">
                    <span className="field__label">Registration Number</span>
                    {isEditMode ? (
                      <TextField
                        placeholder="Registration number"
                        defaultValue={businessData.regNum}
                        disabled
                      />
                    ) : (
                      <span className="field__value">
                        {businessData.regNum || <span className="field__empty">Not set</span>}
                      </span>
                    )}
                  </div>

                  <div className="field__item">
                    <span className="field__label">Business Address</span>
                    {isEditMode ? (
                      <TextField
                        placeholder="Business address"
                        defaultValue={businessData.address}
                        onChange={(e) => {
                          setPayload((p) => ({ ...p, companyAddress: e.target.value }));
                          setBusinessData((prev) => ({ ...prev, address: e.target.value }));
                        }}
                      />
                    ) : (
                      <span className="field__value">
                        {businessData.address || <span className="field__empty">Not set</span>}
                      </span>
                    )}
                  </div>
                </div>

                <div className="docs__grid" style={{ marginTop: 28 }}>
                  <div className="doc__item">
                    <span className="doc__label">Government ID</span>
                    <CustomUpload
                      setFile={setVatCertificate}
                      editable={isEditMode}
                      initialImage={businessData.companyCertificate}
                    />
                  </div>
                  <div className="doc__item">
                    <span className="doc__label">Business Certificate</span>
                    <CustomUpload
                      setFile={setCompantCertificate}
                      editable={isEditMode}
                      initialImage={businessData.businessCertificate}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── My Store ── */}
          {activeSection === "store" && (
            <div className="section__card">
              {isSetupMode && (
                <div style={{
                  background: "#fff8e1",
                  border: "1px solid #ffe082",
                  borderRadius: 8,
                  padding: "12px 16px",
                  marginBottom: 20,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: "0.88rem",
                  color: "#7c5a00",
                }}>
                  <StoreIcon size={18} />
                  <span>
                    <strong>One last step —</strong> set your store name to unlock your dashboard. You only need to do this once.
                  </span>
                </div>
              )}
              <div className="section__header">
                <div className="header__left">
                  <h3>My Store</h3>
                  <p>Customise your public storefront on Oosri</p>
                </div>
                <div className="header__actions">
                  {storeData.storeName && (
                    <a
                      className="edit__btn"
                      href={`${process.env.NEXT_PUBLIC_BUYER_APP_URL || "http://localhost:3000"}/store/${storeData.storeName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: 5, textDecoration: "none" }}
                    >
                      <PreviewIcon size={13} /> Preview Store
                    </a>
                  )}
                  {storeEditMode ? (
                    <>
                      <button className="edit__btn cancel" onClick={() => setStoreEditMode(false)}>
                        Cancel
                      </button>
                      <button
                        className="edit__btn save"
                        onClick={handleSaveStore}
                        disabled={isStoreLoading || bannerUpload.uploading}
                      >
                        {isStoreLoading ? "Saving…" : "Save Changes"}
                      </button>
                    </>
                  ) : (
                    <button className="edit__btn" onClick={() => setStoreEditMode(true)}>
                      <EditIcon size={13} /> Edit
                    </button>
                  )}
                </div>
              </div>

              <div className="section__body">
                <div className="fields__grid">

                  <div className="field__item full__width">
                    <span className="field__label">Store URL Name</span>
                    {storeEditMode ? (
                      <>
                        <Input
                          placeholder="e.g. adire-studio (used in your public store URL)"
                          value={storeData.storeName}
                          onChange={(e) => setStoreData((p) => ({ ...p, storeName: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") }))}
                          prefix={<span style={{ color: "#aaa", fontSize: "0.8rem" }}>oosri.com/store/</span>}
                        />
                        <span style={{ fontSize: "0.78rem", color: "#999", marginTop: 4, display: "block" }}>
                          Only lowercase letters, numbers, and hyphens. This is your unique store URL.
                        </span>
                      </>
                    ) : (
                      <span className="field__value">
                        {storeData.storeName
                          ? <span style={{ color: "var(--oosriPrimary)" }}>oosri.com/store/{storeData.storeName}</span>
                          : <span className="field__empty">Not set</span>}
                      </span>
                    )}
                  </div>

                  <div className="field__item full__width">
                    <span className="field__label">Store Banner</span>
                    {storeEditMode ? (
                      <div>
                        <div style={{ borderRadius: 10, overflow: "hidden", height: 140, background: "#f5f5f5", marginBottom: 8 }}>
                          <CustomUpload
                            editable
                            initialImage={storeData.bannerImage || null}
                            uploadedUrl={bannerUpload.stage === "completed" ? storeData.bannerImage : null}
                            uploading={bannerUpload.uploading}
                            uploadProgress={bannerUpload.progress}
                            uploadStage={bannerUpload.stage}
                            uploadError={bannerUpload.error}
                            onFileSelected={handleBannerFileSelected}
                          />
                        </div>
                        <span style={{ fontSize: "0.78rem", color: "#999" }}>
                          Recommended: 1500 × 400px, JPG or PNG. Max 80 MB.
                        </span>
                      </div>
                    ) : (
                      <span className="field__value">
                        {storeData.bannerImage ? (
                          <img
                            src={storeData.bannerImage}
                            alt="Store banner"
                            style={{ width: "100%", height: 100, objectFit: "cover", borderRadius: 8, display: "block" }}
                          />
                        ) : (
                          <span className="field__empty">No banner set</span>
                        )}
                      </span>
                    )}
                  </div>

                  <div className="field__item full__width">
                    <span className="field__label">Store Description</span>
                    {storeEditMode ? (
                      <Input.TextArea
                        rows={3}
                        maxLength={600}
                        showCount
                        placeholder="Tell buyers about your store, what you sell, your story…"
                        value={storeData.description}
                        onChange={(e) => setStoreData((p) => ({ ...p, description: e.target.value }))}
                      />
                    ) : (
                      <span className="field__value" style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
                        {storeData.description || <span className="field__empty">Not set</span>}
                      </span>
                    )}
                  </div>

                </div>

                <div style={{ marginTop: 24 }}>
                  <p style={{ fontWeight: 600, fontSize: "0.88rem", color: "#333", marginBottom: 12 }}>Social Links</p>
                  <div className="fields__grid">
                    {[
                      { key: "instagram", label: "Instagram username", placeholder: "@youraccount" },
                      { key: "twitter", label: "Twitter / X username", placeholder: "@youraccount" },
                      { key: "facebook", label: "Facebook page name", placeholder: "yourpage" },
                      { key: "tiktok", label: "TikTok username", placeholder: "@youraccount" },
                      { key: "website", label: "Website URL", placeholder: "https://yoursite.com" },
                    ].map(({ key, label, placeholder }) => (
                      <div className="field__item" key={key}>
                        <span className="field__label">{label}</span>
                        {storeEditMode ? (
                          <Input
                            placeholder={placeholder}
                            value={storeData[key]}
                            onChange={(e) => setStoreData((p) => ({ ...p, [key]: e.target.value }))}
                          />
                        ) : (
                          <span className="field__value">
                            {storeData[key] || <span className="field__empty">Not set</span>}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </SellersProfileWrapper>
    </DashboardLayout>
  );
}
