import { getBasicIcon } from "@/utils/AssetsHelper";
import React from "react";
import Navigator from "@/utils/customNavigator";
import Image from "next/image";
import { Card } from "@mui/material";

const Activityhistory = ({ data }: { data: any }) => {
  const history = data?.activityId?.history ? data.activityId?.history : [];
  const notes = history.filter((item: any) => item?.type == "note");

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

  return (
    <div>
      <Card className="bg-[#ffffff] w-[100%] pb-10 p-6">
        <h2 className="text-[#3F434A] text-2xl font-medium">
          Activity History
        </h2>
        {history?.length > 0 && (
          <div className="mt-[2px] mx-[20px] ml-[3px] flex flex-col gap-y-2.5 w-[100%]">
            <div className="flex text-[14px] mt-[30px] w-[100%] text-[#8A9099] leading-[21px] items-center justify-between">
              <p className="text-[#8A9099] font-medium w-[19%]">
                Date and Time
              </p>
              <p className=" font-medium text-[#8A9099] w-[17.5%]">
                Activity Type
              </p>
              <p className="font-medium text-[#8A9099] w-[21%]">Partcipants</p>
              <p className="font-medium text-[#8A9099] w-[19%]">Outcome</p>
              <p className="font-medium text-[#8A9099] w-[20%]">
                Title and Description
              </p>
            </div>

            <div className="w-[100%] flex flex-col-reverse">
              {history.map((item: any, i: any) => {
                const date = formatDateAndTime(item?.createdAt);
                return (
                  <>
                    <div className="text-[14px] pl-[20px] mb-[10px] py-[7px] text-[#8A9099] leading-[21px] flex items-center bg-[#ffe3e170] rounded-xl justify-between">
                      <div className="w-[19%]">
                        <p className="text-[#3F434A] font-medium">
                          {date?.date}
                        </p>
                        <p className="text-[#3F434A] font-medium">
                          {date?.time}
                        </p>
                      </div>
                      <div className="w-[17.5%]">
                        <Image
                          src={
                            item?.type === "email"
                              ? getBasicIcon("Mail")
                              : item?.type === "note"
                              ? getBasicIcon("Tasks")
                              : item?.call_title
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
                      <div className="w-[21%] capitalize">
                        <p className="font-semibold text-gray-600">
                          {data.owners[0].name}
                        </p>
                        <p>{data.customerId.customer_name}</p>
                      </div>
                      <div className="w-[19%]">
                        <p>{getOutcome(item, i)}</p>
                      </div>
                      <div className="w-[19%] capitalize ">
                        {item?.type === "email" ? (
                          <>
                            <p
                              dangerouslySetInnerHTML={{ __html: item?.title }}
                              className="text-gray-500  font-semibold text-xs"
                            ></p>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: item?.content,
                              }}
                              className="text-[#8A9099] font-small text-xs"
                            ></p>
                          </>
                        ) : (
                          <>
                            <p className="text-gray-500  font-bold text-sm">
                              {item?.title ?? item.call_title}
                            </p>
                            <p className="text-[#8A9099] font-small text-xs">
                              {item?.content ?? item.call_discription}
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
      </Card>
      {notes?.length > 0 && (
        <Card className="mt-4 flex flex-col gap-4 p-6">
          {notes?.length > 0 && <h2 className="text-2xl font-bold">Notes</h2>}
          {notes?.map((item: any) => (
            <>
              <div className="w-[100%] h-[20vh] rounded-md border-black border border-solid p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold capitalize">
                    {item?.title}
                  </h2>
                  <div className="flex gap-4">
                    <h2>{item?.createdAt.split("T")[0]}</h2>
                    <h2>{item?.createdAt.split("T")[1].substring(0, 5)}</h2>
                  </div>
                </div>
                <h2 className="text-sm mt-2">{item?.content}</h2>
              </div>
            </>
          ))}
        </Card>
      )}
    </div>
  );
};
export default Activityhistory;
