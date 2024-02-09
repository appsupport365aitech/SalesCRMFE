import React, { useEffect, useState, Suspense } from "react";
import Header from "@/components/leads/open/Header/Header";
import Image from "next/image";
import { getBasicIcon } from "@/utils/AssetsHelper";
import axios from "axios";
import Spinner from "@/components/loader/spinner";
import KanbanItem from "./KanbanItems";
import { baseUrl } from "@/utils/baseUrl";

const KanbanTable = ({ totalRecords, search, queryStr }: any) => {
  const [items, setItems]: any = useState([]);
  const [totalLeads, settotalLeads]: any = useState(totalRecords);
  const [accessToken, setAccessToken] = useState<any>("");

  useEffect(() => {
    if (window !== undefined) {
      setAccessToken(localStorage.getItem("access-token"));
    }
  }, []);

  //   const getallItems = atotalRecordssync (current: any) => {
  //     const res = await axios.get(
  //       `${baseUrl}api/leads/find-all?limit=${limit}&page=${current}&leadStatus=Open"`
  //     );
  //     const data = res.data.result;
  //     return data;
  //   };
  const [loading, setLoading] = React.useState(false);
  const [qaid, setQaid] = useState(
    window !== undefined ? localStorage.getItem("user-id") : ""
  );
  useEffect(() => {
    try {
      setLoading(true);
      const getItems = async () => {
        const res = await axios.get(
          `${baseUrl}api/leads/allocatedLeads?qaStatus=allocated&qaId=${qaid}${queryStr}`,
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );
        const data = res.data.result;
        const filtered = data.filter(
          (e: any) =>
            e.companyId?.company_name?.includes(search) ||
            e.customerId?.name?.includes(search) ||
            e.potential_deal_size?.includes(search) ||
            e?.lead_title?.includes(search) ||
            e?.leadId?.includes(search)
        );

        // const filtered = data;
        settotalLeads(filtered.length);
        setItems(filtered);
      };

      getItems();
      setLoading(false);
    } catch (error) {}
  }, [search, accessToken, queryStr]);

  const Leads = items;
  const [selectAll, setSelectAll] = useState(false);

  const stages = ["Enquiry", "Interaction", "Proposal", "Won", "Lost"];
  const titles = ["ENQUIRY", "INTERACTION", "PROPOSAL", "WON", "LOST"];
  useEffect(() => {
    items.map((e: any, i: any) => {});
  }, [items]);
  return (
    <>
      <div className="px-[10px] mt-[10px] text-[#ffffff] flex gap-[30px] h-[1200px] overflow-x-auto custom-scroll">
        {/* {loading ? (
          <Spinner />
        ) : (
          Leads != null &&
          Leads.map((item: Lead, ind: any) => {
            return (
              <LeadContainer
                selectAll={selectAll}
                key={item._id}
                index={ind}
                id={item._id}
                company={item.companyId}
                customer={item.customerId}
                leadStage={item.leadStage}
                leadStatus={item.leadStatus}
                custom={item.customer_name}
                LeadData={item}
                last={Leads.length - 1 === ind}
              />
            );
          })
        )} */}

        {stages.map((col, i) => {
          const toBeFilter = items;
          const res = items.filter((obj: any) => {
            return obj.leadStage.includes(stages[i]);
          });
          if (res.length || col === "Dead") {
            return (
              <div className="flex gap-[20px]" key={i}>
                <div className="w-[250px] shrink-0 ">
                  <div className="leadName flex mb-[10px]">
                    <div className="w-[100%] bg-slate-700 h-[45px] rounded-xl pl-[15px] pr-[15px] flex items-center justify-between">
                      <div className="enq-header font-medium flex items-center ml-[10px] text-[13px] gap-[8px]">
                        <p className="">{titles[i]}</p>
                        <div className="text-[10px] h-[19px] justify-center w-[20px] font-medium text-[#fff] flex items-center bg-slate-400 px-[4px] rounded-[4px]">
                          {res.length}
                        </div>
                      </div>
                      {/* <a href="" className="flex items-center">
                        ...
                      </a> */}
                    </div>
                    {/* <div className="pl-[30px] h-[45px] bg-bg-red rounded-xl flex items-center justify-center cursor-pointer ml-[15px] pr-[20px] relative p-[5px]">
                      {
                        <div className="absolute left-3  w-[28px]">
                          <div className={`w-[100%] p-[3px] rounded-md }`}>
                            <Image
                              src={getBasicIcon("Plus")}
                              className={`w-[24px] svg-white`}
                              alt=""
                              width={24}
                              height={24}
                              style={{
                                objectFit: "contain",
                              }}
                            />
                          </div>
                        </div>
                      }
                    </div> */}
                  </div>
                  {res.map((Item: any, i: any) => {
                    const item = {
                      data: {
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
                      },
                    };
                    return <KanbanItem i={i} key={i} item={item} Item={Item} />;
                  })}
                </div>
              </div>
            );
          }
          return <React.Fragment key={i}></React.Fragment>;
        })}
      </div>

      {/* <div className="flex h-[80px] items-center justify-between ">
        <div className="flex items-center">
          <ButtonDropDown
            width={80}
            text={"10"}
            id={1}
            light={true}
            dropdown={true}
            list={[
              { title: 10 },
              { title: 11 },
              { title: 12 },
              { title: 13},
              { title: 14},
              { title: 15 },
              { title: 16 },
              { title: 17},
              { title: 18 },
              { title: 19 },
              { title: 20 },
            ]}
            border={true}
            height={40}
            dropDirection={true}
            tight={true}
          />
          <p className="ml-[12px] text-norm text-[14px] font-medium tracking-wider">
            Showing 1-10 of 100
          </p>
        </div>
        <div className="flex mr-[10%]">
          <SmallButton leftDblIcon={true} theme={2} left={10} />
          <SmallButton leftIcon={true} theme={2} left={10} />
          <SmallButton text={"1"} theme={1} left={10} />
          <SmallButton text={"2"} theme={3} />
          <SmallButton text={"3"} theme={3} />
          <SmallButton text={"..."} theme={3} />
          <SmallButton text={"5"} theme={3} />
          <SmallButton RightDblIcon={true} theme={4} left={10} />
          <SmallButton RightIcon={true} theme={4} left={10} />
        </div>
      </div> */}
      <div className="h-[10px] w-full"></div>
    </>
  );
};

export default KanbanTable;
