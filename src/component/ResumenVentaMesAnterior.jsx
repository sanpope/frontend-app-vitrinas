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

const ResumenVentaMesAnterior = ({ resumenVentaMesAnterior }) => {
  console.log(resumenVentaMesAnterior);

  if (!resumenVentaMesAnterior || resumenVentaMesAnterior.length === 0) {
    return (
      <Box
        width="100%"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text color="grey.placeholder">
          No se encontraron Registros de ventas en los meses anteriores.
        </Text>
      </Box>
    );
  }

  const fechaActual = new Date();
  const mesActual = fechaActual.getMonth() + 1;
  const curretYear = fechaActual.getFullYear();

  // Crear un array donde cada elemento tenga la etiqueta y su valor correspondiente
  const datosProcesados = resumenVentaMesAnterior
    .map((d) => {
      let month = mesesAbreviados[Number(d.mes) - 1];
      let isLastYear = Number(d.mes) > mesActual;

      // Si el mes es Diciembre y estamos en un mes distinto, es del año pasado
      if (d.mes === "12" && mesActual !== 12) {
        isLastYear = true;
      }

      if (isLastYear) {
        let lastYear = (curretYear - 1).toString().slice(-2);
        month += `-${lastYear}`;
      }

      return {
        etiqueta: month,
        valor: d.valor,
        mes: Number(d.mes),
        esActual: Number(d.mes) === mesActual,
      };
    })
    .reverse();

  // Extraer las etiquetas y valores manteniendo la correspondencia
  const monthLabels = datosProcesados.map((d) => d.etiqueta);

  const chartData = {
    labels: monthLabels,
    datasets: [
      {
        data: datosProcesados.map((d) => d.valor),
        fill: false,
        borderColor: "#000000",
        borderWidth: 2,
        pointBackgroundColor: datosProcesados.map((d) =>
          d.esActual ? "#E60F0F" : "#000000",
        ),
        pointRadius: 6,
        pointBorderWidth: 2,
        pointBorderColor: "white",
        pointHoverRadius: 8,
      },
    ],
  };

  const titleTooltip = () => "VENTAS:";

  const labelTooltip = (tooltipItem) => {
    const value = tooltipItem.dataset.data[tooltipItem.dataIndex];
    return `$ ${new Intl.NumberFormat().format(value)}`;
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
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
        beginAtZero: true,
        ticks: {
          stepSize: 1000000,
          color: "black",
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
        ticks: {
          maxRotation: 0,
          autoSkip: true,
        },
      },
    },
  };

  return (
    <Box
      width="100%"
      height="90%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        width="100%"
        position="relative"
        paddingTop="10px"
        paddingBottom="10px"
      >
        <Line data={chartData} options={options} />
      </Box>
    </Box>
  );
};

export default ResumenVentaMesAnterior;
