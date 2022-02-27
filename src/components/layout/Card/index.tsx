import { useState, useEffect } from "react";
import { Avatar, Space, Card } from "antd";
import {
  DislikeOutlined,
  DownloadOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import Badge from "../Badge/Badge";
import "./Card.scss";
import { MemeCardType, UserType } from "../../types/types";
import { AVATAR_API, MEME_STORAGE } from "../../utils/contant";
import { saveAs } from "file-saver";

const CustomCard = (props: {
  cardDetail: MemeCardType;
  updateDetail: Function;
}) => {
  const { Meta } = Card;

  const [cardOwner, setcardOwner] = useState<UserType>({
    user_id: "",
    user_desc: "",
    img_url: AVATAR_API,
    user_name: "",
  });
  const likeIncrement = () => {
    let newData: MemeCardType = {
      ...props.cardDetail,
      like: props.cardDetail.like + 1,
    };
    props.updateDetail(newData);
  };
  const dislikeIncrement = () => {
    let newData: MemeCardType = {
      ...props.cardDetail,
      dislike: props.cardDetail.dislike + 1,
    };
    props.updateDetail(newData);
  };

  const downloadIncrement = () => {
    saveAs(props.cardDetail.href, "image");
    // "https://i.imgur.com/TuRB5mj.jpg"
    let newData: MemeCardType = {
      ...props.cardDetail,
      download: props.cardDetail.download + 1,
    };
    props.updateDetail(newData);
  };

  useEffect(() => {
    if (props.cardDetail.owner_id) {
      let users = JSON.parse(
        sessionStorage.getItem(`${MEME_STORAGE}users`) || "{}"
      );
      if (users && props.cardDetail.owner_id) {
        let user = users.find((user: UserType) => {
          return props.cardDetail.owner_id === user.user_id;
        });
        if (user) {
          setcardOwner(user);
        }
      }
    }
  }, []);

  return (
    <Card
      style={{ width: 300, marginBottom: 50 }}
      className="card__container"
      cover={
        <img
          className="card__container-img"
          alt="example"
          src={props.cardDetail.href}
        />
      }
      actions={[
        <Badge
          component={
            <Space className="card__container-icon">
              <LikeOutlined />
              <span>{props.cardDetail.like}</span>
            </Space>
          }
          increment={likeIncrement}
        />,
        <Badge
          component={
            <Space className="card__container-icon">
              <DislikeOutlined />
              <span>{props.cardDetail.dislike}</span>
            </Space>
          }
          increment={dislikeIncrement}
        />,
        <Badge
          component={
            <Space className="card__container-icon">
              <DownloadOutlined />
              <span>{props.cardDetail.download}</span>
            </Space>
          }
          increment={downloadIncrement}
        />,
      ]}
    >
      <Meta
        avatar={<Avatar src={cardOwner.img_url} />}
        title={cardOwner.user_name}
        description={cardOwner.user_desc}
      />
    </Card>
  );
};

export default CustomCard;
