import React, { useEffect, useState } from "react";
import {
  getBasicIcon,
  getRoundedAvatar,
  parseDateString,
} from "@/utils/AssetsHelper";
import Image from "next/image";
import Backdrop from "@/components/View/Backdrop/Center";
import EditLead from "@/components/View/EditLead";
import axios from "axios";
import { baseUrl } from "@/utils/baseUrl";

const ProfilePage = ({ data1, updated, mastersData }: any) => {
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

  function extractDomain(url: string): string {
    if (url || url?.length !== 0) {
      const match = url.match(/^(?:https?:\/\/)?(?:www\.)?([^/?#]+)/);
      if (match) {
        return match[1];
      }
    }
    return ""; // Return an empty string if no match is found
  }

  const [data, setData] = useState<any>(data1);
  const [accessToken, setAccessToken] = useState<any>("");

  useEffect(() => {
    if (window !== undefined) {
      setAccessToken(localStorage.getItem("access-token"));
    }
  }, []);

  useEffect(() => {
    setData(data1);
  }, [data1]);

  // const domain = extractDomain(data.companyId?.company_website_url);

  // const openWebsite = () => {
  //   window.open("http://" + domain, "_blank");
  // };

  const UpdateData = async () => {
    setTimeout(async () => {
      const response = await axios
        .get(`${baseUrl}api/leads/find-by-id?id=${data1?._id}`, {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((e) => {
          setData(e.data.result);
          if (updated) {
            updated();
          }
        })
        .catch((e) => {});
      updated();
    }, 1000);
  };

  const contacted: any = data?.customerId;
  const contacts = contacted?.contacts;

  const checkForAllNull = contacts?.every((item: any) => item === null);
  const filteredContactArray = checkForAllNull
    ? []
    : contacts?.filter((item: any) => item !== null);

  const [Activities, setActivities] = useState({
    call: 0,
    email: 0,
    notes: 0,
  });

  const [check, setCheck] = useState(false);

  const data2: any = data;

  useEffect(() => {
    if (!check) {
      if (data2?.activityId) {
        if (data2?.activityId?.history) {
          const history = data2?.activityId?.history;
          let calls = 0;
          let emails = 0;
          let notes = 0;
          for (let i = 0; i < history.length; i++) {
            if (history[i]?.type) {
              if (history[i]?.type === "note") {
                notes++;
              } else if (history[i]?.type === "email") {
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
  }, []);

  function formatDateFromISOString(isoString: any) {
    const dateObject = new Date(isoString);
    const hours = String(dateObject.getHours()).padStart(2, "0");
    const minutes = String(dateObject.getMinutes()).padStart(2, "0");
    const day = dateObject.getDate();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[dateObject.getMonth()];
    const year = dateObject.getFullYear();

    return `${hours}:${minutes} ${day} ${month} ${year}`;
  }

  function getTypeCounts(activityData: any) {
    let phoneCount = 0;
    let smsCount = 0;
    let emailCount = 0;
    let noteCount = 0;

    activityData?.length > 0 &&
      activityData?.forEach((entry: any) => {
        switch (entry.type || entry.callId) {
          case entry.callId:
            phoneCount++;
            break;
          case "sms":
            smsCount++;
            break;
          case "email":
            emailCount++;
            break;
          case "note":
            noteCount++;
            break;
        }
      });

    const typeCounts = {
      phoneCount,
      smsCount,
      emailCount,
      noteCount,
    };

    return typeCounts;
  }

  const counts = getTypeCounts(data1?.activityId?.history);

  return (
    <>
      {edit && (
        <Backdrop pad={"50px 0"} bool={true} width={"900px"}>
          <EditLead
            cancel={cancelEdit}
            update={UpdateData}
            data={data}
            mastersData={mastersData}
            title={"Edit Lead"}
          />
        </Backdrop>
      )}
      <div className="w-[100%] ">
        <div className="flex -space-x-2 overflow-hidden w-[100%]">
          <div className="flex items-center w-[100%] justify-between pb-[10px] ">
            <div className="flex items-center gap-5 w-[100%]">
              <Image
                className="inline-block w-[40px] rounded-full ring-2 ring-white"
                src={getRoundedAvatar(5, 30)}
                alt=""
                width={40}
                height={40}
                style={{
                  objectFit: "contain",
                }}
              />
              <p className="block cursor-pointer text-lg leading-[10px ] font-semibold ml-[-6px] text-[14px] text-black hover:text-bg-red">
                Lead id - {data?.leadId}
              </p>
            </div>
            <Image
              src={getBasicIcon("Edit")}
              className={`w-[20px] svg-grey svg-not-selected  cursor-pointer`}
              alt="Edit"
              width={20}
              height={20}
              onClick={() => {
                showEdit();
              }}
              style={{
                objectFit: "contain",
              }}
            />
          </div>
        </div>
        <div>
          <p className="border-b-2 w-[100%] pb-2 border-red-400 mt-[20px] text-[#3F434A] leading-[30px] text-[20px] font-medium">
            Company Info
          </p>
          <div className="text-[#8A9099] flex items-center  gap-4 mt-[7px] leading-[21px]">
            <p className="text-sm font-medium w-[40%]">Company Name</p>
            <p className="text-sm font-semibold text-black">
              {data?.companyId?.company_name}
            </p>
          </div>
          <div className="text-[#8A9099] flex items-center gap-4 mt-[7px] leading-[21px]">
            <p className="text-sm font-medium w-[40%]"> Website Link</p>
            <p
              onClick={() => {
                if (data?.companyId?.company_website_url) {
                  window.open(data?.companyId?.company_website_url, "_blank");
                }
              }}
              className="text-sm font-semibold text-black"
            >
              {data?.companyId?.company_website_url}
            </p>
          </div>
          <div className="text-[#8A9099] flex items-center gap-4 mt-[7px] leading-[21px]">
            <p className="text-sm font-medium w-[40%]">Industry Type</p>
            <p className="text-sm font-semibold text-black">
              {data?.companyId?.company_product_category}
            </p>
          </div>
          {data?.companyId?.company_socialMedia1 ? (
            <div className="text-[#8A9099] flex gap-4 mt-[7px] leading-[21px]">
              <p className="text-sm font-medium w-[40%]"> Social Media</p>
              <p className="text-sm font-semibold text-black flex">
                {data?.companyId?.company_socialMedia1 && (
                  <a href={data?.companyId?.company_socialMedia1Url}>
                    <Image
                      src={getBasicIcon(data?.companyId?.company_socialMedia1)}
                      className={`w-[20px] svg-grey mr-2`}
                      alt=""
                      width={20}
                      height={20}
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </a>
                )}
                {data?.companyId?.company_socialMedia2 && (
                  <a href={data?.companyId?.company_socialMedia2Url}>
                    <Image
                      src={getBasicIcon(data?.companyId?.company_socialMedia2)}
                      className={`w-[20px] svg-grey mr-2`}
                      alt=""
                      width={20}
                      height={20}
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </a>
                )}
              </p>
            </div>
          ) : null}
        </div>

        <p className=" border-b-2 w-[100%] pb-2 border-red-400 mt-[20px] text-[#3F434A] leading-[30px] text-[20px] font-medium">
          Lead Info
        </p>
        <div className="text-[#8A9099] flex mt-[7px] leading-[21px] gap-4">
          <p className="text-sm font-medium w-[40%]">Status</p>
          <p className="text-sm font-semibold text-black">{data?.leadStatus}</p>
        </div>
        <div className="text-[#8A9099] flex gap-4 mt-[7px] leading-[21px]">
          <p className="text-sm font-medium w-[40%]">Stage</p>
          <p className="text-sm font-semibold text-black w-[40%]">
            {data?.leadStage}
          </p>
        </div>
        <div className="text-[#8A9099] flex gap-4 mt-[7px] leading-[21px]">
          <p className="text-sm font-medium w-[40%]">Source</p>
          <p className="text-sm font-semibold text-black">
            {data?.leadSource ?? "-"}
          </p>
        </div>
        <div className="text-[#8A9099] flex gap-4 mt-[7px] leading-[21px]">
          <p className="text-sm font-medium w-[40%]">Lead owner</p>
          {data?.owners?.map((owner: any, index: number) => {
            if (owner && Object.keys(owner).length !== 0) {
              return (
                <p className="text-sm font-semibold text-black" key={index}>
                  {owner?.name ?? "-"}
                </p>
              );
            } else {
              return null;
            }
          })}
        </div>
        <div className="text-[#8A9099] flex gap-4 mt-[7px] leading-[21px]">
          <p className="text-sm font-medium w-[40%]">Lead Manager</p>
          <p className="text-sm font-semibold text-black">
            {data?.manager?.name ?? "-"}
          </p>
        </div>
        {/* <div className="text-[#8A9099] flex gap-4 mt-[7px] leading-[21px]">
          <p className="text-sm font-medium w-[40%]">Lead Created by</p>
          <p className="text-sm font-semibold text-black">
            {data?.created_by ?? "-"}
          </p>
        </div> */}
        <div className="text-[#8A9099] flex gap-4 mt-[7px] leading-[21px]">
          <p className="text-sm font-medium w-[40%]">Lead Updated on</p>
          <p className="text-sm font-semibold text-black">
            {formatDateFromISOString(data?.updatedAt) ?? "-"}
          </p>
        </div>
        <div className="text-[#8A9099] flex gap-4 mt-[7px] leading-[21px]">
          <p className="text-sm font-medium w-[40%]">Activity History</p>
          <div className=" text-sm font-semibold text-black">
            <div className="flex gap-3 items-center">
              <div className="flex mr-[8px]">
                <Image
                  src={getBasicIcon("Phone")}
                  alt=""
                  className="mr-[3px] svg-red cursor-pointer"
                  width={20}
                  height={30}
                  style={{
                    objectFit: "contain",
                  }}
                />
                <p className="text-black">{counts.phoneCount}</p>
              </div>
              <div className="flex mr-[8px]">
                <Image
                  src={getBasicIcon("Chat")}
                  alt=""
                  className="mr-[3px] svg-red cursor-pointer"
                  width={20}
                  height={30}
                  style={{
                    objectFit: "contain",
                  }}
                />
                <p className="text-black">{counts.smsCount}</p>
              </div>
              <div className="flex mr-[8px]">
                <Image
                  src={getBasicIcon("Mail")}
                  alt=""
                  className="mr-[3px] svg-red cursor-pointer"
                  width={20}
                  height={30}
                  style={{
                    objectFit: "contain",
                  }}
                />
                <p className="text-black">{counts.emailCount}</p>
              </div>
            </div>
            <div className="flex mt-2 gap-3 items-center">
              <div className="flex mr-[8px]">
                <Image
                  src={getBasicIcon("Calendar")}
                  alt=""
                  width={20}
                  height={30}
                  style={{
                    objectFit: "contain",
                  }}
                  className="mr-[3px] svg-red cursor-pointer"
                />
                <p className="text-black">0</p>
              </div>
              <div className="flex mr-[8px]">
                <Image
                  src={getBasicIcon("Tasks")}
                  alt=""
                  width={20}
                  height={30}
                  style={{
                    objectFit: "contain",
                  }}
                  className="mr-[3px] svg-red cursor-pointer"
                />
                <p className="text-black">{counts.noteCount}</p>
              </div>

              <div className="flex mr-[8px]">
                <Image
                  src={getBasicIcon("Attachment")}
                  className={`w-[18px] svg-red ml-1 mr-[3px]`}
                  alt=""
                  width={15}
                  height={15}
                  style={{
                    objectFit: "contain",
                  }}
                />
                <p className="text-black ">{data?.attachments.length}</p>
              </div>
            </div>
          </div>
        </div>
        <p className=" border-b-2 w-[100%] pb-2 border-red-400 mt-[20px] text-[#3F434A] leading-[30px] text-[20px] font-medium">
          Primary client POC
        </p>
        <div className="flex items-center w-[100%] pb-[30px] pt-[20px] ">
          <Image
            className="h-12 w-10 rounded-full ml-1"
            src={getRoundedAvatar(2, 30)}
            alt=""
            width={64}
            height={48}
            style={{
              objectFit: "contain",
            }}
          />
          <div className="ml-3">
            <h2 className="text-base text-[14px] whitespace-nowrap tracking-wide text-[#000] -900 font-normal">
              {data?.customerId?.customer_name || data?.customerId?.name}
            </h2>
            <a
              href="#0"
              className="block text-xs text-[14px] text-[#000] -500 tracking-wide hover:text-indigo-500"
            >
              {data?.customerId?.customer_designation ||
                data?.customerId?.designation}
            </a>
          </div>
        </div>

        <div className="text-[#8A9099] flex gap-4 mt-[-22px]">
          <p className="text-sm font-medium w-[40%]">Gender</p>
          <p className="text-sm font-semibold text-black">
            {data?.customerId?.customer_gender || data?.customerId?.gender}
          </p>
        </div>
        <div className="text-[#8A9099] flex gap-4 mt-[7px] leading-[21px]">
          <p className="text-sm font-medium w-[40%]">Phone</p>
          <p className="text-sm font-semibold text-black">
            {data?.customerId?.customer_contact || data?.customerId?.contact}
          </p>
        </div>
        <div className="text-[#8A9099] flex gap-4 mt-[7px] leading-[21px]">
          <p className="text-sm font-medium w-[40%]">Email</p>
          <p className="text-sm font-semibold text-black">
            {data?.customerId?.customer_email || data?.customerId?.email}
          </p>
        </div>
        {data?.customerId?.customer_socialMedia1 && (
          <div className="text-[#8A9099] flex gap-4 mt-[7px] leading-[21px]">
            <p className="text-sm font-medium w-[40%]">Social Media</p>
            <div className="flex">
              {data?.customerId?.customer_socialMedia1 && (
                <a href={data?.customerId?.customer_socialMedia1Url}>
                  <Image
                    src={getBasicIcon(data?.customerId?.customer_socialMedia1)}
                    className={`w-[20px] svg-grey mr-2`}
                    alt=""
                    width={20}
                    height={20}
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </a>
              )}
              {data?.customerId?.customer_socialMedia2 && (
                <a href={data?.customerId?.customer_socialMedia2Url}>
                  <Image
                    src={getBasicIcon(data?.customerId?.customer_socialMedia2)}
                    className={`w-[20px] svg-grey mr-2`}
                    alt=""
                    width={20}
                    height={20}
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </a>
              )}
            </div>
          </div>
        )}
        {data?.customerId?.contacts.length > 0 && (
          <div>
            <p className=" border-b-2 w-[100%] pb-2 border-red-400 mt-[20px] text-[#3F434A] leading-[30px] text-[20px] font-medium">
              Other Contact
            </p>
            <div className="text-[#8A9099] flex gap-4 mt-[7px] leading-[21px]">
              {data?.customerId?.contacts &&
                data?.customerId?.contacts?.map((item: any, i: any) => {
                  function random_number_between_1_and_7() {
                    // Generate a random number between 0 and 1 (exclusive)
                    const randomNum = Math.random();
                    // Scale the number to the range of 1 to 7
                    const scaledNum = Math.floor(randomNum * 7) + 1;
                    return scaledNum;
                  }
                  const random = random_number_between_1_and_7();
                  if (item && Object.keys(item).length !== 0) {
                    return (
                      <li className="mb-[10px]" key={i}>
                        <div className="flex items-center gap-x-3 mr-3">
                          <Image
                            className="h-12 w-10 rounded-full ml-2"
                            src={getRoundedAvatar(random, 30)}
                            alt=""
                            width={64}
                            height={48}
                            style={{
                              objectFit: "contain",
                            }}
                          />
                          <div>
                            <h4 className="text-base text-[12px] leading-7 tracking-wide text-black">
                              {item?.customer_name}
                            </h4>
                            <a
                              href="#0"
                              className="block text-xs font-small text-[#000] -500 hover:text-indigo-500"
                            >
                              {item?.customer_designation || item?.designation}
                            </a>
                          </div>
                        </div>
                      </li>
                    );
                  } else {
                    return null;
                  }
                })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
