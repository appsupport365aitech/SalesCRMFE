import React, { useEffect } from "react";
import Navigation from "@/components/app/Navigation";
import ProfilePage from "@/components/Profile/ProfilePage/LeadProfile";
import LeadProfileContainer from "@/components/Profile/LeadProfileContainer";
import dummy from "@/shared/dummy";
import axios from "axios";
import { useState } from "react";
import Backdrop from "@/components/View/Backdrop/Center";
import Events from "@/components/View/Event/Events";
import EmailPage from "@/components/View/Email/index";
import Notes from "@/components/View/Notes";
import Messages from "@/components/View/messages";
import ActiveCall from "@/components/View/active-call-add";
import Navbar from "@/components/app/Navbar/Navbar";
import NavbarWithButton from "@/components/app/Navbar/NavbarWithButton";
import { useRouter } from "next/router";
import { baseUrl } from "@/utils/baseUrl";

const Profile = () => {
  const [data, setData1] = useState({});
  const [mastersData, setMastersData] = useState({});
  const [data1, setData] = useState(data);
  const [accessToken, setAccessToken] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (window !== undefined) {
      setAccessToken(localStorage.getItem("access-token"));
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${baseUrl}api/leads/find-by-id?id=${id}`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res) => {
        setData1(res.data);
        setData(res.data);
      })
      .catch((e) => {});
    axios
      .get(`${baseUrl}api/master-users/find-all`, {
        headers: { Authorization: accessToken },
      })
      .then((res) => {
        setMastersData(res.data);
      })
      .catch((e) => {});
  }, [accessToken]);

  const UpdateData = async () => {
    const response = await axios
      .get(`${baseUrl}api/leads/find-by-id?id=${data.result._id}`, {
        headers: { Authorization: accessToken },
      })
      .then((e) => {
        setData(e.data);
      })
      .catch(() => {});
  };
  const titles = ["DEAL INFO", "ACTIVITY HISTORY", "ATTACHMENTS"];

  const [notes, setNotes] = React.useState(false);
  const [events, setEvents] = React.useState(false);
  const [notes1, setNotes1] = React.useState(false);
  const [emails, setEmail] = React.useState(false);
  const [messages, setMessages] = React.useState(false);
  const [bool, setBool] = React.useState(true);
  const [call, setCall] = React.useState(false);

  const showNotes = () => {
    setNotes(true);
  };
  const showEmail = () => {
    setEmail(true);
  };
  const showNotes1 = () => {
    setNotes1(true);
  };
  const showEvents = () => {
    setEvents(true);
  };
  const showMessages = () => {
    setMessages(true);
  };
  const showCall = () => {
    setCall(true);
  };

  const cancelEvents = () => {
    setBool(false);
    setTimeout(() => {
      setEvents(false);
      setBool(true);
    }, 500);
  };

  const cancelEmails = () => {
    setBool(false);
    setTimeout(() => {
      setEmail(false);
      setBool(true);
    }, 500);
  };

  const cancelNotes = () => {
    setBool(false);
    setTimeout(() => {
      setNotes(false);
      setBool(true);
    }, 1700);
  };

  const cancelNotes1 = () => {
    setBool(false);
    setTimeout(() => {
      setNotes1(false);
      setBool(true);
    }, 1700);
  };
  const cancelMessages = () => {
    setBool(false);
    setTimeout(() => {
      setMessages(false);
      setBool(true);
    }, 1700);
  };
  const cancelCall = () => {
    setBool(false);
    setTimeout(() => {
      setCall(false);
      setBool(true);
    }, 1700);
  };

  const AddLead = (e, e1) => {
    if (e1 === 0) {
      showCall();
    } else if (e1 === 1) {
      showEmail();
    } else if (e1 === 2) {
      showEvents();
    } else if (e1 === 3) {
      showNotes();
    } else if (e1 === 4) {
      showMessages();
    }
  };

  return (
    <div className="bg-white">
      <NavbarWithButton
        mainTitle="Sales > Open"
        title={`${data1?.result?.lead_title} - Info`}
        src="manageLeadsIcon"
        buttons={[
          {
            text: "Action",
            dropdown: true,
            id: 1,
            dark: true,
            light: false,
            click: AddLead,
            list: [
              { title: "Call", Icon: "Phone" },
              { title: "Email", Icon: "Mail" },
              { title: "Event", Icon: "Calendar" },
              { title: "Add note", Icon: "Tasks" },
              { title: "Message", Icon: "Chat" },
            ],
          },
        ]}
      />
      <div className="w-[100%] min-h-[90vh] pl-[20px] pr-[20px] pt-6">
        {notes && (
          <Backdrop bool={bool}>
            <Notes
              cancel={cancelNotes}
              update={UpdateData}
              leadid={data?.result?._id}
            />
          </Backdrop>
        )}
        {events && (
          <Backdrop bool={bool} pad={"50px 0"}>
            <Events
              cancel={cancelEvents}
              companyName={data1?.result?.companyId?.company_name}
              data={data1}
            />
          </Backdrop>
        )}
        {emails && (
          <Backdrop bool={bool} pad={"50px 0"}>
            <EmailPage
              refresh={(e) => {
                UpdateData();
              }}
              cancel={cancelEmails}
              data={data1?.result}
              leadIdResult={data1?.result?._id}
            />
          </Backdrop>
        )}
        {messages && (
          <Backdrop bool={bool} pad={"50px 0"}>
            <Messages
              cancel={cancelMessages}
              companyName={data1?.result?.companyId?.company_name}
              data={data1}
            />
          </Backdrop>
        )}
        {call && (
          <Backdrop bool={bool} pad={"50px 0"}>
            <ActiveCall
              cancel={cancelCall}
              id={data1?.result?._id}
              refresh={() => {
                UpdateData();
              }}
              companyId={data1?.result?.companyId?._id}
              companyName={data1?.result?.companyId?.company_name}
              lead={data1?.result}
              customerId={data1?.result?.customerId?._id}
            />
          </Backdrop>
        )}
        <div className="w-[100%] flex gap-[25px] mb-[100px]">
          <div className="w-[400px] min-h-[70vh] bg-[#ffe3e170] rounded-xl shrink-0 p-[20px]">
            <ProfilePage
              updated={UpdateData}
              data1={data1?.result}
              mastersData={mastersData}
            />
          </div>
          <LeadProfileContainer
            data={data1?.result}
            titles={titles}
            current={0}
            info={dummy.leadInfo}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;

export async function getServerSideProps({ query, params }) {
  return {
    props: {
      // TODO: Can do better error handling here by passing another property error in the component
      data: {},
    }, // will be passed to the page component as props
  };
}
