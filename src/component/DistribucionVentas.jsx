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
  const [maxValueItem, setMaxValueItem] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const containerRef = useRef(null);

  const rangosFijos = [
    { rango: "0-6am", etiqueta: "0-6am", valor: 0 },
    { rango: "6-10am", etiqueta: "6-10am", valor: 0 },
    { rango: "10-3pm", etiqueta: "10-3pm", valor: 0 },
    { rango: "3-8pm", etiqueta: "3-8pm", valor: 0 },
    { rango: "8-12pm", etiqueta: "8-12pm", valor: 0 },
  ];

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

  const procesarDatosEnRangos = () => {
    if (!Array.isArray(distribucionVentas) || distribucionVentas.length === 0) {
      return rangosFijos;
    }

    const rangosConValores = [...rangosFijos];

    distribucionVentas.forEach((item) => {
      const match = item.hora.match(/(\d+)\s*(AM|PM)/i);
      if (!match) return;

      let hora = parseInt(match[1]);
      const periodo = match[2].toUpperCase();

      if (periodo === "PM" && hora < 12) {
        hora += 12;
      } else if (periodo === "AM" && hora === 12) {
        hora = 0;
      }

      if (hora >= 0 && hora < 6) {
        rangosConValores[0].valor += item.valor;
      } else if (hora >= 6 && hora < 10) {
        rangosConValores[1].valor += item.valor;
      } else if (hora >= 10 && hora < 15) {
        rangosConValores[2].valor += item.valor;
      } else if (hora >= 15 && hora < 20) {
        rangosConValores[3].valor += item.valor;
      } else if (hora >= 20 && hora <= 23) {
        rangosConValores[4].valor += item.valor;
      }
    });

    const totalValor = rangosConValores.reduce(
      (sum, item) => sum + item.valor,
      0,
    );
    if (totalValor > 0) {
      rangosConValores.forEach((item) => {
        item.valor = Math.round((item.valor / totalValor) * 100);
      });
    }

    return rangosConValores;
  };

  const datosAgrupados = procesarDatosEnRangos();

  useEffect(() => {
    if (datosAgrupados.length > 0) {
      const maxItem = datosAgrupados.reduce(
        (max, item) => (item.valor > max.valor ? item : max),
        datosAgrupados[0],
      );
      setMaxValueItem(maxItem);
    }
  }, [distribucionVentas]);

  if (
    datosAgrupados.length === 0 ||
    datosAgrupados.every((item) => item.valor === 0)
  ) {
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

  const getBarColors = () => {
    return datosAgrupados.map((item, index) => {
      return "#FDE7E7";
    });
  };

  const chartData = {
    labels: datosAgrupados.map((d) => d.etiqueta),
    datasets: [
      {
        data: datosAgrupados.map((d) => d.valor),
        backgroundColor: getBarColors(),
        hoverBackgroundColor: "#E60F0F",
        borderWidth: 0,
        borderRadius: {
          topRight: 4,
          bottomRight: 4,
        },
        barThickness: 16,
        maxBarThickness: 20,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 5,
        right: 5,
        top: 15,
        bottom: 5,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        displayColors: false,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        padding: 8,
        callbacks: {
          label: (context) => `${context.parsed.x}%`,
          title: (context) => context[0].label,
          labelTextColor: () => "#00BC4F",
        },
      },

      datalabels: {
        display: false,
      },
    },
    scales: {
      y: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 10,
            weight: "normal",
          },
          color: "rgba(0, 0, 0, 1)",
        },
      },
      x: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        border: {
          display: false,
        },
        ticks: {
          stepSize: 20,
          callback: (value) => `${value}%`,
          font: {
            size: 9,
          },
        },
      },
    },
    onResize: (chart, size) => {
      const canvas = chart.canvas;
      if (canvas) {
        canvas.style.minWidth = "250px";
        canvas.style.width = "100%";
      }
    },
    onHover: (event, chartElements) => {
      if (chartElements && chartElements.length > 0) {
        setHoveredIndex(chartElements[0].index);
      } else {
        setHoveredIndex(-1);
      }
    },
  };

  const getPlugins = () => [];

  return (
    <Box
      ref={containerRef}
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
    >
      <Box width="100%" height="100%" minWidth="250px">
        {chartVisible && (
          <Bar data={chartData} options={options} plugins={getPlugins()} />
        )}
      </Box>
    </Box>
  );
};

export default DistribucionVentas;
