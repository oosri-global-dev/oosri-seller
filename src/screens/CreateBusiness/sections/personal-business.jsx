import TextField from "@/components/lib/TextField";
import Button from "@/components/lib/Button";
import { Form, Upload, DatePicker, message, Select, Spin } from "antd";
import { useState, useEffect } from "react";
import { getDocumentUploadUrls, handleCreateBusinessJson } from "@/network/business";
import { getBanks, resolveBankAccount } from "@/network/bank";
import useNotification from "@/hooks/useNotification";
import { debounce } from "lodash";
import { MdOutlineUploadFile as UploadFileIcon } from "react-icons/md";
import { FiCheckCircle as CheckIcon } from "react-icons/fi";

const { Option } = Select;

export default function PersonalBusiness() {
  const [form] = Form.useForm();
  const [loading, setIsLoading] = useState(false);
  const [banks, setBanks] = useState([]);
  const [resolvingAccount, setResolvingAccount] = useState(false);
  const [accountResolved, setAccountResolved] = useState(false);
  const [idFileName, setIdFileName] = useState("");
  const [success, error] = useNotification();

  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    try {
      const res = await getBanks();
      if (res.success) setBanks(res.data);
    } catch (err) {
      console.error("Failed to fetch banks:", err);
    }
  };

  const handleAccountVerification = async () => {
    const bankCode = form.getFieldValue(["bankDetails", "bankCode"]);
    const accountNumber = form.getFieldValue(["bankDetails", "accountNumber"]);

    if (bankCode && accountNumber && accountNumber.length >= 10) {
      setResolvingAccount(true);
      setAccountResolved(false);
      try {
        const res = await resolveBankAccount({
          account_number: accountNumber,
          bank_code: bankCode,
        });
        if (res.success) {
          form.setFieldsValue({
            bankDetails: {
              ...form.getFieldValue("bankDetails"),
              accountName: res.data.account_name,
            },
          });
          setAccountResolved(true);
          success("Account verified successfully");
        }
      } catch (err) {
        console.error("Account verification failed:", err);
        form.setFieldsValue({
          bankDetails: {
            ...form.getFieldValue("bankDetails"),
            accountName: "",
          },
        });
        setAccountResolved(false);
        error("Could not verify account details. Please check your inputs.");
      } finally {
        setResolvingAccount(false);
      }
    }
  };

  const debouncedVerification = debounce(handleAccountVerification, 1000);

  const uploadToCloudinary = async (file, uploadConfig) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", uploadConfig.apiKey);
    formData.append("timestamp", uploadConfig.timestamp);
    formData.append("signature", uploadConfig.signature);
    formData.append("public_id", uploadConfig.publicId);
    formData.append("folder", uploadConfig.folder);
    const res = await fetch(uploadConfig.url, { method: "POST", body: formData });
    if (!res.ok) throw new Error("Cloudinary upload failed");
    return (await res.json()).secure_url;
  };

  const handleCreateBusiness = async (values) => {
    setIsLoading(true);
    try {
      const { uploadUrls } = await getDocumentUploadUrls({
        businessType: "Personal",
        documents: ["countryIdentificationCard"],
      });

      let countryIdUrl = "";
      const idFileObj = values.countryIdentificationCard?.file?.originFileObj;
      if (idFileObj) {
        countryIdUrl = await uploadToCloudinary(idFileObj, uploadUrls.countryIdentificationCard);
      }

      const mappedBankDetails = {
        bank: banks.find((b) => b.code === values.bankDetails.bankCode)?.name || "",
        accountName: values.bankDetails.accountName,
        accountNumber: values.bankDetails.accountNumber,
      };

      await handleCreateBusinessJson({
        dateOfBirth: values.dateOfBirth.format("YYYY-MM-DD"),
        residentialAddress: values.residentialAddress,
        phoneNumber: values.phoneNumber,
        bankDetails: mappedBankDetails,
        countryIdentificationCardUrl: countryIdUrl,
      });

      success("Business registration successful!");
      window.location.href = "/dashboard";
    } catch (err) {
      setIsLoading(false);
      if (err?.response?.status === 500) {
        error("Internal Server Error, please try again later...");
        return;
      }
      error(err?.response?.data?.message || err.message || "Something went wrong during registration");
    }
  };

  const fileUploadProps = {
    name: "countryIdentificationCard",
    accept: ".pdf,.jpg,.jpeg,.png",
    maxCount: 1,
    showUploadList: false,
    customRequest: ({ onSuccess }) => setTimeout(() => onSuccess("ok"), 0),
    beforeUpload: (file) => {
      const isValidType = ["application/pdf", "image/jpeg", "image/png"].includes(file.type);
      if (!isValidType) {
        message.error("You can only upload PDF or Image files!");
        return false;
      }
      const isLt4M = file.size / 1024 / 1024 < 4;
      if (!isLt4M) {
        message.error("File must be smaller than 4MB!");
        return false;
      }
      setIdFileName(file.name);
      return true;
    },
  };

  return (
    <Form form={form} onFinish={handleCreateBusiness}>

      {/* Personal Information */}
      <div className="form__card">
        <div className="card__header">
          <h3>Personal Information</h3>
          <p>Basic details to identify your account</p>
        </div>
        <div className="card__body">
          <div className="fields__grid">
            <div className="field__wrap">
              <label>Date of Birth</label>
              <Form.Item
                name="dateOfBirth"
                rules={[{ required: true, message: "Please select your date of birth" }]}
                style={{ marginBottom: 0 }}
              >
                <DatePicker style={{ width: "100%", height: "40px" }} />
              </Form.Item>
            </div>
            <div className="field__wrap">
              <label>Phone Number</label>
              <Form.Item
                name="phoneNumber"
                rules={[{ required: true, message: "Please enter your phone number" }]}
                style={{ marginBottom: 0 }}
              >
                <TextField name="phoneNumber" type="text" maxLength={20} />
              </Form.Item>
            </div>
            <div className="field__wrap full__col">
              <label>Residential Address</label>
              <Form.Item
                name="residentialAddress"
                rules={[{ required: true, message: "Please enter your residential address" }]}
                style={{ marginBottom: 0 }}
              >
                <TextField name="residentialAddress" type="text" maxLength={100} />
              </Form.Item>
            </div>
          </div>
        </div>
      </div>

      {/* Identity Verification */}
      <div className="form__card">
        <div className="card__header">
          <h3>Identity Verification</h3>
          <p>Upload a valid government-issued ID (PDF, JPG or PNG · Max 4MB)</p>
        </div>
        <div className="card__body">
          <div className="field__wrap">
            <label>Country Identification Card</label>
            <Form.Item
              name="countryIdentificationCard"
              rules={[{ required: true, message: "Please upload your ID card" }]}
              style={{ marginBottom: 0 }}
            >
              <Upload {...fileUploadProps}>
                <div className={`upload__area${idFileName ? " has__file" : ""}`}>
                  {idFileName ? (
                    <>
                      <CheckIcon size={24} style={{ color: "#16a34a" }} />
                      <p className="upload__file__name">{idFileName}</p>
                      <p className="upload__hint">Click to change file</p>
                    </>
                  ) : (
                    <>
                      <span className="upload__icon">
                        <UploadFileIcon size={28} />
                      </span>
                      <p className="upload__title">Click to upload ID Card</p>
                      <p className="upload__hint">PDF, JPG or PNG · Max 4MB</p>
                    </>
                  )}
                </div>
              </Upload>
            </Form.Item>
          </div>
        </div>
      </div>

      {/* Bank Details */}
      <div className="form__card">
        <div className="card__header">
          <h3>Bank Details</h3>
          <p>Your payout account for sales proceeds</p>
        </div>
        <div className="card__body">
          <div className="fields__grid">
            <div className="field__wrap">
              <label>Bank Name</label>
              <Form.Item
                name={["bankDetails", "bankCode"]}
                rules={[{ required: true, message: "Please select your bank" }]}
                style={{ marginBottom: 0 }}
              >
                <Select
                  placeholder="Select Bank"
                  style={{ height: "40px" }}
                  onChange={handleAccountVerification}
                  showSearch
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {banks.map((bank) => (
                    <Option key={bank.code} value={bank.code}>
                      {bank.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="field__wrap">
              <label>Account Number</label>
              <Form.Item
                name={["bankDetails", "accountNumber"]}
                rules={[{ required: true, message: "Please enter your account number" }]}
                style={{ marginBottom: 0 }}
              >
                <TextField
                  name="accountNumber"
                  type="text"
                  maxLength={20}
                  onChange={debouncedVerification}
                />
              </Form.Item>
            </div>
            <div className="field__wrap full__col">
              <label>Account Name</label>
              {resolvingAccount && (
                <p className="resolve__hint resolving">Verifying account…</p>
              )}
              {accountResolved && !resolvingAccount && (
                <p className="resolve__hint resolved">Account verified</p>
              )}
              <Spin spinning={resolvingAccount}>
                <Form.Item
                  name={["bankDetails", "accountName"]}
                  rules={[{ required: true, message: "Account name will be auto-populated after verification" }]}
                  style={{ marginBottom: 0 }}
                >
                  <TextField
                    name="accountName"
                    type="text"
                    maxLength={70}
                    width="100%"
                    readOnly
                    disabled
                  />
                </Form.Item>
              </Spin>
            </div>
          </div>
        </div>
      </div>

      <Form.Item style={{ marginBottom: 0 }}>
        <Button
          htmlType="submit"
          backgroundColor="var(--oosriPrimary)"
          color="#fff"
          width="100%"
          height="44px"
          hoverBg="#e04040"
          loading={loading}
        >
          Create Business Account
        </Button>
      </Form.Item>
    </Form>
  );
}
