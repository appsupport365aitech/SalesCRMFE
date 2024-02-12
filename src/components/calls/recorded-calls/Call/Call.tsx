import { setCurrent } from "@/store/UI";
import { getBasicIcon } from "@/utils/AssetsHelper";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import BackdropRight from "@/components/View/Backdrop/Right";
import { convertDatetime } from "@/components/activeCalls/Script/index.";
import DescBoxAudioPlayer from "@/components/activeCalls/audio/components/DescBoxAudioPlayer";
import { baseUrl } from "@/utils/baseUrl";

const CallBox = ({
  width,
  bool,
  handleCheck = (checked: boolean) => {},
}: any) => {
  const [check, setCheck] = useState(false);
  React.useEffect(() => {
    if (check) {
      if (bool) {
        ref.current.checked = true;
      } else {
        ref.current.checked = false;
      }
    }
    setCheck(true);
  }, [bool]);
  const ref: any = useRef();
  return (
    <div
      className={`flex items-center justify-center h-[20px] shrink-0 `}
      style={{ width: width, flexShrink: "unset" }}
    >
      <input
        type="checkbox"
        ref={ref}
        className="checkbox"
        onChange={(e: any) => handleCheck(e.target.checked)}
      />
    </div>
  );
};

const CallItem = ({
  width,
  text,
  secondaryText,
  left,
  align,
  textLeft,
  link,
  click,
  route,
  color,
  bold,
  img,
  onClick,
}: any) => {
  const router = useRouter();

  return (
    <div
      className={`flex items-center  h-[20px] shrink-0`}
      style={{ width: width, marginLeft: left, cursor: img && "pointer" }}
      onClick={() => {
        if (img) {
          if (click) {
            router.push(route);
          }
          if (onClick) {
            onClick();
          }
        }
      }}
    >
      {img && (
        <Image
          src={img}
          alt=""
          width={20}
          onClick={() => {
            if (onClick) {
              onClick();
            }
            if (click) {
              router.push(route);
            }
          }}
          height={20}
          className="w-[20px] mr-[5px] ml-[10px] cursor-pointer"
        />
      )}
      {link ? (
        <a
          className="text-[#8A9099] text-[13px]  tracking-wide "
          style={{
            textAlign: align && "center",
            marginLeft: textLeft && `${textLeft}px`,
          }}
        >
          {text ? text : "-"}
          {secondaryText && (
            <>
              <br />
              <span className="text-gray-500">{secondaryText}</span>
            </>
          )}
        </a>
      ) : (
        <p
          className="text-[#8A9099] overflow-hidden text-[13px] tracking-wide cursor-pointer"
          style={{
            textAlign: align && "center",
            marginLeft: textLeft && `${textLeft}px`,
            fontWeight: bold ? bold : 500,
            color: color ? color : "#8A9099",
          }}
          onClick={() => {
            if (onClick) {
              onClick();
            }
            if (click) {
              router.push(route);
            }
          }}
        >
          {text ? text : "-"}
          {secondaryText && (
            <>
              <br />
              <span className="text-gray-500">{secondaryText}</span>
            </>
          )}
        </p>
      )}
    </div>
  );
};

const CallItemMultiple = ({
  width,
  upperText,
  bottomText,
  left,
  bold,
  align,
  click,
  route,
}: any) => {
  const { push } = useRouter();
  return (
    <div
      className={`flex justify-between flex-col h-[34px] shrink-0 cursor-pointer`}
      style={{ width: width, marginLeft: left }}
      onClick={() => {
        if (click) {
          push(route);
        }
      }}
    >
      <p
        className={`text-[12px] tracking-wide font-medium ${
          bold ? "text-[#3F434A]" : "text-[#8A9099]"
        }`}
        style={{
          textAlign: align && "center",
        }}
      >
        {upperText ? upperText : "-"}
      </p>
      <p
        className="text-[#8A9099] font-medium text-[12px] flex tracking-wide "
        style={{
          textAlign: align && "center",
        }}
      >
        {bottomText ? bottomText : "-"}
      </p>
    </div>
  );
};

