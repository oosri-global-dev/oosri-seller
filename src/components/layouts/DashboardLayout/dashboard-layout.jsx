import { DBWrapper } from "./dashboard-layout.styles";
import React, { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { Layout, Menu, theme } from "antd";
import { DashboardOutlined } from "@ant-design/icons";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { CiSearch as SearchIcon } from "react-icons/ci";
import { HiOutlineBellAlert as NotificationIcon } from "react-icons/hi2";
import ProfileImage from "@/assets/images/profile.jpg";
import { IoMdLogOut as LogoutIcon } from "react-icons/io";
import { HiOutlineShoppingBag as ProductIcon } from "react-icons/hi2";
import { MdPayments as PaymentIcon } from "react-icons/md";
import { VscGraph as GraphIcon } from "react-icons/vsc";
import { BsPeopleFill } from "react-icons/bs";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import Button from "@/components/lib/Button";
import { FaWindowClose as CloseIcon } from "react-icons/fa";
import { GoStack as StackIcon } from "react-icons/go";
const { Header, Sider, Content } = Layout;
import { BsArrowLeft as LeftArrow } from "react-icons/bs";
import { MainContext } from "@/context";
import { isEmpty } from "lodash";
import BlockerModal from "@/components/lib/NoBusinessModal";
import { NO_BUSINESS_MODAL } from "@/context/types";
import { deleteDataInCookie } from "@/data-helpers/auth-session";
import Image from "next/image";

const MENU_ITEMS_CONFIG = [
  { key: "/dashboard", icon: <DashboardOutlined />, label: "Dashboard", href: "/dashboard" },
  { key: "/products", icon: <StackIcon />, label: "Products", href: "/products" },
  { key: "/order", icon: <ProductIcon />, label: "Order", href: "/order" },
  { key: "/sales-analytics", icon: <GraphIcon />, label: "Sales Analytics", href: "#" }, { key: "/profile", icon: <BsPeopleFill />, label: "Profile", href: "#" },
  {
    key: "/profile",
    icon: <BsPeopleFill />,
    label: "Profile",
    onClick: ({ item, key }) => {
      push("/sellers-profile-page");
    },
  },
  { key: "/", icon: <LogoutIcon />, label: "Logout", isLogout: true },
];

export default function DashboardLayout({
  children,
  title,
  showBackBtn,
  titleSubText,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { push, pathname, back } = useRouter();

  const currentKey = useMemo(() => {
    if (pathname === "/" || pathname === "") return "/dashboard";
    if (pathname.includes("/product")) return "/products";
    if (pathname.includes("/order")) return "/order";
    return pathname;
  }, [pathname]);

  const {
    dispatch,
    state: { user, showNoBusinessModal },
  } = useContext(MainContext);

  const menuItems = useMemo(() => MENU_ITEMS_CONFIG.map(item => ({
    ...item,
    onClick: item.isLogout
      ? () => {
        deleteDataInCookie("access_token__seller");
        window.location.href = "/";
      }
      : () => push(item.href)
  })), [push]);

  const handleUserBusinessCheck = useCallback(() => {
    if (user?.businessType === "Personal") {
      if (isEmpty(user?.personalBusinessAccount)) {
        push("/create-business");
      }
    } else if (user?.businessType === "Corporate") {
      if (isEmpty(user?.corporateBusinessAccount)) {
        push("/create-business");
      }
    }
  }, [user, push]);

  return (
    <DBWrapper openMenu={collapsed}>
      <BlockerModal
        visible={showNoBusinessModal}
        onCreateProfile={handleUserBusinessCheck}
        onClose={() => {
          dispatch({
            type: NO_BUSINESS_MODAL,
            payload: false,
          });
        }}
      />
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
            selectedKeys={[currentKey]}
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
                {showBackBtn && <LeftArrow size={24} onClick={() => back()} style={{ cursor: "pointer" }} />}
                <FlexibleDiv flexDir="column" className="welcome__box">
                  <p className="dashboard__text">{title || "Dashboard"}</p>
                  <div className="sub__text">
                    {!title && `Welcome, ${user?.firstName} ${user?.lastName}!`}
                    {titleSubText}
                  </div>
                </FlexibleDiv>
              </FlexibleDiv>

              <FlexibleDiv className="header__navigations" gap="15px">
                <SearchIcon size={25} color="#9E9E9E" />
                <NotificationIcon size={25} color="#9E9E9E" />
                <FlexibleDiv
                  width="fit-content"
                  gap="8px"
                  className="profile__nav"
                >
                  <div className="profile__image__wrapper" style={{ position: 'relative', width: '45px', height: '45px', borderRadius: '50%', overflow: 'hidden' }}>
                    <Image
                      src={user?.profilePicture || ProfileImage.src}
                      alt="profile"
                      fill
                      style={{ objectFit: 'cover' }}
                      priority
                    />
                  </div>
                  <div>
                    {user?.firstName && (
                      <h4>
                        {`${user?.firstName || ""} ${user?.lastName[0] || ""}`}.
                      </h4>
                    )}

                    <p>Seller</p>
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
    </DBWrapper >
  );
}
