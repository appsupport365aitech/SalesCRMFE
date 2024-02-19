import React, { useEffect, useState } from "react";
import EmotionalAnalysisComp from "@/components/customComponents/360_components/SRM_Bdm_Dashboard/Emotional_Analysis";
import TreeMap from "@/components/analysis/Call/Tree";
import TalkRatio from "@/components/customComponents/360_components/SRM_Bdm_Dashboard/Ratio_bar";
import BarChartVertical from "@/components/analysis/Call/Charts/BarChartVertical";
import {
  LongestMonologue,
  NoOfTopics,
  SalesRepPatienceSilence,
  LongestCustomerStory,
  NoOfSwitches,
  NoOfInterruptions,
  TalkingSpeed,
  SatisfactionScore,
} from "@/constants/chartFields";
import {
  avgCallScore,
  noOfParticipants,
  noOfTopics,
  satisfactionScore,
  talkingSpeed,
} from "@/constants/dummyData";
import GroupBarChartVertical from "@/components/analysis/Call/Charts/GroupBarChartVertical";
import NavigationWithSwitchIcon from "@/components/app/NavigationWithSwitchIcon";
import NoOfInterruptionsChart from "@/components/analysis/Call/Charts/NoOfInterruptions";
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
const CommunicationInteraction = ({
  tabData,
  pitchData,
  getPitchData,
  talkRatioData,
  noOfInterruptions,
  noOfSwitches,
}: {
  tabData?: any;
  pitchData?: any;
  getPitchData?: any;
  talkRatioData?: any;
  noOfInterruptions?: any;
  noOfSwitches?: any;
}) => {
  const [userRole, setUserRole] = useState(
    window !== undefined ? localStorage.getItem("user-role") : ""
  );
  const [options, setOptions] = useState([{ name: "Select" }]);
  const [accessToken, setAccessToken] = useState<any>("");
  const [userId, setUserId] = useState(
    window !== undefined ? localStorage.getItem("user-id") : ""
  );
  useEffect(() => {
    if (window !== undefined) {
      setAccessToken(localStorage.getItem("access-token"));
    }
  }, []);
  const [longestMonologueDataSDR, setLongestMonologueDataSDR] = useState<any>(
    []
  );
  const [longestMonologueDataManager, setLongestMonologueDataManager] =
    useState<any>([]);

  const [sdrId, setSdrId] = useState("");
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
  const getLongestMonologueDataForManager = () => {
    let url = `${baseUrl}api/dashboard/getUserLongestMonologue`;
    if (sdrId.length > 0) {
      url = `${baseUrl}api/dashboard/getUserLongestMonologue?userId=${sdrId}`;
    }
    try {
      axios
        .get(url, {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((response) => {
          setLongestMonologueDataManager(response.data.result);
        })
        .catch((error) => {
          console.error("Error fetching script building data:", error);
        });
    } catch (error) {}
  };

  const getLongestMonologueDataForSdr = () => {
    try {
      axios
        .get(`${baseUrl}api/dashboard/getLongestMonologue`, {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((response) => {
          setLongestMonologueDataSDR(response.data.result);
        })

        .catch((error) => {
          console.error("Error fetching script building data:", error);
        });
    } catch (error) {}
  };

  const data: any = {};

  if (userRole == "SDR") {
    longestMonologueDataSDR?.forEach((item: any) => {
      data[item.label.replace(/\s+/g, "_").toLowerCase()] = item.value;
    });
  } else if (userRole == "Manager") {
    longestMonologueDataManager.forEach((item: any) => {
      data[item.label.replace(/\s+/g, "_").toLowerCase()] = item.value;
    });
  }

  useEffect(() => {
    if (!accessToken) return;
    else {
      if (userRole == "SDR") {
        getLongestMonologueDataForSdr();
      } else if (userRole == "Manager") {
        getLongestMonologueDataForManager();
      }
    }
  }, [accessToken, sdrId]);

  const LongestMonologueLabels = Object.keys(data);

  const mappings: any = {};
  LongestMonologueLabels.forEach((label) => {
    mappings[label] = label;
  });

  const LongestMonologueLabelsData = {
    labels: LongestMonologueLabels,
    mappings: mappings,
  };

  // QA Analyst; QA manager; Manager, SRD/BDM
  if (tabData?.key === "Manager") {
    return (
      <div className="">
        <TreeMap getPitchData={getPitchData} data1={pitchData} />
        <div className="w-[100%] flex justify-between flex-wrap gap-2">
          <div className="w-[100%] lg:w-[48%] md:w-[48%] flex flex-col gap-6">
            <EmotionalAnalysisComp />
            <BarChartVertical
              title="Longest Monologue"
              template={LongestMonologue}
              data={avgCallScore}
              options={[
                { key: "", label: "Select Team Members" },
                { key: "", label: "John C." },
                { key: "", label: "Barbara Oaklay" },
                { key: "", label: "Diana J." },
                { key: "", label: "Jacob Wilson" },
              ]}
            />

            <TalkRatio talkRatioData={talkRatioData} />
            <BarChartVertical
              title="Number of Topics"
              template={NoOfTopics}
              data={noOfTopics}
              options={[
                { key: "", label: "Select Team Members" },
                { key: "", label: "John C." },
                { key: "", label: "Barbara Oaklay" },
                { key: "", label: "Diana J." },
                { key: "", label: "Jacob Wilson" },
              ]}
            />
          </div>
          <div className="w-[100%] lg:w-[48%] md:w-[48%] flex flex-col gap-6">
            <BarChartVertical
              title="Sales Rep's Patience/Silence"
              template={SalesRepPatienceSilence}
              data={avgCallScore}
              options={[
                { key: "", label: "Select Team Members" },
                { key: "", label: "John C." },
                { key: "", label: "Barbara Oaklay" },
                { key: "", label: "Diana J." },
                { key: "", label: "Jacob Wilson" },
              ]}
            />

            <BarChartVertical
              title="Longest Customer Story"
              template={LongestCustomerStory}
              data={avgCallScore}
              options={[
                { key: "", label: "Select Team Members" },
                { key: "", label: "John C." },
                { key: "", label: "Barbara Oaklay" },
                { key: "", label: "Diana J." },
                { key: "", label: "Jacob Wilson" },
              ]}
            />

            <NoOfInterruptionsChart
              title="Number of Interruptions"
              template={NoOfInterruptions}
              data={noOfInterruptions}
              options={[
                { key: "", label: "Select Team Members" },
                { key: "", label: "John C." },
                { key: "", label: "Barbara Oaklay" },
                { key: "", label: "Diana J." },
                { key: "", label: "Jacob Wilson" },
              ]}
            />
            <BarChartVertical
              title="Number of Switches"
              template={NoOfSwitches}
              data={noOfSwitches}
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
      </div>
    );
  } else if (tabData?.key === "QA Analyst" || tabData?.key === "QA manager") {
    return (
      <div className="">
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
        <TreeMap getPitchData={getPitchData} data1={pitchData} />
        <div className="w-[100%] flex justify-between flex-wrap gap-2">
          <div className="w-[100%] lg:w-[48%] md:w-[48%] flex flex-col gap-6">
            {/* <BarChartVertical
              title="Sales Rep's Patience/Silence"
              template={SalesRepPatienceSilence}
              data={avgCallScore}
              options={[
                { key: "", label: "Select Team Members" },
                { key: "", label: "John C." },
                { key: "", label: "Barbara Oaklay" },
                { key: "", label: "Diana J." },
                { key: "", label: "Jacob Wilson" },
              ]}
            /> */}
            <div className="w-[100%] p-6 h-[400px] bg-[#fff] rounded-md shrink-0  py-[19px] shadow-md">
              <div className="w-[100%] flex items-center justify-between">
                <h1 className="text-[20px] font-medium text-[#3F434A] tracking-wide">
                  Sales Rep&apos;s Patience/Silence
                </h1>
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
              title="Longest Customer Story"
              template={LongestCustomerStory}
              data={avgCallScore}
              options={[
                { key: "", label: "Select Team Members" },
                { key: "", label: "John C." },
                { key: "", label: "Barbara Oaklay" },
                { key: "", label: "Diana J." },
                { key: "", label: "Jacob Wilson" },
              ]}
            /> */}
            <div className="w-[100%] p-6 h-[400px] bg-[#fff] rounded-md shrink-0  py-[19px] shadow-md">
              <div className="w-[100%] flex items-center justify-between">
                <h1 className="text-[20px] font-medium text-[#3F434A] tracking-wide">
                  Longest Customer Story
                </h1>
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
            <NoOfInterruptionsChart
              title="Number of Interruptions"
              template={NoOfInterruptions}
              data={noOfInterruptions}
              options={[
                { key: "", label: "Select Team Members" },
                { key: "", label: "John C." },
                { key: "", label: "Barbara Oaklay" },
                { key: "", label: "Diana J." },
                { key: "", label: "Jacob Wilson" },
              ]}
            />
            {/* <BarChartVertical
              title="Number of Switches"
              template={NoOfSwitches}
              data={noOfSwitches}
              options={[
                { key: "", label: "Select Team Members" },
                { key: "", label: "John C." },
                { key: "", label: "Barbara Oaklay" },
                { key: "", label: "Diana J." },
                { key: "", label: "Jacob Wilson" },
              ]}
            /> */}
            <div className="w-[100%] p-6 h-[400px] bg-[#fff] rounded-md shrink-0  py-[19px] shadow-md">
              <div className="w-[100%] flex items-center justify-between">
                <h1 className="text-[20px] font-medium text-[#3F434A] tracking-wide">
                  Number of Switches
                </h1>
              </div>
              <ChartContainer>
                <Chart title="Day 1" percent={`${noOfSwitches["day_1"]}%`} />
                <Chart title="Day 2" percent={`${noOfSwitches["day_2"]}%`} />
                <Chart title="Day 3" percent={`${noOfSwitches["day_3"]}%`} />
                <Chart title="Day 4" percent={`${noOfSwitches["day_4"]}%`} />
                <Chart title="Day 5" percent={`${noOfSwitches["day_5"]}%`} />
                <Chart title="Day 6" percent={`${noOfSwitches["day_6"]}%`} />
                <Chart title="Day 7" percent={`${noOfSwitches["day_7"]}%`} />
              </ChartContainer>
            </div>
            {/* <BarChartVertical
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
            /> */}
            <div className="w-[100%] p-6 h-[400px] bg-[#fff] rounded-md shrink-0  py-[19px] shadow-md">
              <div className="w-[100%] flex items-center justify-between">
                <h1 className="text-[20px] font-medium text-[#3F434A] tracking-wide">
                  Talking Speed
                </h1>
              </div>
              <ChartContainer>
                {talkingSpeed.map((item) => (
                  <Chart
                    key={item.title}
                    title={item.title}
                    percent={`${item.score}%`}
                  />
                ))}
              </ChartContainer>
            </div>
          </div>
          <div className="w-[100%] lg:w-[48%] md:w-[48%] flex flex-col gap-6">
            {/* <BarChartVertical
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
            /> */}
            <div className="w-[100%] p-6 h-[400px] bg-[#fff] rounded-md shrink-0  py-[19px] shadow-md">
              <div className="w-[100%] flex items-center justify-between">
                <h1 className="text-[20px] font-medium text-[#3F434A] tracking-wide">
                  Satisfaction Score
                </h1>
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
              title="Longest Monologue"
              template={LongestMonologue}
              data={avgCallScore}
              options={[
                { key: "", label: "Select Team Members" },
                { key: "", label: "John C." },
                { key: "", label: "Barbara Oaklay" },
                { key: "", label: "Diana J." },
                { key: "", label: "Jacob Wilson" },
              ]}
            /> */}
            <div className="w-[100%] p-6 h-[400px] bg-[#fff] rounded-md shrink-0  py-[19px] shadow-md">
              <div className="w-[100%] flex items-center justify-between">
                <h1 className="text-[20px] font-medium text-[#3F434A] tracking-wide">
                  Longest Monologue
                </h1>
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
            <TalkRatio talkRatioData={talkRatioData} />
            {/* <BarChartVertical
              title="Number of Topics"
              template={NoOfTopics}
              data={noOfTopics}
              options={[
                { key: "", label: "Select Team Members" },
                { key: "", label: "John C." },
                { key: "", label: "Barbara Oaklay" },
                { key: "", label: "Diana J." },
                { key: "", label: "Jacob Wilson" },
              ]}
            /> */}
            <div className="w-[100%] p-6 h-[400px] bg-[#fff] rounded-md shrink-0  py-[19px] shadow-md">
              <div className="w-[100%] flex items-center justify-between">
                <h1 className="text-[20px] font-medium text-[#3F434A] tracking-wide">
                  Number of Topics
                </h1>
              </div>
              <ChartContainer>
                {noOfTopics.map((item) => (
                  <Chart
                    key={item.title}
                    title={item.title}
                    percent={`${item.score}%`}
                  />
                ))}
              </ChartContainer>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="">
        <TreeMap getPitchData={getPitchData} data1={pitchData} />
        <div className="w-[100%] flex justify-between flex-wrap gap-2">
          <div className="w-[100%] lg:w-[48%] md:w-[48%] flex flex-col gap-6">
            <EmotionalAnalysisComp />
            {/* <BarChartVertical
              title="Longest Monologue"
              template={LongestMonologue}
              data={data}
              setSdrId={setSdrId}
            /> */}
            <div className="w-[100%] p-6 h-[400px] bg-[#fff] rounded-md shrink-0  py-[19px] shadow-md">
              <div className="w-[100%] flex items-center justify-between">
                <h1 className="text-[20px] font-medium text-[#3F434A] tracking-wide">
                  Average Call Score
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
                <Chart title="Day 1" percent={`${data["day_1"]}%`} />
                <Chart title="Day 2" percent={`${data["day_2"]}%`} />
                <Chart title="Day 3" percent={`${data["day_3"]}%`} />
                <Chart title="Day 4" percent={`${data["day_4"]}%`} />
                <Chart title="Day 5" percent={`${data["day_5"]}%`} />
                <Chart title="Day 6" percent={`${data["day_6"]}%`} />
                <Chart title="Day 7" percent={`${data["day_7"]}%`} />
              </ChartContainer>
            </div>
            <TalkRatio talkRatioData={talkRatioData} />
            {/* <BarChartVertical
              title="Number of Topics"
              template={NoOfTopics}
              data={noOfTopics}
            /> */}
            <div className="w-[100%] p-6 h-[400px] bg-[#fff] rounded-md shrink-0  py-[19px] shadow-md">
              <div className="w-[100%] flex items-center justify-between">
                <h1 className="text-[20px] font-medium text-[#3F434A] tracking-wide">
                  Number of Topics
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
                {noOfTopics.map((item) => (
                  <Chart
                    key={item.title}
                    title={item.title}
                    percent={`${item.score}%`}
                  />
                ))}
              </ChartContainer>
            </div>
          </div>
          <div className="w-[100%] lg:w-[48%] md:w-[48%] flex flex-col gap-6">
            {/* <BarChartVertical
              title="Sales Rep's Patience/Silence"
              template={SalesRepPatienceSilence}
              data={avgCallScore}
            /> */}
            <div className="w-[100%] p-6 h-[400px] bg-[#fff] rounded-md shrink-0  py-[19px] shadow-md">
              <div className="w-[100%] flex items-center justify-between">
                <h1 className="text-[20px] font-medium text-[#3F434A] tracking-wide">
                  Sales Rep&apos;s Patience/Silence
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
              title="Longest Customer Story"
              template={LongestCustomerStory}
              data={avgCallScore}
            /> */}
            <div className="w-[100%] p-6 h-[400px] bg-[#fff] rounded-md shrink-0  py-[19px] shadow-md">
              <div className="w-[100%] flex items-center justify-between">
                <h1 className="text-[20px] font-medium text-[#3F434A] tracking-wide">
                  Longest Customer Story
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
            <NoOfInterruptionsChart
              title="Number of Interruptions"
              template={NoOfInterruptions}
              data={noOfInterruptions}
            />
            {/* <BarChartVertical
              title="Number of Switches"
              template={NoOfSwitches}
              data={noOfSwitches}
            /> */}
            <div className="w-[100%] p-6 h-[400px] bg-[#fff] rounded-md shrink-0  py-[19px] shadow-md">
              <div className="w-[100%] flex items-center justify-between">
                <h1 className="text-[20px] font-medium text-[#3F434A] tracking-wide">
                  Number of Switches
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
                <Chart title="Day 1" percent={`${noOfSwitches["day_1"]}%`} />
                <Chart title="Day 2" percent={`${noOfSwitches["day_2"]}%`} />
                <Chart title="Day 3" percent={`${noOfSwitches["day_3"]}%`} />
                <Chart title="Day 4" percent={`${noOfSwitches["day_4"]}%`} />
                <Chart title="Day 5" percent={`${noOfSwitches["day_5"]}%`} />
                <Chart title="Day 6" percent={`${noOfSwitches["day_6"]}%`} />
                <Chart title="Day 7" percent={`${noOfSwitches["day_7"]}%`} />
              </ChartContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CommunicationInteraction;
