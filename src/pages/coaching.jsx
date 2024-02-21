import Navigation from "@/components/app/Navigation";
import React from "react";

const Coaching = () => {
  return (
    <div className="w-[100%] min-h-[90vh] pl-[40px] pr-[40px]">
      {/* <Navigation  /> */}
      <Navigation
        title={"Coaching"}
        buttons={[
          {
            text: "View",
            dropdown: true,
            id: 0,
            light: false,
            dark: true,
            list: [
              {
                title: "Table View",
                Icon: "List 2",
              },
              {
                title: "Kanban View",
                Icon: "Grid",
              },
            ],
          },
          {
            text: "Add Lead",
            dropdown: true,
            id: 1,
            icon: "Plus",
            light: false,
            dark: false,
            list: [
              { title: "Using Form", Icon: "Text" },
              { title: "Import Leads", Icon: "Download" },
            ],
          },
          {
            text: "",
            dropdown: true,
            id: 1,
            icon: "Download",
            light: true,
            dark: false,
            list: [
              // { title: "Print", Icon: "Printer" },
              // { title: "Excel", Icon: "Excel" },
              // { title: "PDF", Icon: "PDF" },
              // { title: "CSV", Icon: "CSV" },
            ],
          },
        ]}
      />
      <h1 className="text-[40px] inter text-black">Coaching</h1>
    </div>
  );
};

export default Coaching;
