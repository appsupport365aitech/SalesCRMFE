import Sidebar from "@/components/app/Sidebar/index";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

const HomeLayout = ({ children }: any) => {
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    const resize = () => {
      setWidth(window.innerWidth);
    };
    resize();
    window.addEventListener("resize", resize, false);
  });
  const State = useSelector((state: any) => state.auth);
  const router = useRouter();
  const noSidebarFor = ["/login", "/forgot-password", "/reset-password"];
  return (
    <div className="w-full min-h-screen bg-white flex" id="Home">
      {!noSidebarFor.includes(router.pathname) && <Sidebar />}
      <div
        className="overflow-auto h-screen"
        // style={width?{
        //   width:`${width}px !important`
        // }:{}}
        style={{
          width: width !== null ? width - 55 : "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default HomeLayout;
