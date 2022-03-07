import { Input } from "antd";
import "./MemeGenerator.scss";
import "react-image-crop/src/ReactCrop.scss";
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";
import stempmv from "../../assets/StartingTemplate.png";

const MemeGenerator = () => {
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
          height: "90vh",
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
