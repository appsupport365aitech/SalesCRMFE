import { getBasicIcon } from "@/utils/AssetsHelper";
import Image from "next/image";
import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { setError, setSuccess } from "@/store/ai";
import { useAppDispatch } from "@/store/store";
import Notes from "./notesRecordt";
import { baseUrl } from "@/utils/baseUrl";

const Comment = ({ user, content, time, reply, last, replied }: any) => {
  const [repVis, setRepVis] = useState(false);
  const [rep, setRep] = useState([{}]);
  const [text, setText] = React.useState("");
  const [emoji, setEmoji] = useState(false);
  function getCurrentTimeInHoursAndMinutes() {
    let now = new Date();
    let hours: any = now.getHours();
    let minutes: any = now.getMinutes();

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return {
      time: hours + ":" + minutes,
      timeInms: now,
    };
  }
  const setReply = () => {
    setRep((prev) => [...prev, { time: Date.now(), text: text }]);
    replied({ time: getCurrentTimeInHoursAndMinutes().time, text: text });
    setText("");
  };
  return (
    <div className=" mb-4 rounded-xl  border-[1px] border-[#ccc] py-[10px]">
      <div className="flex items-center justify-between my-2 ml-7">
        <h3 className="text-[16px] text-black  font-medium">
          {parseInt(user.replace(/\D/g, "").substr(0, 4))}
        </h3>
        <p className="text-sm text-gray-600 mr-10 font-medium">{last}</p>
      </div>

      <div className="flex items-center ">
        <p
          className="ml-7 chked text-small font-base text-black-500 "
          dangerouslySetInnerHTML={{ __html: content }}
        ></p>
      </div>
      <button
        onClick={() => {
          setRepVis((prev) => !prev);
        }}
        className="py-2 text-red-500 text-small font-medium ml-7"
      >
        Reply
      </button>
      {repVis && (
        <div>
          <div className="relative">
            <textarea
              value={text}
              onChange={(e: any) => {
                setText(e.target.value);
              }}
              placeholder="Write a reply"
              className="resize-none w-[92%] h-[160px] bg-[#fff] apperance-none block text-[16px] tracking-wide text-gray-600 border rounded-2xl ml-8 py-4 px-3 focus:outline-none"
            />
            <div className="flex absolute gap-x-2 right-10 bottom-2">
              <p
                className="text-gray-600 font-semibold text-lg cursor-pointer"
                onClick={() => setText((prev) => prev + "#")}
              >
                #
              </p>
              <p
                className="text-gray-600 font-semibold text-lg cursor-pointer"
                onClick={() => setText((prev) => prev + "@")}
              >
                @
              </p>
              <button
                className=" font-semibold text-lg mt-[1px]"
                onClick={() => setEmoji((prev) => !prev)}
              >
                <Image
                  src={getBasicIcon("Smile")}
                  className={`svg-black`}
                  alt=""
                  width={19}
                  height={19}
                  style={{
                    objectFit: "contain",
                  }}
                />{" "}
              </button>

              {emoji && (
                <>
                  <button
                    className="absolute top-[78.5px] -left-[74px] bg-white z-50"
                    onClick={() => setEmoji(false)}
                  >
                    <Image
                      src={getBasicIcon("Cross")}
                      className={`svg-black`}
                      alt=""
                      width={15}
                      height={15}
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </button>
                  <div className="absolute right-28 top-[50px]">
                    <EmojiPicker
                      height={500}
                      width={400}
                      onEmojiClick={(e) => setText((prev) => prev + e.emoji)}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => {
                setReply();
                setRepVis(false);
              }}
              className="relative bg-bg-red mt-[18px] rounded-xl  w-[90px] h-[30px] ml-auto font-medium tracking-wide pl-[5px] p-[5px] mr-2"
            >
              <p className="whitespace-nowrap font-small text-[15px] pl-[8px] pr-[8px] text-[#ffffff] ">
                Reply
              </p>
            </button>
          </div>
        </div>
      )}
      {reply?.length > 0 && (
        <>
          {reply?.map((item: any, i: any) => {
            return (
              <>
                <div className="flex items-center justify-between my-2 ml-4">
                  <h3 className="text-sm text-black  ml-8  font-medium ">
                    {parseInt(user.replace(/\D/g, "").substr(0, 4))}
                  </h3>
                  <p className="text-sm text-gray-600 mr-10  font-medium  ">
                    {item?.time}
                  </p>
                </div>
                <p className="ml-12 text-[#3F434A] font-small text-black-500 mb-4">
                  {item?.text}
                </p>
              </>
            );
          })}
        </>
      )}
    </div>
  );
};

const CommentsAndNotes = ({ data, notesData, refresh }: any) => {
  const [text, setText] = React.useState("");
  const [list, setList] = React.useState<any>(data?.comments);
  const [emoji, setEmoji] = useState(false);
  const [accessToken, setAccessToken] = useState<any>("");

  useEffect(() => {
    if (window !== undefined) {
      setAccessToken(localStorage.getItem("access-token"));
    }
  }, []);

  useEffect(() => {
    setList(data?.comments);
  }, [data]);

  function getCurrentTimeInHoursAndMinutes() {
    let now = new Date();
    let hours: any = now.getHours();
    let minutes: any = now.getMinutes();

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return {
      time: hours + ":" + minutes,
      timeInms: now,
    };
  }

  function timeToHoursAgo(timestamp: any) {
    const currentTime = Date.now();
    const timeDiff = currentTime - timestamp;
    const hoursAgo = Math.floor(timeDiff / (1000 * 60 * 60));

    if (hoursAgo === 0) {
      return "just now";
    } else if (hoursAgo === 1) {
      return "1 hour ago";
    } else {
      return `${hoursAgo} hours ago`;
    }
  }

  const UpdateCalls = () => {
    setTimeout(() => {
      const urri = `${baseUrl}api/calling/find-by-id?id=${data?._id}`;

      axios
        .get(urri, { headers: { Authorization: accessToken } })
        .then((e) => {})
        .catch((e) => {});
    }, 1000);
  };

  const dispatch = useAppDispatch();

  return (
    <>
      <div className="flex w-[100%] h-[600px] flex-col px-[20px]">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e: any) => {
              setText(e.target.value);
            }}
            placeholder="Write a comment"
            className="resize-none w-[100%] h-[160px] bg-[#fff] apperance-none block text-[16px] tracking-wide text-gray-600 rounded-2xl py-4 px-3 focus:outline-none"
          />
          <div className="flex absolute gap-x-2 right-5 bottom-2">
            <p
              className="text-gray-600 font-semibold text-lg cursor-pointer"
              onClick={() => setText((prev) => prev + "@")}
            >
              @
            </p>
            <p
              className="text-gray-600 font-semibold text-lg cursor-pointer"
              onClick={() => setText((prev) => prev + "#")}
            >
              #
            </p>
            <button
              className=" font-semibold text-lg mt-[1px]"
              onClick={() => setEmoji((prev) => !prev)}
            >
              <Image
                src={getBasicIcon("Smile")}
                className={`svg-black`}
                alt=""
                width={19}
                height={19}
                style={{
                  objectFit: "contain",
                }}
              />{" "}
            </button>

            {emoji && (
              <>
                <button
                  className="absolute top-[78.5px] left-[14px] bg-white z-50"
                  onClick={() => setEmoji(false)}
                >
                  <Image
                    src={getBasicIcon("Cross")}
                    className={`svg-black`}
                    alt=""
                    width={15}
                    height={15}
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </button>
                <div className="absolute right-6 top-[50px]">
                  <EmojiPicker
                    height={500}
                    width={400}
                    onEmojiClick={(e) => setText((prev) => prev + e.emoji)}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <button
          onClick={() => {
            if (text?.length !== 0) {
              const letsSee = {
                user: window !== undefined && localStorage.getItem("user-id"),
                content: text,
                time: getCurrentTimeInHoursAndMinutes().time,
                last: timeToHoursAgo(
                  getCurrentTimeInHoursAndMinutes().timeInms
                ),
                reply: [
                  // {
                  //       user: "Micheal",
                  //       content:
                  //         "Thanks Jane!Thought was the best way to give more clarity about our product and services.",
                  //       last: "16h ago",
                  //     },
                ],
              };
              // setList([...list, letsSee]);
              axios
                .post(
                  `${baseUrl}api/recording/addAndUpdateComments`,
                  {
                    callId: data._id,
                    comments: [...list, letsSee],
                  },
                  { headers: { Authorization: accessToken } }
                )
                .then((e) => {
                  UpdateCalls();
                  if (refresh) {
                    refresh();
                  }
                  dispatch(
                    setSuccess({
                      show: true,
                      success: "comment Added Successfully!",
                    })
                  );
                })
                .catch(() => {
                  dispatch(
                    setError({
                      show: true,
                      error: "Error Occured!",
                    })
                  );
                });
              setText("");
            }
          }}
          className="bg-bg-red hover:bg-[#ff7d6d] mt-[18px] rounded-xl justify-end w-[140px] h-[38px] ml-auto font-medium tracking-wide pl-[5px] p-[8px]"
        >
          <p className="whitespace-nowrap font-large text-[15px] pl-[8px] pr-[8px] text-[#ffffff] ">
            Comment
          </p>
        </button>
        <hr className="border-t-4 border-gray-300 mt-4" />
        <div className="my-4 overflow-y-auto custom-scroll-black">
          {list?.map((item: any, i: any) => {
            return (
              <Comment
                key={i}
                user={item?.user}
                content={item?.content}
                last={item?.last}
                time={item?.time}
                reply={item?.reply}
                refresh={refresh}
                replied={(e: any) => {
                  const finalList = list;
                  finalList[i].reply.push(e);
                  axios
                    .post(
                      `${baseUrl}api/recording/addAndUpdateComments`,
                      {
                        callId: data._id,
                        comments: finalList,
                      },
                      { headers: { Authorization: accessToken } }
                    )
                    .then((e) => {
                      UpdateCalls();
                      dispatch(
                        setSuccess({
                          show: true,
                          success: "Reply added Successfully!",
                        })
                      );
                      if (refresh) {
                        console.log(
                          "-------------- reply added successfully ------------"
                        );
                        refresh();
                      }
                    })
                    .catch(() => {
                      dispatch(
                        setError({
                          show: true,
                          error: "Error Occured!",
                        })
                      );
                    });
                }}
              />
            );
          })}
        </div>
      </div>
      <hr className="border-t-4 border-gray-300" />
      <Notes data={notesData} refresh={refresh} />
    </>
  );
};

export default CommentsAndNotes;
