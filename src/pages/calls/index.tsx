import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/app/Navbar/Navbar";
import Navigator from "@/utils/customNavigator";
import Filters from "@/views/teams/Filters";
import Table from "@/views/teams/Table";
import Pagination from "@/views/teams/Pagination";
import * as XLSX from "xlsx";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import NavigationWithoutTitle from "@/components/app/NavigationWithoutTitle";
import { CSVLink } from "react-csv";
import axios from "axios";
import { getBasicIcon } from "@/utils/AssetsHelper";
import DropDown2 from "@/utils/Button/DropDown2";
import { useAppDispatch } from "@/store/store";
import { setError, setSuccess } from "@/store/ai";
import NavbarWithButton from "@/components/app/Navbar/NavbarWithButton";
import ButtonDropDown from "@/utils/Button/Button";
import { baseUrl } from "@/utils/baseUrl";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const CallsPage = () => {
  const [rowsACR, setRowsACR] = useState([]);
  const [rowsFRCR, setRowsFRCR] = useState([]);
  const [qaList, setQaList] = useState([]);
  const [searchAssignTo, setSearchAssignTo] = useState("");
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [totalItem, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currPage, setCurrPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const [currTab, setCurrTab] = useState(0);
  const [subType, setSubType] = useState("allocated_call_reviews");
  const [search, setSearch] = useState("");
  const [tabs, setTabs] = useState([
    { id: 0, title: "Calls For Review" },
    { id: 1, title: "Active Calls" },
    { id: 2, title: "Closed Calls" },
  ]);
  const [accessToken, setAccessToken] = useState<any>("");
  function convertDatetimeToCustomFormat(dateStr: any) {
    // Convert the string to a Date object
    const dt: any = new Date(dateStr);

    // Calculate the number of seconds since January 1, 1400 (Iranian calendar)
    const referenceDate: any = new Date("1400-01-01T00:00:00Z");
    const secondsDifference = Math.floor((dt - referenceDate) / 1000);

    return secondsDifference;
  }

  useEffect(() => {
    if (window !== undefined) {
      setAccessToken(localStorage.getItem("access-token"));
    }
  }, []);

  const [data, setData] = useState<any>([{}, {}]);
  useEffect(() => {
    axios
      .get(`${baseUrl}api/active-call/find-all`, {
        headers: { Authorization: accessToken },
      })
      .then((res: any) => {
        setData(res?.data?.result);
      })
      .catch((e: any) => {});
  }, [accessToken]);

  const [filters, setFilters] = useState<any>({
    callStartAndEndDate: {
      label: "Call Start and End Date",
      type: "DATERANGE",
      value: ["", ""],
    },
    productService: {
      label: "Product/Service",
      options: [
        { key: "Email automation", label: "Email automation" },
        { key: "social media automation", label: "social media automation" },
        // { key: "P1", label: "P1" },
        // { key: "P2", label: "P2" },
        // { key: "P3", label: "P3" },
        // { key: "Product A", label: "Product A" },
        // { key: "Product B", label: "Product B" },
        // { key: "Product C", label: "Product C" },
        // { key: "Product D", label: "Product D" },
      ],
      value: "",
    },
    callType: {
      label: "Call Type",
      options: [
        {
          label: "Discovery",
          key: "Discovery",
        },
        {
          label: "Product Demo",
          key: "Product Demo",
        },
        {
          label: "Solution Design",
          key: "Solution Design",
        },
        {
          label: "Consultation",
          key: "Consultation",
        },
        {
          label: "Pricing Discussion",
          key: "Pricing Discussion",
        },
        {
          label: "Negotiation",
          key: "Negotiation",
        },
        {
          label: "Follow-Up",
          key: "Follow-Up",
        },
      ],
      value: "",
    },
    callDisposition: {
      label: "Call Disposition",
      options: [{ key: "Follow-Up required", label: "Follow-Up required" }],
      value: "",
    },
  });
  console.log(filters, "ut");

  const formatDateToCustomFormat = (isoDate: any) => {
    const dateObject = new Date(isoDate);
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

    return `${day} ${month} ${year}`;

    // const months = [
    //     "Jan",
    //     "Feb",
    //     "Mar",
    //     "Apr",
    //     "May",
    //     "Jun",
    //     "Jul",
    //     "Aug",
    //     "Sep",
    //     "Oct",
    //     "Nov",
    //     "Dec",
    // ];

    // const dateObj = new Date(isoDate);
    // const day = dateObj.getUTCDate();
    // const month = months[dateObj.getUTCMonth()];
    // const year = dateObj.getUTCFullYear();

    // return `${day} ${month} ${year}`;

    // // Create a Date object from the given date string (UTC time)
    // const dateObj = new Date(dateString);

    // // Convert the UTC time to IST (Indian Standard Time)
    // const utcToIstOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
    // dateObj.setTime(dateObj.getTime() + utcToIstOffset);

    // // Months array to get the month name
    // const months = [
    //   "January",
    //   "February",
    //   "March",
    //   "April",
    //   "May",
    //   "June",
    //   "July",
    //   "August",
    //   "September",
    //   "October",
    //   "November",
    //   "December",
    // ];

    // // Get the day and month
    // const day = dateObj.getUTCDate();
    // const month = months[dateObj.getUTCMonth()];

    // // Get the hours and minutes in IST
    // let hours = dateObj.getUTCHours();
    // let minutes: string = dateObj.getUTCMinutes().toString();

    // // Convert the hours to 12-hour format and determine AM/PM
    // const amPm = hours >= 12 ? "PM" : "AM";
    // hours = hours % 12 || 12; // Convert 0 to 12

    // // Pad single-digit minutes with a leading zero
    // minutes = minutes.toString().padStart(2, "0");

    // // Create the formatted date and time string
    // const formattedDate = `${day} ${month}`;
    // const formattedTime = `${hours}:${minutes} ${amPm}`;

    // return { date: formattedDate, time: formattedTime };
  };

  const columnsACR = [
    {
      width: 240,
      left: 40,
      text: "Call ID",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Call Title",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Lead ID",
      checked: true,
    },
    {
      width: 200,
      left: 40,
      text: "Lead Title",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Company Name",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Call Owner",
      checked: true,
    },
    {
      width: 200,
      left: 40,
      text: "Team Manager",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Client POC",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Call Date & Time",
      checked: true,
    },
    {
      width: 200,
      left: 40,
      text: "Product/Service",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Call Disposition",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Call Type",
      checked: true,
    },
    {
      width: 200,
      left: 40,
      text: "Call Review Type",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Call Score",
      checked: true,
    },
    currTab != 0 && {
      width: 120,
      left: 20,
      text: "Allocation Type",
      checked: true,
    },
    currTab != 0 && {
      width: 200,
      left: 40,
      text: "Allocated On",
      checked: true,
    },
    currTab != 0 && {
      width: 120,
      left: 20,
      text: "Allocated To",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Review Due Date",
      checked: true,
    },
    {
      width: 160,
      left: 20,
      text: "Call Review Status",
      checked: true,
    },
  ];

  const columnsFRCR = [
    {
      width: 240,
      left: 40,
      text: "Call ID",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Call Title",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Lead ID",
      checked: true,
    },
    {
      width: 200,
      left: 40,
      text: "Lead Title",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Call Owner",
      checked: true,
    },
    {
      width: 200,
      left: 40,
      text: "Team Manager",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Client POC",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Company Name",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Call Date & Time",
      checked: true,
    },
    {
      width: 200,
      left: 40,
      text: "Product/Service",
      checked: true,
    },
    {
      width: 200,
      left: 40,
      text: "Call Review Type",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Call Disposition",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Call Type",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Call Score",
      checked: true,
    },
    currTab != 0 && {
      width: 120,
      left: 20,
      text: "Feedback Requested On",
      checked: true,
    },
    currTab != 0 && {
      width: 200,
      left: 40,
      text: "Feedback Requested By",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "On Time Review",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Delay Time",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Time To Complete Review",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Call Review Status",
      checked: true,
    },
  ];

  const generateRows = (data: any) => {
    if (subType === "allocated_call_reviews") {
      setRowsACR(
        data?.map((item: any, index: number) => {
          let row = [
            {
              text:
                String(
                  convertDatetimeToCustomFormat(item?.callData?.[0]?.call_date)
                ).slice(0, 4) || "-",
              id: item?._id,
              link: `/calls/recorded-calls/${item?._id}/audio-call`,
            },
            {
              text: item?.callData[0]?.call_title || "-",
              id: item?.callData[0]?.callId,
            }, // call title
            {
              text: item?.leadId?.[0]?.leadId || "-",
              id: item?._id,
              link: `/sales/open/${item?.leadId?.[0]?._id}/lead-profile`,
            },
            {
              text: item?.leadId?.[0]?.lead_title || "-",
              id: item?._id,
              link: `/sales/open/${item?.leadId?.[0]?._id}/lead-profile`,
            },
            {
              text: item?.company?.[0]?.company_name || "-",
              id: item?._id,
              link: `/sales/open/${item?.leadId?.[0]?._id}/company-profile`,
            },
            { text: item?.owner?.[0]?.name || "-", id: item?._id }, // call owner
            { text: item?.manager[0]?.name || "-", id: item?._id }, // team manager
            { text: item?.customer[0]?.customer_name || "-", id: item?._id }, // client poc
            {
              text:
                formatDateToCustomFormat(item?.callData[0]?.call_date) || "-",
              id: item?._id,
            }, // call date & time
            {
              text: item?.leadId?.[0]?.product_category || "-",
              id: item?._id,
            }, // product/service
            { text: item?.callDisposiiton || "NA", id: item?._id }, // call disposition
            { text: item?.callData[0]?.call_type || "-", id: item?._id }, // call type
            {
              text: "Allocated Call",
              id: item?._id,
            }, // call review type
            { text: item?.score || "Not Scored", id: item?._id }, // call score
            currTab != 0 && { text: item?.callId || "Manual", id: item?._id }, // allocation type
            currTab != 0 && {
              text: item?.qaAllocatedAt
                ? formatDateToCustomFormat(item?.qaAllocatedAt)
                : "-",
              id: item?._id,
            }, // allocated on
            currTab != 0 && {
              text: item?.allocatedTo[0]?.name || "-",
              id: item?._id,
            }, // allocated to
            { text: item?.callId || "NA", id: item?._id }, // review due date
            {
              text:
                currTab == 0
                  ? "Pending"
                  : currTab == 1
                  ? "In-progess"
                  : "Completed",
              id: item?._id,
            }, // call review status
          ];
          return row;
        })
      );
    } else {
      setRowsFRCR(
        data?.map((item: any, index: number) => {
          let row = [
            {
              text: item?._id || "-",
              id: item?._id,
              link: `/calls/recorded-calls/${item?._id}/audio-call`,
            },
            {
              text: item?.callData[0]?.call_title || "-",
              id: item?._id,
              link: `/calls/recorded-calls/${item?._id}/audio-call`,
            },
            { text: item?.leadId?.[0]?.leadId || "-", id: item?._id },
            { text: item?.leadId?.[0]?.lead_title || "-", id: item?._id },
            { text: item?.owner?.[0]?.name || "-", id: item?._id }, // call owner
            { text: item?.manager[0]?.name || "-", id: item?._id }, // team manager
            { text: item?.customer[0]?.customer_name || "-", id: item?._id }, // client poc
            { text: item?.company?.[0]?.company_name || "-", id: item?._id },
            {
              text:
                formatDateToCustomFormat(item?.callData[0]?.call_date) || "-",
              id: item?._id,
            }, // call date & time
            {
              text: item?.leadId?.[0]?.product_category || "-",
              id: item?._id,
            }, // product/service
            { text: "Feedback Requested", id: item?._id }, // call review type
            { text: item?.callDisposiiton || "NA", id: item?._id }, // call disposition
            { text: item?.callData[0]?.call_type || "-", id: item?._id }, // call type
            { text: item?.score || "Not Scored", id: item?._id }, // call score
            currTab != 0 && {
              text: item?.allocatedTo[0]?.name || "-",
              id: item?._id,
            }, // feedback requestd on
            currTab != 0 && {
              text: item?.allocatedBy[0]?.name || "-",
              id: item?._id,
            }, // feedback requestd by
            { text: item?.callId || "NA", id: item?._id }, // on time review
            { text: item?.callId || "NA", id: item?._id }, // delay time
            { text: item?.callId || "NA", id: item?._id }, // time to complete review
            {
              text:
                currTab == 0
                  ? "Pending"
                  : currTab == 1
                  ? "In-progess"
                  : "Completed",
              id: item?._id,
            },
          ];
          return row;
        })
      );
    }
  };

  const getData = (page = currPage) => {
    let endpoint = "";
    const newQuery = getQuery();
    if (subType === "feedback_requested_call_reviews") {
      endpoint = `${baseUrl}api/qa/findRequestFeedBack?page=${page}&limit=${limit}&${newQuery}`;
    } else {
      switch (currTab) {
        case 0:
          endpoint = `${baseUrl}api/qam/callForReview?qaStatus=active&page=${page}&limit=${limit}&${newQuery}`;
          break;
        case 1:
          endpoint = `${baseUrl}api/qam/callForReview?qaStatus=allocated&page=${page}&limit=${limit}&${newQuery}`;
          break;
        case 2:
          endpoint = `${baseUrl}api/qam/callForReview?qaStatus=closed&page=${page}&limit=${limit}&${newQuery}`;
          break;
        default:
          endpoint = `${baseUrl}api/qam/callForReview?qaStatus=active&page=${page}&limit=${limit}&${newQuery}`;
          break;
      }
    }
    axios
      .get(endpoint, { headers: { Authorization: accessToken } })
      .then((res: any) => {
        const data = res?.data?.result;
        setData(data);
        generateRows(data);
        setTotalItems(res?.data?.totalRecords);
        const pages = Math.ceil(res?.data?.totalRecords / limit);
        setTotalPages(pages);
      })
      .catch((err: any) => {});
  };

  const [reload, setReload] = useState(false);

  useEffect(() => {
    clearFilter();
    getData();
  }, [currTab, subType, reload]);

  useEffect(() => {
    axios
      .get(`${baseUrl}api/master-users/findAllQA_Analyst`, {
        headers: { Authorization: accessToken },
      })
      .then((res: any) => {
        setQaList(res?.data?.result);
      })
      .catch((err: any) => {});
  }, []);

  const handleTabNavigation = (payload: any) => {
    setCurrTab(payload);
    // setSubType(subType);
  };

  const handleSubType = (payload: string) => {
    setSubType(payload);
  };

  const getQuery = () => {
    let query = "";
    if (search) {
      query += `search=${search}&`;
    }
    if (
      filters?.productService?.value &&
      filters?.productService?.value !== ""
    ) {
      query += `product_service=${filters?.productService?.value}&`;
    }
    if (
      filters?.callStartAndEndDate?.value &&
      (filters?.callStartAndEndDate?.value[0] !== "" ||
        filters?.callStartAndEndDate?.value[1] !== "")
    ) {
      query += `call_start_and_end_date=${JSON.stringify(
        filters?.callStartAndEndDate?.value
      )}&`;
    }
    if (filters?.callType?.value && filters?.callType?.value !== "") {
      query += `call_type=${filters?.callType?.value}&`;
    }
    if (
      filters?.callDisposition?.value &&
      filters?.callDisposition?.value !== ""
    ) {
      query += `call_disposition=${filters?.callDisposition?.value}&`;
    }
    return query;
  };

  const clearFilter = () => {
    for (const filterKey of Object.keys(filters)) {
      const newFilter = {
        ...filters[filterKey],
        value: typeof filters[filterKey].value === "object" ? ["", ""] : "",
      };
      setFilters((currFIlters: any) => {
        return {
          ...currFIlters,
          [filterKey]: newFilter,
        };
      });
    }
  };

  const handleUpdateFilter = (filter: any, val: any, idx: number = -1) => {
    for (const filterKey of Object.keys(filters)) {
      if (filters[filterKey].label === filter.label) {
        const newFilter = {
          ...filters[filterKey],
          value:
            idx === -1
              ? val
              : idx === 0
              ? [val, filters[filterKey].value[1]]
              : [filters[filterKey].value[0], val],
        };
        setFilters((currFIlters: any) => {
          return {
            ...currFIlters,
            [filterKey]: newFilter,
          };
        });
      }
    }
  };

  useEffect(() => {
    getData();
  }, [filters]);

  const ref: any = useRef();
  const dispatch = useAppDispatch();

  const exportXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "DataSheet.xlsx");
  };

  const exportPDF = () => {
    console.log("------ export pdf ------", data);
    const documentDefinition = {
      content: [
        {
          text: "JSON to PDF Conversion",
          style: "header",
        },
        {
          text: JSON.stringify(data, null, 4),
          style: "contentStyle",
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          marginBottom: 10,
        },
        contentStyle: {
          fontSize: 12,
          margin: [0, 5, 0, 15] as [number, number, number, number],
        },
      },
    };

    pdfMake.createPdf(documentDefinition).download("converted_data.pdf");
  };

  const addExport = (e: any, e1: any) => {
    if (e1 === 0) {
      exportXLSX();
    } else if (e1 === 1) {
      exportPDF();
    }
  };

  useEffect(() => {
    // call api for data with filters
  }, [currTab, subType]);

  const handleSelection = (checked: boolean, row?: any) => {
    if (row) {
      if (checked) {
        setSelectedRows((currSelectedRows: any) => {
          return [...currSelectedRows, row?.[0]?.id];
        });
      } else {
        setSelectedRows(
          selectedRows.filter((rowItem: any) => rowItem !== row?.[0]?.id)
        );
      }
    } else {
      if (checked) {
        if (subType === "allocated_call_reviews") {
          setSelectedRows(
            rowsACR?.map((rowItem: any) => {
              return rowItem?.[0]?.id;
            })
          );
        } else {
          setSelectedRows(
            rowsFRCR?.map((rowItem: any) => {
              return rowItem?.[0]?.id;
            })
          );
        }
      } else {
        setSelectedRows([]);
      }
    }
  };

  const handleSearchAssignTo = (val: any) => {
    setSearchAssignTo(val);
  };

  const handleAssignTo = (checked: boolean, qaId: any) => {
    try {
      setTimeout(() => {
        setReload(true);
      }, 2000);
      if (selectedRows.length === 0) {
        dispatch(
          setError({
            show: true,
            error: "No Selection.",
          })
        );
      } else if (checked) {
        dispatch(
          setSuccess({
            show: true,
            success: "Assigning...",
          })
        );
        const assigningPromise = selectedRows.map((selectedRow: any) => {
          const payload = {
            qaId: qaId,
            qamId: window !== undefined ? localStorage.getItem("user-id") : "",
            callId: selectedRow,
          };
          return axios.post(`${baseUrl}api/qam/allocateCallToQA`, payload, {
            headers: { Authorization: accessToken },
          });
        });
        Promise.all(assigningPromise)
          .then((res: any) => {
            dispatch(
              setSuccess({
                show: true,
                success: "Successfully Assigned!",
              })
            );
            setTimeout(() => {
              setReload(false);
            }, 2100);
          })
          .catch((err: any) => {
            dispatch(
              setError({
                show: true,
                error: "Error Occured!",
              })
            );
          });
      }
    } catch (error) {}
  };

  const handlePageChange = (payload: any) => {
    if (currPage !== payload?.selected) {
      setCurrPage(payload?.selected || 0);
      getData(payload?.selected);
    }
  };

  const handleItemsPerPageChange = (val: any) => {
    setLimit(val);
  };

  const renderAssignToDD = () => {
    return (
      <div>
        <div className="flex items-center p-[6px] border-solid border-1 border-black rounded">
          <input
            type="text"
            className="bg-white outline-none text-black"
            placeholder="Search..."
            value={searchAssignTo}
            onInput={(e: any) => handleSearchAssignTo(e.target.value)}
          />
          <button className="flex items-center justify-center w-[20px] h-[20px]">
            <img
              src={getBasicIcon("Search")}
              alt="Search"
              width={"20px"}
              height={"20px"}
            />
          </button>
        </div>
        <ul className="">
          {searchAssignTo
            ? qaList
                ?.filter((qaItem: any, index: number) => {
                  return qaItem?.name
                    ?.toLowerCase()
                    .includes(searchAssignTo.toLowerCase());
                })
                .map((qaItem: any, index: number) => (
                  <li key={index}>
                    <label
                      htmlFor={qaItem?._id}
                      className="w-[100%] flex items-center justify-between text-black p-[4px] cursor-pointer"
                    >
                      <span>{qaItem?.name}</span>
                      <input
                        type="checkbox"
                        id={qaItem?._id}
                        onChange={(e) =>
                          handleAssignTo(e.target.checked, qaItem?._id)
                        }
                      />
                    </label>
                  </li>
                ))
            : qaList?.map((qaItem: any, index: number) => (
                <li key={index}>
                  <label
                    htmlFor={qaItem?._id}
                    className="w-[100%] flex items-center justify-between text-black p-[4px] cursor-pointer"
                  >
                    <span>{qaItem?.name}</span>
                    <input
                      type="checkbox"
                      id={qaItem?._id}
                      onChange={(e) =>
                        handleAssignTo(e.target.checked, qaItem?._id)
                      }
                    />
                  </label>
                </li>
              ))}
        </ul>
      </div>
    );
  };

  const renderControls = () => {
    return (
      <div className="flex items-center gap-[20px]">
        {currTab === 0 ? (
          <>
            <DropDown2 text="Assign To" id={0} dark={true} dropdown={true}>
              {renderAssignToDD()}
            </DropDown2>
            {/* <ButtonDropDown
              dropdown={true}
              list={[]}
              click={() => {}}
              text="Auto - Allocate"
              id={0}
              light={false}
              dark={false}
            /> */}
            {/* <button className='text-black'>Auto Allocate</button> */}
          </>
        ) : currTab === 1 ? (
          <DropDown2 text="Re-Assign To" id={0} dropdown={true}>
            {renderAssignToDD()}
          </DropDown2>
        ) : null}
      </div>
    );
  };

  const renderFilters = () => {
    return (
      <div className="w-[100%] py-[20px]">
        <div className="flex items-center justify-between">
          <div className="w-[100%] flex items-center gap-[20px]">
            <div className="w-[60%] bg-white h-[40px] relative border-[#ccc] border-[1px] rounded-[12px] p-2  flex items-center">
              <input
                type="text"
                className="w-[100%] text-black bg-white outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
              />
              <img src={getBasicIcon("Search")} alt="Search" />
            </div>
            {renderControls()}
          </div>
          <div className="flex justify-end gap-[20px]">
            <NavigationWithoutTitle
              buttons={[
                {
                  text: "",
                  dropdown: true,
                  id: 1,
                  icon: "Download",
                  light: true,
                  dark: false,
                  click: addExport,
                  list: [
                    { title: "Excel", Icon: "Excel" },
                    { title: "PDF", Icon: "PDF" },
                    {
                      title: "CSV",
                      Icon: "CSV",
                      wrapper: (
                        <CSVLink data={data} className="" ref={ref}>
                          CSV
                        </CSVLink>
                      ),
                    },
                  ],
                },
              ]}
            />
          </div>
        </div>
        <div className="">
          <Filters filters={filters} onUpdate={handleUpdateFilter} />
        </div>
      </div>
    );
  };

  const renderACR = () => {
    return (
      <>
        <Table
          rows={rowsACR}
          columns={columnsACR}
          handleSelection={handleSelection}
          selectedRows={selectedRows}
        />
      </>
    );
  };

  const renderFRCR = () => {
    return (
      <Table
        rows={rowsFRCR}
        columns={columnsFRCR}
        handleSelection={handleSelection}
        selectedRows={selectedRows}
      />
    );
  };

  const renderToggleSwitch = () => {
    return (
      <div className="flex text-black mt-6 px-8 pr-20 items-center gap-[20px]">
        <div className="w-[350px] px-2 bg-gray-200 rounded-3xl">
          <button
            className={`w-[140px] text-sm font-medium ${
              subType == "allocated_call_reviews"
                ? "focus:outline-none bg-[#fff] rounded-3xl px-6 py-2 mt-2 mb-2"
                : "text-gray-400"
            } `}
            onClick={() => handleSubType("allocated_call_reviews")}
          >
            Allocated Call Reviews
          </button>
          <button
            className={`w-[190px] text-sm font-medium ${
              subType == "feedback_requested_call_reviews"
                ? "focus:outline-none bg-[#fff] rounded-3xl px-6 py-2 mt-2 mb-2"
                : " text-gray-400"
            } `}
            onClick={() => handleSubType("feedback_requested_call_reviews")}
          >
            Feedback Requested Call Reviews
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar
        mainTitle={`Calls > ${tabs?.[currTab]?.title}`}
        title={
          subType === "allocated_call_reviews"
            ? "Allocated Call Reviews"
            : "Feedback Requested Call Reviews"
        }
        src="Phone"
      />
      <Navigator
        callback={handleTabNavigation}
        current={currTab}
        list={tabs}
        width={true}
      />
      {renderToggleSwitch()}
      <div className="pl-9 pt-6 pb-3">
        <h2 className="font-semibold text-xl">
          {tabs?.[currTab]?.title} {" > "}
          {subType === "allocated_call_reviews"
            ? "Calls To Be Allocated"
            : "Feedback Requested Calls For Review"}
        </h2>
      </div>
      {reload ? (
        <></>
      ) : (
        <div className="bg-[#ffe3e170] mt-6 rounded-lg mx-6 px-6 overflow-x-auto">
          {renderFilters()}
          {subType === "allocated_call_reviews" ? renderACR() : renderFRCR()}
        </div>
      )}
      <Pagination
        itemsPerPage={limit}
        totalItems={totalItem}
        totalPages={totalPages}
        currPage={currPage}
        updatePage={handlePageChange}
        updateItemsPerPage={handleItemsPerPageChange}
      />
    </>
  );
};

// export async function getServerSideProps({ query, ...params }: any) {
//     const response = await axios.get(
//         `${baseUrl}api/active-call/find-all`
//     );
//     return {
//         props: {
//             data: response.data || {},
//         },
//     };
// }

export default CallsPage;
