import React, { useEffect, useState } from "react";
import DealsCard from "@/components/customComponents/360_components/cardDeals";
import StageWiseAnalysis from "@/components/analysis/Call/Charts/StageWiseAnalysis";
import DealAnalysis from "@/components/customComponents/360_components/SRM_Bdm_Dashboard/Deal_Analytics";
import BarChartVertical from "@/components/analysis/Call/Charts/BarChartVertical";
import Top_Call from "@/components/customComponents/360_components/table_TOPcall";
import Leaderboard from "@/components/customComponents/360_components/TOP_leaderBoard";
import {
  AvgCallScore,
  NoOfQuesAsked,
  SellingSkills,
  HighIntentCallVolume,
} from "@/constants/chartFields";
import { avgCallScore, highIntentCallVolume } from "@/constants/dummyData";
import { BarChart } from "@mui/x-charts";
import axios from "axios";
import { baseUrl } from "@/utils/baseUrl";
import { Card } from "@mui/material";

const SalesPerformance = ({
  tabData,
  sellingData,
  getSellingData,
  avgCallScores,
  noOfQuesAsked,
  dealAnalytics,
}: {
  tabData?: any;
  sellingData?: any;
  getSellingData?: any;
  avgCallScores?: any;
  noOfQuesAsked?: any;
  dealAnalytics?: any;
}) => {
  // SDR/BDM; Manager
  if (tabData?.key === "Manager") {
    return (
      <div className="w-[100%] mt-4">
        <div className="flex w-[100%] justify-between flex-wrap gap-4 py-4">
          <DealsCard
            label="Open Deals"
            icon="/Images/Icons/Basic/UpArrow.svg"
            count={100}
            percent={58.8}
          />
          <DealsCard
            label="Closed Deals"
            icon="/Images/Icons/Basic/DownArrow.svg"
            count={76}
            percent={50}
          />
          <DealsCard
            label="Lost Deals"
            icon="/Images/Icons/Basic/BottomArrow.svg"
            count={18}
            percent={27.3}
          />
        </div>
        <div className="w-[100%] flex justify-between flex-wrap mt-5">
          <div className="w-[52%] flex flex-col gap-6 ">
            <BarChartVertical
              getSellingData={getSellingData}
              title="Selling Skills"
              data={sellingData}
              template={SellingSkills}
              options={[
                { key: "", label: "Select Team Members" },
                { key: "", label: "John C." },
                { key: "", label: "Barbara Oaklay" },
                { key: "", label: "Diana J." },
                { key: "", label: "Jacob Wilson" },
              ]}
            />
            <BarChartVertical
              title="Average Call Score"
              template={AvgCallScore}
              data={avgCallScores}
              options={[
                { key: "", label: "Select Team Members" },
                { key: "", label: "John C." },
                { key: "", label: "Barbara Oaklay" },
                { key: "", label: "Diana J." },
                { key: "", label: "Jacob Wilson" },
              ]}
            />
            <BarChartVertical
              title="Number of Questions Asked"
              template={NoOfQuesAsked}
              data={noOfQuesAsked}
              options={[
                { key: "", label: "Select Team Members" },
                { key: "", label: "John C." },
                { key: "", label: "Barbara Oaklay" },
                { key: "", label: "Diana J." },
                { key: "", label: "Jacob Wilson" },
              ]}
            />
            <DealAnalysis dealAnalytics={dealAnalytics} />
          </div>
          <div className="w-[46%] flex flex-col gap-6">
            <Leaderboard />
            <Top_Call />
            <BarChartVertical
              title="High Intent Call Volume"
              template={HighIntentCallVolume}
              data={highIntentCallVolume}
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
      <div className="w-[100%] mt-4">
        <div className="flex w-[100%] justify-between flex-wrap gap-4 py-4">
          <DealsCard
            label="Open Deals"
            icon="/Images/Icons/Basic/UpArrow.svg"
            count={100}
            percent={58.8}
          />
          <DealsCard
            label="Closed Deals"
            icon="/Images/Icons/Basic/DownArrow.svg"
            count={76}
            percent={50}
          />
          <DealsCard
            label="Lost Deals"
            icon="/Images/Icons/Basic/BottomArrow.svg"
            count={18}
            percent={27.3}
          />
        </div>
        <div className="w-[100%] flex justify-between flex-wrap gap-8 lg:gap-0 mt-5">
          <div className="w-[100%] lg:w-[52%] md:w-[52%] flex flex-col gap-6 ">
            <BarChartVertical
              getSellingData={getSellingData}
              title="Selling Skills"
              data={sellingData}
              template={SellingSkills}
            />
            <BarChartVertical
              title="Average Call Score"
              template={AvgCallScore}
              data={avgCallScores}
            />
            <BarChartVertical
              title="Number of Questions Asked"
              template={NoOfQuesAsked}
              data={noOfQuesAsked}
            />
            <StageWiseAnalysis
              getSellingData={getSellingData}
              selling={sellingData}
            />
          </div>
          <div className="w-[100%] lg:w-[46%] md:w-[46%] flex flex-col gap-6">
            <Leaderboard />
            <Top_Call />
            <BarChartVertical
              title="High Intent Call Volume"
              template={HighIntentCallVolume}
              data={highIntentCallVolume}
            />
            <DealAnalysis dealAnalytics={dealAnalytics} />
          </div>
        </div>
      </div>
    );
  }
};

export default SalesPerformance;
