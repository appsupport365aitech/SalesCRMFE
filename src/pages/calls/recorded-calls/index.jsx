import Navigation from "@/components/app/Navigation";
import DUMMY from "@/shared/dummy";
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import dummy from "@/shared/dummy";
import { useRouter } from "next/router";
import Navbar from "@/components/app/Navbar/Navbar";
import CallsRecordingContainer from "@/components/calls/recorded-calls/Container/CallsRecordingContainer";
import MeetingRecordingContainer from "@/components/calls/recorded-calls/Container/MeetingRecordingContainer";
import { baseUrl } from "@/utils/baseUrl";

const Calls = () => {
  const [recodedCalls, setRecordedCalls] = useState(true);
  const [recodedMeeting, setRecodedMeeting] = useState(false);
  const [data, setData] = useState({});
  const [accessToken, setAccessToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (window !== undefined) {
      setAccessToken(localStorage.getItem("access-token") || "");
    }
  }, []);

  const getData = () => {
    const apiEndpoint = recodedCalls
      ? `${baseUrl}api/recording/find-all`
      : `${baseUrl}api/event/findAllRecordedMeetings`;
    try {
      axios
        .get(apiEndpoint, {
          headers: { Authorization: accessToken },
        })
        .then((res) => {
          setData(res.data);
        });
    } catch (error) {}
  };

  useEffect(() => {
    if (!accessToken) return;
    else {
      getData();
    }
  }, [accessToken]);

  useEffect(() => {
    const handleBeforeHistoryChange = () => {
      router.events.on("beforeHistoryChange", handleBeforeHistoryChange);
      router.beforePopState(() => {
        router.events.off("beforeHistoryChange", handleBeforeHistoryChange);
        return true;
      });
    };

    handleBeforeHistoryChange();

    return () => {
      router.events.off("beforeHistoryChange", handleBeforeHistoryChange);
    };
  }, []);

  const gotoCallRecording = () => {
    setRecordedCalls(true);
    setRecodedMeeting(false);
  };

  const gotoMeetingRecording = () => {
    setRecordedCalls(false);
    setRecodedMeeting(true);
  };

  return (
    <>
      <Navbar mainTitle="Calls" title="Recorded Calls" src="Phone" />
      <div className="w-[100%] min-h-[90vh] pl-[40px] pr-[40px]">
        <div className="flex justify-between items-center mt-6 pb-5">
          <button
            onClick={gotoCallRecording}
            className={
              recodedCalls
                ? "focus:outline-none text-black bg-[#fe5043ad] hover:bg-[#fe50437a] font-medium rounded-lg text-md px-16 py-1.5 mt-2 mb-2"
                : "text-black font-medium text-md hover:bg-[#fe5043ad] hover:rounded-lg hover:py-1.5 hover:px-16 hover:mt-2 hover:mb-2"
            }
          >
            Call Recordings
          </button>
          <div className="w-[40%]">
            <button
              onClick={gotoMeetingRecording}
              // className="bg-bg-red w-[70%]"
              className={
                recodedMeeting
                  ? "focus:outline-none text-black bg-[#fe5043ad] hover:bg-[#fe50437a] font-medium rounded-lg text-md px-16 py-1.5 mt-2 mb-2"
                  : "text-black font-medium text-md hover:bg-[#fe5043ad] hover:rounded-lg hover:py-1.5 hover:px-16 hover:mt-2 hover:mb-2"
              }
            >
              Meeting Recordings
            </button>
          </div>
        </div>
        <hr className="border-t-2 border-gray-300 mb-4" />
        {recodedCalls && (
          <CallsRecordingContainer data={data} dummy1={DUMMY} dummy2={dummy} />
        )}
        {recodedMeeting && (
          <MeetingRecordingContainer
            data={data}
            dummy1={DUMMY}
            dummy2={dummy}
          />
        )}
      </div>
    </>
  );
};

// export async function getServerSideProps({ query, ...params }: any) {
//   const response = await axios.get(
//     "https://sales365.trainright.fit/api/recording/find-all"
//   );
//   return {
//     props: {
//       // TODO: Can do better error handling here by passing another property error in the component
//       data: response.data || {},
//     }, // will be passed to the page component as props
//   };
// }

export default Calls;
