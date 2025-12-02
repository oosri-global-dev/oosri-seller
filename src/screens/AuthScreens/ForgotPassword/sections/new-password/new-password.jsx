import { FlexibleDiv } from "@/components/lib/Box/styles";
import { ForgotPasswordWrapper } from "../forgot-password/forgot-password.styles";
import { GoLock as LockIcon } from "react-icons/go";
import { Form, message } from "antd";
import TextField from "@/components/lib/TextField";
import Button from "@/components/lib/Button";
import AuthLayout from "@/components/layouts/AuthLayout/auth-layout";
import { handleResetPassword } from "@/network/user";
import { useState } from "react";
import { useRouter } from "next/router";

export default function NewPassword() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const code = localStorage.getItem("resetOTP");

            if (!code) {
                message.error("Invalid session. Please start over.");
                router.push("/forgot-password");
                return;
            }

            const response = await handleResetPassword({
                code,
                newPassword: values.newPassword,
                confirmPassword: values.confirmPassword,
            });

            if (response.data.success) {
                message.success("Password reset successful! Redirecting to login...");
                // Clear stored data
                localStorage.removeItem("resetEmail");
                localStorage.removeItem("resetOTP");

                setTimeout(() => {
                    router.push("/login");
                }, 1500);
            } else {
                message.error(response.data.message || "Failed to reset password");
            }
        } catch (error) {
            console.error("Reset password error:", error);
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
                    <h1>Create New Password</h1>
                    <p className="header__sub__text">
                        Your new password must be different <br />
                        from previously used passwords
                    </p>
                </FlexibleDiv>
                <Form form={form} onFinish={handleSubmit}>
                    <FlexibleDiv
                        alignItems="flex-start"
                        justifyContent="flex-start"
                        flexDir="column"
                    >
                        <label className="input__label">New Password</label>
                        <Form.Item
                            name="newPassword"
                            rules={[
                                { required: true, message: "Please enter your new password" },
                                { min: 6, message: "Password must be at least 6 characters" },
                            ]}
                        >
                            <TextField type="password" borderRadius="10px" />
                        </Form.Item>

                        <label className="input__label">Confirm Password</label>
                        <Form.Item
                            name="confirmPassword"
                            dependencies={["newPassword"]}
                            rules={[
                                { required: true, message: "Please confirm your password" },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue("newPassword") === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error("The two passwords do not match")
                                        );
                                    },
                                }),
                            ]}
                        >
                            <TextField type="password" borderRadius="10px" />
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
                            {loading ? "Resetting..." : "Reset Password"}
                        </Button>
                    </FlexibleDiv>
                </Form>
            </ForgotPasswordWrapper>
        </AuthLayout>
    );
}
