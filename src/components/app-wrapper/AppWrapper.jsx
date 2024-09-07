import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "@/context";
import { handleFetchUser } from "@/network/user";
import { CURRENT_USER, NO_BUSINESS_MODAL } from "@/context/types";
import CustomLoader from "@/components/lib/CustomLoader";
import { getDataInCookie } from "@/data-helpers/auth-session";
import { useRouter } from "next/router";
import { isBusinessActive } from "@/utils/business-checker";

const AppWrapper = ({ children }) => {
  const { dispatch } = useContext(MainContext);
  const [pageLoading, setIsPageLoading] = useState(true);
  const { pathname, push } = useRouter();

  useEffect(() => {
    const userToken = getDataInCookie("access_token");

    if (!userToken) {
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
        if (pathname === "/") {
          push("/dashboard").then(() => {
            setIsPageLoading(false);
          });
          return;
        }
        setIsPageLoading(false);
      } catch (err) {
        window.location.href = "/";
      }
    };

    fetchUser();
  }, [dispatch]);

  useEffect(() => {
    // Function to check business status
    const checkBusinessStatus = () => {
      if (!isBusinessActive()) {
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
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  if (pageLoading) {
    return <CustomLoader />;
  }

  return children;
};

export default AppWrapper;
