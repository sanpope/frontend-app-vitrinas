import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Box } from "@chakra-ui/react";
Chart.register(ArcElement, Tooltip, Legend);

const TopVitrinasdelMes = ({
  labels,
  data,
  backgroundColor,
  hoverBackgroundColor,
}) => {
  const chartData = {
    labels: labels || [],
    datasets: [
      {
        data: data || [],
        backgroundColor: backgroundColor || ["#000000", "#555555", "#BBBBBB"],
        hoverBackgroundColor: hoverBackgroundColor || [
          "#000000",
          "#555555",
          "#BBBBBB",
        ],
        borderWidth: 1,
        cutout: "75%",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Box h={"50%"} display={{ base: "none", sm: "inline-flex" }}>
        <Doughnut data={chartData} options={options} />
      </Box>
    </Box>
  );
};

export default TopVitrinasdelMes;
