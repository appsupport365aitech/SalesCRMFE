import { setError, setSuccess } from "@/store/ai";
import { useAppDispatch } from "@/store/store";
import ButtonDropDown from "@/utils/Button/Button";
import Navigator from "@/utils/customNavigator";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "@/utils/baseUrl";

const Chart = ({ title, percent }: any) => {
  return (
    <div className="w-[10px] h-[100%] flex flex-col items-center relative">
      <div className="w-[10px] h-[100%] mb-[15px] bg-[#f7f8ff] rounded-t-[19px] relative overflow-hidden">
        <div
          className="w-[100%] bg-bg-red bottom-0 absolute rounded-t-[19px]"
          style={{ height: percent }}
        ></div>
      </div>
      <p className="w-[100%] text-[8.5px] leading-[13px] min-h-[40px] flex items-center justify-center font-medium text-[#8A9099] text-center absolute bottom-[-25px]">
        {title}
      </p>
    </div>
  );
};

const ChartContainer = ({ children }: any) => {
  return (
    <div className="w-full h-[220px] mt-[40px] flex">
      <div className="w-[4%] h-[100%] flex flex-col justify-between items-center text-[#8A9099]">
        <p>100</p>
        <p>75</p>
        <p>50</p>
        <p>25</p>
        <p className="mb-[20px]">0</p>
      </div>
      <div className="w-full h-[100%] flex justify-between pr-[30px] pl-[30px]">
        {children}
      </div>
    </div>
  );
};

const ScriptBuilding = ({ script }: any) => {
  return (
    <div className="w-[100%] p-6 h-[350px] bg-[#fff] rounded-xl shrink-0  py-[19px]">
      <div className="w-[100%] flex items-center justify-between">
        <h1 className="text-[20px] font-medium text-[#3F434A] tracking-wide">
          Script Building Blocks
        </h1>
      </div>
      <ChartContainer>
        {/* percent={`${script.closing}%`} */}
        <Chart title={"Opening"} percent={`${script?.Opening}%`} />
        <Chart
          title={"Lead Qualififcation"}
          percent={`${script?.["Lead Qualification"]}%`}
        />
        <Chart
          title={"Need Discovery"}
          percent={`${script?.["Need Discovery"]}%`}
        />
        <Chart
          title={"Key Value Proposition"}
          percent={`${script?.["Key Value Proposition"]}%`}
        />
        <Chart
          title={"Product Knowledge"}
          percent={`${script?.["Product Knowledge"]}%`}
        />
        <Chart
          title={"Price Discussion"}
          percent={`${script?.["Price Discussion"]}%`}
        />
        <Chart title={"Closing"} percent={`${script?.Closing}%`} />
      </ChartContainer>
    </div>
  );
};

const Selling = ({ selling }: any) => {
  return (
    <div className="w-[100%] p-6 h-[350px] bg-[#fff] rounded-xl shrink-0  py-[19px]">
      <div className="w-[100%] flex items-center justify-between">
        <h1 className="text-[20px] font-medium text-[#3F434A] tracking-wide">
          Selling Skills
        </h1>
      </div>
      <ChartContainer>
        <Chart
          title={"Consultative Selling"}
          percent={`${selling?.["Consultative Selling"]}%`}
        />
        <Chart title={"Empathy"} percent={`${selling?.Empathy}%`} />
        <Chart
          title={"Listening Skills"}
          percent={`${selling?.["Listening Skills"]}%`}
        />
        <Chart title={"Confidence"} percent={`${selling?.Confidence}%`} />
        <Chart
          title={"Urgency Creation"}
          percent={`${selling?.["Urgency Creation"]}%`}
        />
        <Chart
          title={"Positive Energy"}
          percent={`${selling?.["Positive Energy"]}%`}
        />
        <Chart
          title={"Rapport Building"}
          percent={`${selling?.["Rapport Building"]}%`}
        />
        <Chart title={"Politeness"} percent={`${selling?.Politeness}%`} />
      </ChartContainer>
    </div>
  );
};

