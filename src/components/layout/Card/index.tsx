import { useState } from "react";
import { List, Avatar, Space, Card, Image } from "antd";
import {
  DislikeOutlined,
  DownloadOutlined,
  LikeOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import Badge from "../Badge/Badge";
import "./Card.scss";
import { MemeCardType } from "../../utils/types";

const CustomCard = (props: {
  cardDetail: MemeCardType;
  updateDetail: Function;
}) => {
  const { Meta } = Card;

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
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title="Card title"
        description="This is the description"
      />
    </Card>
  );
};

export default CustomCard;
