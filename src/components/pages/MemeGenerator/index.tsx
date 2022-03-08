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

const MemeGenerator = () => {
  const singleuser = useSelector((state: RootState) => state.user);

  //@ts-ignore
  window.saveAs = (blob: Blob, imageName: string) => {
    if (
      singleuser === undefined ||
      singleuser.user_id === undefined ||
      singleuser.user_id === ""
    ) {
      Notification({ message: "Authentication required" });
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = async () => {
      let base64 = reader.result;
      await axios
        .post(`${BACKEND_URL}/meme`, {
          owner_id: singleuser.user_id,
          href: base64,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    saveAs(blob, imageName);
  };
  return (
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
  );
};

export default MemeGenerator;
