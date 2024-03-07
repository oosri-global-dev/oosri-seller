import AuthLayout from "@/components/layouts/AuthLayout/auth-layout";
import { LoginWrapper } from "./login.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import TextField from "@/components/lib/TextField";
import Button from "@/components/lib/Button";
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import { Form } from "antd";
import TextFieldPassword from "@/components/lib/TextFieldPassword";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [form] = Form.useForm();
  const {push} = useRouter()


  const handleSubmitLogin = (values) => {};

  return (
    <AuthLayout
      heroText="Manage Your Business Effortlessly"
      subText="Streamline Operations, Maximize Sales"
    >
      <LoginWrapper>
        <h1>Login</h1>
        <p className="sub__text">
          Welcome back, Seller! Please log in to manage your online store.
        </p>

        <FlexibleDiv
          className="form__parent__wrapper"
          flexDir="column"
          width="42%"
          gap="40px"
        >
          <form
            form={form}
            onSubmit={handleSubmitLogin}
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
              <FlexibleDiv className="forgot__pass" flexDir="row" justifyContent="flex-end">
                <p>
                  Forgot password? <span onClick={()=>push('/forgot-password')}>Click here</span>
                </p>
              </FlexibleDiv>
            </FlexibleDiv>

            <Button
              width="100%"
              radius="8px"
              color="var(--oosriWhite)"
              backgroundColor="var(--oosriPrimary)"
              htmlType="submit"
            >
              Create Account
            </Button>
            <p className="already__acct">
              I have account already <span onClick={()=>push('/register')}>Register here</span>
            </p>
          </form>
        </FlexibleDiv>
      </LoginWrapper>
    </AuthLayout>
  );
}