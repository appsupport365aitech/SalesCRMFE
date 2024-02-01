import { setCurrent } from "@/store/UI";
import { getBasicIcon } from "@/utils/AssetsHelper";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import BackdropRight from "@/components/View/Backdrop/Right";
import { baseUrl } from "@/utils/baseUrl";

const example = {
  _id: "6457d6b590467877fd40291c",
  companyId: {
    _id: "6457d6b590467877fd402915",
    company_name: "Zen Corp.",
    company_website_url: "www.faxquote.com",
    company_icon: "",
    company_location: "New Delhi",
    company_product_category: "Product C",
    company_description:
      "XYZ Corp is a marketing and advertising agency providing creative solutions to help businesses increase brand awareness, generate leads, and drive sales.",
    createdAt: "2023-05-07T16:49:57.100Z",
    updatedAt: "2023-05-07T16:49:57.100Z",
    __v: 0,
  },
  customerId: {
    _id: "6457d6b590467877fd402918",
    name: "Ishita Patel",
    contact: "(208) 555-0112",
    email: "ishitapatel@example.com",
    parentId: "6411718c074708bce819b8c1",
    designation: "Sales Manager",
    companyId: "6457d6b590467877fd402915",
    createdAt: "2023-05-07T16:49:57.183Z",
    updatedAt: "2023-05-07T16:49:57.183Z",
    __v: 0,
  },
  potential_deal_size: "50001",
  win_probability: "80%",
  created_by: "Sales",
  customer_name: "Ishita Patel",
  inquiry: "Trial Enquiry",
  existing_budget: "30001",
  leadStatus: "Close",
  leadStage: "Lost",
  lead_title: "Product discussion with Zen Corp.",
  lead_description: "Interested to know about Product A.",
  notes: [
    {
      title: "Product feature A",
      content: "Interested to know about Product A.",
      _id: "6457d6b590467877fd40291d",
      createdAt: "2023-05-10T11:06:35.095Z",
      updatedAt: "2023-05-10T11:06:35.095Z",
    },
  ],
  source: "Phone",
  leadId: "14023",
  owners: [
    {
      _id: "645662800c64d03119111371",
      name: "Anika Sharma",
      email: "anika.sharma@gmail.com",
      password: "$2a$08$keNizUi5NrepC16mgviYKuyGU9R022MfaOFoCUJlkGOziAl1ecx2K",
      phone: "1234567892",
      roles: ["63fdcc5251dadb27a426df6c"],
      token: "",
      createdAt: "2023-05-06T14:21:52.401Z",
      updatedAt: "2023-05-06T14:21:52.477Z",
      __v: 1,
      designation: "Sales Executive",
    },
    {
      _id: "6457d28ac7275bff6e607e88",
      name: "Sanya Reddy",
      email: "sanya.reddy@gmail.com",
      password: "$2a$08$jIydspUt73TuVJlHzr3fe.rLCWGQrV2cHT3xDSW6PLBMhuIdZ3xmO",
      phone: "9876543213",
      roles: ["63fdcc5251dadb27a426df6c"],
      token: "",
      createdAt: "2023-05-07T16:32:10.246Z",
      updatedAt: "2023-05-07T16:32:10.345Z",
      __v: 1,
      designation: "Sales Rep",
    },
  ],
  __v: 0,
  createdAt: "2023-04-03T00:00:00.000Z",
  updatedAt: "2023-04-03T00:00:00.000Z",
};

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

const ExpandableRow = ({
  CallDesc,
  callMatrics,
  engagingQuestions,
  height,
  handleClose,
}: any) => {
  return (
    <div
      className="custom-scroll-black w-[100%] h-[100vh] py-[30px] px-[50px] overflow-y-auto"
      style={{
        zIndex: 100000000000000,
      }}
    >
      <div className="w-[100%] flex items-center justify-between text-black mb-[20px]">
        <h2 className="text-[18px] font-medium">Call Metrics</h2>
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
      <div className="w-[100%] flex flex-col justify-between">
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
      </div>

      <div className="w-[100%] pt-6 mb-[20px]">
        <h2 className="text-[18px] font-medium"> Call Description</h2>
        <p className="text-gray-600 font-medium mt-[5px] text-[14px] tracking-wide">
          {CallDesc}
        </p>
      </div>
    </div>
  );
};

