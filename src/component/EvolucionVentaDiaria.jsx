import React from "react";
import { Box } from "@chakra-ui/react";
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

const EvolucionVentaDiaria = ({ labels, dataPoints }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Ventas",
        data: dataPoints,
        borderColor: "red",
        backgroundColor: "red",
        pointBackgroundColor: "red",
        pointBorderColor: "red",
        pointHoverBackgroundColor: "red",
        pointHoverBorderColor: "red",
        borderWidth: 2,
        pointRadius: 6,
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
            return value !== undefined && !isNaN(value)
              ? `$${value?.toFixed(3)}`
              : "";
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          stepSize: 100,
        },
        border: {
          display: false,
          dash: [2, 6],
          dashOffset: 1,
        },
      },
      x: {
        ticks: {
          color: (context) => {
            return context.label === "Hoy" ? "green" : "black";
          },
        },
        border: {
          display: false,
          dash: [2, 6],
          dashOffset: 1,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default EvolucionVentaDiaria;
