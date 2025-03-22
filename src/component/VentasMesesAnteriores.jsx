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

const parseNumberSafely = (value) => {
  if (typeof value === "number") return value;

  if (typeof value === "string") {
    if (/^\d{1,3}(\.\d{3})+$/.test(value)) {
      const cleanValue = value.replace(/\./g, "");

      return Number(cleanValue);
    }

    let result = Number(value);
    if (!isNaN(result)) {
      return result;
    }

    const cleanValue = value.replace(/\./g, "").replace(/,/g, ".");
    result = Number(cleanValue);
    if (!isNaN(result)) {
      return result;
    }

    const altCleanValue = value.replace(/,/g, ".");
    result = Number(altCleanValue);
    if (!isNaN(result)) {
      return result;
    }
  }

  return 0;
};

const VentasMesesAnteriores = ({ VentasMesAnterior, ventaMesActual }) => {
  const fechaActual = new Date();
  const mesActual = fechaActual.getMonth() + 1;
  const anioActual = fechaActual.getFullYear();

  const valorMesActual = parseNumberSafely(ventaMesActual.valor);

  const ventasMesesAnterioresFiltradas = VentasMesAnterior.filter(
    (v) => v.mes !== mesActual.toString(),
  );

  const ventasActualizadas = [
    {
      mes: mesActual.toString(),
      valor: valorMesActual,
      anio: anioActual,
    },
    ...ventasMesesAnterioresFiltradas.map((v) => {
      const valorProcesado = parseNumberSafely(v.valor);

      return {
        ...v,
        valor: valorProcesado,
        anio: v.mes <= mesActual ? anioActual : anioActual - 1,
      };
    }),
  ].slice(0, 12);

  const datosRevertidos = [...ventasActualizadas].reverse();

  const monthLabels = ventasActualizadas
    .map((d) => {
      let month = mesesAbreviados[Number(d.mes) - 1];
      if (d.anio < anioActual) {
        month += `-${d.anio.toString().slice(-2)}`;
      }
      return month;
    })
    .reverse();

  const colors = datosRevertidos.map((item) =>
    item.mes === mesActual.toString() && item.anio === anioActual
      ? "#E60F0F"
      : "#000000",
  );

  const valoresDataset = datosRevertidos.map((d) => Math.max(0, d.valor));

  const chartData = {
    labels: monthLabels,
    datasets: [
      {
        data: valoresDataset,
        fill: false,
        borderColor: "#000000",
        borderWidth: 2,
        pointBackgroundColor: colors,
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
        <Box
          w="100%"
          h="100%"
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
        >
          <Line
            data={chartData}
            options={options}
            style={{
              maxHeight: "100%",
              width: "100%",
            }}
          />
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          h="100%"
          w="100%"
        >
          <Text color="grey.placeholder">
            No existen ventas registradas en los meses anteriores
          </Text>
        </Box>
      )}
    </>
  );
};

export default VentasMesesAnteriores;
