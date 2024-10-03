import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Box, Text } from "@chakra-ui/react";
Chart.register(ArcElement, Tooltip, Legend);

const TopVitrinasdelMes = ({
  labels,
  data,
  backgroundColor,
  hoverBackgroundColor,
}) => {

  const dataNumber = data?.map((dato) => dato.replace(/\./g, ""));

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: dataNumber,
        backgroundColor: backgroundColor || ["#000000", "#555555", "#BBBBBB"],
        hoverBackgroundColor: hoverBackgroundColor || [
          "#000000",
          "#555555",
          "#BBBBBB",
        ],
        borderWidth: 1,
        cutout: "65%",
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
        {labels !== null && data !== null ? (
          <Doughnut data={chartData} options={options} />
        ) : (
          <Text color={"grey.placeholder"}>
            No se encontró información del Top de las vitrinas.
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default TopVitrinasdelMes;
