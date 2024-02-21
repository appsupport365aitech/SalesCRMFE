import React, { useEffect, useState } from "react";
import Navigation from "@/components/app/Navigation";
import AudioProfileContainer from "@/components/Profile/AudioProfileContainer";
import dummy from "@/shared/dummy";
import Audio from "@/components/activeCalls/audio";
import axios from "axios";
import { useSelector } from "react-redux";
import Backdrop from "@/components/View/Backdrop/Center";
import FullCall from "@/components/View/full-call";
import CallSnippet from "@/components/View/call-snippet";
import Navbar from "@/components/app/Navbar/Navbar";
import NavbarWithButton from "@/components/app/Navbar/NavbarWithButton";
import { useAppDispatch } from "@/store/store";
import { setError, setSuccess } from "@/store/ai";
import { useRouter } from "next/router";
import { baseUrl } from "@/utils/baseUrl";
//Manya will make this page

const CallProfile = () => {
  const [dataNew, setDataNew] = useState({});
  const [dataNew1, setDataNew1] = useState({});
  const [dataNew2, setDataNew2] = useState({});
  const titles = ["CALL INFO", "COMMENTS & NOTES", "COACHING"];
  const [fullCall, setFullCall] = useState(false);
  const [snippet, setSnippet] = useState(false);
  const [bool, setBool] = useState(true);

  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");
  const [qams, setQams] = useState([]);

  const router = useRouter();
  const { id } = router.query;
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    if (window !== undefined) {
      setAccessToken(localStorage.getItem("access-token"));
    }
  }, []);

  const refreshData = () => {
    axios
      .get(`${baseUrl}api/calling/find-by-id?id=${id}`, {
        headers: { Authorization: accessToken },
      })
      .then((res) => {
        setDataNew(res.data);
        axios
          .get(
            `${baseUrl}api/leads/find-by-id?id=${res?.data?.result?.leadId?._id}`,
            { headers: { Authorization: accessToken } }
          )
          .then((res2) => {
            setDataNew1(res2.data);
          })
          .catch((e) => {});
        axios
          .post(
            `${baseUrl}api/calling/call-status`,
            { sid: res.data.result.Sid, leadId: res.data.result.leadId._id },
            { headers: { Authorization: accessToken } }
          )
          .then((res3) => {
            setDataNew2(res3.data);
          })
          .catch((e) => {});
      })
      .catch((err) => {});
  };

  useEffect(() => {
    refreshData();
  }, [accessToken, id]);

  const getAllQAM = () => {
    axios
      .get(`${baseUrl}api/master-users/findAllQA_manager`, {
        headers: { Authorization: accessToken },
      })
      .then((res) => {
        setQams(
          res?.data?.result?.map((qamItem, index) => {
            return {
              title: qamItem.name,
              _id: qamItem?._id,
              name: qamItem.name,
              email: qamItem?.email,
              roles: qamItem?.roles,
            };
          })
        );
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (window !== undefined) {
      setUserId(localStorage.getItem("user-id") || "");
      setUserRole(localStorage.getItem("user-role") || "");
    }
    getAllQAM();
  }, []);

  const state = useSelector((state) => state.ui);
  const appDispatch = useAppDispatch();

  const showFull = () => {
    setFullCall(true);
  };
  const showSnippet = () => {
    setSnippet(true);
  };
  const cancelSnippet = () => {
    setBool(false);
    setTimeout(() => {
      setSnippet(false);
      setBool(true);
    }, 500);
  };
  const cancelFull = () => {
    setBool(false);
    setTimeout(() => {
      setFullCall(false);
      setBool(true);
    }, 500);
  };

  const addCall = (e, e1) => {
    if (e1 === 0) {
      showFull();
    } else if (e1 === 1) {
      showSnippet();
    }
  };

  const handleRequestFeedback = (prev, next) => {
    axios
      .post(
        `${baseUrl}api/qa/requestFeedBack`,
        {
          qaId: userId,
          qamId: qams?.[next]?._id,
          callId: dataNew?.result?._id,
        },
        { headers: { Authorization: accessToken } }
      )
      .then((res) => {
        appDispatch(
          setSuccess({
            show: true,
            success: "Feedback requested successfully.",
          })
        );
        refreshData();
      })
      .catch((err) => {
        appDispatch(
          setError({
            show: true,
            error: "Feedback request failed.",
          })
        );
      });
  };

  return (
    <>
      <NavbarWithButton
        buttons={
          dataNew?.result?.qaFeedbackReq === "requested"
            ? [
                // {
                //   text: "Share",
                //   dropdown: true,
                //   id: 1,
                //   icon: "Share",
                //   light: false,
                //   dark: true,
                //   click: addCall,
                //   list: [
                //     { title: "Full Call", Icon: "Phone" },
                //     { title: "Call Snippet", Icon: "Mail" },
                //   ],
                // },
              ]
            : [
                {
                  text: "Request Feedback",
                  dropdown: true,
                  id: 2,
                  light: false,
                  dark: false,
                  // icon: "",
                  list: qams,
                  click: handleRequestFeedback,
                },
                // {
                //   text: "Share",
                //   dropdown: true,
                //   id: 1,
                //   icon: "Share",
                //   light: false,
                //   dark: true,
                //   click: addCall,
                //   list: [
                //     { title: "Full Call", Icon: "Phone" },
                //     { title: "Call Snippet", Icon: "Mail" },
                //   ],
                // },
              ]
        }
        mainTitle="Calls"
        title="Recorded Calls"
        src="Phone"
      />
      <div className="w-[100%] min-h-[90vh] pl-[10px] pr-[10px] pt-6">
        {fullCall && (
          <Backdrop bool={bool} width={"60%"} pad={"50px 0"}>
            <FullCall cancel={cancelFull} data={dataNew.result} />
          </Backdrop>
        )}
        {snippet && (
          <Backdrop bool={bool} width={"60%"} pad={"50px 0"}>
            <CallSnippet cancel={cancelSnippet} />
          </Backdrop>
        )}
        <div className="w-[100%] flex gap-[8px] mb-[100px] ">
          <AudioProfileContainer
            data={dataNew.result}
            width={"42%"}
            titles={titles}
            check={true}
            current={0}
            data1={dataNew1.result}
            refresh={refreshData}
          />
          <div className="w-[58%] min-h-[50vh] ">
            <Audio
              data={dataNew.result}
              data1={dataNew1.result}
              data2={dataNew2.result}
              refresh={refreshData}
            />
          </div>
        </div>
        {/* write your code here for profile page manya! */}
      </div>
    </>
  );
};

export default CallProfile;

export async function getServerSideProps({ query, params }) {
  return {
    props: {
      // TODO: Can do better error handling here by passing another property error in the component
      data: {},
    }, // will be passed to the page component as props
  };
}
