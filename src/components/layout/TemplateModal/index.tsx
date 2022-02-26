import React, { useState, useEffect } from "react";
import { List, message, Avatar, Modal, Image, Button } from "antd";
import "./TemplateModal.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

const fakeDataUrl =
  "https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo";
const ContainerHeight = 400;

const TemplateModal = (props: {
  visible: boolean;
  onCancel: Function;
  onDataChange: Function;
}) => {
  const [data, setData] = useState([]);
  const [selected, setselected] = useState(-1);
  //image size - 234 x 234
  const fetchData = async () => {
    await axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then((res) => {
        setData(res.data.splice(0, 20));
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const selectImage = (index: number) => {
    console.log(index);
    setselected(index);
  };
  return (
    <Modal
      title="Template"
      visible={props.visible}
      onCancel={() => props.onCancel()}
      onOk={() => props.onDataChange()}
      okText="Select"
      className="templatemodal"
    >
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={data}
        renderItem={(item: any, index: number) => {
          return (
            <List.Item
              onClick={() => selectImage(index)}
              className={
                "templatemodal__list-item " +
                (selected === index ? "templatemodal__list-item-click" : "")
              }
            >
              <Image src={item.url} preview={false} />
            </List.Item>
          );
        }}
      />
    </Modal>
  );
};

export default TemplateModal;
