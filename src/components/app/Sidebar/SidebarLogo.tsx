import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="cursor-pointer w-[200px] bg-white flex items-center  ">
      <Image
        src="/Images/Logo/Compact.svg"
        alt=""
        className="w-[55px] px-[10px] "
        // fill={true}
        style={
          {
            // objectFit:"contain"
          }
        }
        width={55}
        height={40}
      />
      <p className="tracking-wide text-[#3F434A] ml-[10px] font-bold text-[16px] inter">
        No.1 Agent
      </p>
    </div>
  );
};

export default Logo;
