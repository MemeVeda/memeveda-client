import React, { useState, useEffect } from "react";
import { List, Modal, Image } from "antd";
import "./TemplateModal.scss";

import axios from "axios";
import Loader from "../Loader";

const TemplateModal = (props: {
  visible: boolean;
  onCancel: Function;
  onDataChange: Function;
}) => {
  const [data, setData] = useState<any>([]);
  const [selected, setselected] = useState();
  const [loading, setloading] = useState(true);

  const fetchData = async () => {
    await axios.get("https://api.imgflip.com/get_memes").then((res) => {
      setloading(false);
      setData(res.data.data.memes);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const selectImage = (item: any) => {
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
      {loading ? (
        <Loader />
      ) : (
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
      )}
    </Modal>
  );
};

export default TemplateModal;
