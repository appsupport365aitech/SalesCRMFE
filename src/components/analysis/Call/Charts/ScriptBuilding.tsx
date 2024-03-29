import ButtonDropDown from "@/utils/Button/Button";
import DatePicker from "@/utils/Button/DatePicker";
import React, { useState, useEffect } from "react";

const Chart = ({ title, percent }: any) => {
  return (
    <div className="w-[10px] h-[100%] flex flex-col items-center relative">
      <div className="w-[30px] h-[100%] mb-[15px] bg-[#f7f8ff] rounded-t-[19px] relative overflow-hidden">
        <div
          className="w-[100%] bg-bg-red bottom-0 absolute rounded-t-[19px]"
          style={{ height: percent }}
        ></div>
      </div>
      <div className="text-[10px] min-h-[40px] flex items-center justify-center tracking-sm font-medium text-[#8A9099] text-center absolute bottom-[-35px]">
        {title}
      </div>
    </div>
  );
};

const ChartContainer = ({ children }: any) => {
  return (
    <div className="w-[100%] h-[280px] mt-[40px] flex">
      <div className="w-[8%] h-[100%] flex flex-col justify-between items-center text-[#8A9099]">
        <p>100</p>
        <p>75</p>
        <p>50</p>
        <p>25</p>
        <p className="mb-[20px]">0</p>
      </div>
      <div className="w-[92%] h-[100%] flex justify-between pr-[30px] pl-[30px]">
        {children}
      </div>
    </div>
  );
};

const ScriptBuilding = ({
  script,
  getScriptData,
}: any) => {
  const [startDate, setStartDate] = useState("2023-07-19");
  const [endDate, setEndDate] = useState("2023-07-26");
  useEffect(() => {
    getScriptData([startDate, endDate]);
  }, [startDate, endDate]);
  return (
    <div className="w-[800px] h-[450px] bg-[#fff] rounded-xl shrink-0 px-[19px] py-[19px]">
      <div className="w-[100%] flex items-center justify-between">
        <h1 className="text-[20px] font-medium text-[#3F434A] tracking-wide">
          Script Building Blocks
        </h1>
        <div className="flex">
          <DatePicker
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
          <ButtonDropDown
            dark={false}
            light={true}
            text={"Team A"}
            border={true}
            id={1}
            dropdown={true}
            list={[]}
          />
        </div>
      </div>
      <ChartContainer>
        {/* percent={`${script.closing}%`} */}
        <Chart title={"Opening"} percent={`${script.opening}%`} />
        <Chart
          title={"Lead Qualififcation"}
          percent={`${script.lead_qualification}%`}
        />
        <Chart title={"Need Discovery"} percent={`${script.need_discovery}%`} />
        <Chart
          title={"Key Value Proposition"}
          percent={`${script.key_value_proposition}%`}
        />
        <Chart
          title={"Product Knowledge"}
          percent={`${script.product_knowledge}%`}
        />
        <Chart
          title={"Price Discussion"}
          percent={`${script.price_discussion}%`}
        />
        <Chart title={"Closing"} percent={`${script.closing}%`} />
      </ChartContainer>
    </div>
  );
};

export default ScriptBuilding;