const ParticipantsHover = ({
  last,
  bounding,
  data,
}: {
  last: any;
  bounding: any;
  data: any;
}) => {
  return (
    <div
      className="bg-[#E8E9EB] max-w-[240px] flex flex-col items-center pb-[40px] rounded-[15px] fixed py-[13px] px-[15px]  right-[10px] drop-shadow-sm"
      style={{
        zIndex: 10000000000000,
        // top: !last ? "30px" : "",
        // right: "10px",
        // bottom: last ? "30px" : "",
        top: last ? bounding.top - 50 : bounding.top + 30,
        left: bounding.left + 120,
      }}
    >
      <p className="text-[#000] w-[100%] text-[15px] font-medium">
        Call Participants
      </p>
      {data.owners.map((item: any, i: number) => {
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
      setW(wRef.current.offsetWidth);
    }
  });

  const [hover, setHover] = useState(false);
  const [bounding, setBounding] = useState({ top: 0, left: 0 });
  const ref: any = useRef();
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(true);
  const [LeadData, setLeadData] = useState<any>(example);
  const [accessToken, setAccessToken] = useState<any>("");
  const [selected, setSelected] = useState<boolean>(false);

  useEffect(() => {
    if (window !== undefined) {
      setAccessToken(localStorage.getItem("access-token"));
    }
  }, []);

  const GetLeadData = () => {
    if (CallData.leadId.length > 0) {
      axios
        .get(`${baseUrl}api/leads/find-by-id?id=${CallData?.leadId}`, {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((e: any) => {
          setChecked(false);
          setLeadData(e.data.result);
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

  function convertTimestampToTime(timestamp: string) {
    const dateTime = new Date(timestamp);
    const hours = dateTime.getUTCHours().toString().padStart(2, "0");
    const minutes = dateTime.getUTCMinutes().toString().padStart(2, "0");
    const seconds = dateTime.getUTCSeconds().toString().padStart(2, "0");
    const timeStr = hours + ":" + minutes + ":" + seconds;
    return timeStr;
  }

  function convertTimestampToDate(timestamp: string) {
    const dateTime = new Date(timestamp);
    const options: any = { year: "numeric", month: "long", day: "numeric" };
    const dateStr = dateTime.toLocaleDateString("en-US", options);
    return dateStr;
  }

  function calculateTimeDifference(startTime: any, endTime: any) {
    if (startTime && endTime) {
      const [h1, m1] = startTime.split(":");
      const [h2, m2] = endTime.split(":");
      let diff = (h2 - h1) * 60 + (m2 - m1);
      if (diff < 0) diff += 24 * 60;
      const hours = Math.floor(diff / 60);
      const minutes = diff - hours * 60;
      const hh = hours.toString().padStart(2, "0");
      const mm = minutes.toString().padStart(2, "0");
      return `${hh !== "00" ? `${hh}hr` : ""}${mm ? ` ${mm}min` : ""}`;
    } else {
      return "-";
    }
  }

  const getFormattedDate = () => {
    const initialDate = new Date(CallData?.callData[0]?.call_date);

    // Get day, month, and year components from the Date object
    const day = initialDate.getDate();
    const month = initialDate.toLocaleString("default", { month: "long" });
    const year = initialDate.getFullYear();

    // Construct the desired date format
    const convertedDateStr = `${day} ${month} ${year}`;

    return convertedDateStr;
  };

  const getFormattedTime = () => {
    const initialDate = new Date(CallData?.callData[0]?.call_date);

    // Get day, month, and year components from the Date object
    const day = initialDate.getDate();
    const month = initialDate.toLocaleString("default", { month: "long" });
    const year = initialDate.getFullYear();

    // Construct the desired date format
    const convertedDateStr = `${day} ${month} ${year}`;

    const initialTime = CallData?.callData[0]?.call_start_time;

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

  const call_title: any = CallData;
  console.log(CallData);

  return (
    <>
      <div className="flex">
        <div
          className={`pl-[10px] h-[50px] flex items-center grow border-[#ccc] border-b-[1px] over:bg-white ${
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
            // text={"345345354335"}
            text={
              parseInt(
                CallData?.callData?.[0]?.callId.replace(/\D/g, "").substr(0, 4)
              ).toString() || "-"
            }
            color={"#000"}
            click={true}
            route={`${pathname}/${CallData?._id}/meeting`}
          />
          <CallItem
            width={130}
            left={20}
            color={"#000"}
            // text={"Discussion on PX features"}
            text={CallData.title || "-"}
            click={true}
            route={`${pathname}/${CallData?._id}/meeting`}
          />
          <CallItem
            width={200}
            left={10}
            text={CallData?.leadId?.leadId || "-"}
            click={true}
            route={`/sales/open/${CallData?.leadId?._id}/lead-profile`}
            color={"#000"}
          />
          <CallItem
            width={240}
            left={-65}
            text={CallData?.leadId?.lead_title}
            click={true}
            route={`/sales/open/${CallData?.leadId?._id}/lead-profile`}
            color={"#000"}
          />
          <CallItemMultiple
            width={220}
            left={40}
            upperText={CallData?.companyId?.company_name}
            bottomText={CallData?.companyId?.company_address}
            click={true}
            route={`/sales/open/${LeadData?._id}/company-profile`}
            color={"#000"}
          />
          <CallItem
            width={200}
            left={20}
            text={CallData?.leadId?.product_category ?? "-"}
          />
          <CallItemMultiple
            width={200}
            left={20}
            upperText={CallData?.participants?.customer_name}
            bottomText={CallData?.participants?.customer_designation}
          />
          <CallItem width={140} left={20} text={CallData.owner?.name} />
          <CallItem width={130} left={20} text={CallData?.type} />
          <CallItemMultiple
            width={120}
            left={10}
            upperText={convertTimestampToDate(CallData.datetime?.fromDate)}
            bottomText={"on " + CallData?.datetime?.fromTime}
          />
          <CallItem
            width={120}
            left={10}
            text={calculateTimeDifference(
              CallData?.datetime?.fromTime,
              CallData?.datetime?.toTime
            )}
          />
          <CallItem width={160} left={20} text={CallData?.location} />
          <CallItem width={120} left={10} text={"-"} />
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
            CallDesc={
              "ABC Corp. is a IT company serving industry such as Finance and Edtech. Company has 10+ existing clients and also works with individual people."
            }
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
      {hover && (
        <ParticipantsHover bounding={bounding} data={LeadData} last={last} />
      )}
    </>
  );
};

export default CallContainer;
