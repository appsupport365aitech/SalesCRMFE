import Backdrop from "@/components/View/Backdrop/Center";
import EditLead from "@/components/View/EditLead";
import { getBasicIcon } from "@/utils/AssetsHelper";
import { baseUrl } from "@/utils/baseUrl";
import axios from "axios";
import Image from "next/image";
import { string } from "prop-types";
import React, { useState, useEffect } from "react";

const CallInfo = ({ check, info, data, data1 }: any) => {
  const activeTitle = 0;
  const [edit, setEdit] = useState(false);
  const [bool, setBool] = useState(true);

  const showEdit = () => {
    setEdit(true);
  };

  const cancelEdit = () => {
    setBool(false);
    setTimeout(() => {
      setEdit(false);
      setBool(true);
    }, 500);
  };

  const [data2, setData] = useState<any>({});
  const [accessToken, setAccessToken] = useState<any>("");

  useEffect(() => {
    if (window !== undefined) {
      setAccessToken(localStorage.getItem("access-token"));
    }
  }, []);

  const UpdateData = async () => {
    const response = await axios
      .get(`${baseUrl}api/leads/find-by-id?id=${data1?.leadId?._id}`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((e) => {
        setData(e.data);
      })
      .catch((e) => {});
  };

  const [check1, setCheck] = useState(false);

  useEffect(() => {
    if (!check1) {
      UpdateData();
      setCheck(true);
    }
  }, []);

  const called: any = data1;
  const owner = called?.owner;
  const participants = called?.participants;

  function convertDatetimeToCustomFormat(dateStr: any) {
    // Convert the string to a Date object
    const dt: any = new Date(dateStr);

    // Calculate the number of seconds since January 1, 1400 (Iranian calendar)
    const referenceDate: any = new Date("1400-01-01T00:00:00Z");
    const secondsDifference = Math.floor((dt - referenceDate) / 1000);

    return secondsDifference;
  }
  return (
    <div>
      {edit && (
        <Backdrop pad={"50px 0"} bool={true} width={"900px"}>
          <EditLead
            cancel={cancelEdit}
            update={() => {
              UpdateData();
            }}
            data={data2?.result}
            mastersData={{}}
          />
        </Backdrop>
      )}
      <h4 className="text-2xl font-semibold capitalize pl-7">
        {data1?.call_title}
      </h4>
      <div className="pl-[30px]">
        <p className=" border-b-2 w-full pb-2 border-red-400 mt-[20px] text-[#3F434A] leading-[30px] text-[20px] font-medium">
          Call Id -{" "}
          {String(convertDatetimeToCustomFormat(data1?.updatedAt)).slice(0, 4)}
        </p>
        <div className="text-[#8A9099] flex mt-[7px] leading-[21px]">
          <p className="text-sm font-medium w-[40%] mr-2">LEAD ID</p>
          <p className="text-sm font-semibold text-black">
            {data1?.leadId?.leadId}
          </p>
        </div>
        <div className="text-[#8A9099] flex mt-[7px] leading-[21px]">
          <p className="text-sm font-medium w-[40%] mr-2">Lead Title</p>
          <p className="text-sm font-semibold text-black">
            {data1?.leadId?.lead_title}
          </p>
        </div>

        <p className="border-b-2 w-full pb-2 border-red-400 mt-[20px] text-[#3F434A] leading-[22px] text-[20px] font-medium">
          INFO
        </p>
        <div className="text-[#8A9099] flex mt-[7px] leading-[21px]">
          <p className="text-sm font-medium w-[40%] mr-2"> Company Name</p>
          <p className="text-sm font-semibold text-black">
            {data1?.companyId?.company_name}
          </p>
        </div>
        <div className="text-[#8A9099] flex mt-[7px] leading-[21px]">
          <p className="text-sm font-medium w-[40%] mr-2">Client POC</p>
          <p className="text-sm font-semibold text-black">
            {data1?.customerId?.customer_name || data1?.customerId?.name || "-"}
          </p>
        </div>
        <div className="text-[#8A9099] flex mt-[7px] leading-[21px]">
          <p className="text-sm font-medium w-[40%] mr-2">Product/Service</p>
          <p className="text-sm font-semibold text-black">
            {data1?.companyId?.company_product_category}
          </p>
        </div>
        <div className="text-[#8A9099] flex mt-[7px] leading-[21px]">
          <p className="text-sm font-medium w-[40%] mr-2">Lead Stage</p>
          <p className="text-sm font-semibold text-black">
            {data1?.leadId?.leadStage}
          </p>
        </div>
        <div className="text-[#8A9099] flex mt-[7px] leading-[21px]">
          <p className="text-sm font-medium w-[40%] mr-2">Call Type</p>
          <p className="text-sm font-semibold text-black">{data1?.call_type}</p>
        </div>
        <div className="text-[#8A9099] flex mt-[7px] leading-[21px]">
          <p className="text-sm font-medium w-[40%] mr-2">Call Description</p>
          <p className="text-sm font-semibold text-black">
            {data1?.call_discription}
          </p>
        </div>
      </div>
      <div className=" mt-[10px] w-[600px] h-[1px] px-[30px]"></div>
      <div className="pl-[30px]">
        <div className="mt-[25px]">
          <p className="border-b-2 w-full pb-2 border-red-400 text-[#3F434A] text-[20px] font-medium leading-[22px]">
            CALL PARTICIPANTS
          </p>
          <div className="text-[#8A9099] flex mt-[7px] leading-[21px]">
            <p className="text-sm font-medium w-[40%] mr-2">Call Owner</p>
            <div>
              <p className="text-sm font-semibold text-black">
                {owner ? owner.name : "-"}
              </p>
              <p className="text-sm font-semibold text-grey">
                {owner?.roles?.[0]?.name || "-"}
              </p>
            </div>
          </div>
          <div className="text-[#8A9099] flex mt-[7px] leading-[21px]">
            <p className="text-sm font-medium w-[40%] mr-2">Call Participant</p>
            <div>
              <p className="text-sm font-semibold text-black">
                {data1?.participants?.customer_name}
              </p>
              <p className="text-sm font-semibold text-grey">
                {data1?.participants?.customer_designation}
              </p>
            </div>
          </div>
          {data1?.call_new_participant_name && (
            <div className="text-[#8A9099] flex mt-[7px] leading-[21px]">
              <p className="text-sm font-medium w-[40%] mr-2">
                New Participant
              </p>
              <p className="text-sm font-semibold text-black">
                {data1?.call_new_participant_name ?? "-"}
              </p>
              <p className="text-sm font-semibold text-grey">
                {data1?.call_new_participant_designation ?? "-"}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className=" mt-[20px] w-[600px] h-[1px] px-[30px]"></div>
      {check && (
        <>
          <div className="pl-[30px]">
            <div className="mt-[25px]">
              <p className="text-[#3F434A] text-[15px] font-medium leading-[22px]">
                CALL METRICS
              </p>
              <p className="text-[#3F434A] text-[14px] mt-[10px] leading-[21px]">
                Talk/Listen Ratio
              </p>
              <p className="mt-[5px] text-[#8A9099] text-[12px] leading-[18px]">
                {info?.[activeTitle]?.data?.talkRatio}
              </p>
            </div>
            <div className="mt-[12px]">
              <p className="text-[#3F434A] text-[14px] leading-[21px]">
                Longest Monologue
              </p>
              <p className="text-[#8A9099] text-[12px] leading-[18px]">
                {info?.[activeTitle]?.data?.longestMonologue}
              </p>
            </div>
            <div className="mt-[12px]">
              <p className="text-[#3F434A] text-[14px] leading-[21px]">
                Filler words per minute
              </p>
              <p className="text-[#8A9099] text-[12px] leading-[18px]">
                {info?.[activeTitle]?.data?.fillerWords}
              </p>
            </div>
            <div className="mt-[12px]">
              <p className="text-[#3F434A] text-[14px] leading-[21px]">
                Interactivity
              </p>
              <p className="text-[#8A9099] text-[12px] leading-[18px]">
                {info?.[activeTitle]?.data?.interactivity}
              </p>
            </div>
            <div className="mt-[12px]">
              <p className="text-[#3F434A] text-[14px] leading-[21px]">
                Next Steps
              </p>
              <p className="text-[#8A9099] text-[12px] leading-[18px]">
                {info?.[activeTitle]?.data?.nextSteps}
              </p>
            </div>
            <div className="mt-[12px]">
              <p className="text-[#3F434A] text-[14px] leading-[21px]">
                Engaging questions
              </p>
              <p className="text-[#8A9099] text-[12px] leading-[18px]">
                {info?.[activeTitle]?.data?.engagingQuestions}
              </p>
            </div>
          </div>
          <div className="border-b mt-[20px] w-[600px] h-[1px] px-[30px]"></div>
        </>
      )}
    </div>
  );
};

export default CallInfo;
