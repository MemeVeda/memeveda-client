import { Select } from "antd";
import React, { useState } from "react";
import "./FontSelector.scss";

const FontSelector = () => {
  const { Option } = Select;
  const [value, setvalue] = useState("");
  const onChange = (val: string) => {
    setvalue(val);
  };
  return (
    <Select
      showSearch
      placeholder="Font(px)"
      onChange={onChange}
      //   onSearch={onSearch}
      // value={value}
      className="fontselector"
    >
      <Option value="2"> 2</Option>
      <Option value="4"> 4</Option>
      <Option value="6"> 6</Option>
      <Option value="10"> 10</Option>
      <Option value="12"> 12</Option>
      <Option value="14"> 14</Option>
      <Option value="16"> 16</Option>
      <Option value="20"> 20</Option>
    </Select>
  );
};

export default FontSelector;
