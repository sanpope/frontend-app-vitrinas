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
  // Convertir los datos a números y eliminar puntos decimales si existen
  const dataNumber = data?.map((dato) => parseFloat(dato.replace(/\./g, "")));

  // Verificar si todas las ventas son 0
  const allZeroVentas = dataNumber?.every((dato) => dato === 0);

  // Si todas las ventas son 0, se asignan valores iguales
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: allZeroVentas ? [1, 1, 1] : dataNumber, // Partes iguales si todas las ventas son 0
        backgroundColor: allZeroVentas
          ? ["#BBBBBB", "#BBBBBB", "#BBBBBB"] // Color gris si todas las ventas son 0
          : backgroundColor || ["#000000", "#555555", "#BBBBBB"],
        hoverBackgroundColor: allZeroVentas
          ? ["#BBBBBB", "#BBBBBB", "#BBBBBB"]
          : hoverBackgroundColor || ["#000000", "#555555", "#BBBBBB"],
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
      <Box h={"55%"} display={{ base: "none", sm: "inline-flex" }}>
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
