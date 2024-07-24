import React from "react";
import { Box, ListItem, OrderedList, Text } from "@chakra-ui/react";
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

import resumenVentaMesAnterior from "../DummieData/resumenVentaMesAnterior";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const chartData = {
  labels: resumenVentaMesAnterior.map((d) => d.mes),
  datasets: [
    {
      data: resumenVentaMesAnterior.map((d) => d.valor),
      fill: false,
      borderColor: "#000000",
      borderWidth: 2,
      pointBackgroundColor: [
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#FF0000",
      ],
      pointRadius: 7,
      pointBorderWidth: 3,
      pointBorderColor: "white",
      pointHoverRadius: 8,
    },
  ],
};

const titleTooltip = () => {
  return "VENTAS:";
};

const labelTooltip = (tooltipItem) => {
  const datasetIndex = tooltipItem.datasetIndex;
  const dataIndex = tooltipItem.dataIndex;
  return `${chartData.datasets[datasetIndex].data[dataIndex]}K`;
};

const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      displayColors: false,
      padding: 5,
      caretSize: 10,

      callbacks: {
        title: titleTooltip,
        label: labelTooltip,
      },
      titleFont: {
        size: 10,
        weight: "normal",
      },
      bodyFont: {
        size: 14,
        weight: "bold",
      },
    },
  },
  scales: {
    y: {
      type: "linear",
      position: "left",
      title: {
        display: false,
      },
      ticks: {
        color: "black",
        beginAtZero: false,
        stepSize: 5000,
        callback: (value) => {
          if (value === 0) {
            return "0k";
          } else if (value > 0 && value < 10000) {
            return "5k";
          } else if (value >= 10000) {
            return "10k";
          } else {
            return "";
          }
        },
      },
      grid: {
        color: "rgba(0, 0, 0, 0.1)",
        borderDash: [5, 5],
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

const ResumenVentaMesAnterior = () => {
  return <Line data={chartData} options={options} />;
};

export default ResumenVentaMesAnterior;
