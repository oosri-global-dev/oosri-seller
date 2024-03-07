import { FlexibleDiv } from "@/components/lib/Box/styles";
import { CheckEmailWrapper } from "./check-email.styles";
import { GoLock as LockIcon } from "react-icons/go";
import { Form } from "antd";
import TextField from "@/components/lib/TextField";
import Button from "@/components/lib/Button";
import AuthLayout from "@/components/layouts/AuthLayout/auth-layout";

export default function CheckEmail() {
  const [form] = Form.useForm();

  const handleChange = (e) => {
    const { maxLength, value, name } = e.target;
    const [fieldName, fieldIndex] = name.split("-");

    let fieldIntIndex = parseInt(fieldIndex, 10);

    // Check if no of char in field == maxlength
    if (value.length >= maxLength) {
      // It should not be last input field
      if (fieldIntIndex < 4) {
        // Get the next input field using it's name
        const nextfield = document.querySelector(
          `input[name=box-${fieldIntIndex + 1}]`
        );

        // If found, focus the next field
        if (nextfield !== null) {
          nextfield.focus();
        }
      }
    }
  };

  const handleSubmit = async (values) => {
    console.log("values", values);
  };

  return (
    <AuthLayout
      heroText="Manage Your Business Effortlessly"
      subText="Streamline Operations, Maximize Sales"
    >
      <CheckEmailWrapper>
        <FlexibleDiv className="lock__icon__wrapper">
          <LockIcon size={40} color="var(--oosriPrimary)" />
        </FlexibleDiv>
        <FlexibleDiv
          alignItems="center"
          justifyContent="center"
          flexDir="column"
        >
          <h2>Check Email</h2>
          <p className="header__sub__text">
            We’ve sent a code to erzzyseun@gmail.com
          </p>
        </FlexibleDiv>
        <Form form={form} onFinish={handleSubmit}>
          <FlexibleDiv
            alignItems="flex-start"
            justifyContent="space-between"
            flexDir="row"
            flexWrap="nowrap"
            gap="20px"
          >
            <Form.Item name="box1">
              <TextField
                className="single__box"
                type="text"
                name="box-1"
                borderRadius="10px"
                maxLength={1}
                required
                autoComplete="off"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item name="box2">
              <TextField
                className="single__box"
                type="text"
                name="box-2"
                borderRadius="10px"
                maxLength={1}
                required
                autoComplete="off"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item name="box3">
              <TextField
                className="single__box"
                type="text"
                name="box-3"
                borderRadius="10px"
                maxLength={1}
                required
                autoComplete="off"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item name="box4">
              <TextField
                className="single__box"
                type="text"
                name="box-4"
                borderRadius="10px"
                maxLength={1}
                required
                autoComplete="off"
                onChange={handleChange}
              />
            </Form.Item>
          </FlexibleDiv>
          <p className="header__sub__text resend__text">
            Didn’t get a code? <span>Click to resend</span>
          </p>

          <Button
            width="100%"
            backgroundColor="var(--oosriPrimary)"
            type="submit"
            htmlType="submit"
            color="var(--oosriWhite)"
            radius="10px"
            margin="15px 0 0 0"
          >
            Send
          </Button>
        </Form>
      </CheckEmailWrapper>
    </AuthLayout>
  );
}
