import { CreateProductPageWrapper } from "./index.styles";
import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import { useEffect, useState, useMemo } from "react";
import { CreateTab } from "./Tab/createTab";
import { getCategories } from "@/network/product";
import CustomLoader from "@/components/lib/CustomLoader";
import Select from "@/components/lib/Select";

export default function CreateProductPage() {
  const [categories, setCategories]         = useState([]);
  const [loading, setLoading]               = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

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

  const categoryOptions = useMemo(
    () => categories.map((c) => ({ value: c._id, label: c.name })),
    [categories]
  );

  const selectedCategory = useMemo(
    () => categories.find((c) => c._id === selectedCategoryId) || null,
    [categories, selectedCategoryId]
  );

  if (loading) return <CustomLoader />;

  return (
    <DashboardLayout title="Add Product" showBackBtn>
      <CreateProductPageWrapper>

        {/* Category must be selected before the product form appears */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 8, color: '#374151' }}>
            Product Category <span style={{ color: '#fc5353' }}>*</span>
          </label>
          <Select
            options={categoryOptions}
            placeholder="Select a category to continue"
            value={selectedCategoryId}
            onChange={(val) => setSelectedCategoryId(val)}
            style={{ width: '100%', maxWidth: 400 }}
          />
        </div>

        {selectedCategory && (
          <CreateTab
            category={selectedCategory._id}
            categoryName={selectedCategory.name}
            selectedCategory={selectedCategory}
            subCategories={selectedCategory.subcategories || []}
          />
        )}

      </CreateProductPageWrapper>
    </DashboardLayout>
  );
}
