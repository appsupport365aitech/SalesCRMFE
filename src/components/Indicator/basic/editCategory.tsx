import { getBasicIcon } from "@/utils/AssetsHelper";
import SimpleButton from "@/utils/Button/SimpleButton";
import Image from "next/image";
import React, { useState } from "react";

const AddText = ({ title, place, change, value }: any) => {
  return (
    <div className="w-[100%]  mb-[15px]">
      <p className="w-[100%] text-[#8A9099] font-medium tracking-wide mb-[8px]">
        {title}
      </p>
      <input
        onChange={change}
        className="w-[100%] h-[41px] rounded-[14px] bg-transparent border-[2px] border-[#e4e4e4] text-[#3F434A] px-[14px] outline-none text-[14px] font-medium tracking-wide"
        type="text"
        value={value}
        placeholder={place}
        id=""
        name=""
      />
    </div>
  );
};

const EditCategory = ({ cancel, submit, value, onChange }: any) => {
  console.log(value, "arijit");

  return (
    <div className="w-[100%] h-[100%] py-[10px] pl-[30px] pr-[40px]  relative">
      <h1 className="text-[#3f434a] text-[31px] font-medium mb-[24px] tracking-[1px]">
        Edit Indicator Category
      </h1>
      <div
        className="w-[30px] h-[30px] cursor-pointer rounded-xl absolute top-[20px] right-[30px] flex items-center justify-center bg-[#f8f8f8]"
        onClick={() => {
          cancel();
        }}
      >
        <Image
          className="w-[15px] h-[15px]"
          src={getBasicIcon("Cross")}
          width={15}
          height={15}
          alt=""
        />
      </div>
      <AddText
        title="Indicator Category Name"
        place={"Indicator Category Name"}
        name="indicator_category"
        value={value}
        change={onChange}
      />{" "}
      <div className="w-[100%] mt-12 flex justify-end">
        <SimpleButton
          theme={1}
          click={submit}
          text={"Save"}
          left={20}
          right={0}
        />
      </div>
    </div>
  );
};

export default EditCategory;
