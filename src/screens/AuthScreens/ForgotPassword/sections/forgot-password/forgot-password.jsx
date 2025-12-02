import { FlexibleDiv } from "@/components/lib/Box/styles";
import { ForgotPasswordWrapper } from "./forgot-password.styles";
import { GoLock as LockIcon } from "react-icons/go";
import { Form, message } from "antd";
import TextField from "@/components/lib/TextField";
import Button from "@/components/lib/Button";
import AuthLayout from "@/components/layouts/AuthLayout/auth-layout";
import { handleForgotPassword } from "@/network/user";
import { useState } from "react";

export default function ForgotPassword({ setStep }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await handleForgotPassword({ email: values.email });

      if (response.data.success) {
        message.success(response.data.message || "Reset code sent to your email");
        // Store email in localStorage for the reset password step
        localStorage.setItem("resetEmail", values.email);
        setStep(2);
      } else {
        message.error(response.data.message || "Failed to send reset code");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      message.error(
        error.response?.data?.message ||
        "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      heroText="Manage Your Business Effortlessly"
      subText="Streamline Operations, Maximize Sales"
    >
      <ForgotPasswordWrapper>
        <FlexibleDiv className="lock__icon__wrapper">
          <LockIcon size={40} color="var(--oosriPrimary)" />
        </FlexibleDiv>
        <FlexibleDiv
          alignItems="center"
          justifyContent="center"
          flexDir="column"
          gap="10px"
        >
          <h1>Forgot Password</h1>
          <p className="header__sub__text">
            Enter the email you used to create your account <br />
            so we can send you a code
          </p>
        </FlexibleDiv>
        <Form form={form} onFinish={handleSubmit}>
          <FlexibleDiv
            alignItems="flex-start"
            justifyContent="flex-start"
            flexDir="column"
          >
            <label className="input__label">Email Address</label>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" }
              ]}
            >
              <TextField type="email" borderRadius="10px" />
            </Form.Item>
            <Button
              width="100%"
              backgroundColor="var(--oosriPrimary)"
              type="submit"
              htmlType="submit"
              color="var(--oosriWhite)"
              radius="10px"
              margin="15px 0 0 0"
              loading={loading}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </Button>
          </FlexibleDiv>
        </Form>
      </ForgotPasswordWrapper>
    </AuthLayout>
  );
}
