import React from "react";
import { Space, Popover } from "antd";
import "./Badge.scss";

const Badge = (props: { component: any; count?: number }) => {
  const content = () => {
    if (props.count) {
      return <span> 10</span>;
    } else return <></>;
  };
  return (
    <Space className="count_badge">
      <Popover title={props.count ? props.count : null} content={null}>
        {props.component}
      </Popover>
    </Space>
  );
};

export default Badge;
