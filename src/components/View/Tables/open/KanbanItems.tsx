import { getBasicIcon } from "@/utils/AssetsHelper";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Backdrop from "@/components/View/Backdrop/Center";
import Notes from "../../Notes";
import Events from "../../Event/Events";
import EmailPage from "../../Email";
import Notes1 from "../../NotesSalesView";
import Messages from "../../messages";

const KanbanItem = ({ item, i, Item }: any) => {
  const { pathname, replace, push } = useRouter();
  const leadId = () => {
    const route = `${pathname}/${Item._id}/lead-profile`;
    push(route);
  };
  const companyId = () => {
    const route = `${pathname}/${Item._id}/company-profile`;
    push(route);
  };
  const clientId = () => {
    const route = `${pathname}/${Item._id}/client-poc-profile`;
    push(route);
  };

  const [notes, setNotes] = React.useState(false);
  const [events, setEvents] = React.useState(false);
  const [notes1, setNotes1] = React.useState(false);
  const [emails, setEmail] = React.useState(false);
  const [messages, setMessages] = React.useState(false);
  const [bool, setBool] = React.useState(true);
  const [detailShow, setDetailShow] = useState(false);

  const showNotes = () => {
    setNotes(true);
  };

  const showEmail = () => {
    setEmail(true);
  };
  const showNotes1 = () => {
    setNotes1(true);
  };

  const showEvents = () => {
    setEvents(true);
  };
  const showMessages = () => {
    setMessages(true);
  };

  const cancelEvents = () => {
    setBool(false);
    setTimeout(() => {
      setEvents(false);
      setBool(true);
    }, 500);
  };

  const cancelEmails = () => {
    setBool(false);
    setTimeout(() => {
      setEmail(false);
      setBool(true);
    }, 500);
  };

  const cancelNotes = () => {
    setBool(false);
    setTimeout(() => {
      setNotes(false);
      setBool(true);
    }, 1700);
  };

  const cancelNotes1 = () => {
    setBool(false);
    setTimeout(() => {
      setNotes1(false);
      setBool(true);
    }, 1700);
  };
  const cancelMessages = () => {
    setBool(false);
    setTimeout(() => {
      setMessages(false);
      setBool(true);
    }, 1700);
  };

  const AddLead = (e: any, e1: any) => {
    if (e1 === 0) {
      showNotes();
    } else if (e1 === 1) {
      showEvents();
    } else if (e1 === 2) {
      showNotes1();
    } else if (e1 === 3) {
      showEmail();
    } else if (e1 === 5) {
      showMessages();
    }
  };

  const [w, setW] = useState(0);
  const wRef: any = useRef();

  React.useEffect(() => {
    if (wRef.current) {
      setW(wRef.current.offsetWidth);
    }
  });

  const activities: any = Item;
  const activity = activities?.activityId;

  function convertToFormattedDate(dateString: any) {
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return "on " + formattedDate;
  }

  const [Activities, setActivities] = useState({
    call: 0,
    email: 0,
    notes: 0,
  });

  const [check, setCheck] = useState(false);

  useEffect(() => {
    if (!check) {
      if (Item?.activityId) {
        if (Item.activityId.history) {
          const history = Item.activityId.history;
          let calls = 0;
          let emails = 0;
          let notes = 0;
          for (let i = 0; i < history.length; i++) {
            console.log(history[i], "effeqw");
            if (history[i]?.type) {
              if (history[i].type === "note") {
                notes++;
              } else if (history[i].type === "email") {
                emails++;
              }
            } else {
              calls++;
            }
          }
          setActivities({
            call: calls,
            notes: notes,
            email: emails,
          });
        }
      }
      setCheck(true);
    }
  });

  return (
    <>
      <div
        className="border border-slate-600 p-[15px] rounded-xl mb-[20px] w-[270px] flex flex-col justify-between h-[260px] shadow-lg shadow-slate-400"
        key={i}
      >
        
        <div className="block-heading text-black text-[11px] leading-4 mb-[23px]">
          <p
            onClick={() => {
              leadId();
            }}
            className="cursor-pointer"
          >
            Lead Id-{Item?.leadId}
          </p>
          <p className="text-bold">
            {Item?.lead_title} |
            <span
              onClick={() => {
                companyId();
              }}
              className="cursor-pointer"
            >
              {" "}
              {Item.companyId.company_name} |{" "}
            </span>
            {/* {item.data.companyAddress} */}
            {Item?.companyId.company_location}
            {/* {"Noida"} */}
          </p>
          <p
            className="text-black/50 cursor-pointer"
            onClick={() => {
              clientId();
            }}
          >
            {Item.customerId.name} | {Item.customerId.designation}
          </p>
          <p className="text-black/50">
            
  -            {/* {item.data.names} */}
            </p>
        </div>
        <div className="block-details text-black text-[10px] mb-[20px]">
          <div className="flex justify-between">
            <p className="text-black/[.65]">Last Activity:</p>
            <p className="text-black/[.35]">
              {activity
                ? activity.history.length > 0 &&
                  (activity.history[activity.history.length - 1].type === "note"
                    ? "Note added"
                    : "Email Sent")
                : ""}{" "}
              {activity ? "|" : "-"}{" "}
              {activity
                ? activity.history.length > 0 &&
                  convertToFormattedDate(
                    activity.history[activity.history.length - 1].createdAt
                  )
                : ""}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-black/[.65]">Deal Size:</p>
            <p className="text-black/[.35]">Rs.{Item.existing_budget}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-black/[.65]">Product/Service:</p>
            <p className="text-black/[.35]">{item.data.product}</p>
          </div>
        </div>

        <div className="quick-actions text-[10px] px-[9px] mt-auto py-[5px]  bg-slate-200 rounded-[12px] flex items-center justify-between">
          <p className="text-black/[.75] leading-[5px]">Quick Actions</p>
          <div className="icons flex gap-[4px] opacity-70">
            <Image
              src={getBasicIcon("Tasks")}
              className={`w-[14px] cursor-pointer`}
              alt=""
              width={14}
              height={14}
              style={{
                objectFit: "contain",
              }}
              onClick={() => {
                AddLead(1, 0);
              }}  
            />
            <Image
              src={getBasicIcon("Mail")}
              className={`w-[14px] cursor-pointer`}
              alt=""
              width={14}
              height={14}
              style={{
                objectFit: "contain",
              }}
              onClick={() => {
                AddLead(1, 3);
              }}
            />
            <Image
              src={getBasicIcon("Calendar")}
              className={`w-[14px] cursor-pointer`}
              alt=""
              width={14}
              height={14}
              style={{
                objectFit: "contain",
              }}
              onClick={() => {
                AddLead(1, 1);
              }}
            />
            <Image
              src={getBasicIcon("Phone")}
              className={`w-[14px] cursor-pointer`}
              alt=""
              width={14}
              height={14}
              style={{
                objectFit: "contain",
              }}
              onClick={() => {
                AddLead(1, 0);
              }}
            />
            <Image
              src={getBasicIcon("Chat")}
              className={`w-[14px] cursor-pointer`}
              alt=""
              width={14}
              height={14}
              style={{
                objectFit: "contain",
              }}
              onClick={() => {
                AddLead(1, 5);
              }}
            />
          </div>
        </div>
        <div className="px-[10px] py-[5px] text-[11px] text-black rounded-[14px] border border-black flex mt-[10px] opacity-80 gap-[4px]">
          <Image
            src={getBasicIcon("Phone")}
            className={`w-[14px]`}
            alt=""
            width={14}
            height={14}
            style={{
              objectFit: "contain",
            }}
          />
          <p>{Activities.call}</p>

          <Image
            src={getBasicIcon("Mail")}
            className={`w-[14px]`}
            alt=""
            width={14}
            height={14}
            style={{
              objectFit: "contain",
            }}
          />
          <p>{Activities.email}</p>

          <Image
            src={getBasicIcon("Tasks")}
            className={`w-[14px] cursor-pointer`}
            onClick={() => {
              AddLead(1, 2);
            }}
            alt=""
            width={14}
            height={14}
            style={{
              objectFit: "contain",
            }}
          />
          <p>{Activities.notes}</p>
          <Image
            src={getBasicIcon("calendar")}
            className={`w-[14px]`}
            alt=""
            width={14}
            height={14}
            style={{
              objectFit: "contain",
            }}
          />
          <p>-</p>
          <Image
            src={getBasicIcon("Attachment")}
            className={`w-[14px]`}
            alt=""
            width={14}
            height={14}
            style={{
              objectFit: "contain",
            }}
          />
          <p>-</p>
          <Image
            src={getBasicIcon("Chat")}
            className={`w-[14px]`}
            alt=""
            width={14}
            height={14}
            style={{
              objectFit: "contain",
            }}
          />
          <p>-</p>
        </div>
      </div>
      {notes && (
        <Backdrop bool={bool}>
          <Notes cancel={cancelNotes} note={Item.notes} />
        </Backdrop>
      )}
      {events && (
        <Backdrop bool={bool} pad={"50px 0"}>
          <Events cancel={cancelEvents} />
        </Backdrop>
      )}
      {emails && (
        <Backdrop bool={bool} pad={"50px 0"}>
          <EmailPage refresh={() => {}} cancel={cancelEmails} data={Item} />
        </Backdrop>
      )}
      {notes1 && (
        <Backdrop bool={bool} pad={"50px 0"}>
          <Notes1 cancel={cancelNotes1} note={Item.notes} />
        </Backdrop>
      )}
      {messages && (
        <Backdrop bool={bool} pad={"50px 0"}>
          <Messages cancel={cancelMessages} />
        </Backdrop>
      )}
    </>
  );
};

export default KanbanItem;
