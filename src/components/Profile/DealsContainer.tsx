import { getBasicIcon } from "@/utils/AssetsHelper";
import React, { useEffect, useState } from "react";
import Navigator from "@/utils/customNavigator";
import Image from "next/image";
import Backdrop from "@/components/View/Backdrop/Center";
import Notes from "@/components/View/Notes";
import Notes1 from "@/components/View/NotesSalesView";
import Events from "@/components/View/Event/Events";
import EmailPage from "../View/Email/index";
import Messages from "@/components/View/messages";
import ActiveCall from "@/components/View/active-call-add";
import axios from "axios";
import { baseUrl } from "@/utils/baseUrl";

const QuickActions = ({
  width,
  left,
  notes,
  events,
  emails,
  messages,
  call,
}: any) => {
  return (
    <div
      className={`flex  h-[18px] item-center shrink-0`}
      style={{ width: width, marginLeft: left }}
    >
      <Image
        src={getBasicIcon("Phone")}
        alt=""
        className="mr-[4px] cursor-pointer"
        width={25}
        height={25}
        onClick={() => {
          call();
        }}
        style={{
          objectFit: "contain",
        }}
      />
      <Image
        src={getBasicIcon("Mail")}
        alt=""
        width={25}
        onClick={() => {
          emails();
        }}
        height={25}
        style={{
          objectFit: "contain",
        }}
        className="mr-[4px] cursor-pointer"
      />
      <Image
        src={getBasicIcon("Calendar")}
        alt=""
        className="mr-[4px] cursor-pointer"
        width={25}
        height={25}
        onClick={() => {
          events();
        }}
        style={{
          objectFit: "contain",
        }}
      />
      <Image
        src={getBasicIcon("Tasks")}
        alt=""
        className="mr-[4px] cursor-pointer"
        width={25}
        height={25}
        onClick={() => {
          notes();
        }}
        style={{
          objectFit: "contain",
        }}
      />
      <Image
        src={getBasicIcon("Chat")}
        alt=""
        className="mr-[4px] cursor-pointer"
        width={25}
        height={25}
        style={{
          objectFit: "contain",
        }}
        onClick={() => {
          messages();
        }}
      />
    </div>
  );
};

