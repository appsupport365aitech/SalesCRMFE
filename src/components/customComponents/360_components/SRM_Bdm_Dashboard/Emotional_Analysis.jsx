import React, { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { Card } from "@mui/material";
import { baseUrl } from "@/utils/baseUrl";
import axios from "axios";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);
const EmotionalAnalysisComp = () => {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    if (window !== undefined) {
      setAccessToken(localStorage.getItem("access-token"));
    }
  }, []);

  const [emotionData, setEmotionData] = useState({});
  const data = {
    labels: Object.keys(emotionData),
    datasets: [
      {
        label: "# of Votes",
        data: Object.values(emotionData),
        backgroundColor: "#fe5143",
        borderColor: "rgba(254, 81, 67, 0.3)",
        borderWidth: 1,
      },
    ],
  };

  const getEmotionData = async () => {
    try {
      await axios
        .get(`${baseUrl}api/dashboard/indicator/emotionAnalysis`, {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((e) => {
          setEmotionData(e.data.result);
        })
        .catch((e) => {});
    } catch (error) {}
  };

  useEffect(() => {
    if (!accessToken) return;
    else {
      getEmotionData();
    }
  }, [accessToken]);

  return (
    <Card
      className="w-[100%] h-[400px] bg-[#fff] rounded-xl shrink-0 px-[19px] py-[19px] ml-[0px]"
      // style={{ width: "600px", height: "500px" }}
    >
      <h1 className="text-[20px] font-medium text-[#3F434A] tracking-wide">
        Emotional Analysis
      </h1>

      <Radar data={data} height={200} width={800}></Radar>
    </Card>
  );
};

export default EmotionalAnalysisComp;
