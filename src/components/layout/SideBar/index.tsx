import React from "react";
import { Image, Layout, Menu, Space } from "antd";
import MemeVeda from "../../assets/MemeVeda.png";
import { PictureOutlined, BulbOutlined, TeamOutlined } from "@ant-design/icons";
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
        {props.collapsed ? (
          <span>
            <Image
              style={{ marginTop: 0 }}
              src={MemeVeda}
              width={80}
              height={66}
            />{" "}
          </span>
        ) : (
          <span>
            {" "}
            <Image
              style={{ marginTop: 12 }}
              src={MemeVeda}
              width={200}
              height={180}
            />
          </span>
        )}
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
        <Menu.Item key="2" icon={<PictureOutlined />}>
          Gallery
        </Menu.Item>
        <Menu.Item key="3" icon={<TeamOutlined />}>
          About Us
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideBar;
