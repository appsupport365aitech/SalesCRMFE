import { getBasicIcon } from "@/utils/AssetsHelper";
import Image from "next/image";
import React from "react";

const DateFilter = ({
  filterData,
  onUpdate,
}: {
  filterData?: any;
  onUpdate?: any;
}) => {
  return (
    <div className="flex items-center w-[auto] justify-between bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <h2 className="font-medium">{filterData?.label}</h2>
      <input type="date" className="" value={filterData?.value} />
    </div>
  );
};

const DateRangeFilter = ({
  filterData,
  onUpdate,
}: {
  filterData?: any;
  onUpdate?: any;
}) => {
  return (
    <div className="mt-1">
      <h2 className="font-semibold text-black">{filterData?.label}</h2>
      <div className="flex items-center gap-[10px] w-[auto] justify-between bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <input
          type="date"
          id="fromDate"
          name="fromDate"
          value={filterData?.value[0]}
          onChange={(e) => onUpdate(filterData, e.target.value, 0)}
        />
        <Image
          src={getBasicIcon("InputSeperator")}
          style={{
            zIndex: 10,
          }}
          alt=""
          width={18}
          height={13}
        />
        <input
          type="date"
          id="toDate"
          name="toDate"
          value={filterData?.value[1]}
          onChange={(e) => onUpdate(filterData, e.target.value, 1)}
        />
      </div>
    </div>
  );
};

const SliderFilter = ({
  filterData,
  onUpdate,
}: {
  filterData?: any;
  onUpdate?: any;
}) => {
  return (
    <div className="leading-4">
      <h2 className="font-medium text-black">{filterData?.label}</h2>
      <div className="text-black w-56">
        <input
          className="bg-red-500"
          type="range"
          min={filterData?.min?.value}
          max={filterData?.max?.value}
          step={filterData?.step || 1}
          onChange={(e: any) => onUpdate(filterData, e.target.value)}
        />
        <div className="w[100%] flex items-center justify-between mt-[4px]">
          <span className="">{filterData?.min?.label}</span>
          <span className="">{filterData?.max?.label}</span>
        </div>
      </div>
    </div>
  );
};

const SelectFilter = ({
  filterData,
  onUpdate,
}: {
  filterData?: any;
  onUpdate?: any;
}) => {
  return (
    <div className="flex items-center w-fit gap-2 justify-between bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-[fit-content] ">
      <h2 className="font-medium">{filterData?.label}&nbsp;</h2>
      <select
        onChange={(e) => onUpdate(filterData, e.target.value)}
        className="text-red-500 px-2"
        id="countries"
      >
        <option
          selected={filterData?.value === ""}
          value={""}
          key={"option?.key"}
        ></option>
        {filterData?.options?.map((option: any, index: number) => (
          <option
            selected={filterData?.value === option?.key}
            value={option?.key}
            key={option?.key}
          >
            {option?.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const Filters = ({ filters, onUpdate }: { filters?: any; onUpdate?: any }) => {
  return (
    <div className="w[100%] flex items-end gap-[20px] h-[auto] flex-wrap shrink-1">
      {Object.keys(filters)?.map((filterKey: any, index: number) => {
        switch (filters[filterKey]?.type) {
          case "DATE":
            return (
              <DateFilter filterData={filters[filterKey]} onUpdate={onUpdate} />
            );
          case "DATERANGE":
            return (
              <DateRangeFilter
                filterData={filters[filterKey]}
                onUpdate={onUpdate}
              />
            );
          case "SLIDER":
            return (
              <SliderFilter
                filterData={filters[filterKey]}
                onUpdate={onUpdate}
              />
            );
          default:
            return (
              <SelectFilter
                filterData={filters[filterKey]}
                onUpdate={onUpdate}
              />
            );
        }
      })}
    </div>
  );
};

export default Filters;
