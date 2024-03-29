import Image from "next/image";
import React, { useState } from "react";
import { getBasicIcon } from "@/utils/AssetsHelper";
import Logo from "@/components/app/Sidebar/SidebarLogo";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedInStatus, setUser1 } from "@/store/auth";
import { useRouter } from "next/router";
import { Formik, setIn } from "formik";
import * as Yup from "yup";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { setMenuOptions } from "@/store/UI";
import axios from "axios";
import Link from "next/link";
import AuthFooter from "@/components/utils/AuthFooter";
import { baseUrl } from "@/utils/baseUrl";

const SignupSchema = Yup.object().shape({
  user: Yup.string().email("Invalid email").required("Required"),
  pass: Yup.string().required("No password provided."),
});

const AddText = ({ top, id, title, width, change }) => {
  return (
    <div
      className="w-[100%] "
      style={{
        width: width ? width : "100%",
        marginTop: top,
      }}
    >
      <p className="text-[14px] font-medium tracking-wide text-[#8a9099]">
        {title}*
      </p>
      <input
        id={id}
        onChange={(e) => {
          change(e.target.value);
        }}
        type="text"
        className="w-[100%] bg-white text-[#3f434a] border-[#e8e9eb] border-[2px] mt-[10px] rounded-[13px] py-[10px] tracking-wide text-[14px] font-medium px-[14px] h-[38px] outline-none"
      />
    </div>
  );
};
const Login = () => {
  const [show, setShow] = useState("password");
  const [invalid, setInvalid] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const setLocalData = (id, Name, role, accessToken) => {
    localStorage.setItem("user-id", id);
    localStorage.setItem("user-name", Name);
    localStorage.setItem("user-role", role);
    localStorage.setItem("logged", "loggedIn");
    localStorage.setItem("access-token", accessToken);
  };

  const [logged] = useLocalStorage("logged", "loading");
  const [id] = useLocalStorage("user-id", "not-loaded");
  const [name] = useLocalStorage("user-name", "not-loaded");
  const [role] = useLocalStorage("user-role", "not-loaded");
  const [accessToken] = useLocalStorage("access-token", "no-token");

  React.useEffect(() => {
    if (!state.isLoggedIn) {
      if (logged === "loading" || logged === "loggedIn") {
        if (id === null || name === null || role === null) {
          router.push("/login");
        }
        if (id && name && role) {
          if (
            id !== "not-loaded" &&
            name !== "not-loaded" &&
            role !== "not-loaded"
          ) {
            dispatch(setUser1({ _id: id, User: name, Role: role }));
            dispatch(setLoggedInStatus(true));
            // router.push("/sales/open");
          }
        }
      } else if (logged === null) {
        router.push("/login");
      }
    }
  }, [id, name, role, logged]);

  const submit = ({ user, pass }) => {
    setInvalid(false);
    const finalPayload = {
      email: user.toLowerCase(),
      password: pass,
    };
    axios
      .post(`${baseUrl}api/master-users/signin`, finalPayload, {
        headers: { Authorization: accessToken },
      })
      .then((res) => {
        dispatch(
          setUser1({
            _id: res.data?._id,
            User: res.data?.name,
            Role: res?.data?.role,
            accessToken: res?.data?.accessToken,
          })
        );
        dispatch(setLoggedInStatus(true));
        setLocalData(
          res.data?._id,
          res.data?.name,
          res?.data?.role,
          res?.data?.accessToken
        );
        router.push("/");
      })
      .catch((err) => {
        setInvalid(true);
      });
    // e.preventDefault();
    // api implemented

    // if (user === "Admin@gmail.com" && pass === "Password@123!") {
    //   dispatch(setUser1({ _id: 1, User: user, Role: "admin" }));
    //   dispatch(setLoggedInStatus(true));
    //   setLocalData(1, user, "admin");
    //   router.push("/sales/open");
    // } else if (user === "Sales@gmail.com" && pass === "Password@123!") {
    //   dispatch(setUser1({ _id: 1, User: user, Role: "sales-repo" }));
    //   dispatch(setLoggedInStatus(true));
    //   setLocalData(1, user, "sales-repo");
    //   router.push("/sales/open");
    // } else if (
    //   user === "Satvinder.s@westoryboard.com" &&
    //   pass === "Password@123!"
    // ) {
    //   dispatch(setUser1({ _id: 1, User: user, Role: "admin" }));
    //   dispatch(setLoggedInStatus(true));
    //   setLocalData(1, user, "admin");
    //   router.push("/sales/open");
    // } else if (user === "Manager@gmail.com" && pass === "Password@123!") {
    //   dispatch(setUser1({ _id: 1, User: user, Role: "manager" }));
    //   dispatch(setLoggedInStatus(true));
    //   setLocalData(1, user, "manager");
    //   router.push("/sales/open");
    // } else if (user === "User1234@sales365.com" && pass === "Password@123!") {
    //   dispatch(setUser1({ _id: 2, User: user, Role: "Client" }));
    //   dispatch(setLoggedInStatus(true));
    //   setLocalData(2, user, "Client");
    //   const sides = [
    //     {
    //       title: "Dashboard",
    //       route: "dashboard",
    //       icon: "Grid",
    //       list: [],
    //     },
    //     {
    //       title: "Calling",
    //       route: "calls",
    //       list: [
    //         // { title: "Upload Calls", route: "upload-calls" },
    //         { title: "Active Calls", route: "active-calls" },
    //         { title: "Recorded Calls", route: "recorded-calls" },
    //       ],

    //       icon: "Phone",
    //     },
    //     {
    //       title: "Sales",
    //       route: "sales",
    //       list: [
    //         { title: "Open", route: "open" },
    //         { title: "Closed", route: "closed" },
    //       ],
    //       icon: "Sort",
    //     },
    //     {
    //       title: "Indicator",
    //       route: "indicator",
    //       list: [{ title: "Indicator-basic", route: "basic" }],
    //       icon: "Zap",
    //     },
    //   ];
    //   dispatch(setMenuOptions(sides));
    //   // router.push("/calls/upload-calls");
    // } else {
    //   setInvalid(true);
    // }
  };

  const state = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (localStorage.getItem("user-id")) {
      router.push("/");
    }
  });
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white fixed w-[100%] h-[100%] z-1000000 top-0 left-0 ">
      <div className="w-[100%]">
        <div className="bg-white shadow-lg rounded-xl drop-shadow-2xl	 flex flex-row items-center w-[100%] h-[94vh] ">
          <div className="w-[50%] rounded-tr-2xl hidden md:flex items-center justify-center rounded-br-2xl py-4 px-12">
            <Image
              src="/Images/Logo/login_image.jpg"
              alt=""
              // fill={true}
              style={{
                objectFit: "contain",
              }}
              width={400}
              height={350}
            />
          </div>
          <Formik
            initialValues={{ user: "", pass: "" }}
            onSubmit={submit}
            validationSchema={SignupSchema}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <form className=" items-center w-[86%] md:w-[36%] rounded-xl ml-8 md:ml-0  px-[4%] bg-[#ebb5ae42] py-12">
                  <div className="">
                    <h2 className="mt-[45px] text-[30px] text-start whitespace-nowrap font-bold tracking-wide text-gray-900">
                      Welcome Back!
                    </h2>
                    <h2 className="mt-[15px] text-[20px] text-start whitespace-nowrap font-bold tracking-wide text-gray-900">
                      Login
                    </h2>
                  </div>
                  <div className="flex flex-col w-[100%] mt-[20px]">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pr-3 pl-2 pt-3 flex items-center text-sm leading-5">
                        <Image
                          src={getBasicIcon("eva_email-outline")}
                          alt="hide-icon"
                          width={18}
                          height={18}
                        />
                      </div>
                      <input
                        type="text"
                        id="username"
                        value={values.user}
                        onBlur={handleBlur("user")}
                        onChange={handleChange("user")}
                        className="w-[100%] bg-white text-[#3f434a] border-[#e8e9eb] border-[2px] mt-[10px] rounded-[13px] py-[10px] pl-7 tracking-wide text-[14px] font-medium px-[14px] h-[38px] outline-none"
                        // className="border-b-[2px] text-base font-medium px-2 py-2 bg-white text-black outline-none focus:ring-0 focus:border-gray-600"
                        placeholder="Email"
                      />
                    </div>
                    {errors.user && touched.user && (
                      <p className="block text-[#ff0000] text-start mt-[4px] font-medium tracking-wide">
                        *{errors.user}
                      </p>
                    )}
                  </div>
                  <div className="py-1 my-[10px]">
                    <div className="flex flex-col h-[95px]">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pr-3 pl-1 pt-3 flex items-center text-sm leading-5">
                          <Image
                            src={getBasicIcon("mdi_password-outline")}
                            alt="hide-icon"
                            width={18}
                            height={18}
                          />
                        </div>
                        <input
                          placeholder="Password"
                          type={show}
                          value={values.pass}
                          //         className="border-b-[2px] font-medium text-base px-2 py-2 bg-white text-black
                          // focus:outline-none focus:ring-0 focus:border-gray-600 w-full"
                          className="w-[100%] bg-white text-[#3f434a] border-[#e8e9eb] border-[2px] mt-[10px] rounded-[13px] py-[10px] tracking-wide text-[14px] font-medium px-[24px] h-[38px] outline-none"
                          id="password"
                          onChange={handleChange("pass")}
                          onBlur={handleBlur("pass")}
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 pt-2 flex items-center text-sm leading-5">
                          {show === "password" && (
                            // <svg
                            //   className="h-6 text-gray-700 cursor-pointer opacity-60 w-[17px] h-[17px]"
                            //   fill="none"
                            //   xmlns="http://www.w3.org/2000/svg"
                            //   viewBox="0 0 576 512"
                            //   onClick={() => {
                            //     setShow("text");
                            //   }}
                            // >
                            //   <path
                            //     fill="currentColor"
                            //     d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                            //   ></path>
                            // </svg>
                            <Image
                              src={getBasicIcon("Hide")}
                              alt="hide-icon"
                              width={25}
                              height={25}
                              onClick={() => {
                                setShow("text");
                              }}
                            />
                          )}

                          {show === "text" && (
                            // <svg
                            //   className="h-6 text-gray-700 cursor-pointer opacity-60 w-[17px] h-[17px]"
                            //   fill="none"
                            //   xmlns="http://www.w3.org/2000/svg"
                            //   viewBox="0 0 640 512"
                            //   onClick={() => {
                            //     setShow("password");
                            //   }}
                            // >
                            //   <path
                            //     fill="currentColor"
                            //     d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                            //   ></path>
                            // </svg>
                            <Image
                              src={getBasicIcon("Show")}
                              alt="hide-icon"
                              width={25}
                              height={25}
                              onClick={() => {
                                setShow("password");
                              }}
                            />
                          )}
                        </div>
                      </div>
                      {errors.pass && touched.pass && (
                        <p className="block text-[#ff0000] text-start mt-[8px] mb-2 font-medium tracking-wide">
                          *{errors.pass}
                        </p>
                      )}
                    </div>
                    {invalid && (
                      <p className="block text-[#ff0000]  text-start mt-[-15px] mb-[-9px] mb-2 py-3 font-medium tracking-wide">
                        *Invalid Credentials
                      </p>
                    )}
                    <div className="flex justify-between ">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-3 w-3 mr-2 dark:bg-white "
                        />
                        <p className=" text-base text-[#000] font-medium ">
                          Remember Me
                        </p>
                      </div>
                      <div>
                        <Link
                          href="/forgot-password"
                          className="text-base text-bg-red font-medium "
                        >
                          Forgot your password ?
                        </Link>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                      type="submit"
                      className=" mt-[30px] w-[100%] py-[10px] inline-block rounded-[15px] text-white font-semibold bg-bg-red hover:bg-[#ff7d6d] hover:border-bg-[#ff7d6d] "
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </>
            )}
          </Formik>
        </div>
        <AuthFooter />
      </div>
    </div>
  );
};

export default Login;
