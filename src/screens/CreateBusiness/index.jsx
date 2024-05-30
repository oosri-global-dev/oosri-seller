import { FlexibleDiv } from "@/components/lib/Box/styles";
import { CreateBusinessWrapper } from "./index.styles";
import { Form } from "antd";
import TextField from "@/components/lib/TextField";

export default function CreateBusiness() {
  const [form] = Form.useForm();

  const handleCreateBusiness = (values) => {
    console.log(values);
  };
  return (
    <CreateBusinessWrapper>
      <FlexibleDiv className="header__section" flexDir="column" gap="3px">
        <h1>Create Business</h1>
        <span>Empower Your Business, Join Us Today</span>
      </FlexibleDiv>
      <Form
        form={form}
        onFinish={handleCreateBusiness}
        className="form__wrapper"
      >
        <FlexibleDiv flexDir="row" justifyContent="space-between" width="100%">
          {/* business name */}
          <FlexibleDiv
            flexDir="column"
            alignItems="flex-start"
            gap="5px"
            className="single__input__box"
          >
            <label>Business Name</label>
            <Form.Item name={"business_name"}>
              <TextField
                name="business_name"
                type="text"
                maxLength={50}
                required
              />
            </Form.Item>
          </FlexibleDiv>
          {/* last name */}
          <FlexibleDiv
            flexDir="column"
            alignItems="flex-start"
            gap="5px"
            className="single__input__box"
          >
            <label>Business Registration Number</label>
            <Form.Item name={"registration_number"}>
              <TextField
                name="registration_number"
                type="text"
                maxLength={50}
                required
              />
            </Form.Item>
          </FlexibleDiv>
        </FlexibleDiv>
        <FlexibleDiv flexDir="row" justifyContent="space-between" width="100%">
          {/* country */}
          <FlexibleDiv
            flexDir="column"
            alignItems="flex-start"
            gap="5px"
            className="single__input__box"
          >
            <label>Country</label>
            <Form.Item name={"country"}>
              <TextField name="country" type="text" maxLength={50} required />
            </Form.Item>
          </FlexibleDiv>
          {/* phone number */}
          <FlexibleDiv
            flexDir="column"
            alignItems="flex-start"
            gap="5px"
            className="single__input__box"
          >
            <label>Phone Number</label>
            <Form.Item name={"phone"}>
              <TextField name="address" type="text" maxLength={50} required />
            </Form.Item>
          </FlexibleDiv>
        </FlexibleDiv>
      </Form>
    </CreateBusinessWrapper>
  );
}
