import { colors } from "@/constants/colors";
import React from "react";
import { getBasicIcon } from "../AssetsHelper";

const ButtonDropDown = ({ width, text, icon, light }: ButtonProps) => {
  const [clicked, setclicked] = React.useState(false);

  return (
    <div
      className={`${
        icon ? "pl-[32px]" : ""
      } h-[40px] ${light?"bg-white":"bg-renal-blue"} rounded-xl flex items-center justify-center cursor-pointer ml-[30px] pr-[32px] relative p-[10px]`}
      //   onMouseOver={()=>{
      //     setHover(true);
      //   }}
      //   onMouseOut={()=>{
      //     setHover(false);
      //   }}
      onClick={() => {
        setclicked(true);
      }}
    >
      {icon && (
        <div className="absolute left-3  w-[28px]">
          <div className={`w-[100%] p-[3px] rounded-md }`}>
            <img
              src={getBasicIcon(icon)}
              className={`w-[24px] ${light?"svg-dark":"svg-white"}`}
              alt=""
            />
          </div>
        </div>
      )}
      <p className={`tracking-wider font-medium text-[14px] pl-[20px] pr-[10px] ${light?"text-[#3F434A]":""} `}>
        {text}
      </p>
      <div className="absolute right-2  w-[24px]">
        <div
          className={`w-[100%] p-[3px] rounded-md ${clicked && "bg-[#263fca]"}`}
        >
          <img
            src={getBasicIcon("Arrow-Down 2")}
            className={`w-[24px] ${light?"svg-dark":"svg-white"}`}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default ButtonDropDown;

export interface ButtonProps {
  icon?: String;
  dropdown: Boolean | {};
  width?: Number;
  text: String;
  id: Number;
  light: Boolean;
}