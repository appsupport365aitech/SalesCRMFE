import Image from "next/image";
import React from "react";
import { getBasicIcon } from "../AssetsHelper";

const DatePicker = ({ startDate, setStartDate, endDate, setEndDate }: any) => {
  return (
    <div className="flex items-center space-x-2 bg-white dark:bg-gray-700 border-2 p-1 rounded-lg">
      <div>
        <input
          value={startDate}
          type="date"
          id="start-date"
          name="start-date"
          className="outline-none"
          onChange={(event) => setStartDate(event.target.value)}
        />
      </div>

      <Image
        src={getBasicIcon("InputSeperator")}
        style={{
          zIndex: 10,
        }}
        alt=""
        width={18}
        height={13}
      />
      <div>
        <input
          value={endDate}
          type="date"
          id="end-date"
          name="end-date"
          className="outline-none"
          onChange={(event) => setEndDate(event.target.value)}
        />
      </div>
    </div>
  );
};

export default DatePicker;
