import { getBasicIcon } from "@/utils/AssetsHelper";
import { baseUrl } from "@/utils/baseUrl";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Search = ({ input, change }: any) => {
  return (
    <div className="w-full px-[8px] mt-[30px] ">
      <div className="w-[100%] h-[40px] border-[#ccc] border-[1px] rounded-[12px]  flex items-center overflow-hidden">
        <div className="h-[100%] w-[40px] px-[12px] flex items-center justify-center cursor-pointer ">
          <Image
            className="w-[100%]"
            src={getBasicIcon("Search")}
            width={16}
            height={16}
            alt=""
          />
        </div>
        <div className="grow h-[32px] ">
          <input
            type="text"
            value={input}
            onInput={change}
            className="w-[100%] font-medium h-[32px] bg-white outline-0 text-black "
            placeholder="Search Transcript..."
          />
        </div>
        {/* <div className="h-[100%] w-[40px] px-[12px] flex items-center justify-center cursor-pointer ">
          <Image
            className="w-[100%]"
            src={getBasicIcon("Filter")}
            width={16}
            height={16}
            alt=""
          />
        </div> */}
      </div>
    </div>
  );
};

const Transcript = ({
  src,
  data,
  text,
  utterances,
}: {
  src: any;
  data: any;
  text: any;
  utterances: any;
}) => {
  // url = `${baseUrl}api/audio-transcript/create/by-audio-url`
  // method = post
  // body = {
  //     "audio_url":"",
  //     "leadId":"21345678778678687",
  //     "callId":"34567890876546788"
  // }
  // console.log('+++++++++ Transcript +++++++++', utterances);

  const [superArr, setSuperArr] = useState<any>([]);
  const [Arrr, setArr] = useState<any>([]);

  const initializeArrr = () => {
    const py = utterances?.map((uttrItem: any) => {
      return {
        title: uttrItem.speaker === "A" ? "A" : "B",
        message: uttrItem.text,
        start: uttrItem.start,
        end: uttrItem.end,
      };
    });
    setArr(py);
    setSuperArr(py);
  };

  useEffect(() => {
    initializeArrr();
  }, [src, data, text, utterances]);

  useEffect(() => {
    Arrr;
    // console.log('=========== Arrr ============', Arrr)
  }, [Arrr]);

  const [input, setInput] = useState("");

  // const transcriptUpdate = async () => {
  //   const res = await axios.post(
  //     `${baseUrl}api/audio-transcript/create/by-audio-url`,
  //     {
  //       audio_url: src,
  //       leadId: data.leadId._id,
  //       callId: data._id,
  //     }
  //   );

  //   setArr([{ title: "speaker 1", message: res.data.result.text }]);
  // };

  // React.useEffect(() => {
  //   if (Arrr) {
  //     if (Arrr.length === 0) {
  //       transcriptUpdate();
  //     }
  //   }
  // });

  function convertMilliseconds(milliseconds: any) {
    let seconds = Math.floor(milliseconds / 1000) % 60;
    let minutes = Math.floor(milliseconds / (1000 * 60));
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  return (
    <div className="pt-[1px] bg-white rounded-xl mt-8 ">
      <Search
        change={(e: any) => {
          setInput(e.target.value);
          const str = e.target.value;
          const newArr = superArr
            .filter((item: any) =>
              item.message.toLowerCase().includes(str.toLowerCase())
            )
            .map((item: any) => {
              let newTitle = item.title.replace(
                new RegExp(str, "gi"),
                (match: any) =>
                  `<mark style="background: #304ffd; color: white;">${match}</mark>`
              );
              let newBody = item.message.replace(
                new RegExp(str, "gi"),
                (match: any) =>
                  `<mark style="background:#304ffd; color: white;">${match}</mark>`
              );
              return {
                ...item,
                // title: newTitle,
                message: newBody,
              };
            });
          if (str !== "") {
            setArr(newArr);
          } else {
            initializeArrr();
          }
        }}
        input={input}
      />
      <div className="pt-3">
        <div className="px-4">
          {Arrr?.map((item: any, i: any) => {
            return (
              <React.Fragment key={i}>
                <div className="flex  my-[8px] ">
                  <p
                    className="text-[#304FFD] shrink-0 w-[48px] font-medium text-[15px] tracking-wide"
                    style={{
                      color: item.title === "A" ? "#4091FF" : "#FE5143",
                    }}
                    // dangerouslySetInnerHTML={{
                    //   // __html: `00:05 ${item.title}:`,
                    //   __html: `${convertMilliseconds(item.start)} ${
                    //     item.title
                    //   }:`,
                    // }}
                  >
                    {convertMilliseconds(item.start)}
                  </p>
                  <p
                    className="text-[#304FFD] shrink-0 w-28 font-medium text-[15px] tracking-wide"
                    style={{
                      color: item.title === "A" ? "#4091FF" : "#FE5143",
                    }}
                    // dangerouslySetInnerHTML={{
                    //   // __html: `00:05 ${item.title}:`,
                    //   __html: `${convertMilliseconds(item.start)} ${
                    //     item.title
                    //   }:`,
                    // }}
                  >
                    {item.title == "A"
                      ? data?.activeCall?.owner?.name
                      : item.title == "B"
                      ? data?.leadId?.customer_name
                      : ""}
                  </p>
                  <p
                    className=" text-gray-600 tracking-wide font-medium text-[15px]"
                    dangerouslySetInnerHTML={{ __html: item.message }}
                  ></p>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Transcript;
