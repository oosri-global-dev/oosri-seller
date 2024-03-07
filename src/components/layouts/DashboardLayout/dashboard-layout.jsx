import { DBWrapper } from "./dashboard-layout.styles";
import React, { useState } from "react";
import { Layout, Menu, theme } from "antd";
import { DashboardOutlined } from "@ant-design/icons";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { CiSearch as SearchIcon } from "react-icons/ci";
import { HiOutlineBellAlert as NotificationIcon } from "react-icons/hi2";
import ProfileImage from "@/assets/images/profile.jpg";
import { HiOutlineUsers as UserIcon } from "react-icons/hi2";
import { HiOutlineShoppingBag as ProductIcon } from "react-icons/hi2";
import { MdPayments as PaymentIcon } from "react-icons/md";
import { VscGraph as GraphIcon } from "react-icons/vsc";
import { IoSettingsOutline as SettingsIcon } from "react-icons/io5";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import Button from "@/components/lib/Button";
import { FaWindowClose as CloseIcon } from "react-icons/fa";
import { GoStack as StackIcon } from "react-icons/go";
const { Header, Sider, Content } = Layout;
import { BsArrowLeft as LeftArrow } from "react-icons/bs";

export default function DashboardLayout({ children, title, showBackBtn }) {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { push, pathname, back } = useRouter();
  const [current, setCurrent] = useState(
    pathname === "/" || pathname === "" ? "/dashboard" : pathname
  );

  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => {
        push("/dashboard");
      },
    },
    {
      key: "/products",
      icon: <StackIcon />,
      label: "Products",
      onClick: () => {
        push("/products");
      },
    },
    {
      key: "/sellers",
      icon: <UserIcon />,
      label: "Sellers",
      onClick: () => {
        push("/sellers");
      },
    },
    {
      key: "/order-history",
      icon: <ProductIcon />,
      label: "Order History",
      onClick: ({ item, key }) => {},
    },
    {
      key: "/payments",
      icon: <PaymentIcon />,
      label: "Payments",
      onClick: ({ item, key }) => {},
    },
    {
      key: "/sales-analytics",
      icon: <GraphIcon />,
      label: "Sales Analytics",
      onClick: ({ item, key }) => {},
    },
    {
      key: "/setings",
      icon: <SettingsIcon />,
      label: "Settings",
    },
  ];

  return (
    <DBWrapper openMenu={collapsed}>
      <Layout className="layout__box">
        <Sider
          trigger={null}
          collapsible
          collapsed={false}
          className="sidebar__box"
        >
          <CloseIcon
            size={22}
            color="var(--oosriPrimary)"
            className="close__icon"
            onClick={() => setCollapsed(true)}
          />
          <Menu
            theme="light"
            mode="inline"
            className="menu__wrapper"
            items={menuItems}
            onClick={(e) => setCurrent(e.key)}
            selectedKeys={[current]}
          />
        </Sider>
        <Layout className="content__layout__wrapper">
          <Header className="header__box">
            <FlexibleDiv
              flexDir="row"
              justifyContent="space-between"
              className="header__auth__box"
            >
              <Button
                type="text"
                className="menu__btn"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
              />
              <FlexibleDiv
                flexDir="row"
                flexWrap="nowrap"
                width="fit-content"
                gap="15px"
              >
                {showBackBtn && <LeftArrow size={24} onClick={() => back()} />}
                <FlexibleDiv flexDir="column" className="welcome__box">
                  <p className="dashboard__text">{title || "Dashboard"}</p>
                  <p className="sub__text">
                    {!title && "Welcome, Ayebulu Eric!"}
                  </p>
                </FlexibleDiv>
              </FlexibleDiv>

              <FlexibleDiv className="header__navigations">
                <SearchIcon size={25} color="#9E9E9E" />
                <NotificationIcon size={25} color="#9E9E9E" />
                <FlexibleDiv
                  width="fit-content"
                  gap="8px"
                  className="profile__nav"
                >
                  <img
                    className="profile__image"
                    src={ProfileImage.src}
                    alt="show-img"
                  />
                  <div>
                    <h4>Ayebulu E.</h4>
                    <p>Admin</p>
                  </div>
                </FlexibleDiv>
              </FlexibleDiv>
            </FlexibleDiv>
          </Header>
          <Content
            className="layout__content__wrapper"
            style={{
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </DBWrapper>
  );
}
