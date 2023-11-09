import React from "react";
import "./DefaultButton.css";
import string from "../../constants/string";

export interface Props {
  styleType: string;
  buttonType: any;
  title: string;
  onPress: Function;
  style?: any;
}

export const DefaultButton = (props: Props) => {
  const { styleType, buttonType, title, onPress, style } = props;
  return (
    <button
      type={buttonType}
      className={
        styleType === string.ButtonType.Border
          ? "borderButton"
          : "noborderButton"
      }
      onClick={(e) => {
        if (onPress) {
          e.preventDefault();
          onPress();
        }
      }}
      style={style}>
      {title}
    </button>
  );
};
