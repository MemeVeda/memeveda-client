import { Form, Input, Button, Checkbox, Space, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import "./SignUp.scss";
import { UploadOutlined } from "@ant-design/icons";

const SignUp = (props: { onDataChange: Function; onCancel: Function }) => {
  const onFinish = (values: any) => {
    props.onDataChange(values);
  };

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
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
      id="signupForm"
      autoComplete="off"
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
        label="Description"
        name="description"
        rules={[
          {
            message: "Please input your description!",
          },
        ]}
      >
        <TextArea />
      </Form.Item>

      <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload maxCount={1} name="avatar" action="#" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
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
        {/* <Space> */}
        <Button type="primary" onClick={() => props.onCancel()}>
          Cancel
        </Button>
        <Button form="signupForm" type="primary" htmlType="submit">
          Submit
        </Button>
        {/* </Space> */}
      </Form.Item>
    </Form>
  );
};

export default SignUp;
