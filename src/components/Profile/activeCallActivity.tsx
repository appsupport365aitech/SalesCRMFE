import { getBasicIcon } from "@/utils/AssetsHelper";
import React, { useEffect, useState } from "react";
import Navigator from "@/utils/customNavigator";
import Image from "next/image";
import { Card } from "@mui/material";
import axios from "axios";
import { baseUrl } from "@/utils/baseUrl";

const Activityhistory = ({ data, accessToken }: any) => {
  const history = data?.leadId?.activityId?.history
    ? data?.leadId?.activityId?.history
    : [];
  const notes = history.filter((item: any) => item.type == "note");
  const [callParticipantData, setCallParticipantData] = useState<any>({});

  function formatDateAndTime(dateString: any) {
    // Create a Date object from the given date string (UTC time)
    const dateObj = new Date(dateString);

    // Convert the UTC time to IST (Indian Standard Time)
    const utcToIstOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
    dateObj.setTime(dateObj.getTime() + utcToIstOffset);

    // Months array to get the month name
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Get the day and month
    const day = dateObj.getUTCDate();
    const month = months[dateObj.getUTCMonth()];

    // Get the hours and minutes in IST
    let hours = dateObj.getUTCHours();
    let minutes: string = dateObj.getUTCMinutes().toString();

    // Convert the hours to 12-hour format and determine AM/PM
    const amPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 to 12

    // Pad single-digit minutes with a leading zero
    minutes = minutes.toString().padStart(2, "0");

    // Create the formatted date and time string
    const formattedDate = `${day} ${month}`;
    const formattedTime = `${hours}:${minutes} ${amPm}`;

    return { date: formattedDate, time: formattedTime };
  }

  const getParticipantsData = () => {
    if (history.length > 0) {
      history.forEach((historyItem: any, index: number) => {
        if (historyItem.callId) {
          axios
            .get(
              `${baseUrl}api/customer/find-by-id?id=${historyItem?.participants}`,
              { headers: { Authorization: accessToken } }
            )
            .then((res: any) => {
              setCallParticipantData((curr: any) => {
                return { ...curr, [`participant${index}`]: res?.data?.result };
              });
            })
            .catch((err: any) => {});
        }
      });
    }
  };

  const getOutcome = (item: any, idx: number) => {
    if (item?.type?.toLowerCase() == "email") {
      return "Email sent";
    } else if (item?.type?.toLowerCase() == "sms") {
      return "SMS sent";
    } else if (item?.type?.toLowerCase() == "note") {
      return "Note added";
    } else {
      return "NA";
    }
  };

  useEffect(() => {
    getParticipantsData();
  }, [accessToken, history]);

  return (
    <div>
      <div className=" w-[100%] pb-10 ">
        <div className="flex text-[14px] mt-[20px] w-[100%] text-[#8A9099] leading-[21px] items-center justify-between">
          <p className="text-[#8A9099] text-[14px] font-medium w-[22%]">
            Date and Time
          </p>
          <p className="text-[14px] font-medium text-[#8A9099] w-[22%]">
            Activity Type
          </p>
          <p className="text-[14px] font-medium text-[#8A9099] w-[16%]">
            Partcipants
          </p>
          <p className="text-[14px] font-medium text-[#8A9099] w-[16%]">
            Outcome
          </p>
          <p className="text-[14px] font-medium text-[#8A9099] w-[20%]">
            Title and Description
          </p>
        </div>
        {history.length > 0 && (
          <div className="bg-[#ffe3e170] mt-[2px] flex flex-col gap-y-2.5 w-[100%]">
            <div className="w-[100%] flex gap-4 flex-col p-2">
              {history.map((item: any, i: any) => {
                const date = formatDateAndTime(item.createdAt);
                return (
                  <>
                    <div className="text-[14px] mb-[10px] py-[7px] text-[#8A9099] leading-[21px] flex gap-2 items-center bg-[#ffe3e1c0] rounded-xl justify-between">
                      <div className="w-[22%]">
                        <p className="text-gray-400 text-[14px] font-medium">
                          {date.date}
                        </p>
                        <p className="text-[#3F434A] font-medium">
                          {date.time}
                        </p>
                      </div>
                      <div className="w-[17.5%]">
                        <Image
                          src={
                            item.type === "email"
                              ? getBasicIcon("Mail")
                              : item.type === "note"
                              ? getBasicIcon("Tasks")
                              : item.call_title
                              ? getBasicIcon("Phone")
                              : getBasicIcon("activity-1")
                          }
                          className={`
                    `}
                          // svg-bg-red
                          alt="Calendar"
                          width={22}
                          height={22}
                          style={{
                            objectFit: "contain",
                          }}
                        />
                      </div>
                      <div className="w-[21%]">
                        <p>
                          {callParticipantData?.[
                            `participant${i}` as keyof typeof callParticipantData
                          ]?.customer_name || "NA"}
                        </p>
                      </div>
                      <div className="w-[19%]">
                        <p>{getOutcome(item, i)}</p>
                      </div>
                      <div className=" w-[17.5%] ">
                        {item.type === "email" ? (
                          <>
                            <p
                              dangerouslySetInnerHTML={{ __html: item.title }}
                              className="text-gray-500  font-semibold text-xs"
                            ></p>
                            <p
                              dangerouslySetInnerHTML={{ __html: item.content }}
                              className="text-[#8A9099] font-small text-xs"
                            ></p>
                          </>
                        ) : (
                          <>
                            <p className="text-gray-500  font-bold text-lg">
                              {item.title || item?.call_title}
                            </p>
                            <p className="text-[#8A9099] font-small text-sm line-clamp-2">
                              {item.content || item?.call_discription}
                            </p>
                          </>
                        )}
                      </div>
                      <div>
                        {/* <Image
                      src={getBasicIcon("More")}
                      className={`w-[19px]  rotate-90 cursor-pointer opacity-80`}
                      alt=""
                      width={17}
                      height={17}
                      style={{
                        objectFit: "contain",
                      }}
                    /> */}
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {notes.length > 0 && (
        <Card className="mt-4 flex flex-col gap-4 p-6">
          {notes.length > 0 && <h2 className="text-2xl font-bold">Notes</h2>}
          {notes.map((item: any) => (
            <>
              <div className="w-[100%] h-[20vh] rounded-md border-black border border-solid p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <div className="flex gap-4">
                    <h2>{item.createdAt.split("T")[0]}</h2>
                    <h2>{item.createdAt.split("T")[1].substring(0, 5)}</h2>
                  </div>
                </div>
                <h2 className="text-sm mt-2">{item.content}</h2>
              </div>
            </>
          ))}
        </Card>
      )}
    </div>
  );
};
export default Activityhistory;
