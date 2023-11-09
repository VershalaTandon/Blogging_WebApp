import React from "react";
import "./Input.css";

export interface Props {
  name?: string;
  type: string;
  placeholder?: string;
  handleChange: Function;
  value: string;
  isRequired: boolean;
  disabled?: boolean;
  style?: any;
  checked?: boolean;
}

export const Input = (props: Props) => {
  const {
    name,
    type,
    placeholder,
    handleChange,
    value,
    isRequired,
    disabled = false,
    style,
    checked,
  } = props;
  return (
    <div style={style} className='inputcontainer'>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={(value) => handleChange(value)}
        value={value}
        required={isRequired}
        className={name ? "" : disabled ? "disabledinput" : "input"}
        disabled={disabled}
        checked={checked}
      />
      {type === "radio" && name}
    </div>
  );
};
