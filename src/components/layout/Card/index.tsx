import { useState } from "react";
import { List, Avatar, Space, Card } from "antd";
import {
  DislikeOutlined,
  DownloadOutlined,
  LikeOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import Badge from "../Badge/Badge";
import "./Card.scss";

const CustomCard = (props: { href: string }) => {
  const { Meta } = Card;

  const [like, setlike] = useState(0);
  const [dislike, setdislike] = useState(0);
  const [download, setdownload] = useState(0);
  const likeIncrement = () => {
    setlike(like + 1);
  };
  const dislikeIncrement = () => {
    setdislike(dislike + 1);
  };
  const downloadIncrement = () => {
    setdownload(download + 1);
  };
  return (
    <Card
      style={{ width: 300, marginBottom: 50 }}
      className="card__container"
      cover={<img alt="example" src={props.href} />}
      actions={[
        <Badge
          component={
            <Space>
              <LikeOutlined />
              <span>{like}</span>
            </Space>
          }
          increment={likeIncrement}
        />,
        <Badge
          component={
            <Space>
              <DislikeOutlined />
              <span>{dislike}</span>
            </Space>
          }
          increment={dislikeIncrement}
        />,
        <Badge
          component={
            <Space>
              <DownloadOutlined />
              <span>{download}</span>
            </Space>
          }
          increment={downloadIncrement}
        />,
        <Badge component={<UploadOutlined />} />,
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
