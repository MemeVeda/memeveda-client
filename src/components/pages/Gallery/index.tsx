import React, { useState, useEffect } from "react";
import { Content } from "antd/lib/layout/layout";
import CustomCard from "../../layout/Card";
import "./gallery.scss";
import { MEME_STORAGE } from "../../utils/contant";
import { MemeCardType } from "../../utils/types";

const Gallery = () => {
  const [memeData, setmemeData] = useState(
    JSON.parse(sessionStorage.getItem(`${MEME_STORAGE}memes`) || "{}")
  );

  const updateCardDetail = (cardDetail: MemeCardType) => {
    const key = cardDetail.key;
    setmemeData(
      memeData.map((card: MemeCardType) => {
        return card.key === key ? cardDetail : card;
      })
    );
  };

  useEffect(() => {
    sessionStorage.setItem(`${MEME_STORAGE}memes`, JSON.stringify(memeData));
  }, [memeData]);

  return (
    <Content className="site-layout-background gallery__container">
      {memeData.map((card: MemeCardType) => {
        return (
          <CustomCard
            cardDetail={card}
            updateDetail={updateCardDetail}
            key={card.key}
          />
        );
      })}
    </Content>
  );
};

export default Gallery;
