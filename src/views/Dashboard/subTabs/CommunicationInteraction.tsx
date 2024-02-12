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

  const [accessToken, setAccessToken] = useState<any>("");

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
          <div className="w-[100%] lg:w-[48%] md:w-[48%] flex flex-col gap-6">
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
            <BarChartVertical
              title="Longest Monologue"
              template={LongestMonologue}
              data={data}
              setSdrId={setSdrId}
            />
            <TalkRatio talkRatioData={talkRatioData} />
            <BarChartVertical
              title="Number of Topics"
              template={NoOfTopics}
              data={noOfTopics}
            />
          </div>
          <div className="w-[100%] lg:w-[48%] md:w-[48%] flex flex-col gap-6">
            <BarChartVertical
              title="Sales Rep's Patience/Silence"
              template={SalesRepPatienceSilence}
              data={avgCallScore}
            />
            <BarChartVertical
              title="Longest Customer Story"
              template={LongestCustomerStory}
              data={avgCallScore}
            />
            <NoOfInterruptionsChart
              title="Number of Interruptions"
              template={NoOfInterruptions}
              data={noOfInterruptions}
            />
            <BarChartVertical
              title="Number of Switches"
              template={NoOfSwitches}
              data={noOfSwitches}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default CommunicationInteraction;
