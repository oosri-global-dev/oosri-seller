import AuthLayout from "@/components/layouts/AuthLayout/auth-layout";
import { LoginWrapper } from "./login.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import TextField from "@/components/lib/TextField";
import Button from "@/components/lib/Button";
import { Form } from "antd";
import TextFieldPassword from "@/components/lib/TextFieldPassword";
import { useRouter } from "next/router";
import { handleLogin } from "@/network/user";
import useNotification from "@/hooks/useNotification";
import { useContext, useState } from "react";
import CustomLoader from "@/components/lib/CustomLoader";
import { MainContext, useMainContext } from "@/context";
import { CURRENT_USER } from "@/context/types";
import { storeDataInCookie } from "@/data-helpers/auth-session";
import { IoStorefrontOutline } from "react-icons/io5";

export default function LoginPage() {
  const [form] = Form.useForm();
  const { push } = useRouter();
  const [success, error] = useNotification();
  const [btnLoading, setBtnLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const { dispatch } = useContext(MainContext);

  const handleSubmitLogin = async (values) => {
    setBtnLoading(true);
    try {
      const res = await handleLogin(values);

      setPageLoading(true);

      if (res?.status === 200) {
        await dispatch({
          type: CURRENT_USER,
          payload: {
            ...res?.data?.data,
          },
        });

        storeDataInCookie("access_token__seller", res?.data?.token, 1);
        if (res?.data?.refreshToken) {
          storeDataInCookie("refresh_token__seller", res?.data?.refreshToken, 30);
        }

        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      }
    } catch (err) {
      setBtnLoading(false);
      error(err?.response?.data?.message);
    }
  };

  return (
    <AuthLayout
      heroText="Manage Your Business Effortlessly"
      subText="Streamline Operations, Maximize Sales"
    >
      {pageLoading && <CustomLoader />}
      <LoginWrapper>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ display: "block", width: 32, height: 2, background: "var(--oosriPrimary)", flexShrink: 0, borderRadius: 2 }} />
          <IoStorefrontOutline size={14} color="var(--oosriPrimary)" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: "0.68rem", fontWeight: 800, color: "var(--oosriPrimary)", letterSpacing: "0.16em", textTransform: "uppercase" }}>Seller Portal</span>
        </div>
        <h1 className="header__text">Welcome Back</h1>
        <p className="sub__text">
          Log in to your seller account to manage your store, orders, and products.
        </p>

        <FlexibleDiv
          className="form__parent__wrapper"
          flexDir="column"
          width="100%"
          gap="40px"
        >
          <Form
            form={form}
            onFinish={handleSubmitLogin}
            className="login__form"
          >
            <FlexibleDiv
              flexDir="column"
              alignItems="flex-start"
              width="100%"
              gap="5px"
            >
              <label>Email</label>
              <Form.Item name={"email"}>
                <TextField
                  type="email"
                  name="email"
                  required
                  bgColor="#FAFAFA"
                />
              </Form.Item>
            </FlexibleDiv>
            <FlexibleDiv
              flexDir="column"
              alignItems="flex-start"
              width="100%"
              gap="5px"
            >
              <label>Password</label>
              <Form.Item name={"password"}>
                <TextFieldPassword
                  autoComplete="new-password"
                  name="password"
                  required
                  bgColor="#FAFAFA"
                />
              </Form.Item>
              <FlexibleDiv
                className="forgot__pass"
                flexDir="row"
                justifyContent="flex-end"
              >
                <p>
                  Forgot password?{" "}
                  <span onClick={() => push("/forgot-password")}>
                    Click here
                  </span>
                </p>
              </FlexibleDiv>
            </FlexibleDiv>

            <Button
              width="100%"
              radius="8px"
              color="var(--oosriWhite)"
              loading={btnLoading}
              backgroundColor="var(--oosriPrimary)"
              htmlType="submit"
            >
              Login
            </Button>

            {/* Fixed text */}
            <p className="already__acct">
              No account yet?{" "}
              <span onClick={() => push("/register")}>Register here</span>
            </p>
          </Form>
        </FlexibleDiv>
      </LoginWrapper>
    </AuthLayout>
  );
}