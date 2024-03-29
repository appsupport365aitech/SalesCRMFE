import axios from "axios";
import { useRouter } from "next/router";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedInStatus, setUser1 } from "@/store/auth";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import BigSpinner from "@/components/loader/BigSpinner";
import Navbar from "@/components/app/Navbar/Navbar";
import { baseUrl } from "@/utils/baseUrl";

const SalesClose = React.lazy(() => import("@/views/sales/close"));

export default function Open() {
  const state = useSelector((state) => state.auth);
  const router = useRouter();

  const dispatch = useDispatch();
  const [logged] = useLocalStorage("logged", "loading");
  const [id] = useLocalStorage("user-id", "not-loaded");
  const [name] = useLocalStorage("user-name", "not-loaded");
  const [role] = useLocalStorage("user-role", "not-loaded");
  const [data, setData] = useState({});
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    if (window !== undefined) {
      setAccessToken(localStorage.getItem("access-token"));
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${baseUrl}api/leads/find-all?leadStatus=Close`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {});
  }, [accessToken]);

  React.useEffect(() => {
    const doACall = async () => {
      // const res = axios.post(
      //   `https://${ExotelKey}:${ExotelToken}@api.exotel.com/v3/accounts/westoryboard1/calls`,
      //   {
      //     from: {
      //       contact_uri: "+9199XXXXXXX",
      //       state_management: "true",
      //     },
      //   }
      // );
    };
    // doACall();
  }, []);

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
    }
  }, [state.isLoggedIn, logged]);

  return (
    <>
      <Navbar mainTitle="Sales" title="Closed" src="salesIcon" />
      <Suspense fallback={<BigSpinner />}>
        {!state.isLoggedIn || logged === null ? (
          <BigSpinner />
        ) : (
          <Suspense fallback={<BigSpinner />}>
            <SalesClose data={data} />
          </Suspense>
        )}
      </Suspense>
    </>
  );
}

// export async function getServerSideProps({ query, ...params }: any) {
//   const response = await axios.get(
//     "https://sales365.trainright.fit/api/leads/find-all?leadStatus=Close"
//   );
//   return {
//     props: {
//       // TODO: Can do better error handling here by passing another property error in the component
//       data: response.data || {},
//     }, // will be passed to the page component as props
//   };
// }
