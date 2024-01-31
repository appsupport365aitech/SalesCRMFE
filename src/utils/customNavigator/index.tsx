import React, { useState } from "react";

const Navigator = ({
  list,
  current,
  callback,
  width,
  justifyAround,
  borderBottom,
  coachingButton,
  coachingButton2,
}: any) => {
  const [activeTitle, setActiveTitle] = useState(current);
  const handleOnClick = (id: any) => {
    setActiveTitle(id);
    callback(id);
  };

  return (
    <>
      <div className={`${borderBottom == false ? "" : "border-b-2"}`}>
        <div
          className={`${width ? "w-[80%]" : "w-[100%]"}  flex  items-center  ${
            justifyAround ? "justify-around" : "justify-between"
          } ${
            coachingButton
              ? "bg-gray-200 w-fit h-fit rounded-2xl px-2 gap-2 my-2"
              : "px-[30px] pt-[20px]"
          }`}
        >
          {list?.map((item: any, i: any) => {
            return (
              <div
                className={
                  coachingButton || coachingButton2
                    ? ` cursor-pointer text-[20px] leading-[21px] font-medium ${
                        item?.id === activeTitle
                          ? "focus:outline-none text-white bg-[#fe5043ad] font-medium rounded-2xl text-md px-6 p-2 my-1"
                          : "text-black font-medium text-md"
                      }`
                    : ` cursor-pointer text-[20px] leading-[21px] font-medium text-[#595F69] ${
                        item?.id === activeTitle
                          ? "focus:outline-none text-white bg-[#fe5043ad] hover:bg-[#fe5043ad] font-medium rounded-lg text-md px-6 py-2 my-2"
                          : "text-black font-medium text-md hover:bg-[#fe5043ad] hover:text-w hover:rounded-lg hover:py-2.5 hover:px-5 hover:mt-2 hover:mb-2"
                      }`
                }
                key={i}
                onClick={() => handleOnClick(item?.id)}
              >
                <p
                  className={`text-[13px] tracking-wide ${
                    item?.id === activeTitle ? "text-[#fff]" : "text-[#000]"
                  }`}
                >
                  {item?.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navigator;
