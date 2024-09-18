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
import axios from "axios";
import { parseData } from "../utils/xmlParse";

export default function Ventas() {
  const city = useSelector((state) => state.vitrinaReducer.city);
  const name = useSelector((state) => state.vitrinaReducer.name);
  const [selectedOption, setSelectedOption] = useState("Todos");

  const [tablaVentas, setTablaVentas] = useState(null);
  const [tablaDevoluciones, setTablaDevoluciones] = useState([]);
  const [listadoProductos, setListadoProductos] = useState(null);

  const [displayedArticulos, setDisplayedArticulos] = useState(null);
  const [totalResults, setTotalResults] = useState(null);
  const [loading, toggleLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsToShow, setRowsToShow] = useState(15);
  const totalPages = Math.ceil(tablaVentas?.length / rowsToShow);

  useEffect(() => {
    getIntervaloVentas();
  }, []);

  useEffect(() => {
    getMasArticulos(1);
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

  const getVentasyDevoluciones = (xml) => {
    const devoluciones = xml.getElementsByTagName("devolucion");
    const ventas = xml.getElementsByTagName("venta");

    // Array para almacenar la información extraída
    const result = {
      devoluciones: [],
      ventas: [],
    };

    // Iteramos sobre devoluciones
    for (let i = 0; i < devoluciones.length; i++) {
      const devolucion = devoluciones[i];
      const fechaHora =
        devolucion.getElementsByTagName("fechaHora")[0].textContent;
      const generadaEnCorreccion = devolucion.getElementsByTagName(
        "generadaEnCorreccion",
      )[0].textContent;
      const productos = devolucion.getElementsByTagName("producto");

      // Almacenamos los productos afectados
      const productosAfectados = [];
      for (let j = 0; j < productos.length; j++) {
        productosAfectados.push({
          cantidad:
            productos[j].getElementsByTagName("cantidad")[0].textContent,
          codigo: productos[j].getElementsByTagName("codigo")[0].textContent,
          nombre: productos[j].getElementsByTagName("nombre")[0].textContent,
          precio: productos[j].getElementsByTagName("precio")[0].textContent,
        });
      }

      // Guardamos la devolución en el array
      result.devoluciones.push({
        fechaHora,
        generadaEnCorreccion,
        productosAfectados,
        valor: devolucion.getElementsByTagName("valor")[0].textContent,
      });
    }

    // Iteramos sobre ventas
    for (let i = 0; i < ventas.length; i++) {
      const venta = ventas[i];
      const fechaHora = venta.getElementsByTagName("fechaHora")[0].textContent;
      const generadaEnCorreccion = venta.getElementsByTagName(
        "generadaEnCorreccion",
      )[0].textContent;
      const productos = venta.getElementsByTagName("producto");

      // Almacenamos los productos afectados
      const productosAfectados = [];
      for (let j = 0; j < productos.length; j++) {
        productosAfectados.push({
          cantidad:
            productos[j].getElementsByTagName("cantidad")[0].textContent,
          codigo: productos[j].getElementsByTagName("codigo")[0].textContent,
          nombre: productos[j].getElementsByTagName("nombre")[0].textContent,
          precio: productos[j].getElementsByTagName("precio")[0].textContent,
        });
      }

      // Guardamos la venta en el array
      result.ventas.push({
        fechaHora,
        generadaEnCorreccion,
        productosAfectados,
        valor: venta.getElementsByTagName("valor")[0].textContent,
      });
    }
    console.log(result);
    return result;
  };

  const getIntervaloVentas = async () => {
    let fechaInicio = "2024-09-01";
    let fechaFin = "2024-09-17";
    let url1 = `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina/ventas-devoluciones/parte-de-intervalo?nombreVitrina=${name}&fechaPartida=${fechaInicio}&numeroDeElementos=${rowsToShow}&fechaLimite=${fechaFin}`;
    let url2 = `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina/ventas-devoluciones/intervalo?nombreVitrina=${name}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&numeroDeElementos=${rowsToShow}`;
    try {
      const response = await axios.get(url2, {
        headers: {
          "Content-Type": "application/xml",
        },
      });
      console.log(response);

      const xmlDoc = parseData(response.data);
      console.log(xmlDoc);
      // const { ventas, devoluciones } = getVentasyDevoluciones(xmlDoc);
      // setTablaVentas(ventas);
      // setTablaDevoluciones(devoluciones);
      // setTotalResults([...ventas, ...devoluciones]?.length);
      // setDisplayedArticulos([...ventas, ...devoluciones]);
    } catch (error) {
      if (error.response) {
        // La solicitud fue enviada pero el servidor respondió con un código de error
        console.error(
          "Error en la respuesta del servidor:",
          error.response.status,
        );
        console.error("Detalles:", error.response.data);
      } else if (error.request) {
        // La solicitud fue enviada pero no se recibió respuesta
        console.error("No se recibió respuesta del servidor:", error.request);
      } else {
        // Ocurrió un error en la configuración de la solicitud
        console.error("Error en la solicitud:", error.message);
      }
    } finally {
    }
  };

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
          gap={{ base: "20px", lg: "10px" }}
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
          py={{ base: "15px", lg: "0px" }}
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
          selectedOption={selectedOption}
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
