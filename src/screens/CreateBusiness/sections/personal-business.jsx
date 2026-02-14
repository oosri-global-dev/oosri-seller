import TextField from "@/components/lib/TextField";
import { UploadOutlined } from "@ant-design/icons";
import Button from "@/components/lib/Button";
import { Form, Upload, Button as AntdButton, DatePicker, message, Select, Spin } from "antd";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { objectToFormData } from "@/utils/form-data-helper";
import { useState, useEffect } from "react";
import { getDocumentUploadUrls, handleCreateBusinessJson } from "@/network/business";
import { getBanks, resolveBankAccount } from "@/network/bank";
import useNotification from "@/hooks/useNotification";
import { useRouter } from "next/router";
import { debounce } from "lodash";

const { Option } = Select;

export default function PersonalBusiness() {
  const [form] = Form.useForm();
  const [loading, setIsLoading] = useState(false);
  const [banks, setBanks] = useState([]);
  const [resolvingAccount, setResolvingAccount] = useState(false);
  const [success, error] = useNotification();
  const { push } = useRouter();

  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    try {
      const res = await getBanks();
      if (res.success) {
        setBanks(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch banks:", err);
    }
  };

  const handleAccountVerification = async () => {
    const bankCode = form.getFieldValue(["bankDetails", "bankCode"]);
    const accountNumber = form.getFieldValue(["bankDetails", "accountNumber"]);

    if (bankCode && accountNumber && accountNumber.length >= 10) {
      setResolvingAccount(true);
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

    const res = await fetch(uploadConfig.url, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Cloudinary upload failed");
    }

    const data = await res.json();
    return data.secure_url;
  };

  const handleCreateBusiness = async (values) => {
    setIsLoading(true);

    try {
      // 1. Get presigned URL from backend
      const { uploadUrls } = await getDocumentUploadUrls({
        businessType: "Personal",
        documents: ["countryIdentificationCard"],
      });

      // 2. Upload file directly to Cloudinary
      let countryIdUrl = "";
      const idFileObj = values.countryIdentificationCard?.file?.originFileObj;

      if (idFileObj) {
        countryIdUrl = await uploadToCloudinary(idFileObj, uploadUrls.countryIdentificationCard);
      }

      // 3. Submit registration with Cloudinary URL as JSON
      const mappedBankDetails = {
        bank: banks.find(b => b.code === values.bankDetails.bankCode)?.name || "",
        accountName: values.bankDetails.accountName,
        accountNumber: values.bankDetails.accountNumber
      }

      const payload = {
        dateOfBirth: values.dateOfBirth.format("YYYY-MM-DD"),
        residentialAddress: values.residentialAddress,
        bankDetails: mappedBankDetails,
        countryIdentificationCardUrl: countryIdUrl,
      };

      await handleCreateBusinessJson(payload);

      success("Business registration successful!");
      window.location.href = "/dashboard";
    } catch (err) {
      setIsLoading(false);
      console.error("Registration Error:", err);
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
    beforeUpload: (file) => {
      const isValidType = [
        "application/pdf",
        "image/jpeg",
        "image/png",
      ].includes(file.type);
      if (!isValidType) {
        message.error("You can only upload PDF or Image files!");
      }
      const isLt4M = file.size / 1024 / 1024 < 4;
      if (!isLt4M) {
        message.error("File must be smaller than 4MB!");
      }
      return isValidType && isLt4M;
    },
  };

  return (
    <Form form={form} onFinish={handleCreateBusiness} className="form__wrapper">
      <FlexibleDiv
        flexDir="row"
        justifyContent="space-between"
        width="100%"
        className="single__row"
      >
        <FlexibleDiv
          flexDir="column"
          alignItems="flex-start"
          gap="5px"
          className="single__input__box"
        >
          <label>Date of Birth</label>
          <Form.Item
            name="dateOfBirth"
            rules={[
              { required: true, message: "Please select your date of birth" },
            ]}
          >
            <DatePicker style={{ width: "100%", height: "40px" }} />
          </Form.Item>
        </FlexibleDiv>
        <FlexibleDiv
          flexDir="column"
          alignItems="flex-start"
          gap="5px"
          className="single__input__box"
        >
          <label>Residential Address</label>
          <Form.Item
            name="residentialAddress"
            rules={[
              {
                required: true,
                message: "Please enter your residential address",
              },
            ]}
          >
            <TextField name="residentialAddress" type="text" maxLength={100} />
          </Form.Item>
        </FlexibleDiv>
      </FlexibleDiv>

      <FlexibleDiv
        flexDir="column"
        alignItems="flex-start"
        gap="5px"
        width="100%"
      >
        <label>Country Identification Card</label>
        <Form.Item
          name="countryIdentificationCard"
          rules={[{ required: true, message: "Please upload your ID card" }]}
        >
          <Upload {...fileUploadProps}>
            <AntdButton color="var(--oosriPrimary)" icon={<UploadOutlined />}>
              Upload ID Card
            </AntdButton>
          </Upload>
        </Form.Item>
      </FlexibleDiv>

      <FlexibleDiv
        flexDir="row"
        justifyContent="space-between"
        width="100%"
        className="single__row"
      >
        <FlexibleDiv
          flexDir="column"
          alignItems="flex-start"
          gap="5px"
          className="single__input__box"
        >
          <label>Bank Name</label>
          <Form.Item
            name={["bankDetails", "bankCode"]}
            rules={[{ required: true, message: "Please select your bank" }]}
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
        </FlexibleDiv>
        <FlexibleDiv
          flexDir="column"
          alignItems="flex-start"
          gap="5px"
          className="single__input__box"
        >
          <label>Account Name</label>
          <Spin spinning={resolvingAccount}>
            <Form.Item
              name={["bankDetails", "accountName"]}
              rules={[
                { required: true, message: "Account Name will be auto-populated" },
              ]}
              style={{ width: "100%" }}
            >
              <TextField name="accountName" type="text" maxLength={70} width="100%" readOnly disabled />
            </Form.Item>
          </Spin>
        </FlexibleDiv>
      </FlexibleDiv>

      <FlexibleDiv flexDir="row" justifyContent="space-between" width="100%">
        <FlexibleDiv
          flexDir="column"
          alignItems="flex-start"
          gap="5px"
          className="single__input__box"
        >
          <label>Account Number</label>
          <Form.Item
            name={["bankDetails", "accountNumber"]}
            rules={[
              { required: true, message: "Please enter your account number" },
            ]}
          >
            <TextField
              name="accountNumber"
              type="text"
              maxLength={20}
              onChange={debouncedVerification}
            />
          </Form.Item>
        </FlexibleDiv>
      </FlexibleDiv>

      <Form.Item>
        <Button
          htmlType="submit"
          backgroundColor="var(--oosriPrimary)"
          color="#ffff"
          loading={loading}
        >
          Create Business
        </Button>
      </Form.Item>
    </Form>
  );
}
