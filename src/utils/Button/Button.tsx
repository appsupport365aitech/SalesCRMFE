import { colors } from "@/constants/colors";
import Image from "next/image";
import React from "react";
import { getBasicIcon } from "../AssetsHelper";
import DropDown from "./DropDown";
import { title } from "process";
import { BsKanban } from "react-icons/bs";

const ButtonDropDown = ({
  text,
  icon,
  border,
  light,
  dark,
  height,
  tight,
  list,
  dropdown,
  click,
  onClick1,
  value,
  width,
  dropDirection,
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
      className={`${icon ? "pl-[1px]" : ""} ${
        border ? "border-[1px] border-[#8f8f8f]" : ""
      } ${
        light
          ? ""
          : dark && text !== "View"
          ? "bg-[#909193] hover:bg-[#999999]"
          : text == "View"
          ? "bg-[#434343] hover:bg-[#2e2d2d]"
          : "bg-bg-red hover:bg-[#ff7d6d]"
      } rounded-xl flex items-center justify-center cursor-pointer ml-[30px]   p-[8px] relative`}
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
        list.length !== 0 ? (
          clicked && (
            <DropDown
              value={curr}
              onClick={onClick}
              close={() => {
                setclicked(false);
              }}
              direction={dropDirection}
              list={list}
            />
          )
        ) : (
          <></>
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
      {text?.length > 0 && (
        <p
          className={`whitespace-nowrap tracking-wider font-medium text-[14px] ${
            light ? "pl-[4px] pr-[4px]" : "px-[6px]"
          } ${light ? "text-[#3F434A]" : "text-[#ffffff]"} `}
        >
          {text}
        </p>
      )}

      {/* {text == "View" && (
        <div className={` ${light ? "w-[16px]" : " w-[24px]"} `}>
          <div
            className={`flex gap-2 w-[100%] ${
              light ? "p-[1px]" : "p-[3px]"
            } rounded-md ${clicked && (light ? "bg-[#eeeeee]" : "")} `}
          >
            <Image
              src={getBasicIcon("bi_kanban")}
              className={`w-[24px] ${light ? "svg-dark" : "svg-white"}`}
              alt=""
              width={24}
              height={24}
              style={{
                objectFit: "contain",
              }}
            />
            <Image
              src={getBasicIcon("bi_list")}
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
      )} */}
      {list?.length !== 0 && (
        <div className={` ${light ? "w-[16px]" : " w-[fit]"} `}>
          <div
            className={`w-[100%] ${light ? "p-[1px]" : "p-[3px]"} rounded-md ${
              clicked && (light ? "bg-[#eeeeee]" : "")
            } `}
          >
            {text === "View" ? (
              <div
                className="flex gap-2 justify-center items-center
              "
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.5039 3H3.50391C2.67548 3 2.00391 3.67157 2.00391 4.5V19.5C2.00391 20.3284 2.67548 21 3.50391 21H20.5039C21.3323 21 22.0039 20.3284 22.0039 19.5V4.5C22.0039 3.67157 21.3323 3 20.5039 3Z"
                    stroke={!curr ? "white" : "#909193"}
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2.00391 7.00049H22.0039M10.0039 12.0005H18.0039M10.0039 16.0005H18.0039M6.00391 12.0005H7.00391M6.00391 16.0005H7.00391"
                    stroke={!curr ? "white" : "#909193"}
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_671_32786)">
                    <path
                      d="M20.25 1.5C20.6478 1.5 21.0294 1.65804 21.3107 1.93934C21.592 2.22064 21.75 2.60218 21.75 3V21C21.75 21.3978 21.592 21.7794 21.3107 22.0607C21.0294 22.342 20.6478 22.5 20.25 22.5H3.75C3.35218 22.5 2.97064 22.342 2.68934 22.0607C2.40804 21.7794 2.25 21.3978 2.25 21V3C2.25 2.60218 2.40804 2.22064 2.68934 1.93934C2.97064 1.65804 3.35218 1.5 3.75 1.5H20.25ZM3.75 0C2.95435 0 2.19129 0.316071 1.62868 0.87868C1.06607 1.44129 0.75 2.20435 0.75 3V21C0.75 21.7956 1.06607 22.5587 1.62868 23.1213C2.19129 23.6839 2.95435 24 3.75 24H20.25C21.0456 24 21.8087 23.6839 22.3713 23.1213C22.9339 22.5587 23.25 21.7956 23.25 21V3C23.25 2.20435 22.9339 1.44129 22.3713 0.87868C21.8087 0.316071 21.0456 0 20.25 0L3.75 0Z"
                      fill={curr ? "white" : "#909193"}
                    />
                    <path
                      d="M9.75 4.5C9.75 4.10218 9.90804 3.72064 10.1893 3.43934C10.4706 3.15804 10.8522 3 11.25 3H12.75C13.1478 3 13.5294 3.15804 13.8107 3.43934C14.092 3.72064 14.25 4.10218 14.25 4.5V9C14.25 9.39782 14.092 9.77936 13.8107 10.0607C13.5294 10.342 13.1478 10.5 12.75 10.5H11.25C10.8522 10.5 10.4706 10.342 10.1893 10.0607C9.90804 9.77936 9.75 9.39782 9.75 9V4.5ZM3.75 4.5C3.75 4.10218 3.90804 3.72064 4.18934 3.43934C4.47064 3.15804 4.85218 3 5.25 3H6.75C7.14782 3 7.52936 3.15804 7.81066 3.43934C8.09196 3.72064 8.25 4.10218 8.25 4.5V15C8.25 15.3978 8.09196 15.7794 7.81066 16.0607C7.52936 16.342 7.14782 16.5 6.75 16.5H5.25C4.85218 16.5 4.47064 16.342 4.18934 16.0607C3.90804 15.7794 3.75 15.3978 3.75 15V4.5ZM15.75 4.5C15.75 4.10218 15.908 3.72064 16.1893 3.43934C16.4706 3.15804 16.8522 3 17.25 3H18.75C19.1478 3 19.5294 3.15804 19.8107 3.43934C20.092 3.72064 20.25 4.10218 20.25 4.5V19.5C20.25 19.8978 20.092 20.2794 19.8107 20.5607C19.5294 20.842 19.1478 21 18.75 21H17.25C16.8522 21 16.4706 20.842 16.1893 20.5607C15.908 20.2794 15.75 19.8978 15.75 19.5V4.5Z"
                      fill={curr ? "white" : "#909193"}
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_671_32786">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonDropDown;
