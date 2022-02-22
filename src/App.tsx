import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import "./App.scss";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import SideBar from "./components/layout/SideBar";
import CustomContent from "./components/layout/CustomContent";
import { memeDemoData } from "./components/db/memeDemoData";
import axios from "axios";
import { MEME_STORAGE } from "./components/utils/contant";
const { Header, Content } = Layout;

function App() {
  const [collapsed, setcollapsed] = useState(false);
  const [selectedKey, setselectedKey] = useState("1");
  const toggle = () => {
    setcollapsed(!collapsed);
  };

  const MenuChange = (event: any) => {
    setselectedKey(event.key);
  };

  useEffect(() => {
    const fetchDetail = async () => {
      await axios
        .get("http://localhost:5000/user")
        .then((response) => {
          let users = response.data.map((user: any) => {
            return {
              user_id: user._id,
              user_name: user.username,
              user_desc: user.description,
              img_url: user.imageUrl,
            };
          });

          sessionStorage.setItem(`${MEME_STORAGE}users`, JSON.stringify(users));
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    fetchDetail();
  }, []);

  //sessionstorage
  // memeDemoData();
  return (
    <Layout className="App">
      <SideBar
        collapsed={collapsed}
        selectedkey={selectedKey}
        MenuChange={MenuChange}
      />
      <Layout className="site-layout">
        <Header className="site-layout-background">
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
        </Header>
        <CustomContent tabpane={selectedKey} />
      </Layout>
    </Layout>
  );
}

export default App;
