import React, { useEffect, useState } from "react";
import { getBasicIcon, getRoundedAvatar } from "@/utils/AssetsHelper";
import Image from "next/image";
import Backdrop from "@/components/View/Backdrop/Center";
import EditLead from "@/components/View/EditLead";
import axios from "axios";
import { baseUrl } from "@/utils/baseUrl";

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
  const [accessToken, setAccessToken] = useState<any>("");

  useEffect(() => {
    if (window !== undefined) {
      setAccessToken(localStorage.getItem("access-token"));
    }
  }, []);

  useEffect(() => {
    setData(data1);
  }, [data1]);

  const UpdateData = async () => {
    const response = await axios
      .get(`${baseUrl}api/leads/find-by-id?id=${data1?.result?._id}`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((e) => {
        setData(e.data);
        refresh(e.data?.result?.customerId?.name);
      })
      .catch((e) => {});
  };
  const contacted: any = data?.result?.customerId;
  const contacts = contacted?.contacts ? contacted?.contacts : [];

  return (
    <>
      {edit && (
        <Backdrop pad={"50px 0"} bool={true} width={"60%"}>
          <EditLead
            update={UpdateData}
            cancel={cancelEdit}
            data={data.result}
            title={"Edit Client"}
            mastersData={{}}
          />
        </Backdrop>
      )}
      <div className="w-[100%]">
        <div className="flex -space-x-2 overflow-hidden w-[100%]">
          <div className="flex items-center w-[100%] justify-between pb-[10px] ">
            <div className="flex items-center justify-between gap-5 w-[100%]">
              <div className="flex gap-5">
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
                <div className="flex flex-col">
                  <p className="block cursor-pointer text-xl leading-[10px ] font-semibold ml-[-6px] text-[14px] text-black hover:text-bg-red">
                    {data?.result?.customerId?.customer_name}
                  </p>
                  <p className="block cursor-pointer text-sm leading-[10px ] ml-[-6px] text-[12px] text-gray-400 hover:text-bg-red">
                    {data?.result?.customerId?.customer_designation}
                  </p>
                </div>
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
        </div>
        <p className="border-b-2 border-red-400 w-[100%] pb-2 mt-[20px] text-[#3F434A] leading-[30px] text-[20px] font-medium">
          Info
        </p>
        <div className="text-[#8A9099] flex mt-[7px] leading-[21px]">
          <p className="text-sm font-medium w-[40%] mr-4">Gender</p>
          <p className="text-sm font-semibold text-black">
            {data?.result?.customerId?.customer_gender}
          </p>
        </div>
        <div className="text-[#8A9099] flex mt-[7px] leading-[21px]">
          <p className="text-sm font-medium w-[40%] mr-4">Phone</p>
          <p className="text-sm font-semibold text-black">
            {data?.result?.customerId?.customer_contact}
          </p>
        </div>
        <div className="text-[#8A9099] flex mt-[7px] leading-[21px]">
          <p className="text-sm font-medium w-[40%] mr-4">Email</p>
          <p className="text-sm font-semibold text-black">
            {data?.result?.customerId?.customer_email}
          </p>
        </div>
        <div className="text-[#8A9099] flex mt-[7px] leading-[21px]">
          <p className="text-sm font-medium w-[40%] mr-4"> Social Media</p>
          <p className="text-sm font-semibold text-black flex">
            {data?.result?.customerId?.customer_socialMedia1 && (
              <a href={data?.result?.customerId?.customer_socialMedia1Url}>
                <Image
                  src={getBasicIcon(
                    data?.result?.customerId?.customer_socialMedia1
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
            {data?.result?.customerId?.customer_socialMedia2 && (
              <a href={data?.result?.customerId?.customer_socialMedia1Url}>
                <Image
                  src={getBasicIcon(
                    data?.result?.customerId?.customer_socialMedia2
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
        <p className=" border-b-2 w-[100%] pb-2 border-red-400 mt-[20px] text-[#3F434A] leading-[30px] text-[20px] font-medium">
          Company Info
        </p>
        <div className="text-[#8A9099] flex mt-[7px] leading-[21px]">
          <p className="text-sm font-medium w-[40%] mr-4">Company Name</p>
          <p className="text-sm font-semibold text-black">
            {data?.result?.companyId?.company_name}
          </p>
        </div>
        <div className="text-[#8A9099] flex mt-[7px] leading-[21px]">
          <p className="text-sm font-medium w-[40%] mr-4">Company Addrsss</p>
          <p className="text-sm font-semibold text-black">
            {data?.result?.companyId?.company_address}
          </p>
        </div>
        <div className="text-[#8A9099] flex mt-[7px] leading-[21px]">
          <p className="text-sm font-medium w-[40%] mr-4">Website link</p>
          <p className="text-sm font-semibold text-black">
            {data?.result?.companyId?.company_website_url}
          </p>
        </div>
        <div className="text-[#8A9099] flex mt-[7px] leading-[21px]">
          <p className="text-sm font-medium w-[40%] mr-4">Industry Type</p>
          <p className="text-sm font-semibold text-black">
            {data?.result?.companyId?.company_product_category}
          </p>
        </div>
        {data?.result?.result?.companyId?.company_socialMedia1 ? (
          <div className="text-[#8A9099] flex mt-[7px] leading-[21px]">
            <p className="text-sm font-medium w-[40%] mr-4"> Social Media</p>
            <p className="text-sm font-semibold text-black flex">
              <a href={data?.companyId?.company_socialMedia1Url}>
                <Image
                  src={getBasicIcon(
                    data?.result?.result?.companyId?.company_socialMedia1
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

              {data?.result?.companyId?.company_socialMedia2 && (
                <a href={data?.result?.companyId?.company_socialMedia2Url}>
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
        ) : null}

        <div className="py-2"></div>
        {/* {!data?.result?.customerId?.contacts?.every(
          (item: any) => item === null
        ) && (
        )} */}
        <div>
          <p className=" border-b-2 w-[100%] pb-2 border-red-400 mt-[20px] text-[#3F434A] leading-[30px] text-[20px] font-medium">
            Other Contacts
          </p>
          {data?.result?.customerId?.contacts &&
            data?.result?.customerId?.contacts?.map(
              (contact: any, index: number) => {
                if (contact && Object.keys(contact).length !== 0) {
                  return (
                    <ul
                      key={index}
                      role="list"
                      className="grid gap-x-8 pt-2 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
                    >
                      <li>
                        <div className="flex items-center gap-x-2 mr-4">
                          <Image
                            className="h-12 w-12 rounded-full "
                            src={getRoundedAvatar(6, 30)}
                            alt=""
                            width={54}
                            height={48}
                            style={{
                              objectFit: "contain",
                            }}
                          />
                          <div>
                            <h4 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                              {contact?.customer_name}
                            </h4>
                            <a
                              href=""
                              className="block text-sm font-small text-gray-500 hover:text-indigo-500"
                            >
                              {contact?.designation}
                            </a>
                          </div>
                        </div>
                      </li>
                    </ul>
                  );
                } else {
                  return null;
                }
              }
            )}
        </div>
        {/* <div className="mx-auto w-[100%] border-b border-gray-300 my-6"></div> */}
      </div>
    </>
  );
};

export default ClientPocProfile;
