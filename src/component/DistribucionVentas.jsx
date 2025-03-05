import React, { useState, useEffect } from "react";
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
  const [chartVisible, setChartVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setChartVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const safeData = Array.isArray(distribucionVentas) ? distribucionVentas : [];

  const chartData = {
    labels: safeData.map((d) => d.hora),
    datasets: [
      {
        data: safeData.map((d) => d.valor),
        backgroundColor: "rgba(255, 99, 132, 0.7)",
        borderSkipped: false,
        borderRadius: 20,
        barPercentage: 0.7,
        categoryPercentage: 0.9,
        hoverBackgroundColor: "rgba(230, 15, 15, 0.8)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    barThickness: 25,
    animation: false,
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 20,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        displayColors: false,
        callbacks: {
          label: (context) => `${context.parsed.y}%`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 100,
        grace: "10%",
        title: {
          display: false,
        },
        ticks: {
          callback: (value) => {
            if (value < 5) return "0%";
            if (value <= 20) return "20%";
            if (value <= 40) return "40%";
            if (value <= 60) return "60%";
            if (value <= 80) return "80%";
            return "100%";
          },
          font: {
            size: 9,
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
          maxRotation: 0,
          autoSkip: false,
          maxTicksLimit: 24,
          padding: 5,
        },
        offset: true,
      },
    },
  };

  if (!Array.isArray(distribucionVentas) || distribucionVentas.length === 0) {
    return (
      <Box
        width="100%"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Text color="grey.placeholder">Sin información</Text>
      </Box>
    );
  }

  return (
    <Box
      width="100%"
      minW={"300px"}
      height="100%"
      display="flex"
      alignItems="flex-start"
      justifyContent="flex-start"
    >
      <Box width="100%" height="100%">
        {chartVisible && <Bar data={chartData} options={options} />}
      </Box>
    </Box>
  );
};

export default DistribucionVentas;
