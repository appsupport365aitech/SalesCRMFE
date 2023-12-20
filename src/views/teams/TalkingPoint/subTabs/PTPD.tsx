import React, { useState } from 'react'
import Table from '../../Table'
import Pagination from '../../Pagination';
import Filters from '../../Filters';

const PTPD = () => {
    const columns = [
        {
            width: 200,
            left: 40,
            text: "Talking Members",
        },
        {
            width: 120,
            left: 20,
            text: "Total Time",
        },
        {
            width: 120,
            left: 20,
            text: "Average Duration",
        },
    ];

    const [rows, setRows] = useState([
        [
            {
                text: "John",
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
                text: "Xavier",
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
                text: "Mitest",
                // subText: "Sales Manager",
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
            options: [
                { key: "ABC Corp.", label: "ABC Corp." },
            ],
            value: "",
        },
        callOwner: {
            label: "Call Owner",
            options: [
                { key: "John C.", label: "John C." },
            ],
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
            options: [
                { key: "Product Demo", label: "Product Demo" },
            ],
            value: "",
        },
        callDisposition: {
            label: "Call Disposition",
            options: [
                { key: "Follow-Up required", label: "Follow-Up required" },
            ],
            value: "",
        },
        callTitle: {
            label: "Call Title",
            options: [
                { key: "Product Discussion", label: "Product Discussion" },
            ],
            value: "",
        },
        selectTalkingPoint: {
            label: "Select Talking Point",
            options: [
                { key: "New Leads", label: "New Leads" },
            ],
            value: "",
        },
    });

    return (
        <div>
            <Filters filters={filters} />
            <Table columns={columns} rows={rows} />
            <Pagination />
        </div>
    )
}

export default PTPD