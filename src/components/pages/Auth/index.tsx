import React, { useState } from "react";
import { Modal, Tabs } from "antd";
import Login from "../Login";
import SignUp from "../SignUp";
import axios from "axios";
import { BACKEND_URL } from "../../utils/contant";
import Notification from "../../layout/Notification";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/UserReducer";
import { CloseCircleOutlined } from "@ant-design/icons";

const Auth = (props: { visible: boolean; hideModal: Function }) => {
  const { TabPane } = Tabs;
  const [TabsValue, setTabsValue] = useState("1");
  const tabsChangeCallback = (key: string): void => {
    setTabsValue(key);
  };

  const onCancel = () => {
    props.hideModal();
  };
  const dispatch = useDispatch();

  const onLogin = (values: any) => {
    const { username, password } = values;
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

          props.hideModal();
        } else {
          Notification({
            message: "Incorrect username or password",
            icon: <CloseCircleOutlined />,
            customClass: "Notification Notification__error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onSignUp = (values: any) => {
    axios
      .post(`${BACKEND_URL}/user`, {
        username: values.username,
        password: values.password,
        description: values.description,
        imageUrl: values.imageUrl,
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
        props.hideModal();
      })
      .catch((err) => {
        console.log(err);
      });
    // props.hideModal();
  };
  return (
    <Modal
      visible={props.visible}
      className="loginmodal__container"
      closable={false}
      footer={null}
    >
      <Tabs defaultActiveKey="1" onChange={tabsChangeCallback}>
        <TabPane tab="Login" key="1">
          {<Login onCancel={onCancel} onDataChange={onLogin} />}
        </TabPane>
        <TabPane tab="SignUp" key="2">
          {<SignUp onCancel={onCancel} onDataChange={onSignUp} />}
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default Auth;
