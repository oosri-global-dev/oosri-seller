import TextField from "@/components/lib/TextField";
import { UploadOutlined } from "@ant-design/icons";
import Button from "@/components/lib/Button";
import { Form, Upload, Button as AntdButton, DatePicker, message } from "antd";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { objectToFormData } from "@/utils/form-data-helper";
import { useState } from "react";
import { getDocumentUploadUrls, handleCreateBusinessJson } from "@/network/business";
import useNotification from "@/hooks/useNotification";
import { useRouter } from "next/router";

export default function CorporateBusiness() {
  const [form] = Form.useForm();
  const [loading, setIsLoading] = useState(false);
  const [success, error] = useNotification();
  const { push } = useRouter();
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
      // 1. Get presigned URLs from backend
      const { uploadUrls } = await getDocumentUploadUrls({
        businessType: "Corporate",
        documents: ["vatCertificate", "companyCertificate"],
      });

      // 2. Upload files directly to Cloudinary in parallel
      const uploadPromises = [];

      const vatFileObj = values.vatCertificate?.file?.originFileObj;
      const companyFileObj = values.companyCertificate?.file?.originFileObj;

      let vatUrl = "";
      let companyUrl = "";

      const tasks = [];

      if (vatFileObj) {
        tasks.push(
          uploadToCloudinary(vatFileObj, uploadUrls.vatCertificate).then(
            (url) => (vatUrl = url)
          )
        );
      }

      if (companyFileObj) {
        tasks.push(
          uploadToCloudinary(companyFileObj, uploadUrls.companyCertificate).then(
            (url) => (companyUrl = url)
          )
        );
      }

      await Promise.all(tasks);

      // 3. Submit registration with Cloudinary URLs as JSON
      const payload = {
        companyName: values?.companyName,
        companyAddress: values?.companyAddress,
        vatNumber: values?.vatNumber,
        companyRegNum: values?.companyRegNum,
        paymentMethod: "Transfer",
        bankDetails: values.bankDetails,
        vatCertificateUrl: vatUrl,
        companyCertificateUrl: companyUrl,
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

  const companyCertificateUploadProps = {
    name: "companyCertificate",
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
      const isLt4M = file.size / 1024 / 1024 < 6;
      if (!isLt4M) {
        message.error("File must be smaller than 6MB!");
      }
      return isValidType && isLt4M;
    },
  };

  const vatCertificateUploadProps = {
    name: "vatCertificate",
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
      const isLt4M = file.size / 1024 / 1024 < 6;
      if (!isLt4M) {
        message.error("File must be smaller than 6MB!");
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
          <label>Company Name</label>
          <Form.Item
            name="companyName"
            rules={[
              { required: true, message: "Please enter the company's name" },
            ]}
          >
            <TextField name="companyName" type="text" maxLength={100} />
          </Form.Item>
        </FlexibleDiv>
        <FlexibleDiv
          flexDir="column"
          alignItems="flex-start"
          gap="5px"
          className="single__input__box"
        >
          <label>Company Address</label>
          <Form.Item
            name="companyAddress"
            rules={[
              {
                required: true,
                message: "Please enter your company's address",
              },
            ]}
          >
            <TextField name="companyAddress" type="text" maxLength={100} />
          </Form.Item>
        </FlexibleDiv>
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
          <label>VAT Number</label>
          <Form.Item
            name="vatNumber"
            rules={[
              { required: true, message: "Please enter your VAT number" },
            ]}
          >
            <TextField name="vatNumber" type="text" maxLength={100} />
          </Form.Item>
        </FlexibleDiv>
        <FlexibleDiv
          flexDir="column"
          alignItems="flex-start"
          gap="5px"
          className="single__input__box"
        >
          <label>Company's Registration Number</label>
          <Form.Item
            name="companyRegNum"
            rules={[
              {
                required: true,
                message: "Please enter your company's registration number",
              },
            ]}
          >
            <TextField name="companyRegNum" type="text" maxLength={100} />
          </Form.Item>
        </FlexibleDiv>
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
          width="100%"
          className="single__input__box"
        >
          <label>VAT Certificate</label>
          <Form.Item
            name="vatCertificate"
            rules={[
              { required: true, message: "Please upload your VAT Certificate" },
            ]}
          >
            <Upload
              {...vatCertificateUploadProps}
            >
              <AntdButton color="var(--oosriPrimary)" icon={<UploadOutlined />}>
                Upload VAT Certificate
              </AntdButton>
            </Upload>
          </Form.Item>
        </FlexibleDiv>
        <FlexibleDiv
          flexDir="column"
          alignItems="flex-start"
          gap="5px"
          width="100%"
          className="single__input__box"
        >
          <label>Company's Certificate</label>
          <Form.Item
            name="companyCertificate"
            rules={[
              {
                required: true,
                message: "Please upload your Company's Certificate",
              },
            ]}
          >
            <Upload
              {...companyCertificateUploadProps}
            >
              <AntdButton color="var(--oosriPrimary)" icon={<UploadOutlined />}>
                Upload Companay's Certificate
              </AntdButton>
            </Upload>
          </Form.Item>
        </FlexibleDiv>
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
            name={["bankDetails", "bank"]}
            rules={[{ required: true, message: "Please enter your bank name" }]}
          >
            <TextField name="bank" type="text" maxLength={50} />
          </Form.Item>
        </FlexibleDiv>
        <FlexibleDiv
          flexDir="column"
          alignItems="flex-start"
          gap="5px"
          className="single__input__box"
        >
          <label>Account Name</label>
          <Form.Item
            name={["bankDetails", "accountName"]}
            rules={[
              { required: true, message: "Please enter your account name" },
            ]}
          >
            <TextField name="accountName" type="text" maxLength={50} />
          </Form.Item>
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
            <TextField name="accountNumber" type="text" maxLength={20} />
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
