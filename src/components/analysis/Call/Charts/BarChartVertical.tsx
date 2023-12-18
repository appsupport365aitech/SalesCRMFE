import { BarChart } from "@mui/x-charts";
import React from "react";

const BarChartVertical = ({ title = "", data, template }: any) => {
  const xLabels = template?.labels?.map(
    (label: string, index: number) => template?.mappings?.[label]
  );

  const barData = template?.labels?.map((label: string, index: number) => {
    return data?.[label] || 0;
  });

  return (
    <div
      className={`w-[600px] h-[300px] bg-[#fff] rounded-xl shrink-0 px-[19px] py-[19px]`}
    >
      <h1 className="text-[20px] font-medium text-[#3F434A] tracking-wide">
        {title}
      </h1>
      <div className="chart-container">
        {data && (
          <BarChart
            xAxis={[{ scaleType: "band", data: xLabels }]}
            series={[{ data: barData, color: "#FE5143" }]}
            width={580}
            height={250}
            sx={{
              //change left yAxis label styles
              // "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
              //   strokeWidth: "0.4",
              //   fill: "#ff0000"
              // },
              // change all labels fontFamily shown on both xAxis and yAxis
              // "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel": {
              //   fontFamily: "Roboto",
              // },
              // change bottom label styles
              // "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
              //   strokeWidth: "0.5",
              //   fill: "#0000FF",
              //   textWrap: "wrap",
              //   width: "40px !important",
              //   overflow: "hidden !important"
              // },
              // bottomAxis Line Styles
              // "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
              //   stroke: "#0000FF",
              //   strokeWidth: 0.4
              // },
              // leftAxis Line Styles
              // "& .MuiChartsAxis-left .MuiChartsAxis-line": {
              //   stroke: "#00000FF",
              //   strokeWidth: 0.4
              // }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default BarChartVertical;
