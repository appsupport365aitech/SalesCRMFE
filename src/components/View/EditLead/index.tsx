import React, { useEffect, useState } from "react";
import SimpleButton from "@/utils/Button/SimpleButton";
import axios from "axios";
import Navigation from "@/components/app/Navigation";
// import LeadProfileContainer from "@/components/Profile/LeadProfileContainer";
import FormEditContainer from "./FormEditContainer";
import { useRouter } from "next/router";
import { baseUrl } from "@/utils/baseUrl";
// FormEditContainer

const AddDropDown = ({ top, title, width, list, change }: any) => {
  return (
    <div
      style={{
        width: width ? width : "100%",
        marginTop: top ? top : "10px",
      }}
    >
      <p className="block mb-2 text-sm font-medium text-[#8a9099] tracking-wide">
        {title}
      </p>
      <div className="w-[100%] px-[10px] border-[1px]   rounded-xl border-[#ccc]">
        <select
          onChange={(e) => {
            change(e.target.value);
          }}
          id="countries"
          className="outline-none cursor-pointer capitalize text-gray-900 py-[7px]   text-sm tracking-wide text-[#3F434A] font-medium  block w-full bg-white"
        >
          {list.map((item: any, i: any) => {
            return (
              <option value={item.value} key={i} selected={item.selected}>
                {item.title}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

const AddText = ({ top, title, width, change }: any) => {
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
        onChange={(e: any) => {
          change(e.target.value);
        }}
        type="text"
        className="w-[100%] bg-white text-[#3f434a] border-[#e8e9eb] border-[2px] mt-[10px] rounded-[13px] py-[10px] tracking-wide text-[14px] font-medium px-[14px] h-[38px] outline-none"
      />
    </div>
  );
};

const EditLead = ({
  cancel,
  data,
  update,
  title,
  mastersData,
}: {
  cancel: any;
  data: any;
  update: () => void;
  title?: any;
  mastersData: any;
}) => {
  const titles = ["LEAD INFO", "CONTACT INFO", "DEAL INFO"];
  const [content, setContent] = useState<any>({});
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    if (window !== undefined) {
      setAccessToken(localStorage.getItem("access-token") || "");
    }
  }, []);
  //   companyId:data.companyId._id,34
  //   company_name,
  //   company_website_url,
  //   company_icon,
  //   company_location,
  //   company_product_category,
  //   company_description,
  //   customerId,
  //   customer_name,
  //   customer_contact,
  //   customer_email,
  //   designation,
  //   gender,
  //   industry,
  //   interested_product,
  //   id,
  //   potential_deal_size,
  //   win_probability,
  //   created_by,
  //   last_updated_by,
  //   activity_history,
  //   document_attached,
  //   conversation_history,
  //   customer_name,
  //   inquiry,
  //   existing_budget,
  //   close_date,
  //   last_activity,
  //   leadStatus,
  //   leadStage,
  //   follow_up_action,
  //   next_action,
  //   lead_title,
  //   lead_description,
  //   source
  // );
  const submit = () => {
    const url = `${baseUrl}api/leads/update`;
    axios
      .put(
        url,
        {
          id: data._id,
          lead_title: content.lead_title,
          companyId: data.companyId._id,
          customerId: data.customerId._id,
        },
        { headers: { Authorization: accessToken } }
      )
      .then((e: any) => {})
      .catch((e: any) => {});
  };

  return (
    <>
      <FormEditContainer
        data={data}
        mastersData={mastersData}
        update={update}
        titles={titles}
        current={0}
        cancel={cancel}
        // info={dummy.leadInfo}
        title={title}
      />
    </>
  );
};

export default EditLead;
