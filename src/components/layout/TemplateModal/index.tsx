import React, { useState, useEffect } from "react";
import { List, message, Avatar, Modal, Image, Button } from "antd";
import "./TemplateModal.scss";

import axios from "axios";

const fakeDataUrl =
  "https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo";
const ContainerHeight = 400;

const TemplateModal = (props: {
  visible: boolean;
  onCancel: Function;
  onDataChange: Function;
}) => {
  const [data, setData] = useState<any>([]);
  const [selected, setselected] = useState();
  //image size - 234 x 234
  const fetchData = async () => {
    await axios
      // .get("https://jsonplaceholder.typicode.com/photos")
      // .get("https://ibb.co/1s6jHzr")
      // .get("https://api.imgflip.com/get_memes")
      .get("https://api.imgflip.com/get_memes")
      // .get("https://i.imgur.com/TuRB5mj.jpg")
      // .get("https://memeveda.herokuapp.com/randomapi", {
      //   headers: {
      //     "Access-Control-Allow-Origin": "*",
      //   },
      // })
      .then((res) => {
        // console.log(res.data.data.memes);
        // setData(res.data.data.memes);
        // console.log(res.data);
        console.log(res.data.data.memes.splice(0, 10));
        setData(res.data.data.memes.splice(0, 10));
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const selectImage = (item: any) => {
    // console.log(item);
    setselected(item);
  };

  const handleSubmit = () => {
    props.onDataChange(selected);
  };
  return (
    <Modal
      title="Template"
      visible={props.visible}
      onCancel={() => props.onCancel()}
      onOk={handleSubmit}
      okText="Select"
      className="templatemodal"
    >
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={data}
        renderItem={(item: any, index: number) => {
          return (
            <List.Item
              onClick={() => selectImage(item)}
              className={
                "templatemodal__list-item " +
                //@ts-ignore
                (selected && selected.id === item.id
                  ? "templatemodal__list-item-click"
                  : "")
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
