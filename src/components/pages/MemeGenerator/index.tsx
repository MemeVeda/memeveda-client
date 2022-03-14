import "./MemeGenerator.scss";
import "react-image-crop/src/ReactCrop.scss";
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";
import stempmv from "../../assets/StartingTemplate.png";
import { saveAs } from "file-saver";
import axios from "axios";
import { BACKEND_URL } from "../../utils/contant";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Notification from "../../layout/Notification";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Checkbox, Modal } from "antd";
import { useState } from "react";
import imageUpload from "./fetchcloud";
import { addCard } from "../../redux/MemeReducer";

const MemeGenerator = () => {
  const singleuser = useSelector((state: RootState) => state.user.currentuser);
  const [confirmModal, setconfirmModal] = useState(false);

  const [outputBlob, setoutputBlob] = useState<Blob>();
  const [imageName, setimageName] = useState("");

  //@ts-ignore
  window.saveAs = (blob: Blob, imageName: string) => {
    // console.log(blob);
    if (
      singleuser === undefined ||
      singleuser.user_id === undefined ||
      singleuser.user_id === ""
    ) {
      Notification({
        message: "Authentication required",
        icon: <CloseCircleOutlined />,
        customClass: "Notification Notification__error",
      });
      return;
    }
    setoutputBlob(blob);
    setimageName(imageName);
    setconfirmModal(true);
  };

  const dispatch = useDispatch();
  const handleOk = () => {
    if (outputBlob === undefined) return;
    let reader = new FileReader();
    reader.readAsDataURL(outputBlob);
    reader.onload = async () => {
      let base64 = reader.result;

      if (check) {
        imageUpload(base64, (url: string) => {
          axios
            .post(`${BACKEND_URL}/meme`, {
              owner_id: singleuser.user_id,
              href: url,
            })
            .then((res) => {
              Notification({
                message: "Upload Successfully",
                icon: <CheckCircleOutlined />,
                customClass: "Notification Notification__success",
              });

              dispatch(
                addCard({
                  key: res.data._id,
                  href: res.data.href,
                  like: 0,
                  dislike: 0,
                  download: 0,
                  owner_id: res.data.owner_id,
                })
              );

              // console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    };

    saveAs(outputBlob, imageName);
    setconfirmModal(false);
  };
  const handleCancel = () => {
    setconfirmModal(false);
  };
  const [check, setcheck] = useState(true);

  return (
    <>
      <Modal
        title="Basic Modal"
        visible={confirmModal}
        onOk={handleOk}
        onCancel={handleCancel}
        className="download__confirm_modal"
        okText="Download"
      >
        <Checkbox checked={check} onChange={(e) => setcheck(!check)}>
          Contribute to Community{" "}
        </Checkbox>
      </Modal>
      <ImageEditor
        includeUI={{
          loadImage: {
            path: stempmv,
            name: "SampleImage",
          },
          //theme: myTheme,
          menu: [
            "crop",
            "flip",
            "rotate",
            "draw",
            "shape",
            "icon",
            "text",
            "mask",
            "filter",
          ],
          initMenu: "filter",
          uiSize: {
            width: "100%",
            height: "91vh",
          },
          menuBarPosition: "right",
        }}
        cssMaxHeight={600}
        cssMaxWidth={800}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
        }}
        usageStatistics={false}
      />
    </>
  );
};

export default MemeGenerator;
