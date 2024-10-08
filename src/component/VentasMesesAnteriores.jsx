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

const VentasMesesAnteriores = ({ VentasMesAnterior }) => {
  console.log(VentasMesAnterior);
  const fechaActual = new Date();
  const mesActual = fechaActual.getMonth() + 1;
  const curretYear = fechaActual.getFullYear();
  let lastYear = false;

  const monthLabels = VentasMesAnterior?.map((d) => {
    let month = mesesAbreviados[Number(d.mes) - 1];
    if (d.mes === "12") {
      lastYear = true;
    }
    if (lastYear) {
      let LastYear = (curretYear - 1).toString().slice(-2);
      month += `-${LastYear}`;
    }
    return month;
  }).reverse();

  const arrVentasMesAnterior = VentasMesAnterior?.map((d) =>
    Number(d?.valor).toLocaleString("es-ES"),
  ).reverse();

  const chartData = {
    labels: monthLabels,
    datasets: [
      {
        data: VentasMesAnterior?.map((d) => d?.valor).reverse(),
        fill: false,
        borderColor: "#000000",
        borderWidth: 2,
        pointBackgroundColor: VentasMesAnterior?.map((d) => {
          return Number(d.mes) === mesActual ? "#FF0000" : "#000000";
        }).reverse(),
        pointRadius: 6,
        pointBorderWidth: 2,
        pointBorderColor: "white",
        pointHoverRadius: 8,
      },
    ],
  };

  return (
    <>
      {VentasMesAnterior != null && VentasMesAnterior?.length > 0 ? (
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
