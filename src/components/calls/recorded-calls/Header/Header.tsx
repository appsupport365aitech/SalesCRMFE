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
        className="uppercase text-[12px] font-medium tracking-wider w-[100%]"
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
        <HeaderItem width={120} left={70} text={"Call ID"} />
        <HeaderItem width={155} left={20} text={"Call title"} />
        <HeaderItem width={200} left={20} text={"Lead id"} />
        <HeaderItem width={240} left={-65} text={"Lead title"} />
        <HeaderItem width={220} left={40} text={"Company Name"} />
        <HeaderItem width={200} left={20} text={"Product/Service"} />
        <HeaderItem width={200} left={20} text={"Participants"} />
        <HeaderItem width={100} left={20} text={"Call owner"} />
        <HeaderItem width={130} left={20} text={"Call type"} />
        <HeaderItem width={120} left={10} text={"Call Date/Time"} />
        <HeaderItem width={120} left={10} text={"Duration"} />
        {/* <HeaderItem width={160} left={10} text={"Call Disposition"} /> */}
        <HeaderItem width={120} left={10} text={"Call Score"} />
      </div>
    </div>
  );
};

export default Header;
