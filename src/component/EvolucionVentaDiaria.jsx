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

const EvolucionVentaDiaria = () => {
  const data = {
    labels: ["01/03", "Ayer", "Hoy"],
    datasets: [
      {
        label: "Ventas",
        data: [120, 300, 280, 400], // Datos de ejemplo
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
          label: function (context) {
            return `$${context.raw.toFixed(3)}`;
          },
          title: titleTooltip,
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
