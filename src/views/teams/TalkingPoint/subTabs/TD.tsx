import React, { useState } from "react";
import Table from "../../Table";
import Pagination from "../../Pagination";
import Filters from "../../Filters";

const TD = () => {
  const columns = [
    {
      width: 200,
      left: 40,
      text: "Talking Members",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Total Time",
      checked: true,
    },
    {
      width: 120,
      left: 20,
      text: "Average Duration",
      checked: true,
    },
  ];

  const [rows, setRows] = useState([
    [
      {
        text: "Security",
        // subText: "Sales Manager",
      },
      {
        text: "55 sec",
      },
      {
        text: "35 sec",
      },
    ],
    [
      {
        text: "Cost",
      },
      {
        text: "55 sec",
      },
      {
        text: "35 sec",
      },
    ],
  ]);

  const [filters, setFilters] = useState({
    callDate: {
      label: "Call Date",
      value: "",
      type: "DATE",
    },
    companyName: {
      label: "Company Name",
      options: [{ key: "ABC Corp.", label: "ABC Corp." }],
      value: "",
    },
    callOwner: {
      label: "Call Owner",
      options: [{ key: "John C.", label: "John C." }],
      value: "",
    },
    productService: {
      label: "Product/Service",
      options: [
        { key: "Product A", label: "Product A" },
        { key: "Product B", label: "Product B" },
        { key: "Product C", label: "Product C" },
        { key: "Product D", label: "Product D" },
      ],
      value: "",
    },
    callType: {
      label: "Call Type",
      options: [{ key: "Product Demo", label: "Product Demo" }],
      value: "",
    },
    callDisposition: {
      label: "Call Disposition",
      options: [{ key: "Follow-Up required", label: "Follow-Up required" }],
      value: "",
    },
    callTitle: {
      label: "Call Title",
      options: [{ key: "Product Discussion", label: "Product Discussion" }],
      value: "",
    },
  });

  const [totalItem, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currPage, setCurrPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const getData = (page = currPage) => {
    try {
    } catch (error) {}
  };

  const handlePageChange = (payload: any) => {
    if (currPage !== payload?.selected) {
      setCurrPage(payload?.selected || 0);
      getData(payload?.selected);
    }
  };

  const handleItemsPerPageChange = (val: any) => {
    setLimit(val);
  };

  return (
    <div>
      <Filters filters={filters} />
      <div className="bg-white mt-5 rounded-lg p-2">
        <Table columns={columns} rows={rows} />
      </div>
      <Pagination
        itemsPerPage={limit}
        totalItems={totalItem}
        totalPages={totalPages}
        currPage={currPage}
        updatePage={handlePageChange}
        updateItemsPerPage={handleItemsPerPageChange}
      />
    </div>
  );
};

export default TD;