// const QuickActions = ({ width, left }: any) => {
//   return (
//     <div
//       className={`flex  h-[18px] item-center shrink-0`}
//       style={{ width: width, marginLeft: left }}
//     >
//       <img
//         src={getBasicIcon("Phone")}
//         alt=""
//         className="mr-[4px] cursor-pointer"
//       />
//       <img
//         src={getBasicIcon("Mail")}
//         alt=""
//         className="mr-[4px] cursor-pointer"
//       />
//       <img
//         src={getBasicIcon("Calendar")}
//         alt=""
//         className="mr-[4px] cursor-pointer"
//       />
//       <img
//         src={getBasicIcon("Tasks")}
//         alt=""
//         className="mr-[4px] cursor-pointer"
//       />
//       <img
//         src={getBasicIcon("Chat")}
//         alt=""
//         className="mr-[4px] cursor-pointer"
//       />
//     </div>
//   );
// };

const ExpandingIcon = ({ change, show = false }: any) => {
  return (
    <div className="w-[50px] flex items-center justify-center cursor-pointer">
      {!show ? (
        <Image
          onClick={() => {
            change(true);
          }}
          src={"/plus-circle.svg"}
          alt=""
          width={15}
          height={15}
        />
      ) : (
        <Image
          onClick={() => {
            change(false);
          }}
          src={"/minus-circle.svg"}
          alt=""
          width={15}
          height={15}
        />
      )}
    </div>
  );
};

const CallHolder = () => {
  return (
    <div className="w-[25px]  h-[25px] flex shrink-0 drop-shadow-md  absolute items-center cursor-pointer justify-center  top-[-10px] right-[-10px] ">
      <Image
        src={getBasicIcon("CallPlay")}
        style={{
          zIndex: 10,
        }}
        alt=""
        width={25}
        height={25}
      />
    </div>
  );
};

const CallPlayer = () => {
  return (
    <div className="w-[400px] h-[100px] mt-[20px] ml-[70px]">
      <p className="text-[15px] font-medium tracking-wide text-[#000]">
        Call Player
      </p>
      <div className="w-[100%]  h-[4px] mt-[10px] flex bg-[#fff] relative rounded-[3px]">
        <div className="h-[100%] w-[40%] bg-bg-red rounded-l-[3px] relative">
          <CallHolder />
        </div>
        <div className="absolute text-[#8A9099] top-[10px] right-[3px] text-[11px] tracking-wide font-medium ">
          15:53/30:00
        </div>
      </div>
      <div className="w-[100%] mt-[15px] flex justify-center items-center">
        <Image
          src={getBasicIcon("playRev")}
          style={{
            zIndex: 10,
          }}
          alt=""
          width={13}
          height={13}
          className="mr-[9px] cursor-pointer"
        />
        <Image
          src={getBasicIcon("playBtn")}
          style={{
            zIndex: 10,
          }}
          className="translate-y-[1px] cursor-pointer"
          alt=""
          width={40}
          height={40}
        />
        <Image
          src={getBasicIcon("playFor")}
          style={{
            zIndex: 10,
          }}
          className="ml-[8px] cursor-pointer"
          alt=""
          width={13}
          height={13}
        />
      </div>
    </div>
  );
};

// const ExpandableRow = ({
//   CallDesc,
//   callMatrics,
//   engagingQuestions,
//   height,
// }: any) => {
//   return (
//     <div
//       className="w-[100%] h-[100%] flex px-[110px] py-[10px] duration-300"
//       style={{ height: height }}
//     >
//       <div className="w-[300px]">
//         <p className="text-[16px] text-[#000] font-medium">Call Description</p>
//         <p className="text-[#8A9099] font-medium mt-[5px] text-[14px] tracking-wide">
//           {CallDesc}
//         </p>
//       </div>
//       <div className="w-[180px] ml-[50px]">
//         <p className="text-[16px] text-[#000] font-medium">Call Metrics</p>
//         {callMatrics.map((item: any, i: any) => {
//           return (
//             <div className="flex justify-between items-center mt-[3px]" key={i}>
//               <p className="text-[#000] font-medium mt-[2px] text-[13px] tracking-wide">
//                 {item.title}
//               </p>
//               <p
//                 key={i}
//                 className="text-[#8A9099] font-medium mt-[2px] text-[13px] tracking-wide"
//               >
//                 {item.data}
//               </p>
//             </div>
//           );
//         })}
//       </div>

//       <div className="flex h-[20px]  justify-between items-center w-[200px] mt-[40px] ml-[60px]">
//         <p className="text-[#000] font-medium mt-[2px] text-[13px] tracking-wide">
//           Engaging Questions
//         </p>
//         <p className="text-[#8A9099] font-medium mt-[2px] text-[13px] tracking-wide">
//           {engagingQuestions}
//         </p>
//       </div>
//       <CallPlayer />
//     </div>
//   );
// };

