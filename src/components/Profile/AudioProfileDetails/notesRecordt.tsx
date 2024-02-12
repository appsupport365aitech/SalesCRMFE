import { getBasicIcon, getRoundedAvatar } from "@/utils/AssetsHelper";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Backdrop from "@/components/View/Backdrop/Center";
import Notesd from "./notedummy";
import axios from "axios";
import { useAppDispatch } from "@/store/store";
import { setError, setSuccess } from "@/store/ai";
import { baseUrl } from "@/utils/baseUrl";

const Note = ({ title, content, date, time }: any) => {
  return (
    <div className=" mb-[30px] w-full shrink-0 mt-[5px] min-h-[200px] px-[12px] py-[28px] pb-[40px] flex flex-col bg-white border border-gray-200 rounded-lg shadow ">
      <div className="flex justify-between pb-4">
        <p className=" text-[18px] font-medium text-[#3F434A] capitalize">
          {title}
        </p>
        <div>
          <p className="font-medium flex text-gray-600">{date}</p>
          <p className="font-medium flex text-gray-600">{time}</p>
        </div>
      </div>
      <p className="text-left  text-[14px] font-medium text-gray-500">
        {content}
      </p>
    </div>
  );
};

const Notes = ({ data, refresh }: any) => {
  const [list, setList] = useState<any>([...data?.notes]);

  const [notes, setNotes] = React.useState(false);
  const [bool, setBool] = React.useState(true);
  const showNotes = () => {
    setNotes(true);
  };
  const [content, setContent] = React.useState({
    title: "",
    content: "",
  });

  const containerRef: any = useRef();
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    if (window !== undefined) {
      setAccessToken(localStorage.getItem("access-token") || "");
    }
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0; // Set scrollTop to 0 to scroll to the top
    }
  });

  const dispatch = useAppDispatch();
  const cancelNotes = (e: any) => {
    if (e) {
      // setList([...list, e]);
      const url = `${baseUrl}api/calling/notes`;
      const { title, content } = e;
      axios
        .post(
          url,
          {
            title: title,
            content: content,
            callId: data?._id,
          },
          { headers: { Authorization: accessToken } }
        )
        .then((e) => {
          if (containerRef.current) {
            containerRef.current.scrollTop = 0; // Set scrollTop to 0 to scroll to the top
          }
          const iso = new Date().toISOString();
          setList([
            ...list,
            {
              title: title,
              content: content,
              updatedAt: iso,
            },
          ]);
          dispatch(
            setSuccess({
              show: true,
              success: "Note Added Successfully!",
            })
          );
        })
        .catch((e) => {
          dispatch(
            setError({
              show: true,
              error: "Error Occured!",
            })
          );
        });
    }
    setBool(false);
    setTimeout(() => {
      setNotes(false);
      setBool(true);
    }, 1700);
  };

  function convertISODateToString(isoDateString: any) {
    if (isoDateString) {
      // Create a new Date object using the ISO date string
      const dateObject = new Date(isoDateString);

      // Define the month names array
      const monthNames = [
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

      // Extract the day, month, and year from the date object
      const day = dateObject.getDate();
      const monthIndex = dateObject.getMonth();
      const year = dateObject.getFullYear();

      // Create the formatted date string
      const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;

      return formattedDate;
    }
    return "-";
  }

  // function extractTime(dateTimeString: string): Date {
  //   const date = new Date(dateTimeString);
  //   const extractedTime = new Date(
  //     date.getHours(),
  //     date.getMinutes(),
  //     date.getSeconds()
  //   );

  //   return extractedTime;
  // }

  return (
    <>
      {notes && (
        <Backdrop bool={bool}>
          <Notesd cancel={cancelNotes} />
        </Backdrop>
      )}
      <div className="w-[100%] mt-4">
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold">Notes</p>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => {
                showNotes();
              }}
              className="bg-bg-red hover:bg-[#ff7d6d] flex items-center pl-[12px] right-0 rounded-xl pr-[12px] p-[10px]"
            >
              <p className="whitespace-nowrap font-medium text-[14px] pl-[5px] pr-[5px] text-[#ffffff] ">
                Add Note
              </p>
              <Image
                src={getBasicIcon("Plus")}
                className={`w-[20px] svg-white`}
                alt=""
                width={20}
                height={20}
                style={{
                  objectFit: "contain",
                }}
              />
            </button>
          </div>
        </div>
        <div
          ref={containerRef}
          className=" overflow-y-auto flex flex-col custom-scroll-black h-[70vh]"
        >
          <div className="flex flex-col-reverse ">
            {list?.map((item: any, i: any) => {
              return (
                <Note
                  title={item.title}
                  key={i}
                  content={item.content}
                  date={convertISODateToString(item.updatedAt)}
                  // time={item.createdAt}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notes;
