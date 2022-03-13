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
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Gallery = () => {
  const [memeData, setmemeData] = useState<MemeCardType[]>([]);
  const [loading, setloading] = useState(true);

  const cardData = useSelector((state: RootState) => state.cards);
  const usersData = useSelector((state: RootState) => state.user.users);
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
    if (cardData && cardData.length > 0 && usersData.length > 0) {
      setmemeData(cardData);
      setloading(false);
    }
  }, [cardData]);
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
