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

interface IProps {
  src: any;
  onImageLoaded: Function;
  crop?: CropType;
  onChange: Function;
  inputImage: HTMLImageElement;
}
const CropImage: React.FC<IProps> = ({
  src,
  onImageLoaded,
  crop,
  onChange,
  inputImage,
}) => {
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
  };

  return (
    <ReactCrop
      src={src}
      onImageLoaded={onImageLoaded}
      crop={crop}
      onChange={onChange}
    />
  );
};

export default CropImage;
