import { Input } from "antd";
import "./MemeGenerator.scss";
import "react-image-crop/src/ReactCrop.scss";
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";
import stempmv from "../../assets/StartingTemplate.png";
import { saveAs } from "file-saver";
import axios from "axios";
import { BACKEND_URL } from "../../utils/contant";

const MemeGenerator = () => {
  //@ts-ignore
  window.saveAs = (blob, imageName) => {
    //@ts-ignore
    let url = window.URL.createObjectURL(blob);
    axios
      .post(`${BACKEND_URL}/meme`, {
        href: url,
        tags: ["success"],
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    saveAs(blob, imageName);
  };
  return (
    <>
      {/* <img id="source_best" alt="" /> */}
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
