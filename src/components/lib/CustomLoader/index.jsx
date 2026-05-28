import { CustomLoaderWrap } from "./index.styles";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";

export default function CustomLoader({ customHeight }) {
  return (
    <CustomLoaderWrap customHeight={customHeight}>
      <div className="loader__bar__wrap">
        <div className="loader__bar__fill" />
      </div>
      <div className="loader__inner">
        <Image
          src={Logo}
          alt="Oosri"
          width={96}
          height={38}
          style={{ objectFit: "contain", opacity: 0.85 }}
        />
        <div className="loader__spinner" />
      </div>
    </CustomLoaderWrap>
  );
}
