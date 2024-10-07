import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const DistribucionVentas = ({ distribucionVentas }) => {
  const createGradient = (ctx, chartArea) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
    gradient.addColorStop(0, "rgba(255, 0, 0, 1)");
    gradient.addColorStop(1, "rgba(255, 0, 0, 0.2)");
    return gradient;
  };

  const chartData = {
    labels: distribucionVentas.map((d) => d.hora),
    datasets: [
      {
        data: distribucionVentas.map((d) => d.valor),
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null;
          }
          const gradient = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(255, 99, 132, 1)");
          gradient.addColorStop(1, "rgba(255, 99, 132, 0.2)");
          return gradient;
        },
        borderSkipped: false,
        borderRadius: 20,
        barPercentage: 0.5,
        hoverBackgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null;
          }
          return createGradient(ctx, chartArea);
        },
      },
    ],
  };

  const titleTooltip = (tooltipItems) => {
    const [tooltipItem] = tooltipItems;
    const dataIndex = tooltipItem.dataIndex;
  };

  const labelTooltip = (tooltipItem) => {
    const datasetIndex = tooltipItem.datasetIndex;
    const dataIndex = tooltipItem.dataIndex;
    return ` ${chartData.datasets[datasetIndex].data[dataIndex]}%+`;
  };

  const options = {
    maintainAspectRatio: false,
    barThickness: 25,
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
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 16,
          style: "normal",
          weight: "bold",
        },
        titleColor: "white",
        bodyColor: "#00ff00",
        bodyAlign: "center",
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 0,
        max: 100,
        grace: "10%",

        title: {
          display: false,
        },
        ticks: {
          callback: (value) => {
            if (value < 5) {
              return "0%";
            } else if (value >= 5 && value <= 20) {
              return "20%";
            } else if (value > 20 && value <= 40) {
              return "40%";
            } else if (value >= 40 && value <= 60) {
              return "60%";
            } else if (value >= 60 && value <= 80) {
              return "80%";
            } else {
              return "100%";
            }
          },
        },

        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 9,
          },
        },
      },
    },
  };

  return (
    <>
      {distribucionVentas !== null && distribucionVentas.length > 0 ? (
        <Box>
          <Bar data={chartData} options={options} />
        </Box>
      ) : (
        <Box
          width={"100%"}
          height={"100%"}
          display={"flex"}
          justifyContent={"center"}
        >
          <Text color={"grey.placeholder"} alignSelf={"center"}>
            No existe registro de distribución.
          </Text>
        </Box>
      )}
    </>
  );
};

export default DistribucionVentas;
