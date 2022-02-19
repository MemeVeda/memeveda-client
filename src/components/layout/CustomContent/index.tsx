import React from "react";
import { Tabs } from "antd";
import { Content } from "antd/lib/layout/layout";
import MemeGenerator from "../../pages/MemeGenerator";
import Gallery from "../../pages/Gallery";
import About from "../../pages/About";
import { Empty } from "antd";

const CustomContent = (props: { tabpane: string }) => {
  switch (props.tabpane) {
    case "1":
      return <MemeGenerator />;
    case "2":
      return <Gallery />;
    case "3":
      return <About />;
    default:
      return <Empty />;
  }
};

export default CustomContent;
