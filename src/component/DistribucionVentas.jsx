import React from "react";
import { Box } from "@chakra-ui/react";
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
  const canvasRef = React.useRef(null);

  const createGradient = (ctx, chartArea) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
    gradient.addColorStop(0, "rgba(255, 0, 0, 1)");
    gradient.addColorStop(1, "rgba(255, 0, 0, 0.2)");
    return gradient;
  };

  const chartData = {
    labels: distribucionVentas.map((d) => d.dia),
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

  const formatHour = (hora) => {
    const [start, endWithSuffix] = hora.split("-");
    const [end, suffix] = endWithSuffix.match(/\d+|am|pm/g);

    const formatTime = (time, suffix) => {
      let hours = parseInt(time);
      let period = suffix || "am";

      if (hours >= 12) {
        period = "pm";
        if (hours > 12) {
          hours -= 12;
        }
      } else if (hours === 0) {
        hours = 12;
      }

      return `${hours}:00${period}`;
    };

    const formattedStart = formatTime(start, suffix);
    const formattedEnd = formatTime(end, suffix);

    return `${formattedStart} - ${formattedEnd}`;
  };

  const titleTooltip = (tooltipItems) => {
    const [tooltipItem] = tooltipItems;
    const dataIndex = tooltipItem.dataIndex;
    const formattedHour = formatHour(chartData.labels[dataIndex]);
    return formattedHour;
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
        min: 0.5,
        max: 45,
        grace: "10%",

        title: {
          display: false,
        },
        ticks: {
          callback: (value) => {
            if (value < 5) {
              return "05%";
            } else if (value >= 5 && value === 10) {
              return "10%";
            } else if (value > 10 && value < 30) {
              return "15%";
            } else if (value >= 30 && value < 40) {
              return "30%";
            } else if (value >= 40) {
              return "40%";
            } else {
              return "50%";
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

  return <Bar data={chartData} options={options} />;
};

export default DistribucionVentas;
