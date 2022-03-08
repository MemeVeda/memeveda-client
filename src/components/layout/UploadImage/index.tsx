import { UploadOutlined } from "@ant-design/icons";
import { Upload, Button } from "antd";
import "./UploadImage.scss";

interface IProps {
  size?: number;
  className?: string;
  defaultIcon?: any;
  fileTypeValid?: boolean;
  setErrorMessage: Function;
  returnFileContent: Function;
  defaultImage?: string;
}

export default function UploadImage({
  size,
  fileTypeValid,
  setErrorMessage,
  returnFileContent,
}: IProps) {
  function beforeUpload(file: { type: string; size: number }) {
    const fileTypeValidLocal = fileTypeValid
      ? fileTypeValid
      : file.type === "image/jpeg" || file.type === "image/png";
    if (!fileTypeValidLocal) {
      console.error("You can only upload JPG/PNG file!");
      setErrorMessage("You can only upload JPG/PNG file!");
    }
    size = size ? size : 1;
    const sizeValid = file.size / 1024 / 1024 < size;
    if (!sizeValid) {
      console.error(`Image must be smaller than ${size}MB!`);
      setErrorMessage(`Image must be smaller than ${size}MB!`);
    }
    if (fileTypeValidLocal && sizeValid) {
      setErrorMessage("");
    }
    return fileTypeValidLocal && sizeValid;
  }

  const handleChange = (info: {
    file: { status?: any; name: any; originFileObj?: any };
  }) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageContent: any) => {
        returnFileContent(imageContent);
      });
      return;
    }
    if (info.file.status === "error") {
      console.error(`${info.file.name} file upload failed.`);
      setErrorMessage(`${info.file.name} file upload failed.`);
    }
  };

  function getBase64(img: any, callback: any) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const dummyRequest = (info: { file: any; onSuccess?: any }) => {
    setTimeout(() => {
      info.onSuccess("ok");
    }, 0);
  };

  return (
    <Upload
      name="avatar"
      showUploadList={true}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      customRequest={dummyRequest}
      listType="picture"
      maxCount={1}
    >
      <Button icon={<UploadOutlined />}>Click to upload</Button>
    </Upload>
  );
}