const ExpandableRow = ({
  CallDesc,
  callMatrics,
  audioPlayerData,
  engagingQuestions,
  height,
  handleClose,
}: any) => {
  return (
    <div
      className="custom-scroll-black w-[100%] h-[100vh] py-[30px] px-[20px] overflow-y-auto pl-10"
      style={{
        zIndex: 100000000000000,
      }}
    >
      <div className="w-[100%] text-black mb-[20px]">
        <div className="flex items-center justify-end pr-6">
          <button
            className="w-[30px] h-[30px] cursor-pointer rounded-xl flex items-center justify-center bg-[#eeeeee]"
            onClick={handleClose}
          >
            <img
              alt="close"
              loading="lazy"
              className="w-[15px] h-[15px]"
              src="/Images/Icons/Basic/Cross.svg"
            />
          </button>
        </div>
        <div>
          <h2 className="text-[18px] font-medium pt-4">Call Details</h2>
          <ul className="w-full">
            {callMatrics?.map((item: any) => (
              <li
                key={item.title}
                className="flex justify-between items-center"
              >
                <h3 className="text-[#909193] text-[14px] font-[500]">
                  {item.title}
                </h3>
                <p
                  className="text-[#434343] text-[14px] font-[500] w-[120px]
                "
                >
                  {item.data}
                </p>
              </li>
            ))}
          </ul>
          {/* <ul className="w-full">
            {callMatrics.map((item: any) => (
              <li
                key={item.title}
                className="flex justify-between items-center"
              >
                <h3 className="text-[#909193] text-[14px] font-[500]">
                  {item.title}
                </h3>
                <p
                  className="text-[#434343] text-[14px] font-[500] w-[120px]
                "
                >
                  {item.data}
                </p>
              </li>
            ))}
          </ul> */}
        </div>
      </div>
      {/* <div className="w-[100%] flex flex-col justify-between">
        {callMatrics.map((item: any, i: any) => {
          return (
            <div className="flex justify-between items-center mt-[3px]" key={i}>
              <p className="text-[#8A9099] font-medium mt-[2px] text-[14px] tracking-wide">
                {item.title}
              </p>
              <p
                key={i}
                className="text-[#000] font-medium mt-[2px] text-[14px] tracking-wide"
              >
                {item.data}
              </p>
            </div>
          );
        })}
      </div> */}

      <div className="w-[100%] mb-[20px]">
        <h3 className="w-[200px] text-[16px] text-[#3F434A] font-medium">
          Call Description
        </h3>
        <p className="text-[#585858] font-medium mt-[5px] text-[16px] tracking-wide">
          {CallDesc}
        </p>
      </div>
      <div>
        <h3 className="w-[200px] text-[16px] text-[#3F434A] font-medium">
          Call Player
        </h3>
        <DescBoxAudioPlayer src={audioPlayerData} />
      </div>
      {/* <div>
        <h3 className="w-[200px] text-[16px] text-[#3F434A] font-medium">
          Call Player
        </h3>
      </div> */}
    </div>
  );
};

const ParticipantsHover = ({ last, bounding, data }: any) => {
  return (
    <div
      className="bg-[#E8E9EB] max-w-[240px] flex flex-col items-center pb-[40px] rounded-[15px] fixed py-[13px] px-[15px]  right-[10px] drop-shadow-sm"
      style={{
        zIndex: 10000000000000,
        // top: !last ? "30px" : "",
        // right: "10px",
        // bottom: last ? "30px" : "",
        top: last ? bounding?.top - 50 : bounding?.top + 30,
        left: bounding?.left + 120,
      }}
    >
      <p className="text-[#000] w-[100%] text-[15px] font-medium">
        Call Participants
      </p>
      {data?.owners?.map((item: any, i: number) => {
        return (
          <p
            key={i}
            className={`${
              i === 0 ? "text-[#000] mt-[19px]" : "text-bg-red"
            } text-[13px] ml-[2px]  w-[100%] font-medium`}
          >
            {item.name} {"("}
            {item.designation}
            {")"}
          </p>
        );
      })}
    </div>
  );
};

