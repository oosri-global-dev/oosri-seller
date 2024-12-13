import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "@/context";
import { handleFetchUser } from "@/network/user";
import { CURRENT_USER, NO_BUSINESS_MODAL } from "@/context/types";
import CustomLoader from "@/components/lib/CustomLoader";
import { getDataInCookie } from "@/data-helpers/auth-session";
import { useRouter } from "next/router";
import { isBusinessActive } from "@/utils/business-checker";

// Array of paths that should be excluded from redirection
const excludedPaths = [
  "/otp",
  "/register",
  "/login",
  "/forgot-password",
  "/check-email",
  "/create-business",
];

const AppWrapper = ({ children }) => {
  const {
    dispatch,
    state: { user },
  } = useContext(MainContext);
  const [pageLoading, setIsPageLoading] = useState(true);
  const { pathname, push } = useRouter();

  useEffect(() => {
    const userToken = getDataInCookie("access_token__seller");

    if (
      !userToken &&
      !excludedPaths.some((path) => pathname.startsWith(path))
    ) {
      push("/");
      setIsPageLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await handleFetchUser();
        dispatch({
          type: CURRENT_USER,
          payload: res?.data?.data,
        });

        // Check if the current path is in the excluded list
        const isExcludedPath = excludedPaths.some((path) =>
          pathname.startsWith(path)
        );

        if (pathname === "/" && !isExcludedPath) {
          push("/dashboard").then(() => {
            setIsPageLoading(false);
          });
          return;
        }
        setIsPageLoading(false);
      } catch (err) {
        // Only redirect to home if not on an excluded path
        if (
          !excludedPaths.some((path) => pathname.startsWith(path)) &&
          pathname !== "/"
        ) {
          window.location.href = "/";
        } else {
          setIsPageLoading(false);
        }
      }
    };

    fetchUser();
  }, [dispatch, pathname]);

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

  if (pageLoading) {
    return <CustomLoader />;
  }

  return children;
};

export default AppWrapper;
