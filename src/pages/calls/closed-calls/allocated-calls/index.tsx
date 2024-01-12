import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useRouter } from "next/router";
import Navbar from "@/components/app/Navbar/Navbar";
import Filters from "@/views/teams/Filters";
import Table from "@/views/teams/Table";
import Pagination from "@/views/teams/Pagination";
import NavigationWithoutTitle from "@/components/app/NavigationWithoutTitle";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import Backdrop from "@/components/View/Backdrop";
import { getBasicIcon } from "@/utils/AssetsHelper";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const AllocatedCallsCC = ({ data }: any) => {
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
        {
            width: 200,
            left: 40,
            text: "Call Review Type",
            key: "call_ireview_type",
            checked: true,
        },
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
                { key: "Product A", label: "Product A" },
                { key: "Product B", label: "Product B" },
                { key: "Product C", label: "Product C" },
                { key: "Product D", label: "Product D" },
            ],
            value: "",
        },
        callDisposition: {
            label: "Call Disposition",
            options: [
                { key: "Follow-Up required", label: "Follow-Up required" },
            ],
            value: "",
        },
        callType: {
            label: "Call Type",
            options: [
                { key: "Product Demo", label: "Product Demo" },
            ],
            value: "",
        },
        callDuration: {
            label: "Call Duration",
            value: "",
            type: "SLIDER",
            min: {
                value: 30,
                label: "30 min"
            },
            max: {
                value: 60,
                label: "1 hr"
            }
        },
        callScore: {
            label: "Call Score",
            value: "",
            type: "SLIDER",
            min: {
                value: 80,
                label: "80"
            },
            max: {
                value: 100,
                label: "100"
            }
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
        onTimeReview: {
            label: "On Time Review",
            options: [
                { key: "No", label: "No" },
            ],
            value: "",
        },
        delayTime: {
            label: "Delay Time",
            options: [
                { key: "2 Days", label: "2 Days" },
            ],
            value: "",
        },
        timeToCompleteReview: {
            label: "Time to Complete Review",
            options: [
                { key: "5 days", label: "5 days" },
            ],
            value: "",
        },
    });

    const [totalItem, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currPage, setCurrPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(10);

    const ref: any = useRef();
    const [accessToken, setAccessToken] = useState<any>("");

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

    const handleColsToManage = (column: any, checked: boolean) => {
        setColumns((currCol: any) => {
            return currCol?.map((col: any, index: number) => {
                if (col?.key === column?.key) {
                    return {
                        ...col,
                        checked: checked
                    }
                } else {
                    return col;
                }
            });
        });
    };

    const updateColsToView = () => {
        setShowManageCol(!showManageCol);
    };

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

    function diff_minutes(start: any, end: any) {
        var firstDate = new Date(start),
            secondDate = new Date(end),
            firstDateInSeconds = firstDate.getTime() / 1000,
            secondDateInSeconds = secondDate.getTime() / 1000,
            difference = Math.abs(firstDateInSeconds - secondDateInSeconds);
        if (difference < 60) {
            return difference + ' sec';
        } else if (difference < 3600) {
            return Math.floor(difference / 60) + ' min';
        } else {
            return Math.floor(difference / 3600) + ' hr';
        }
    }

    const getData = (page = currPage) => {
        try {
            if (window !== undefined) {
                const userId = localStorage.getItem("user-id");
                axios.get(`https://sales365.trainright.fit/api/qa/callForReview?qaStatus=closed&qaId=${userId}&page=${page}&limit=${limit}`, { headers: { Authorization: accessToken } })
                    .then((res: any) => {
                        const data = res?.data?.result;
                        setTotalItems(res?.data?.totalRecords);
                        const pages = Math.ceil(res?.data?.totalRecords / limit);
                        setTotalPages(pages);
                        setRows(data?.map((item: any, index: number) => {
                            let row = [
                                { text: item?.callId || "-", link: `/calls/recorded-calls/${item?._id}/audio-call` },
                                { text: item?.callTitle || "-", link: `/calls/recorded-calls/${item?._id}/audio-call` },
                                { text: item?.leadId?.[0]?.leadId || "-", link: `/sales/open/${item?.leadId?.[0]?._id}/lead-profile` },
                                { text: item?.leadId?.[0]?.lead_title || "-", link: `/sales/open/${item?.leadId?.[0]?._id}/lead-profile` },
                                { text: item?.callId || "-" },  // participants
                                { text: item?.owner?.name || "-" },  // call owner
                                { text: item?.teamManager || "-" },  // team manager
                                { text: item?.callId || "-" },  // client poc
                                { text: item?.company?.[0]?.company_name || "-", link: `/sales/open/${item?.leadId?.[0]?._id}/company-profile` },
                                { text: formatDateToCustomFormat(item?.StartTime) || "-" },  // call date & time
                                { text: item?.company?.[0]?.company_product_category || "-" },  // product/service
                                { text: diff_minutes(item?.StartTime, item?.EndTime) || "-" },  // call duration
                                { text: item?.callDisposiiton || "-" },  // call disposition
                                { text: item?.callType || "-" },  // call type
                                { text: item?.score || "-" },  // call score
                                { text: item?.qaId?.name || "-" },  // call review type
                                { text: item?.callId || "-" },  // call review status
                                { text: item?.callId || "-" },  // close date
                                { text: formatDateToCustomFormat(item?.qaAllocatedAt) || "-" },  // allocated on
                                { text: item?.callId || "-" },  // review due date
                                { text: formatDateToCustomFormat(item?.updatedAt) || "-" },  // last updated on
                            ];
                            return row;
                        }));
                    })
                    .catch((err: any) => {
                    });
            }
        } catch (error) {

        }
    };

    useEffect(() => {
        getData();
    }, [accessToken]);

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

    const handlePageChange = (payload: any) => {
        if (currPage !== payload?.selected) {
            setCurrPage(payload?.selected || 0);
            getData(payload?.selected);
        }
    };

    const handleItemsPerPageChange = (val: any) => {
        setLimit(val);
    };

    return (
        <>
            <Navbar mainTitle={"Open Reviews"} title={"Allocated Calls"} src="ActiveCalls" />
            <div className="w-[100%] min-h-[90vh] pl-[40px] pr-[40px] mt-[20px]">
                <div className="flex items-center justify-between">
                    <div className="w-[60%] bg-white h-[40px] relative border-[#ccc] border-[1px] rounded-[12px] p-2  flex items-center">
                        <input type="text" className="w-[100%] text-black bg-white" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
                        <img src={getBasicIcon("Search")} alt="Search" />
                    </div>
                    <div className="flex items-center gap-[20px]">
                        <button className="text-bg-red ml-[220px]" onClick={() => setShowManageCol(!showManageCol)}>Manage Columns</button>
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
                <Filters filters={filters} />
                <Table rows={rows} columns={columns} />
                <Pagination itemsPerPage={limit} totalItems={totalItem} totalPages={totalPages} currPage={currPage} updatePage={handlePageChange} updateItemsPerPage={handleItemsPerPageChange} />
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
                            {
                                columns?.map((column: any, index: number) => (
                                    <div key={index}>
                                        <label htmlFor={column?.key} className="text-black flex items-center gap-[16px]">
                                            <input type="checkbox" id={column?.key} name="manager_columns" onChange={(e) => handleColsToManage(column, e.target.checked)} checked={column?.checked} />
                                            <span className="">{column?.text}</span>
                                        </label>
                                    </div>
                                ))
                            }
                            <div className="w-[100%] flex justify-end pt-[30px]">
                                <button onClick={updateColsToView} className="bg-bg-red hover:bg-[#ff7d6d] rounded-2xl flex items-center justify-center cursor-pointer py-[10px] px-[30px] self-end">
                                    <span className="text-[#fff] font-medium text-[15px] tracking-wide">Save</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </Backdrop>
            )}
        </>
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

export default AllocatedCallsCC;
