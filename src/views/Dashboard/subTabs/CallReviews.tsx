import React, { useEffect, useState } from "react";
import DealsCard from "@/components/customComponents/360_components/cardDeals";
import BarChartVertical from "@/components/analysis/Call/Charts/BarChartVertical";
import EmotionalAnalysisComp from "@/components/customComponents/360_components/SRM_Bdm_Dashboard/Emotional_Analysis";
import {
  AvgCallScore,
  NoOfQuesAsked,
  SellingSkills,
  HighIntentCallVolume,
  CallsDisposition,
  SalesRepSentimentScore,
} from "@/constants/chartFields";
import {
  avgCallScore,
  callDisposition,
  highIntentCallVolume,
  salesRepSentimentScore,
} from "@/constants/dummyData";
import NoiseAndVolumeChart from "@/components/analysis/Call/Charts/NoiseAndVolumeChart";
import CallSentiment from "@/components/customComponents/360_components/CallSentiment";
import TopScoringCall from "@/components/customComponents/360_components/table_topScoring";
import NavigationWithSwitchIcon from "@/components/app/NavigationWithSwitchIcon";
import axios from "axios";
import { baseUrl } from "@/utils/baseUrl";
const Chart = ({ title, percent }: any) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="w-[10px] h-[100%] flex flex-col items-center relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-[16px] h-[100%] mb-[15px] bg-[#FFF8F8] rounded-t-[19px] relative overflow-hidden">
        <div
          className="w-[100%] bg-bg-red bottom-0 absolute rounded-t-[19px] cursor-pointer"
          style={{ height: percent }}
        ></div>
      </div>
      {hovered && (
        <p className="w-[100%] text-[14px] leading-[13px] min-h-[200px] left-7 flex items-center justify-center font-medium text-[#8A9099] text-center absolute bottom-[-25px]">
          {percent?.replace(/%/g, "")}
        </p>
      )}
      <p
        className={`min-h-[40px] flex items-center justify-center font-medium text-[#8A9099] text-center absolute ${
          title.length > 5
            ? "w-[85px] text-[10px]  bottom-[-30px]"
            : "text-[12px] w-[40px]  bottom-[-25px]"
        }`}
      >
        {title}
      </p>
    </div>
  );
};

