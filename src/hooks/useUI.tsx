import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function useUI() {
  const ui = useSelector((state: any) => state.ui);
  const auth = useSelector((state: any) => state.auth);
  const [role, setRole] = useState("SDR");

  useEffect(() => {
    if (typeof window !== undefined) {
      setRole(auth.user.role || localStorage.getItem("user-role"));
    }
  }, [role]);

  let menuOptions = ui.menuOptions;

  switch (role) {
    // team manager - Manager
    case "Manager":
      menuOptions = [
        {
          title: "Dashboard",
          route: "dashboard",
          icon: "Grid",
          list: [],
        },
        {
          title: "Sales",
          route: "sales",
          list: [
            { title: "Leads to Allocate", route: "leads-to-allocate" },
            { title: "Allocated Leads", route: "allocated-leads" },
            { title: "Closed", route: "closed" },
          ],
          icon: "salesIcon",
        },
        {
          title: "Calling",
          route: "calls",
          list: [
            { title: "Active Calls", route: "active-calls" },
            { title: "Recorded Calls", route: "recorded-calls" },
          ],
          icon: "fluent_call-end-16-regular",
        },
        {
          title: "Indicator",
          route: "indicator",
          list: [{ title: "Indicator-basic", route: "basic" }],
          icon: "Zap",
        },
        // {
        //   title: "Teams",
        //   route: "teams",
        //   icon: "Teams",
        //   list: [],
        // },
      ];
      break;
    case "QA Analyst":
      menuOptions = [
        {
          title: "Dashboard",
          route: "dashboard",
          icon: "Grid",
          list: [],
        },
        {
          title: "Active Calls",
          route: "calls/active-calls",
          list: [
            { title: "Allocated Calls", route: "allocated-calls" },
            { title: "Feedback Call Reviews", route: "feedback-call-reviews" },
          ],
          icon: "ActiveCalls",
        },
        {
          title: "Closed Calls",
          route: "calls/closed-calls",
          list: [
            { title: "Allocated Calls", route: "allocated-calls" },
            { title: "Feedback Call Reviews", route: "feedback-call-reviews" },
          ],
          icon: "ClosedCalls",
        },
        {
          title: "Indicator",
          route: "indicator",
          list: [{ title: "Indicator-basic", route: "basic" }],
          icon: "Zap",
        },
      ];
      break;
    case "QA manager":
      menuOptions = [
        {
          title: "Insights",
          route: "dashboard",
          icon: "Insights",
          list: [],
        },
        {
          title: "Calls",
          route: "calls",
          list: [],
          icon: "fluent_call-end-16-regular",
        },
        {
          title: "Indicator",
          route: "indicator",
          list: [{ title: "Indicator-basic", route: "basic" }],
          icon: "Zap",
        },
      ];
      break;
    case "Admin":
    case "BDR":
    case "SDR":
    default:
      menuOptions = [
        {
          title: "Dashboard",
          route: "dashboard",
          icon: "Grid",
          list: [],
        },
        {
          title: "Sales",
          route: "sales",
          list: [
            { title: "Open", route: "open" },
            { title: "Closed", route: "closed" },
          ],
          icon: "salesIcon",
        },
        {
          title: "Calls",
          route: "calls",
          list: [
            { title: "Active Calls", route: "active-calls" },
            { title: "Recorded Calls", route: "recorded-calls" },
          ],
          icon: "Phone",
        },
        // {
        //   title: "Indicator",
        //   route: "indicator",
        //   list: [{ title: "Indicator-basic", route: "basic" }],
        //   icon: "Indicators",
        // },
      ];
  }

  return {
    menuOpen: ui.menuOpen,
    menuOptions: menuOptions,
    loading: auth.isLoggedIn,
  };
}

export default useUI;
