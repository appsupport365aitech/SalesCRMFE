import { CONTAINER, CONTAINER_365, DASHBOARD_LISTING, LOGIN_REFRESH, POST, SELECT, SIDE_MENU_365 } from "../../components/utils/Const";
import { API_ENDPOINTS } from "../../redux/utils/api";

//Add leads dropdown
const leads_ITEMS = [
  {
    name: "Using Form",
    path: "/using_form",
    
  },
  {
    name: "Import Leads",
    path: "/import_leads",
   
  },
  {
      name: "Add Company",
      path: "/add  company",
  },
  {
      name: "Add Contact",
      path: "/add  contact",
  
  },

];

export const Add_leads_dropdown= {
    type: "HAMBURGER_MENU",
    items: leads_ITEMS,
    className: "menu_comp",
    text: "Add leads",
    icon: "Add",
  };

const HEADER = {
    type: CONTAINER_365,
    className: "homeHeader",
    
    children: [
      {
        type: "PAGE_HEADER",
        url: "/",
        image: "Sales> Leads to Allocate",
        title: "Sales> Leads to Allocate",
        titleMobile: "Sales> Leads to Allocate",
        className: "page_header_comp",
      },
      {
        dataKey: "data_Key",
        label: "searchHere",
        name: "searchHere",
        icon: "search ",
        requiredErrorMessage: "",
        type: "TEXT_INPUT",
      },
      {
        name: "Notification",
        label: "notification",
        icon:" bell_notification",
        dataKey: "text",
        type: "click",
        isRequired: " True",
        requiredErrorMessage: ".",
      },
      {
        name: "user_profile",
        label: "User",
        icon:" user-icon",
        dataKey: "text",
        type: "click",
        isRequired: " True",
        requiredErrorMessage: ".",
      },
    ],
  };
  
  //menu item of sidebar
  const MENU_ITEMS = [
    {
      name: "Home",
      path: "/",
      icon: "HOME_logo",
    },
    {
      name: "Dashboard",
      path: "/Dashboard",
      icon: "Dashboard",
    },
    {
        name: "Sales",
        path: "/Sales",
        icon: "Sales",
    },
    {
      name: "Calls",
      path: "/Calls",
      icon: "Calls",
    },
    {
      name: "Indicators",
      path: "/Indicators",
      icon: "Indicators",
    },
    {
        name: "Team Manager",
        path: "/Team Manager",
        icon: "Team Manager",
    },
  ];

