import { getBasicIcon } from "@/utils/AssetsHelper";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";

const RenderCheckBox = ({ width, bool, onUpdate, row }: any) => {
  const [check, setCheck] = useState(false);
  React.useEffect(() => {
    if (check) {
      if (bool) {
        ref.current.checked = true;
      } else {
        ref.current.checked = false;
      }
    }
    setCheck(true);
  }, [bool]);
  const ref: any = useRef();
  return (
    <div
      className={`flex items-center justify-center h-[20px] shrink-0 `}
      style={{ width: width, flexShrink: "unset" }}
    >
      <input
        type="checkbox"
        ref={ref}
        className="checkbox"
        onChange={(e) => onUpdate(e.target.checked, row)}
      />
    </div>
  );
};

const RenderHeaderColumn = ({
  width,
  left,
  text,
  align,
  sort,
  onClick,
  showArrowDown,
  show,
}: any) => {
  if (show) {
    return (
      <div
        className={`flex items-center h-[20px] shrink-0`}
        style={{ width: width, marginLeft: left }}
      >
        {/* change the color from #000 to #222 */}
        <p
          className="text-[#222] uppercase text-[12px] font-bold tracking-wider w-[100%] "
          style={{
            textAlign: align && "center",
          }}
        >
          {text}
        </p>
        {showArrowDown && (
          <Image
            src={getBasicIcon("Arrow Down 3")}
            width={20}
            className="ml-[3px] cursor-pointer"
            height={20}
            alt=""
            onClick={() => {
              if (onClick) {
                onClick();
              }
            }}
          />
        )}
      </div>
    );
  } else {
    return null;
  }
};

const RenderHeader = ({
  columns,
  rows,
  handleSelection,
}: {
  selectAll?: boolean;
  columns?: any;
  rows?: any;
  handleSelection?: any;
}) => {
  const onSelection = (checked: boolean) => {
    handleSelection(checked);
  };

  return (
    <div className="pl-[10px] min-h-[40px] flex items-center grow border-[#ccc] border-b-[1px]">
      <RenderCheckBox width={30} onUpdate={onSelection} />
      {columns?.map((column: any, index: number) => (
        <RenderHeaderColumn
          key={index}
          width={column?.width}
          left={column?.left}
          text={column?.text}
          show={column?.checked}
        />
      ))}
    </div>
  );
};

const RenderRowItem = ({
  text,
  subText,
  width,
  left,
  type, // PRICE, DATETIME, DATE, TIME
  currency,
  show,
  link,
}: {
  text?: string;
  subText?: string;
  link?: string;
  width?: any;
  left?: any;
  type?: string;
  currency?: string;
  show?: boolean;
}) => {
  if (show) {
    return (
      <div
        className={`flex-col min-h-[20px] shrink-0`}
        style={{ width: width, marginLeft: left }}
      >
        {link ? (
          <Link href={link}>
            <span className="text-black">{text}</span>
            <span className="text-[#666]">{subText}</span>
          </Link>
        ) : (
          <>
            <span className="text-black">{text}</span>
            <span className="text-[#666]">{subText}</span>
          </>
        )}
      </div>
    );
  } else {
    return null;
  }
};

const RenderRow = ({
  rows,
  columns,
  handleSelection,
  selectedRows,
}: {
  rows?: any;
  columns?: any;
  handleSelection?: any;
  selectedRows?: any;
}) => {
  const onSelection = (checked: boolean, row: any) => {
    handleSelection(checked, row);
  };

  return rows?.map((row: any, rowIndex: number) => (
    <div
      key={rowIndex}
      className="pl-[10px] min-h-[40px] flex items-center grow border-[#ccc] border-b-[1px]"
    >
      <RenderCheckBox
        width={30}
        onUpdate={onSelection}
        row={row}
        bool={selectedRows ? selectedRows?.includes(row?.[0]?.id) : false}
      />
      {row?.map((rowItem: any, itemIndex: number) => (
        <RenderRowItem
          key={itemIndex}
          text={rowItem?.text}
          subText={rowItem?.subText}
          link={rowItem?.link}
          width={columns?.[itemIndex]?.width}
          left={columns?.[itemIndex]?.left}
          show={columns?.[itemIndex]?.checked}
        />
      ))}
    </div>
  ));
};

const Table = ({
  columns,
  rows,
  handleSelection,
  selectedRows,
}: {
  columns?: any;
  rows?: any;
  handleSelection?: any;
  selectedRows?: any;
}) => {
  return (
    <div className="w-[100%] h-[500px] overflow-y-hidden overflow-x-auto custom-scroll">
      <RenderHeader
        selectAll={false}
        columns={columns}
        handleSelection={handleSelection || (() => {})}
      />
      <RenderRow
        rows={rows}
        columns={columns}
        handleSelection={handleSelection || (() => {})}
        selectedRows={selectedRows}
      />
    </div>
  );
};

export default Table;
