import BarChartVertical from "@/components/analysis/Call/Charts/BarChartVertical";
import GroupBarChartVertical from "@/components/analysis/Call/Charts/GroupBarChartVertical";
import React, { useEffect, useState } from "react";
import CallSentiment from "@/components/customComponents/360_components/CallSentiment";
import NoiseAndVolumeChart from "@/components/analysis/Call/Charts/NoiseAndVolumeChart";
import {
  SalesRepSentimentScore,
  SatisfactionScore,
  PerformanceRate,
  NoOfParticipants,
  CallsDisposition,
  TalkingSpeed,
} from "@/constants/chartFields";
import {
  avgCallScore,
  callDisposition,
  noOfParticipants,
  salesRepSentimentScore,
  satisfactionScore,
  talkingSpeed,
} from "@/constants/dummyData";
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
          title?.length > 5
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
const DualChart = ({ title, percent1, percent2 }: any) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="w-[10px] h-[100%] flex flex-col items-center relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex h-[100%] gap-1 mb-[15px]">
        <div className="w-[16px] h-[100%]  bg-[#FFF8F8] rounded-t-[19px] relative overflow-hidden flex">
          <div
            className="w-[100%] bg-bg-red bottom-0 absolute rounded-t-[19px] cursor-pointer"
            style={{ height: percent1 }}
          ></div>
        </div>
        <div className="w-[16px] h-[100%] bg-[#FFF8F8] rounded-t-[19px] relative overflow-hidden flex">
          <div
            className="w-[100%] bg-[#FFB839] bottom-0 absolute rounded-t-[19px] cursor-pointer"
            style={{ height: percent2 }}
          ></div>
        </div>
      </div>
      {/* {hovered && (
        <p className="w-[100%] text-[14px] leading-[13px] min-h-[200px] left-7 flex items-center justify-center font-medium text-[#8A9099] text-center absolute bottom-[-25px]">
          {percent1}
          {percent2}
        </p>
      )} */}
      <p
        className={`min-h-[40px] flex items-center justify-center font-medium text-[#8A9099] text-center absolute ${
          title?.length > 5
            ? "w-[85px] text-[10px]  bottom-[-30px]"
            : "text-[12px] w-[40px]  bottom-[-25px]"
        }`}
      >
        {title}
      </p>
    </div>
  );
};

