import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Tracker from "../conversation-tracker";
import Transcript from "../Transcript/Transcript";
import { getBasicIcon } from "@/utils/AssetsHelper";
import useSound from "use-sound";
import AudioPlayer from "./components/AudioPlayer";
import axios from "axios";

const example = {
  _id: "645de31400349f961f8be6ef",
  Sid: "a6e30e820b4bc92a6532000378a9175c",
  ParentCallSid: "",
  DateCreated: "2023-05-12T06:56:19.000Z",
  DateUpdated: "2023-05-12T06:58:06.000Z",
  AccountSid: "westoryboard1",
  To: "07669481778",
  From: "09639973583",
  PhoneNumberSid: "01140845638",
  Status: "loading",
  StartTime: "2023-05-12T06:56:19.000Z",
  EndTime: "2023-05-12T06:57:46.000Z",
  Duration: "1970-01-01T00:00:00.087Z",
  Price: "2.3",
  Direction: "outbound-api",
  AnsweredBy: "human",
  ForwardedFrom: "",
  CallerName: "",
  Uri: "/v1/Accounts/westoryboard1/Calls/a6e30e820b4bc92a6532000378a9175c.json",
  RecordingUrl:
    "https://salescrm247.s3.ap-northeast-1.amazonaws.com/a6e30e820b4bc92a6532000378a9175c.mp3",
  leadId: "6457d6af90467877fd402840",
  questionnaire: [],
  comments: [],
  notes: [],
  createdAt: "2023-05-12T06:56:20.379Z",
  updatedAt: "2023-05-12T07:01:57.836Z",
  transcriptId: {
    auto_highlights_result: {
      results: [],
    },
    utterances: [],
    chapters: [],
    sentiment_analysis_results: [],
    entities: [],
    _id: "645de3c200349f961f8be711",
    audio_url:
      "https://salescrm247.s3.amazonaws.com/a6e30e820b4bc92a6532000378a9175c.mp3",
    transId: "6g66u8t6rs-8aa1-4fd2-a54c-4674cc9267e2",
    language_model: "assemblyai_default",
    acoustic_model: "assemblyai_default",
    language_code: "en_us",
    status: "completed",
    text: "Hello? Hello, Andre. Apart from calling already calling all the test for professional such as you, Robo, you know, Data, Hannah, Cora, the other integrated changes, but no good job. Recorded calls for igna. So of course, your mundab script or skilled status connect. I'm going to press here. Yeah.",
    words: [
      {
        text: "Hello?",
        start: 1210,
        end: 1760,
        confidence: 1,
        speaker: null,
      },
      {
        text: "Hello,",
        start: 2370,
        end: 3120,
        confidence: 0.58,
        speaker: null,
      },
      {
        text: "Andre.",
        start: 3810,
        end: 4750,
        confidence: 0.24831,
        speaker: null,
      },
      {
        text: "Apart",
        start: 5570,
        end: 6026,
        confidence: 0.63064,
        speaker: null,
      },
      {
        text: "from",
        start: 6058,
        end: 6638,
        confidence: 0.51753,
        speaker: null,
      },
      {
        text: "calling",
        start: 6804,
        end: 7182,
        confidence: 0.5501,
        speaker: null,
      },
      {
        text: "already",
        start: 7236,
        end: 7840,
        confidence: 0.46915,
        speaker: null,
      },
      {
        text: "calling",
        start: 13250,
        end: 13854,
        confidence: 0.96422,
        speaker: null,
      },
      {
        text: "all",
        start: 13972,
        end: 14640,
        confidence: 0.55252,
        speaker: null,
      },
      {
        text: "the",
        start: 17890,
        end: 18206,
        confidence: 0.54,
        speaker: null,
      },
      {
        text: "test",
        start: 18228,
        end: 18462,
        confidence: 0.6629,
        speaker: null,
      },
      {
        text: "for",
        start: 18516,
        end: 18686,
        confidence: 0.64,
        speaker: null,
      },
      {
        text: "professional",
        start: 18708,
        end: 19710,
        confidence: 0.5595,
        speaker: null,
      },
      {
        text: "such",
        start: 20450,
        end: 20814,
        confidence: 0.83207,
        speaker: null,
      },
      {
        text: "as",
        start: 20852,
        end: 21440,
        confidence: 0.47561,
        speaker: null,
      },
      {
        text: "you,",
        start: 25450,
        end: 25814,
        confidence: 0.82,
        speaker: null,
      },
      {
        text: "Robo,",
        start: 25852,
        end: 26162,
        confidence: 0.28199,
        speaker: null,
      },
      {
        text: "you",
        start: 26226,
        end: 26406,
        confidence: 0.61,
        speaker: null,
      },
      {
        text: "know,",
        start: 26428,
        end: 26614,
        confidence: 0.99886,
        speaker: null,
      },
      {
        text: "Data,",
        start: 26652,
        end: 27240,
        confidence: 0.81997,
        speaker: null,
      },
      {
        text: "Hannah,",
        start: 27930,
        end: 28466,
        confidence: 0.17983,
        speaker: null,
      },
      {
        text: "Cora,",
        start: 28498,
        end: 28866,
        confidence: 0.33553,
        speaker: null,
      },
      {
        text: "the",
        start: 28898,
        end: 29190,
        confidence: 0.51,
        speaker: null,
      },
      {
        text: "other",
        start: 29260,
        end: 29590,
        confidence: 0.77899,
        speaker: null,
      },
      {
        text: "integrated",
        start: 29660,
        end: 30470,
        confidence: 0.05035,
        speaker: null,
      },
      {
        text: "changes,",
        start: 34570,
        end: 35030,
        confidence: 0.90785,
        speaker: null,
      },
      {
        text: "but",
        start: 35100,
        end: 35286,
        confidence: 0.74477,
        speaker: null,
      },
      {
        text: "no",
        start: 35308,
        end: 35494,
        confidence: 0.69,
        speaker: null,
      },
      {
        text: "good",
        start: 35532,
        end: 35734,
        confidence: 0.3409,
        speaker: null,
      },
      {
        text: "job.",
        start: 35772,
        end: 36214,
        confidence: 0.54769,
        speaker: null,
      },
      {
        text: "Recorded",
        start: 36332,
        end: 36854,
        confidence: 0.64125,
        speaker: null,
      },
      {
        text: "calls",
        start: 36972,
        end: 37346,
        confidence: 0.37933,
        speaker: null,
      },
      {
        text: "for",
        start: 37378,
        end: 37526,
        confidence: 0.35,
        speaker: null,
      },
      {
        text: "igna.",
        start: 37548,
        end: 38310,
        confidence: 0.03457,
        speaker: null,
      },
      {
        text: "So",
        start: 39130,
        end: 39542,
        confidence: 0.70686,
        speaker: null,
      },
      {
        text: "of",
        start: 39596,
        end: 39766,
        confidence: 0.91,
        speaker: null,
      },
      {
        text: "course,",
        start: 39788,
        end: 39974,
        confidence: 0.99978,
        speaker: null,
      },
      {
        text: "your",
        start: 40012,
        end: 40166,
        confidence: 0.32244,
        speaker: null,
      },
      {
        text: "mundab",
        start: 40188,
        end: 40930,
        confidence: 0.06251,
        speaker: null,
      },
      {
        text: "script",
        start: 41090,
        end: 41506,
        confidence: 0.57777,
        speaker: null,
      },
      {
        text: "or",
        start: 41538,
        end: 41734,
        confidence: 0.84579,
        speaker: null,
      },
      {
        text: "skilled",
        start: 41772,
        end: 42630,
        confidence: 0.47479,
        speaker: null,
      },
      {
        text: "status",
        start: 45050,
        end: 45650,
        confidence: 0.2973,
        speaker: null,
      },
      {
        text: "connect.",
        start: 45730,
        end: 46360,
        confidence: 0.55306,
        speaker: null,
      },
      {
        text: "I'm",
        start: 50450,
        end: 50730,
        confidence: 0.04026,
        speaker: null,
      },
      {
        text: "going",
        start: 50730,
        end: 50798,
        confidence: 0.84931,
        speaker: null,
      },
      {
        text: "to",
        start: 50804,
        end: 50926,
        confidence: 0.99,
        speaker: null,
      },
      {
        text: "press",
        start: 50948,
        end: 51134,
        confidence: 0.14936,
        speaker: null,
      },
      {
        text: "here.",
        start: 51172,
        end: 51760,
        confidence: 0.34728,
        speaker: null,
      },
      {
        text: "Yeah.",
        start: 55650,
        end: 55900,
        confidence: 0.5,
        speaker: null,
      },
    ],
    confidence: "0.5574188",
    audio_duration: "60",
    createdAt: "2023-05-12T06:59:14.583Z",
    updatedAt: "2023-05-12T07:06:20.719Z",
    __v: 0,
  },
};

