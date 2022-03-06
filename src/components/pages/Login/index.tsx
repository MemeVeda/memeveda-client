import { Form, Input, Button, Checkbox, Modal, Space, Tabs } from "antd";
import "./Login.scss";

const Login = (props: { onDataChange: Function; onCancel: Function }) => {
  const onFinish = (values: any) => {
    // console.log("Success:", values);
    props.onDataChange(values);
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      autoComplete="off"
      id="loginForm"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 5,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item className="submitHandler">
        {/* <Space key="#"> */}
        <Button type="primary" onClick={() => props.onCancel()}>
          Cancel
        </Button>
        <Button form="loginForm" type="primary" htmlType="submit">
          Submit
        </Button>
        {/* </Space> */}
      </Form.Item>
    </Form>
  );
};

export default Login;