const ChartContainer = ({ children }: any) => {
  return (
    <div className="w-full h-[220px] mt-[40px] flex">
      <div className="w-[4%] h-[100%] flex flex-col justify-between items-center text-[#8A9099]">
        <p>100</p>
        <p>75</p>
        <p>50</p>
        <p>25</p>
        <p className="mb-[20px]">0</p>
      </div>
      <div className="w-full h-[100%] flex justify-between pr-[30px] pl-[30px]">
        {children}
      </div>
    </div>
  );
};
const CallReviews = ({
  tabData,
  sellingData,
  getSellingData,
  noOfQuesAsked,
  callSentimentData,
  setSdrId,
}: {
  tabData?: any;
  sellingData?: any;
  getSellingData?: any;
  noOfQuesAsked?: any;
  callSentimentData?: any;
  setSdrId?: any;
}) => {
  const [options, setOptions] = useState([{ name: "Select" }]);
  const [userId, setUserId] = useState(
    window !== undefined ? localStorage.getItem("user-id") : ""
  );
  const [userRole, setUserRole] = useState(
    window !== undefined ? localStorage.getItem("user-role") : ""
  );
  useEffect(() => {
    if (userRole != "Manager") return;
    else {
      const sdrBdmList = async () => {
        const res = await axios.get(
          `${baseUrl}api/master-users/getTeamSDRList?managerId=${userId}`
        );
        setOptions([...options, ...res?.data?.result]);
      };
      sdrBdmList();
    }
  }, []);
  // SDR/BDM; Manager
  if (tabData?.key === "QA Analyst") {
    return (
      <div className="w-[100%] mt-4">
        <div className="flex w-[100%] justify-end gap-[10px]">
          <NavigationWithSwitchIcon
            title=""
            buttons={[
              {
                text: `Call Reviews Type`,
                dropdown: true,
                id: 1,
                dark: true,
                light: false,
                list: [
                  { title: "All", Icon: "" },
                  { title: "Allocated", Icon: "" },
                  { title: "Feedback Requested", Icon: "" },
                ],
                // click: handleDaysSpan,
              },
            ]}
          />
        </div>
        <div className="flex w-[100%] justify-between flex-wrap gap-4 py-4">
          <DealsCard
            label="Total Calls For Review"
            icon="/Images/Icons/Basic/UpArrow.svg"
            count={100}
            percent={58.8}
          />
          <DealsCard
            label="On Time Call Reviews"
            icon="/Images/Icons/Basic/DownArrow.svg"
            count={76}
            percent={50}
          />
          <DealsCard
            label="Late Call Reviews"
            icon="/Images/Icons/Basic/BottomArrow.svg"
            count={18}
            percent={27.3}
          />
        </div>
        <div className="w-[100%] flex justify-between flex-wrap mt-5">
          <div className="w-[52%] flex flex-col gap-6 ">
            <TopScoringCall />
            {/* <BarChartVertical
              getSellingData={getSellingData}
              title="Selling Skills"
              data={sellingData}
              template={SellingSkills}
              options={[
                { key: "", label: "Select Sales Rep" },
                { key: "", label: "John C." },
                { key: "", label: "Barbara Oaklay" },
                { key: "", label: "Diana J." },
                { key: "", label: "Jacob Wilson" },
              ]}
            /> */}
            <div className="w-[100%] p-6 h-[400px] bg-[#fff] rounded-md shrink-0  py-[19px] shadow-md">
              <div className="w-[100%] flex items-center justify-between">
                <h1 className="text-[20px] font-medium text-[#3F434A] tracking-wide">
                  Selling Skills
                </h1>
                {options.length > 1 && (
                  <div className="bg-[#909193] pr-2 rounded-lg">
                    <select
                      className="text-white p-2 focus:outline-none outline-none cursor-pointer rounded-lg bg-[#909193]"
                      name="option"
                      onChange={(e) => setSdrId(e.target.value)}
                      id="option"
                    >
                      {options?.map((option: any, index: number) => (
                        <option
                          style={{ textTransform: "capitalize" }}
                          key={index}
                          value={option?._id}
                        >
                          {option?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <ChartContainer>
                <Chart
                  title="Confidence"
                  percent={`${sellingData["Confidence"]}%`}
                />
                <Chart
                  title="Consultative Selling"
                  percent={`${sellingData["Consultative Selling"]}%`}
                />
                <Chart title="Empathy" percent={`${sellingData["Empathy"]}%`} />
                <Chart
                  title="Listening Skills"
                  percent={`${sellingData["Listening Skills"]}%`}
                />
                <Chart
                  title="Politeness"
                  percent={`${sellingData["Politeness"]}%`}
                />
                <Chart
                  title="Positive Energy
"
                  percent={`${sellingData["Positive Energy"]}%`}
                />
                <Chart
                  title="Rapport Building"
                  percent={`${sellingData["Rapport Building"]}%`}
                />
                <Chart
                  title="Urgency Creation"
                  percent={`${sellingData["Urgency Creation"]}%`}
                />
              </ChartContainer>
            </div>
            {/* <BarChartVertical
              title="High Intent Call Volume"
              template={HighIntentCallVolume}
              data={highIntentCallVolume}
              options={[
                { key: "", label: "Select Sales Rep" },
                { key: "", label: "John C." },
                { key: "", label: "Barbara Oaklay" },
                { key: "", label: "Diana J." },
                { key: "", label: "Jacob Wilson" },
              ]}
            /> */}
            <div className="w-[100%] p-6 h-[400px] bg-[#fff] rounded-md shrink-0  py-[19px] shadow-md">
              <div className="w-[100%] flex items-center justify-between">
                <h1 className="text-[20px] font-medium text-[#3F434A] tracking-wide">
                  High Intent Call Volume
                </h1>
                {options.length > 1 && (
                  <div className="bg-[#909193] pr-2 rounded-lg">
                    <select
                      className="text-white p-2 focus:outline-none outline-none cursor-pointer rounded-lg bg-[#909193]"
                      name="option"
                      onChange={(e) => setSdrId(e.target.value)}
                      id="option"
                    >
                      {options?.map((option: any, index: number) => (
                        <option
                          style={{ textTransform: "capitalize" }}
                          key={index}
                          value={option?._id}
                        >
                          {option?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <ChartContainer>
                {highIntentCallVolume.map((item) => (
                  <Chart
                    key={item.title}
                    title={item.title}
                    percent={`${item.score}%`}
                  />
                ))}
              </ChartContainer>
            </div>
            <EmotionalAnalysisComp />
            {/* <BarChartVertical
              title="Sales Rep Sentiment Score"
              template={HighIntentCallVolume}
              data={highIntentCallVolume}
              options={[
                { key: "", label: "Select Sales Rep" },
                { key: "", label: "John C." },
                { key: "", label: "Barbara Oaklay" },
                { key: "", label: "Diana J." },
                { key: "", label: "Jacob Wilson" },
              ]}
            /> */}
            <div className="w-[100%] p-6 h-[400px] bg-[#fff] rounded-md shrink-0  py-[19px] shadow-md">
              <div className="w-[100%] flex items-center justify-between">
                <h1 className="text-[20px] font-medium text-[#3F434A] tracking-wide">
                  Sales Rep Sentiment Score
                </h1>
                {options.length > 1 && (
                  <div className="bg-[#909193] pr-2 rounded-lg">
                    <select
                      className="text-white p-2 focus:outline-none outline-none cursor-pointer rounded-lg bg-[#909193]"
                      name="option"
                      onChange={(e) => setSdrId(e.target.value)}
                      id="option"
                    >
                      {options?.map((option: any, index: number) => (
                        <option
                          style={{ textTransform: "capitalize" }}
                          key={index}
                          value={option?._id}
                        >
                          {option?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <ChartContainer>
                {highIntentCallVolume.map((item) => (
                  <Chart
                    key={item.title}
                    title={item.title}
                    percent={`${item.score}%`}
                  />
                ))}
              </ChartContainer>
            </div>
          </div>
          <div className="w-[46%] flex flex-col gap-6">
            {/* <BarChartVertical
              title="Call Score Graph"
              template={NoOfQuesAsked}
              data={avgCallScore}
              options={[
                { key: "", label: "Select Sales Rep" },
                { key: "", label: "John C." },
                { key: "", label: "Barbara Oaklay" },
                { key: "", label: "Diana J." },
                { key: "", label: "Jacob Wilson" },
              ]}
            /> */}
            <div className="w-[100%] p-6 h-[400px] bg-[#fff] rounded-md shrink-0  py-[19px] shadow-md">
              <div className="w-[100%] flex items-center justify-between">
                <h1 className="text-[20px] font-medium text-[#3F434A] tracking-wide">
                  Call Score Graph
                </h1>
                {options.length > 1 && (
                  <div className="bg-[#909193] pr-2 rounded-lg">
                    <select
                      className="text-white p-2 focus:outline-none outline-none cursor-pointer rounded-lg bg-[#909193]"
                      name="option"
                      onChange={(e) => setSdrId(e.target.value)}
                      id="option"
                    >
                      {options?.map((option: any, index: number) => (
                        <option
                          style={{ textTransform: "capitalize" }}
                          key={index}
                          value={option?._id}
                        >
                          {option?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <ChartContainer>
                <Chart title="Day 1" percent={`${avgCallScore["day_1"]}%`} />
                <Chart title="Day 2" percent={`${avgCallScore["day_2"]}%`} />
                <Chart title="Day 3" percent={`${avgCallScore["day_3"]}%`} />
                <Chart title="Day 4" percent={`${avgCallScore["day_4"]}%`} />
                <Chart title="Day 5" percent={`${avgCallScore["day_5"]}%`} />
                <Chart title="Day 6" percent={`${avgCallScore["day_6"]}%`} />
                <Chart title="Day 7" percent={`${avgCallScore["day_7"]}%`} />
              </ChartContainer>
            </div>
            {/* <BarChartVertical
              title="Number of Questions Asked"
              template={NoOfQuesAsked}
              data={noOfQuesAsked}
              options={[
                { key: "", label: "Select Sales Rep" },
                { key: "", label: "John C." },
                { key: "", label: "Barbara Oaklay" },
                { key: "", label: "Diana J." },
                { key: "", label: "Jacob Wilson" },
              ]}
            /> */}
            <div className="w-[100%] p-6 h-[400px] bg-[#fff] rounded-md shrink-0  py-[19px] shadow-md">
              <div className="w-[100%] flex items-center justify-between">
                <h1 className="text-[20px] font-medium text-[#3F434A] tracking-wide">
                  Number of Questions Asked
                </h1>
                {options.length > 1 && (
                  <div className="bg-[#909193] pr-2 rounded-lg">
                    <select
                      className="text-white p-2 focus:outline-none outline-none cursor-pointer rounded-lg bg-[#909193]"
                      name="option"
                      onChange={(e) => setSdrId(e.target.value)}
                      id="option"
                    >
                      {options?.map((option: any, index: number) => (
                        <option
                          style={{ textTransform: "capitalize" }}
                          key={index}
                          value={option?._id}
                        >
                          {option?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <ChartContainer>
                <Chart title="Day 1" percent={`${noOfQuesAsked["day_1"]}%`} />
                <Chart title="Day 2" percent={`${noOfQuesAsked["day_2"]}%`} />
                <Chart title="Day 3" percent={`${noOfQuesAsked["day_3"]}%`} />
                <Chart title="Day 4" percent={`${noOfQuesAsked["day_4"]}%`} />
                <Chart title="Day 5" percent={`${noOfQuesAsked["day_5"]}%`} />
                <Chart title="Day 6" percent={`${noOfQuesAsked["day_6"]}%`} />
                <Chart
                  title="Day 7"
                  percent={`${noOfQuesAsked["day_7"] * 10}%`}
                />
              </ChartContainer>
            </div>
            <CallSentiment callSentimentData={callSentimentData} />
            {/* <BarChartVertical
              title="Call Disposition"
              template={CallsDisposition}
              data={callDisposition}
              options={[
                { key: "", label: "Select Sales Rep" },
                { key: "", label: "John C." },
                { key: "", label: "Barbara Oaklay" },
                { key: "", label: "Diana J." },
                { key: "", label: "Jacob Wilson" },
              ]}
            /> */}
            <div className="w-[100%] p-6 h-[400px] bg-[#fff] rounded-md shrink-0  py-[19px] shadow-md">
              <div className="w-[100%] flex items-center justify-between">
                <h1 className="text-[20px] font-medium text-[#3F434A] tracking-wide">
                  Call Disposition
                </h1>
                {options.length > 1 && (
                  <div className="bg-[#909193] pr-2 rounded-lg">
                    <select
                      className="text-white p-2 focus:outline-none outline-none cursor-pointer rounded-lg bg-[#909193]"
                      name="option"
                      onChange={(e) => setSdrId(e.target.value)}
                      id="option"
                    >
                      {options?.map((option: any, index: number) => (
                        <option
                          style={{ textTransform: "capitalize" }}
                          key={index}
                          value={option?._id}
                        >
                          {option?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <ChartContainer>
                {callDisposition.map((item) => (
                  <Chart
                    key={item.title}
                    title={item.title}
                    percent={`${item.score}%`}
                  />
                ))}
              </ChartContainer>
            </div>
            <NoiseAndVolumeChart />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-[100%] mt-4">
        <div className="flex w-[100%] justify-between flex-wrap gap-4 py-4">
          <DealsCard
            label="Total Calls For Review"
            icon="/Images/Icons/Basic/UpArrow.svg"
            count={100}
            percent={58.8}
          />
          <DealsCard
            label="On Time Call Reviews"
            icon="/Images/Icons/Basic/DownArrow.svg"
            count={76}
            percent={50}
          />
          <DealsCard
            label="Late Call Reviews"
            icon="/Images/Icons/Basic/BottomArrow.svg"
            count={18}
            percent={27.3}
          />
        </div>
        <div className="w-[100%] flex justify-between flex-wrap mt-5">
          <div className="w-[52%] flex flex-col gap-6 ">
            {/* top scoring calls */}
            <BarChartVertical
              getSellingData={getSellingData}
              title="Selling Skills"
              data={sellingData}
              template={SellingSkills}
              options={[
                { key: "", label: "Select Sales Rep" },
                { key: "", label: "John C." },
                { key: "", label: "Barbara Oaklay" },
                { key: "", label: "Diana J." },
                { key: "", label: "Jacob Wilson" },
              ]}
            />
            <BarChartVertical
              title="High Intent Call Volume"
              template={HighIntentCallVolume}
              data={highIntentCallVolume}
              options={[
                { key: "", label: "Select Sales Rep" },
                { key: "", label: "John C." },
                { key: "", label: "Barbara Oaklay" },
                { key: "", label: "Diana J." },
                { key: "", label: "Jacob Wilson" },
              ]}
            />
            <EmotionalAnalysisComp />
            <BarChartVertical
              title="Sales Rep Sentiment Score"
              template={SalesRepSentimentScore}
              data={salesRepSentimentScore}
              options={[
                { key: "", label: "Select Sales Rep" },
                { key: "", label: "John C." },
                { key: "", label: "Barbara Oaklay" },
                { key: "", label: "Diana J." },
                { key: "", label: "Jacob Wilson" },
              ]}
            />
          </div>
          <div className="w-[46%] flex flex-col gap-6">
            <BarChartVertical
              title="Call Score Graph"
              template={NoOfQuesAsked}
              data={avgCallScore}
              options={[
                { key: "", label: "Select Sales Rep" },
                { key: "", label: "John C." },
                { key: "", label: "Barbara Oaklay" },
                { key: "", label: "Diana J." },
                { key: "", label: "Jacob Wilson" },
              ]}
            />
            <BarChartVertical
              title="Number of Questions Asked"
              template={NoOfQuesAsked}
              data={avgCallScore}
              options={[
                { key: "", label: "Select Sales Rep" },
                { key: "", label: "John C." },
                { key: "", label: "Barbara Oaklay" },
                { key: "", label: "Diana J." },
                { key: "", label: "Jacob Wilson" },
              ]}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default CallReviews;
