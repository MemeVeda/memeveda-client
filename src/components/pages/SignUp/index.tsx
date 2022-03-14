import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Space, Upload, Alert } from "antd";
import TextArea from "antd/lib/input/TextArea";
import "./SignUp.scss";
import UploadImage from "../../layout/UploadImage";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AVATAR_API, BACKEND_URL } from "../../utils/contant";
import { addUser } from "../../redux/UserReducer";
import imageUpload from "../MemeGenerator/fetchcloud";

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
  const dispatch = useDispatch();
  const uploadFile = (image: string) => {
    setuploadImage(image);
  };

  const eventUploadError = (errorMessage: any) => {
    console.log(errorMessage);
    setuploadImage("");
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

    if (uploadImage !== "") {
      imageUpload(uploadImage, (url: string) => {
        axios
          .post(`${BACKEND_URL}/user`, {
            username: username,
            password: password,
            description: description,
            imageUrl: url,
          })
          .then((docs) => {
            const user_data = docs.data;
            dispatch(
              addUser({
                user_id: user_data._id,
                img_url: user_data.imageUrl,
                user_name: user_data.username,
                user_desc: user_data.description,
              })
            );
            props.onDataChange();
          })
          .catch((err) => {
            // console.log(err);
            seterrorMessage("Username already exists!");
          });
      });
    } else {
      axios
        .post(`${BACKEND_URL}/user`, {
          username: username,
          password: password,
          description: description,
          imageUrl: AVATAR_API,
        })
        .then((docs) => {
          const user_data = docs.data;
          dispatch(
            addUser({
              user_id: user_data._id,
              img_url: user_data.imageUrl,
              user_name: user_data.username,
              user_desc: user_data.description,
            })
          );
          props.onDataChange();
        })
        .catch((err) => {
          // console.log(err);
          seterrorMessage("Username already exists!");
        });
    }
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
      <Form.Item label="Username" name="username">
        <Input
          type="text"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Password" name="password">
        <Input.Password
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <TextArea
          value={description}
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
