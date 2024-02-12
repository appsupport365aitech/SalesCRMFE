import { getBasicIcon } from "@/utils/AssetsHelper";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import BackdropRight from "@/components/View/Backdrop/Right";
import { convertDatetime } from "@/components/activeCalls/Script/index.";

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
}: any) => {
  const router = useRouter();

  return (
    <div
      className="flex items-center h-fit py-1 shrink-0"
      style={{ width: width, marginLeft: left }}
    >
      {img && (
        <Image
          src={img}
          alt=""
          width={20}
          height={20}
          className="w-[20px] mr-[5px] ml-[10px]"
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
            if (click && route) {
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
        className="text-[#8A9099] text-[12px] flex tracking-wide "
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

// const ExpandingIcon = ({ change }: any) => {
//   const [show, setShow] = useState(false);

//   return (
//     <div className="w-[50px] flex items-center justify-center cursor-pointer">
//       {!show ? (
//         <Image
//           onClick={() => {
//             change(!show);
//             setShow(!show);
//           }}
//           src={"/plus-circle.svg"}
//           alt=""
//           width={15}
//           height={15}
//         />
//       ) : (
//         <Image
//           onClick={() => {
//             change(!show);
//             setShow(!show);
//           }}
//           src={"/minus-circle.svg"}
//           alt=""
//           width={15}
//           height={15}
//         />
//       )}
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
//         {callMatrics?.map((item: any, i: any) => {
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
  leadDesc,
  companyDesc,
  companyWebsite,
  LeadOwners,
  otherContacts,
  leadData,
  handleClose,
}: any) => {
  console.log(
    "----------------------- LEAD DATA --------------------",
    leadData
  );
  return (
    <div
      className="custom-scroll-black w-[100%] h-[100%] py-[30px] px-[50px] overflow-y-auto"
      style={{
        zIndex: 100000000000000,
      }}
    >
      <div className="w-[100%] flex items-center justify-between text-black mb-[20px]">
        <h2 className="text-[24px]">Call Details</h2>
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
      {/* <div className="w-[100%] flex items-center">
        <p className="w-[200px] text-[16px] text-[#8A9099] font-medium">
          Lead Source
        </p>
        <p className="text-[#000] font-medium mt-[5px] text-[16px] tracking-wide">
          {leadData?.leadId?.leadSource}
        </p>
      </div> */}
      {/* <div className="w-[100%] flex items-center mb-[20px]">
        <p className="w-[200px] text-[16px] text-[#8A9099] font-medium">
          Last Call Disposition
        </p>
        <p className="text-[#000] font-medium mt-[5px] text-[16px] tracking-wide">
          {leadData?.leadId?.activityId?.lastCallDisposition ?? "-"}
        </p>
      </div> */}
      <div className="w-[100%] mb-[20px]">
        <p className="w-[200px] text-[16px] text-[#8A9099] font-medium">
          Call Description
        </p>
        <p className="text-[#000] font-medium mt-[5px] text-[16px] tracking-wide">
          {leadData?.call_discription}
        </p>
      </div>
      {/* <div className="w-[100%] mb-[20px]">
        <p className="w-[200px] text-[16px] text-[#8A9099] font-medium">
          Company Description
        </p>
        <p className="text-[#000] font-medium mt-[5px] text-[16px] tracking-wide">
          {companyDesc ?? "-"}
        </p>
      </div> */}
      {/* {leadData?.leadId?.notes?.length !== 0 && (
        <div className="w-[100%] mb-[20px]">
          <p className="w-[200px] text-[16px] text-[#8A9099] font-medium mb-[5px]">
            Note
          </p>
          <div className="">
            <h3 className="font-medium text-[#000]">
              {leadData?.leadId?.notes[leadData?.leadId?.notes?.length - 1]?.title || "-"}
            </h3>
          </div>
          <p className="text-[#53565a] font-medium mt-[5px] text-[16px] tracking-wide">
            {leadData?.leadId?.notes[leadData?.leadId?.notes?.length - 1]?.content || "-"}
          </p>
        </div>
      )} */}
      {/* <div className="flex flex-col mb-[20px]">
        <div className="w-[100%] flex items-center mb-[20px]">
          <p className="w-[200px] text-[16px] text-[#8A9099] font-medium">
            Company Website
          </p>
          <p className="text-[#000] font-medium mt-[0px] text-[16px] tracking-wide">
            <a href={`https://${companyWebsite}`} target="_blank">
              {companyWebsite}
            </a>
          </p>
        </div>
        <div className="w-[100%] mt-[10px] flex items-center">
          <p className="w-[200px] text-[16px] text-[#8A9099] font-medium">
            Social Media
          </p>
          <div className="flex mt-[2px]">
            {leadData?.companyId?.company_socialMedia1 && (
              <a href={leadData?.companyId?.company_socialMedia1Url}>
                <Image
                  src={getBasicIcon(leadData?.companyId?.company_socialMedia1)}
                  className="mr-[8px] cursor-pointer w-[20px] h-[20px]"
                  height={20}
                  width={20}
                  alt=""
                />
              </a>
            )}
            {leadData?.companyId?.company_socialMedia2 && (
              <a href={leadData?.companyId?.company_socialMedia2Url}>
                <Image
                  src={getBasicIcon(leadData?.companyId?.company_socialMedia2)}
                  className="mr-[8px] cursor-pointer w-[20px] h-[20px]"
                  height={20}
                  width={20}
                  alt=""
                />
              </a>
            )}
          </div>
        </div>
      </div> */}
      {/* <div className="w-[100%] mb-[20px] flex items-center">
        <p className="w-[200px] text-[16px] text-[#8A9099] font-medium">
          Lead Owner
        </p>
        {LeadOwners.map((item: Owner, i: any) => {
          return (
            <p
              key={i}
              className="text-[#000] font-medium mt-[2px] text-[16px] tracking-wide"
            >
              {item.name}
            </p>
          );
        })}
      </div> */}
      {/* <div className="w-[100%] mb-[20px]">
        <p className="w-[200px] text-[16px] text-[#8A9099] font-medium">
          Other Contacts
        </p>
        <p className="text-[#8A9099] font-medium mt-[5px] text-[14px] tracking-wider">
          <span className="text-[#000] text-[15px]">
            {" "}
            {leadData?.customerId?.customer_name}
          </span>
          , {leadData?.customerId?.customer_designation}
        </p>
        {otherContacts?.map((item: any, i: any) => {
          if (item && Object.keys(item).length !== 0) {
            return (
              <p
                key={i}
                className="text-[#8A9099] font-medium mt-[5px] text-[14px] tracking-wider"
              >
                <span className="text-[#000] text-[15px]">
                  {" "}
                  {item?.customer_name}
                </span>
                , {item?.designation}
              </p>
            );
          } else {
            return null;
          }
        })}
      </div> */}
      {/* <div className="w-[100%] mb-[20px] flex items-center">
        <p className="w-[200px] text-[16px] text-[#8A9099] font-medium">
          Lead Created On
        </p>
        <p className="text-[#000] font-medium mt-[5px] text-[16px] tracking-wide">
          {convertDatetime(leadData?.createdAt)}
        </p>
      </div> */}
    </div>
  );
};

const ParticipantsHover = ({ last, bounding, owner, participants }: any) => {
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
      <p className=" mt-[19px] text-[13px] ml-[2px]  w-[100%] font-medium">
        {owner ? owner.name + " (" + owner.designation + ")" : "-"}
      </p>
      <p className="text-bg-red text-[13px] ml-[2px]  w-[100%] font-medium">
        {participants
          ? participants.name + " (" + participants.designation + ")"
          : "-"}
      </p>
    </div>
  );
};

const CallContainer = ({ id, CallData, last, selectAll }: any) => {
  const { pathname, push } = useRouter();
  const [detailShow, setDetailShow] = useState(false);
  const [selected, setSelected] = useState<boolean>(false);
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

  function formatDateToCustomFormat(isoDate: any) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dateObj = new Date(isoDate);
    const day = dateObj.getUTCDate();
    const month = months[dateObj.getUTCMonth()];
    const year = dateObj.getUTCFullYear();

    return `${day} ${month} ${year}`;
  }

  function convertDatetimeToCustomFormat(dateStr: any) {
    // Convert the string to a Date object
    const dt: any = new Date(dateStr);

    // Calculate the number of seconds since January 1, 1400 (Iranian calendar)
    const referenceDate: any = new Date("1400-01-01T00:00:00Z");
    const secondsDifference = Math.floor((dt - referenceDate) / 1000);

    return secondsDifference;
  }

  const called: any = CallData;
  const owners = called?.owner;
  const participants = called?.participants;

  const initialDate = new Date(CallData.call_date);

  // Get day, month, and year components from the Date object
  const day = initialDate.getDate();
  const month = initialDate.toLocaleString("default", { month: "long" });
  const year = initialDate.getFullYear();

  // Construct the desired date format
  const convertedDateStr = `${day} ${month} ${year}`;

  const initialTime = CallData.call_start_time;

  // Splitting the time string into hours and minutes
  const [hours, minutes] = initialTime.split(":");

  // Convert hours to a number
  const parsedHours = parseInt(hours, 10);

  // Determine if it's AM or PM based on the hours
  const period = parsedHours >= 12 ? "pm" : "am";

  // Convert hours to 12-hour format
  const twelveHourFormat = parsedHours % 12 || 12; // Convert 0 to 12 for midnight

  // Construct the formatted time string
  const formattedTime = `${twelveHourFormat}${minutes != undefined ? ":" : ""}${
    minutes != undefined ? minutes : ""
  } ${period}`;
  console.log("rg", CallData?.callId);

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
            width={100}
            left={20}
            text={(CallData?._id || "")
              .split("")
              .filter((dig: any) => /\d/.test(dig))
              .join("")
              .slice(-4)}
            // text={
            //   String(convertDatetimeToCustomFormat(CallData.updatedAt)).slice(
            //     0,
            //     4
            //   ) || "-"
            // }
            color={"#000"}
            click={true}
            route={`${pathname}/${id}/calling`}
          />
          <CallItem
            width={150}
            left={25}
            color={"#000"}
            text={CallData.call_title}
            click={true}
            route={`${pathname}/${id}/calling`}
          />
          <CallItem
            width={100}
            left={10}
            text={CallData.leadId?.leadId}
            click={true}
            route={`/sales/open/${CallData?.leadId?._id}/lead-profile`}
            color={"#000"}
          />
          <CallItem
            width={200}
            left={0}
            text={CallData?.leadId?.lead_title}
            color={"#000"}
          />
          <CallItemMultiple
            width={200}
            left={20}
            upperText={CallData?.companyId?.company_name}
            bottomText={CallData?.companyId?.company_address}
            bold={true}
            click={true}
            route={`/sales/open/${CallData?._id}/company-profile`}
            color={"#000"}
          />
          <CallItem
            width={120}
            left={20}
            text={CallData?.leadId?.product_category}
            click={true}
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
              className={`text-[13px] mt-[8px] tracking-wide font-medium ${
                true ? "text-[#3F434A]" : "text-[#8A9099]"
              }`}
            >
              <span>{participants ? participants.name + "," : "-"}</span>{" "}
              <span className="text-bg-red ">
                {owners ? owners.name : ""}
              </span>
            </p>
          </div> */}
          <CallItem
            width={110}
            left={20}
            text={CallData?.customerId?.customer_name}
            color={"#000"}
          />
          <CallItem
            width={100}
            left={0}
            text={owners ? owners.name : ""}
            color={"#000"}
          />

          <CallItem
            width={100}
            left={30}
            text={CallData.call_type}
            color={"#000"}
          />
          <CallItemMultiple
            width={130}
            left={20}
            upperText={CallData?.call_date ? convertedDateStr : "-"}
            bottomText={
              CallData?.call_date && CallData.call_start_time
                ? formattedTime
                : "-"
            }
          />

          {/* <CallItem width={120} left={10} text={"30 min."} /> */}
        </div>
      </div>
      {/* <div
        className="duration-300 bg-[#f7f7f7]"
        style={{
          width: w,
          height: detailShow ? 150 : 0,
          clipPath: detailShow
            ? "inset(0px 0px 0 1px)"
            : "inset(0px 0px 150px 1px)",
        }}
      >
        <ExpandableRow
          height={detailShow ? 150 : 0}
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
          ]}
          engagingQuestions={3}
        />
      </div> */}
      {detailShow && (
        <BackdropRight bool={detailShow}>
          <ExpandableRow
            leadDesc={CallData?.call_description}
            companyDesc={CallData?.companyId?.company_description}
            companyWebsite={CallData?.companyId?.company_website_url}
            LeadOwners={CallData?.leadId?.owners}
            otherContacts={CallData?.customerId?.contacts}
            leadData={CallData}
            handleClose={() => setDetailShow(!detailShow)}
          />
        </BackdropRight>
      )}

      {hover && (
        <ParticipantsHover
          owner={owners}
          participants={participants}
          bounding={bounding}
          last={last}
        />
      )}
    </>
  );
};

export default React.memo(CallContainer);
