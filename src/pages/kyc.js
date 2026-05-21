import Head from "next/head";
import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import KycScreen from "@/screens/Kyc/kyc-screen";

export default function KycPage() {
  return (
    <>
      <Head><title>Identity Verification | Oosri Seller</title></Head>
      <DashboardLayout title="Identity Verification (KYC)">
        <KycScreen />
      </DashboardLayout>
    </>
  );
}
