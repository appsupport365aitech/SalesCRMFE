import CallAnalysis from "@/components/analysis/Call";
import Navigation from "@/components/app/Navigation";
import { getBasicIcon } from "@/utils/AssetsHelper";
import Navigator from "@/utils/customNavigator";
import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import SalesPerformance from "./subTabs/SalesPerformance";
import CommunicationInteraction from "./subTabs/CommunicationInteraction";
import EngagementReports from "./subTabs/EngagementReports";
import CallReviews from "./subTabs/CallReviews";
import DashboardQAM from "./subTabs/DashboardQAM";
import Scoring from "./subTabs/Scoring";
import { useSelector } from "react-redux";
import CallReviewsQAE from "./subTabs/CallReviewsQAE";
import { baseUrl } from "@/utils/baseUrl";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

// const Dashboard = ({ data }: any) => {
const Dashboard = ({ data }: any) => {
  const auth = useSelector((state: any) => state.auth);
  const [accessToken, setAccessToken] = useState<any>("");
  const [scriptbuilderData, setScriptBuilderData] = useState([]);
  const [sellingData, setSellingData] = useState([]);
  const [pitchData, setPitchData] = useState([]);
  const [startDate, setStartDate] = useState("2023-07-19");
  const [endDate, setEndDate] = useState("2023-07-26");

  const [tabs, setTabs] = useState<any>([]);
  const [currTab, setCurrTab] = useState(0);
  const [role, setRole] = useState<any>("SDR");
  const [userId, setUserId] = useState(
    window !== undefined
      ? localStorage.getItem("user-id") || auth?._id
      : "6456622b0c64d0311911136c"
  );
  const [daysSpan, setDaysSpan] = useState(7);

  const [dealAnalyticsData, setDealAnalyticsData] = useState({});
  const [avgCallScoresData, setAvgCallScoresData] = useState({});
  const [noOfQuesAskedData, setNoOfQuesAsked] = useState({});
  const [talkRatioData, setTalkRatioData] = useState({});
  const [noOfInterruptions, setNoOfInterruptions] = useState({});
  const [noOfSwitches, setNoOfSwitches] = useState({});
  const [callSentimentData, setCallSentimentData] = useState({});

  const getDealAnalyticsData = () => {
    axios
      .get(`${baseUrl}api/dashboard/dealAnalytics?userId=${userId}`, {
        headers: {
          Authorization: `${accessToken}`,
        },
      })
      .then((res: any) => {
        setDealAnalyticsData({
          average: res.data.average,
          result: res.data.result,
        });
      })
      .catch((err: any) => {});
  };

  const getAvgCallScores = () => {
    axios
      .get(`${baseUrl}api/dashboard/averageCallScores?userId=${userId}`, {
        headers: {
          Authorization: `${accessToken}`,
        },
      })
      .then((res: any) => {
        let formattedData: any = {};
        res?.data?.result?.forEach((item: any) => {
          formattedData[item?.label?.replaceAll(" ", "_")] = item?.value;
        });
        setAvgCallScoresData(formattedData);
      })
      .catch((err: any) => {});
  };

  const getNoOfQuesAsked = () => {
    axios
      .get(`${baseUrl}api/dashboard/numberOfQuestionsAsked?userId=${userId}`, {
        headers: {
          Authorization: `${accessToken}`,
        },
      })
      .then((res: any) => {
        let formattedData: any = {};
        res?.data?.result?.forEach((item: any) => {
          formattedData[item?.label?.replaceAll(" ", "_")] = item?.value;
        });
        setNoOfQuesAsked(formattedData);
      })
      .catch((err: any) => {});
  };

  const getTalkRatioData = () => {
    axios
      .get(`${baseUrl}api/dashboard/getTalkRatioData?userId=${userId}`, {
        headers: {
          Authorization: `${accessToken}`,
        },
      })
      .then((res: any) => {
        // let formattedData: any = {};
        // res?.data?.result?.forEach((item: any) => {
        //   formattedData[item?.label?.replaceAll(" ", "_")] = item?.value;
        // });
        setTalkRatioData(res.data.result);
      })
      .catch((err: any) => {});
  };

  const getNoOfInterruptions = () => {
    axios
      .get(`${baseUrl}api/dashboard/countInterruptions`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res: any) => {
        // let formattedData: any = {};
        // res?.data?.result?.forEach((item: any) => {
        //   formattedData[item?.label?.replaceAll(" ", "_")] = item?.value;
        // });
        setNoOfInterruptions(res.data.result);
      })
      .catch((err: any) => {});
  };

  const getNoOfSwitches = () => {
    axios
      .get(`${baseUrl}api/dashboard/numberOfSwiteches`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res: any) => {
        let formattedData: any = {};
        res?.data?.result?.forEach((item: any) => {
          formattedData[item?.day?.replaceAll(" ", "_")] = item?.switches;
        });
        setNoOfSwitches(formattedData);
      })
      .catch((err: any) => {});
  };

  const getCallSentiment = () => {
    axios
      .get(`${baseUrl}api/dashboard/sentimentAnalysis?userId=${userId}`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res: any) => {
        // let formattedData: any = {};
        // res?.data?.result?.forEach((item: any) => {
        //   formattedData[item?.day?.replaceAll(" ", "_")] = item?.switches;
        // });
        setCallSentimentData(res?.data?.result);
      })
      .catch((err: any) => {});
  };

  useEffect(() => {
    if (window !== undefined) {
      setAccessToken(localStorage.getItem("access-token"));
    }
  }, []);

  useEffect(() => {
    if (window !== undefined) {
      getDealAnalyticsData();
      getAvgCallScores();
      getNoOfQuesAsked();
      getTalkRatioData();
      getNoOfInterruptions();
      getNoOfSwitches();
      getCallSentiment();
    }
  }, [accessToken]);

  useEffect(() => {
    setRole(localStorage.getItem("user-role"));
    switch (role) {
      case "QA Analyst":
        setTabs([
          { id: 0, title: "Call Reviews", key: "QA Analyst" },
          { id: 1, title: "Communication & Interaction", key: "QA Analyst" },
        ]);
        break;
      case "QA manager":
        setTabs([
          { id: 0, title: "Dashboard", key: "QA manager" },
          { id: 1, title: "Communication & Interaction", key: "QA manager" },
          { id: 2, title: "Scoring", key: "QA manager" },
          { id: 3, title: "Call Reviews", key: "QA manager" },
        ]);
        break;
      case "Manager":
        setTabs([
          { id: 0, title: "Sales Performance", key: "Manager" },
          { id: 1, title: "Communication & Interaction", key: "Manager" },
          { id: 2, title: "Engagement Reports", key: "Manager" },
        ]);
      case "SDR":
        setTabs([
          { id: 0, title: "Sales Performance", key: "SDR" },
          { id: 1, title: "Communication & Interaction", key: "SDR" },
          { id: 2, title: "Engagement Reports", key: "SDR" },
        ]);
      case "BDM":
      default:
        setTabs([
          { id: 0, title: "Sales Performance", key: "BDM" },
          { id: 1, title: "Communication & Interaction", key: "BDM" },
          { id: 2, title: "Engagement Reports", key: "BDM" },
        ]);
    }
  }, [role]);

  const getPitchData = ({ ...startEndDate }: any) => {
    const finalPayload = {
      date: {
        from: startEndDate[0],
        to: startEndDate[1],
      },
    };
    axios
      .post(`${baseUrl}api/pitch-analysis/find-one`, finalPayload, {
        headers: { Authorization: accessToken },
      })
      .then((res) => {
        setPitchData(res.data.result);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getSellingData = ({ ...startEndDate }: any) => {
    try {
      axios
        .get(`${baseUrl}api/dashboard/indicator/sellingSkills`, {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((e) => {
          setSellingData(e.data.result);
        })
        .catch((e) => {});
    } catch (error) {}
  };

  const getScriptData = ({ ...startEndDate }: any) => {
    const finalPayload = {
      date: {
        from: startEndDate[0],
        to: startEndDate[1],
      },
    };
    axios
      .post(`${baseUrl}api/script-analysis/find-one`, finalPayload, {
        headers: { Authorization: accessToken },
      })
      .then((res) => {
        setScriptBuilderData(res.data.result);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getPitchData([startDate, endDate]);
    getScriptData([startDate, endDate]);
    getSellingData([startDate, endDate]);
  }, []);

  const handleTabNavigation = (payload: any) => {
    setCurrTab(payload);
  };
  const ref: any = useRef();

  const exportXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet([
      data.first.result,
      data.second.result,
      data.third.result,
    ]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "DataSheet.xlsx");
  };

  const exportPDF = () => {
    // var worker = html2pdf().from(element).save();
    const documentDefinition = {
      content: [
        {
          text: "JSON to PDF Conversion",
          style: "header",
        },
        {
          text: JSON.stringify(
            [data.first.result, data.second.result, data.third.result],
            null,
            4
          ),
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

  const handleDaysSpan = (prev: any, next: any) => {
    switch (next) {
      case 0:
        setDaysSpan(7);
        break;
      case 1:
        setDaysSpan(15);
        break;
      case 2:
        setDaysSpan(30);
        break;
    }
  };

  const renderTab0 = () => {
    if (role === "QA Analyst") {
      return (
        <CallReviews
          tabData={tabs[currTab]}
          sellingData={sellingData}
          getSellingData={getSellingData}
          noOfQuesAsked={noOfQuesAskedData}
          callSentimentData={callSentimentData}
        />
      );
    } else if (role === "QA manager") {
      return (
        <DashboardQAM
          tabData={tabs[currTab]}
          sellingData={sellingData}
          getSellingData={getSellingData}
          noOfQuesAsked={noOfQuesAskedData}
          callSentimentData={callSentimentData}
        />
      );
    } else {
      return (
        <SalesPerformance
          tabData={tabs[currTab]}
          sellingData={sellingData}
          getSellingData={getSellingData}
          avgCallScores={avgCallScoresData}
          noOfQuesAsked={noOfQuesAskedData}
          dealAnalytics={dealAnalyticsData}
        />
      );
    }
  };

  const renderTab2 = () => {
    if (role === "QA manager") {
      return <Scoring tabData={tabs[currTab]} />;
    } else {
      return (
        <EngagementReports
          tabData={tabs[currTab]}
          callSentimentData={callSentimentData}
        />
      );
    }
  };

  return (
    <div className="bg-white w-[100%] min-h-[90vh] pl-[20px] pr-[20px] pb-8">
      <div className="flex w-[100%] justify-end gap-[10px]">
        <Navigation
          title=""
          buttons={[
            {
              text: `Last ${daysSpan} days`,
              dropdown: true,
              id: 1,
              dark: true,
              light: false,
              list: [
                { title: "Last 7 days", Icon: "" },
                { title: "Last 15 days", Icon: "" },
                { title: "Last 30 days", Icon: "" },
              ],
              click: handleDaysSpan,
            },
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
                { title: "Print", Icon: "Printer" },
                {
                  title: "CSV",
                  Icon: "CSV",
                  wrapper: (
                    <CSVLink
                      data={[
                        data?.first?.result,
                        data?.second?.result,
                        data?.third?.result,
                      ]}
                      className=""
                      ref={ref}
                    >
                      CSV
                    </CSVLink>
                  ),
                },
              ],
            },
          ]}
        />
      </div>
      <Navigator
        callback={handleTabNavigation}
        current={currTab}
        list={tabs}
        width={true}
      />
      {currTab === 0 && renderTab0()}
      {currTab === 1 && (
        <CommunicationInteraction
          tabData={tabs[currTab]}
          pitchData={pitchData}
          getPitchData={getPitchData}
          talkRatioData={talkRatioData}
          noOfInterruptions={noOfInterruptions}
          noOfSwitches={noOfSwitches}
        />
      )}
      {currTab === 2 && renderTab2()}
      {currTab === 3 && <CallReviewsQAE tabData={tabs[currTab]} />}
    </div>
  );
};

export default Dashboard;
