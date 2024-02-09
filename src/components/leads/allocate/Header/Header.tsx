import { getBasicIcon } from "@/utils/AssetsHelper";
import Image from "next/image";
import React from "react";

const HeaderCheckBox = ({ width, click }: any) => {
  return (
    <div
      className={`flex items-center justify-center h-[20px] shrink-0 `}
      style={{ width: width, flexShrink: "unset" }}
    >
      <input
        onChange={() => {
          click();
        }}
        type="checkbox"
        className="checkbox"
      />
    </div>
  );
};

const HeaderItem = ({
  width,
  text,
  left,
  align,
  sort,
  onClick,
  showArrowDown,
}: any) => {
  return (
    <div
      className={`flex items-center  h-[20px] shrink-0`}
      style={{ width: width, marginLeft: left }}
    >
      {/* change the color from #000 to #222 */}
      <p
        className="text-[#222] uppercase text-[12px] font-bold tracking-wider w-[100%] "
        style={{
          textAlign: align && "center",
        }}
      >
        {text}
      </p>
      {showArrowDown && (
        <Image
          src={getBasicIcon("Arrow Down 3")}
          width={20}
          className="ml-[3px] cursor-pointer"
          height={20}
          alt=""
          onClick={() => {
            if (onClick) {
              onClick();
            }
          }}
        />
      )}
    </div>
  );
};

const Header = ({ selectAll, win, deal, budget }: any) => {
  return (
    <div className="flex">
      <div className=" pl-[10px] h-[40px] flex items-center grow border-[#ccc] border-b-[1px]  ">
        <HeaderCheckBox
          width={30}
          click={() => {
            selectAll();
          }}
        />
        <HeaderItem width={50} left={0} text={""} />
        <HeaderItem
          className="decoration-red-50"
          width={150}
          left={70}
          text={"LEAD ID"}
        />
        <HeaderItem width={335} left={0} text={"Lead title"} />
        <HeaderItem width={130} left={20} text={"COMPANY"} />
        <HeaderItem width={120} left={40} text={"CLIENT POC"} />
        <HeaderItem width={200} left={60} text={"Contact"} />
        <HeaderItem width={120} left={10} text={"lead status"} />
        <HeaderItem width={120} left={10} text={"lead stage"} />
        <HeaderItem width={150} left={10} text={"product/service"} />
        {/* <HeaderItem width={130} left={20} text={"Lead Allocated To"} /> */}
        {/* <HeaderItem width={130} left={20} text={"Lead Allocated On"} /> */}
        {/* <HeaderItem width={130} left={20} text={"Lead Allocated By"} /> */}
        <HeaderItem width={130} left={20} text={"Lead Allocation Status"} />
        <HeaderItem width={130} left={20} text={"Lead Created On"} />
      </div>
    </div>
  );
};

export default Header;
