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
];

const AppWrapper = ({ children }) => {
  const { dispatch } = useContext(MainContext);
  const { data: user, isLoading, isError, error } = useUser();
  const { pathname, push } = useRouter();
  const isExcludedPath = excludedPaths.some((path) => pathname.startsWith(path));

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const userToken = isMounted ? getDataInCookie("access_token__seller") : null;

  useEffect(() => {
    if (user) {
      dispatch({
        type: CURRENT_USER,
        payload: user,
      });

      // Redirect from home to dashboard if user is logged in
      if (pathname === "/") {
        push("/dashboard");
      }
    }
  }, [user, dispatch, pathname, push]);

  useEffect(() => {
    if (!userToken && !isExcludedPath && pathname !== "/") {
      push("/");
    }

    if (isError && !isExcludedPath && pathname !== "/") {
      console.error("Auth error:", error);
      push("/");
    }
  }, [error, isError, isExcludedPath, pathname, push, userToken]);

  useEffect(() => {
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
  }, [user]);

  if (isLoading && isMounted && userToken) {
    return <CustomLoader />;
  }

  if ((!userToken || isError) && !isExcludedPath && pathname !== "/") {
    return <CustomLoader />;
  }



  return children;
};

export default AppWrapper;
