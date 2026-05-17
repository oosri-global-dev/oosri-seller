import React, { useContext, useState, useMemo, useCallback } from "react";
import { DBWrapper } from "./dashboard-layout.styles";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { MainContext } from "@/context";
import BlockerModal from "@/components/lib/NoBusinessModal";
import { NO_BUSINESS_MODAL } from "@/context/types";
import { deleteDataInCookie } from "@/data-helpers/auth-session";
import { isEmpty } from "lodash";
import Button from "@/components/lib/Button";
import ProfileImage from "@/assets/images/profile.jpg";
import Logo from "@/assets/images/logo.png";
import { Popover, Badge } from "antd";
import { useSellerNotifications } from "@/hooks/useSellerNotifications";
import NotificationPanel from "@/components/lib/NotificationPanel";

import { DashboardOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { GoStack as ProductsIcon } from "react-icons/go";
import { HiOutlineShoppingBag as OrdersIcon, HiOutlineBellAlert as NotificationIcon } from "react-icons/hi2";
import { VscGraph as AnalyticsIcon } from "react-icons/vsc";
import { BsPeopleFill as ProfileIcon, BsArrowLeft as BackIcon, BsHandshake as NegotiationIcon } from "react-icons/bs";
import { IoMdLogOut as LogoutIcon } from "react-icons/io";
import { FiPlus as AddIcon, FiMenu as HamburgerIcon, FiX as CloseIcon } from "react-icons/fi";
import { MdVerifiedUser as KycIcon } from "react-icons/md";

const MAIN_NAV = [
  { key: "/dashboard",      icon: DashboardOutlined, label: "Dashboard",    href: "/dashboard",      isAntd: true },
  { key: "/products",       icon: ProductsIcon,      label: "Products",     href: "/products" },
  { key: "/order",          icon: OrdersIcon,        label: "Orders",       href: "/order" },
  { key: "/negotiations",   icon: NegotiationIcon,   label: "Negotiations", href: "/negotiations" },
  { key: "/sales-analytics", icon: AnalyticsIcon,   label: "Analytics",    href: "/sales-analytics" },
];

const ACCOUNT_NAV = [
  { key: "/profile", icon: ProfileIcon, label: "Profile",      href: "/sellers-profile-page" },
  { key: "/kyc",     icon: KycIcon,     label: "Verification", href: "/kyc" },
];

export default function DashboardLayout({ children, title, showBackBtn, titleSubText }) {
  const [collapsed, setCollapsed]     = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [notifOpen, setNotifOpen]     = useState(false);

  const { notifications, unreadCount, isLoading, markRead, markAllRead, remove } = useSellerNotifications();
  const { push, pathname, back }      = useRouter();

  const { dispatch, state: { user, showNoBusinessModal } } = useContext(MainContext);

  const currentKey = useMemo(() => {
    if (pathname === "/" || pathname === "") return "/dashboard";
    if (pathname.includes("/product")) return "/products";
    if (pathname.includes("/order"))   return "/order";
    if (pathname.includes("/sales") || pathname.includes("/analytics")) return "/sales-analytics";
    if (pathname.includes("/profile") || pathname.includes("/sellers-profile")) return "/profile";
    if (pathname.includes("/kyc")) return "/kyc";
    return pathname;
  }, [pathname]);

  const handleLogout = useCallback(() => {
    deleteDataInCookie("access_token__seller");
    window.location.href = "/";
  }, []);

  const handleUserBusinessCheck = useCallback(() => {
    if (user?.businessType === "Personal") {
      if (isEmpty(user?.personalBusinessAccount)) push("/create-business");
    } else if (user?.businessType === "Corporate") {
      if (isEmpty(user?.corporateBusinessAccount)) push("/create-business");
    }
  }, [user, push]);

  const pageTitle = title || "Dashboard";

  const renderNavItem = ({ key, icon: Icon, label, href, isAntd }) => {
    const isActive = currentKey === key;
    return (
      <Link
        key={key}
        href={href}
        className={`nav__item${isActive ? " active" : ""}`}
        title={collapsed ? label : undefined}
        onClick={() => setMobileOpen(false)}
      >
        <span className="nav__icon">
          {isAntd ? <Icon style={{ fontSize: 17 }} /> : <Icon size={17} />}
        </span>
        <span className="nav__label">{label}</span>
      </Link>
    );
  };

  return (
    <DBWrapper $collapsed={collapsed} $mobileOpen={mobileOpen}>
      <BlockerModal
        visible={showNoBusinessModal}
        onCreateProfile={handleUserBusinessCheck}
        onClose={() => dispatch({ type: NO_BUSINESS_MODAL, payload: false })}
      />

      <div className="sidebar__overlay" onClick={() => setMobileOpen(false)} />

      {/* ── Sidebar ── */}
      <aside className="sidebar">

        {/* Logo + collapse / mobile close */}
        <div className="sidebar__logo">
          <Link href="/dashboard" className="logo__link">
            <Image src={Logo} alt="Oosri" width={90} height={30} style={{ objectFit: "contain" }} />
          </Link>
          {/* Desktop: collapse/expand */}
          <button
            className="collapse__btn"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <MenuUnfoldOutlined style={{ fontSize: 16 }} /> : <MenuFoldOutlined style={{ fontSize: 16 }} />}
          </button>
          {/* Mobile: close drawer */}
          <button
            className="mobile__close__btn"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar__nav">
          <div className="nav__group">
            <span className="nav__group__label">Main</span>
            {MAIN_NAV.map(renderNavItem)}
          </div>
          <div className="nav__group">
            <span className="nav__group__label">Account</span>
            {ACCOUNT_NAV.map(renderNavItem)}
          </div>
        </nav>

        {/* User info + logout */}
        <div className="sidebar__footer">
          <div className="sidebar__user">
            <div className="user__avatar">
              <Image
                src={user?.profilePicture || ProfileImage.src}
                alt="profile"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="user__info">
              <p className="user__name">
                {user?.firstName} {user?.lastName?.[0] || ""}.
              </p>
              <span className="user__role">Seller</span>
            </div>
          </div>

          <button
            className="logout__btn"
            onClick={handleLogout}
            title={collapsed ? "Logout" : undefined}
          >
            <LogoutIcon size={17} />
            <span className="nav__label">Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Main Area ── */}
      <div className="main__area">

        {/* Header */}
        <header className="top__header">
          <div className="header__left">
            <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
              <HamburgerIcon size={20} />
            </button>

            <div className="page__title__wrap">
              {showBackBtn && (
                <button className="back__btn" onClick={back}>
                  <BackIcon size={15} />
                </button>
              )}
              <div>
                <h1 className="page__title">{pageTitle}</h1>
                {titleSubText && <p className="page__sub">{titleSubText}</p>}
              </div>
            </div>
          </div>

          <div className="header__right">
            <Popover
              open={notifOpen}
              onOpenChange={setNotifOpen}
              trigger="click"
              placement="bottomRight"
              arrow={false}
              content={
                <NotificationPanel
                  notifications={notifications}
                  unreadCount={unreadCount}
                  isLoading={isLoading}
                  onRead={(id) => { markRead(id); }}
                  onMarkAllRead={() => { markAllRead(); }}
                  onDelete={(id) => { remove(id); }}
                />
              }
            >
              <div className="notif__wrap">
                <Badge count={unreadCount} size="small" color="#ef4444">
                  <button className="notif__btn" aria-label="Notifications">
                    <NotificationIcon size={19} />
                  </button>
                </Badge>
              </div>
            </Popover>

            <Link href="/product/create" className="add__product__link">
              <Button
                backgroundColor="var(--oosriPrimary)"
                color="#fff"
                height="36px"
                radius="8px"
                fontSize="0.82rem"
                padding="0 14px"
                hoverBg="#e04040"
              >
                <AddIcon size={13} style={{ marginRight: 5, verticalAlign: "middle" }} />
                Add Product
              </Button>
            </Link>

            <div className="profile__wrap">
              <div className="profile__avatar__wrap">
                <Image
                  src={user?.profilePicture || ProfileImage.src}
                  alt="profile"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="profile__details">
                {user?.firstName && (
                  <p className="profile__name">
                    {user.firstName} {user.lastName?.[0] || ""}.
                  </p>
                )}
                <span className="profile__role">Seller</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="content__area">
          {children}
        </main>

        {/* Footer */}
        <footer className="dashboard__footer">
          <p>© {new Date().getFullYear()} Oosri Global. All rights reserved.</p>
          <div className="footer__links">
            <a href="#">Help & Support</a>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
          </div>
        </footer>

      </div>
    </DBWrapper>
  );
}
