import React from "react";
import { Image, Layout, Menu, Space } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import "./SideBar.scss";

const SideBar = (props: {
  collapsed: boolean;
  selectedkey: string;
  MenuChange: Function;
}) => {
  const { Sider } = Layout;
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={props.collapsed}
      className="sider"
    >
      <Space className="sider__logo">
        <Image src="" />
        {props.collapsed ? <></> : <span> MemeVeda</span>}
      </Space>
      <Menu
        theme="dark"
        mode="inline"
        onClick={(e) => props.MenuChange(e)}
        selectedKeys={[props.selectedkey]}
        className="sider__menu"
      >
        <Menu.Item key="1" icon={<BulbOutlined />}>
          Create Meme
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
          Gallery
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
          About Us
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideBar;
