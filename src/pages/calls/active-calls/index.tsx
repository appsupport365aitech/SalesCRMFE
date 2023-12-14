import Navigation from "@/components/app/Navigation";
import CallsContainer from "@/components/calls/active-calls/Container/ScheduleCallContainer";
import DUMMY from "@/shared/dummy";
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import dummy from "@/shared/dummy";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useRouter } from "next/router";
import Navbar from "@/components/app/Navbar/Navbar";
import ScheduleCallsContainer from "@/components/calls/active-calls/Container/ScheduleCallContainer";
import ScheduleMeetingContainer from "@/components/calls/active-calls/Container/ScheduleMeetingContainer";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const dummyItem = {
  companyName: "ABC Corp",
  companyAddress: "Noida, UP",
  poc: "Shraddha P.",
  pocJob: "Sales Manager",
  names: "Anil L., Paul G., Rekha",
  lastActivity: "Email sent on 23 Jan 2023",
  dealSize: "11000",
  product: "Product A",
  calls: 5,
  docs: 2,
  chats: 5,
  mails: 5,
  meetings: 5,
  tasks: 5,
};

const Dummy = [
  { id: 1, type: "enquiry", data: dummyItem },
  { id: 2, type: "enquiry", data: dummyItem },
  { id: 3, type: "enquiry", data: dummyItem },
  { id: 4, type: "interaction", data: dummyItem },
  { id: 5, type: "interaction", data: dummyItem },
  { id: 6, type: "interaction", data: dummyItem },
  { id: 7, type: "interaction", data: dummyItem },
  { id: 8, type: "proposal", data: dummyItem },
  { id: 9, type: "proposal", data: dummyItem },
  { id: 10, type: "proposal", data: dummyItem },
  { id: 11, type: "win", data: dummyItem },
  { id: 12, type: "win", data: dummyItem },
  { id: 13, type: "win", data: dummyItem },
  { id: 14, type: "Lost", data: dummyItem },
  { id: 15, type: "Dead", data: dummyItem },
  { id: 16, type: "Dead", data: dummyItem },
  { id: 17, type: "Dead", data: dummyItem },
  { id: 18, type: "Dead", data: dummyItem },
];

const Calls = ({ data }: any) => {
  const [scheduleCalls, setScheduleCalls] = useState(true);
  const [scheduleMeeting, setScheduleMeeting] = useState(false);
  const ref: any = useRef();

  console.log(data);

  const router = useRouter();

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

  const exportXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(data.result);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "DataSheet.xlsx");
    console.log("Exporting to Excel", data);
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
    console.log("Exporting to PDF", data);
  };

  const addExport = (e: any, e1: any) => {
    if (e1 === 0) {
      exportXLSX();
    } else if (e1 === 1) {
      exportPDF();
    }
  };

  const gotoScheduleCall = () => {
    setScheduleCalls(true);
    setScheduleMeeting(false);
  };

  const gotoScheduleMeeting = () => {
    setScheduleCalls(false);
    setScheduleMeeting(true);
  };

  return (
    <>
      <Navbar mainTitle={"Calls "} title={"Active Calls"} src="Phone" />
      <div className="w-[100%] min-h-[90vh] pl-[40px] pr-[40px]">
        <Navigation
          title=""
          buttons={[
            {
              text: "",
              dropdown: true,
              id: 1,
              icon: "Download",
              light: true,
              dark: false,
              click: addExport,
              onClick1: exportXLSX,
              list: [
                // { title: "Excel", Icon: "Excel" },
                // { title: "PDF", Icon: "PDF" },
                // {
                //   title: "CSV",
                //   Icon: "CSV",
                //   wrapper: (
                //     <CSVLink data={data.result} className="" ref={ref}>
                //       CSV
                //     </CSVLink>
                //   ),
                // },
              ],
            },
          ]}
        />
        <div className="flex justify-between items-center pb-5">
          <button
            onClick={gotoScheduleCall}
            className={
              scheduleCalls
                ? "focus:outline-none text-white bg-[#fe5043ad] hover:bg-[#fe50437a] font-medium rounded-lg text-md px-16 py-1.5 mt-2 mb-2"
                : "text-black font-medium text-md hover:bg-[#fe5043ad] hover:rounded-lg hover:text-white hover:py-1.5 hover:px-16 hover:mt-2 hover:mb-2"
            }
            type="button"
          >
            Schedule Call
          </button>
          <div className="w-[40%]">
            <button
              onClick={gotoScheduleMeeting}
              className={
                scheduleMeeting
                  ? "focus:outline-none text-white bg-[#fe5043ad] hover:bg-[#fe50437a] font-medium rounded-lg text-md px-16 py-1.5 mt-2 mb-2"
                  : "text-black font-medium text-md hover:bg-[#fe5043ad] hover:rounded-lg hover:text-white hover:py-1.5 hover:px-16 hover:mt-2 hover:mb-2"
              }
            >
              Schedule Metting
            </button>
          </div>
        </div>
        <hr className="border-t-2 border-gray-300 mb-4" />
        {scheduleCalls && (
          <ScheduleCallsContainer data={data} dummy1={DUMMY} dummy2={dummy} />
        )}
        {scheduleMeeting && (
          <ScheduleMeetingContainer data={data} dummy1={DUMMY} dummy2={dummy} />
        )}
      </div>
    </>
  );
};

export async function getServerSideProps({ query, ...params }: any) {
  const response = await axios.get(
    "https://salescrmbe.onrender.com/api/active-call/find-all"
  );
  return {
    props: {
      data: response.data || {},
    },
  };
}

export default Calls;