export const Sales_Leads_To_Allocate={
    name:"Leads To Allocate",

    children:[
        HEADER,

        {
            type: SIDE_MENU_365,
            items: MENU_ITEMS,
            className: "menu_comp",
            text: "Menu",
          },


          {
            type:"PAGES_365",
           Pageslist:[
            {
          type: CONTAINER,
                name:"Leads To Allocate ",
                children:[
                  ///FETCH DATA OF COLUMN
                  {
                    type: "AUTO_FETCH_API_USER",
                    api: "API_ENDPOINTS[GET_SALES_LEADS_TO_ALLOCATE]",
                    data: {
                      sortType: "desc",
                      sortColumn: "updatedAt"
                    },
                    method: POST,
                    className: "header",
                    user: true,
                  },
                  {
                    dataKey: "text",
                    label: "search leads",
                    name: "search leads",
                    icon: " search",
                    requiredErrorMessage: "",
                    type: "TEXT_INPUT",
                  }, 
                  {
                    type: SELECT,
                    className: "select-Action-button",
                    sliceName: "filter",
                    name: "Action",
                    defaultValue: { label: "Allocate To", value: "Regina Cooper" , Value: "Jacob Hawkins"},
                    options: [{ label: "Change Lead Status", value: "Open" , Value: "Close"}],
                    options: [{ label: "Change Lead stage", value: "ENquiry" , Value: "Interaction", Value: "Proposal" }],
                    onClickApi: "API_ENDPOINTS[GET_SEARCH_RESULT]",
                    onClickApiMethod: "POST",
                  },
                  {
                    type: "HAMBURGER_MENU",
                  items: leads_ITEMS,
                  className: "menu_comp",
                  text: "Add leads",
                  icon: "Add",
                },
                  {
                    name: "Download",
                    label: "Download",
                    icon:  " download",
                    dataKey: "",
                    type: "click",
                    isRequired: " True",
                    requiredErrorMessage: ".",
                  },
                  {
                    type: SELECT,
                    className: "select-Lead Status-button",
                    sliceName: "filter",
                    name: "Lead Status",
                    isRequired: "True",
                    defaultValue: { label: "Open", value: "Open" },
                    options: [{ label: "Closed", value: "Closed" }],
                    onClickApi: API_ENDPOINTS,
                    onClickApiMethod: POST,
                  },
                  {
                    type: SELECT,
                    className: "select-Lead Stage-button",
                    sliceName: "filter",
                    name: "Lead Stage",
                    isRequired: "True",
                    defaultValue: { label: "Enquiry", value: "Enquiry" },
                    options: [{ label: "Closed", value: "Closed" }],
                    onClickApi: API_ENDPOINTS,
                    onClickApiMethod: POST,
                  },
                  {
                    type: SELECT,
                    className: "select-product/service-button",
                    sliceName: "filter",
                    name: "Product/service",
                    defaultValue: { label: "Product A", value: "Product b" },
                    options: [{ label: "Product A", value: "Product b" }],
                    onClickApi: "API_ENDPOINTS[GET_SEARCH_RESULT]",
                    onClickApiMethod: "POST",
                  },
                  {
                    type: SELECT,
                    className: "select-Lead Source-button",
                    sliceName: "filter",
                    name: "Lead Source",
                    isRequired: "True",
                    defaultValue: { label: "Website", value: "Website" },
                    options: [{ label: "Instagram", value: "Instagram" }],
                    options: [{ label: "Facebook", value: "Facebook" }],
                    onClickApi: API_ENDPOINTS,
                    onClickApiMethod: POST,
                  },
                  {
                    fromDate: {
                      dataKey: "Call Date Start",
                      label: "From Call Date Start",
                      name: "Call Date Start",
                      type: "DATE_PICKER"
                    },
                    toDate: {
                      dataKey: "Call End Date",
                      label: "Call End Date",
                      name: "Call end Date",
                      type: "DATE_PICKER"
                    }
                  },
                
                  {
                    type: LOGIN_REFRESH,
                    name: "",
                    className: "",
                    children: [
                      {
                        type: CONTAINER,
                        name: "",
                        className: "",
                        children: [
                          {
                            type: DASHBOARD_LISTING,
                            data: {},
                            desktopHeaders: {
                             "Lead ID": "Lead ID ",
                             "Lead Title": "Lead Title",
                             "Company Name": "Company Name",
                             "Client POC": "Client POC",
                             "Contact ": "Contact",
                             " Lead Status": " Lead Status",
                             "Lead Stage": " Lead Stage",
                              "Produtc/Service": "Product/Service",
                              "Lead Allocated To":"Lead Allocated To",
                              "Lead Allocated On":"Lead Allocated On ",
                              "Lead Allocated By":"Lead Allocated By",
                              "Lead Allocation Status": "Lead Allocation Status  ",
                              "Lead Created On": "Lead Created On",
                              
                            },
                            mobileHeaders: {
                                "Lead ID": "Lead ID ",
                                "Lead Title": "Lead Title",
                                "Company Name": "Company Name",
                                "Client POC": "Client POC",
                                "Contact ": "Contact",
                                " Lead Status": " Lead Status",
                                "Lead Stage": " Lead Stage",
                                 "Produtc/Service": "Product/Service",
                                 "Lead Allocated To":"Lead Allocated To",
                                 "Lead Allocated On":"Lead Allocated On ",
                                 "Lead Allocated By":"Lead Allocated By",
                                 "Lead Allocation Status": "Lead Allocation Status  ",
                                 "Lead Created On": "Lead Created On",
                                 
                            },
                      
                            fieldConst: "newPropertyConst",
                            editApi: "ALTER_SALES_LEADS_TO_ALLOCATE_DATA",
                            deleteApi: "DELETE_SALES_LEADS_TO_ALLOCATE_DATA",
                            getDataApi: "GET_SALES_LEADS_TO_ALLOCATE",
                            approveApi: "APPROVE_SALES_LEADS_TO_ALLOCATE_DATA",
                            endpoint: 'API_ENDPOINTS[GET_SALES_LEADS_TO_ALLOCATE]',
                            dataPoint: "GET_SALES_LEADS_TO_ALLOCATE",
                            onRefreshApiType: POST,
                            disableRowModal: true,
                            showPreviewButton: true
                          },
                        ],
                      },
                    ],
                  },
                 
          
                ]

            },

        ]
    }
    ]};

