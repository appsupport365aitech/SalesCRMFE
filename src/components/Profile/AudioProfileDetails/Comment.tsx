import { getBasicIcon } from "@/utils/AssetsHelper";
import Image from "next/image";
import EmojiPicker from 'emoji-picker-react';
import React, { useState } from "react";

const Comment = ({ user, content, time, reply, last }: any) => {
  const [repVis, setRepVis] = useState(false);
  const [rep,setRep] = useState([{}]);
  const [text, setText] = React.useState("");
  const [emoji,setEmoji]= useState(false);
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
      timeInms:now
    };
  }
  const setReply=()=>{
    setRep((prev)=>[...prev,{time:Date.now(),text:text}])
    reply.push({time:getCurrentTimeInHoursAndMinutes().time,text:text});
    setText("");
    console.log(reply);
  }
  return (
    <div className="border-t-[1px] border-[#ccc] py-[20px]">
      <div className="flex items-center justify-between my-2 ml-4">
        <h3 className="text-[16px] text-black  ml-4  font-medium">
          {user}
        </h3>
        <p className="text-sm text-gray-600 mr-10 font-medium">{last}</p>
      </div>
      <p className="block  font-medium  text-renal-blue py-2 ml-7 text-xs font-small  hover:text-indigo-500">
        *{time}
      </p>
      <div className="flex items-center ">
        <p
          className="ml-7 chked text-small font-medium text-black-500 "
          dangerouslySetInnerHTML={{ __html: content }}
        ></p>
      </div>
      <button
        onClick={() => {
          setRepVis((prev) => !prev);
        }}
        className="py-2 text-gray-500 text-small font-medium ml-7"
      >
        Reply
      </button>
      {repVis && (
        <div >
          <div className="relative">

<textarea
  value={text}
  onChange={(e: any) => {
    setText(e.target.value);
  }}
  placeholder="Write a comment"
  className="resize-none w-[95%] h-[160px] bg-[#fff] apperance-none block text-[16px] tracking-wide text-gray-600 border rounded-2xl ml-8 py-4 px-3 focus:outline-none"
  />
<div className="flex absolute gap-x-2 right-5 bottom-2">
  <p className="text-gray-600 font-semibold text-lg cursor-pointer" onClick={()=>setText((prev)=>(prev+"#"))}>#</p>
  <p className="text-gray-600 font-semibold text-lg cursor-pointer" onClick={()=>setText((prev)=>(prev+"@"))}>@</p>
  <button className=" font-semibold text-lg mt-[1px]" onClick={()=>setEmoji((prev)=> !prev)}> 
  <Image
    src={getBasicIcon("Smile")}
    className={`svg-black`}
    alt=""
    width={19}
    height={19}
    style={{
      objectFit: "contain",
    }}
    /> </button>
    
    
   {emoji && <>
   <button className="absolute top-[78.5px] -left-[74px] bg-white z-50" onClick={()=>setEmoji(false)}>
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
   <EmojiPicker height={500} width={400} onEmojiClick={(e)=>setText((prev)=> prev + e.emoji)}  /> 
    </div>
    </>}
   
</div>
    </div>
          <button onClick={()=>{ 
              setReply()
              // console.log(reply)
              setRepVis(false); 
          }} className="relative bg-renal-blue mt-[18px] rounded-xl justify-end w-[90px] h-[30px] ml-auto font-medium tracking-wide pl-[5px] p-[5px] left-[27vw]">
            <p  className="whitespace-nowrap font-small text-[15px] pl-[8px] pr-[8px] text-[#ffffff] ">
              Reply
            </p>
          </button>
        </div>
      )}
      {reply?.length > 0 && (
        <>
          {reply.map((item: any, i: any) => {
            return (
              <>
                <div className="flex items-center justify-between mt-2 ml-4">
                  <h3 className="text-sm text-black  ml-8  font-medium ">
                    -
                  </h3>
                  <p className="text-sm text-gray-600 mr-10  font-medium  ">
                    {item.time}
                  </p>
                </div>
                <p className="ml-12 text-[#3F434A] font-small text-black-500  font-medium ">
                  {item.text}
                </p>
              </>
            );
          })}
        </>
      )}
    </div>
  );
};

const Comments = () => {
  const [text, setText] = React.useState("");
  const [list, setList] = React.useState<any>([
    // {
    //   user: "Jane Cooper",
    //   content: `Good call on answering features!<span> @Micheal</span>
    // <span> #introcall</span>`,
    //   last: "16h Ago",
    //   time: "2:11",
    //   reply: [
    //     {
    //       user: "Micheal",
    //       content:
    //         "Thanks Jane!Thought was the best way to give more clarity about our product and services.",
    //       last: "16h ago",
    //     },
    //   ],
    // },
  ]);
  const [emoji,setEmoji] = useState(false);
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
      timeInms:now
    };
  }
  function timeToHoursAgo(timestamp:any) {
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
  
  return (
    <>
      <div className="flex w-[100%] h-[800px] flex-col px-[40px] ">
        <div className="relative">

        <textarea
          value={text}
          onChange={(e: any) => {
            setText(e.target.value);
          }}
          placeholder="Write a comment"
          className="resize-none w-[100%] h-[160px] bg-[#fff] apperance-none block text-[16px] tracking-wide text-gray-600 border rounded-2xl py-4 px-3 focus:outline-none"
          />
        <div className="flex absolute gap-x-2 right-5 bottom-2">
          <p className="text-gray-600 font-semibold text-lg cursor-pointer" onClick={()=>setText((prev)=>(prev+"#"))}>#</p>
          <p className="text-gray-600 font-semibold text-lg cursor-pointer" onClick={()=>setText((prev)=>(prev+"@"))}>@</p>
          <button className=" font-semibold text-lg mt-[1px]" onClick={()=>setEmoji((prev)=> !prev)}> 
          <Image
            src={getBasicIcon("Smile")}
            className={`svg-black`}
            alt=""
            width={19}
            height={19}
            style={{
              objectFit: "contain",
            }}
            /> </button>
            
            
           {emoji && <>
           <button className="absolute top-[78.5px] left-[14px] bg-white z-50" onClick={()=>setEmoji(false)}>
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
           <EmojiPicker height={500} width={400} onEmojiClick={(e)=>setText((prev)=> prev + e.emoji)}  /> 
            </div>
            </>}
           
        </div>
            </div>
        <button
          onClick={() => {
            if (text.length !== 0) {
              const letsSee = {
                user: "-",
                content: text,
                time: getCurrentTimeInHoursAndMinutes().time,
                last: timeToHoursAgo(getCurrentTimeInHoursAndMinutes().timeInms),
                reply: [
                  // {
                  //       user: "Micheal",
                  //       content:
                  //         "Thanks Jane!Thought was the best way to give more clarity about our product and services.",
                  //       last: "16h ago",
                  //     },
                    ],
              };
              setList([...list, letsSee]);
              setText("");
            }
          }}
          className="bg-renal-blue mt-[18px] rounded-xl justify-end w-[110px] h-[38px] ml-auto font-medium tracking-wide pl-[5px] p-[5px]"
        >
          <p className="whitespace-nowrap font-large text-[15px] pl-[8px] pr-[8px] text-[#ffffff] ">
            comment
          </p>
        </button>
      <div className="py-2">
        {list.map((item: any, i: any) => {
          return (
            <Comment
            key={i}
            user={item.user}
            content={item.content}
            last={item.last}
            time={item.time}
            reply={item.reply}
            />
            );
          })}
      </div>
    </div>
    </>
  );
};

export default Comments;
