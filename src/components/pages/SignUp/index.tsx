import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Space, Upload, Alert } from "antd";
import TextArea from "antd/lib/input/TextArea";
import "./SignUp.scss";
import UploadImage from "../../layout/UploadImage";

const SignUp = (props: { onDataChange: Function; onCancel: Function }) => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [description, setdescription] = useState("");
  const [remember, setremember] = useState(true);
  const [uploadImage, setuploadImage] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  // const onFinish = (values: any) => {
  //   props.onDataChange(values);
  // };
  const uploadFile = (image: string) => {
    setuploadImage(image);
  };

  const eventUploadError = (errorMessage: any) => {
    console.log(errorMessage);
    seterrorMessage(errorMessage);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (username === "") {
      seterrorMessage("username is required field");
      return;
    }
    if (password === "") {
      seterrorMessage("password is required field");
      return;
    }
    seterrorMessage("");
    props.onDataChange({
      username: username,
      password: password,
      description: description,
      remember: remember,
      imageUrl: uploadImage,
    });
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
      autoComplete="off"
    >
      {errorMessage !== "" ? (
        <Alert
          closable={true}
          type="error"
          className="alert_message"
          message={errorMessage}
        />
      ) : (
        <></>
      )}
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
        <Input type="text" onChange={(e) => setusername(e.target.value)} />
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
        <Input.Password onChange={(e) => setpassword(e.target.value)} />
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
        <TextArea
          maxLength={50}
          onChange={(e) => setdescription(e.target.value)}
        />
      </Form.Item>

      <Form.Item name="upload" label="Upload">
        <UploadImage
          size={1}
          returnFileContent={uploadFile}
          setErrorMessage={eventUploadError}
        />
      </Form.Item>
      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 5,
          span: 16,
        }}
      >
        <Checkbox onChange={(e) => setremember(!remember)}>
          Remember me
        </Checkbox>
      </Form.Item>

      <Form.Item className="submitHandler">
        <Button type="primary" onClick={() => props.onCancel()}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUp;
