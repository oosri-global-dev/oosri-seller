import { useState } from "react";
import { CreateProductPageWrapper } from "../Create/index.styles";
import { MobileTab } from "../Create/Tab/createTab";
import { TabletTab } from "../Create/Tab/tablet";
import { WatchesTab } from "../Create/Tab/watches";
import { Tabs } from "antd";

export default function EditProduct() {
      const [activeTab,setActiveTab]=useState("mobile")
    
      const items = [
        {
          key: "1",
          label: "Mobile Phone",
        },
        {
          key: "2",
          label: "Wristwatch",
        },
        {
          key: "3",
          label: "Tablet",
        },
        {
          key: "4",
          label: "Computer Accessories",
        },
      ];
    
    return(
        <CreateProductPageWrapper>
            <Tabs
            className="tabs__custom"
            defaultActiveKey="1"
            items={items}
            onChange={(e) => {
                if (e === "1") setActiveTab("mobile");
                else if (e === "2") setActiveTab("watches");
                else if(e === "3")setActiveTab("tablet");
                else if(e==="4")setActiveTab("accesories")
            }} />
            {activeTab === "mobile"?
            <MobileTab />:
            activeTab=="watches"?
            <WatchesTab />:
            activeTab=="tablet"?
            <TabletTab />:
            <div></div>
        }
        </CreateProductPageWrapper>
)}