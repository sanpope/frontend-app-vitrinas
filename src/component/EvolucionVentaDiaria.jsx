import React, { useRef } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
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
import colors from "../theme/colors";

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
  const scrollContainerRef = useRef(null);

  const getDaysUntilCurrentDay = () => {
    const date = new Date();
    const currentDay = date.getDate();
    const days = Array.from({ length: currentDay }, (_, i) => i + 1);
    return days.reverse();
  };

  const currentDay = new Date().getDate();
  const daysUntilCurrent = getDaysUntilCurrentDay();

  const ventasPorDia = {};
  evolucionVentaDiaria?.forEach((d) => {
    ventasPorDia[d.dia] = d.valor < 0 ? 0 : d.valor;
  });

  const totalDays = daysUntilCurrent.length;
  const pointSpacing = 25;
  const requiredWidth = totalDays * pointSpacing;

  const formatNumberToK = (value) => {
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + "k";
    }
    return value;
  };

  const values = daysUntilCurrent.map((dia) => ventasPorDia[dia] || 0);
  const maxValue = Math.max(...values, 1);
  const fixedStepSize = 200;
  const stepsNeeded = Math.ceil(maxValue / fixedStepSize);
  const steps = Math.min(stepsNeeded, 5);
  const yAxisValues = Array.from(
    { length: steps + 1 },
    (_, i) => i * fixedStepSize,
  );

  const data = {
    labels: daysUntilCurrent,
    datasets: [
      {
        data: daysUntilCurrent.map((dia) => ventasPorDia[dia] || 0),
        label: "Ventas",
        borderColor: "rgba(230, 15, 15, 1)",
        backgroundColor: "rgba(230, 15, 15, 1)",
        pointBackgroundColor: (context) => {
          const index = context.dataIndex;
          const dia = daysUntilCurrent[index];
          return dia === currentDay
            ? "rgba(0, 0, 0, 1)"
            : "rgba(230, 15, 15, 1)";
        },
        pointBorderColor: (context) => {
          const index = context.dataIndex;
          const dia = daysUntilCurrent[index];
          return dia === currentDay
            ? "rgba(0, 0, 0, 1)"
            : "rgba(230, 15, 15, 1)";
        },
        pointHoverBackgroundColor: (context) => {
          const index = context.dataIndex;
          const dia = daysUntilCurrent[index];
          return dia === currentDay
            ? "rgba(0, 0, 0, 1)"
            : "rgba(230, 15, 15, 1)";
        },
        pointHoverBorderColor: (context) => {
          const index = context.dataIndex;
          const dia = daysUntilCurrent[index];
          return dia === currentDay
            ? "rgba(0, 0, 0, 1)"
            : "rgba(230, 15, 15, 1)";
        },
        borderWidth: 2,
        pointRadius: 2,
        pointHoverRadius: 5,
        pointStyle: "circle",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    animation: false,
    animations: {
      colors: false,
      x: false,
      y: false,
    },
    transitions: {
      active: {
        animation: {
          duration: 0,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: "nearest",
        intersect: true,
        displayColors: false,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        bodyColor: "#ffffff",
        bodyFont: {
          size: 14,
          weight: "bold",
        },
        padding: 8,
        titleAlign: "center",
        bodyAlign: "center",
        callbacks: {
          title: function () {
            return null;
          },
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            if (value !== undefined && !isNaN(value)) {
              return value.toLocaleString();
            }
            return "0";
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
          stepSize: 200,
          maxTicksLimit: 5,
          callback: function (value) {
            return formatNumberToK(value);
          },
          display: false,
        },
        border: {
          display: false,
          dash: [2, 6],
          dashOffset: 1,
        },
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.1)",
        },
        position: "left",
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          font: {
            size: 12,
          },
        },
        border: {
          display: false,
        },
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 0,
      },
    },
  };

  const visibleDays = 8;
  const visibleWidth = visibleDays * pointSpacing;
  const yAxisWidth = 50;

  return (
    <>
      {daysUntilCurrent?.length > 0 ? (
        <Flex height="150px" position="relative">
          <Box
            width={`${yAxisWidth}px`}
            height="100%"
            position="relative"
            zIndex="2"
            bg="white"
            display="flex"
            flexDirection="column-reverse"
            justifyContent="space-between"
            paddingY="10px"
          >
            {yAxisValues.map((value, index) => (
              <Text
                key={index}
                fontSize="xs"
                color="gray.500"
                textAlign="right"
                paddingRight="5px"
              >
                {formatNumberToK(value)}
              </Text>
            ))}
          </Box>

          <Box
            height="100%"
            paddingBottom={2}
            flex="1"
            overflowX="auto"
            ref={scrollContainerRef}
            position="relative"
            css={{
              "&::-webkit-scrollbar": {
                width: "2px",
                height: "2px",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                background: colors.grey[20],
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: colors.grey.placeholder[10],
              },
              "&::-webkit-scrollbar-corner": {
                background: "transparent",
              },
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "thin",
              scrollbarColor: `${colors.grey[20]} transparent`,
            }}
          >
            <Box
              width={`${requiredWidth}px`}
              height="100%"
              minWidth={`${visibleWidth}px`}
            >
              <Line ref={chartRef} data={data} options={options} />
            </Box>
          </Box>
        </Flex>
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
