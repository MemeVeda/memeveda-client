import React, { useState, useEffect } from "react";
import { Button, Layout, Avatar, Image } from "antd";
import "./App.scss";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import SideBar from "./components/layout/SideBar";
import CustomContent from "./components/layout/CustomContent";
import axios from "axios";
import { BACKEND_URL } from "./components/utils/contant";
import Auth from "./components/pages/Auth";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./components/redux/store";
import { addCardList } from "./components/redux/MemeReducer";
import { addUser, addUserList } from "./components/redux/UserReducer";

function App() {
  const { Header } = Layout;
  const [collapsed, setcollapsed] = useState(false);
  const [selectedKey, setselectedKey] = useState("1");
  const [auth, setauth] = useState(false);
  const [avatar_url, setavatar_url] = useState(
    "https://joeschmoe.io/api/v1/random"
  );
  const redux_user_data = useSelector((state: RootState) => state.user);
  const redux_card_data = useSelector((state: RootState) => state.cards);

  const dispatch = useDispatch();
  const [loginModal, setloginModal] = useState(false);
  const toggle = () => {
    setcollapsed(!collapsed);
  };

  const MenuChange = (event: any) => {
    setselectedKey(event.key);
  };

  const fetchCards = async () => {
    // console.log("fetch cards");
    await axios
      .get(`${BACKEND_URL}/meme`)
      .then((response) => {
        // console.log(response.data);
        let cards = response.data.map((card: any) => {
          return {
            key: card._id,
            href: card.href,
            like: card.like,
            dislike: card.dislike,
            download: card.download,
            owner_id: card.owner_id,
          };
        });

        dispatch(addCardList(cards));
      })
      .catch((err) => {
        console.log("error while fetching");
      });
  };
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
        // console.log("users", users);
        dispatch(addUserList(users));
        // sessionStorage.setItem(`${MEME_STORAGE}users`, JSON.stringify(users));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    if (redux_card_data.length === 0) {
      fetchCards();
    } else {
      dispatch(addCardList(redux_card_data));
    }
    if (redux_user_data.users.length === 0 || redux_card_data === undefined) {
      fetchDetail();
    } else {
      dispatch(addUserList(redux_user_data.users));

      if (redux_user_data.currentuser.user_name !== "") {
        if (redux_user_data.currentuser.img_url)
          setavatar_url(redux_user_data.currentuser.img_url);

        setauth(true);
        dispatch(addUser(redux_user_data.currentuser));
      }

      // dispatch(addUser(redux_user_data.currentuser));
    }
  }, []);

  useEffect(() => {
    if (redux_user_data.currentuser.user_name !== "") {
      if (redux_user_data.currentuser.img_url)
        setavatar_url(redux_user_data.currentuser.img_url);
      setauth(true);
    }
  }, [redux_user_data]);

  const hideModal = () => {
    setloginModal(false);
  };

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
