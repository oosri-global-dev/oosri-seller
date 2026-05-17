import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import NegotiationsScreen from "@/screens/Negotiations/negotiations";

export default function NegotiationsPage() {
  return (
    <DashboardLayout title="Negotiations">
      <NegotiationsScreen />
    </DashboardLayout>
  );
}
