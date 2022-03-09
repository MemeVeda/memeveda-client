import { notification } from "antd";

const Notification = (props: {
  icon: any;
  message: string;
  customClass: string;
}) => {
  notification.open({
    icon: props.icon,
    message: props.message,
    className: props.customClass,
    duration: 3,
  });
};

export default Notification;
