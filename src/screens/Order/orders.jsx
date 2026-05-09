"use client"

import DashboardLayout from '@/components/layouts/DashboardLayout/dashboard-layout'
import { OrderWrapper } from './orders.styles'
import { FlexibleDiv } from '@/components/lib/Box/styles'
import CustomMultiSearchBar  from '@/components/lib/MultiSearchBar'
import Select from '@/components/lib/Select'
import { Table } from 'antd'
import { orderTableColumns, useOrderTableData } from '@/utils/order-helpers'

export default function OrderScreen (){
    const options=[
        { value: "This Year", label: "This Year" },
    ]
    const { dataSource, isLoading } = useOrderTableData();

  return (
     <DashboardLayout  title={"Order"}>
         <OrderWrapper>
          <FlexibleDiv className="flex justify-between mb-4"></FlexibleDiv>
            <FlexibleDiv className='top__section' justifyContent="space-between">
                <CustomMultiSearchBar width="max-content" onChange={() => {}} placeholder="Search by product name" />
                <Select  options={options} defaultValue="This Year"/>
            </FlexibleDiv>
            <div style={{overflow:"auto"}}>
              <Table 
              className='table__class'
              rowSelection={{
                  type: "checkbox",
                }}
                dataSource={dataSource}
                columns={orderTableColumns}
                loading={isLoading}
              />
            </div>
        </OrderWrapper> 
     </DashboardLayout>
  );
}