import DashboardLayout from '@/components/layouts/DashboardLayout/dashboard-layout'
import React from 'react'
import { OrderWrapper } from './index,styles'
import { FlexibleDiv } from '@/components/lib/Box/styles'
import { CustomMultiSearchBar } from '@/components/lib/MultiSearchBar'
import Select from '@/components/lib/Select'
import { Table } from 'antd'
import { orderTableColumns, orderTableData } from '@/utils/order-helpers'

export const Order = () => {
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
             rowSelection={{
                type: "checkbox",
              }}
              dataSource={orderTableData}
              columns={orderTableColumns}
            />
        </OrderWrapper>
    </DashboardLayout>
  )
}