const Emotion = ({ data }: any) => {
  return (
    <div className="w-[100%] h-[350px] p-6 bg-[#fff] rounded-xl shrink-0  py-[19px]">
      <div className="w-[100%] flex items-center justify-between">
        <h1 className="text-[20px] font-medium text-[#3F434A] tracking-wide">
          Emotion Analysis
        </h1>
      </div>
      <ChartContainer>
        <Chart title={"Joy"} percent={`${data?.Joy}%`} />
        <Chart title={"Trust"} percent={`${data?.Trust}%`} />
        <Chart title={"Politeness"} percent={`${data?.Politeness}%`} />
        <Chart title={"Satisfaction"} percent={`${data?.Satisfaction}%`} />
        <Chart title={"Curiosity"} percent={`${data?.Curiosity}%`} />
        {/* <Chart title={"Confidence"}  percent={`${data.}%`} /> */}
        {/* <Chart title={"Empathy"} percent={`${data.}%`} /> */}
        <Chart title={"Assertivenss"} percent={`${data?.Assertiveness}%`} />
      </ChartContainer>
    </div>
  );
};

const Loader = () => {
  return (
    <div className="w-[100%] h-[500px]  flex items-center justify-center top-0 left-0">
      <div role="status">
        <svg
          aria-hidden="true"
          className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="#ccc"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill={"#304dfd"}
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

const Coaching = ({ data, refresh }: any) => {
  const [userId, setUserId] = useState(
    window !== undefined ? localStorage.getItem("user-id") : ""
  );
  const [userRole, setUserRole] = useState(
    window !== undefined ? localStorage.getItem("user-role") : ""
  );

  const [accessToken, setAccessToken] = useState<any>("");

  useEffect(() => {
    if (window !== undefined) {
      setAccessToken(localStorage.getItem("access-token"));
    }
  }, []);

  const [loading, setLoading] = React.useState(false);
  const [checked, setChecked] = React.useState(true);
  const [scriptBuildingData, setScriptBuildingData] = useState({});
  const [sellingSkillsData, setSellingSkillsData] = useState({});
  const [emotionData, setEmotionData] = useState({});
  // const [data1, setData] = useState({
  //   scriptBuilding: {
  //     "Lead Qualification": 0,
  //     "Need Discovery": 0,
  //     "Product Knowledge": 0,
  //     "Price Discussion": 0,
  //     Closing: 0,
  //     Opening: 0,
  //     "Key Value Proposition": 0,
  //   },
  //   sellingSkills: {
  //     "Consultative Selling": 0,
  //     Empathy: 0,
  //     "Listening Skills": 0,
  //     Confidence: 0,
  //     "Urgency Creation": 0,
  //     "Positive Energy": 0,
  //     "Rapport Building": 0,
  //     Politeness: 0,
  //   },
  //   emotion: {
  //     Joy: 0,
  //     Trust: 0,
  //     Politeness: 0,
  //     Satisfaction: 0,
  //     Curiosity: 0,
  //     Assertiveness: 0,
  //   },
  // });

  const getScriptBuildingData = () => {
    try {
      setLoading(true);
      axios
        .get(`${baseUrl}api/dashboard/indicator/scriptBuildingBlocks`, {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((response) => {
          setScriptBuildingData(response.data.result);
        })

        .catch((error) => {
          console.error("Error fetching script building data:", error);
        });
      setLoading(false);
    } catch (error) {}
  };

  const getSellingSkillsData = () => {
    try {
      setLoading(true);
      axios
        .get(`${baseUrl}api/dashboard/indicator/sellingSkills`, {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((e) => {
          setSellingSkillsData(e.data.result);
        })
        .catch((e) => {});
      setLoading(false);
    } catch (error) {}
  };
  const getEmotionData = () => {
    try {
      setLoading(true);
      axios
        .get(`${baseUrl}api/dashboard/indicator/emotionAnalysis`, {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((e) => {
          setEmotionData(e.data.result);
        })
        .catch((e) => {});
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    if (!accessToken) return;
    else {
      if (userRole == "SDR" || userRole == "Manager") {
        getScriptBuildingData();
        getSellingSkillsData();
        getEmotionData();
      }
    }
  }, [accessToken]);

  const appDispatch = useAppDispatch();
  const [tab, setTab] = useState<any>(0);
  const [tab2, setTab2] = useState<any>(0);
  const tabs = [
    { id: 0, title: "Auto" },
    { id: 1, title: "Manual" },
  ];
  const tabs2 = [
    { id: 0, title: "Script Building Blocks" },
    { id: 1, title: "Selling Skills" },
    { id: 2, title: "Emotion Analysis" },
  ];

  const [scoreQuestions, setScoreQuestions] = useState([
    {
      label: "Client Introduction",
      key: "client_introduction",
      value: "",
      options: [
        {
          key: "0",
          value: 0,
          label:
            "No introduction or insufficient information about the client.",
        },
        {
          key: "1",
          value: 10,
          label:
            "Basic information provided, but lacks personalization or relevant details.",
        },
        {
          key: "2",
          value: 20,
          label:
            "Adequate introduction with some personalization and relevant details about the client.",
        },
        {
          key: "3",
          value: 25,
          label:
            "Execellent introduction that demonstrates a strong understanding of the client&apos;s background, industry.",
        },
        { key: "4", value: "NA", label: "Not applicable." },
      ],
    },
    {
      label: "Service Offerings",
      key: "service_offerings",
      value: "",
      options: [
        {
          key: "0",
          value: 0,
          label: "No mention or unclear explanation of the service offerings.",
        },
        {
          key: "1",
          value: 10,
          label:
            "Basic description of the service offerings, but lacks clarity or fails to highlight key benefits.",
        },
        {
          key: "2",
          value: 20,
          label:
            "Clear explanation of the service offerings with an emphasis on key benefits and value proposition.",
        },
        {
          key: "3",
          value: 25,
          label:
            "Detailed and persuasive presentation of the service offerings, highlighting specific features, benefits.",
        },
        { key: "4", value: "NA", label: "Not applicable." },
      ],
    },
    {
      label: "Purpose of Call",
      key: "purpose_of_call",
      value: "",
      options: [
        {
          key: "0",
          value: 0,
          label:
            "No introduction or insufficient information about the client.",
        },
        {
          key: "1",
          value: 10,
          label:
            "Basic information provided, but lacks personalization or relevant details.",
        },
        {
          key: "2",
          value: 20,
          label:
            "Adequate introduction with some personalization and relevant details about the client.",
        },
        {
          key: "3",
          value: 25,
          label:
            "Execellent introduction that demonstrates a strong understanding of the client&apos;s background, industry.",
        },
        { key: "4", value: "NA", label: "Not applicable." },
      ],
    },
    {
      label: "Service Offerings",
      key: "service_offerings_2",
      value: "",
      options: [
        {
          key: "0",
          value: 0,
          label: "No mention or unclear explanation of the service offerings.",
        },
        {
          key: "1",
          value: 10,
          label:
            "Basic description of the service offerings, but lacks clarity or fails to highlight key benefits.",
        },
        {
          key: "2",
          value: 20,
          label:
            "Clear explanation of the service offerings with an emphasis on key benefits and value proposition.",
        },
        {
          key: "3",
          value: 25,
          label:
            "Detailed and persuasive presentation of the service offerings, highlighting specific features, benefits.",
        },
        { key: "4", value: "NA", label: "Not applicable." },
      ],
    },
  ]);

  const updateScoreItem = (checked: any, quesItemIdx: any, val: any) => {
    setScoreQuestions((currScoreQues: any) => {
      return currScoreQues?.map((scoreQuesItem: any, index: number) => {
        if (index === quesItemIdx) {
          return {
            ...scoreQuesItem,
            value: val,
          };
        } else {
          return scoreQuesItem;
        }
      });
    });
  };
  console.log("sdr", scoreQuestions);

  // useEffect(() => {
  //   try {
  //     if (checked) {
  //       axios
  //         .get(`${baseUrl}api/indicator/getIndicatorValues?userId=${userId}`, {
  //           headers: {
  //             Authorization: accessToken,
  //           },
  //         })
  //         .then((e) => {
  //           setData(e.data);
  //           setLoading(false);
  //         })
  //         .catch((e) => {});
  //       setChecked(false);
  //     }
  //   } catch (error) {}
  // }, [accessToken]);

  const handleCallback = (payload: any) => {
    setTab(payload);
  };
  const handleCallback2 = (payload: any) => {
    setTab2(payload);
  };
  const handleScoreSubmit = () => {
    const finalScore = scoreQuestions?.reduce((acc: any, item: any) => {
      if (item.value !== "" || item.value !== "NA") {
        return acc + Number(item.value);
      } else {
        return acc + 0;
      }
    }, 0);
    axios
      .post(
        `${baseUrl}api/qa/updateCallScore`,
        {
          score: finalScore,
          callId: data?._id,
        },
        {
          headers: {
            Authorization: accessToken,
          },
        }
      )
      .then((res: any) => {
        appDispatch(
          setSuccess({
            show: true,
            success: "Call Scored Successfully.",
          })
        );
        refresh();
      })
      .catch((err: any) => {
        appDispatch(
          setError({
            show: true,
            error: "Score Submission failed.",
          })
        );
      });
  };

  const handleScoreReset = async () => {
    try {
      const resetScore = "0";
      await axios.post(
        `${baseUrl}api/qa/updateCallScore`,
        {
          score: resetScore,
          callId: data?._id,
        },
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      appDispatch(
        setSuccess({
          show: true,
          success: "Score reset successfully.",
        })
      );
      refresh();
    } catch (error) {
      appDispatch(
        setError({
          show: true,
          error: "Score reset failed.",
        })
      );
    }
  };

  return (
    <div className="w-[100%]">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
            <h3 className="text-[20px] font-medium text-[#3F434A] tracking-wide">
              Call Analysis
            </h3>
            <div className="flex justify-between gap-[10px] py-6">
              <div className="w-[50%]">
                <div className="w-[100%] flex font-medium">
                  <span className="text-[gray] mb-2 w-[60%]">
                    Call Disposition
                  </span>
                  <span>{data?.activeCall?.call_disposition || "NA"}</span>
                </div>
                <div className="w-[100%] flex  font-medium">
                  <span className="text-[gray] w-[60%]">Call Type</span>
                  <span>{data?.activeCall?.call_type || "-"}</span>
                </div>
              </div>
              {tab === 1 && (
                <div className="w-[94px] h-[69px] px-[6px] bg-yellow-100 rounded-xl text-center pt-3">
                  <p className="text-[#FF965D] text-[14px]">
                    {data?.score || "Not Scored"}
                  </p>
                  <p className="text-[14px] font-medium">Call Score</p>
                </div>
              )}
            </div>
          </div>
          <Navigator
            width={false}
            callback={handleCallback}
            current={tab}
            list={tabs}
            coachingButton
          />
          {tab === 0 && (
            <div className="flex flex-col gap-6 py-4">
              <Navigator
                borderBottom={false}
                width={false}
                callback={handleCallback2}
                current={tab2}
                list={tabs2}
                coachingButton2
              />
              {tab2 === 0 && <ScriptBuilding script={scriptBuildingData} />}
              {tab2 === 1 && <Selling selling={sellingSkillsData} />}
              {tab2 === 2 && <Emotion data={emotionData} />}
            </div>
          )}
          {tab === 1 &&
            (userRole === "QA manager" || userRole === "QA Analyst") && (
              <div>
                {scoreQuestions?.map((quesItem: any, index: number) => (
                  <div className="mt-[16px]" key={index}>
                    <p className="text-[20px] font-bold mb-2">
                      {quesItem?.label}
                    </p>
                    <div>
                      {quesItem?.options?.map(
                        (optionItem: any, opIdx: number) => (
                          <div key={opIdx} className="flex">
                            <label htmlFor={quesItem?.key + optionItem?.key}>
                              <input
                                className="border border-[#E8E9EB]"
                                type="radio"
                                id={quesItem?.key + optionItem?.key}
                                name={quesItem?.key}
                                onChange={(e) =>
                                  updateScoreItem(
                                    e.target.checked,
                                    index,
                                    optionItem?.value
                                  )
                                }
                              />
                            </label>
                            <div className="flex justify-start ml-2  mb-1">
                              {optionItem?.value !== "NA" && (
                                <p className="font-medium w-[80px]">
                                  {optionItem?.value} marks:
                                </p>
                              )}
                              <p
                                className={
                                  optionItem?.label === "Not applicable."
                                    ? "font-medium w-full"
                                    : "w-full"
                                }
                              >
                                {optionItem?.label}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ))}

                <div className="form_btns w-[100%] flex justify-end">
                  {/* <SimpleButton
                  theme={1}
                  text={loading ? "Saving..." : "Save"}
                  left={0}
                  right={0}
                  disabled={loading}
                  click={() => {
                    submit();
                  }}
                /> */}
                  <div className="gap-2 flex items-center mt-4">
                    <button
                      className="p-[10px] px-7 rounded-lg text-[red] text-[16px] border border-[red] hover:bg-[#ff7d6d] hover:text-white"
                      onClick={handleScoreReset}
                    >
                      Reset
                    </button>
                    <button
                      className="p-[10px] px-7 rounded-lg text-white text-[16px] bg-bg-red hover:bg-[#ff7d6d]"
                      onClick={handleScoreSubmit}
                    >
                      Calculate Score
                    </button>
                  </div>
                </div>
              </div>
            )}
        </>
      )}
    </div>
  );
};

export default Coaching;
