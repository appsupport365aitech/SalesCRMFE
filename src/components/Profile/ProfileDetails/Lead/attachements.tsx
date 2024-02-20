import React, { useEffect, useState } from "react";
import { getBasicIcon } from "@/utils/AssetsHelper";
import Image from "next/image";
import SimpleButton from "@/utils/Button/SimpleButton";
import Backdrop from "@/components/View/Backdrop/Center";
import Uploads from "./uploads";
import axios from "axios";
import { useAppDispatch } from "@/store/store";
import { setSuccess } from "@/store/ai";
import { baseUrl } from "@/utils/baseUrl";

const ScriptDoc = ({
  title,
  docName,
  List,
  size,
  data,
  file,
  refresh,
  check,
  id,
  Del,
}: any) => {
  return (
    <div>
      <p className="text-[14px] mt-[40px] pl-2 mb-2 text-[#595F69] font-medium tracking-wide ">
        {title}
      </p>
      <div className="bg-[#ffffff] w-[100%]  rounded-2xl p-2">
        <div className="flex items-center mt-[14px]">
          <Image
            src={
              check === 1 ? "/Images/Logo/PDF 1.svg" : "/Images/Logo/DOC 1.svg"
            }
            alt=""
            className="w-[55px] px-[10px] "
            // fill={true}
            style={
              {
                // objectFit:"contain"
              }
            }
            width={55}
            height={40}
          />
          <div className="ml-[10px]">
            <p className="text-[12px] text-[#3F434A] font-medium ">{docName}</p>
            <p className="text-[11px] text-[#8A9099] font-medium">{size}</p>
          </div>
          <div className="flex w-fit gap-6 pr-10 items-center justify-between ml-auto">
            <Image
              src={getBasicIcon("Download")}
              alt=""
              className="cursor-pointer"
              onClick={() => {
                window.open(file, "_blank");
              }}
              // fill={true}
              style={
                {
                  // objectFit:"contain"
                }
              }
              width={20}
              height={20}
            />
            <Image
              src={getBasicIcon("Delete")}
              className="cursor-pointer"
              alt=""
              onClick={(e) => {
                // axios
                // .delete(`${baseUrl}api/call-script/delete-by-id?id=${id}`)
                //   .then((e) => {
                //     refresh();
                //   })
                //   .catch((e) => {
                //   });
                Del();
              }}
              // fill={true}
              style={
                {
                  // objectFit:"contain"
                }
              }
              width={20}
              height={20}
            />
            {/* <Image
              src={getBasicIcon("More")}
              alt=""
              // fill={true}
              style={
                {
                  // objectFit:"contain"
                }
              }
              width={20}
              height={20}
            /> */}
          </div>
        </div>
        <p className="text-[#8A9099] text-[13px] font-medium mt-[10px]">
          {data}
        </p>
      </div>
    </div>
  );
};

