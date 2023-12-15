import React, { useState } from "react";
import { getBasicIcon, getRoundedAvatar } from "@/utils/AssetsHelper";
import Image from "next/image";
import Backdrop from "@/components/View/Backdrop/Center";
import EditLead from "@/components/View/EditLead";
import axios from "axios";

const ClientPocProfile = ({ data1, refresh }: any) => {
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
  //client profile
  const [data, setData] = useState(data1);

  const UpdateData = async () => {
    const response = await axios
      .get(
        `https://salescrmbe.onrender.com/api/leads/find-by-id?id=${data1.result._id}`
      )
      .then((e) => {
        setData(e.data);
        refresh(e.data.result.customerId.name);
      })
      .catch((e) => {
        console.log(e, "error occured");
      });
  };
  console.log("data4:", data.result);
  const contacted: any = data.result.customerId;
  const contacts = contacted?.contacts ? contacted?.contacts : [];
  return (
    <>
      {edit && (
        <Backdrop pad={"50px 0"} bool={true} width={"100px"}>
          <EditLead
            update={UpdateData}
            cancel={cancelEdit}
            data={data.result}
            title={"Edit Client"}
          />
        </Backdrop>
      )}
      <div className="w-[120%]">
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
              <div className="flex flex-col items-center">
                <p className="block cursor-pointer text-xl leading-[10px ] font-semibold ml-[-6px] text-[14px] text-black hover:text-bg-red">
                  {data?.result?.customerId?.customer_name}
                </p>
                <p className="block cursor-pointer text-sm leading-[10px ] ml-[-6px] text-[12px] text-black hover:text-bg-red">
                  {data?.result?.customerId?.customer_designation}
                </p>
              </div>
            </div>
            {/* <Image
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
            /> */}
          </div>
        </div>
        <p className=" border-b-2 w-3/4 pb-2 border-red-400 mt-[20px] text-[#3F434A] leading-[30px] text-[20px] font-medium">
          Info
        </p>
        <div className="text-[#8A9099] flex justify-between w-9/12  mt-[7px] leading-[21px]">
          <p className="text-sm font-medium">Gender</p>
          <p className="text-sm font-semibold text-black">
            {data?.result?.customerId?.customer_gender}
          </p>
        </div>
        <div className="text-[#8A9099] flex justify-between w-9/12  mt-[7px] leading-[21px]">
          <p className="text-sm font-medium">Phone</p>
          <p className="text-sm font-semibold text-black">
            {data?.result?.customerId?.customer_contact}
          </p>
        </div>
        <div className="text-[#8A9099] flex justify-between w-9/12  mt-[7px] leading-[21px]">
          <p className="text-sm font-medium">Email</p>
          <p className="text-sm font-semibold text-black">
            {data?.result?.customerId?.customer_email}
          </p>
        </div>
        <p className=" border-b-2 w-3/4 pb-2 border-red-400 mt-[20px] text-[#3F434A] leading-[30px] text-[20px] font-medium">
          Company Info
        </p>
        <div className="text-[#8A9099] flex justify-between w-9/12  mt-[7px] leading-[21px]">
          <p className="text-sm font-medium">Company Name</p>
          <p className="text-sm font-semibold text-black">
            {data?.result?.companyId?.company_name}
          </p>
        </div>
        <div className="text-[#8A9099] flex justify-between w-9/12  mt-[7px] leading-[21px]">
          <p className="text-sm font-medium">Company Addrsss</p>
          <p className="text-sm font-semibold text-black">
            {data?.result?.companyId?.company_address}
          </p>
        </div>
        <div className="text-[#8A9099] flex justify-between w-9/12  mt-[7px] leading-[21px]">
          <p className="text-sm font-medium">Website link</p>
          <p className="text-sm font-semibold text-black">
            {data?.result?.companyId?.company_website_url}
          </p>
        </div>
        <div className="text-[#8A9099] flex justify-between w-9/12  mt-[7px] leading-[21px]">
          <p className="text-sm font-medium">Industry Type</p>
          <p className="text-sm font-semibold text-black">
            {data?.result?.companyId?.company_product_category}
          </p>
        </div>
        <div className="text-[#8A9099] flex justify-between w-9/12  mt-[7px] leading-[21px]">
          <p className="text-sm font-medium"> Social Media</p>
          <p className="text-sm font-semibold text-black flex">
            {data?.result?.companyId?.company_socialMedia1 && (
              <a href={data?.companyId?.company_socialMedia1Url}>
                <Image
                  src={getBasicIcon(
                    data?.result?.companyId?.company_socialMedia1
                  )}
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
            {data?.result?.companyId?.company_socialMedia2 && (
              <a href={data?.companyId?.company_socialMedia2Url}>
                <Image
                  src={getBasicIcon(
                    data?.result?.companyId?.company_socialMedia2
                  )}
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
        {contacts.length > 0 && (
          <p className=" border-b-2 w-3/4 pb-2 border-red-400 mt-[20px] text-[#3F434A] leading-[30px] text-[20px] font-medium">
            Other Contacts
          </p>
        )}
        <div className="text-[#8A9099] flex justify-between w-9/12  mt-[7px] leading-[21px]">
          {contacts?.map((item: any, i: any) => {
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
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </>
  );
};

export default ClientPocProfile;
