import React from "react";
import { Spin } from "antd";
import "./Loader.scss";

const Loader = () => {
  return (
    <div className="loading-wheel">
      {" "}
      <Spin size="large" tip="loading..." />
    </div>
  );
};

export default Loader;
