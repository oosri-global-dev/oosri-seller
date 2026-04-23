import { CreateProductPageWrapper } from "./index.styles";
import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import { useEffect, useState } from "react";
import { Tabs } from "antd";
import { CreateTab } from "./Tab/createTab";
import { getCategories } from "@/network/product";
import CustomLoader from "@/components/lib/CustomLoader";

export default function CreateProductPage() {
  const [activeTab, setActiveTab] = useState("")
  const [categories, setCategories] = useState([])
  const [displayCategories, setDisplayCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [subCategories, setSubCategories] = useState([])


  const handleSubCategories = () => {
    const selectedCategory = categories.find((category) => category._id === activeTab);
    if (selectedCategory && selectedCategory.subcategories) {
      // Map subcategories to include _id as id
      const mappedSubcategories = selectedCategory.subcategories.map(sub => ({
        ...sub,
        id: sub._id,
        value: sub.name
      }));
      setSubCategories(mappedSubcategories);
    }
  };

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const data = await getCategories()
        const newCategories = [];
        const items = []

        for (let index = 0; index < data.data.data.length; index++) {
          const cat = data.data.data[index];
          newCategories.push(cat);
          items.push(
            {
              key: cat._id,
              label: cat.name,
              categoryId: cat._id
            }
          )
        }
        setCategories(newCategories);
        setDisplayCategories(items)

        // Set the initial active tab and immediately resolve its subcategories
        // from the freshly-fetched data (not from state, which hasn't updated yet)
        const firstCat = newCategories[0];
        if (firstCat) {
          setActiveTab(firstCat._id);
          setCategoryName(firstCat.name);
          if (firstCat.subcategories) {
            const mappedSubcategories = firstCat.subcategories.map(sub => ({
              ...sub,
              id: sub._id,
              value: sub.name
            }));
            setSubCategories(mappedSubcategories);
          }
        }

        setLoading(false)
      } catch (errors) {
        console.error('Failed to load categories:', errors)
        setLoading(false) // Stop the spinner even on error
      }
    }
    fetchAllProducts()
  }, [])

  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (activeTab && categories.length > 0) {
      handleSubCategories();
      const selectedCategory = categories.find((cat) => cat._id === activeTab);
      if (selectedCategory) {
        setCategoryName(selectedCategory.name);
      }
    }
  }, [activeTab, categories])


  const handleTabChange = (e) => {
    setActiveTab(e)
  }

  return (
    <>
      {
        loading
          ?
          <CustomLoader />
          : <DashboardLayout title={"Add Product"} showBackBtn>
            <CreateProductPageWrapper>
              <Tabs
                className="tabs__custom"
                defaultActiveKey="1"
                items={displayCategories}
                onChange={(e) => handleTabChange(e)} />
              {

              }
              <CreateTab
                subCategories={subCategories}
                category={activeTab}
                categoryName={categoryName}
                selectedCategory={categories.find(c => c._id === activeTab)}
              />

            </CreateProductPageWrapper>
          </DashboardLayout>
      }
    </>
  );
}
