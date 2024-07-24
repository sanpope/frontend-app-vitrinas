import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Box } from "@chakra-ui/react";
Chart.register(ArcElement, Tooltip, Legend);

const TopVitrinasdelMes = () => {
  const data = {
    labels: ["Corales de Indias", "Double Tree Bogotá", "Double Tree Bogotá"],
    datasets: [
      {
        data: [2100000, 800000, 500000],
        backgroundColor: ["#000000", "#555555", "#BBBBBB"],
        hoverBackgroundColor: ["#000000", "#555555", "#BBBBBB"],
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
      <Box
        h={"50%"}
        display={{ base: "none", sm: "inline-flex" }}
      >
        <Doughnut data={data} options={options} />
      </Box>
    </Box>
  );
};

export default TopVitrinasdelMes;
