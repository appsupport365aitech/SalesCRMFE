import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navigation from "@/components/app/Navigation";
import LeadsContainer from "@/components/leads/open/Container";
import Backdrop from "@/components/View/Backdrop";
import ImportLead from "@/components/View/import-lead/Index";
import AddLeadForm from "@/components/View/add-lead/addLead";
import { CSVLink } from "react-csv";
import axios from "axios";
import * as XLSX from "xlsx";
import Notes from "@/components/View/Notes";
import EditLead from "@/components/View/EditLead";
import Notes1 from "@/components/View/NotesSalesView";
import PromptEdit from "@/components/View/PromptEdit";
import { useRouter } from "next/router";
import { BsKanban } from "react-icons/bs";
import { baseUrl } from "@/utils/baseUrl";

const dummyItem = {
  companyName: "ABC Corp",
  companyAddress: "Noida, UP",
  poc: "Shraddha P.",
  pocJob: "Sales Manager",
  names: "Anil L., Paul G., Rekha",
  lastActivity: "Email sent on 23 Jan 2023",
  dealSize: "11000",
  product: "Product ",
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

const SalesOpen = ({ data, mastersData, teamManagersData }: any) => {
  const state = useSelector((state: any) => state.auth);
  const [view, setView] = React.useState(false);
  const [reload, setReload] = useState(false);

  const viewButtinClick = (prev: Number, current: Number) => {
    if (current === 1) {
      setView(true);
    } else {
      setView(false);
    }
  };

  const router = useRouter();

  useEffect(() => {
    const handlePopState = () => {
      // Get the previous route from the browser history
      const previousRoute = document.referrer;

      // Navigate to the previous route within your Next.js app
      router.push(previousRoute);
    };

    // Add event listener to handle popstate (browser back button)
    window.addEventListener("popstate", handlePopState);

    return () => {
      // Clean up the event listener when the component is unmounted
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  const [form, setForm] = useState(false);
  const [promptVal, setPromptVal] = useState(false);
  const [imports, setImports] = useState(false);
  const [bool, setBool] = useState(true);

  const showForm = () => {
    setForm(true);
  };
  const showImports = () => {
    setImports(true);
  };

  const showPrompt = () => {
    setPromptVal(true);
  };

  const cancelImports = () => {
    setBool(false);
    setTimeout(() => {
      setImports(false);
      setBool(true);
      // ========================= RELOAD ===========================
      setReload(!reload);
    }, 500);
  };
  const cancelForms = () => {
    setBool(false);
    setTimeout(() => {
      setForm(false);
      setBool(true);
    }, 500);
  };
  const cancelPrompts = () => {
    setBool(false);
    setTimeout(() => {
      setPromptVal(false);
      setBool(true);
    }, 500);
  };
  const AddLead = (e: any, e1: any) => {
    if (e1 === 0) {
      showForm();
    } else if (e1 === 1) {
      showImports();
    } else if (e1 === 2) {
      showPrompt();
      // showForm()
    }
  };

  const ref: any = useRef();
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    if (window !== undefined) {
      setAccessToken(localStorage.getItem("access-token") || "");
    }
  }, []);

  const exportXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(data?.result);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workbook, "DataSheet.xlsx");
  };

  const makecall = async () => {
    try {
      const res = await axios.post(
        `${baseUrl}api/calling/make-call`,
        {
          callTo: "7669481778",
        },
        { headers: { Authorization: accessToken } }
      );
    } catch (error) {}
  };

  const addExport = (e: any, e1: any) => {
    if (e1 === 0) {
      exportXLSX();
    }
  };

  return (
    <div className="relative w-[100%] min-h-[90vh] px-[10px]">
      {/* <Navigation  /> */}
      {imports && (
        <Backdrop bool={bool}>
          <ImportLead cancel={cancelImports} />
        </Backdrop>
      )}
      {form && (
        <Backdrop bool={bool}>
          <AddLeadForm
            cancel={cancelForms}
            mastersData={mastersData}
            teamManagersData={teamManagersData}
          />
        </Backdrop>
      )}
      <Navigation
        title={""}
        buttons={[
          // {
          //   text: "Actions",
          //   dropdown: true,
          //   id: 0,
          //   click: viewButtinClick,
          //   light: false,
          //   dark: true,
          //   list: [
          //     {
          //       title: "Table View",
          //       Icon: "List 2",
          //     },
          //     {
          //       title: "Kanban View",
          //       Icon: "Grid",
          //     },
          //   ],
          //   value: 0,
          // },
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
                Icon: "List 2",
              },
              {
                title: "Kanban View",
                Icon: "Grid",
              },
            ],
            value: 0,
          },
          //sougata
          // {
          //   text: "Add Lead",
          //   dropdown: true,
          //   id: 1,
          //   icon: "Plus",
          //   click: AddLead,
          //   light: false,
          //   dark: false,
          //   list: [
          //     { title: "Using Form", Icon: "Text" },
          //     { title: "Import Leads", Icon: "Download" },
          //     // { title: "Using Prompt", Icon: "Text" },
          //   ],
          // },
          {
            text: "",
            dropdown: true,
            id: 1,
            icon: "Download",
            light: true,
            dark: false,
            click: addExport,
            list: [
              // { title: "Print", Icon: "Printer" },
              { title: "Excel", Icon: "Excel" },
              // { title: "PDF", Icon: "PDF" },
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

      <LeadsContainer
        view={view}
        records={data?.totalRecords}
        list={Dummy}
        reload={reload}
        viewButtinClick={viewButtinClick}
        addExport={addExport}
        data={data?.result}
        ref={ref}
      />
    </div>
  );
};

export default SalesOpen;
