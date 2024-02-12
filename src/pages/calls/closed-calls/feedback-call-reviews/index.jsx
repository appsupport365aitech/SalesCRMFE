import React, { useEffect, useRef, useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useRouter } from "next/router";
import Navbar from "@/components/app/Navbar/Navbar";
import axios from "axios";
import Filters from "@/views/teams/Filters";
import Table from "@/views/teams/Table";
import Pagination from "@/views/teams/Pagination";
import NavigationWithoutTitle from "@/components/app/NavigationWithoutTitle";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import Backdrop from "@/components/View/Backdrop";
import { getBasicIcon } from "@/utils/AssetsHelper";
import { baseUrl } from "@/utils/baseUrl";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const FeedbackCallReviewsCC = () => {
  const router = useRouter();
  const [columns, setColumns] = useState([
    {
      width: 240,
      left: 40,
      text: "Call ID",
      key: "call_id",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Call Title",
      key: "call_title",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Lead ID",
      key: "lead_id",
      checked: true,
    },
    {
      width: 200,
      left: 40,
      text: "Lead Title",
      key: "lead_title",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Participants",
      key: "participants",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Call Owner",
      key: "call_owner",
      checked: true,
    },
    {
      width: 200,
      left: 40,
      text: "Team Manager",
      key: "team_manager",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Client POC",
      key: "client_poc",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Company Name",
      key: "company_name",
      checked: true,
    },
    {
      width: 200,
      left: 40,
      text: "Call Date & Time",
      key: "call_date_and_time",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Product/Service",
      key: "product_service",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Call Duration",
      key: "call_duration",
      checked: true,
    },
    {
      width: 200,
      left: 40,
      text: "Call Disposition",
      key: "call_disposition",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Call Type",
      key: "call_type",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Call Score",
      key: "call_score",
      checked: true,
    },
    // {
    //   width: 200,
    //   left: 40,
    //   text: "Call Review Type",
    //   key: "call_review_type",
    //   checked: true,
    // },
    {
      width: 120,
      left: 20,
      text: "Call Review Status",
      key: "call_review_status",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Close Date",
      key: "close_date",
      checked: true,
    },
    {
      width: 200,
      left: 40,
      text: "Allocated On",
      key: "allocated_on",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Review Due Date",
      key: "review_due_date",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Last Updated On",
      key: "last_updated_on",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Feedback Requested On",
      key: "feedback_requested_on",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Feedback Requested By",
      key: "feedback_requested_by",
      checked: true,
    },
    {
      width: 200,
      left: 40,
      text: "On Time Review",
      key: "on_time_review",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Delay Time",
      key: "delay_time",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Time to Complete Review",
      key: "time_to_complete_review",
      checked: true,
    },
  ]);
  const [showManageCol, setShowManageCol] = useState(false);

  const [rows, setRows] = useState([]);

  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
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
    callDisposition: {
      label: "Call Disposition",
      options: [{ key: "Follow-Up required", label: "Follow-Up required" }],
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
    callDuration: {
      label: "Call Duration",
      value: "",
      type: "SLIDER",
      min: {
        value: 30,
        label: "30 min",
      },
      max: {
        value: 60,
        label: "1 hr",
      },
    },
    feedbackRequestedOn: {
      label: "Feedback Requested On",
      type: "DATERANGE",
      value: ["", ""],
    },
    reviewDueDate: {
      label: "Review Due Date",
      type: "DATERANGE",
      value: ["", ""],
    },
  });

  const [totalItem, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currPage, setCurrPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const ref = useRef();
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    if (window !== undefined) {
      setAccessToken(localStorage.getItem("access-token"));
    }
  }, []);

  const exportXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "DataSheet.xlsx");
  };

  const exportPDF = () => {
    const documentDefinition = {
      content: [
        {
          text: "JSON to PDF Conversion",
          style: "header",
        },
        {
          text: JSON.stringify(rows, null, 4),
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
          margin: [0, 5, 0, 15],
        },
      },
    };

    pdfMake.createPdf(documentDefinition).download("converted_data.pdf");
  };

  const addExport = (e, e1) => {
    if (e1 === 0) {
      exportXLSX();
    } else if (e1 === 1) {
      exportPDF();
    }
  };

  const handleColsToManage = (column, checked) => {
    setColumns((currCol) => {
      return currCol?.map((col, index) => {
        if (col?.key === column?.key) {
          return {
            ...col,
            checked: checked,
          };
        } else {
          return col;
        }
      });
    });
  };

  const updateColsToView = () => {
    setShowManageCol(!showManageCol);
  };

  const formatDateToCustomFormat = (isoDate) => {
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

  function diff_minutes(start, end) {
    var firstDate = new Date(start),
      secondDate = new Date(end),
      firstDateInSeconds = firstDate.getTime() / 1000,
      secondDateInSeconds = secondDate.getTime() / 1000,
      difference = Math.abs(firstDateInSeconds - secondDateInSeconds);
    if (difference < 60) {
      return difference + " sec";
    } else if (difference < 3600) {
      return Math.floor(difference / 60) + " min";
    } else {
      return Math.floor(difference / 3600) + " hr";
    }
  }

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
      filters?.feedbackRequestedOn?.value &&
      (filters?.feedbackRequestedOn?.value[0] !== "" ||
        filters?.feedbackRequestedOn?.value[1] !== "")
    ) {
      query += `feedback_requested_on=${JSON.stringify(
        filters?.feedbackRequestedOn?.value
      )}&`;
    }
    if (
      filters?.reviewDueDate?.value &&
      (filters?.reviewDueDate?.value[0] !== "" ||
        filters?.reviewDueDate?.value[1] !== "")
    ) {
      query += `review_due_date=${JSON.stringify(
        filters?.reviewDueDate?.value
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
    if (filters?.callDuration?.value && filters?.callDuration?.value !== "") {
      query += `call_duration=${filters?.callDuration?.value}&`;
    }
    return query;
  };

  const getData = (page = currPage) => {
    if (window !== undefined) {
      const newQuery = getQuery();
      const userId = localStorage.getItem("user-id");
      axios
        .get(
          `${baseUrl}api/qa/callForReview?qaStatus=allocated&qaId=${userId}&page=${page}&limit=${limit}&${newQuery}`,
          { headers: { Authorization: accessToken } }
        )
        .then((res) => {
          const data = res?.data?.result;
          setTotalItems(res?.data?.totalRecords);
          const pages = Math.ceil(res?.data?.totalRecords / limit);
          setTotalPages(pages);
          setRows(
            data?.map((item, index) => {
              let row = [
                {
                  text: item?._id || "-",
                  link: `/calls/recorded-calls/${item?._id}/audio-call`,
                },
                {
                  text: item?.callData[0]?.call_title || "-",
                  link: `/calls/recorded-calls/${item?._id}/audio-call`,
                },
                {
                  text: item?.leadId?.[0]?.leadId || "-",
                  link: `/sales/open/${item?.leadId?.[0]?._id}/lead-profile`,
                },
                {
                  text: item?.leadId?.[0]?.lead_title || "-",
                  link: `/sales/open/${item?.leadId?.[0]?._id}/lead-profile`,
                },
                {
                  text:
                    item?.customer[0]?.name ||
                    item?.customer[0]?.customer_name ||
                    "-",
                }, // participants
                { text: item?.owner?.[0]?.name || "-" }, // call owner
                { text: item?.manager[0]?.name || "-" }, // team manager
                { text: item?.customer[0]?.customer_name || "-" }, // client poc
                { text: item?.company?.[0]?.company_name || "-" },
                { text: formatDateToCustomFormat(item?.StartTime) || "-" }, // call date & time
                { text: item?.leadId?.[0]?.product_category || "-" }, // product/service
                { text: diff_minutes(item?.StartTime, item?.EndTime) || "-" }, // call duration
                { text: item?.callDisposiiton || "NA" }, // call disposition
                { text: item?.callData[0]?.call_type || "-" }, // call type
                { text: item?.score || "Not Scored" }, // call score
                // { text: item?.qaId?.name || "-" }, // call review type
                { text: item?.callId || "Feedback" }, // call review status
                { text: item?.callId || "NA" }, // close date
                { text: formatDateToCustomFormat(item?.qaAllocatedAt) || "-" }, // allocated on
                { text: item?.callId || "NA" }, // review due date
                { text: formatDateToCustomFormat(item?.updatedAt) || "-" }, // last updated on
                { text: item?.allocatedTo[0]?.name || "-" }, // feedback requested on
                { text: item?.allocatedBy[0]?.name || "-" }, // feedback requested by
                { text: item?.callId || "NA" }, // on time review
                { text: item?.callId || "NA" }, // delay time
                { text: item?.callId || "NA" }, // time to complete review
              ];
              return row;
            })
          );
        })
        .catch((err) => {});
    }
  };

  useEffect(() => {
    getData();
  }, [accessToken, filters]);

  useEffect(() => {
    const handleBeforeHistoryChange = () => {
      router.events.on("beforeHistoryChange", handleBeforeHistoryChange);
      router.beforePopState(() => {
        router.events.off("beforeHistoryChange", handleBeforeHistoryChange);
        return true;
      });
    };

    handleBeforeHistoryChange();

    return () => {
      router.events.off("beforeHistoryChange", handleBeforeHistoryChange);
    };
  }, []);

  const handleUpdateFilter = (filter, val, idx = -1) => {
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
        setFilters((currFIlters) => {
          return {
            ...currFIlters,
            [filterKey]: newFilter,
          };
        });
      }
    }
  };

  const handlePageChange = (payload) => {
    if (currPage !== payload?.selected) {
      setCurrPage(payload?.selected || 0);
      getData(payload?.selected);
    }
  };

  const handleItemsPerPageChange = (val) => {
    setLimit(val);
  };

  return (
    <div className="overflow-x-hidden">
      <Navbar
        mainTitle={"Closed Calls"}
        title={"Feedback Call Reviews"}
        src="ClosedCalls"
      />
      <div className="bg-[#ffe3e170] mx-6 pt-8 rounded-xl w-[96%] min-h-[90vh] pl-[40px] pr-[40px] mt-[30px]">
        <div className="flex items-center justify-between">
          <div className="w-[60%] bg-white h-[40px] relative border-[#ccc] border-[1px] rounded-[12px] p-2  flex items-center">
            <input
              type="text"
              className="w-[100%] text-black bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
            />
            <img src={getBasicIcon("Search")} alt="Search" />
          </div>
          <div className="flex items-center gap-[20px]">
            <button
              className="text-bg-red ml-[220px]"
              onClick={() => setShowManageCol(!showManageCol)}
            >
              Manage Columns
            </button>
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
                        <CSVLink data={rows} className="" ref={ref}>
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
        <Filters filters={filters} onUpdate={handleUpdateFilter} />
        <Table rows={rows} columns={columns} />
        <Pagination
          itemsPerPage={limit}
          totalItems={totalItem}
          totalPages={totalPages}
          currPage={currPage}
          updatePage={handlePageChange}
          updateItemsPerPage={handleItemsPerPageChange}
        />
      </div>
      {showManageCol && (
        <Backdrop>
          <div className="p-[20px]">
            <div className="w-[100%] flex items-center justify-between text-black mb-[20px]">
              <h2 className="text-[24px] font-medium">Manage Columns</h2>
              <button
                className="w-[30px] h-[30px] cursor-pointer rounded-xl flex items-center justify-center bg-[#eeeeee]"
                onClick={() => setShowManageCol(!showManageCol)}
              >
                <img
                  alt="close"
                  loading="lazy"
                  className="w-[15px] h-[15px]"
                  src="/Images/Icons/Basic/Cross.svg"
                />
              </button>
            </div>
            <div>
              <p className="text-black mb-[16px]">Select columns to show</p>
              {columns?.map((column, index) => (
                <div key={index}>
                  <label
                    htmlFor={column?.key}
                    className="text-black flex items-center gap-[16px]"
                  >
                    <input
                      type="checkbox"
                      id={column?.key}
                      name="manager_columns"
                      onChange={(e) =>
                        handleColsToManage(column, e.target.checked)
                      }
                      checked={column?.checked}
                    />
                    <span className="">{column?.text}</span>
                  </label>
                </div>
              ))}
              <div className="w-[100%] flex justify-end pt-[30px]">
                <button
                  onClick={updateColsToView}
                  className="bg-bg-red hover:bg-[#ff7d6d] rounded-2xl flex items-center justify-center cursor-pointer py-[10px] px-[30px] self-end"
                >
                  <span className="text-[#fff] font-medium text-[15px] tracking-wide">
                    Save
                  </span>
                </button>
              </div>
            </div>
          </div>
        </Backdrop>
      )}
    </div>
  );
};

// export async function getServerSideProps({ query, ...params }: any) {
//     const response = await axios.get(
//         "https://sales365.trainright.fit/api/active-call/find-all"
//     );
//     return {
//         props: {
//             data: response.data || {},
//         },
//     };
// }

export default FeedbackCallReviewsCC;
