import React, { useRef, useState } from "react";

const Tracker = ({ color, title, list, uppercase }: any) => {
  const ref: any = useRef();
  const [width, setWidth] = useState<any>();
  React.useEffect(() => {
    const onChange = () => {
      if (ref) {
        setWidth(ref.current?.offsetWidth);
      }
    };
    window.addEventListener("resize", onChange);
    onChange();
  }, []);

  return (
    <div className="w-full px-[38px] my-[24px]">
      <h1
        className={` text-[14px] font-medium ${
          !uppercase ? uppercase : ""
        }uppercase`}
        style={{
          color: color,
        }}
      >
        {title}
      </h1>
      <div
        className="w-[100%] bg-[#efefef]  h-[11px] mt-[5px] relative "
        ref={ref}
      >
        {list.map((item: any, i: any) => {
          return (
            <div
              className="h-[11px] absolute "
              key={i}
              style={{
                width: `${(item.duration / width) * 100}px`,
                backgroundColor: color,
                top: 0,
                left: `${(item.at / width) * 100}px`,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default Tracker;