const CallContainer = ({ id, CallData, last, selectAll }: any) => {
  const { pathname, push } = useRouter();
  const [detailShow, setDetailShow] = useState(false);

  const [w, setW] = useState(0);
  const wRef: any = useRef();

  React.useEffect(() => {
    if (wRef.current) {
      setW(wRef.current?.offsetWidth);
    }
  });

  const [hover, setHover] = useState(false);
  const [bounding, setBounding] = useState({ top: 0, left: 0 });
  const ref: any = useRef();
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(true);
  const [accessToken, setAccessToken] = useState<any>("");
  const [selected, setSelected] = useState<boolean>(false);

  useEffect(() => {
    if (window !== undefined) {
      setAccessToken(localStorage.getItem("access-token"));
    }
  }, []);

  const GetLeadData = () => {
    if (CallData?.leadId?.length > 0) {
      axios
        .get(`${baseUrl}api/leads/find-by-id?id=${CallData.leadId[0]._id}`, {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((e: any) => {
          setChecked(false);
        })
        .catch((e) => {});
    }
  };

  React.useEffect(() => {
    if (checked) {
      GetLeadData();
      setChecked(false);
    }
  }, [accessToken]);

  function calculateTimeDifference(startTime: any, endTime: any) {
    if (startTime && endTime) {
      const startDateTime: any = new Date(startTime);
      const endDateTime: any = new Date(endTime);

      const timeDifference = Math.abs(endDateTime - startDateTime);
      const minutes = Math.floor(timeDifference / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      return `${minutes ? `${minutes}min` : ""}${
        seconds ? ` ${seconds}sec` : ""
      }`;
    } else {
      return "-";
    }
  }

  const getFormattedDate = () => {
    const initialDate = new Date(CallData?.createdAt);

    // Get day, month, and year components from the Date object
    const day = initialDate.getDate();
    const month = initialDate.toLocaleString("default", { month: "long" });
    const year = initialDate.getFullYear();

    // Construct the desired date format
    const convertedDateStr = `${day} ${month} ${year}`;

    return convertedDateStr;
  };

  const getFormattedTime = () => {
    const initialDate = new Date(CallData?.createdAt);

    // Get day, month, and year components from the Date object
    const day = initialDate.getDate();
    const month = initialDate.toLocaleString("default", { month: "long" });
    const year = initialDate.getFullYear();

    // Construct the desired date format
    const convertedDateStr = `${day} ${month} ${year}`;

    const initialTime = CallData?.createdAt;

    // Splitting the time string into hours and minutes
    const [hours, minutes] = initialTime.split(":");

    // Convert hours to a number
    const parsedHours = parseInt(hours, 10);

    // Determine if it's AM or PM based on the hours
    const period = parsedHours >= 12 ? "pm" : "am";

    // Convert hours to 12-hour format
    const twelveHourFormat = parsedHours % 12 || 12; // Convert 0 to 12 for midnight

    // Construct the formatted time string
    const formattedTime = `${twelveHourFormat}${
      minutes != undefined ? ":" : ""
    }${minutes != undefined ? minutes : ""} ${period}`;

    return formattedTime;
  };
  function convertDatetimeToCustomFormat(dateStr: any) {
    // Convert the string to a Date object
    const dt: any = new Date(dateStr);

    // Calculate the number of seconds since January 1, 1400 (Iranian calendar)
    const referenceDate: any = new Date("1400-01-01T00:00:00Z");
    const secondsDifference = Math.floor((dt - referenceDate) / 1000);

    return secondsDifference;
  }

  return (
    <>
      <div className="flex">
        <div
          className={`pl-[10px] h-[50px] flex items-center grow border-[#ccc] border-b-[1px] hover:bg-white ${
            (selectAll || selected || detailShow) && "bg-white"
          }`}
          ref={wRef}
        >
          <CallBox
            width={30}
            bool={selectAll || selected}
            handleCheck={(checked: any) => {
              setSelected(checked);
              console.log("CHECKED", checked);
            }}
          />
          <ExpandingIcon
            change={(e: any) => {
              setDetailShow(e);
            }}
            showProp={detailShow}
          />
          <CallItem
            width={200}
            left={20}
            text={
              CallData?.callData?.[0]?._id
                .split("")
                .filter((dig: any) => /\d/.test(dig))
                .join("")
                .slice(-4) || "-"
            }
            color={"#000"}
            click={true}
            route={`${pathname}/${id}/audio-call`}
          />
          <CallItem
            width={130}
            left={20}
            color={"#000"}
            // text={"Discussion on PX features"}
            text={CallData?.callData?.[0]?.call_title || "-"}
            click={true}
            // route={`${pathname}/${id}/audio-call`}
          />
          <CallItem
            width={200}
            left={10}
            text={
              CallData?.leadId?.length > 0 ? CallData?.leadId?.[0]?.leadId : "-"
            }
            click={true}
            route={`/sales/open/${
              CallData?.leadId?.length > 0 && CallData?.leadId?.[0]?._id
            }/lead-profile`}
            color={"#000"}
          />
          <CallItem
            width={240}
            left={-65}
            text={CallData?.leadId?.[0]?.lead_title}
            click={true}
            route={`/sales/open/${CallData?.leadId?.[0]?._id}/lead-profile`}
            color={"#000"}
          />
          <CallItem
            width={220}
            left={40}
            text={CallData?.company?.[0]?.company_name}
            secondaryText={
              CallData?.company?.[0]?.company_address ||
              CallData?.company?.[0]?.company_location
            }
            click={true}
            route={`/sales/open/${CallData?.leadId?.[0]?._id}/company-profile`}
            color={"#000"}
          />
          {/* <div
            className={`flex justify-between flex-col h-[34px] shrink-0 cursor-pointer`}
            style={{ width: 200, marginLeft: 20 }}
            ref={ref}
            onMouseOver={() => {
              const box = ref.current.getBoundingClientRect();
              setBounding({ left: box.x, top: box.y });
              setHover(true);
            }}
            onMouseLeave={() => {
              setHover(false);
            }}
          >
            <p
              className={`text-[13px] mt-[8px] tracking-wide font-medium ${true ? "text-[#3F434A]" : "text-[#8A9099]"
                }`}
            // >
            >
              -
              {LeadData.owners?.map((item:any, i:any) => {
                return (
                  <span className={i !== 0 ? "text-bg-red" : ""} key={i}>
                    {i < 2 && item.name} ,
                  </span>
                );
              })}
            </p>
          </div> */}
          <CallItem
            width={200}
            left={20}
            text={CallData?.leadId?.[0]?.product_category ?? "-"}
          />
          <CallItem
            width={200}
            left={20}
            text={CallData?.participants?.[0]?.customer_name}
          />
          <CallItem
            width={100}
            left={20}
            text={
              CallData?.leadId?.[0]?.owners?.[0]?.name ||
              CallData?.owner?.[0]?.name ||
              "-"
            }
          />
          <CallItem
            width={130}
            left={20}
            text={CallData?.callData?.[0]?.call_type}
          />
          <CallItemMultiple
            width={120}
            left={10}
            upperText={CallData?.createdAt ? getFormattedDate() : "-"}
            bottomText={
              CallData?.callData[0]?.call_date &&
              CallData?.callData[0]?.call_start_time
                ? getFormattedTime()
                : "-"
            }
          />
          <CallItem
            width={120}
            left={10}
            text={calculateTimeDifference(
              CallData?.StartTime,
              CallData?.EndTime
            )}
          />
          <CallItem
            width={160}
            left={20}
            text={
              CallData?.callDisposition ||
              CallData?.callData?.[0]?.call_disposition ||
              "NA"
            }
          />
          <CallItem width={120} left={10} text={CallData?.score || "-"} />
          {/* <CallItem
            width={110}
            left={20}
            img={"/msg.svg"}
            onClick={() => {
              dispatch(setCurrent(1));
            }}
            click={true}
            route={`${pathname}/${id}/audio-call`}
            text={`${CallData.comments.length}`}
          /> */}
          {/* <CallItem width={110} left={20} text={"Read Summary"} /> */}
        </div>
      </div>
      {detailShow && (
        <BackdropRight bool={detailShow}>
          <ExpandableRow
            CallDesc={CallData?.callData?.[0]?.call_discription}
            audioPlayerData={CallData?.RecordingUrl}
            callMatrics={[
              {
                title: "Talk/Listen Ratio ",
                data: "26%",
              },
              {
                title: "Longest Monologue",
                data: "03:53",
              },
              {
                title: "Filler words per minute",
                data: "7",
              },
              {
                title: "Engaging Questions",
                data: "3",
              },
            ]}
            handleClose={() => setDetailShow(!detailShow)}
          />
        </BackdropRight>
      )}

      {hover && <ParticipantsHover bounding={bounding} last={last} />}
    </>
  );
};

export default CallContainer;
