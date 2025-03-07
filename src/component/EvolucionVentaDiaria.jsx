import React, { useRef, useEffect } from "react";
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
  const chartRef = useRef(null);

  const getDaysInCurrentMonth = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: totalDays }, (_, i) => i + 1);
  };

  const getCurrentDay = () => {
    return new Date().getDate();
  };

  const currentDay = getCurrentDay();
  const allDaysInMonth = getDaysInCurrentMonth();

  const ventasPorDia = {};
  evolucionVentaDiaria?.forEach((d) => {
    ventasPorDia[d.dia] = d.valor < 0 ? 0 : d.valor;
  });

  const data = {
    labels: allDaysInMonth,
    datasets: [
      {
        data: allDaysInMonth.map((dia) => ventasPorDia[dia] || 0),
        label: "Ventas",
        borderColor: "rgba(230, 15, 15, 1)",
        backgroundColor: "rgba(230, 15, 15, 1)",
        pointBackgroundColor: (context) => {
          const index = context.dataIndex;
          const value = context.dataset.data[index];

          return allDaysInMonth[index] === currentDay
            ? "rgba(0, 0, 0, 1)"
            : "rgba(230, 15, 15, 1)";
        },
        pointBorderColor: (context) => {
          const index = context.dataIndex;

          return allDaysInMonth[index] === currentDay
            ? "rgba(0, 0, 0, 1)"
            : "rgba(230, 15, 15, 1)";
        },
        pointHoverBackgroundColor: (context) => {
          const index = context.dataIndex;
          return allDaysInMonth[index] === currentDay
            ? "rgba(0, 0, 0, 1)"
            : "rgba(230, 15, 15, 1)";
        },
        pointHoverBorderColor: (context) => {
          const index = context.dataIndex;
          return allDaysInMonth[index] === currentDay
            ? "rgba(0, 0, 0, 1)"
            : "rgba(230, 15, 15, 1)";
        },
        borderWidth: 3,
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
    responsive: true,
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
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          font: {
            size: 10,
          },
        },
        border: {
          display: false,
        },
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
      },
    },
  };

  return (
    <>
      {allDaysInMonth?.length > 0 ? (
        <Box
          w={"100%"}
          maxW={"225px"}
          overflowX="auto"
          css={{
            "&::-webkit-scrollbar": { width: "4px", height: "4px" },
            "&::-webkit-scrollbar-track": { background: "#f1f1f1" },
            "&::-webkit-scrollbar-thumb": { background: "#888" },
            "&::-webkit-scrollbar-thumb:hover": { background: "#555" },
          }}
        >
          <Box width="500px" height="150px">
            <Line ref={chartRef} data={data} options={options} />
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
            Sin información
          </Text>
        </Box>
      )}
    </>
  );
};

export default EvolucionVentaDiaria;
