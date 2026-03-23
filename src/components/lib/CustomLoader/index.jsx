import { CustomLoaderWrap } from "./index.styles";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";

export default function CustomLoader({ customHeight }) {
  return (
    <CustomLoaderWrap customHeight={customHeight}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
      }}>
        <Image
          src={Logo}
          alt="Oosri"
          width={120}
          height={48}
          style={{ objectFit: "contain" }}
        />
        <div style={{
          width: "40px",
          height: "40px",
          border: "3px solid #f0f0f0",
          borderTop: "3px solid var(--oosriPrimary, #e05555)",
          borderRadius: "50%",
          animation: "oosri__spin 0.8s linear infinite",
        }} />
        <style>{`
          @keyframes oosri__spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </CustomLoaderWrap>
  );
}