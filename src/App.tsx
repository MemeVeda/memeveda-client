import React, { useState } from "react";
import { Layout } from "antd";
import "./App.scss";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import SideBar from "./components/layout/SideBar";
import CustomContent from "./components/layout/CustomContent";
import { memeDemoData } from "./components/db/memeDemoData";
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

  memeDemoData();
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
