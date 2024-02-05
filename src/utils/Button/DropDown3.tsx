import { colors } from "@/constants/colors";
import Image from "next/image";
import React from "react";
import { getBasicIcon } from "../AssetsHelper";
import { title } from "process";

const DropDown = ({
  children,
  list,
  direction,
  value,
  onClick,
  close,
}: any) => {
  return (
    <div
      className={`px-[8px] pt-[8px] pb-[3px] flex flex-col min-h-[30px] rounded-[10px] bg-white absolute  drop-shadow-2xl z-10 right-0 
        max-h-[200px]
        overflow-y-auto
        hide-scrollbar
        top-[50px]
        `}
      style={{
        zIndex: 100000000000,
      }}
    >
      {children}
    </div>
  );
};

const DropDown3 = ({
  text,
  icon,
  border,
  light,
  dark,
  height,
  list,
  dropdown,
  click,
  onClick1,
  value,
  width,
  dropDirection,
  children,
}: any) => {
  const [clicked, setclicked] = React.useState(false);
  const [mouseOver, setMouseOver] = React.useState(false);
  const [curr, setCurr] = React.useState<Number | undefined>(value);
  const onPointerDown = () => {
    if (!mouseOver) {
      setclicked(false);
    }
  };
  React.useEffect(() => {
    document.addEventListener("pointerdown", onPointerDown, false);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, false);
    };
  });

  const onClick = (prev: Number, current: Number) => {
    setTimeout(() => {
      setclicked(false);
    }, 100);
    document.removeEventListener("pointerdown", onPointerDown, false);
    if (click) {
      setTimeout(() => {
        click(prev, current);
      }, 200);
    }
    setCurr(current);
  };

  return (
    <div
      data-dropdown-toggle="dropdown"
      className={`${icon ? "pl-[0px]" : ""} ${
        border ? "border-[1px] border-[#8f8f8f]" : ""
      } ${
        light
          ? ""
          : dark && text !== "View"
          ? "bg-[#909193] hover:bg-[#999999]"
          : text == "View"
          ? "bg-[#434343] hover:bg-[#2e2d2d]"
          : "bg-bg-red hover:bg-[#ff7d6d]"
      } rounded-xl flex items-center justify-center cursor-pointer ml-[30px] pr-[32px]  p-[10px] relative`}
      onMouseOver={() => {
        setMouseOver(true);
      }}
      onMouseOut={() => {
        setMouseOver(false);
      }}
      onClick={() => {
        if (onClick1) {
          onClick1();
        }
        if (mouseOver) setclicked(true);
      }}
      style={{
        height: height ? `${height}px` : "40px",
        width: width ? `${width}px` : "initial",
      }}
    >
      {dropdown ? (
        clicked && (
          <DropDown
            value={curr}
            onClick={onClick}
            close={() => {
              setclicked(false);
            }}
            list={list}
          >
            {children}
          </DropDown>
        )
      ) : (
        <></>
      )}
      {icon?.length && (
        <div className=" right-3  w-[28px]">
          <div className={`w-[100%] p-[3px] rounded-md }`}>
            <Image
              src={getBasicIcon(icon)}
              className={`w-[24px] ${light ? "svg-dark" : "svg-white"}`}
              alt=""
              width={24}
              height={24}
              style={{
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      )}
      {text.length > 0 && (
        <p
          className={`whitespace-nowrap tracking-wider font-medium text-[14px] ${
            light ? "pl-[4px] pr-[4px]" : "pl-[20px] pr-[10px]"
          } ${light ? "text-[#3F434A]" : "text-[#ffffff]"} `}
        >
          {text}
        </p>
      )}
      {list?.length !== 0 && (
        <div className={` ${light ? "w-[16px]" : " w-[24px]"} `}>
          <div
            className={`w-[100%] ${light ? "p-[1px]" : "p-[3px]"} rounded-md ${
              clicked && (light ? "bg-[#eeeeee]" : "")
            } `}
          >
            <Image
              src={getBasicIcon("Arrow-Down 2")}
              className={`w-[24px] ${light ? "svg-dark" : "svg-white"}`}
              alt=""
              width={24}
              height={24}
              style={{
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown3;
