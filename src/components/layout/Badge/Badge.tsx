import React from "react";
import { Space, Popover } from "antd";
import "./Badge.scss";

const Badge = (props: {
  component: any;
  count?: number;
  increment?: Function;
}) => {
  return (
    <Space
      className="count_badge"
      onClick={() => (props.increment ? props.increment() : null)}
    >
      {props.component}
    </Space>
  );
};

export default Badge;
