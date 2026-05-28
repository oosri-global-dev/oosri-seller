import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "@/context";
import { CURRENT_USER, NO_BUSINESS_MODAL } from "@/context/types";
import CustomLoader from "@/components/lib/CustomLoader";
import { getDataInCookie } from "@/data-helpers/auth-session";
import { useRouter } from "next/router";
import { isBusinessActive } from "@/utils/business-checker";
import { useUser } from "@/hooks/useUser";

const excludedPaths = [
  "/otp",
  "/register",
  "/login",
  "/forgot-password",
  "/check-email",
  "/create-business",
  "/profile",
];

const AppWrapper = ({ children }) => {
  const { dispatch } = useContext(MainContext);
  const { data: user, isLoading, isError, error } = useUser();
  const { pathname, push } = useRouter();
  const isExcludedPath = excludedPaths.some((path) => pathname.startsWith(path));
  const isPublicPath = isExcludedPath || pathname === "/";
  const [hasMounted, setHasMounted] = useState(false);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    setHasMounted(true);
    setUserToken(getDataInCookie("access_token__seller"));
  }, []);

  useEffect(() => {
    if (user) {
      dispatch({
        type: CURRENT_USER,
        payload: user,
      });

      // Redirect from home to dashboard if user is logged in
      if (pathname === "/") {
        push("/dashboard");
        return;
      }

      // Force store setup for sellers who haven't set a store name yet
      if (!user.storeProfile?.storeName && !isExcludedPath) {
        push("/profile?setup=store");
      }
    }
  }, [user, dispatch, pathname, push, isExcludedPath]);

  useEffect(() => {
    if (!hasMounted) {
      return;
    }

    if (!userToken && !isExcludedPath && pathname !== "/") {
      push("/");
    }

    if (isError && !isExcludedPath && pathname !== "/") {
      console.error("Auth error:", error);
      push("/");
    }
  }, [error, hasMounted, isError, isExcludedPath, pathname, push, userToken]);

  useEffect(() => {
    if (!user) {
      return undefined;
    }

    // Function to check business status
    const checkBusinessStatus = () => {
      if (!isBusinessActive(user)) {
        dispatch({
          type: NO_BUSINESS_MODAL,
          payload: true,
        });
      }
    };

    // Initial check
    checkBusinessStatus();

    // Set up interval to check every 5 minutes
    const intervalId = setInterval(checkBusinessStatus, 5 * 60 * 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [dispatch, user]);

  // Keep the initial server render and first client render identical
  // for protected routes to avoid hydration mismatches.
  if (!hasMounted) {
    return isPublicPath ? children : <CustomLoader />;
  }

  if (isPublicPath) {
    return children;
  }

  if (!userToken || isLoading || isError) {
    return <CustomLoader />;
  }

  return children;
};

export default AppWrapper;