const CallHolder = ({ click }: any) => {
  return (
    <div
      onClick={() => {
        click();
      }}
      className="w-[25px]  h-[25px] flex shrink-0 drop-shadow-md  absolute items-center cursor-pointer justify-center  top-[-10px] right-[-10px] "
    >
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
  const [playing, setPlaying] = React.useState(false);
  const ref: any = useRef();
  React.useEffect(() => {});

  return (
    <div className="w-[100%] h-[100px] mb-[100px] mt-[20px] px-[40px]">
      <p className="text-[34px] mb-[70px] font-medium tracking-wide text-[#000]">
        Call Player
      </p>
      <audio src="/poor-audio.ogg" ref={ref}></audio>
      <div className="w-[100%]  h-[4px] mt-[10px] flex bg-[#fff] relative rounded-[3px]">
        <div className="h-[100%] w-[40%] bg-bg-red rounded-l-[3px] relative">
          <CallHolder click={() => {}} />
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
          onClick={() => {
            if (!playing) {
              setPlaying(true);
              ref.current.play();
            } else {
              setPlaying(false);
              ref.current.pause();
            }
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

const list = [
  {
    duration: 40,
    at: 20,
  },
  {
    duration: 60,
    at: 80,
  },
  {
    duration: 30,
    at: 160,
  },
  {
    duration: 40,
    at: 210,
  },
  {
    duration: 40,
    at: 280,
  },
  {
    duration: 40,
    at: 320,
  },
  {
    duration: 40,
    at: 400,
  },
  {
    duration: 40,
    at: 500,
  },
];

const Audio = ({ data, data1, data2 }: any) => {
  const [callData, setCallData] = useState<any>(data2);
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    if (window !== undefined) {
      setAccessToken(localStorage.getItem("access-token") || "");
    }
  }, []);

  useEffect(() => {
    setCallData(data2);
  }, [data2]);

  const callOwnerDuration: any = [];
  const callParticipentsDuration: any = [];
  let currentDurationForOwner = 0;
  let currentTimeForOwner = 0;
  let currentDurationForCustomar = 0;
  let currentTimeForCustomar = 0;

  callData?.transcriptId?.utterances.forEach((segment: any) => {
    if (segment.speaker === "A") {
      const segmentDuration = (segment.end - segment.start) / 100;
      callOwnerDuration.push({
        duration: segmentDuration,
        at: currentTimeForOwner,
      });
      currentDurationForOwner += segmentDuration;
    }

    currentTimeForOwner = segment.end / 100;
  });
  callData?.transcriptId?.utterances.forEach((segment: any) => {
    if (segment.speaker === "B") {
      const segmentDuration = (segment.end - segment.start) / 100;
      callParticipentsDuration.push({
        duration: segmentDuration,
        at: currentTimeForCustomar,
      });
      currentDurationForCustomar += segmentDuration;
    }

    currentTimeForCustomar = segment.end / 100;
  });

  return (
    <>
      {/* <div className="w-full relative p-[20px] ">
        <div className="w-full h-full flex  absolute z-10 top-0 left-0 items-center justify-center ">
          <div className="w-[100px] h-[100px] cursor-pointer flex items-center justify-center rounded-[34px] bg-white">
            <img src="/Play.svg" className="" alt="" />
          </div>
        </div>
        <img src="/video.svg" className="w-full rounded-2xl" alt="" />
      </div> */}
      {/* <CallPlayer /> */}
      {data?.Status === "completed" && (
        <>
          <AudioPlayer src={data?.RecordingUrl} />
          <div className="w-full mt-[30px] mb-[30px] bg-white rounded-xl p-7 ">
            <div className="flex gap-8 justify-between items-center">
              <h1 className="text-[16px] w-[172px] font-medium text-black capitalize mb-[10px]">
                call data
              </h1>
              <div className="w-full gap-2 flex items-center">
                <Image
                  src={getBasicIcon("Rectangle_381")}
                  className="h-[20px]"
                  alt=""
                  width={10}
                  height={10}
                />
                <p className="text-gray-600 flex gap-1 text-[14px]">
                  Call owner:
                  <p className="uppercase">{data?.activeCall?.owner?.name}</p>
                </p>
              </div>
              <div className="w-full gap-2 flex items-center mt-[6px]">
                <Image
                  src={getBasicIcon("Rectangle_380")}
                  className="h-[20px]"
                  alt=""
                  width={10}
                  height={10}
                />
                <p className="text-gray-600 flex gap-2 items-center w-full text-[14px]">
                  Participant:{" "}
                  <p className="">
                    {data?.activeCall?.participants?.customer_name}
                  </p>
                </p>
              </div>
            </div>
            <Tracker
              title={data?.activeCall?.owner?.name}
              uppercase={true}
              list={callOwnerDuration}
              color={"#4091FF"}
            />
            <Tracker
              title={data?.activeCall?.participants?.customer_name}
              list={callParticipentsDuration}
              color={"#FE5143"}
            />
            {/* <Tracker title={"Topics"} list={list} color={"#434343"} /> */}
          </div>
          <div className="bg-white rounded-lg pb-4">
            <Transcript
              src={data.RecordingUrl}
              data={data}
              utterances={callData?.transcriptId?.utterances}
              text={callData?.transcriptId?.text}
            />
          </div>
        </>
      )}
      {data?.Status === "in-progress" && (
        <>
          <AudioPlayer src={data?.RecordingUrl} />
          <div className="bg-white rounded-xl pb-3">
            <div className="w-full mt-[30px] mb-[30px] py-6 px-[38px] bg-white rounded-xl">
              <h1 className="text-[16px] font-medium text-black uppercase mb-[10px]">
                call data
              </h1>
              <div className="w-full flex items-center">
                <Image
                  src="/Images/dots/Dot.svg"
                  className="h-[18px] svg-ellipse-5 mr-[25px]"
                  alt=""
                  width={10}
                  height={10}
                />
                <p className="text-[#304FFD] text-[14px]">{data?.CallerName}</p>
              </div>
              <div className="w-full flex items-center mt-[6px]">
                <Image
                  src="/Images/dots/Dot.svg"
                  className="h-[18px] svg-ellipse-6 mr-[25px]"
                  alt=""
                  width={10}
                  height={10}
                />
                <p className="text-[#FF965D] text-[14px]">{data?.AnsweredBy}</p>
              </div>
            </div>
            <Tracker title={data?.CallerName} list={list} color={"#304FFD"} />
            <Tracker title={data?.AnsweredBy} list={list} color={"#FF965D"} />
            {/* <Tracker title={"Topics"} list={list} color={"#0090FF"} /> */}
          </div>
          <Transcript
            src={data?.RecordingUrl}
            data={data}
            utterances={callData?.transcriptId?.utterances}
            text={callData?.transcriptId?.text}
          />
        </>
      )}
      {data?.Status === "no-answer" && (
        <>
          {/* <AudioPlayer src={data.RecordingUrl} /> */}
          <div className="w-full mt-[30px] mb-[30px] px-[38px] ">
            <h1 className="text-[16px] font-medium text-[#888] text-center  capitalize mb-[10px]">
              Sorry, there is no recording or transcript as the Call Wasn&apos;t
              Answered
            </h1>
          </div>
        </>
      )}
      {data?.Status === "failed" && (
        <>
          {/* <AudioPlayer src={data.RecordingUrl} /> */}
          <div className="w-full mt-[30px] mb-[30px] px-[38px] ">
            <h1 className="text-[16px] font-medium text-[#888] text-center  capitalize mb-[10px]">
              Sorry, the Call status failed for some unknown reason!
            </h1>
          </div>
        </>
      )}
      {data?.Status === "loading" && (
        <>
          {/* <AudioPlayer src={data.RecordingUrl} /> */}
          <div className="w-full mt-[30px] mb-[30px] px-[38px] ">
            <h1 className="text-[16px] font-medium text-[#888] text-center  capitalize mb-[10px]">
              The Results are not available right now, please try again later
            </h1>
          </div>
        </>
      )}
    </>
  );
};

export default Audio;
