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

  return (
    <Modal
      visible={props.visible}
      className="loginmodal__container"
      closable={false}
      footer={null}
    >
      <Tabs defaultActiveKey="1" onChange={tabsChangeCallback}>
        <TabPane tab="Login" key="1">
          {<Login onCancel={onCancel} onDataChange={onCancel} />}
        </TabPane>
        <TabPane tab="SignUp" key="2">
          {<SignUp onCancel={onCancel} onDataChange={onCancel} />}
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default Auth;
