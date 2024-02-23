import ButtonDropDown from "@/utils/Button/Button";
import SmallButton from "@/utils/Button/SmallButton";
import React, { useEffect, useState, Suspense } from "react";
import LeadContainer from "@/components/leads/open/Lead/Lead";
import Header from "@/components/calls/recorded-calls/Header/Header";
import ReactPaginate from "react-paginate";
import Image from "next/image";
import {
  getBasicIcon,
  LeftArrow,
  LeftDoubleArrow,
  RightArrow,
} from "@/utils/AssetsHelper";
import axios from "axios";
import Spinner from "@/components/loader/spinner";
import CallContainer from "@/components/calls/recorded-calls/Call/Call";
import { baseUrl } from "@/utils/baseUrl";
const LeadsTable = ({ totalRecords, search, queryStr }: any) => {
  const [pageCount, setpageCount]: any = useState(0);
  const [pageNumber, setpageNumber]: any = useState(0);
  const [limit, setLimit]: any = useState(20);
  const [items, setItems]: any = useState([]);
  const [totalLeads, settotalLeads]: any = useState(0);
  const [selectAll, setSelectAll] = useState(false);
  const [accessToken, setAccessToken] = useState<any>("");

  useEffect(() => {
    if (window !== undefined) {
      setAccessToken(localStorage.getItem("access-token"));
    }
  }, []);

  useEffect(
    function () {
      axios
        .get(
          `${baseUrl}api/recording/find-all?limit=${limit}&page=${0}${queryStr}`,
          {
            headers: {
              Authorization: accessToken,
            },
          }
        )
        .then((res) => {
          setItems(res?.data?.result);
          settotalLeads(res?.data?.totalRecords);
          const count = Math.ceil(Number(res?.data?.totalRecords) / limit);
          setpageCount(count);
        })
        .catch((e: any) => {});
    },
    [queryStr]
  );

  const getallItems = async (current: any) => {
    try {
      const res = await axios.get(
        `${baseUrl}api/recording/find-all?limit=${limit}&page=${current}${queryStr}"`,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      const data = res.data.result;
      return data;
    } catch (error) {
      return {};
    }
  };
  const [loading, setLoading] = React.useState(false);
  const [checked, setChecked] = React.useState(true);
  function convertDatetimeToCustomFormat(dateStr: any) {
    // Convert the string to a Date object
    const dt: any = new Date(dateStr);

    // Calculate the number of seconds since January 1, 1400 (Iranian calendar)
    const referenceDate: any = new Date("1400-01-01T00:00:00Z");
    const secondsDifference = Math.floor((dt - referenceDate) / 1000);

    return secondsDifference;
  }
  useEffect(() => {
    try {
      if (checked) {
        setLoading(true);
        const count = Math.ceil(Number(totalRecords) / limit);
        setpageCount(count);
        if (pageNumber >= count && pageCount != 0) setpageNumber(0);
        const getItems = async () => {
          const res = await axios.get(
            `${baseUrl}api/recording/find-all?${queryStr}&page=0&limit=20`,
            {
              headers: {
                Authorization: accessToken,
              },
            }
          );
          const data = res.data.result;

          if (search.length) {
            setpageNumber(0);
            const allItems = await getallItems(pageNumber);
            setItems(allItems);
          }

          const filtered = data.filter((e: any) => {
            const idss: any = String(
              convertDatetimeToCustomFormat(e.updatedAt)
            );
            const leadid = e.leadId.length > 0 ? e.leadId[0].leadId : "-";
            const callId =
              e.leadId.length > 0
                ? e?.callData[0]?._id
                    .split("")
                    .filter((dig: any) => /\d/.test(dig))
                    .join("")
                    .slice(-4)
                : "-";

            const call_title: any = e;
            const title =
              call_title?.active_calls?.length > 0
                ? call_title?.active_calls[0].call_title
                : "";
            return (
              idss.includes(search) ||
              leadid.includes(search) ||
              callId.includes(search) ||
              title.includes(search)
            );
          });

          // const filtered = data;
          settotalLeads(filtered.length);
          const count = Math.ceil(Number(filtered.length) / limit);
          setpageCount(count);
          setItems(
            filtered.slice(pageNumber * limit, pageNumber * limit + limit)
          );
        };

        getItems();
        setLoading(false);
      }
    } catch (error) {}
  }, [limit, search, accessToken]);

  const fetchItems = async (current: any) => {
    try {
      const res = await axios.get(
        `${baseUrl}api/recording/find-all?limit=${limit}&page=${current}${queryStr}`,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      const data = res.data.result;
      const filtered = data.filter((e: any) => e._id.includes(search));
      settotalLeads(filtered.length);
      return filtered;
    } catch (error) {
      return {};
    }
  };

  const handleChange = (e: any) => {
    setLimit(e.target.value);
  };

  const setFirstPage = async () => {
    setLoading(true);
    setpageNumber(0);
    const allItems = await fetchItems(pageNumber);
    setItems(allItems);
    setLoading(false);
  };

  const setLastPage = async () => {
    setLoading(true);
    setpageNumber(pageCount - 1);
    const allItems = await fetchItems(pageNumber);
    setItems(allItems);
    setLoading(false);
  };
  const handlePageClick = async (data: any) => {
    setChecked(false);
    setLoading(true);
    let current = data.selected;
    setpageNumber(current);
    const allItems = await fetchItems(current);
    setItems(allItems);
    setLoading(false);
    setChecked(true);
  };

  const Leads = items;

  function sortArray(arr: any) {
    return arr.sort((a: any, b: any) => a - b);
  }

  const [sortWins, setWins] = useState<any>(null);
  const [sortDeals, setDeals] = useState<any>(null);
  const [sortBudget, setBudget] = useState<any>(null);

  const sortwins = (arr: any) => {
    const sh = arr.sort((a: any, b: any) => {
      let A = a.win_probability;
      A = A.slice(0, -1);
      let B = b.win_probability;
      B = B.slice(0, -1);
      return Number(A) - Number(B);
    });
    if (sortWins === null) {
      setWins(true);
      return sh;
    } else {
      if (sortWins) {
        setWins(false);
        const rev = [];
        for (let i = sh.length - 1; i >= 0; i--) {
          rev.push(sh[i]);
        }
        return rev;
      } else {
        setWins(true);
        return sh;
      }
    }
  };

  const sortdeals = (arr: any) => {
    const sh = arr.sort((a: any, b: any) => {
      let A = a.potential_deal_size;
      let B = b.potential_deal_size;
      return Number(A) - Number(B);
    });
    if (sortDeals === null) {
      setDeals(true);
      return sh;
    } else {
      if (sortDeals) {
        setDeals(false);
        const rev = [];
        for (let i = sh.length - 1; i >= 0; i--) {
          rev.push(sh[i]);
        }
        return rev;
      } else {
        setDeals(true);
        return sh;
      }
    }
  };

  const sortbudget = (arr: any) => {
    const sh = arr.sort((a: any, b: any) => {
      let A = a.existing_budget;
      let B = b.existing_budget;
      return Number(A) - Number(B);
    });
    if (sortBudget === null) {
      setBudget(true);
      return sh;
    } else {
      if (sortBudget) {
        setBudget(false);
        const rev = [];
        for (let i = sh.length - 1; i >= 0; i--) {
          rev.push(sh[i]);
        }
        return rev;
      } else {
        setBudget(true);
        return sh;
      }
    }
  };

  console.log(totalLeads, "arijit");
  console.log(pageCount, "arijit");

  return (
    <>
      <div className="mt-[0px] w-[100%] min-h-[340px] overflow-y-hidden overflow-x-auto custom-scroll pb-[0px]">
        <Header
          selectAll={() => {
            setSelectAll(!selectAll);
          }}
          win={() => {
            const wins = [];
            for (let i = 0; i < Leads.length; i++) {
              const str = Leads[i].win_probability;
              let strr = "";
              for (let j = 0; j < str.length - 1; j++) {
                strr += str[j];
              }
              wins.push(Number(strr));
            }
            setItems(sortwins(Leads));
          }}
          deal={() => {
            const deals = [];
            for (let i = 0; i < Leads.length; i++) {
              const str = Leads[i].potential_deal_size;
              deals.push(Number(str));
            }
            setItems(sortdeals(Leads));
          }}
          budget={() => {
            const budget = [];
            for (let i = 0; i < Leads.length; i++) {
              const str = Leads[i].existing_budget;
              budget.push(Number(str));
            }
            setItems(sortbudget(Leads));
          }}
        />
        {loading ? (
          <Spinner />
        ) : (
          Leads != null &&
          Leads?.length > 0 &&
          Leads?.map((item: any, i: any) => {
            return (
              <CallContainer
                key={item._id}
                id={item._id}
                CallData={item}
                last={Leads.length - 1 === i}
                selectAll={selectAll}
              />
            );
          })
        )}
      </div>
      {pageCount && (
        <div className="mx-[80px] flex justify-between">
          <div className="flex items-center">
            <select
              onChange={handleChange}
              name="limit"
              id="limit"
              className="bg-[#fff] border border-[#8A9099] rounded-[10px] text-black p-[5px] px-[8px]"
            >
              <option value="10" selected>
                10
              </option>
              {/* <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option> */}
            </select>
            <p className="ml-[12px] text-norm text-[14px] font-medium tracking-wider">
              {`Showing ${totalLeads === 0 ? 0 : pageNumber * limit + 1}-${
                (pageNumber + 1) * limit > totalLeads
                  ? totalLeads
                  : (pageNumber + 1) * limit
              } of ${totalLeads}`}
            </p>
          </div>
          <div className="flex justify-center my-[45px] ">
            <div
              className={`flex justify-center mr-[8px] h-[40px] w-[40px] rounded-[10px] ${
                pageNumber === 0
                  ? "bg-[#f5f5f5] opacity-30 cursor-auto"
                  : "bg-[#e8ebfd] cursor-pointer"
              }`}
              onClick={setFirstPage}
            >
              <Image
                src={getBasicIcon("Arrow-Right 2")}
                className={`${
                  pageNumber != 0 ? "svg-blue" : ""
                } rotate-180 translate-x-[6px]`}
                alt=""
                width={18}
                height={18}
              />
              <Image
                src={getBasicIcon("Arrow-Right 2")}
                className={`${
                  pageNumber != 0 ? "svg-blue" : ""
                } rotate-180 translate-x-[-6px]`}
                alt=""
                width={18}
                height={18}
              />
            </div>
            <ReactPaginate
              previousLabel={
                <Image
                  src={getBasicIcon("Arrow-Right 2")}
                  className={`${pageNumber != 0 ? "svg-red" : ""} rotate-180`}
                  alt=""
                  width={20}
                  height={20}
                  style={{
                    objectFit: "contain",
                  }}
                />
              }
              nextLabel={
                <Image
                  src={getBasicIcon("Arrow-Right 2")}
                  className={`${pageNumber != pageCount - 1 ? "svg-red" : ""}`}
                  alt=""
                  width={16}
                  height={16}
                  style={{
                    objectFit: "contain",
                  }}
                />
              }
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={0}
              onPageChange={handlePageClick}
              containerClassName={"text-black flex justify-center gap-[8px]"}
              pageClassName={`px-[15px] py-[8px] text-[15px] text-[#3F434A]`}
              pageLinkClassName={``}
              previousClassName={`flex justify-center  px-[10px] py-[7px] rounded-[10px] ${
                pageNumber === 0 ? "" : "bg-[#ffad9f]"
              }`}
              previousLinkClassName={`flex justify-center ${
                pageNumber != 0 ? "text-[#304FFD]" : "cursor-auto"
              }`}
              nextClassName={`flex justify-center  px-[10px] py-[7px] rounded-[10px] ${
                pageNumber === pageCount - 1 ? "" : "bg-[#ffad9f]"
              }`}
              nextLinkClassName={`flex justify-center ${
                pageNumber === pageCount - 1 ? "cursor-auto" : ""
              }`}
              breakClassName={""}
              breakLinkClassName={""}
              forcePage={pageNumber}
              activeClassName={`bg-bg-red text-[#fff] rounded-[10px]`}
            />
            <div
              className={`flex justify-center ml-[8px] h-[40px] w-[40px] rounded-[10px] ${
                pageNumber === pageCount - 1
                  ? ""
                  : "bg-[#e8ebfd] cursor-pointer"
              }`}
              onClick={setLastPage}
            >
              <Image
                src={getBasicIcon("Arrow-Right 2")}
                className={`${
                  pageNumber != pageCount - 1 ? "svg-red" : ""
                } translate-x-[6px]`}
                alt=""
                width={18}
                height={18}
              />
              <Image
                src={getBasicIcon("Arrow-Right 2")}
                className={`${
                  pageNumber != pageCount - 1 ? "svg-red" : ""
                } translate-x-[-6px]`}
                alt=""
                width={18}
                height={18}
              />
            </div>
          </div>
        </div>
      )}
      <div className="h-[10px] w-full"></div>
    </>
  );
};

export default LeadsTable;