const DualChartContainer = ({ children }: any) => {
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
const EngagementReports = ({
  tabData,
  callSentimentData,
  setSdrId,
}: {
  tabData?: any;
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
  if (tabData?.key === "Manager") {
    return (
      <div className="w-[100%] mt-10 flex justify-between gap-2">
        <div className="w-[100%] lg:w-[50%] md:w-[50%] flex flex-wrap flex-col gap-6">
          <GroupBarChartVertical
            title="Number of Participants"
            template={NoOfParticipants}
            data={noOfParticipants}
            options={[
              { key: "", label: "Select Team Members" },
              { key: "", label: "John C." },
              { key: "", label: "Barbara Oaklay" },
              { key: "", label: "Diana J." },
              { key: "", label: "Jacob Wilson" },
            ]}
          />
          <BarChartVertical
            title="Sales Rep Sentiment Score"
            template={SalesRepSentimentScore}
            data={salesRepSentimentScore}
            options={[
              { key: "", label: "Select Team Members" },
              { key: "", label: "John C." },
              { key: "", label: "Barbara Oaklay" },
              { key: "", label: "Diana J." },
              { key: "", label: "Jacob Wilson" },
            ]}
          />
          <CallSentiment callSentimentData={callSentimentData} />
          <BarChartVertical
            title="Call Disposition"
            template={CallsDisposition}
            data={callDisposition}
            options={[
              { key: "", label: "Select Team Members" },
              { key: "", label: "John C." },
              { key: "", label: "Barbara Oaklay" },
              { key: "", label: "Diana J." },
              { key: "", label: "Jacob Wilson" },
            ]}
          />
        </div>
        <div className="w-[100%] lg:w-[46%] md:w-[46%] flex flex-wrap flex-col gap-6">
          <BarChartVertical
            title="Satisfaction Score"
            template={SatisfactionScore}
            data={satisfactionScore}
            options={[
              { key: "", label: "Select Team Members" },
              { key: "", label: "John C." },
              { key: "", label: "Barbara Oaklay" },
              { key: "", label: "Diana J." },
              { key: "", label: "Jacob Wilson" },
            ]}
          />
          <BarChartVertical
            title="Performance Rate"
            template={PerformanceRate}
            data={avgCallScore}
            options={[
              { key: "", label: "Select Team Members" },
              { key: "", label: "John C." },
              { key: "", label: "Barbara Oaklay" },
              { key: "", label: "Diana J." },
              { key: "", label: "Jacob Wilson" },
            ]}
          />
          <NoiseAndVolumeChart />
          <BarChartVertical
            title="Talking Speed"
            template={TalkingSpeed}
            data={talkingSpeed}
            options={[
              { key: "", label: "Select Team Members" },
              { key: "", label: "John C." },
              { key: "", label: "Barbara Oaklay" },
              { key: "", label: "Diana J." },
              { key: "", label: "Jacob Wilson" },
            ]}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-[100%] mt-10 flex flex-wrap justify-between gap-2 overflow-x-hidden">
        <div className="w-[100%] lg:w-[50%] md:w-[50%] flex flex-wrap flex-col gap-6">
          {/* <GroupBarChartVertical
            title="Number of Participants"
            template={NoOfParticipants}
            data={noOfParticipants}
          /> */}
          <div className="w-[100%] p-6 h-[400px] bg-[#fff] rounded-md shrink-0  py-[19px] shadow-md">
            <div className="w-[100%] flex items-center justify-between">
              <h1 className="text-[20px] font-medium text-[#3F434A] tracking-wide">
                Number of Participants
              </h1>
            </div>
            <div className="flex gap-6 justify-start items-center">
              <div className="flex gap-2 justify-start items-center text-black">
                <div className="w-4 h-4 rounded-full bg-[#FE5143]"></div>
                SDR/BDM
              </div>
              <div className="flex gap-2 justify-start items-center text-black">
                <div className="w-4 h-4 rounded-full bg-[#FFB839]"></div>
                Prospect
              </div>
            </div>
            <DualChartContainer>
              {noOfParticipants?.map((item: any) => (
                <DualChart
                  key={item.day}
                  title={item.day}
                  percent1={item.SDR}
                  percent2={item.prospect}
                />
              ))}
            </DualChartContainer>
          </div>
          {/* <BarChartVertical
            title="Sales Rep Sentiment Score"
            template={SalesRepSentimentScore}
            data={salesRepSentimentScore}
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
              <Chart
                title="Affirmation"
                percent={`${salesRepSentimentScore["affirmation"]}%`}
              />
              <Chart
                title="Confidence and Assurance"
                percent={`${salesRepSentimentScore["confidence_and_assurance"]}%`}
              />
              <Chart
                title="Benefits and Advantages"
                percent={`${salesRepSentimentScore["benefits_and_advantages"]}%`}
              />
              <Chart
                title="Collaborative Language"
                percent={`${salesRepSentimentScore["collaborative_language"]}%`}
              />
              <Chart
                title="Solution Oriented Language"
                percent={`${salesRepSentimentScore["solution_oriented_language"]}%`}
              />
              <Chart
                title="Customer Centric Approach"
                percent={`${salesRepSentimentScore["customer_centric_approach"]}%`}
              />
            </ChartContainer>
          </div>
          <CallSentiment callSentimentData={callSentimentData} />
        </div>
        <div className="w-[100%] lg:w-[46%] md:w-[46%] flex flex-wrap flex-col gap-6">
          {/* <BarChartVertical
            title="Satisfaction Score"
            template={SatisfactionScore}
            data={satisfactionScore}
          /> */}
          <div className="w-[100%] p-6 h-[400px] bg-[#fff] rounded-md shrink-0  py-[19px] shadow-md">
            <div className="w-[100%] flex items-center justify-between">
              <h1 className="text-[20px] font-medium text-[#3F434A] tracking-wide">
                Satisfaction Score
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
              {satisfactionScore.map((item) => (
                <Chart
                  key={item.title}
                  title={item.title}
                  percent={`${item.score}%`}
                />
              ))}
            </ChartContainer>
          </div>
          {/* <BarChartVertical
            title="Performance Rate"
            template={PerformanceRate}
            data={avgCallScore}
          /> */}
          <div className="w-[100%] p-6 h-[400px] bg-[#fff] rounded-md shrink-0  py-[19px] shadow-md">
            <div className="w-[100%] flex items-center justify-between">
              <h1 className="text-[20px] font-medium text-[#3F434A] tracking-wide">
                Performance Rate
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
          <NoiseAndVolumeChart />
        </div>
      </div>
    );
  }
};

export default EngagementReports;
