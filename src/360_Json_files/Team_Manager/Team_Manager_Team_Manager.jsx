import { CONTAINER } from "../../components/utils/Const";

const HEADER = {
  type: CONTAINER_365,
  className: "homeHeader",

  children: [
    {
      type: "PAGE_HEADER",
      url: "/",
      image: "Dashboard",
      title: "dashBoard",
      titleMobile: "Dashboard",
      className: "page_header_comp",
    },
    {
      dataKey: "data_Key",
      label: "searchHere",
      name: "searchHere",
      requiredErrorMessage: "",
      type: "TEXT_INPUT",
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
    name: "dashBoard",
    path: "/dashBoard",
    icon: "DASHBOARD",
  },
  {
    name: "sales",
    path: "/sales",
    icon: "sales",
  },
  {
    name: "Call",
    path: "/call",
    icon: "Call",
  },
];

export const Team_Manger_Team = {
  name: "Team_Manger",

  children: [
    HEADER,

    {
      type: SIDE_MENU_365,
      items: MENU_ITEMS,
      className: "menu_comp",
      text: "Menu",
    },
    {
      type: SELECT,
      sliceName: "filter",
      name: "My Team",
      label: "Sort By",
      className: "filterbutton",
      onClickApi: API_ENDPOINTS[GET_LIST_OF_MY_TEAM],
      zIndex: 89,
    },
    {
      type: SELECT,
      sliceName: "filter",
      name: "last_days",
      label: "Sort By",
      className: "filterbutton",
      onClickApi: API_ENDPOINTS[days],
      zIndex: 89,
    },

    {
      type: PAGES_365,
      Pageslist: [
        {
          type: CONTAINER,
          name: "Activity",
          children: [
            {
              type: "AUTO_FETCH_API",
              api: " API_ENDPOINTS[GET_CARD_DEALS_DEATILS]",
              className: "header",
              params: { sortType: "desc" },
            },
            {
              type: "AUTO_FETCH_API",
              api: " API_ENDPOINTS[GET_TABLE_DATA]",
              className: "header",
              params: { sortType: "desc" },
            },

            {
              type: DYNAMIC_CARD_CONTAINER_365,
              loadingApi: "GET_CARD_DEALS_DEATILS]",
              sliceName: "filter",
              className: "result-searchdiv",
              apiName: "GET_CARD_DEALS_DEATILS]",
              paginatioName: "searchPage",
              defaultPage: 1,
              cardPerPage: 5,
              name: "Search Card",
              onClickApi: "API_ENDPOINTS[GET_CARD_DEALS_DEATILS]]",
              onClickApiMethod: "POST",
              renderComponentsInLoop: {
                type: "SEARCH_CARD",
                className: "homeCards",
              },
              cardClickApi: "API_ENDPOINTS[GET_CARD_DATA]",
              cardClickNavigate: "/",
              cardClickApiType: "GET",
            },
            {
              type: DASHBOARD_LISTING,
              data: {},
              desktopHeaders: {
                "Team member": "Team member",
                "Open leads": "Open leads",
                "Close Leads": "Close Leads ",
                "Lead Won": "Lead Won",
                "Lead Lost": "Lead Lost",
                "Lead Dead": "Lead Dead",
              },
              mobileHeaders: {
                "Team member": "Team member",
                "Open leads": "Open leads",
                "Close Leads": "Close Leads ",
                "Lead Won": "Lead Won",
                "Lead Lost": "Lead Lost",
                "Lead Dead": "Lead Dead",
              },

              fieldConst: "newPropertyConst",
              editApi: "ALTER_TABLE_DATA",
              deleteApi: "DELETE_TABLE_DATA",
              getDataApi: "GET_TABLE_DATA",
              approveApi: "APPROVE_TABLE_DATA",
              endpoint: "API_ENDPOINTS[GET_TABLE_DATA]",
              dataPoint: "GET_TABLE_DATA",
              onRefreshApiType: POST,
              disableRowModal: true,
              showPreviewButton: true,
            },
          ],
        },
        {
          type: CONTAINER,
          name: "interation",
          children: [
            {
              type: PAGES_365,
              Pageslist: [
                {
                  type: CONTAINER,
                  name: "Team Trends",
                  children: [
                    {
                      type: "AUTO_FETCH_API",
                      api: "API_ENDPOINTS[GET_CARD_DEALS_DEATILS]",
                      className: "header",
                      params: { sortType: "desc" },
                    },
                    {
                      type: DYNAMIC_CARD_CONTAINER_365,
                      loadingApi: "GET_SEARCH_RESULT",
                      sliceName: "filter",
                      className: "result-searchdiv",
                      apiName: "GET_SEARCH_RESULT",
                      paginatioName: "searchPage",
                      defaultPage: 1,
                      cardPerPage: 5,
                      name: "Search Card",
                      onClickApi: "API_ENDPOINTS[GET_SEARCH_RESULT]",
                      onClickApiMethod: "POST",
                      renderComponentsInLoop: {
                        type: "SEARCH_CARD",
                        className: "homeCards",
                      },
                      cardClickApi: "API_ENDPOINTS[GET_CARD_DATA]",
                      cardClickNavigate: "/builderFloorDetails",
                      cardClickApiType: "GET",
                    },
                  ],
                },
                {
                  name: "Team",
                  children: [
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
                                "Team Manager": "teamManager",
                                "Talk Ratio": "talkRatio",
                                "Longest Monologue": "longestMonologue",
                                "Longest Customer Story":
                                  "longestCustomerStory",
                                Interactivity: "Interactivity",
                                Patience: "Patience",
                                "Question Rate": "questionRate",
                              },
                              mobileHeaders: {
                                "Team Manager": "teamManager",
                                "Talk Ratio": "talkRatio",
                                "Longest Monologue": "longestMonologue",
                                "Longest Customer Story":
                                  "longestCustomerStory",
                                Interactivity: "Interactivity",
                                Patience: "Patience",
                                "Question Rate": "questionRate",
                              },

                              fieldConst: "newPropertyConst",
                              editApi: "ALTER_INTERACTION_TEAM_DATA",
                              deleteApi: "DELETE_INTERACTION_TEAM_CALL_DATA",
                              getDataApi: "GET_INTERACTION_TEAM_CALL",
                              approveApi: "APPROVE_INTERACTION_TEAM_CALL_DATA",
                              endpoint:
                                "API_ENDPOINTS[GET_INTERACTION_TEAM_CALL]",
                              dataPoint: "GET_INTERACTION_TEAM_CALL",
                              onRefreshApiType: POST,
                              disableRowModal: true,
                              showPreviewButton: true,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  name: "Individual",
                  children: [
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
                                "Team Manager": "teamManager",
                                "Talk Ratio": "talkRatio",
                                "Longest Monologue": "longestMonologue",
                                "Longest Customer Story":
                                  "longestCustomerStory",
                                Interactivity: "Interactivity",
                                Patience: "Patience",
                                "Question Rate": "questionRate",
                              },
                              mobileHeaders: {
                                "Team Manager": "teamManager",
                                "Talk Ratio": "talkRatio",
                                "Longest Monologue": "longestMonologue",
                                "Longest Customer Story":
                                  "longestCustomerStory",
                                Interactivity: "Interactivity",
                                Patience: "Patience",
                                "Question Rate": "questionRate",
                              },

                              fieldConst: "newPropertyConst",
                              editApi: "ALTER_INTERACTION_INDIVIDUAL_DATA",
                              deleteApi:
                                "DELETE_INTERACTION_INDIVIDUAL_CALL_DATA",
                              getDataApi: "GET_INTERACTION_INDIVIDUAL_CALL",
                              approveApi:
                                "APPROVE_INTERACTION_INDIVIDUAL_CALL_DATA",
                              endpoint:
                                "API_ENDPOINTS[GET_INTERACTION_INDIVIDUAL_CALL]",
                              dataPoint: "GET_INTERACTION_INDIVIDUAL_CALL",
                              onRefreshApiType: POST,
                              disableRowModal: true,
                              showPreviewButton: true,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },

        //third
        {
          name: "Talking Point",
          children: [
            {
              type: PAGES_365,
              Pageslist: [
                {
                  type: CONTAINER,
                  name: "Overall Talking Points Duration",
                  children: [
                    {
                      type: SELECT,
                      className: "select-call-title-button",
                      sliceName: "filter",
                      name: "Call Title",
                      defaultValue: {
                        label: "Product Discussion",
                        value: "productDiscussion",
                      },
                      options: [
                        {
                          label: "Product Discussion",
                          value: "productDiscussion",
                        },
                      ],
                      onClickApi: "API_ENDPOINTS[GET_SEARCH_RESULT]",
                      onClickApiMethod: "POST",
                    },
                    {
                      type: SELECT,
                      className: "select-call-date-button",
                      sliceName: "filter",
                      name: "Call Date",
                      defaultValue: {
                        label: "2020/12/13",
                        value: "2020/12/13",
                      },
                      options: [{ label: "2020/12/13", value: "2020/12/13" }],
                      onClickApi: "API_ENDPOINTS[GET_SEARCH_RESULT]",
                      onClickApiMethod: "POST",
                    },
                    {
                      type: SELECT,
                      className: "select-company-name-button",
                      sliceName: "filter",
                      name: "Company Name",
                      defaultValue: { label: "ABC Corp", value: "ABCCorp" },
                      options: [{ label: "ABC Corp", value: "ABCCorp" }],
                      onClickApi: "API_ENDPOINTS[GET_SEARCH_RESULT]",
                      onClickApiMethod: "POST",
                    },
                    {
                      type: SELECT,
                      className: "select-call-owner-button",
                      sliceName: "filter",
                      name: "Call Owner",
                      defaultValue: { label: "John", value: "john" },
                      options: [{ label: "Jhon", value: "john" }],
                      onClickApi: "API_ENDPOINTS[GET_SEARCH_RESULT]",
                      onClickApiMethod: "POST",
                    },
                    {
                      type: SELECT,
                      className: "select-product-button",
                      sliceName: "filter",
                      name: "Product/Service",
                      defaultValue: { label: "Product A", value: "Product b" },
                      options: [{ label: "Product A", value: "Product b" }],
                      onClickApi: "API_ENDPOINTS[GET_SEARCH_RESULT]",
                      onClickApiMethod: "POST",
                    },
                    {
                      type: SELECT,
                      className: "select-call-type-button",
                      sliceName: "filter",
                      name: "Call Type",
                      defaultValue: {
                        label: "Product Demo",
                        value: "productDemo",
                      },
                      options: [
                        { label: "Product Demo", value: "productDemo" },
                      ],
                      onClickApi: "API_ENDPOINTS[GET_SEARCH_RESULT]",
                      onClickApiMethod: "POST",
                    },
                    {
                      type: SELECT,
                      className: "select-call-disposition-button",
                      sliceName: "filter",
                      name: "Call Disposition",
                      defaultValue: {
                        label: "Follow-up required",
                        value: "followUp",
                      },
                      options: [
                        { label: "Follow-up required", value: "followUp" },
                      ],
                      onClickApi: "API_ENDPOINTS[GET_SEARCH_RESULT]",
                      onClickApiMethod: "POST",
                    },
                    {
                      type: LOGIN_REFRESH,
                      name: "List Of Calls",
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
                                "Call Title": "callTitle",
                                "Call Duration": "callDuration",
                                "Call Date And Time": "callDateTime",
                                "Call Owner": "callOwner",
                                "Call Participants": "callParticipants",
                              },
                              mobileHeaders: {
                                "Call Title": "callTitle",
                                "Call Duration": "callDuration",
                                "Call Date And Time": "callDateTime",
                                "Call Owner": "callOwner",
                                "Call Participants": "callParticipants",
                              },

                              fieldConst: "newPropertyConst",
                              editApi:
                                "ALTER_OVERALL_TALKING_POINTS_DURATION_LIST_DATA",
                              deleteApi:
                                "DELETE_OVERALL_TALKING_POINTS_DURATION_LIST_DATA",
                              getDataApi:
                                "GET_OVERALL_TALKING_POINTS_DURATION_LIST",
                              approveApi:
                                "APPROVE_OVERALL_TALKING_POINTS_DURATION_LIST_DATA",
                              endpoint:
                                "API_ENDPOINTS[GET_OVERALL_TALKING_POINTS_DURATION_LIST]",
                              dataPoint:
                                "GET_OVERALL_TALKING_POINTS_DURATION_LIST",
                              onRefreshApiType: POST,
                              disableRowModal: true,
                              showPreviewButton: true,
                            },
                          ],
                        },
                      ],
                    },
                    {
                      type: LOGIN_REFRESH,
                      name: "Talking points",
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
                                "Talking Points": "talkingPoints",
                                "Total Duration": "totalDuration",
                                "Average Duration": "averageDuration",
                              },
                              mobileHeaders: {
                                "Talking Points": "talkingPoints",
                                "Total Duration": "totalDuration",
                                "Average Duration": "averageDuration",
                              },

                              fieldConst: "newPropertyConst",
                              editApi: "ALTER_OVERALL_TALKING_POINTS_DATA",
                              deleteApi: "DELETE_OVERALL_TALKING_POINTS_DATA",
                              getDataApi: "GET_OVERALL_TALKING_POINTS",
                              approveApi: "APPROVE_OVERALL_TALKING_POINTS_DATA",
                              endpoint:
                                "API_ENDPOINTS[GET_OVERALL_TALKING_POINTS]",
                              dataPoint: "GET_OVERALL_TALKING_POINTS",
                              onRefreshApiType: POST,
                              disableRowModal: true,
                              showPreviewButton: true,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  name: "Particular Talking Points Timing",
                  children: [
                    {
                      type: SELECT,
                      className: "select-call-date-button",
                      sliceName: "filter",
                      name: "Call Date",
                      defaultValue: {
                        label: "2020/12/13",
                        value: "2020/12/13",
                      },
                      options: [{ label: "2020/12/13", value: "2020/12/13" }],
                      onClickApi: "API_ENDPOINTS[GET_SEARCH_RESULT]",
                      onClickApiMethod: "POST",
                    },
                    {
                      type: SELECT,
                      className: "select-company-name-button",
                      sliceName: "filter",
                      name: "Company Name",
                      defaultValue: { label: "ABC Corp", value: "ABCCorp" },
                      options: [{ label: "ABC Corp", value: "ABCCorp" }],
                      onClickApi: "API_ENDPOINTS[GET_SEARCH_RESULT]",
                      onClickApiMethod: "POST",
                    },
                    {
                      type: SELECT,
                      className: "select-call-owner-button",
                      sliceName: "filter",
                      name: "Call Owner",
                      defaultValue: { label: "John", value: "john" },
                      options: [{ label: "Jhon", value: "john" }],
                      onClickApi: "API_ENDPOINTS[GET_SEARCH_RESULT]",
                      onClickApiMethod: "POST",
                    },
                    {
                      type: SELECT,
                      className: "select-product-button",
                      sliceName: "filter",
                      name: "Product/Service",
                      defaultValue: { label: "Product A", value: "Product b" },
                      options: [{ label: "Product A", value: "Product b" }],
                      onClickApi: "API_ENDPOINTS[GET_SEARCH_RESULT]",
                      onClickApiMethod: "POST",
                    },
                    {
                      type: SELECT,
                      className: "select-call-type-button",
                      sliceName: "filter",
                      name: "Call Type",
                      defaultValue: {
                        label: "Product Demo",
                        value: "productDemo",
                      },
                      options: [
                        { label: "Product Demo", value: "productDemo" },
                      ],
                      onClickApi: "API_ENDPOINTS[GET_SEARCH_RESULT]",
                      onClickApiMethod: "POST",
                    },
                    {
                      type: SELECT,
                      className: "select-call-disposition-button",
                      sliceName: "filter",
                      name: "Call Disposition",
                      defaultValue: {
                        label: "Follow-up required",
                        value: "followUp",
                      },
                      options: [
                        { label: "Follow-up required", value: "followUp" },
                      ],
                      onClickApi: "API_ENDPOINTS[GET_SEARCH_RESULT]",
                      onClickApiMethod: "POST",
                    },
                    {
                      type: SELECT,
                      className: "select-call-title-button",
                      sliceName: "filter",
                      name: "Call Title",
                      defaultValue: {
                        label: "Product Discussion",
                        value: "productDiscussion",
                      },
                      options: [
                        {
                          label: "Product Discussion",
                          value: "productDiscussion",
                        },
                      ],
                      onClickApi: "API_ENDPOINTS[GET_SEARCH_RESULT]",
                      onClickApiMethod: "POST",
                    },
                    {
                      type: SELECT,
                      className: "select-talking-point-button",
                      sliceName: "filter",
                      name: "Select Talking Point",
                      defaultValue: {
                        label: "New Leads",
                        value: "newLeads",
                      },
                      options: [{ label: "New Leads", value: "newLeads" }],
                      onClickApi: "API_ENDPOINTS[GET_SEARCH_RESULT]",
                      onClickApiMethod: "POST",
                    },
                    {
                      type: LOGIN_REFRESH,
                      name: "Particular Talking Points",
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
                                "Talking Members": "talkingMembers",
                                "Total Time": "totalTime",
                                "Average Duration": "averageDuration",
                              },
                              mobileHeaders: {
                                "Talking Members": "talkingMembers",
                                "Total Time": "totalTime",
                                "Average Duration": "averageDuration",
                              },

                              fieldConst: "newPropertyConst",
                              editApi: "ALTER_PARTICULAR_TALKING_POINTS_DATA",
                              deleteApi:
                                "DELETE_PARTICULAR_TALKING_POINTS_DATA",
                              getDataApi: "GET_PARTICULAR_TALKING_POINTS",
                              approveApi:
                                "APPROVE_PARTICULAR_TALKING_POINTS_DATA",
                              endpoint:
                                "API_ENDPOINTS[GET_PARTICULAR_TALKING_POINTS]",
                              dataPoint: "GET_PARTICULAR_TALKING_POINTS",
                              onRefreshApiType: POST,
                              disableRowModal: true,
                              showPreviewButton: true,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  name: "Team Discussion",
                  children: [
                    {
                      type: SELECT,
                      className: "select-call-date-button",
                      sliceName: "filter",
                      name: "Call Date",
                      defaultValue: {
                        label: "2020/12/13",
                        value: "2020/12/13",
                      },
                      options: [{ label: "2020/12/13", value: "2020/12/13" }],
                      onClickApi: "API_ENDPOINTS[GET_SEARCH_RESULT]",
                      onClickApiMethod: "POST",
                    },
                    {
                      type: SELECT,
                      className: "select-company-name-button",
                      sliceName: "filter",
                      name: "Company Name",
                      defaultValue: { label: "ABC Corp", value: "ABCCorp" },
                      options: [{ label: "ABC Corp", value: "ABCCorp" }],
                      onClickApi: "API_ENDPOINTS[GET_SEARCH_RESULT]",
                      onClickApiMethod: "POST",
                    },
                    {
                      type: SELECT,
                      className: "select-call-owner-button",
                      sliceName: "filter",
                      name: "Call Owner",
                      defaultValue: { label: "John", value: "john" },
                      options: [{ label: "Jhon", value: "john" }],
                      onClickApi: "API_ENDPOINTS[GET_SEARCH_RESULT]",
                      onClickApiMethod: "POST",
                    },
                    {
                      type: SELECT,
                      className: "select-product-button",
                      sliceName: "filter",
                      name: "Product/Service",
                      defaultValue: { label: "Product A", value: "Product b" },
                      options: [{ label: "Product A", value: "Product b" }],
                      onClickApi: "API_ENDPOINTS[GET_SEARCH_RESULT]",
                      onClickApiMethod: "POST",
                    },
                    {
                      type: SELECT,
                      className: "select-call-type-button",
                      sliceName: "filter",
                      name: "Call Type",
                      defaultValue: {
                        label: "Product Demo",
                        value: "productDemo",
                      },
                      options: [
                        { label: "Product Demo", value: "productDemo" },
                      ],
                      onClickApi: "API_ENDPOINTS[GET_SEARCH_RESULT]",
                      onClickApiMethod: "POST",
                    },
                    {
                      type: SELECT,
                      className: "select-call-disposition-button",
                      sliceName: "filter",
                      name: "Call Disposition",
                      defaultValue: {
                        label: "Follow-up required",
                        value: "followUp",
                      },
                      options: [
                        { label: "Follow-up required", value: "followUp" },
                      ],
                      onClickApi: "API_ENDPOINTS[GET_SEARCH_RESULT]",
                      onClickApiMethod: "POST",
                    },
                    {
                      type: SELECT,
                      className: "select-call-title-button",
                      sliceName: "filter",
                      name: "Call Title",
                      defaultValue: {
                        label: "Product Discussion",
                        value: "productDiscussion",
                      },
                      options: [
                        {
                          label: "Product Discussion",
                          value: "productDiscussion",
                        },
                      ],
                      onClickApi: "API_ENDPOINTS[GET_SEARCH_RESULT]",
                      onClickApiMethod: "POST",
                    },
                    {
                      type: LOGIN_REFRESH,
                      name: "Team Discussion",
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
                                "Talking Points": "talkingPoints",
                                "Total Time": "totalTime",
                                "Average Duration": "averageDuration",
                              },
                              mobileHeaders: {
                                "Talking Points": "talkingPoints",
                                "Total Time": "totalTime",
                                "Average Duration": "averageDuration",
                              },

                              fieldConst: "newPropertyConst",
                              editApi: "ALTER_TEAM_DISCUSSION_DATA",
                              deleteApi: "DELETE_TEAM_DISCUSSION_DATA",
                              getDataApi: "GET_TEAM_DISCUSSION",
                              approveApi: "APPROVE_TEAM_DISCUSSION_DATA",
                              endpoint: "API_ENDPOINTS[GET_TEAM_DISCUSSION]",
                              dataPoint: "GET_TEAM_DISCUSSION",
                              onRefreshApiType: POST,
                              disableRowModal: true,
                              showPreviewButton: true,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  name: "Individual Discussion",
                  children: [
                    {
                      type: SELECT,
                      className: "select-call-date-button",
                      sliceName: "filter",
                      name: "Call Date",
                      defaultValue: {
                        label: "2020/12/13",
                        value: "2020/12/13",
                      },
                      options: [{ label: "2020/12/13", value: "2020/12/13" }],
                      onClickApi: "API_ENDPOINTS[GET_SEARCH_RESULT]",
                      onClickApiMethod: "POST",
                    },
                    {
                      type: SELECT,
                      className: "select-company-name-button",
                      sliceName: "filter",
                      name: "Company Name",
                      defaultValue: { label: "ABC Corp", value: "ABCCorp" },
                      options: [{ label: "ABC Corp", value: "ABCCorp" }],
                      onClickApi: "API_ENDPOINTS[GET_SEARCH_RESULT]",
                      onClickApiMethod: "POST",
                    },
                    {
                      type: SELECT,
                      className: "select-call-owner-button",
                      sliceName: "filter",
                      name: "Call Owner",
                      defaultValue: { label: "John", value: "john" },
                      options: [{ label: "Jhon", value: "john" }],
                      onClickApi: "API_ENDPOINTS[GET_SEARCH_RESULT]",
                      onClickApiMethod: "POST",
                    },
                    {
                      type: SELECT,
                      className: "select-product-button",
                      sliceName: "filter",
                      name: "Product/Service",
                      defaultValue: { label: "Product A", value: "Product b" },
                      options: [{ label: "Product A", value: "Product b" }],
                      onClickApi: "API_ENDPOINTS[GET_SEARCH_RESULT]",
                      onClickApiMethod: "POST",
                    },
                    {
                      type: SELECT,
                      className: "select-call-type-button",
                      sliceName: "filter",
                      name: "Call Type",
                      defaultValue: {
                        label: "Product Demo",
                        value: "productDemo",
                      },
                      options: [
                        { label: "Product Demo", value: "productDemo" },
                      ],
                      onClickApi: "API_ENDPOINTS[GET_SEARCH_RESULT]",
                      onClickApiMethod: "POST",
                    },
                    {
                      type: SELECT,
                      className: "select-call-disposition-button",
                      sliceName: "filter",
                      name: "Call Disposition",
                      defaultValue: {
                        label: "Follow-up required",
                        value: "followUp",
                      },
                      options: [
                        { label: "Follow-up required", value: "followUp" },
                      ],
                      onClickApi: "API_ENDPOINTS[GET_SEARCH_RESULT]",
                      onClickApiMethod: "POST",
                    },
                    {
                      type: SELECT,
                      className: "select-call-title-button",
                      sliceName: "filter",
                      name: "Call Title",
                      defaultValue: {
                        label: "Product Discussion",
                        value: "productDiscussion",
                      },
                      options: [
                        {
                          label: "Product Discussion",
                          value: "productDiscussion",
                        },
                      ],
                      onClickApi: "API_ENDPOINTS[GET_SEARCH_RESULT]",
                      onClickApiMethod: "POST",
                    },
                    {
                      type: SELECT,
                      className: "select-call-type-button",
                      sliceName: "filter",
                      name: "Team Member",
                      defaultValue: { label: "Xavier", value: "Xavier" },
                      options: [{ label: "Xavier", value: "Xavier" }],
                      onClickApi: "API_ENDPOINTS[GET_SEARCH_RESULT]",
                      onClickApiMethod: "POST",
                    },
                    {
                      type: LOGIN_REFRESH,
                      name: "Individual Discussion",
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
                                "Talking Points": "talkingPoints",
                                "Total Time": "totalTime",
                                "Average Duration": "averageDuration",
                              },
                              mobileHeaders: {
                                "Talking Points": "talkingPoints",
                                "Total Time": "totalTime",
                                "Average Duration": "averageDuration",
                              },

                              fieldConst: "newPropertyConst",
                              editApi: "ALTER_INDIVIDUAL_DISCUSSION_DATA",
                              deleteApi: "DELETE_INDIVIDUAL_DISCUSSION_DATA",
                              getDataApi: "GET_INDIVIDUAL_DISCUSSION",
                              approveApi: "APPROVE_INDIVIDUAL_DISCUSSION_DATA",
                              endpoint:
                                "API_ENDPOINTS[GET_INDIVIDUAL_DISCUSSION]",
                              dataPoint: "GET_INDIVIDUAL_DISCUSSION",
                              onRefreshApiType: POST,
                              disableRowModal: true,
                              showPreviewButton: true,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },

        //forth
        {
          name: "Indicators",
          children: [
            {
              type: PAGES_365,
              Pageslist: [
                {
                  type: CONTAINER,
                  name: "Overall Indicators Use",
                  children: [
                    {
                      type: SELECT,
                      sliceName: "filter",
                      name: "call Title",
                      label: "Sort By",
                      className: "filterbutton",
                      onClickApi: API_ENDPOINTS[call_Title],
                      zIndex: 89,
                    },
                    //for time

                    {
                      type: DASHBOARD_LISTING,
                      data: {},
                      desktopHeaders: {
                        Indicators: "Indicators",
                        "% of Calls": "% of Calls",
                      },
                      mobileHeaders: {
                        Indicators: "Indicators",
                        "% of Calls": "% of Calls",
                      },

                      fieldConst: "newPropertyConst",
                      editApi: "",
                      deleteApi: "",
                      getDataApi: "GET_INDICATOR_DATA",
                      approveApi: "",
                      endpoint: "API_ENDPOINTS[]",
                      dataPoint: "",
                      onRefreshApiType: POST,
                      disableRowModal: true,
                      showPreviewButton: true,
                    },
                  ],
                },
                {
                  type: CONTAINER,
                  name: "Particular Indicators Use",
                  children: [
                    {
                      type: SELECT,
                      sliceName: "filter",
                      name: "call Title",
                      label: "Sort By",
                      className: "filterbutton",
                      onClickApi: API_ENDPOINTS[call_Title],
                      zIndex: 89,
                    },
                    {
                      type: SELECT,
                      sliceName: "filter",
                      name: "Select Particlar Indicators",
                      label: "Sort By",
                      className: "filterbutton",
                      onClickApi: API_ENDPOINTS[Select_Particlar],
                      zIndex: 89,
                    },
                    //for time

                    {
                      type: DASHBOARD_LISTING,
                      data: {},
                      desktopHeaders: {
                        Message: "Message",
                        Contacts: "Contacts",
                      },
                      mobileHeaders: {
                        Indicators: "Indicators",
                        "% of Calls": "% of Calls",
                      },

                      fieldConst: "newPropertyConst",
                      editApi: "",
                      deleteApi: "",
                      getDataApi: "GET_INDICATOR_DATA",
                      approveApi: "",
                      endpoint: "API_ENDPOINTS[]",
                      dataPoint: "",
                      onRefreshApiType: POST,
                      disableRowModal: true,
                      showPreviewButton: true,
                    },
                  ],
                },
                {
                  type: CONTAINER,
                  name: "Teams Discussion",
                  children: [
                    {
                      type: SELECT,
                      sliceName: "filter",
                      name: "call Title",
                      label: "Sort By",
                      className: "filterbutton",
                      onClickApi: API_ENDPOINTS[call_Title],
                      zIndex: 89,
                    },
                    //for time

                    {
                      type: DASHBOARD_LISTING,
                      data: {},
                      desktopHeaders: {
                        Process: "Process",
                        Reference: "Reference",
                      },
                      mobileHeaders: {
                        Process: "Process",
                        Reference: "Reference",
                      },

                      fieldConst: "newPropertyConst",
                      editApi: "",
                      deleteApi: "",
                      getDataApi: "GET_INDICATOR_DATA",
                      approveApi: "",
                      endpoint: "API_ENDPOINTS[]",
                      dataPoint: "",
                      onRefreshApiType: POST,
                      disableRowModal: true,
                      showPreviewButton: true,
                    },
                  ],
                },
                {
                  type: CONTAINER,
                  name: "Individual Discussion",
                  children: [
                    {
                      type: SELECT,
                      sliceName: "filter",
                      name: "call Title",
                      label: "Sort By",
                      className: "filterbutton",
                      onClickApi: API_ENDPOINTS[call_Title],
                      zIndex: 89,
                    },
                    {
                      type: SELECT,
                      sliceName: "filter",
                      name: "Team Member",
                      label: "Sort By",
                      className: "filterbutton",
                      onClickApi: API_ENDPOINTS[Team_Member],
                      zIndex: 89,
                    },
                    //for time

                    {
                      type: DASHBOARD_LISTING,
                      data: {},
                      desktopHeaders: {
                        Process: "Process",
                        Reference: "Reference",
                      },
                      mobileHeaders: {
                        Process: "Process",
                        Reference: "Reference",
                      },

                      fieldConst: "newPropertyConst",
                      editApi: "",
                      deleteApi: "",
                      getDataApi: "GET_INDICATOR_DATA",
                      approveApi: "",
                      endpoint: "API_ENDPOINTS[]",
                      dataPoint: "",
                      onRefreshApiType: POST,
                      disableRowModal: true,
                      showPreviewButton: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
