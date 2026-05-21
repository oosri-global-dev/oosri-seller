import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import { ProductWrapper } from "./product.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import HeaderTextAndSub from "./simple-components/simple-components";
import ProductImage from "@/assets/images/profile.jpg";
import Button from "@/components/lib/Button";
import { useEffect, useState } from "react";
import EditProduct from "../Edit/edit-product";
import { getCategories, getProduct } from "@/network/product";
import CustomLoader from "@/components/lib/CustomLoader";
import { ProductDetails } from "./productDetails";

export default function Product() {
  const [edit, setEdit] = useState(false)
  const [loading, setLoading] = useState(true)
  const [productData, setProductData] = useState()
  const [id, setId] = useState()
  const [subCategories, setSubCategories] = useState()

  const fetchProductData = async () => {
    let id = window.location.pathname
    let regex = /\/product\/([a-f0-9]{24})/;
    let match = id.match(regex);
    try {
      if (match) {
        id = match[1].trim();
      }
      const data = await getProduct(id)
      setProductData(data.data.data)
      setId(id)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductData()
  }, [])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories()
        const categories = data.data.data
        const selectedCategory = categories.find((category) => category.name === (productData?.category?.name || productData?.category));
        if (selectedCategory) {
          const items = []
          const values = selectedCategory.subcategories
          for (let index = 0; index < values.length; index++) {
            items.push(
              {
                key: values[index].name,
                label: values[index].name,
              }
            )
          }
          setSubCategories(items)
        }
      } catch (errors) {
        // category fetch failure leaves subcategory selector empty
      }
    }
    fetchCategories()
  }, [])
  return (
    <>
      {
        loading ?
          <CustomLoader />
          :
          <DashboardLayout title={"Product Detail"} showBackBtn>
            {edit ?
              <div>
                <EditProduct data={productData} id={id} setEdit={setEdit} fetchData={fetchProductData} subCategories={subCategories} />
              </div>
              :
              <ProductWrapper>
                <ProductDetails data={productData} setEdit={setEdit} />
              </ProductWrapper>
            }
          </DashboardLayout>
      }
    </>
  );
}
