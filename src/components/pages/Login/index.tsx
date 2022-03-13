import { Form, Input, Button, Checkbox, Alert } from "antd";
import "./Login.scss";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { addUser } from "../../redux/UserReducer";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BACKEND_URL } from "../../utils/contant";
const Login = (props: { onDataChange: Function; onCancel: Function }) => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [remember, setremember] = useState(true);
  const [errorMessage, seterrorMessage] = useState("");
  const dispatch = useDispatch();
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
    axios
      .get(`${BACKEND_URL}/user/${username}`)
      .then((docs) => {
        const user_data = docs.data;
        if (user_data !== null && user_data.password === password) {
          dispatch(
            addUser({
              user_id: user_data._id,
              img_url: user_data.imageUrl,
              user_name: user_data.username,
              user_desc: user_data.description,
            })
          );
          props.onDataChange();
        } else {
          seterrorMessage("Incorrect username or password");
        }
      })
      .catch((err) => {
        seterrorMessage(err.message);
        // console.log(err);
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

export default Login;
