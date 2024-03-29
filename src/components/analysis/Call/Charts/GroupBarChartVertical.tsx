import { Card } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import React from "react";

const GroupBarChartVertical = ({
  title = "",
  groups = [
    { label: "SDR/BDM", color: "#FE5143", key: "sdr" },
    { label: "Prospect", color: "#FFB839", key: "prospect" },
  ],
  data,
  template,
  options = null
}: any) => {
  const xLabels = template?.labels?.map(
    (label: string, index: number) => template?.mappings?.[label]
  );

  let series: any[] = [];

  groups?.forEach((group: any, gIdx: number) => {
    const barData = template?.labels?.map((label: string, index: number) => {
      return data?.[group?.key]?.[label] || 0;
    });
    const seriesEntry = {
      data: barData,
      color: group?.color,
      label: group?.label,
    };
    series.push(seriesEntry);
  });

  return (
    <Card className="w-[auto] h-[auto] bg-[#fff] rounded-xl shrink-0 px-[19px] py-[19px]">
      <div className="flex justify-between items-center">
        <h1 className="text-[20px] font-medium text-[#3F434A] tracking-wide">
          {title}
        </h1>
        {options && (
          <select className="text-black" name="option" id="option">
            {
              options?.map((option: any, index: number) => (
                <option key={index} value={option?.key}>{option?.label}</option>
              ))
            }
          </select>
        )}
      </div>
      <div className="chart-container">
        {data && (
          <BarChart
            xAxis={[{ scaleType: "band", data: xLabels }]}
            series={series}
            width={550}
            height={330}
          />
        )}
      </div>
    </Card>
  );
};

export default GroupBarChartVertical;
