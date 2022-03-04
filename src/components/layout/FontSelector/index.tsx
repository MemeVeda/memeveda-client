import { Select } from "antd";
import React, { useState } from "react";
import "./FontSelector.scss";

const FontSelector = (props:{size:string,onChange:Function}) => {
  const { Option } = Select;
 
  
  return (
    <Select
      showSearch
      placeholder="Font(px)"
      onChange={(val)=>props.onChange(val)}
      //   onSearch={onSearch}
      // value={value}
      className="fontselector"
      defaultValue={props.size}
    >
      <Option value="2"> 2</Option>
      <Option value="4"> 4</Option>
      <Option value="6"> 6</Option>
      <Option value="10"> 10</Option>
      <Option value="12"> 12</Option>
      <Option value="14"> 14</Option>
      <Option value="16"> 16</Option>
      <Option value="20"> 20</Option>
      <Option value="24"> 24</Option>
      <Option value="30"> 30</Option>
      <Option value="36"> 36</Option>
    </Select>
  );
};

export default FontSelector;
