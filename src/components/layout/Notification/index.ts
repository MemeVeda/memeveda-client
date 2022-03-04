import { Button, notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const Notification = (props: { message: string }) => {
  notification.open({
    message: "Error",
    description: props.message,
    className: "custom-class",
    style: {
      width: 600,
    },
  });
};

export default Notification;
