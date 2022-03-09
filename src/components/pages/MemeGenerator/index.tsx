import "./MemeGenerator.scss";
import "react-image-crop/src/ReactCrop.scss";
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";
import stempmv from "../../assets/StartingTemplate.png";
import { saveAs } from "file-saver";
import axios from "axios";
import { BACKEND_URL } from "../../utils/contant";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Notification from "../../layout/Notification";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Checkbox, Modal } from "antd";
import { useState } from "react";

const MemeGenerator = () => {
  const singleuser = useSelector((state: RootState) => state.user);
  const [confirmModal, setconfirmModal] = useState(false);

  const [outputBlob, setoutputBlob] = useState<Blob>();
  const [imageName, setimageName] = useState("");

  //@ts-ignore
  window.saveAs = (blob: Blob, imageName: string) => {
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

  const handleOk = () => {
    if (outputBlob === undefined) return;
    let reader = new FileReader();
    reader.readAsDataURL(outputBlob);
    reader.onload = async () => {
      let base64 = reader.result;

      if (check) {
        await axios
          .post(`${BACKEND_URL}/meme`, {
            owner_id: singleuser.user_id,
            href: base64,
          })
          .then((res) => {
            Notification({
              message: "Uploaded Successfully",
              icon: <CheckCircleOutlined />,
              customClass: "Notification Notification__success",
            });
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
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
          menuBarPosition: "bottom",
        }}
        cssMaxHeight={750}
        cssMaxWidth={1000}
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
