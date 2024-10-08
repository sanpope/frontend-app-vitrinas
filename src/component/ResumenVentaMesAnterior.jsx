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

let arrResumenVentasMesAnterior;
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
  arrResumenVentasMesAnterior = resumenVentaMesAnterior
    ?.map((d) => {
      return Number(d?.valor).toLocaleString("es-ES");
    })
    .reverse();

  const fechaActual = new Date();
  const mesActual = fechaActual.getMonth() + 1; // Cambiado para que vaya de 1 a 12
  const curretYear = fechaActual.getFullYear();
  let lastYear = false;

  const monthLabels = resumenVentaMesAnterior
    ?.map((d) => {
      let month = mesesAbreviados[Number(d.mes) - 1];
      if (d.mes === "12") {
        lastYear = true;
      }
      if (lastYear) {
        let LastYear = (curretYear - 1).toString().slice(-2);
        month += `-${LastYear}`;
      }
      return month;
    })
    .reverse();

  const chartData = {
    labels: monthLabels,
    datasets: [
      {
        data: resumenVentaMesAnterior?.map((d) => {
          return d?.valor;
        }),
        fill: false,
        borderColor: "#000000",
        borderWidth: 2,
        pointBackgroundColor: resumenVentaMesAnterior
          ?.map((d) => {
            return Number(d.mes) === mesActual ? "#FF0000" : "#000000";
          })
          .reverse(),
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
    const value = tooltipItem.dataset.data[dataIndex];

    let formattedValue;

    if (value >= 1000000) {
      formattedValue = `$ ${new Intl.NumberFormat().format(value)}`;
    } else if (value >= 1000) {
      formattedValue = `$ ${new Intl.NumberFormat().format(value)}`;
    } else {
      formattedValue = `$ ${new Intl.NumberFormat().format(value)}`;
    }

    return `${formattedValue}`;
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
          beginAtZero: true,
          min: 0,
          max: 5000,
          stepSize: 5000,
          maxTicksLimit: 3,
          callback: function (value, index, values) {
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

  return (
    <Box width={"100%"} height={"100%"} display={"flex"} alignItems={"center"}>
      {resumenVentaMesAnterior != null &&
      resumenVentaMesAnterior?.length > 0 ? (
        <Line data={chartData} options={options} />
      ) : (
        <Box>
          <Text color={"grey.placeholder"}>
            No se encontraron Registros de ventas en los meses anteriores.
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default ResumenVentaMesAnterior;
