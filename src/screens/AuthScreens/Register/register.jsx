import AuthLayout from "@/components/layouts/AuthLayout/auth-layout";
import { RegisterWrapper } from "./register.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import TextField from "@/components/lib/TextField";
import Button from "@/components/lib/Button";
import { Form } from "antd";
import TextFieldPassword from "@/components/lib/TextFieldPassword";
import useNotification from "@/hooks/useNotification";
import Select from "@/components/lib/Select";
import { BiImageAdd as AddImage } from "react-icons/bi";
import { useRouter } from "next/router";

export default function RegisterPage() {
  const [form] = Form.useForm();
  const [success, error] = useNotification();
  const {push} = useRouter()
  const businessType = [
    { value: "corporate", label: "Corporate" },
    { value: "personal", label: "Personal" },
  ];


  const handleSubmitLogin = (values) => {};

  return (
    <AuthLayout
      heroText="Join Our Marketplace as a Seller"
      subText="Unlock New Opportunities, Reach More Customers, and Grow Your Business with Us!"
    >
      <RegisterWrapper>
        <FlexibleDiv
          justifyContent="flex-start"
          alignItems="flex-start"
          flexDir="column"
          gap="5px"
        >
          <h1>Sign up</h1>
          <p className="sub__text">Empower Your Business, Join Us Today</p>
        </FlexibleDiv>

        <FlexibleDiv
          className="form__parent__wrapper"
          flexDir="column"
          width="100%"
          gap="40px"
        >
          <form
            form={form}
            onSubmit={handleSubmitLogin}
            className="login__form"
          >
            <FlexibleDiv
              justifyContent="space-between"
              flexWrap="nowrap"
              gap="15px"
              width="100%"
            >
              {/* first name */}
              <FlexibleDiv
                flexDir="column"
                alignItems="flex-start"
                width="100%"
                gap="5px"
                className="half__box"
              >
                <label>First Name</label>
                <Form.Item name={"firstName"}>
                  <TextField
                    name="fullName"
                    type="text"
                    maxLength={50}
                    required
                    bgColor="#FAFAFA"
                  />
                </Form.Item>
              </FlexibleDiv>
              {/* last name */}
              <FlexibleDiv
                flexDir="column"
                alignItems="flex-start"
                width="100%"
                gap="5px"
                className="half__box"
              >
                <label>Last Name</label>
                <Form.Item name={"lastName"}>
                  <TextField
                    name="lastName"
                    type="text"
                    maxLength={50}
                    required
                    bgColor="#FAFAFA"
                  />
                </Form.Item>
              </FlexibleDiv>
            </FlexibleDiv>

            <FlexibleDiv
              justifyContent="space-between"
              flexWrap="nowrap"
              gap="15px"
              width="100%"
            >
              {/* email */}
              <FlexibleDiv
                flexDir="column"
                alignItems="flex-start"
                width="100%"
                gap="5px"
                className="half__box"
              >
                <label>Email</label>
                <Form.Item name={"email"}>
                  <TextField
                    name="email"
                    type="email"
                    required
                    autoComplete="new-password"
                    bgColor="#FAFAFA"
                  />
                </Form.Item>
              </FlexibleDiv>
              {/* password */}
              <FlexibleDiv
                flexDir="column"
                alignItems="flex-start"
                width="100%"
                gap="5px"
                className="half__box"
              >
                <label>Password</label>
                <Form.Item name={"password"}>
                  <TextFieldPassword
                    name="password"
                    required
                    autoComplete="new-password"
                    bgColor="#FAFAFA"
                  />
                </Form.Item>
              </FlexibleDiv>
            </FlexibleDiv>

            <FlexibleDiv
              justifyContent="space-between"
              flexWrap="nowrap"
              gap="15px"
              width="100%"
            >
              {/* business type */}
              <FlexibleDiv
                flexDir="column"
                alignItems="flex-start"
                width="100%"
                gap="5px"
                className="half__box"
              >
                <label>Business Type</label>
                <Form.Item name={"firstName"}>
                  <Select
                    name="businessType"
                    options={businessType}
                    required
                    bgColor="#FAFAFA"
                    height="40px"
                  />
                </Form.Item>
              </FlexibleDiv>

              {/* phone */}
              <FlexibleDiv
                flexDir="column"
                alignItems="flex-start"
                width="100%"
                gap="5px"
                className="half__box"
              >
                <label>Mobile Number</label>
                <Form.Item name={"phoneNumber"}>
                  <TextField
                    name="text"
                    type="text"
                    required
                    max={14}
                    autoComplete="new-password"
                    bgColor="#FAFAFA"
                  />
                </Form.Item>
              </FlexibleDiv>
            </FlexibleDiv>

            <FlexibleDiv
              flexDir="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              {/* profile picture */}
              <FlexibleDiv
                flexDir="column"
                alignItems="flex-start"
                gap="5px"
                width="50%"
                className="half__box"
              >
                <label>Upload a profile picture</label>
                <FlexibleDiv
                  className="profile__picture"
                  flexDir="column"
                  gap="5px"
                >
                  <AddImage size={25} color="#8D98AA" />
                  <small>Upload your photo</small>
                </FlexibleDiv>
              </FlexibleDiv>
            </FlexibleDiv>

            <Button
              width="50%"
              radius="8px"
              color="var(--oosriWhite)"
              backgroundColor="var(--oosriPrimary)"
              className="submit__btn"
              htmlType="submit"
              onClick={() => {
                error("Please verify your email to continue");
              }}
            >
              Create Account
            </Button>
            <p className="already__acct">
              I have account already{" "}
              <span onClick={() => push("/")}>Login here</span>
            </p>
          </form>
        </FlexibleDiv>
      </RegisterWrapper>
    </AuthLayout>
  );
}
