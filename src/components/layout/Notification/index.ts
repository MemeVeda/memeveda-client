import { Button, notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";

// const openNotification = () => {
//   notification.open({
//     message: "Notification Title",
//     description:
//       "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
//     icon: <SmileOutlined style={{ color: "#108ee9" }} />,
//   });
// };

// const Notification = () => {
//   return (
//     <Button type="primary" onClick={openNotification}>
//       Open the notification box
//     </Button>
//   );
// };

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
