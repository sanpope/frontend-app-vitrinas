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
import { useRef } from "react";
import { useEffect } from "react";

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
        borderColor: "rgba(230, 15, 15, 1)",
        backgroundColor: "rgba(230, 15, 15, 1)",
        pointBackgroundColor: "rgba(230, 15, 15, 1)",
        pointBorderColor: "rgba(230, 15, 15, 1)",
        pointHoverBackgroundColor: "rgba(230, 15, 15, 1)",
        pointHoverBorderColor: "rgba(230, 15, 15, 1)",
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

  useEffect(() => {
    if (chartRef.current && dias.length > 7) {
      const chart = chartRef.current;
      const scrollWidth = (dias.length - 7) * (chart.width / 7);
      chart.canvas.parentNode.style.width = `${chart.width + scrollWidth}px`;
    }
  }, [dias]);

  return (
    <>
      {dias?.length > 0 && dias !== null ? (
        <Box
          w={"100%"}
          maxW={"225px"}
          overflowX="auto"
          css={{
            "&::-webkit-scrollbar": { display: "none" },
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
          }}
        >
          <Box
            minWidth={
              dias.length > 0 && dias.length < 7
                ? "100%"
                : dias.length > 7 && dias.length < 20
                  ? "200%"
                  : "300%"
            }
          >
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
