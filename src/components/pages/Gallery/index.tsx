import { useState, useEffect } from "react";
import { Content } from "antd/lib/layout/layout";
import CustomCard from "../../layout/Card";
import "./gallery.scss";
import { MemeCardType } from "../../types/types";
import axios from "axios";
import Loader from "../../layout/Loader";
import Notification from "../../layout/Notification";
import { BACKEND_URL } from "../../utils/contant";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const Gallery = () => {
  const [memeData, setmemeData] = useState<MemeCardType[]>([]);
  const [loading, setloading] = useState(true);

  const updateCardDetail = (cardDetail: MemeCardType) => {
    const key = cardDetail.key;
    setmemeData(
      memeData.map((card: MemeCardType) => {
        return card.key === key ? cardDetail : card;
      })
    );

    axios
      .post(`${BACKEND_URL}/meme/${cardDetail.key}`, {
        href: cardDetail.href,
        like: cardDetail.like,
        dislike: cardDetail.dislike,
        download: cardDetail.download,
        owner_id: cardDetail.owner_id,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        Notification({
          message: error.message,
          icon: <CloseCircleOutlined />,
          customClass: "Notification Notification__error",
        });
      });
  };

  useEffect(() => {
    const fetchMemeDetails = async () => {
      await axios
        .get(`${BACKEND_URL}/meme`)
        .then((response) => {
          console.log(response);
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
          setloading(false);
          Notification({
            message: "fetched successfully",
            icon: <CheckCircleOutlined />,
            customClass: "Notification Notification__success",
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
    <>
      {loading ? (
        <Loader />
      ) : (
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
      )}
    </>
  );
};

export default Gallery;
