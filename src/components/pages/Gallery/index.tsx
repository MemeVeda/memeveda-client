import React, { useState, useEffect } from "react";
import { Content } from "antd/lib/layout/layout";
import CustomCard from "../../layout/Card";
import "./gallery.scss";
import { MEME_STORAGE } from "../../utils/contant";
import { MemeCardType } from "../../types/types";
import axios from "axios";

const Gallery = () => {
  const [memeData, setmemeData] = useState<MemeCardType[]>([]);

  const updateCardDetail = (cardDetail: MemeCardType) => {
    const key = cardDetail.key;
    setmemeData(
      memeData.map((card: MemeCardType) => {
        return card.key === key ? cardDetail : card;
      })
    );

    axios
      .post(`http://localhost:5000/meme/${cardDetail.key}`, {
        href: cardDetail.href,
        like: cardDetail.like,
        dislike: cardDetail.dislike,
        download: cardDetail.download,
        owner_id: cardDetail.owner_id,
        tags: cardDetail.tags,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const fetchMemeDetails = async () => {
      await axios
        .get("http://localhost:5000/meme")
        .then((response) => {
          let cards: MemeCardType[] = response.data.map((card: any) => {
            return {
              key: card._id,
              href: card.href,
              like: card.like,
              dislike: card.dislike,
              download: card.download,
              owner_id: card.owner_id,
              tags: card.tags,
            };
          });
          setmemeData(cards);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchMemeDetails();
  }, []);

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
