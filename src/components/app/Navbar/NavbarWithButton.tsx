import React, { useState, useRef, useEffect } from "react";
import { getBasicIcon, getRoundedAvatar } from "@/utils/AssetsHelper";
import { useAppDispatch } from "@/store/store";
import { triggerMenu } from "@/store/UI";
import Image from "next/image";
import ButtonDropDown from "@/utils/Button/Button";
import { logout, setLoggedInStatus } from "@/store/auth";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import useUI from "@/hooks/useUI";
import { title } from "process";
import Button from "@/utils/Button/Button";

const Search = ({ change, handleSerachBar }: any) => {
  const ref: any = useRef();
  return (
    <>
      <div
        className="h-[40px] relative border-[#ccc] border-[1px] rounded-[12px]  flex items-center"
        ref={ref}
      >
        <div className="grow h-[32px] px-[12px] ">
          <input
            type="text"
            onChange={change}
            className="w-[100%] h-[32px] bg-white outline-0 text-black "
            placeholder="Search Here..."
          />
        </div>
        <div className="h-[100%] w-[40px] px-[12px] flex items-center justify-center cursor-pointer ">
          <Image
            onClick={handleSerachBar}
            className="w-[100%] "
            src={getBasicIcon("Search")}
            alt=""
            // fill={true}
            width={30}
            height={30}
            style={{
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </>
  );
};

const NavbarWithButton = ({ mainTitle, title, buttons, src }: any) => {
  const { menuOpen } = useUI();
  const [view, setView] = React.useState(false);
  const dispatch = useAppDispatch();
  const state = useSelector((state: any) => state.auth);
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [userName, setUserName] = useState("");

  const handleSerachBar = () => {
    setShowSearch(!showSearch);
  };
  useEffect(() => {
    if (typeof window !== undefined) {
      setUserName(window.localStorage.getItem("user-name") || "");
    }
  }, []);

  return (
    <div className="w-full h-[60px] border-b-[1px] border-[#eaebec]  bg-white flex items-center justify-between">
      <div className="flex gap-2">
        <Image
          src={src ? getBasicIcon(src) : getBasicIcon("Grid")}
          className="ml-[20px] cursor-pointer"
          alt=""
          // fill={true}
          style={{
            objectFit: "contain",
          }}
          width={20}
          height={40}
        />
        <div className="flex gap-2">
          <h1 className="text-lg font-normal text-[black]">{mainTitle}</h1>
          {title && (
            <div className="flex gap-2">
              <h1 className="text-lg font-normal text-[black]">{">"}</h1>
              <h1 className="text-lg font-normal capitalize text-bg-red">
                {title}
              </h1>
            </div>
          )}
        </div>
      </div>
      <div className=" flex justify-evenly items-center">
        <div className="mr-3">
          {buttons?.length > 0 && (
            <div className="flex justify-end ">
              {buttons.map((item: any, i: number) => {
                return (
                  <Button
                    dropdown={item.dropdown}
                    click={item.click}
                    value={item.value}
                    list={item.list}
                    icon={item.icon}
                    text={item.text}
                    id={item.id}
                    onClick1={item.onClick1}
                    key={i}
                    light={item.light}
                    dark={item.dark}
                  />
                );
              })}
            </div>
          )}
        </div>
        <div>
          {showSearch ? (
            <Search
              handleSerachBar={handleSerachBar}
              placeHolder="Search Here..."
              change={({ e }: any) => setSearch(e.target.value)}
              view={view}
            />
          ) : (
            <Image
              onClick={handleSerachBar}
              className="w-[100%] cursor-pointer"
              src={getBasicIcon("Search")}
              alt=""
              // fill={true}
              width={30}
              height={30}
              style={{
                objectFit: "contain",
              }}
            />
          )}
        </div>
        <div>
          <Image
            src={getBasicIcon("Bell")}
            className="ml-[20px] cursor-pointer"
            alt=""
            onClick={() => {}}
            // fill={true}
            style={{
              objectFit: "contain",
            }}
            width={20}
            height={40}
          />
        </div>
        <div>
          <Image
            className="ml-[20px] h-[100%] cursor-pointer"
            src={getRoundedAvatar(1, 30)}
            alt=""
            // fill={true}
            style={{
              objectFit: "contain",
            }}
            width={30}
            height={40}
            // onClick={() => {
            //   dispatch(logout());
            //   dispatch(setLoggedInStatus(false));
            //   router.replace("/login");
            //   localStorage.clear();
            // }}
          />
        </div>
        <div>
          <ButtonDropDown
            dropdown={true}
            list={[{ title: "Logout" }]}
            click={() => {
              dispatch(logout());
              dispatch(setLoggedInStatus(false));
              router.replace("/login");
              localStorage.clear();
            }}
            text={userName}
            id={0}
            light={true}
            dark={false}
          />
        </div>
      </div>
    </div>
  );
};

export default NavbarWithButton;
