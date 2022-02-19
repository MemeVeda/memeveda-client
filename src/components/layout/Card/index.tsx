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
  return (
    <Card
      style={{ width: 300, marginBottom: 50 }}
      className="card__container"
      cover={<img alt="example" src={props.href} />}
      actions={[
        <Badge component={<LikeOutlined />} count={10} />,
        <Badge component={<DislikeOutlined />} count={0} />,
        <Badge component={<DownloadOutlined />} count={20} />,
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
