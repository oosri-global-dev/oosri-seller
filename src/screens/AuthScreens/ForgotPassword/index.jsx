import ForgotPassword from "./sections/forgot-password/forgot-password";
import CheckEmail from "./sections/check-email/check-email";
import { useState } from "react";

export default function ForgotPasswordSection() {
  const [step, setStep] = useState(1);

  return step === 1 ? (
    <ForgotPassword setStep={setStep} />
  ) : (
    <CheckEmail setStep={setStep} />
  );
}
