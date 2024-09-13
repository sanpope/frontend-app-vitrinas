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

const EvolucionVentaDiaria = ({ evolucionVentaDiaria }) => {
  const data = {
    labels: evolucionVentaDiaria
      ?.map((d) => d.dia)
      .sort(function (a, b) {
        return a - b;
      }),
    datasets: [
      {
        data: evolucionVentaDiaria?.map((d) => d.valor < 0 ? 0 : d.valor),
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
        ticks: {},
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
