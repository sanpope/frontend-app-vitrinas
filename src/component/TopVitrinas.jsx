import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Box, Text } from "@chakra-ui/react";
Chart.register(ArcElement, Tooltip, Legend);

const TopVitrinas = ({
  topVitrinas,
  backgroundColor,
  hoverBackgroundColor,
}) => {
  const dataVentas = topVitrinas?.map((obj) =>
    Number(obj.venta.replace(/\./g, "")),
  );

  const labelsNames = topVitrinas?.map((obj) => obj.nombre);

  const chartData = {
    labels: labelsNames,
    datasets: [
      {
        data: dataVentas,
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
        {topVitrinas !== null ? (
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

export default TopVitrinas;
