import { CreateProductPageWrapper } from "./index.styles";
import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import { useEffect, useState } from "react";
import { CreateTab } from "./Tab/createTab";
import { getCategories } from "@/network/product";
import CustomLoader from "@/components/lib/CustomLoader";

export default function CreateProductPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.data.data || []);
      } catch (err) {
        console.error("Failed to load categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <CustomLoader />;

  return (
    <DashboardLayout title="Add Product" showBackBtn>
      <CreateProductPageWrapper>
        <CreateTab categories={categories} />
      </CreateProductPageWrapper>
    </DashboardLayout>
  );
}
