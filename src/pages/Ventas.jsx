import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Box, Select, Text } from "@chakra-ui/react";
import TablaVentas from "../component/TablaVentas";
import DatePickerComponent from "../component/DatePickerComponent";
import Container from "../component/Container";

import CoinsIcon from "../assets/images/CoinsIcon";
import ChartLineDownIcon from "../assets/images/ChartLineDownIcon";
import HandsUsdIcon from "../assets/images/HandsUsdIcon";

import xmlToJSON from "../services/XmlToJsonConverter";
import ventasData from "../services/ventasData";

export default function Ventas() {
  const city = useSelector((state) => state.vitrinaReducer.city);
  const name = useSelector((state) => state.vitrinaReducer.name);
  const [selectedOption, setSelectedOption] = useState("Todos");

  const [tablaVentas, setTablaVentas] = useState(null);
  const [tablaDevoluciones, setTablaDevoluciones] = useState([]);
  const [listadoProductos, setListadoProductos] = useState(null);

  const [displayedArticulos, setDisplayedArticulos] = useState(
    tablaVentas ? tablaVentas : [],
  );
  const [totalResults, setTotalResults] = useState(null);
  const [loading, toggleLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsToShow, setRowsToShow] = useState(11);
  const totalPages = Math.ceil(tablaVentas?.length / rowsToShow);

  useEffect(() => {
    parseData();
  }, []);

  useEffect(() => {
    getMasArticulos(1);
  }, [tablaVentas]);

  useEffect(() => {
    if (tablaVentas) {
      setDisplayedArticulos(
        selectedOption === "Todos"
          ? [...tablaVentas, ...tablaDevoluciones]
          : selectedOption === "Devoluciones"
            ? tablaDevoluciones
            : tablaVentas,
      );
      setTotalResults(
        selectedOption === "Todos"
          ? [...tablaVentas, ...tablaDevoluciones].length
          : selectedOption === "Devoluciones"
            ? tablaDevoluciones.length
            : tablaVentas.length,
      );
    }
  }, [selectedOption]);

  const parseData = () => {
    const resumenInfo = xmlToJSON(ventasData);
    const totalVentas =
      resumenInfo?.datosDeVentas?.ventasYDevoluciones?.vtasDeIntervalo;
    const totalDevoluciones =
      resumenInfo?.datosDeVentas?.ventasYDevoluciones?.devDeIntervalo;
    const infoTotalVentas = [];
    const infoTotalDevs = [];

    totalVentas.forEach((intervaloVenta) => {
      const { totalVtas, venta } = intervaloVenta;
      const { codigo, fechaHora, valor, generadaEnCorreccion, prodsAfectados } =
        venta;
      // Crear un objeto para la información de la venta
      let ventaInfo = {
        totalVtas: totalVtas["#text"],
        valor: valor["#text"],
        codigo: codigo["#text"],
        fechaHora: fechaHora["#text"],
        generadaEnCorreccion: generadaEnCorreccion["#text"],
        prodsAMostrar: [],
        totalProds: [],
      };

      prodsAfectados.producto.forEach((producto, index) => {
        const productoInfo = {
          nombre: producto.nombre["#text"],
          cantidad: producto.cantidad["#text"],
        };
        ventaInfo.totalProds.push(productoInfo);

        if (index < 2) {
          ventaInfo[`nombre${index + 1}`] = productoInfo.nombre;
          ventaInfo[`cantidad${index + 1}`] = productoInfo.cantidad;
          ventaInfo.prodsAMostrar.push(productoInfo);
        }
      });
      infoTotalVentas.push(ventaInfo);
    });
    setTablaVentas(infoTotalVentas);

    totalDevoluciones.forEach((intervaloDev) => {
      const { totalDevs, devolucion } = intervaloDev;
      const { codigo, fechaHora, valor, generadaEnCorreccion, prodsAfectados } =
        devolucion;
      // Crear un objeto para la información de la dev
      let devInfo = {
        totalDevs: totalDevs["#text"],
        valor: valor["#text"],
        codigo: codigo["#text"],
        fechaHora: fechaHora["#text"],
        generadaEnCorreccion: generadaEnCorreccion["#text"],
        prodsAMostrar: [],
        totalProds: [],
      };

      prodsAfectados.producto.forEach((producto, index) => {
        const productoInfo = {
          nombre: producto.nombre["#text"],
          cantidad: producto.cantidad["#text"],
        };
        devInfo.totalProds.push(productoInfo);

        if (index < 2) {
          devInfo[`nombre${index + 1}`] = productoInfo.nombre;
          devInfo[`cantidad${index + 1}`] = productoInfo.cantidad;
          devInfo.prodsAMostrar.push(productoInfo);
        }
      });
      infoTotalDevs.push(devInfo);
    });
    setTablaDevoluciones(infoTotalDevs);
    setTotalResults([...infoTotalDevs, ...infoTotalVentas].length);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const getMasArticulos = (pageNumber) => {
    toggleLoading(true);
    setCurrentPage(pageNumber);
    setDisplayedArticulos(
      tablaVentas?.slice(
        (pageNumber - 1) * rowsToShow,
        (pageNumber - 1) * rowsToShow + rowsToShow,
      ),
    );
  };

  React.useEffect(() => {
    getMasArticulos(1);
  }, []);

  return (
    <Box
      bg={"mainBg"}
      height={"100%"}
      display={"flex"}
      flexDir={"column"}
      overflowY={"auto"}
      p={"1.25rem"}
    >
      <Box
        w={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        alignContent={"center"}
        flexWrap={"wrap"}
      >
        <Box
          display={"flex"}
          flexDir={"column"}
          gap={"10px"}
          flex={"1 1 200px"}
        >
          <Text textStyle={" RobotoBody"}>
            {name} - {city}
          </Text>
          <Text textStyle={"RobotoTitleBold"}>Ventas</Text>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"flex-end"}
          alignItems={"center"}
          flex={"1 1 200px"}
          gap={"10px"}
          flexWrap={{ base: "wrap", md: "nowrap" }}
        >
          <DatePickerComponent />
          <Select
            borderColor={"grey.placeholder"}
            bg={"white"}
            borderRadius={"5px"}
            minW={"7.5rem"}
            flex={"0 1 250px"}
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option>Todos</option>
            <option>Ventas</option>
            <option>Devoluciones</option>
          </Select>
        </Box>
        <Box></Box>
      </Box>
      <Box w={"100%"} display="flex" flexDir={"column"} mb="1rem" flexGrow={1}>
        <TablaVentas
          displayedArticulos={displayedArticulos}
          totalResults={totalResults}
          currentPage={currentPage}
          totalPages={totalPages}
          getMasArticulos={getMasArticulos}
          tableTitle={
            selectedOption === "Ventas"
              ? "Productos Vendidos"
              : selectedOption === "Devoluciones"
                ? "Productos Devueltos"
                : "Productos"
          }
          productosRestantes={listadoProductos?.length - 2}
        />
      </Box>

      <Box
        w={"100%"}
        display="flex"
        flexWrap={"wrap"}
        gridGap={"1rem"}
        justifyContent={"space-between"}
      >
        <Container
          flex={"1 1 auto"}
          bg={"black"}
          title={"Total vendido en el intervalo"}
          color="white"
          icon={<CoinsIcon />}
          children={
            <Box
              h={"100%"}
              display={"flex"}
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"flex-start"}
              p={"20px"}
            >
              <Text textStyle={"RobotoHeader"} color={"success.30"}>
                $22.000.000
              </Text>
            </Box>
          }
        />
        <Container
          flex={"1 1 auto"}
          title={"Total devuelto en el intervalo"}
          icon={<ChartLineDownIcon />}
          children={
            <Box
              h={"100%"}
              display={"flex"}
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"flex-start"}
              p={"20px"}
            >
              <Text textStyle={"RobotoSubheading"}>$2.000</Text>
            </Box>
          }
        />
        <Container
          flex={"1 1 auto"}
          title={"Ingreso real recibido en el intervalo"}
          icon={<HandsUsdIcon />}
          children={
            <Box
              h={"100%"}
              display={"flex"}
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"flex-start"}
              p={"20px"}
            >
              <Text textStyle={"RobotoSubheading"}>$10.000</Text>
            </Box>
          }
        />
      </Box>
    </Box>
  );
}
