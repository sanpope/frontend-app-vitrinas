import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const EvolucionVentaDiaria = ({ evolucionVentaDiaria }) => {
  const dias = evolucionVentaDiaria
    ?.map((d) => d.dia)
    .sort(function (a, b) {
      return a - b;
    });

  const data = {
    labels: dias,
    datasets: [
      {
        data: evolucionVentaDiaria?.map((d) => (d.valor < 0 ? 0 : d.valor)),
        label: "Ventas",
        borderColor: "red",
        backgroundColor: "red",
        pointBackgroundColor: "red",
        pointBorderColor: "red",
        pointHoverBackgroundColor: "red",
        pointHoverBorderColor: "red",
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 8,
        pointStyle: "circle",
      },
    ],
  };

  const titleTooltip = () => {
    return "";
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          title: titleTooltip,
          label: function (context) {
            const value = context.raw;
            return value !== undefined && !isNaN(value) ? value : "";
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          min: 0,
          suggestedMin: 0,
          stepSize: 200000,
          maxTicksLimit: 5,
        },
        border: {
          display: false,
          dash: [2, 6],
          dashOffset: 1,
        },
      },
      x: {
        min: 0,

        ticks: {},
        border: {
          display: false,
          dash: [2, 6],
          dashOffset: 1,
        },
      },
    },
  };

  return (
    <>
      {dias?.length > 0 && dias !== null ? (
        <Box
          width={"100%"}
          overflowX="auto"
          css={{
            "&::-webkit-scrollbar": { display: "none" },
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
          }}
        >
          <Box minWidth={"100%"}>
            <Line data={data} options={options} />
          </Box>
        </Box>
      ) : (
        <Box
          width={"100%"}
          height={"100%"}
          display={"flex"}
          justifyContent={"center"}
        >
          <Text color={"grey.placeholder"} alignSelf={"center"}>
            No existe registro de ventas diarias.
          </Text>
        </Box>
      )}
    </>
  );
};

export default EvolucionVentaDiaria;
