import DashboardLayout from '@/components/layouts/DashboardLayout/dashboard-layout'
import { Tabs } from 'antd';
import React, { useState } from 'react'
import { TopMenuWrapper } from '../Products/AllProducts/all-products.styles';

export const ProfilePage = () => {
  const [activeTab, setActiveTab]=useState("")
  const menuitems = [
    {
      key: "1",
      label: "Products",
    },
    {
      key: "2",
      label: "Pending Products",
    },
  ];
  return (
    <DashboardLayout title={"My Profile"} >
       <TopMenuWrapper>
          <Tabs
            className="tabs__custom"
            defaultActiveKey="1"
            items={menuitems}
            onChange={(e) =>
              e.label === activeTab && setActiveTab(e.label)
            }
          />
       </TopMenuWrapper>
    </DashboardLayout>
  )
}
