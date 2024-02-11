import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Card } from "@mui/material";

const uData = [0, 0, 0, 0, 0, 0, 0];
const pData = [0, 0, 0, 0, 0, 0, 0];
const xLabels = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];

const TalkRatio = ({ talkRatioData }) => {
  React.useEffect(() => {
    if (!talkRatioData.lengh > 0) return;
    else {
      talkRatioData?.forEach((item, index) => {
        xLabels[index] = item.day;
        uData[index] = item.speakerA;
        pData[index] = item.speakerB;
      });
    }
  }, [talkRatioData]);
  return (
    <Card className=" h-[400px] bg-[#fff] rounded-xl shrink-0 px-[19px] py-[19px]">
      <h1 className="text-[20px] font-medium text-[#3F434A] tracking-wide">
        Talk Ratio
      </h1>
      <BarChart
        width={600}
        height={300}
        series={[
          {
            data: pData,
            label: "SDR/BDM",
            id: "sdr",
            stack: "total",
            color: "#FE5143",
          },
          {
            data: uData,
            label: "Prospect",
            id: "prospect",
            stack: "total",
            color: "#FFB839",
          },
        ]}
        xAxis={[{ data: xLabels, scaleType: "band" }]}
      />
    </Card>
  );
};

export default TalkRatio;
