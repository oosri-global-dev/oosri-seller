import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import { useEffect, useState } from "react";
import EditProduct from "../Edit/edit-product";
import { getCategories, getProduct } from "@/network/product";
import CustomLoader from "@/components/lib/CustomLoader";
import { ProductDetails } from "./productDetails";

export default function Product() {
  const [edit, setEdit]             = useState(false);
  const [loading, setLoading]       = useState(true);
  const [productData, setProductData] = useState();
  const [id, setId]                 = useState();
  const [categories, setCategories] = useState([]);

  const fetchProductData = async () => {
    let path = window.location.pathname;
    const regex = /\/product\/([a-f0-9]{24})/;
    const match = path.match(regex);
    try {
      const productId = match ? match[1].trim() : null;
      if (!productId) return;
      const data = await getProduct(productId);
      setProductData(data.data.data);
      setId(productId);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.data.data || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCategories();
  }, []);

  return (
    <>
      {loading ? (
        <CustomLoader />
      ) : (
        <DashboardLayout title="Product Detail" showBackBtn>
          {edit ? (
            <EditProduct
              data={productData}
              id={id}
              setEdit={setEdit}
              fetchData={fetchProductData}
              categories={categories}
            />
          ) : (
            <ProductDetails data={productData} setEdit={setEdit} />
          )}
        </DashboardLayout>
      )}
    </>
  );
}
