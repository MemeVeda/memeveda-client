import { UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "./UploadButton.scss";

const UploadButton = (props: {
  handleFileChange: Function;
  id: string;
  name: string;
}) => {
  const handleClick = () => {
    let input = document.getElementById(props.id);
    if (input) input.click();
  };
  return (
    <>
      <Button
        className="custom-file-input"
        type="primary"
        onClick={handleClick}
        icon={<UploadOutlined />}
      >
        {props.name}
      </Button>
      <input
        type="file"
        accept="image/jpeg"
        onChange={(e) => props.handleFileChange(e)}
        style={{ display: "none" }}
        id={props.id}
      />
    </>
  );
};

export default UploadButton;
