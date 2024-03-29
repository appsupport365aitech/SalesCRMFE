import Navbar from "@/components/app/Navbar/Navbar";
import BigSpinner from "@/components/loader/BigSpinner";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { setLoggedInStatus, setUser1 } from "@/store/auth";
import { baseUrl } from "@/utils/baseUrl";
import axios from "axios";
import { useRouter } from "next/router";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = React.lazy(() => import("@/views/Dashboard/index"));

const DashboardPage = () => {
  const state = useSelector((state) => state.auth);
  const router = useRouter();
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState({});
  const [data3, setData3] = useState({});
  const [accessToken, setAccessToken] = useState("");

  const dispatch = useDispatch();

  const [logged] = useLocalStorage("logged", "loading");
  const [id] = useLocalStorage("user-id", "not-loaded");
  const [name] = useLocalStorage("user-name", "not-loaded");
  const [role] = useLocalStorage("user-role", "not-loaded");

  const date = {
    from: "2023-07-19",
    to: "2023-07-26",
  };

  useEffect(() => {
    if (window !== undefined) {
      setAccessToken(localStorage.getItem("access-token"));
    }
  }, []);

  useEffect(() => {
    try {
      axios
        .post(`${baseUrl}api/pitch-analysis/find-one`, date, {
          headers: { Authorization: accessToken },
        })
        .then((res) => {
          setData1(res.data);
        })
        .catch((e) => {});
      axios
        .post(`${baseUrl}api/script-analysis/find-one`, date, {
          headers: { Authorization: accessToken },
        })
        .then((res) => {
          setData2(res.data);
        })
        .catch((e) => {});
      axios
        .post(`${baseUrl}api/selling-analysis/find-one`, date, {
          headers: { Authorization: accessToken },
        })
        .then((res) => {
          setData3(res.data);
        })
        .catch((e) => {});
    } catch (error) {}
  }, [accessToken]);

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
            dispatch(setLoggedInStatus(true));
            dispatch(setUser1({ _id: id, User: name, Role: role }));
          }
        }
      } else if (logged === null) {
        router.push("/login");
      }
    }
  }, [id, name, role, logged]);

  React.useEffect(() => {
    if (!state.isLoggedIn) {
      if (logged === null) {
        router.push("/login");
      }
    } else {
      if (logged === null) {
        router.push("/login");
      }
    }
  }, [state.isLoggedIn, logged]);

  return (
    <>
      <Navbar mainTitle="Dashboard" src="Grid" />
      <Suspense fallback={<BigSpinner />}>
        {!state.isLoggedIn || logged === null || logged !== "loggedIn" ? (
          <BigSpinner />
        ) : (
          <Suspense fallback={<BigSpinner />}>
            <Dashboard data={{ first: data1, second: data2, third: data3 }} />
          </Suspense>
        )}
      </Suspense>
    </>
  );
};

export default DashboardPage;

// https://sales365.trainright.fit/api/pitch-analysis/find-one

// export async function getServerSideProps({ query, ...params }: any) {

//   const response1 = await axios.post(
//     "https://sales365.trainright.fit/api/pitch-analysis/find-one",
//     date
//   );
//   const response2 = await axios.post(
//     "https://sales365.trainright.fit/api/script-analysis/find-one",
//     date
//   );
//   const response3 = await axios.post(
//     "https://sales365.trainright.fit/api/selling-analysis/find-one",
//     date
//   );

//   return {
//     props: {
//       // TODO: Can do better error handling here by passing another property error in the component
//       data1: response1.data || {},
//       data2: response2.data || {},
//       data3: response3.data || {},
//     }, // will be passed to the page component as props
//   };
// }
