import React from "react";
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
import "chartjs-adapter-date-fns";
import { Box, Text } from "@chakra-ui/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const titleTooltip = () => {
  return "VENTAS:";
};

const labelTooltip = (tooltipItem) => {
  const value = tooltipItem.dataset.data[tooltipItem.dataIndex];
  return `$ ${new Intl.NumberFormat().format(value)}`;
};

const options = {
  responsive: true,
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
        beginAtZero: true,
        maxTicksLimit: 3,
        callback: function (value) {
          if (value >= 1000000) {
            return (value / 1000000).toFixed(1) + "M";
          } else if (value >= 1000) {
            return (value / 1000).toFixed(1) + "k";
          } else {
            return value;
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

const mesesAbreviados = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

const VentasMesesAnteriores = ({ VentasMesAnterior, ventaMesActual }) => {
  const fechaActual = new Date();
  const mesActual = fechaActual.getMonth() + 1;
  const anioActual = fechaActual.getFullYear();

  // Añadir el mes actual al inicio del array
  const ventasActualizadas = [
    {
      mes: mesActual.toString(),
      valor: ventaMesActual.valor,
      anio: anioActual,
    },
    ...VentasMesAnterior.map((v) => ({
      ...v,
      anio: v.mes <= mesActual ? anioActual : anioActual - 1,
    })),
  ].slice(0, 12); // Mantener solo los últimos 12 meses

  const monthLabels = ventasActualizadas
    .map((d, index) => {
      let month = mesesAbreviados[Number(d.mes) - 1];
      if (d.anio < anioActual) {
        month += `-${d.anio.toString().slice(-2)}`;
      }
      return month;
    })
    .reverse();

  const chartData = {
    labels: monthLabels,
    datasets: [
      {
        data: ventasActualizadas
          .map((d) => Math.max(0, Number(d.valor)))
          .reverse(),
        fill: false,
        borderColor: "#000000",
        borderWidth: 2,
        pointBackgroundColor: ventasActualizadas
          .map((d) =>
            d.mes === mesActual.toString() && d.anio === anioActual
              ? "#E60F0F"
              : "#000000",
          )
          .reverse(),
        pointRadius: 6,
        pointBorderWidth: 2,
        pointBorderColor: "white",
        pointHoverRadius: 8,
      },
    ],
  };

  return (
    <>
      {ventasActualizadas.length > 0 ? (
        <Box mt={{ base: 1, xl: 4 }}>
          <Line data={chartData} options={options} />
        </Box>
      ) : (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          mt={"50px"}
        >
          <Text color={"grey.placeholder"}>
            No existen ventas registradas en los meses anteriores
          </Text>
        </Box>
      )}
    </>
  );
};

export default VentasMesesAnteriores;
