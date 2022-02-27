import { Button } from "antd";
import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/src/ReactCrop.scss";
import { Image } from "antd";

interface CropType {
  unit: string;
  width: number;
  height: number;
  x: number;
  y: number;
}

const Cropper = () => {
  const [src, setfile] = useState(null);
  const [inputImage, setinputImage] = useState<HTMLImageElement>();
  const [crop, setCrop] = useState<CropType>(); //   { aspect: 16 / 9 }
  const [result, setResult] = useState("");

  const handleFileChange = (e: any) => {
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
    setResult(base64Image);
  };

  return (
    <div>
      <div>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
      {src && (
        <div>
          <ReactCrop
            src={src}
            onImageLoaded={setinputImage}
            crop={crop}
            onChange={setCrop}
          />
          <Button onClick={getCroppedImg}> Crop Image</Button>
        </div>
      )}

      {result && (
        <div>
          <Image src={result} crossOrigin="anonymous" />
        </div>
      )}
    </div>
  );
};

export default Cropper;
