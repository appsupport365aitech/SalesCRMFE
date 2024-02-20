import { getBasicIcon } from "@/utils/AssetsHelper";
import Navigator from "@/utils/customNavigator";
import Image from "next/image";
import React, { useState } from "react";
import ActivityHistory from "./ProfileDetails/Lead/activity";
import Attachements from "./ProfileDetails/Lead/attachements";

const LeadProfileContainer = ({ titles, current, info, data, width }: any) => {
  const [activeTitle, setActiveTitle] = useState(0);
  function CallBack(childData: any) {
    setActiveTitle(childData);
  }
  const list = titles.map((title: any, i: any) => ({ id: i, title: title }));

  const isCall = () => {
    if (
      data?.activityId?.lastActivity?.type?.toLowerCase() === "call" ||
      data?.activityId?.lastActivity?.call_type?.toLowerCase() === "call"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const getLastCallData = () => {
    const actionHistory = data?.activityId?.history;
    const len = actionHistory?.length;
    for (let i = len - 1; i >= 0; i--) {
      if (
        actionHistory?.[i]?.type?.toLowerCase() === "call" ||
        actionHistory?.[i]?.callType?.toLowerCase() === "call"
      ) {
        return actionHistory?.[i];
      }
    }
    return null;
  };

  const lastCallData = isCall()
    ? data?.activityId?.lastActivity
    : getLastCallData();

  const formatDateTime = (timestamp: any, format = "dd mon yyyy") => {
    const date = new Date();
    // if today show the time
    // if yesterday show tomorrow
    const formattedDate = date.toLocaleString("default", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      day: "numeric",
      month: "2-digit",
      year: "numeric",
    });
    return formattedDate;
  };

  return (
    <div
      className={`w-[${
        width ? width : "100%"
      }] bg-[#F7F7F7] rounded-xl p-[25px] px-[35px] pt-[30px] `}
    >
      <Navigator
        width={false}
        callback={CallBack}
        current={current}
        list={list}
      />
      <div className="flex justify-between  relative">
        <div className="text-black text-[14px] leading-[21px] mt-[25px] w-[100%] tracking-wide  ">
          {activeTitle === 0 && (
            <>
              {/* <div className="absolute top-[35px] right-[30px]">
                <Image
                  src={getBasicIcon("Edit")}
                  className={`w-[16px] h-[16px] cursor-pointer`}
                  alt=""
                  width={16}
                  height={16}
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div> */}
              <h2 className="text-3xl font-semibold">
                Lead-{data?.lead_title}
                {""} Info
              </h2>
              <div className="pr-20">
                <div className="flex items-center mt-4">
                  <p className="text-[#3F434A] text-sm mr-4 w-[300px]">
                    Last Activity
                  </p>
                  <p className=" text-[#595F69] text-sm font-medium">
                    {data?.activityId?.lastActivity?.call_type ||
                      data?.activityId?.lastActivity?.type ||
                      "-"}
                  </p>
                </div>
                <div className="flex items-center mt-4">
                  <p className="text-[#3F434A] text-sm mr-4 w-[300px]">
                    Product/ Service Type
                  </p>
                  <p className="text-[#595F69] text-sm font-medium">
                    {data?.product_category}
                  </p>
                </div>
                {/* <div className="flex items-center mt-4">
                  <p className="text-[#3F434A] text-sm mr-4 w-[300px]">
                    Last Call Disposition
                  </p>
                  <p className="text-[#595F69] text-sm font-medium">
                    {lastCallData
                      ? `${
                          lastCallData?.call_type || lastCallData?.type
                        } on ${formatDateTime(lastCallData?.createdAt)}`
                      : "-"}
                  </p>
                </div>
                <div className="flex items-center mt-4">
                  <p className="text-[#3F434A] text-sm mr-4 w-[300px]">
                    Next Action
                  </p>
                  <p className="text-[#595F69] text-sm font-medium">
                    {data?.activityId?.lastActivity?.nextAction || "-"}
                  </p>
                </div> */}
                <div className="flex items-center mt-4">
                  <p className="text-[#3F434A] text-sm mr-4 w-[300px]">
                    Interested Product/Service Type
                  </p>
                  <p className="text-[#595F69] text-sm font-medium">
                    {data?.product_category || "-"}
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-semibold mt-5">Lead Description</h2>
              <p className="mt-4">{data?.lead_description}</p>
              <h2 className="text-2xl font-semibold mt-5">
                Company Description
              </h2>
              <p className="mt-4">{data?.companyId?.company_description}</p>
            </>
          )}
          {activeTitle === 1 && <ActivityHistory data={data} />}
          {activeTitle === 2 && <Attachements data={data} />}
        </div>
      </div>
    </div>
  );
};

export default LeadProfileContainer;
