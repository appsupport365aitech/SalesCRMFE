import React, { useEffect, useState } from "react";
import {
  getBasicIcon,
  getRoundedAvatar,
  parseDateString,
} from "@/utils/AssetsHelper";
import Image from "next/image";
import { LeadId } from "@/types/leadId";
import Backdrop from "@/components/View/Backdrop/Center";
import EditLead from "@/components/View/EditLead";
import axios from "axios";
import Lead from "@/types/Leads";

const ProfilePage = ({ data1, updated }: any) => {
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

  const [data, setData] = useState<Lead>(data1);

  // const domain = extractDomain(data.companyId?.company_website_url);

  // const openWebsite = () => {
  //   window.open("http://" + domain, "_blank");
  // };

  const UpdateData = async () => {
    setTimeout(async () => {
      const response = await axios
        .get(
          `https://salescrmbe.onrender.com/api/leads/find-by-id?id=${data1._id}`
        )
        .then((e) => {
          setData(e.data.result);
          console.log("svfev ");
        })
        .catch((e) => {
          console.log(e);
        });
      updated();
    }, 1000);
  };

  const contacted: any = data.customerId;
  const contacts = contacted.contacts;

  const checkForAllNull = contacts.every((item: any) => item === null);
  const filteredContactArray = checkForAllNull
    ? []
    : contacts.filter((item: any) => item !== null);
  console.log(contacts, "Pejvfaek");

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
        if (data2?.activityId.history) {
          const history = data2?.activityId.history;
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

  return (
    <>
      {edit && (
        <Backdrop pad={"50px 0"} bool={true} width={"900px"}>
          <EditLead
            cancel={cancelEdit}
            update={UpdateData}
            data={data}
            title={"Edit Lead"}
          />
        </Backdrop>
      )}
      <div className="w-[100%]">
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
                Lead id - {data.leadId}
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
        <p className=" border-b-2 w-3/4 pb-2 border-red-400 mt-[20px] text-[#3F434A] leading-[30px] text-[20px] font-medium">
          Company Info
        </p>
        <div className="text-[#8A9099] flex justify-between w-9/12  mt-[7px] leading-[21px]">
          <p className="text-sm font-medium">Company Name</p>
          <p className="text-sm font-semibold text-black">
            {data.companyId.company_name}
          </p>
        </div>
        <div className="text-[#8A9099] flex justify-between w-9/12  mt-[7px] leading-[21px]">
          <p className="text-sm font-medium"> Website Link</p>
          <p
            onClick={() => {
              if (data.companyId.company_website_url) {
                window.open(data.companyId.company_website_url, "_blank");
              }
            }}
            className="text-sm font-semibold text-black"
          >
            {data.companyId.company_website_url}
          </p>
        </div>
        <div className="text-[#8A9099] flex justify-between w-9/12  mt-[7px] leading-[21px]">
          <p className="text-sm font-medium">Industry Type</p>
          <p className="text-sm font-semibold text-black">
            {data?.companyId?.company_product_category}
          </p>
        </div>
        <div className="text-[#8A9099] flex justify-between w-9/12  mt-[7px] leading-[21px]">
          <p className="text-sm font-medium"> Social Media</p>
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

        <p className=" border-b-2 w-3/4 pb-2 border-red-400 mt-[20px] text-[#3F434A] leading-[30px] text-[20px] font-medium">
          Lead Info
        </p>
        <div className="text-[#8A9099] flex justify-between w-9/12  mt-[7px] leading-[21px]">
          <p className="text-sm font-medium">Status</p>
          <p className="text-sm font-semibold text-black">{data1.leadStatus}</p>
        </div>
        <div className="text-[#8A9099] flex justify-between w-9/12  mt-[7px] leading-[21px]">
          <p className="text-sm font-medium">Stage</p>
          <p className="text-sm font-semibold text-black">{data1.leadStage}</p>
        </div>
        <div className="text-[#8A9099] flex justify-between w-9/12  mt-[7px] leading-[21px]">
          <p className="text-sm font-medium">Source</p>
          <p className="text-sm font-semibold text-black">
            {data1.leadSource ?? "-"}
          </p>
        </div>
        <div className="text-[#8A9099] flex justify-between w-9/12  mt-[7px] leading-[21px]">
          <p className="text-sm font-medium">Lead owner</p>
          <p className="text-sm font-semibold text-black">
            {data1.owners[0] ?? "-"}
          </p>
        </div>
        <div className="text-[#8A9099] flex justify-between w-9/12  mt-[7px] leading-[21px]">
          <p className="text-sm font-medium">Lead Manager</p>
          <p className="text-sm font-semibold text-black">
            {data1.manager ?? "-"}
          </p>
        </div>
        <div className="text-[#8A9099] flex justify-between w-9/12  mt-[7px] leading-[21px]">
          <p className="text-sm font-medium">Lead Created by</p>
          <p className="text-sm font-semibold text-black">
            {data1.lead_createdAt ?? "-"}
          </p>
        </div>
        <div className="text-[#8A9099] flex justify-between w-9/12  mt-[7px] leading-[21px]">
          <p className="text-sm font-medium">Lead Updated on</p>
          <p className="text-sm font-semibold text-black">
            {formatDateFromISOString(data1.updatedAt) ?? "-"}
          </p>
        </div>
        <div className="text-[#8A9099] flex justify-between w-12/12  mt-[7px] leading-[21px]">
          <p className="text-sm font-medium">Activity History</p>
          <div className=" text-sm font-semibold text-black">
            <div className="flex gap-3 items-center">
              <div className="flex gap-2 mr-[8px]">
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
                <p className="text-black">{Activities.call}</p>
              </div>
              <div className="flex gap-2 mr-[8px]">
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
                <p className="text-black">0</p>
              </div>
              <div className="flex gap-2 mr-[8px]">
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
                <p className="text-black">{Activities.email}</p>
              </div>
            </div>
            <div className="flex mt-2 gap-3 items-center">
              <div className="flex gap-2 mr-[8px]">
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
              <div className="flex gap-2 mr-[8px]">
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
                <p className="text-black">{Activities.notes}</p>
              </div>
            </div>
          </div>
        </div>
        <p className=" border-b-2 w-3/4 pb-2 border-red-400 mt-[20px] text-[#3F434A] leading-[30px] text-[20px] font-medium">
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
            <h2 className="text-base text-[14px] whitespace-nowrap leading-7 tracking-wide text-[#000] -900 font-normal">
              {data.customerId.customer_name}
            </h2>
            <a
              href="#0"
              className="block text-xs text-[14px] text-[#000] -500 tracking-wide hover:text-indigo-500"
            >
              {data.customerId.customer_designation}
            </a>
          </div>
        </div>

        <div className="text-[#8A9099] flex justify-between w-9/12  mt-[-22px] leading-[21px]">
          <p className="text-sm font-medium">Gender</p>
          <p className="text-sm font-semibold text-black">
            {data.customerId.customer_gender}
          </p>
        </div>
        <div className="text-[#8A9099] flex justify-between w-9/12  mt-[7px] leading-[21px]">
          <p className="text-sm font-medium">Phone</p>
          <p className="text-sm font-semibold text-black">
            {data.customerId.customer_contact}
          </p>
        </div>
        <div className="text-[#8A9099] flex justify-between w-9/12  mt-[7px] leading-[21px]">
          <p className="text-sm font-medium">Email</p>
          <p className="text-sm font-semibold text-black">
            {data.customerId.customer_email}
          </p>
        </div>
        <div className="text-[#8A9099] flex justify-between w-9/12  mt-[7px] leading-[21px]">
          <p className="text-sm font-medium">Social Media</p>
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
        {filteredContactArray.length > 1 && (
          <p className=" border-b-2 w-3/4 pb-2 border-red-400 mt-[20px] text-[#3F434A] leading-[30px] text-[20px] font-medium">
            Other Contact
          </p>
        )}
        <div className="text-[#8A9099] flex justify-between w-9/12  mt-[7px] leading-[21px]">
          {contacts.map((item: any, i: any) => {
            function random_number_between_1_and_7() {
              // Generate a random number between 0 and 1 (exclusive)
              const randomNum = Math.random();

              // Scale the number to the range of 1 to 7
              const scaledNum = Math.floor(randomNum * 7) + 1;

              return scaledNum;
            }
            const random = random_number_between_1_and_7();
            return (
              <>
                {item !== null && (
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
                          {item?.name}
                        </h4>
                        <a
                          href="#0"
                          className="block text-xs font-small text-[#000] -500 hover:text-indigo-500"
                        >
                          {item?.designation}
                        </a>
                      </div>
                    </div>
                  </li>
                )}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

interface props {
  data: LeadId;
}
