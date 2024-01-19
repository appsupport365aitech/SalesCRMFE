import Kanban from "@/components/View/Kanban";
import ButtonDropDown from "@/utils/Button/Button";
import React, { Suspense, useEffect, useRef, useState } from "react";
import Search from "../Search/Search";
import Spinner from "@/components/loader/spinner";
import DatePicker from "@/utils/Button/DatePicker";
import axios from "axios";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import NavigationWithoutTitle from "@/components/app/NavigationWithoutTitle";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const CallsTable = React.lazy(
  () => import("@/components/View/Tables/calls/active-calls/Calls")
);

const ScheduleCallsContainer = ({ dummy1, data }: any) => {
  const [search, setSearch] = useState("");
  const onChange = (e: any) => {
    const val = e.target.value;
    setSearch(val);
  };
  const ref: any = useRef();
  const [callTypeOps, setCallTypeOps] = useState([
    {
      title: "Choose Type",
      val: "Choose Type",
    },
    {
      title: "Discovery",
      val: "Discovery",
    },
    {
      title: "Product Demo",
      val: "Product Demo",
    },
    {
      title: "Solution Design",
      val: "Solution Design",
    },
    {
      title: "Consultation",
      val: "Consultation",
    },
    {
      title: "Pricing Discussion",
      val: "Pricing Discussion",
    },
    {
      title: "Negotiation",
      val: "Negotiation",
    },
    {
      title: "Follow-Up",
      val: "Follow-Up",
    },
  ]);
  const [ownerOps, setOwnerOps] = useState([]);
  const [companyOps, setCompanyOps] = useState([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [product, setProduct] = useState("");
  const [callOwner, setCallOwner] = useState("");
  const [callType, setCallType] = useState("");
  const [queryStr, setQueryStr] = useState("");
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    if (window !== undefined) {
      setAccessToken(localStorage.getItem("access-token") || "");
    }
  }, []);

  useEffect(() => {
    try {
      if (window !== undefined) {
        axios
          .get("https://sales365.trainright.fit/api/master-users/find-all", {
            headers: {
              Authorization: accessToken,
            },
          })
          .then((res) => {
            setOwnerOps(res?.data?.result);
          })
          .catch((e) => {});
      }
    } catch (error) {}
  }, [accessToken]);

  const getQueryStr = () => {
    let queryStr = "";
    if (search !== "") {
      queryStr += `&search=${search}`;
    }
    if (companyName !== "") {
      queryStr += `&company_name=${companyName}`;
    }
    if (product !== "") {
      queryStr += `&product_service=${product}`;
    }
    if (callOwner !== "") {
      queryStr += `&call_owner=${callOwner}`;
    }
    if (callType !== "") {
      queryStr += `&call_type=${callType}`;
    }
    if (startDate !== "") {
      queryStr += `&startDate=${startDate}`;
    }
    if (endDate !== "") {
      queryStr += `&endDate=${endDate}`;
    }
    setQueryStr(queryStr);
    return queryStr;
  };

  const getData = async () => {
    try {
      const payload = {
        companyName,
        product,
        callOwner,
        callType,
        search,
        date: {
          from: startDate,
          to: endDate,
        },
      };

      const response = await axios.post(
        "https://sales365.trainright.fit/api/leads/find-all?leadStatus=Close",
        payload,
        { headers: { Authorization: accessToken } }
      );
      dummy1 = { ...response.data };
    } catch (error) {}
  };

  const exportXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(data.result);
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
  // useEffect(() => {
  //   getData();
  // }, [product, companyName, callOwner, callType, startDate, endDate, search]);
  useEffect(() => {
    // getData();
    getQueryStr();
  }, [product, companyName, callOwner, callType, startDate, endDate, search]);

  return (
    <div className="pr-[10px] w-[100%] min-h-[70vh] bg-[#ffe3e170] rounded-[18px] overflow-hidden mb-[40px]">
      <div className="w-[100%] flex items-center px-[8px] my-4">
        <div className="w-[100%] flex flex-col gap-4">
          <div className="flex justify-between  gap-6">
            <Search change={onChange} />
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
                        <CSVLink data={data.result} className="" ref={ref}>
                          CSV
                        </CSVLink>
                      ),
                    },
                  ],
                },
              ]}
            />
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <div className="flex items-center w-56 justify-between bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <h2 className="font-medium">Company Name</h2>
              <select
                onChange={(e) => setCompanyName(e.target.value)}
                className="text-red-500"
                id="company"
              >
                <option selected={companyName === ""} value=""></option>
                {companyOps?.map((opItem: any, idx: number) => (
                  <option
                    selected={callType === opItem?._id}
                    value={opItem?._id}
                    key={opItem?._id}
                  >
                    {opItem?.company_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2 w-56 justify-between bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <h2 className="font-medium">Product/Service</h2>
              <select
                onChange={(e) => setProduct(e.target.value)}
                className="text-red-500"
                id="product"
              >
                <option selected={product === ""} value=""></option>
                <option selected={product === "P1"} value="P1">
                  P1
                </option>
                <option selected={product === "P2"} value="P2">
                  P2
                </option>
                <option selected={product === "P3"} value="P3">
                  P3
                </option>
                <option selected={product === "Product A"} value="Product A">
                  Product A
                </option>
                <option selected={product === "Product B"} value="Product B">
                  Product B
                </option>
                <option selected={product === "Product C"} value="Product C">
                  Product C
                </option>
                <option selected={product === "Product D"} value="Product D">
                  Product D
                </option>
                <option selected={product === "Technology"} value="Technology">
                  Technology
                </option>
                <option selected={product === "Healthcare"} value="Healthcare">
                  Healthcare
                </option>
                <option selected={product === "Finance"} value="Finance">
                  Finance
                </option>
                <option selected={product === "Education"} value="Education">
                  Education
                </option>
                <option
                  selected={product === "Hospitality"}
                  value="Hospitality"
                >
                  Hospitality
                </option>
                <option
                  selected={product === "Real Estate"}
                  value=" Real Estate"
                >
                  {" "}
                  Real Estate
                </option>
              </select>
            </div>
            <div className="flex items-center gap-2 w-42 justify-between bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <h2 className="font-medium">Call Owner</h2>
              <select
                onChange={(e) => setCallOwner(e.target.value)}
                className="text-red-500"
                id="callOwner"
              >
                <option selected={callOwner === ""} value=""></option>
                {ownerOps?.map((opItem: any, idx: number) => (
                  <option
                    selected={callType === opItem?._id}
                    value={opItem?._id}
                    key={opItem?._id}
                  >
                    {opItem?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center w-56 justify-between bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <h2 className="font-medium">Call Type</h2>
              <select
                onChange={(e) => setCallType(e.target.value)}
                className="text-red-500"
                id="callType"
              >
                <option selected={callType === ""} value=""></option>
                {callTypeOps?.map((opItem: any, idx: number) => (
                  <option
                    selected={callType === opItem?.val}
                    value={opItem?.val}
                    key={idx}
                  >
                    {opItem?.title}
                  </option>
                ))}
              </select>
            </div>
            <DatePicker
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
          </div>
        </div>
        {/* <ButtonDropDown
          light={true}
          text={"Actions"}
          border={true}
          id={1}
          dropdown={true}
          list={[]}
        /> */}
      </div>
      <Suspense fallback={<Spinner />}>
        <CallsTable
          totalRecords={dummy1.totalRecords}
          search={search}
          queryStr={queryStr}
        />
      </Suspense>
    </div>
  );
};

export default ScheduleCallsContainer;
