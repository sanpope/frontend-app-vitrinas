import React, { useState, useEffect, useRef } from "react";
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
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setChartVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);

      const observer = new ResizeObserver(() => {
        if (containerRef.current) {
          setContainerWidth(containerRef.current.offsetWidth);
        }
      });

      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }

    return undefined;
  }, []);

  const safeData = Array.isArray(distribucionVentas) ? distribucionVentas : [];

  if (safeData.length === 0) {
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

  const isNarrowCriticalWidth = containerWidth > 0 && containerWidth < 310;

  const minWidthNeeded = Math.max(200, safeData.length * 8);

  const needsScroll =
    isNarrowCriticalWidth ||
    (minWidthNeeded > containerWidth && containerWidth > 0);

  const chartData = {
    labels: safeData.map((d) => d.hora),
    datasets: [
      {
        data: safeData.map((d) => d.valor),
        backgroundColor: "rgba(255, 99, 132, 0.7)",
        borderSkipped: false,
        borderRadius: isNarrowCriticalWidth ? 2 : safeData.length > 15 ? 5 : 10,

        barPercentage: 1.2,
        categoryPercentage: 0.99,
        hoverBackgroundColor: "rgba(230, 15, 15, 0.8)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    barThickness: 5,
    maxBarThickness: 20,
    animation: false,
    layout: {
      padding: {
        left: 0,
        right: isNarrowCriticalWidth ? 15 : 5,
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
        grace: "3%",
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
            size: 8,
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
        bounds: "data",
        ticks: {
          font: {
            size: 6,
          },
          maxRotation: 90,
          minRotation: 90,
          autoSkip: false,
          maxTicksLimit: safeData.length,
          padding: 0,
          align: "center",
        },
        offset: false,

        afterFit: (scale) => {
          scale.width = scale.width * 0.7;
          scale.paddingRight = 2;
        },
      },
    },
  };

  return (
    <Box
      ref={containerRef}
      width="100%"
      height="100%"
      display="flex"
      alignItems="flex-start"
      justifyContent="flex-start"
      overflow={needsScroll ? "auto" : "hidden"}
      position="relative"
      sx={{
        "&::-webkit-scrollbar": {
          height: "3px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,0.2)",
          borderRadius: "3px",
        },
      }}
    >
      <Box
        width={
          needsScroll
            ? isNarrowCriticalWidth
              ? "280px"
              : `${minWidthNeeded}px`
            : "100%"
        }
        height="100%"
        pb="2px"
        position="relative"
        pl="2px"
        pr={isNarrowCriticalWidth ? "10px" : "5px"}
      >
        {chartVisible && (
          <Bar
            data={chartData}
            options={{
              ...options,

              ...(isNarrowCriticalWidth && {
                elements: {
                  bar: {
                    borderWidth: 0,
                  },
                },
              }),
              layout: {
                ...options.layout,
                padding: {
                  ...options.layout.padding,
                  right: isNarrowCriticalWidth ? 5 : 2,
                },
              },
              plugins: {
                ...options.plugins,
                beforeInit: (chart) => {
                  chart.canvas.dispatchEvent(
                    new Event("chartjs-render-complete"),
                  );
                },
              },
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default DistribucionVentas;
