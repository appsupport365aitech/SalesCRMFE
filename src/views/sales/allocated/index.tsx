import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navigation from "@/components/app/Navigation";
import LeadsContainer from "@/components/leads/allocated/Container";
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
import DropDown3 from "@/utils/Button/DropDown3";
import { getBasicIcon } from "@/utils/AssetsHelper";
import { useAppDispatch } from "@/store/store";
import { setError, setSuccess } from "@/store/ai";
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

const SalesOpen = ({
  data,
  mastersData,
  teamManagersData,
  sdrBdmData,
}: any) => {
  const state = useSelector((state: any) => state.auth);
  const [view, setView] = React.useState(false);

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

  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [form, setForm] = useState(false);
  const [promptVal, setPromptVal] = useState(false);
  const [imports, setImports] = useState(false);
  const [bool, setBool] = useState(true);

  const [searchAssignTo, setSearchAssignTo] = useState("");

  const [showSubDD, setShowSubDD] = useState<number>(-1);

  const [openStages, setOpenStages] = useState<any>([
    { id: "Enquiry", label: "Enquiry" },
    { id: "Proposal", label: "Proposal" },
    { id: "Interaction", label: "Interaction" },
  ]);
  const [closeStages, setCloseStages] = useState<any>([
    { id: "Won", label: "Won" },
    { id: "Lost", label: "Lost" },
    { id: "Dead", label: "Dead" },
  ]);

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

  const dispatch = useAppDispatch();
  const [reload, setReload] = useState(false);

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

  const handleSearchAllocateTo = (val: any) => {
    setSearchAssignTo(val);
  };

  const handleAllocateTo = (checked: boolean, newOwnerId: any) => {
    try {
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
            success: "Reallocating...",
          })
        );
        selectedRows.forEach((selectedRow: any) => {
          const payload = {
            id: selectedRow, // lead id
            manager:
              window !== undefined ? localStorage.getItem("user-id") : "",
            owner: newOwnerId,
          };
          axios
            .post(`${baseUrl}api/leads/allocateLeadToOwner`, payload, {
              headers: { Authorization: accessToken },
            })
            .then((res: any) => {
              dispatch(
                setSuccess({
                  show: true,
                  success: "Lead Reallocated Successfully!",
                })
              );
              setReload(!reload);
              // setTimeout(() => {
              //   window.location.reload();
              // }, 2000);
            })
            .catch((err: any) => {
              dispatch(
                setError({
                  show: true,
                  error: "Error Occured!",
                })
              );
            });
        });
      }
    } catch (error) {}
  };

  const updateLead = (checked: any, key: any, value: any) => {
    console.log("------- updateLead : allocated -------", checked, key, value);
    if (checked) {
      if (!value) {
        dispatch(
          setError({
            show: true,
            error: "No Selection.",
          })
        );
      } else {
        const payload = {
          [key]: value,
        };
        axios
          .put(``, payload, { headers: { Authorization: accessToken } })
          .then((res: any) => {})
          .catch((err: any) => {});
      }
    }
  };

  const renderDropdownList = () => {
    return (
      <div className="flex gap-7">
        <div className={`rounded-[8px] overflow-hidden w-[150px]`}>
          <button
            className={`w-[100%] text-left text-black p-[4px] cursor-pointer ${
              showSubDD === 0 && "bg-[#eee]"
            }`}
            onClick={() => setShowSubDD(showSubDD !== 0 ? 0 : -1)}
          >
            Reallocate To
          </button>
          <button
            className={`w-[100%] text-left text-black p-[4px] cursor-pointer ${
              showSubDD === 1 && "bg-[#eee]"
            }`}
            onClick={() => setShowSubDD(1)}
          >
            Change Lead Status
          </button>
          <button
            className={`w-[100%] text-left text-black p-[4px] cursor-pointer ${
              showSubDD === 2 && "bg-[#eee]"
            }`}
            onClick={() => setShowSubDD(2)}
          >
            Change Lead Stage
          </button>
        </div>
        <div>
          {showSubDD === 0 && (
            <div className="w-[100%] bg-[#eee]">
              <div className="flex items-center p-[6px] border-solid border-1 border-black bg-white">
                <input
                  type="text"
                  className="w-[160px] bg-white outline-none text-black"
                  placeholder="Search..."
                  value={searchAssignTo}
                  onInput={(e: any) => handleSearchAllocateTo(e.target.value)}
                />
                <button className="flex items-center justify-center w-[20px] h-[20px]">
                  <img
                    src={getBasicIcon("Search")}
                    alt="Search"
                    width={"16px"}
                    height={"16px"}
                  />
                </button>
              </div>
              <ul className="">
                {searchAssignTo
                  ? sdrBdmData?.result
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
                                handleAllocateTo(e.target.checked, qaItem?._id)
                              }
                            />
                          </label>
                        </li>
                      ))
                  : sdrBdmData?.result?.map((qaItem: any, index: number) => (
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
                              handleAllocateTo(e.target.checked, qaItem?._id)
                            }
                          />
                        </label>
                      </li>
                    ))}
              </ul>
            </div>
          )}
          {showSubDD === 1 && (
            <ul className="bg-[#eee] flex flex-col gap-[4px]">
              <li className="">
                <label
                  htmlFor={"Open"}
                  className="w-[100%] flex items-center justify-between text-black p-[4px] cursor-pointer"
                >
                  <span>Open</span>
                  <input
                    type="radio"
                    id={"Open"}
                    name="status"
                    onChange={(e) =>
                      updateLead(e.target.checked, "lead_status", "Open")
                    }
                  />
                </label>
              </li>
              <li className="">
                <label
                  htmlFor={"Close"}
                  className="w-[100%] flex items-center justify-between text-black p-[4px] cursor-pointer"
                >
                  <span>Close</span>
                  <input
                    type="radio"
                    id={"Close"}
                    name="status"
                    onChange={(e) =>
                      updateLead(e.target.checked, "lead_status", "Close")
                    }
                  />
                </label>
              </li>
            </ul>
          )}
          {showSubDD === 2 && (
            <ul className="bg-[#eee] flex flex-col gap-[4px]">
              {openStages?.map((stageItem: any, index: number) => (
                <li className="" key={index}>
                  <label
                    htmlFor={stageItem?.id}
                    className="w-[100%] flex items-center justify-between text-black p-[4px] cursor-pointer"
                  >
                    <span>{stageItem?.label}</span>
                    <input
                      type="radio"
                      id={stageItem?.id}
                      name="stage"
                      onChange={(e) =>
                        updateLead(
                          e.target.checked,
                          "lead_stage",
                          stageItem?.id
                        )
                      }
                    />
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-[100%] min-h-[90vh] px-[10px] overflowX-hidden">
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
      {/* <Navigation
        title={""}
        leftChildren={
          <DropDown3 text="Actions" id={0} dropdown={true} dark={true}>
            {renderDropdownList()}
          </DropDown3>
        }
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
          {
            text: "Add Lead",
            dropdown: true,
            id: 1,
            icon: "Plus",
            click: AddLead,
            light: false,
            dark: false,
            list: [
              { title: "Using Form", Icon: "Text" },
              { title: "Import Leads", Icon: "Download" },
              // { title: "Using Prompt", Icon: "Text" },
            ],
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
      /> */}
      <LeadsContainer
        view={view}
        records={data?.totalRecords}
        list={Dummy}
        setSelectedRows={setSelectedRows}
        reload={reload}
        renderDropdownList={renderDropdownList()}
        viewButtinClick={viewButtinClick}
        AddLead={AddLead}
        addExport={addExport}
        data={data?.result}
        ref={ref}
      />
    </div>
  );
};

export default SalesOpen;
