import { AuthLayoutWrapper } from "./auth-layout.styles";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";
import AuthBg from "@/assets/images/auth-bg.png";

export default function AuthLayout({ children, heroText = '', subText = '' }) {
  return (
    <AuthLayoutWrapper>
      {/* Left panel - desktop only */}
      <div className="left__section">
        <div className="left__overlay" />
        <div className="left__content">
          <Image
            src={Logo}
            alt="Oosri logo"
            width={130}
            height={52}
            style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }}
          />
          <div className="left__text">
            <h1 className="hero__text">{heroText}</h1>
            <p className="hero__sub">{subText}</p>
          </div>
          <div className="left__badge">
            Africa's marketplace for the world
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="right__section">
        {/* Mobile hero image - only on mobile */}
        <div className="mobile__hero">
          <Image
            src={AuthBg}
            alt="Oosri background"
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
          <div className="mobile__hero__overlay" />
          <div className="mobile__hero__content">
            <Image
              src={Logo}
              alt="Oosri logo"
              width={100}
              height={40}
              style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }}
            />
            <p className="mobile__hero__text">{heroText}</p>
          </div>
        </div>

        {/* Form card - slides up over the image on mobile */}
        <div className="form__card">
          {children}
        </div>
      </div>
    </AuthLayoutWrapper>
  );
}