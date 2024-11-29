import DashboardLayout from '@/components/layouts/DashboardLayout/dashboard-layout'
import React from 'react'
import { OrderWrapper } from './orders.styles'
import { FlexibleDiv } from '@/components/lib/Box/styles'
import CustomMultiSearchBar  from '@/components/lib/MultiSearchBar'
import Select from '@/components/lib/Select'
import { Table } from 'antd'
import { orderTableColumns, orderTableData } from '@/utils/order-helpers'

export default function OrderScreen(){
    const options=[
        { value: "This Year", label: "This Year" },
    ]

  return (
    <DashboardLayout title="Order">
        <OrderWrapper>
            <FlexibleDiv className='top__section' justifyContent="space-between">
                <CustomMultiSearchBar width="max-content" onChange={(e)=>console.log(e.target.value)} placeholder="Search by product name" />
                <Select  options={options} defaultValue="This Year"/>
            </FlexibleDiv>
            <Table 
            className='table__class'
             rowSelection={{
                type: "checkbox",
              }}
              dataSource={orderTableData}
              columns={orderTableColumns}
            />
        </OrderWrapper>
    </DashboardLayout>
  )
};