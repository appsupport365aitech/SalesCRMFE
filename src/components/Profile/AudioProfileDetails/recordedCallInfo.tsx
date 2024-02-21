import Backdrop from "@/components/View/Backdrop/Center";
import EditLead from "@/components/View/EditLead";
import { getBasicIcon } from "@/utils/AssetsHelper";
import { baseUrl } from "@/utils/baseUrl";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";

const CallInfo = ({ check, data, data1, refresh, type }: any) => {
  console.log("-------------- call info -------------", data, data1);
  const activeTitle = 0;
  // const [edit, setEdit] = useState(false);
  // const [bool, setBool] = useState(true);

  // const showEdit = () => {
  //   setEdit(true);
  // };

  // const cancelEdit = () => {
  //   setBool(false);
  //   setTimeout(() => {
  //     setEdit(false);
  //     setBool(true);
  //   }, 500);
  // };

  // const [data2, setData] = useState(data1);

  // const UpdateData = async () => {
  //   const response = await axios
  //     .get(
  // `${baseUrl}api/leads/find-by-id?id=${data1._id}`
  //     )
  //     .then((e) => {
  //       setData(e.data);
  //     })
  //     .catch((e) => {
  //     });
  // };

  function convertDatetimeToCustomFormat(dateStr: any) {
    // Convert the string to a Date object
    const dt: any = new Date(dateStr);

    // Calculate the number of seconds since January 1, 1400 (Iranian calendar)
    const referenceDate: any = new Date("1400-01-01T00:00:00Z");
    const secondsDifference = Math.floor((dt - referenceDate) / 1000);

    return secondsDifference;
  }

  const callMatrics = [
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
  ];
  return (
    <div>
      <div className="flex justify-between">
        <h4 className="text-2xl font-normal capitalize pl-7">
          {type === "MEETING" ? data?.title : data?.activeCall?.call_title}
        </h4>
        {type === "MEETING" && (
          <h5 className="text-xl font-semibold capitalize pl-7">
            {data?.location}
          </h5>
        )}
      </div>

      <div className="pl-[30px]">
        <p className=" border-b-2 w-3/4 pb-2 border-red-400 mt-[20px] text-[#3F434A] leading-[30px] text-[20px] font-medium">
          CALL ID -{" "}
          {type === "MEETING"
            ? String(convertDatetimeToCustomFormat(data?.activeCall?._id)) ||
              "-"
            : data?.activeCall?._id
                .split("")
                .filter((dig: any) => /\d/.test(dig))
                .join("")
                .slice(-4) || "-"}
        </p>
        <div className="text-[#8A9099] flex  mt-[7px] leading-[21px]">
          <p className="text-sm font-medium w-[50%] mr-4">Lead ID</p>
          <p className="text-sm font-normal text-black w-[50%]">
            {data1?.leadId || "-"}
          </p>
        </div>
        <div className="text-[#8A9099] flex mt-[7px] leading-[21px]">
          <p className="text-sm font-medium w-[50%] mr-4">Lead Title</p>
          <p className="text-sm font-normal text-black w-[50%]">
            {data1?.lead_title || "-"}
          </p>
        </div>
        <p className="border-b-2 w-3/4 pb-2 border-red-400 mt-[20px] text-[#3F434A] leading-[22px] text-[20px] font-medium">
          INFO
        </p>
        <div className="text-[#8A9099]  flex  mt-[7px] leading-[21px]">
          <p className="text-sm font-medium w-[50%] mr-4"> Company Name</p>
          <p className="text-sm font-normal text-black w-[50%]">
            {data1?.companyId?.company_name ?? "-"}
          </p>
        </div>
        <div className="text-[#8A9099] flex mt-[7px] leading-[21px]">
          <p className="text-sm font-medium w-[50%] mr-4">Client POC</p>
          <p className="text-sm font-normal text-black w-[50%]">
            {data1?.customerId?.customer_name ?? "-"}
          </p>
        </div>
        <div className="text-[#8A9099] flex mt-[7px] leading-[21px]">
          <p className="text-sm font-medium w-[50%] mr-4">Product/Service</p>
          <p className="text-sm font-normal text-black w-[50%]">
            {data?.activeCall?.call_type}
          </p>
        </div>
        <div className="text-[#8A9099] flex mt-[7px] leading-[21px]">
          <p className="text-sm font-medium w-[50%] mr-4">Lead Stage</p>
          <p className="text-sm font-normal text-black w-[50%]">
            {data1?.leadStage}
          </p>
        </div>
        <div className="text-[#8A9099] flex mt-[7px] leading-[21px]">
          <p className="text-sm font-medium w-[50%] mr-4">Call Type</p>
          <p className="text-sm font-normal text-black w-[50%]">
            {type === "MEETING"
              ? data?.type
              : data?.activeCall?.call_type ?? "-"}
          </p>
        </div>
        <div className="text-[#8A9099] flex mt-[7px] leading-[21px]">
          <p className="text-sm font-medium w-[50%] mr-4">Call Description</p>
          <p className="text-sm font-normal text-black w-[50%]">
            {type === "MEETING"
              ? data?.description
              : data?.activeCall?.call_discription ?? "-"}
          </p>
        </div>
        {/* <div className="text-[#8A9099] flex  mt-[7px] leading-[21px]">
          <p className="text-sm font-medium w-[50%] mr-4">Call Disposition</p>
          <p className="text-sm font-semibold text-black">
            {data?.activeCall?.call_disposition ?? "-"}
          </p>
        </div> */}
      </div>
      <div className="pl-[30px]">
        <div className="mt-[25px]">
          <p className="border-b-2 w-3/4 pb-2 border-red-400 text-[#3F434A] text-[20px] font-medium leading-[22px]">
            CALL PARTICIPANTS
          </p>
          <div className="text-[#8A9099] flex mt-[7px] leading-[21px]">
            <p className="text-sm font-medium w-[50%] mr-4">Call Owner</p>
            <p className="text-sm font-normal text-black capitalize">
              {data?.activeCall?.owner?.name ?? "-"}
            </p>
          </div>
          <div className="text-[#8A9099] flex mt-[7px] leading-[21px]">
            <p className="text-sm font-medium w-[50%] mr-4">Call Participant</p>
            <div className="">
              <p className="text-sm font-normal text-black">
                {data?.activeCall?.participants?.customer_name ?? "-"}
              </p>
              <p className="text-sm font-normal text-grey">
                {data?.activeCall?.call_new_participant_designation ?? "-"}
              </p>
            </div>
          </div>
        </div>
        {/* <p className="text-[#8A9099] text-[12px] leading-[18px]">
            {data1.owners[0].name}
          </p> */}
      </div>
      <div className=" mt-[20px] w-[600px] h-[1px] px-[30px]"></div>
      {check && (
        <>
          <div className="pl-[30px]">
            <div className="mt-[25px]">
              <p className="border-b-2 w-3/4 pb-2 border-red-400 text-[#3F434A] text-[20px] font-medium leading-[22px]">
                CALL METRICS
              </p>
            </div>
            <div className="mt-2">
              <ul className="w-[85%] flex flex-col gap-2">
                {callMatrics?.map((item: any) => (
                  <li
                    key={item.title}
                    className=" flex mt-[7px] leading-[21px]"
                  >
                    <h3 className="text-sm font-medium w-[60%] mr-4">
                      {item.title}
                    </h3>
                    <p className="text-sm font-normal">{item.data}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CallInfo;
