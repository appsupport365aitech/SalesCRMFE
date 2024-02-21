import React from "react";
import { useRouter } from "next/router";
import { RightArrow } from "@/utils/AssetsHelper";
import Image from "next/image";

const SideItem = ({ img, title, open, id, list, route }: any) => {
  const { pathname, push } = useRouter();
  let currentRoute: any;
  let Curr = 0;
  if (list.length !== 0) {
    for (let i = 0; i < list.length; i++) {
      const curr = `/${route}/${list[i].route}`;
      if (curr === pathname) {
        currentRoute = curr;
        Curr = i;
        break;
      }
    }

    if (!currentRoute) {
      currentRoute = `/${route}/${list[0].route}`;
    }
  } else {
    currentRoute = `/${route}`;
  }
  const check = pathname === currentRoute;

  const [dropdown, setDropdown] = React.useState(false);
  return (
    <div
      className={`overflow-hidden duration-300 cursor-pointer flex-col flex  mt-[12px] h-[40px] relative `}
      style={{
        height: dropdown && open ? `${50 * (list.length + 1)}px` : `40px`,
      }}
    >
      {check && (
        <>
          <div
            className={`absolute left-[7.5px] bg-[#e8e9eb] duration-300 z-10 ease-out  ${
              !open ? "w-[40px] h-[40px] rounded-xl" : "w-[100%] h-[40px]"
            }`}
          />
          <div
            className={` bg-[#e8e9eb] h-[40px] absolute duration-100 z-10 ease-out
                ${open ? "left-0  w-[7.5px] border-l-[4px]" : " w-[0]"}
              `}
          />
        </>
      )}
      <div className={` flex items-center h-[40px] shrink-0 z-30`}>
        <Image
          src={img}
          alt=""
          className={`w-[30px] p-[6px] ml-[12px] mr-[12px] ${
            check ? "svg-selected" : "svg-not-selected"
          }`}
          onClick={() => {
            push(currentRoute);
          }}
          width={30}
          height={30}
          style={{
            objectFit: "contain",
          }}
        />
        <p
          className={`tracking-wider ${
            check ? "text-[#3F434A]" : "text-white"
          }  ml-[0px] font-medium text-[14px] inter`}
          onClick={() => {
            push(currentRoute);
          }}
        >
          {title}
        </p>
        {list.length !== 0 && (
          <>
            <div
              onClick={() => {
                setDropdown(!dropdown);
              }}
              className="absolute left-[210px] z-0  w-[24px] flex items-center justify-center h-[24px] "
            >
              <div
                className={`w-[16px] ${
                  !dropdown ? "" : "rotate-90"
                } duration-300 `}
              >
                <RightArrow renal={false} />
              </div>
            </div>
          </>
        )}
      </div>
      {dropdown && open && (
        <div className="w-[100%] min-h-[40px] left-[5px] ">
          {list.map((item: any, i: any) => {
            // const curr1 =
            //   `/${route}/${list[i].route}` === `/${route}/${list[Curr].route}`;
            const curr1 = `/${route}/${item.route}` === pathname;
            return (
              <>
                <div
                  className={`${
                    curr1 && "bg-[#e8e9eb]"
                  } flex items-center z-40 h-[40px] p-[5px] box-content`}
                >
                  <Image
                    src={"/Images/dots/Dot.svg"}
                    alt=""
                    className={`w-[20px] p-[6px] ml-[12px] mr-[18px] ${
                      curr1 ? "svg-selected" : "svg-not-selected"
                    }`}
                    width={20}
                    height={20}
                    onClick={() => {
                      push(`/${route}/${list[i].route}`);
                    }}
                  />
                  <p
                    className={`tracking-wider ${
                      curr1 ? "text-[#3F434A]" : "text-white"
                    } font-medium text-[14px] inter whitespace-nowrap`}
                    onClick={() => {
                      push(`/${route}/${list[i].route}`);
                    }}
                  >
                    {item.title}
                  </p>
                </div>
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SideItem;
