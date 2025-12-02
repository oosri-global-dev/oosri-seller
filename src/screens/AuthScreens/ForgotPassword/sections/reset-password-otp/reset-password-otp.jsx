import { FlexibleDiv } from "@/components/lib/Box/styles";
import { CheckEmailWrapper } from "../EmailVerification/email-verification.styles";
import { GoLock as LockIcon } from "react-icons/go";
import AuthLayout from "@/components/layouts/AuthLayout/auth-layout";
import OtpInput from "react-otp-input";
import { useState } from "react";
import Button from "@/components/lib/Button";
import useNotification from "@/hooks/useNotification";
import { handleResendOTP } from "@/network/user";

export default function ResetPasswordOTP({ setStep, email }) {
    const [otp, setOtp] = useState("");
    const [success, error] = useNotification();
    const [btnLoading, setBtnLoading] = useState(false);
    const [resendOtpBtnLoading, setResendOTPBtnLoading] = useState(false);

    const handleSubmitOTP = async () => {
        setBtnLoading(true);
        if (otp?.length < 6) {
            error("OTP must be 6 digits");
            setBtnLoading(false);
            return;
        }

        // Store OTP and move to reset password step
        localStorage.setItem("resetOTP", otp);
        setStep(3);
        setBtnLoading(false);
    };

    const handleResendOTPClick = async () => {
        setResendOTPBtnLoading(true);

        await handleResendOTP({ email })
            .then((res) => {
                setResendOTPBtnLoading(false);
                success(res?.data?.message || "OTP resent successfully");
            })
            .catch((err) => {
                setResendOTPBtnLoading(false);
                error(err?.response?.data?.message || "Failed to resend OTP");
            });
    };

    return (
        <AuthLayout
            heroText="Manage Your Business Effortlessly"
            subText="Streamline Operations, Maximize Sales"
        >
            <CheckEmailWrapper>
                <FlexibleDiv
                    className="lock__icon__wrapper"
                    justifyContent="center"
                    alignItems="center"
                >
                    <LockIcon size={40} color="var(--oosriPrimary)" />
                </FlexibleDiv>
                <FlexibleDiv
                    alignItems="center"
                    justifyContent="center"
                    flexDir="column"
                    className="content__wrap"
                >
                    <p className="header__text">Check Email</p>
                    <p className="header__sub__text">
                        We've sent a 6-digit code to {email}
                    </p>
                    <OtpInput
                        containerStyle="otp__wrapper"
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        inputType="number"
                        renderSeparator={<span> </span>}
                        renderInput={(props) => <input {...props} />}
                    />
                    <FlexibleDiv
                        justifyContent="center"
                        alignItems="center"
                        flexDir="column"
                        gap="28px"
                    >
                        {resendOtpBtnLoading ? (
                            <p className="code__text">Resending new OTP to your email</p>
                        ) : (
                            <p className="code__text">
                                Didn't get a code?{" "}
                                <span onClick={() => handleResendOTPClick()}>
                                    Click to resend
                                </span>
                            </p>
                        )}

                        <Button
                            backgroundColor="var(--oosriPrimary)"
                            color="#fff"
                            width="100%"
                            maxWidth="250px"
                            loading={btnLoading}
                            disabled={btnLoading}
                            onClick={() => handleSubmitOTP()}
                        >
                            Continue
                        </Button>
                    </FlexibleDiv>
                </FlexibleDiv>
            </CheckEmailWrapper>
        </AuthLayout>
    );
}
