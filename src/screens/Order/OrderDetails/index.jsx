"use client"

import DashboardLayout from '@/components/layouts/DashboardLayout/dashboard-layout'
import { Space } from 'antd'
import { OrderDetailsWrapper } from './index.styles'
import { FlexibleDiv } from '@/components/lib/Box/styles'
import Picture from "@/assets/images/profile.jpg";
import LeastPhoto from "@/assets/images/leastSellingProduct.png";


import { useOrderDetails } from '@/hooks/useOrders';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

export default function OrderDetails() {
  const router = useRouter();
  const { orderid } = router.query;
  const { data, isLoading } = useOrderDetails(orderid);
  const order = data?.data?.data;

  if (isLoading) {
    return <DashboardLayout title={"Order Details"}>Loading...</DashboardLayout>;
  }

  if (!order) {
    return <DashboardLayout title={"Order Details"}>Order not found</DashboardLayout>;
  }

  return (
    <DashboardLayout title={"Order Details"}>
      <OrderDetailsWrapper>
        <FlexibleDiv gap="14px" flexWrap="noWrap" justifyContent="start" className='profile__section'>
          <img src={Picture.src} alt='profile-picture' />
          <FlexibleDiv flexDir='column' flexWrap="noWrap" alignItems="start" gap="3px">
            <h5>{order.userId?.fullName || "N/A"}</h5>
            <p>Order Id: {order.id}</p>
          </FlexibleDiv>
        </FlexibleDiv>
        {/* Item Info */}
        {order.products?.map((product, index) => (
          <FlexibleDiv key={index} className='item__info' justifyContent="space-between">
            <div className='absolute__item'>
              <img src={product.images?.[0] || LeastPhoto.src} alt="gadget image" />
              <p>{product.productName}</p>
            </div>
            <FlexibleDiv justifyContent="start" gap="32px" width="fit-content">
              <img src={product.images?.[0] || Picture.src} alt="Item photo" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
              <FlexibleDiv flexDir="column" flexWrap="noWrap" alignItems="start" gap="10px" width="fit-content">
                <h2>{product.productName}</h2>
                <p className='strike__through'>₦{product.price?.toLocaleString()}</p>
                <p>Product Id:  #{product.productId?._id?.slice(-6) || "N/A"}</p>
              </FlexibleDiv>
            </FlexibleDiv>
            <h5>₦{product.totalPrice?.toLocaleString()}</h5>
          </FlexibleDiv>
        ))}
        <FlexibleDiv justifyContent="start" style={{ columnGap: "50px" }}>
          {/* Delivery item 1 */}
          <FlexibleDiv className='delivery__item' gap="12px" alignItems="start" width="fit-content">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.0017 14H13.0017C14.1017 14 15.0017 13.1 15.0017 12V2H6.00171C4.50171 2 3.19172 2.82999 2.51172 4.04999" stroke="#FC5353" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M2 17C2 18.66 3.34 20 5 20H6C6 18.9 6.9 18 8 18C9.1 18 10 18.9 10 20H14C14 18.9 14.9 18 16 18C17.1 18 18 18.9 18 20H19C20.66 20 22 18.66 22 17V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L18.58 6.01001C18.22 5.39001 17.56 5 16.84 5H15V12C15 13.1 14.1 14 13 14H12" stroke="#FC5353" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M8 22C9.10457 22 10 21.1046 10 20C10 18.8954 9.10457 18 8 18C6.89543 18 6 18.8954 6 20C6 21.1046 6.89543 22 8 22Z" stroke="#FC5353" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M16 22C17.1046 22 18 21.1046 18 20C18 18.8954 17.1046 18 16 18C14.8954 18 14 18.8954 14 20C14 21.1046 14.8954 22 16 22Z" stroke="#FC5353" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M22 12V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L22 12Z" stroke="#FC5353" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M2 8H8" stroke="#FC5353" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M2 11H6" stroke="#FC5353" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M2 14H4" stroke="#FC5353" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <FlexibleDiv width="fit-content" gap="8px" flexDir="column" alignItems="start">
              {/* Delivery address */}
              <Space>
                <h4 className="detail__info">Delivery Address:</h4>
                <h4 className="detail__data"> {order.deliveryAddress}</h4>
              </Space>
              {/* Contact Number */}
              <Space>
                <h4 className="detail__info">Contact Number:</h4>
                <h4 className="detail__data"> {order.phoneNumber}</h4>
              </Space>
              {/* Status */}
              <Space>
                <h4 className="detail__info">Status:</h4>
                <h4 className="detail__data">{order.orderStatus}</h4>
              </Space>
              {/* Order Date */}
              <Space>
                <h4 className="detail__info">Order Date:</h4>
                <h4 className="detail__data"> {dayjs(order.orderDate).format("Do, MMMM YYYY")}</h4>
              </Space>
            </FlexibleDiv>
          </FlexibleDiv>
          {/* Delivery item 2 */}
          <FlexibleDiv className='delivery__item' gap="12px" alignItems="start" width="fit-content">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.0017 14H13.0017C14.1017 14 15.0017 13.1 15.0017 12V2H6.00171C4.50171 2 3.19172 2.82999 2.51172 4.04999" stroke="#FC5353" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M2 17C2 18.66 3.34 20 5 20H6C6 18.9 6.9 18 8 18C9.1 18 10 18.9 10 20H14C14 18.9 14.9 18 16 18C17.1 18 18 18.9 18 20H19C20.66 20 22 18.66 22 17V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L18.58 6.01001C18.22 5.39001 17.56 5 16.84 5H15V12C15 13.1 14.1 14 13 14H12" stroke="#FC5353" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M8 22C9.10457 22 10 21.1046 10 20C10 18.8954 9.10457 18 8 18C6.89543 18 6 18.8954 6 20C6 21.1046 6.89543 22 8 22Z" stroke="#FC5353" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M16 22C17.1046 22 18 21.1046 18 20C18 18.8954 17.1046 18 16 18C14.8954 18 14 18.8954 14 20C14 21.1046 14.8954 22 16 22Z" stroke="#FC5353" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M22 12V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L22 12Z" stroke="#FC5353" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M2 8H8" stroke="#FC5353" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M2 11H6" stroke="#FC5353" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M2 14H4" stroke="#FC5353" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <FlexibleDiv width="fit-content" gap="8px" flexDir="column" alignItems="start">
              {/* Product Total Amount */}
              <Space>
                <h4 className="detail__info">Product Total Amount:</h4>
                <h4 className="detail__data">₦{order.totalForSeller?.toLocaleString()}</h4>
              </Space>
              {/* Delivery Fee*/}
              <Space>
                <h4 className="detail__info">Delivery Fee:</h4>
                <h4 className="detail__data">₦{order.deliveryFee?.toLocaleString()}</h4>
              </Space>
              {/* Total Amount */}
              <Space className='total__amount'>
                <h4 className="detail__info">Total Amount:</h4>
                <h4 className="detail__data">₦{order.totalAmount?.toLocaleString()}</h4>
              </Space>
            </FlexibleDiv>
          </FlexibleDiv>
        </FlexibleDiv>
      </OrderDetailsWrapper>
    </DashboardLayout>
  )
}
