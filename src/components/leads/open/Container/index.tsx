// import LeadsTable from "@/components/View/Tables/LeadsSearch";
import ButtonDropDown from "@/utils/Button/Button";
import React, { useState, Suspense, useEffect } from "react";
import Search from "../../genUtils/Search";
// import KanbanContainer from "@/components/View/Kanban";
import { useSelector } from "react-redux";
import Spinner from "@/components/loader/spinner";
import KanbanTable from "@/components/View/Tables/open/Kanban";
import DatePicker from "@/utils/Button/DatePicker";
import axios from "axios";
import { useRouter } from "next/router";
import { PaymentOutlined } from "@mui/icons-material";
import { baseUrl } from "@/utils/baseUrl";
import Navigation from "@/components/app/Navigation";
import { CSVLink } from "react-csv";

const LeadsTable = React.lazy(
  () => import("@/components/View/Tables/open/LeadsSearch")
);
const KanbanContainer = React.lazy(() => import("@/components/View/Kanban"));
// const About = lazy(() => import("./pages/About"));

const LeadsContainer = ({
  view,
  records,
  viewButtinClick,
  addexport,
  data,
  ref,
  reload,
}: any) => {
  const [visibleRecords, setVisibleRecords] = useState(records);
  const router = useRouter();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(
    window.location.pathname.split("/").pop() === "open" ? "open" : "close"
  );
  const [stage, setStage] = useState("");
  const [product, setProduct] = useState("");
  const [leadSource, setLeadSource] = useState("");
  const [queryStr, setQueryStr] = useState("");
  const onChange = (e: any) => {
    const val = e.target.value;
    setSearch(val);
  };
  const state = useSelector((state: any) => state.auth);
  const [accessToken, setAccessToken] = useState<any>("");

  useEffect(() => {
    if (window !== undefined) {
      setAccessToken(localStorage.getItem("access-token"));
    }
  }, []);

  const getQueryStr = () => {
    let queryStr = "";
    // if (search !== "") {
    //   queryStr += `&search=${search}`;
    // }
    if (stage !== "") {
      queryStr += `&leadStage=${stage}`;
    }
    if (product !== "") {
      queryStr += `&productCategory=${product}`;
    }
    if (leadSource !== "") {
      queryStr += `&leadSource=${leadSource}`;
    }
    if (startDate !== "" || endDate !== "") {
      queryStr += `&date_range=${JSON.stringify([startDate, endDate])}`;
    }
    setQueryStr(queryStr);
    return queryStr;
  };

  const getData = async () => {
    const payload = {
      status,
      stage,
      product,
      leadSource,
      search,
      date: {
        from: startDate,
        to: endDate,
      },
    };
    try {
      const response = await axios.get(
        `${baseUrl}api/leads/find-all?leadStatus=Open${getQueryStr()}`,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      setVisibleRecords({ ...response.data });
    } catch (error) {}
  };

  useEffect(() => {
    // getData();
    getQueryStr();
  }, [status, stage, product, leadSource, startDate, endDate]);

  return (
    <div className="mt-10 w-[100%] bg-[#ffe3e170] min-h-[70vh] rounded-[18px] relative mb-[40px]">
      <div className="w-[100%] flex items-center px-[8px] ">
        <div className="w-[100%] flex flex-col my-4">
          <div className="flex gap-5 items-center">
            <Search change={onChange} view={view} />
            <Navigation
              title={""}
              buttons={[
                {
                  text: "View",
                  dropdown: true,
                  id: 0,
                  click: viewButtinClick,
                  light: false,
                  dark: true,
                  list: [
                    {
                      title: "Table View",
                      Icon: "TableView",
                    },
                    {
                      title: "Kanban View",
                      Icon: "KanbanView",
                    },
                  ],
                  value: 0,
                },

                {
                  text: "",
                  dropdown: true,
                  id: 1,
                  icon: "Download",
                  light: true,
                  dark: false,
                  click: addexport,
                  list: [
                    { title: "Excel", Icon: "Excel" },
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

          <div className="flex items-center gap-5 flex-wrap">
            <div className="flex items-center  gap-2 w-fit justify-between bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <h2 className="font-medium">Status</h2>
              <select
                onChange={(e) => {
                  setStatus(e.target.value);
                  router.push(
                    `/sales/${e.target.value === "open" ? "open" : "closed"}`
                  );
                }}
                className="text-red-500 px-2"
                id="countries"
              >
                <option selected value="open" className="">
                  Open
                </option>
                <option value="close">Close</option>
              </select>
            </div>
            <div
              className={`flex gap-2 w-fit items-center justify-between bg-white  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                stage !== ""
                  ? "border border-red-500"
                  : "border border-gray-300"
              }`}
            >
              <h2 className="font-medium">Stage</h2>
              <select
                onChange={(e) => setStage(e.target.value)}
                className="text-red-500 px-2"
                id="countries"
              >
                <option selected={stage === ""} value=""></option>
                <option selected={stage === "Enquiry"} value="Enquiry">
                  Enquiry
                </option>
                <option selected={stage === "Interaction"} value="Interaction">
                  Interaction
                </option>
                <option selected={stage === "Proposal"} value="Proposal">
                  Proposal
                </option>
              </select>
            </div>
            <div
              className={`flex gap-2 w-fit items-center justify-between bg-white  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                product !== ""
                  ? "border border-red-500"
                  : "border border-gray-300"
              }`}
            >
              <h2 className="font-medium">Product/Service</h2>
              <select
                onChange={(e) => setProduct(e.target.value)}
                className="text-red-500 px-2"
                id="countries"
              >
                <option selected={product === ""} value=""></option>
                <option
                  selected={product === "Email automation"}
                  value="Email automation"
                >
                  Email automation
                </option>
                <option
                  selected={product === "social media automation"}
                  value="social media automation"
                >
                  social media automation
                </option>
                {/* <option selected={product === "P1"} value="P1">
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
                </option> */}
              </select>
            </div>
            <div
              className={`flex gap-2 w-fit items-center justify-between bg-white  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                leadSource !== ""
                  ? "border border-red-500"
                  : "border border-gray-300"
              }`}
            >
              <h2 className="font-medium">Lead Source</h2>
              <select
                onChange={(e) => setLeadSource(e.target.value)}
                className="text-red-500 px-2"
                id="countries"
              >
                <option selected={leadSource === ""} value=""></option>
                <option selected={leadSource === "Website"} value="Website">
                  Website
                </option>
                <option selected={leadSource === "Referrals"} value="Referrals">
                  Referrals
                </option>
                <option
                  selected={leadSource === "Social Media"}
                  value="Social Media"
                >
                  Social Media
                </option>
                <option
                  selected={leadSource === "Email Marketing"}
                  value="Email Marketing"
                >
                  Email Marketing
                </option>
                <option
                  selected={leadSource === "Paid Advertising"}
                  value="Paid Advertising"
                >
                  Paid Advertising
                </option>
                <option selected={leadSource === "Events"} value="Events">
                  Events
                </option>
                <option
                  selected={leadSource === "Offline Channels"}
                  value="Offline Channels"
                >
                  Offline Channels
                </option>
                <option
                  selected={leadSource === "Content Marketing"}
                  value="Content Marketing"
                >
                  Content Marketing
                </option>
                <option
                  selected={leadSource === "Partnerships"}
                  value="Partnerships"
                >
                  Partnerships
                </option>
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
          list={[
            { title: "Assign Lead", Icon: "Printer" },
            { title: "change SR", Icon: "Excel" },
            { title: "Edit lead", Icon: "PDF" },
            { title: "Delete Lead", Icon: "CSV" },
            { title: "Active/InActive Lead", Icon: "CSV" },
          ]}
        /> */}
        {/* {view && (
          <ButtonDropDown
            light={false}
            text={"Add Stage"}
            icon={"Plus"}
            border={true}
            id={1}
            dropdown={true}
            list={[
              { title: "Assign Lead", Icon: "Printer" },
              { title: "change SR", Icon: "Excel" },
              { title: "Edit lead", Icon: "PDF" },
              { title: "Delete Lead", Icon: "CSV" },
              { title: "Active/InActive Lead", Icon: "CSV" },
            ]}
          />
        )} */}
      </div>
      {!view ? (
        <Suspense fallback={<Spinner />}>
          <LeadsTable
            totalRecords={visibleRecords}
            search={search}
            queryStr={queryStr}
            reload={reload}
          />
        </Suspense>
      ) : (
        <Suspense fallback={<Spinner />}>
          {/* <KanbanContainer list={list} /> */}
          <KanbanTable
            totalRecords={visibleRecords}
            search={search}
            queryStr={queryStr}
            reload={reload}
          />
        </Suspense>
      )}
    </div>
  );
};

export default LeadsContainer;
