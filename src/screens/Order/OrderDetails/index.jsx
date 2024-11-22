import DashboardLayout from '@/components/layouts/DashboardLayout/dashboard-layout'
import { Avatar, Space } from 'antd'
import React from 'react'
import { OrderDetailsWrapper } from './index.style'

export const OrderDetails = () => {
  return (
    <DashboardLayout title="Order Details">
        <OrderDetailsWrapper>
          <Space>
            <Avatar />
            <h5>Adebayo Ojo</h5>
            <p>Order Id: 00907450392</p>
          </Space>
        </OrderDetailsWrapper>
    </DashboardLayout>
  )
}
