import Navigation from "@/components/app/Navigation";
import Deals from "@/components/Profile/DealsContainer";
import ProfilePage from "@/components/Profile/ProfilePage/CompanyProfile";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/app/Navbar/Navbar";
import { useRouter } from "next/router";
import { baseUrl } from "@/utils/baseUrl";

const CompanyProfile = () => {
  const [data, setData] = useState({});
  const [accessToken, setAccessToken] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = React.useState(
    data?.result?.companyId?.company_name
  );

  useEffect(() => {
    if (window !== undefined) {
      setAccessToken(localStorage.getItem("access-token"));
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${baseUrl}api/leads/find-by-id?id=${id}`, {
        headers: { Authorization: accessToken },
      })
      .then((res) => {
        setData(res.data);
        setTitle(res?.data?.result?.companyId?.company_name);
      })
      .catch((e) => {});
  }, [accessToken]);

  return (
    <>
      <Navbar title="Manage Leads" src="manageLeadsIcon" />
      <div className="w-[100%] min-h-[90vh] pl-[40px] pr-[40px]">
        <Navigation
          title={`Manage Leads>${title}`}
          buttons={
            [
              //   {
              //     text: "Take Action",
              //     dropdown: true,
              //     id: 1,
              //     icon: "Plus",
              //     light: false,
              //     list: [
              //       { title: "Call", Icon: "Phone" },
              //       { title: "Email", Icon: "Mail" },
              //       { title: "Event", Icon: "Calendar" },
              //       { title: "Task", Icon: "Tasks" },
              //       { title: "Message", Icon: "Chat" },
              //     ],
              //   },
            ]
          }
        />
        <div className="w-[100%] flex gap-[25px] mb-[100px] ">
          <div className="w-[320px] shrink-0 min-h-[70vh] bg-white rounded-xl p-[20px]">
            <ProfilePage
              refresh={(e) => {
                setTitle(e);
              }}
              data1={data}
            />
          </div>
          <div className="bg-white rounded-xl w-[100%] px-[25px]">
            <Deals data={data} type="company" />
          </div>
        </div>
        {/* write your code here for profile page manya! */}
      </div>
    </>
  );
};

export default CompanyProfile;

export async function getServerSideProps({ query, params }) {
  return {
    props: {
      // TODO: Can do better error handling here by passing another property error in the component
      data: {},
    }, // will be passed to the page component as props
  };
}