const Attachements = ({ data }: any) => {
  const [notes, setNotes] = React.useState(false);
  const [bool, setBool] = React.useState(true);
  const showNotes = () => {
    setNotes(true);
  };
  function getFileType(url: any) {
    const parts = url.split("/");
    const lastPart = parts[parts.length - 1];

    // Remove any query parameters if present
    const fileNameWithoutParams = lastPart.split("?")[0];

    // Extract the file extension (e.g., ".pdf")
    const fileExtension = fileNameWithoutParams.split(".").pop().toLowerCase();

    if (fileExtension === "doc" || fileExtension === "docx") {
      return 0; // Word file
    } else if (fileExtension === "pdf") {
      return 1; // PDF file
    } else if (fileExtension === "csv") {
      return 2; // CSV file
    } else {
      return 3; // Anything else
    }
  }

  function getTitleFromURL(url: any) {
    const parts = url.split("/");
    const title = parts[parts.length - 1];

    // Remove any query parameters if present
    const titleWithoutParams = title.split("?")[0];

    // Remove the file extension if present (e.g., ".pdf")
    const titleWithoutExtension = titleWithoutParams.split(".")[0];

    // Replace underscores with spaces and capitalize the words
    const words = titleWithoutExtension.split("_");
    const formattedTitle = words
      .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return formattedTitle;
  }
  function getLastFileNameWithExtension(url: any) {
    const parts = url.split("/");
    const lastPart = parts[parts.length - 1];

    // Remove any query parameters if present
    const fileNameWithoutParams = lastPart.split("?")[0];

    return fileNameWithoutParams;
  }

  function convertDatetime(inputStr: any) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Parse the input string into a Date object
    const dateObj = new Date(inputStr);

    // Convert UTC time to IST
    const istOffset = 5.5 * 60 * 60 * 1000; // Offset in milliseconds (5 hours and 30 minutes)
    const istTime = new Date(dateObj.getTime() + istOffset);

    // Get the components of the IST date
    const day = istTime.getUTCDate();
    const month = months[istTime.getUTCMonth()];
    const year = istTime.getUTCFullYear();
    const hours = istTime.getUTCHours();
    const minutes = istTime.getUTCMinutes();

    // Format the time part (hours and minutes) in 12-hour clock format with AM/PM indicator
    let timeStr = `${hours % 12 || 12}:${minutes.toString().padStart(2, "0")} ${
      hours >= 12 ? "PM" : "AM"
    }`;

    // Format the date and time as desired
    return `${day} ${month} ${year}, ${timeStr}`;
  }

  const [attachments, setAttachments] = useState(data?.attachments);
  const [accessToken, setAccessToken] = useState<any>("");

  useEffect(() => {
    if (window !== undefined) {
      setAccessToken(localStorage.getItem("access-token"));
    }
  }, []);

  const UpdateData = async () => {
    setTimeout(async () => {
      const response = await axios
        .get(`${baseUrl}api/leads/find-by-id?id=${data?._id}`, {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((e) => {
          setAttachments(e.data.result.attachments);
        })
        .catch((e) => {});
    }, 1000);
  };
  const UpdateData2 = async () => {
    setTimeout(async () => {
      const response = await axios
        .get(`${baseUrl}api/leads/find-by-id?id=${data?._id}`, {
          headers: { Authorization: accessToken },
        })
        .then((e) => {
          setAttachments(e.data.result.attachments);
        })
        .catch((e) => {});
    }, 2000);
  };
  const dispatch = useAppDispatch();
  return (
    <>
      {notes && (
        <Backdrop bool={bool}>
          <Uploads
            refresh={() => {
              UpdateData();
            }}
            cancel={() => {
              setBool(false);
              setTimeout(() => {
                setNotes(false);
                setBool(true);
              }, 500);
            }}
            id={data?._id}
          />
        </Backdrop>
      )}
      <div className=" my-[30px]">
        <div className="flex">
          <h2 className="text-[#3F434A] text-2xl font-medium">Attachments</h2>
          <button
            onClick={showNotes}
            className="ml-[400px] absolute right-[20px]  flex bg-bg-red hover:bg-[#ff7d6d] pl-[18px] rounded-xl pr-[18px] py-[10px]"
          >
            <Image
              src="/Images/Logo/Upload.svg"
              className={`w-[18px] svg-white`}
              alt=""
              width={20}
              height={20}
              style={{
                objectFit: "contain",
              }}
            />
            <p className="whitespace-nowrap font-medium  text-[14px] pl-[5px] pr-[5px] text-[#ffffff] ">
              Upload
            </p>
            {/* <label htmlFor="input" className="whitespace-nowrap font-medium  text-[14px] pl-[5px] pr-[5px] text-[#ffffff] " >Input</label> */}
            {/* <input name="input" type="file"></input> */}
          </button>
        </div>
        {attachments?.map((item: any, i: any) => {
          return (
            <ScriptDoc
              key={i}
              check={getFileType(item)}
              title={getTitleFromURL(item)}
              docName={getLastFileNameWithExtension(item)}
              size="5.8 MB"
              id={i}
              file={item}
              Del={() => {
                const arr = attachments.filter((e: any, idd: any) => {
                  return idd !== i;
                });
                const val: any = {
                  attachments: [...arr],
                  _id: data._id,
                };
                axios
                  .put(`${baseUrl}api/leads/update`, val, {
                    headers: { Authorization: accessToken },
                  })
                  .then((e) => {
                    UpdateData2();
                    dispatch(
                      setSuccess({
                        show: true,
                        success: "Deleted Successfully!",
                      })
                    );
                  })
                  .catch((e) => {});
              }}
              refresh={() => {
                UpdateData();
              }}
              // data={convertDatetime(item.createdAt)}
              data={""}
            />
          );
        })}
        {/* <div className="text-gray text-small">
          <p className="text-[#3F434A] font-semibold">
            Demo Product A documents for customer
          </p>
          <div className="mt-[8px] ml-auto mr-[220px] mx-[10px] flex flex-col gap-y-1.5">
            <div className="text-[14px] pl-[10px] py-[8px] text-[#8A9099] leading-[21px] flex justify-between bg-[#F5F5F5] rounded-xl">
              <Image
                src="/Images/Logo/ZIP 1.svg"
                alt=""
                className="w-[55px] px-[10px] "
                // fill={true}
                style={
                  {
                    // objectFit:"contain"
                  }
                }
                width={55}
                height={40}
              />
              <div className="w-[170px] ml-2 mt-3">
                <p className="text-[#3F434A]">Wireframe UI kit.zip</p>
                <p className="text-xs mb-2">5.6 MB</p>
              </div>
              <div className="w-[190px] flex items-center">
                <Image
                  src="/Images/Logo/Download.svg"
                  className={`w-[22px] ml-[145px]`}
                  alt="Download"
                  width={17}
                  height={17}
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
              <Image
                src="/Images/Logo/Delete.svg"
                className={`w-[22px] mr-[7px]`}
                alt="delete"
                width={17}
                height={17}
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
            <p className="text-[#8A9099] ml-2">23 January 2023,3:00PM</p>
          </div>
        </div>
        <div className="py-5 text-gray text-small">
          <p className="text-[#3F434A] font-semibold">
            Demo Product A documents for customer
          </p>
          <div className="mt-[8px] ml-auto mr-[220px] mx-[10px] flex flex-col gap-y-1.5">
            <div className="text-[14px] pl-[10px] py-[8px] text-[#8A9099] leading-[21px] flex justify-between bg-[#F5F5F5] rounded-xl">
              <Image
                src="/Images/Logo/DOC 1.svg"
                alt=""
                className="w-[55px] px-[10px] "
                // fill={true}
                style={
                  {
                    // objectFit:"contain"
                  }
                }
                width={55}
                height={40}
              />
              <div className="w-[170px] ml-2 mt-3">
                <p className="text-[#3F434A]">Wireframe UI kit.doc</p>
                <p className="text-xs mb-2">5.6 MB</p>
              </div>
              <div className="w-[190px] flex items-center">
                <Image
                  src="/Images/Logo/Download.svg"
                  className={`w-[22px] ml-[145px]`}
                  alt="Download"
                  width={17}
                  height={17}
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
              <Image
                src="/Images/Logo/Delete.svg"
                className={`w-[22px] mr-[7px]`}
                alt="delete"
                width={17}
                height={17}
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
            <p className="text-[#8A9099] ml-2">23 January 2023,3:00PM</p>
          </div>
        </div>
        <div className="text-gray text-small">
          <p className="text-[#3F434A] font-semibold">
            Demo Product A documents for customer
          </p>
          <div className="mt-[8px] ml-auto mr-[220px] mx-[10px] flex flex-col gap-y-1.5">
            <div className="text-[14px] pl-[10px] py-[8px] text-[#8A9099] leading-[21px] flex justify-between bg-[#F5F5F5] rounded-xl">
              <Image
                src="/Images/Logo/JPG 2.svg"
                alt=""
                className="w-[55px] px-[10px] "
                // fill={true}
                style={
                  {
                    // objectFit:"contain"
                  }
                }
                width={55}
                height={40}
              />
              <div className="w-[170px] mt-3 ml-2">
                <p className="text-[#3F434A]">Wireframe UI kit.jpg</p>
                <p className="text-xs mb-3">5.6 MB</p>
              </div>
              <div className="w-[190px] flex items-center">
                <Image
                  src="/Images/Logo/Download.svg"
                  className={`w-[22px] ml-[145px]`}
                  alt="Download"
                  width={17}
                  height={17}
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
              <Image
                src="/Images/Logo/Delete.svg"
                className={`w-[22px] mr-[7px]`}
                alt="delete"
                width={17}
                height={17}
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
            <p className="text-[#8A9099] ml-2">23 January 2023,3:00PM</p>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Attachements;
