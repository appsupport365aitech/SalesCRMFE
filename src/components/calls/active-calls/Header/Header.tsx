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

const HeaderItem = ({ width, text, left, align, bold, color }: any) => {
  return (
    <div
      className={`flex items-center  h-[20px] shrink-0`}
      style={{ width: width, marginLeft: left }}
    >
      <p
        className="uppercase text-[12px] tracking-wider w-[100%]"
        style={{
          textAlign: align && "center",
          fontWeight: bold ? bold : 700,
          color: color ? color : "black",
        }}
      >
        {text}
      </p>
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
        <HeaderItem width={100} left={70} text={"CALL ID"} />
        <HeaderItem width={150} left={20} text={"CALL title"} />
        <HeaderItem width={90} left={10} text={"lead id"} />
        <HeaderItem width={200} left={10} text={"lead title"} />
        <HeaderItem width={120} left={20} text={"Company Name"} />
        <HeaderItem width={120} left={100} text={"Product/Service"} />
        <HeaderItem width={110} left={20} text={"participants"} />
        <HeaderItem width={100} left={20} text={"call owner"} />
        <HeaderItem width={100} left={20} text={"call Type"} />
        <HeaderItem width={130} left={20} text={"call date & time"} />
        {/* <HeaderItem width={120} left={10} text={"call duration"} /> */}
      </div>
    </div>
  );
};

export default Header;
