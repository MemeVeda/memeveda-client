import React, { useState, useEffect } from "react";
import { Button, Layout, Avatar, Image } from "antd";
import "./App.scss";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import SideBar from "./components/layout/SideBar";
import CustomContent from "./components/layout/CustomContent";
import axios from "axios";
import { BACKEND_URL, MEME_STORAGE } from "./components/utils/contant";
import Auth from "./components/pages/Auth";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./components/redux/store";

function App() {
  const { Header } = Layout;
  const [collapsed, setcollapsed] = useState(false);
  const [selectedKey, setselectedKey] = useState("1");
  const [auth, setauth] = useState(false);
  const [avatar_url, setavatar_url] = useState(
    "https://joeschmoe.io/api/v1/random"
  );
  const singleuser = useSelector((state: RootState) => state.user);

  const [loginModal, setloginModal] = useState(false);
  const toggle = () => {
    setcollapsed(!collapsed);
  };

  const MenuChange = (event: any) => {
    setselectedKey(event.key);
  };

  useEffect(() => {
    const fetchDetail = async () => {
      await axios
        .get(`${BACKEND_URL}/user`)
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

  const hideModal = () => {
    setloginModal(false);
  };

  useEffect(() => {
    console.log(singleuser);
    if (singleuser && singleuser.user_id && singleuser.user_id !== "") {
      setauth(true);
      if (singleuser.img_url) setavatar_url(singleuser.img_url);
      sessionStorage.setItem(
        `${MEME_STORAGE}singleuser`,
        JSON.stringify(singleuser)
      );
    }
  }, [singleuser]);

  return (
    <Layout className="App">
      {loginModal ? <Auth visible={loginModal} hideModal={hideModal} /> : <></>}
      <SideBar
        collapsed={collapsed}
        selectedkey={selectedKey}
        MenuChange={MenuChange}
      />
      <Layout className="site-layout">
        <Header className="site-layout-background  header__container">
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
          {auth ? (
            <Avatar size={45} src={<Image src={avatar_url} />} />
          ) : (
            <Button
              onClick={() => setloginModal(true)}
              className="header__container_btn"
              type="primary"
            >
              {" "}
              Login/SignUp{" "}
            </Button>
          )}
        </Header>
        <CustomContent tabpane={selectedKey} />
      </Layout>
    </Layout>
  );
}

export default App;
