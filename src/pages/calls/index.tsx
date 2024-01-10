import React, { useEffect, useRef, useState } from 'react'
import Navbar from "@/components/app/Navbar/Navbar";
import Navigator from "@/utils/customNavigator";
import Filters from '@/views/teams/Filters';
import Table from '@/views/teams/Table';
import Pagination from '@/views/teams/Pagination';
import * as XLSX from "xlsx";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import NavigationWithoutTitle from "@/components/app/NavigationWithoutTitle";
import { CSVLink } from "react-csv";
import axios from 'axios';
import { getBasicIcon } from '@/utils/AssetsHelper';
import DropDown2 from '@/utils/Button/DropDown2';
import { useAppDispatch } from '@/store/store';
import { setError, setSuccess } from '@/store/ai';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const CallsPage = () => {
    const columnsACR = [
        {
            width: 200,
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
        {
            width: 120,
            left: 20,
            text: "Allocation Type",
            checked: true,
        },
        {
            width: 200,
            left: 40,
            text: "Allocated On",
            checked: true,
        },
        {
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
            width: 120,
            left: 20,
            text: "Call Review Status",
            checked: true,
        },
    ];

    const columnsFRCR = [
        {
            width: 200,
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
        {
            width: 120,
            left: 20,
            text: "Feedback Requested On",
            checked: true,
        },
        {
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

    const [rowsACR, setRowsACR] = useState([]);
    const [rowsFRCR, setRowsFRCR] = useState([]);
    const [qaList, setQaList] = useState([]);
    const [searchAssignTo, setSearchAssignTo] = useState('');
    const [selectedRows, setSelectedRows] = useState<any>([]);

    const [currTab, setCurrTab] = useState(0);
    const [subType, setSubType] = useState("allocated_call_reviews");
    const [search, setSearch] = useState("");
    const [tabs, setTabs] = useState([
        { id: 0, title: "Calls For Review" },
        { id: 1, title: "Active Calls" },
        { id: 2, title: "Closed Calls" },
    ]);
    const [accessToken, setAccessToken] = useState<any>("");

    useEffect(() => {
        if (window !== undefined) {
            setAccessToken(localStorage.getItem("access-token"));
        }
    }, []);

    const [data, setData] = useState<any>([{}, {}]);
    useEffect(() => {
        axios.get(
            "https://sales365.trainright.fit/api/active-call/find-all", {
            headers: { Authorization: accessToken }
        }
        ).then((res: any) => {
            setData(res?.data);
        });
    }, [accessToken]);

    const [filters, setFilters] = useState({
        callStartAndEndDate: {
            label: "Call Start and End Date",
            type: "DATERANGE",
            value: ["", ""],
        },
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
        callType: {
            label: "Call Type",
            options: [
                { key: "Product Demo", label: "Product Demo" },
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
    });

    const generateRows = (data: any) => {
        if (subType === "allocated_call_reviews") {
            setRowsACR(data?.map((item: any, index: number) => {
                let row = [
                    { text: item?.callId || "-", id: item?._id },
                    { text: item?.callTitle || "-", id: item?._id },
                    { text: item?.leadId?.[0]?.leadId || "-", id: item?._id },
                    { text: item?.leadId?.[0]?.lead_title || "-", id: item?._id },
                    { text: item?.company?.[0]?.company_name || "-", id: item?._id },
                    { text: item?.owner?.[0]?.name || "-", id: item?._id },  // call owner
                    { text: item?.teamManager?.name || "-", id: item?._id },  // team manager
                    { text: item?.callId || "-", id: item?._id },  // client poc
                    { text: item?.StartTime || "-", id: item?._id },  // call date & time
                    { text: item?.company?.[0]?.company_product_category || "-", id: item?._id },  // product/service
                    { text: item?.callDisposiiton || "-", id: item?._id },  // call disposition
                    { text: item?.callType || "-", id: item?._id },  // call type
                    { text: item?.callId || "-", id: item?._id },  // call review type
                    { text: item?.score || "-", id: item?._id },  // call score
                    { text: item?.callId || "-", id: item?._id },  // allocation type
                    { text: item?.qaAllocatedAt || "-", id: item?._id },  // allocated on
                    { text: item?.qaId?.name || "-", id: item?._id },  // allocated to
                    { text: item?.callId || "-", id: item?._id },  // review due date
                    { text: item?.callId || "-", id: item?._id },  // call review status
                ];
                return row;
            }));
        } else {
            setRowsFRCR(data?.map((item: any, index: number) => {
                let row = [
                    { text: item?.callId || "-" },
                    { text: item?.callTitle || "-" },
                    { text: item?.leadId?.[0]?.leadId || "-" },
                    { text: item?.leadId?.[0]?.lead_title || "-" },
                    { text: item?.owner?.name || "-" },  // call owner
                    { text: item?.teamManager || "-" },  // team manager
                    { text: item?.callId || "-" },  // client poc
                    { text: item?.company?.[0]?.company_name || "-" },
                    { text: item?.StartTime || "-" },  // call date & time
                    { text: item?.company?.[0]?.company_product_category || "-" },  // product/service
                    { text: item?.callId || "-" },  // call review type
                    { text: item?.callDisposiiton || "-" },  // call disposition
                    { text: item?.callType || "-" },  // call type
                    { text: item?.score || "-" },  // call score
                    { text: item?.qaId?.name || "-" },  // feedback requestd by
                    { text: item?.callId || "-" },  // on time review
                    { text: item?.callId || "-" },  // delay time
                    { text: item?.callId || "-" },  // time to complete review
                    { text: item?.callId || "-" },  // call review status
                ];
                return row;
            }));
        }
    };

    const getData = () => {
        let endpoint = '';
        if (subType === "feedback_requested_call_reviews") {
            endpoint = `https://sales365.trainright.fit/api/qa/findRequestFeedBack`;
        } else {
            switch (currTab) {
                case 0:
                    endpoint = `https://sales365.trainright.fit/api/qam/callForReview?qaStatus=active`;
                    break;
                case 1:
                    endpoint = `https://sales365.trainright.fit/api/qam/callForReview?qaStatus=allocated`;
                    break;
                case 2:
                    endpoint = `https://sales365.trainright.fit/api/qam/callForReview?qaStatus=closed`;
                    break;
                default:
                    endpoint = `https://sales365.trainright.fit/api/qam/callForReview?qaStatus=active`;
                    break;
            }
        }
        axios.get(endpoint, { headers: { Authorization: accessToken } })
            .then((res: any) => {
                const data = res?.data?.result;
                generateRows(data);
            })
            .catch((err: any) => {
            });
    };

    useEffect(() => {
        getData();
    }, [currTab, subType]);

    useEffect(() => {
        axios.get(`https://sales365.trainright.fit/api/master-users/findAllQA_Analyst`, { headers: { Authorization: accessToken } })
            .then((res: any) => {
                setQaList(res?.data?.result);
            })
            .catch((err: any) => {

            });
    }, []);

    const handleTabNavigation = (payload: any) => {
        setCurrTab(payload);
        setSubType("allocated_call_reviews");
    };

    const handleSubType = (payload: string) => {
        setSubType(payload);
    };

    const getQuery = () => {
        let query = '';
        if (search) {
            query += `search=${search}`;
        }
        Object.keys(filters).forEach((filterKey: any, index: number) => {
            if (filters?.[filterKey as keyof typeof filters]?.value !== "") {
                query += (query !== "" ? "&" : "") + `${filterKey}=${filters?.[filterKey as keyof typeof filters]?.value}`;
            }
        });
        return query;
    };

    const ref: any = useRef();
    const dispatch = useAppDispatch();

    const exportXLSX = () => {
        const worksheet = XLSX.utils.json_to_sheet(data?.result);
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
                    text: JSON.stringify(data.result, null, 4),
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
                setSelectedRows(selectedRows.filter((rowItem: any) => rowItem !== row?.[0]?.id));
            }
        } else {
            if (checked) {
                if (subType === "allocated_call_reviews") {
                    setSelectedRows(rowsACR?.map((rowItem: any) => {
                        return rowItem?.[0]?.id;
                    }));
                } else {
                    setSelectedRows(rowsFRCR?.map((rowItem: any) => {
                        return rowItem?.[0]?.id;
                    }));
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
        if (selectedRows.length === 0) {
            dispatch(setError({
                show: true,
                error: "No Selection.",
            }));
        } else if (checked) {
            dispatch(setSuccess({
                show: true,
                success: "Assigning...",
            }));
            const assigningPromise = selectedRows.map((selectedRow: any) => {
                const payload = {
                    qaId: qaId,
                    qamId: window !== undefined ? localStorage.getItem('user-id') : "",
                    callId: selectedRow
                };
                return axios.post(`https://sales365.trainright.fit/api/qam/allocateCallToQA`, payload, {headers: {Authorization: accessToken}});
            });
            Promise.all(assigningPromise)
                .then((res: any) => {
                    dispatch(setSuccess({
                        show: true,
                        success: "Successfully Assigned!",
                    }));
                })
                .catch((err: any) => {
                    dispatch(setError({
                        show: true,
                        error: "Error Occured!",
                    }));
                });
        }
    };

    const renderAssignToDD = () => {
        return (
            <div>
                <div className='flex items-center p-[6px] border-solid border-1 border-black rounded'>
                    <input type="text" className='bg-white outline-none text-black' placeholder='Search...' value={searchAssignTo} onInput={(e: any) => handleSearchAssignTo(e.target.value)} />
                    <button className='flex items-center justify-center w-[20px] h-[20px]'>
                        <img src={getBasicIcon("Search")} alt='Search' width={"20px"} height={"20px"} />
                    </button>
                </div>
                <ul className=''>
                    {
                        searchAssignTo ? (
                            qaList?.filter((qaItem: any, index: number) => {
                                return qaItem?.name?.toLowerCase().includes(searchAssignTo.toLowerCase());
                            }).map((qaItem: any, index: number) => (
                                <li key={index}>
                                    <label htmlFor={qaItem?._id} className='w-[100%] flex items-center justify-between text-black p-[4px] cursor-pointer'>
                                        <span>{qaItem?.name}</span>
                                        <input type="checkbox" id={qaItem?._id} onChange={(e) => handleAssignTo(e.target.checked, qaItem?._id)} />
                                    </label>
                                </li>
                            ))
                        ) : (
                            qaList?.map((qaItem: any, index: number) => (
                                <li key={index}>
                                    <label htmlFor={qaItem?._id} className='w-[100%] flex items-center justify-between text-black p-[4px] cursor-pointer'>
                                        <span>{qaItem?.name}</span>
                                        <input type="checkbox" id={qaItem?._id} onChange={(e) => handleAssignTo(e.target.checked, qaItem?._id)} />
                                    </label>
                                </li>
                            ))
                        )
                    }
                </ul>
            </div>
        );
    };

    const renderControls = () => {
        return (
            <div className='flex items-center gap-[20px]'>
                {
                    currTab === 0
                        ? (
                            <>
                                <DropDown2 text="Assign To" id={0} dropdown={true}>
                                    {renderAssignToDD()}
                                </DropDown2>
                                {/* <button className='text-black'>Auto Allocate</button> */}
                            </>
                        )
                        : currTab === 1
                            ? (
                                <DropDown2 text="Re-Assign To" id={0} dropdown={true}>
                                    {renderAssignToDD()}
                                </DropDown2>
                            )
                            : null
                }
            </div>
        );
    };

    const renderFilters = () => {
        return (
            <div className='w-[100%] py-[20px]'>
                <div className='flex items-center justify-between'>
                    <div className='w-[100%] flex items-center gap-[20px]'>
                        <div className="w-[60%] bg-white h-[40px] relative border-[#ccc] border-[1px] rounded-[12px] p-2  flex items-center">
                            <input type="text" className="w-[100%] text-black bg-white" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
                            <img src={getBasicIcon("Search")} alt="Search" />
                        </div>
                        {renderControls()}
                    </div>
                    <div className='flex items-center gap-[20px]'>
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
                                                <CSVLink data={data?.result} className="" ref={ref}>
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
                <div className=''>
                    <Filters filters={filters} />
                </div>
            </div>
        )
    };

    const renderACR = () => {
        return <Table rows={rowsACR} columns={columnsACR} handleSelection={handleSelection} selectedRows={selectedRows} />;
    };

    const renderFRCR = () => {
        return <Table rows={rowsFRCR} columns={columnsFRCR} handleSelection={handleSelection} selectedRows={selectedRows} />;
    };

    const renderToggleSwitch = () => {
        return (
            <div className='flex text-black items-center gap-[20px]'>
                <button onClick={() => handleSubType("allocated_call_reviews")}>Allocated Call Reviews</button>
                <button onClick={() => handleSubType("feedback_requested_call_reviews")}>Feedback Requested Call Reviews</button>
            </div>
        );
    };

    return (
        <>
            <Navbar mainTitle={`Calls > ${tabs?.[currTab]?.title}`} title={subType === "allocated_call_reviews" ? "Allocated Call Reviews" : "Feedback Requested Call Reviews"} src="Phone" />
            <Navigator
                callback={handleTabNavigation}
                current={currTab}
                list={tabs}
                width={true}
            />
            {renderToggleSwitch()}
            {renderFilters()}
            {subType === "allocated_call_reviews" ? (
                renderACR()
            ) : (
                renderFRCR()
            )}
            <Pagination />
        </>
    )
}

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

export default CallsPage