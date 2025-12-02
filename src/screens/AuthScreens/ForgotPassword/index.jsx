import ForgotPassword from "./sections/forgot-password/forgot-password";
import ResetPasswordOTP from "./sections/reset-password-otp/reset-password-otp";
import NewPassword from "./sections/new-password/new-password";
import { useState, useEffect } from "react";

export default function ForgotPasswordSection() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Get email from localStorage if available
    const storedEmail = localStorage.getItem("resetEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  if (step === 1) {
    return <ForgotPassword setStep={setStep} />;
  } else if (step === 2) {
    return <ResetPasswordOTP setStep={setStep} email={email} />;
  } else {
    return <NewPassword />;
  }
}
