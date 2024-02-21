import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Card } from "@mui/material";

const uData = [0, 0, 0, 0, 0, 0, 0];
const pData = [0, 0, 0, 0, 0, 0, 0];
const xLabels = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];

const Chart = ({ title, percent1, percent2 }) => {
  const [hovered, setHovered] = React.useState(false);

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
const ChartContainer = ({ children }) => {
  return (
    <div className="w-full h-[220px] mt-[40px] flex">
      <div className="w-[4%] h-[100%] flex flex-col justify-between items-center text-[#8A9099]">
        <p>30</p>
        <p>20</p>
        <p>10</p>
        <p className="mb-[20px]">0</p>
      </div>
      <div className="w-full h-[100%] flex justify-between pr-[30px] pl-[30px]">
        {children}
      </div>
    </div>
  );
};

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
      {/* <BarChart
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
      /> */}
      <ChartContainer>
        <Chart title={xLabels[0]} percent1={uData[0]} percent2={pData[0]} />
        <Chart title={xLabels[1]} percent1={uData[1]} percent2={pData[1]} />
        <Chart title={xLabels[2]} percent1={uData[2]} percent2={pData[2]} />
        <Chart title={xLabels[3]} percent1={uData[3]} percent2={pData[3]} />
        <Chart title={xLabels[4]} percent1={uData[4]} percent2={pData[4]} />
        <Chart title={xLabels[5]} percent1={uData[5]} percent2={pData[5]} />
        <Chart title={xLabels[6]} percent1={uData[6]} percent2={pData[6]} />
      </ChartContainer>
    </Card>
  );
};

export default TalkRatio;
