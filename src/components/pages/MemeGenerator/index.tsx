import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import { Content } from "antd/lib/layout/layout";
import { ScissorOutlined } from "@ant-design/icons";
import UploadButton from "../../layout/UploadButton";
import { Alert, Button, Checkbox, Image, Input, Space, Upload } from "antd";
import "./MemeGenerator.scss";
import "react-image-crop/src/ReactCrop.scss";
import TemplateModal from "../../layout/TemplateModal";

interface CropType {
  unit: string;
  width: number;
  height: number;
  x: number;
  y: number;
}
const MemeGenerator = () => {
  const [src, setfile] = useState(null);
  const [inputImage, setinputImage] = useState<HTMLImageElement>();
  const [crop, setCrop] = useState<CropType>(); //   { aspect: 16 / 9 }
  const [wantcrop, setwantcrop] = useState(false);
  const [error, seterror] = useState("");
  const [visible, setvisible] = useState(false);
  const handleFileChange = (e: any) => {
    // setinputhref(e.target.files[0]);
    //@ts-ignore
    setfile(URL.createObjectURL(e.target.files[0]));
  };

  const getCroppedImg = () => {
    if (inputImage == null || crop == undefined) return;

    const canvas = document.createElement("canvas");
    const scaleX = inputImage.naturalWidth / inputImage.width;
    const scaleY = inputImage.naturalHeight / inputImage.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    if (canvas.width === 0 || canvas.height === 0) {
      seterror("Select Image to crop");
      return;
    } else {
      seterror("");
    }
    if (ctx == null) return;
    // New lines to be added
    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      inputImage,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const base64Image = canvas.toDataURL("image/jpeg");
    //@ts-ignore
    setfile(base64Image);

    setwantcrop(!wantcrop);
  };
  const hideModal = () => {
    setvisible(false);
  };
  const onChangeHandler = () => {
    setvisible(false);
  };
  return (
    <Content className="memegenerator__container">
      {visible ? (
        <TemplateModal
          visible={visible}
          onCancel={hideModal}
          onDataChange={onChangeHandler}
        />
      ) : (
        <></>
      )}

      <div className="memegenerator__container-box memegenerator__container-box-left">
        {src && wantcrop ? (
          <ReactCrop
            src={src}
            onImageLoaded={setinputImage}
            crop={crop}
            onChange={setCrop}
          />
        ) : src ? (
          <Image preview={false} src={src} />
        ) : (
          <></>
        )}
      </div>
      <div className="memegenerator__container-box memegenerator__container-box-right">
        {error ? (
          <Alert
            type="error"
            message={error}
            closable
            onClose={() => seterror("")}
          />
        ) : (
          <></>
        )}

        <Space>
          <UploadButton
            handleFileChange={handleFileChange}
            name="Upload File"
            id="browser_input"
          />
          <Button onClick={() => setvisible(true)}> Template </Button>
          {/* </Space>
        <Space> */}
          <Checkbox
            onChange={(e) => setwantcrop(!wantcrop)}
            checked={wantcrop === true ? true : false}
            disabled={src === null ? true : false}
          >
            Crop
          </Checkbox>
          {wantcrop ? (
            <Button
              type="dashed"
              shape="round"
              danger
              icon={<ScissorOutlined />}
              onClick={getCroppedImg}
            >
              Crop
            </Button>
          ) : (
            <></>
          )}
        </Space>
      </div>
    </Content>
  );
};

export default MemeGenerator;
