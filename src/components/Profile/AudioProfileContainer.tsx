import React, { useState } from "react";
import Navigator from "@/utils/customNavigator";
import Image from "next/image";
import { getBasicIcon } from "@/utils/AssetsHelper";
import Comments from "./AudioProfileDetails/Comment";
import Notes from "./AudioProfileDetails/notesRecordt";
import CallInfo from "./AudioProfileDetails/recordedCallInfo";
import { useDispatch, useSelector } from "react-redux";
import { setCurrent } from "@/store/UI";
import Coaching from "./RecordedCoaching";
import CommentsAndNotes from "./AudioProfileDetails/Comment";
import { MdOutlineTimer } from "react-icons/md";
const AudioProfileContainer = ({
  titles,
  current,
  check,
  data,
  width,
  data1,
  refresh,
  type = "CALL",
}: any) => {
  const activeTitle = useSelector((state: any) => state.ui.current);
  const dispatch = useDispatch();
  function CallBack(childData: any) {
    // setActiveTitle(childData);
    dispatch(setCurrent(childData));
  }
  const list = titles.map((title: any, i: any) => ({ id: i, title: title }));

  function getTime(ts: any) {
    const date = new Date(ts);
    let hours = date.getHours();
    let minutes: string | number = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  console.log("----------- Audio Profile Container -----------", data, data1);

  return (
    <div
      className={`w-[${
        width ? width : "100%"
      }]  bg-[#ffe3e170] rounded-xl p-[25px] px-[35px] pt-[30px]`}
    >
      {data1?.companyId?.company_name && (
        <div className="w-[90%] flex justify-around">
          <div className="flex gap-2 text-[black]">
            <Image
              src={getBasicIcon("buildingIcon")}
              style={{
                zIndex: 10,
              }}
              alt=""
              width={25}
              height={25}
            />
            {data1?.companyId?.company_name}
          </div>
          <div className="flex gap-2 text-[black]">
            <Image
              src={getBasicIcon("Calendar")}
              style={{
                zIndex: 10,
              }}
              alt=""
              width={25}
              height={25}
            />
            {new Date(data1.createdAt).toDateString()}
          </div>
          <div className="flex gap-2 text-[black]">
            <Image
              src={getBasicIcon("Time")}
              style={{
                zIndex: 10,
              }}
              alt=""
              width={25}
              height={25}
            />
            {getTime(data1?.createdAt)}
          </div>
          <div className="flex gap-2 text-[black] items-center">
            {/* <MdOutlineTimer className="w-6 h-6" fill="#3F434A" /> */}
            <Image
              src={getBasicIcon("Timer")}
              style={{
                zIndex: 10,
              }}
              alt=""
              width={25}
              height={25}
            />
            {data?.Duration}
            {/* {data?.activeCall?.call_duration} */}
          </div>
        </div>
      )}
      <hr className="border-t-4 border-red-300 mt-4" />
      <Navigator
        callback={CallBack}
        current={activeTitle}
        list={list}
        width={false}
      />
      <div className="flex justify-between w-[100%] relative overflow-hidden">
        <div className="text-black w-[100%] text-[14px] leading-[21px] mt-[25px] tracking-wide ">
          {activeTitle === 0 && (
            <CallInfo data1={data1} data={data} check={check} type={type} />
          )}
          {activeTitle === 1 && (
            <CommentsAndNotes
              data={data}
              notesData={data}
              refresh={refresh}
              type={type}
            />
          )}
          {activeTitle === 2 && (
            <Coaching data={data} refresh={refresh} type={type} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioProfileContainer;
