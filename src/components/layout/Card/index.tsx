import { useState, useEffect } from "react";
import { Avatar, Space, Card } from "antd";
import {
  DislikeOutlined,
  DownloadOutlined,
  LikeOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import Badge from "../Badge/Badge";
import "./Card.scss";
import { MemeCardType, UserType } from "../../types/types";
import default_boy from "../../assets/default_boy.png";
import { MEME_STORAGE } from "../../utils/contant";

const CustomCard = (props: {
  cardDetail: MemeCardType;
  updateDetail: Function;
}) => {
  const { Meta } = Card;

  const [cardOwner, setcardOwner] = useState<UserType>({
    user_id: "",
    user_desc: "",
    img_url: default_boy,
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
    let newData: MemeCardType = {
      ...props.cardDetail,
      download: props.cardDetail.download + 1,
    };
    props.updateDetail(newData);
  };

  useEffect(() => {
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
        <Badge
          component={
            <Space className="card__container-icon">
              <UploadOutlined />
            </Space>
          }
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
