import React, { useState, useEffect } from "react";
import ReactCrop from "react-image-crop";
import { Content } from "antd/lib/layout/layout";
import { ScissorOutlined, UploadOutlined } from "@ant-design/icons";
import UploadButton from "../../layout/UploadButton";
import { Button, Checkbox, Image, Input, Space } from "antd";
import "./MemeGenerator.scss";
import "react-image-crop/src/ReactCrop.scss";
import TemplateModal from "../../layout/TemplateModal";
import Notification from "../../layout/Notification";
import Drag from "./Drag";
import { DraggableEvent } from "react-draggable";

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
  const [visible, setvisible] = useState(false);
  const [dragdrop, setdragdrop] = useState(false);
  const [inputFirst, setinputFirst] = useState({
    x: -1,
    y: -1,
    message: "",
  });
  const [inputSecond, setinputSecond] = useState({
    x: -1,
    y: -1,
    message: "",
  });

  const handleChange = (e: any) => {
    let img = document.createElement("img");
    img.src = URL.createObjectURL(e.target.files[0]);
    console.log(img);
    setinputImage(img);
    setdragdrop(true);

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
      Notification({ message: "Select Area to crop" });
      return;
    }
    if (ctx == null) return;
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

    try {
      const base64Image = canvas.toDataURL("image/jpeg");
      //@ts-ignore
      setfile(base64Image);
      inputImage.src = base64Image;
    } catch (error) {
      Notification({ message: "Not able to crop" });
    }

    setwantcrop(!wantcrop);
  };
  const hideModal = () => {
    setvisible(false);
  };
  const onChangeHandler = (item: any) => {
    fetch(item.url)
      .then((res) => res.blob())
      .then((blob) => {
        let img = document.createElement("img");
        img.src = URL.createObjectURL(blob);
        console.log(img);
        setinputImage(img);
        setdragdrop(true);
        //@ts-ignore
        setfile(URL.createObjectURL(blob));
      });
    setvisible(false);
  };

  const onDragStopFirst = (event: DraggableEvent) => {
    //@ts-ignore
    let curr_x = event.x;
    //@ts-ignore
    let curr_y = event.y;

    setinputFirst({
      ...inputFirst,
      x: curr_x,
      y: curr_y,
    });
  };
  const onDragStopSecond = (event: DraggableEvent) => {
    //@ts-ignore
    let curr_x = event.x;
    //@ts-ignore
    let curr_y = event.y;

    setinputSecond({
      ...inputSecond,
      x: curr_x,
      y: curr_y,
    });
  };

  const addText = () => {
    if (inputImage === undefined) return;

    let canavs = document.createElement("canvas");
    let ctx = canavs.getContext("2d");
    if (ctx === null) return;
    canavs.width = inputImage.width;
    canavs.height = inputImage.height;
    ctx.drawImage(inputImage, 0, 0);
    ctx.fillStyle = "#8B8000";
    ctx.font = "30px Arial";
    console.log(inputFirst);
    console.log(inputSecond);
    if (inputFirst.x !== -1 && inputFirst.y !== -1) {
      ctx.fillText(inputFirst.message, inputFirst.x, inputFirst.y);
    }
    if (inputSecond.x !== -1 && inputSecond.y !== -1) {
      ctx.fillText(inputSecond.message, inputSecond.x, inputSecond.y);
    }

    let url = canavs.toDataURL("image/jpeg");
    //@ts-ignore
    setfile(url);
    return url;
  };

  const generateMeme = () => {
    if (src === null) return;
    let docs = document.createElement("a");
    if (docs === null) return;
    let hr = addText();
    setdragdrop(false);
    if (hr === undefined) return;
    docs.href = hr;
    docs.download = "ouput";
    document.body.appendChild(docs);
    docs.click();
    document.body.removeChild(docs);
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
        {dragdrop ? (
          <>
            <Drag
              text={inputFirst.message}
              customClassName="draggable__component_first"
              onDragStop={onDragStopFirst}
            />
            <Drag
              text={inputSecond.message}
              customClassName="draggable__component_second"
              onDragStop={onDragStopSecond}
            />
          </>
        ) : (
          <></>
        )}

        {src && wantcrop ? (
          <ReactCrop
            src={src}
            onImageLoaded={setinputImage}
            crop={crop}
            onChange={setCrop}
          />
        ) : src ? (
          <Image
            className="working_meme"
            preview={false}
            src={src}
            crossOrigin="anonymous"
            id="source"
          />
        ) : (
          <></>
        )}
      </div>
      <div className="memegenerator__container-box memegenerator__container-box-right">
        <div className="memegenerator__container-box-right-btnholder">
          {/* //upload from computer */}
          <UploadButton
            handleFileChange={handleChange}
            name="Upload file"
            id="browser_input"
          />

          {/* upload new template  */}
          <Button
            className="custom-file-input"
            type="dashed"
            danger
            icon={<UploadOutlined />}
            onClick={() => setvisible(true)}
          >
            {" "}
            Upload new template{" "}
          </Button>
        </div>
        <div>
          <Space>
            <Button onClick={() => generateMeme()}>Generate Meme</Button>
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
        <div className="memegenerator__container-box-right-inputholder">
          <Input
            type="text"
            onChange={(e) =>
              setinputFirst({
                ...inputFirst,
                message: e.target.value,
              })
            }
            placeholder="Enter Top Text"
          />
          <Input
            type="text"
            onChange={(e) =>
              setinputSecond({
                ...inputSecond,
                message: e.target.value,
              })
            }
            placeholder="Enter Bottom Text"
          />
        </div>
      </div>
    </Content>
  );
};

export default MemeGenerator;
