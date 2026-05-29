import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "@/context";
import { CURRENT_USER, NO_BUSINESS_MODAL } from "@/context/types";
import CustomLoader from "@/components/lib/CustomLoader";
import { getDataInCookie } from "@/data-helpers/auth-session";
import { useRouter } from "next/router";
import { isBusinessActive } from "@/utils/business-checker";
import { useUser } from "@/hooks/useUser";
import { acceptTerms } from "@/network/user";

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
  const { data: user, isLoading, isError, error, refetch } = useUser();
  const { pathname, push } = useRouter();
  const isExcludedPath = excludedPaths.some((path) => pathname.startsWith(path));
  const isPublicPath = isExcludedPath || pathname === "/";
  const [hasMounted, setHasMounted] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [termsAccepting, setTermsAccepting] = useState(false);

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

      // Block existing sellers who haven't agreed to current terms
      if (!user.agreedToTerms && !isExcludedPath) {
        setShowTermsModal(true);
        return;
      }

      // Force store setup for sellers who haven't set a store name yet
      if (!user.storeProfile?.storeName && !isExcludedPath) {
        push("/profile?setup=store");
      }
    }
  }, [user, dispatch, pathname, push, isExcludedPath]);

  const handleAcceptTerms = async () => {
    if (!termsChecked) return;
    setTermsAccepting(true);
    try {
      await acceptTerms();
      setShowTermsModal(false);
      refetch();
    } catch {
      // silently retry on next page load
    } finally {
      setTermsAccepting(false);
    }
  };

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

  if (showTermsModal) {
    return (
      <>
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)",
          zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center",
          padding: "20px",
        }}>
          <div style={{
            background: "#fff", borderRadius: "16px", maxWidth: "480px", width: "100%",
            padding: "40px 32px", boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "8px", color: "#111" }}>
              We've updated our policies
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#555", marginBottom: "24px", lineHeight: 1.6 }}>
              Before you continue, please review and accept our updated Terms of Use and Privacy Policy.
            </p>
            <div style={{ display: "flex", gap: "12px", marginBottom: "28px", background: "#fafafa", borderRadius: "10px", padding: "14px 16px" }}>
              <div style={{ fontSize: "1.4rem" }}>📄</div>
              <div>
                <a href="/terms" target="_blank" rel="noopener noreferrer"
                  style={{ display: "block", color: "#fc5353", fontWeight: 600, fontSize: "0.9rem", marginBottom: "6px" }}>
                  Terms of Use →
                </a>
                <a href="/privacy" target="_blank" rel="noopener noreferrer"
                  style={{ display: "block", color: "#fc5353", fontWeight: 600, fontSize: "0.9rem" }}>
                  Privacy Policy →
                </a>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "24px" }}>
              <input
                type="checkbox"
                id="terms-modal-agree"
                checked={termsChecked}
                onChange={(e) => setTermsChecked(e.target.checked)}
                style={{ marginTop: "3px", accentColor: "#fc5353", cursor: "pointer", flexShrink: 0 }}
              />
              <label htmlFor="terms-modal-agree" style={{ fontSize: "0.85rem", color: "#444", cursor: "pointer", lineHeight: 1.5 }}>
                I have read and agree to the Terms of Use and Privacy Policy
              </label>
            </div>
            <button
              onClick={handleAcceptTerms}
              disabled={!termsChecked || termsAccepting}
              style={{
                width: "100%", padding: "12px", borderRadius: "8px", border: "none",
                background: termsChecked ? "#fc5353" : "#e0e0e0",
                color: termsChecked ? "#fff" : "#999",
                fontSize: "0.95rem", fontWeight: 600, cursor: termsChecked ? "pointer" : "not-allowed",
                transition: "background 0.2s",
              }}
            >
              {termsAccepting ? "Saving..." : "Accept & Continue"}
            </button>
          </div>
        </div>
        {children}
      </>
    );
  }

  return children;
};

export default AppWrapper;
