import { DBWrapper } from "./dashboard-layout.styles";
import React, { useContext, useEffect, useState } from "react";
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
import { MainContext } from "@/context";
import { handleFetchUser } from "@/network/user";
import CustomLoader from "@/components/lib/CustomLoader";
import { CURRENT_USER } from "@/context/types";

export default function DashboardLayout({ children, title, showBackBtn }) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { push, pathname, back } = useRouter();
  const [pageLoading, setIsPageLoading] = useState(false);
  const [current, setCurrent] = useState(
    pathname === "/" || pathname === "" ? "/dashboard" : pathname
  );
  const {
    dispatch,
    state: { user },
  } = useContext(MainContext);

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

  useEffect(() => {
    setIsPageLoading(true);
    const GetActiveUser = async () => {
      const res = await handleFetchUser();

      //store data in dispatch
      await dispatch({
        type: CURRENT_USER,
        payload: {
          ...res?.data?.data,
        },
      });

      //check if businesses exist
      if (res?.data?.data?.businesses?.length < 1) {
        //redirect back
        window.location.href = "/create-business";
      } else {
        //disable the page load
        setIsPageLoading(false);
      }
    };

    //log user out if api throws err
    try {
      GetActiveUser();
    } catch (err) {
      //if API throws error
      window.location.href = "/";
    }
  }, [dispatch]);

  console.log(user);

  return (
    <DBWrapper openMenu={collapsed}>
      {pageLoading && typeof user !== "undefined" && <CustomLoader />}
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
                    {!title &&
                      `Welcome, ${user?.first_name} ${user?.last_name}!`}
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
                    src={user?.profile_photo || ProfileImage.src}
                    alt="show-img"
                  />
                  <div>
                    {user?.first_name && (
                      <h4>
                        {`${user?.first_name || ""} ${
                          user?.last_name[0] || ""
                        }`}
                        .
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
    </DBWrapper>
  );
}