const Deals = ({ data, type }: any) => {
  const [notes, setNotes] = React.useState(false);
  const [events, setEvents] = React.useState(false);
  const [notes1, setNotes1] = React.useState(false);
  const [emails, setEmail] = React.useState(false);
  const [messages, setMessages] = React.useState(false);
  const [bool, setBool] = React.useState(true);
  const [call, setCall] = React.useState(false);
  // const [detailShow, setDetailShow] = useState(false);
  console.log("------------------ deals data -----------------", data);
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
  const showCall = () => {
    setCall(true);
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
  const cancelCall = () => {
    setBool(false);
    setTimeout(() => {
      setCall(false);
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
    } else if (e1 === 6) {
      showCall();
    }
  };

  const [openDeals, setOpenDeals] = useState<any>(null);
  const [closedDeals, setClosedDeals] = useState<any>(null);
  const [interest, setInterest] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<any>("");

  useEffect(() => {
    if (window !== undefined) {
      setAccessToken(localStorage.getItem("access-token"));
    }
  }, []);

  useEffect(() => {
    axios
      .get(
        `${baseUrl}api/leads/getDeals?id=${
          type === "company"
            ? data?.result?.companyId?._id
            : data?.result?.customerId?._id
        }&type=${type}`,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      )
      .then((response) => {
        const data = response?.data;
        setOpenDeals(data?.openDeals);
        setClosedDeals(data?.closeDeals);
        setInterest(data?.intrest);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, [accessToken, data]);
  return (
    <div className="">
      <Navigator
        width={false}
        callback={() => {}}
        current={0}
        list={[{ id: 0, title: "Deals" }]}
      />

      <div className="w-full ">
        <div className=" my-[40px] overflow-hidden">
          <h5 className="text-[#3F434A] px-[30px] text-[20px] leading-[30px] font-bold">
            Open Deals
          </h5>
          {/* <p className="text-center text-[#000]">-</p> */}
          {openDeals?.length > 0 ? (
            <div>
              <div className="mt-[20px] flex text-[#8A9099] text-[14px] leading-[21px] items-center justify-between text-center">
                <p className="w-[140px] font-semibold">Lead Id</p>
                <p className="w-[180px] font-semibold">Product/Service</p>
                <p className="w-[160px] font-semibold">Lead Stage</p>
                <p className="w-[200px] font-semibold">Last Activity</p>
                <p className="w-[200px] font-semibold">Activity History</p>
              </div>
              <div
                className={
                  openDeals?.length >= 4
                    ? "h-52 overflow-y-scroll pl-4 w-full"
                    : "pl-4 w-full"
                }
              >
                {openDeals &&
                  openDeals.map((deal: any, index: number) => (
                    <div
                      key={index}
                      className="mt-[10px] mx-[13px] flex flex-col gap-y-2.5 "
                    >
                      <div className="text-[14px] py-[5px] text-[#8A9099] leading-[21px] flex justify-between items-center bg-[#ffffff] rounded-xl px-2 ">
                        <div className="">
                          <p className="text-[#3F434A] w-[140px]">
                            {deal?.leadId || "-"}
                          </p>
                        </div>
                        <div className="">
                          <p className="w-[180px]">{deal?.product_category}</p>
                        </div>
                        <div className="">
                          <p className="w-[160px]">
                            {deal?.leadStage ? deal?.leadStage : "-"}
                          </p>
                        </div>
                        <div className="">
                          <p className="w-[160px]">
                            {deal?.lastActivity?.subject
                              ? deal?.leadData?.subject
                              : "-"}
                          </p>
                          <p className="w-[160px]">
                            {deal?.lastActivity?.createdAt
                              ? deal?.leadData?.createdAt
                              : "-"}
                          </p>
                        </div>
                        <div className=" flex items-start gap-[5px] text-[#3F434A]">
                          <QuickActions
                            width={""}
                            notes={() => {
                              AddLead(1, 0);
                            }}
                            events={() => {
                              AddLead(1, 1);
                            }}
                            emails={() => {
                              AddLead(1, 3);
                            }}
                            messages={() => {
                              AddLead(1, 5);
                            }}
                            call={() => {
                              AddLead(1, 6);
                            }}
                          />
                        </div>
                      </div>

                      {notes && (
                        <Backdrop bool={bool}>
                          <Notes
                            cancel={cancelNotes}
                            //  leadid={id}
                          />
                        </Backdrop>
                      )}
                      {events && (
                        <Backdrop bool={bool} pad={"50px 0"}>
                          <Events
                            cancel={cancelEvents}
                            // leadid={id}
                          />
                        </Backdrop>
                      )}
                      {emails && (
                        <Backdrop bool={bool} pad={"50px 0"}>
                          <EmailPage
                            // refresh={UpdateData}
                            data={data?.leadData}
                            cancel={cancelEmails}
                            refresh={function (e: any) {
                              // throw new Error("Function not implemented.");
                            }}
                          />
                        </Backdrop>
                      )}
                      {notes1 && (
                        <Backdrop bool={bool} pad={"50px 0"}>
                          {/* note={LeadData?.notes} */}
                          <Notes1 cancel={cancelNotes1} />
                        </Backdrop>
                      )}
                      {messages && (
                        <Backdrop bool={bool} pad={"50px 0"}>
                          <Messages cancel={cancelMessages} />
                        </Backdrop>
                      )}
                      {call && (
                        <Backdrop bool={bool} pad={"50px 0"}>
                          <ActiveCall
                            cancel={cancelCall}
                            // id={LeadData._id}
                            // lead={LeadData}
                            // companyId={LeadData.companyId._id}
                            // companyName={LeadData.companyId.company_name}
                            // customerId={LeadData.customerId._id}
                          />
                        </Backdrop>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <p className="text-black ml-8">NA</p>
          )}
        </div>

        {/* ?close deals */}

        <div className=" my-[40px] overflow-hidden">
          <h5 className="text-[#3F434A] px-[30px] text-[20px] leading-[30px] font-bold">
            Closed Deals
          </h5>
          {/* <p className="text-center text-[#000]">-</p> */}
          {closedDeals?.length > 0 ? (
            <div>
              <div className="mt-[20px] flex text-[#8A9099] text-[14px] leading-[21px] items-center justify-between text-center">
                <p className="w-[140px] font-semibold">Lead Id</p>
                <p className="w-[180px] font-semibold">Product/Service</p>
                <p className="w-[160px] font-semibold">Lead Stage</p>
                <p className="w-[200px] font-semibold">Last Activity</p>
                <p className="w-[200px] font-semibold">Activity History</p>
              </div>

              <div
                className={
                  closedDeals?.length >= 4 ? "h-52 overflow-y-scroll" : ""
                }
              >
                {closedDeals &&
                  closedDeals.map((deal: any, index: number) => (
                    <div
                      key={index}
                      className="mt-[10px] mx-[13px] flex flex-col gap-y-2.5"
                    >
                      <div className="text-[14px] py-[5px] text-[#8A9099] leading-[21px] flex justify-between items-center bg-[#ffffff] rounded-xl px-2">
                        <div className="w-[140px]">
                          <p className="text-[#3F434A]">
                            {deal?.leadId || "-"}
                          </p>
                        </div>
                        <div className="w-[180px]">
                          <p>
                            {deal?.product_category
                              ? deal?.product_category
                              : "-"}{" "}
                          </p>
                        </div>
                        <div className="w-[160px]">
                          <p>{deal?.leadStage ? deal?.leadStage : "-"}</p>
                        </div>
                        <div className="w-[200px]">
                          <p>
                            {deal?.lastActivity?.subject
                              ? deal?.leadData?.subject
                              : "-"}
                          </p>
                          <p>
                            {deal?.lastActivity?.createdAt
                              ? deal?.leadData?.createdAt
                              : "-"}
                          </p>
                        </div>
                        <div className="flex items-start gap-[5px] w-[200px] text-[#3F434A]">
                          <QuickActions
                            width={200}
                            notes={() => {
                              AddLead(1, 0);
                            }}
                            events={() => {
                              AddLead(1, 1);
                            }}
                            emails={() => {
                              AddLead(1, 3);
                            }}
                            messages={() => {
                              AddLead(1, 5);
                            }}
                            call={() => {
                              AddLead(1, 6);
                            }}
                          />
                        </div>
                        {/* <div>
              <Image
                src={getBasicIcon("More")}
                className={`w-[19px] rotate-90 cursor-pointer opacity-80`}
                alt=""
                width={17}
                height={17}
                style={{
                  objectFit: "contain",
                }}
              />
            </div> */}
                      </div>

                      {notes && (
                        <Backdrop bool={bool}>
                          <Notes
                            cancel={cancelNotes}
                            //  leadid={id}
                          />
                        </Backdrop>
                      )}
                      {events && (
                        <Backdrop bool={bool} pad={"50px 0"}>
                          <Events
                            cancel={cancelEvents}
                            // leadid={id}
                          />
                        </Backdrop>
                      )}
                      {emails && (
                        <Backdrop bool={bool} pad={"50px 0"}>
                          <EmailPage
                            // refresh={UpdateData}
                            //  data={LeadData}
                            cancel={cancelEmails}
                            refresh={function (e: any) {
                              throw new Error("Function not implemented.");
                            }}
                          />
                        </Backdrop>
                      )}
                      {notes1 && (
                        <Backdrop bool={bool} pad={"50px 0"}>
                          {/* note={LeadData?.notes} */}
                          <Notes1 cancel={cancelNotes1} />
                        </Backdrop>
                      )}
                      {messages && (
                        <Backdrop bool={bool} pad={"50px 0"}>
                          <Messages cancel={cancelMessages} />
                        </Backdrop>
                      )}
                      {call && (
                        <Backdrop bool={bool} pad={"50px 0"}>
                          <ActiveCall
                            cancel={cancelCall}
                            // id={LeadData._id}
                            // lead={LeadData}
                            // companyId={LeadData.companyId._id}
                            // companyName={LeadData.companyId.company_name}
                            // customerId={LeadData.customerId._id}
                          />
                        </Backdrop>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <p className="text-black ml-8">NA</p>
          )}
        </div>

        <div className="my-[50px] mt-[80px]">
          <h5 className="text-[#3F434A] px-[30px] text-[20px] leading-[30px] font-bold">
            Interest History
          </h5>
          {/* <p className="text-center text-[#000]">-</p> */}
          {interest?.length > 0 ? (
            <div>
              <div className="mt-[20px] flex text-[#8A9099] text-[14px] leading-[21px] items-center justify-between text-center">
                <p className="w-[180px] font-semibold">Product/Service</p>
                <p className="w-[140px] font-semibold">Lead Id</p>
                <p className="w-[200px] font-semibold">Last Activity</p>
              </div>
              <div
                className={
                  interest?.length >= 4 ? "h-52 overflow-y-scroll" : ""
                }
              >
                {interest &&
                  interest.map((deal: any, index: number) => (
                    <div
                      key={index}
                      className="mt-[10px] mx-[13px] flex flex-col gap-y-2.5"
                    >
                      <div className="text-[14px] py-[5px] text-[#8A9099] leading-[21px] flex justify-between items-center bg-[#ffffff] rounded-xl px-2">
                        <div className="w-[180px]">
                          <p className="ml-2">
                            {deal?.companyData?.[0]?.company_product_category ||
                              "-"}
                          </p>
                        </div>
                        <div className="w-[140px]">
                          <p>{deal?.leadData?.leadId || "-"}</p>
                        </div>
                        <div className="w-[200px]">
                          <p>
                            {deal?.lastActivity?.call_id !== "" ? "Call" : "-"}
                          </p>
                          <p>{deal?.lastActivity?.call_date || "-"}</p>
                        </div>
                        {/* <div className="w-[45%] flex justify-end">
              <Image
                src={getBasicIcon("More")}
                className={`w-[19px] rotate-90 cursor-pointer opacity-80`}
                alt=""
                width={19}
                height={19}
                style={{
                  objectFit: "contain",
                }}
              />
            </div> */}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <p className="text-black ml-8">NA</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Deals;
