import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Box, Select, Text, useDisclosure } from "@chakra-ui/react";
import TablaVentas from "../component/TablaVentas";
import DatePickerComponent from "../component/DatePickerComponent";
import Container from "../component/Container";

import CoinsIcon from "../assets/images/CoinsIcon";
import ChartLineDownIcon from "../assets/images/ChartLineDownIcon";
import HandsUsdIcon from "../assets/images/HandsUsdIcon";

import axios from "axios";
import { parseData } from "../utils/xmlParse";
import { formatearNumero, formattingDate } from "../utils/formatting";
import { HEADER_HEIGHT } from "../component/Header";
import VerExistencias from "../component/VerExistencias";

const ROWS_TO_SHOW = 30;

const TOP_SECTION_HEIGHT = 64;
const BOTTOM_SECTION_HEIGHT = 141.5;
const BOTTOM_SECTION_HEIGHT_MOBILE = 289.5;
const MARGINS = 16;

const FINAL_DATE = new Date();
const START_DATE = new Date(FINAL_DATE.getFullYear(), FINAL_DATE.getMonth(), 1);

export default function Ventas() {
  const city = useSelector((state) => state.vitrinaReducer.city);
  const name = useSelector((state) => state.vitrinaReducer.name);
  const [selectedOption, setSelectedOption] = useState("Ventas");

  const [tablaVentas, setTablaVentas] = useState([]);
  const [tablaDevoluciones, setTablaDevoluciones] = useState([]);
  const [displayedArticulos, setDisplayedArticulos] = useState(null);
  const [totalResults, setTotalResults] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, toggleLoading] = useState(false);

  const totalPages = Math.ceil(tablaVentas?.length / ROWS_TO_SHOW);

  const [totalVendidoIntervalo, setTotalVendidoIntervalo] = useState();
  const [totalDevueltoIntervalo, setTotalDevueltoIntervalo] = useState();
  const [ingresoRecibidoIntervalo, setIngresoRecibido] = useState();

  const [fechaInicio, setFechaInicio] = useState(START_DATE);
  const [fechaFin, setFechaFin] = useState(FINAL_DATE);

  const [prods, setProds] = useState(null);
  const [fechaAct, setFechaActual] = useState(null);
  const [valorTotal, setValorTotal] = useState(null);

  useEffect(() => {
    getTotalIntervaloVentas(fechaInicio, fechaFin);
  }, []);

  useEffect(() => {
    if (tablaVentas) {
      setDisplayedArticulos(
        selectedOption === "Ventas" ? tablaVentas : tablaDevoluciones,
      );
      setTotalResults(
        selectedOption === "Ventas"
          ? tablaVentas?.length
          : tablaDevoluciones?.length,
      );
    }
  }, [selectedOption]);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const getMasArticulos = (pageNumber) => {
    toggleLoading(true);
    setCurrentPage(pageNumber);
    const arr = selectedOption === "Ventas" ? tablaVentas : tablaDevoluciones;
    setDisplayedArticulos(
      arr?.slice(
        (pageNumber - 1) * ROWS_TO_SHOW,
        (pageNumber - 1) * ROWS_TO_SHOW + ROWS_TO_SHOW,
      ),
    );
  };

  const getVentasyDevoluciones = (xml) => {
    const ventasYDevoluciones = xml.querySelector("ventasYDevoluciones");
    const devoluciones = ventasYDevoluciones.querySelectorAll("devolucion");
    const ventas = ventasYDevoluciones.querySelectorAll("venta");
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
    return result;
  };

  const getIntervaloVentas = async (date1, date2) => {
    let fecha1 = formattingDate(date1);
    let fecha2 = formattingDate(date2);

    const url1 = `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina/ventas-devoluciones/parte-de-intervalo?nombreVitrina=${name}&fechaPartida=${fecha1}&numeroDeElementos=${ROWS_TO_SHOW}&fechaLimite=${fecha2}`;

    try {
      const response = await axios.get(url1, {
        headers: {
          "Content-Type": "application/xml",
        },
      });
      const xmlDoc = parseData(response.data);
      const { ventas, devoluciones } = getVentasyDevoluciones(xmlDoc);

      setTablaVentas(ventas);
      setTablaDevoluciones(devoluciones);
      setTotalResults(
        (selectedOption === "Ventas" ? ventas : devoluciones).length,
      );
      setDisplayedArticulos(
        selectedOption === "Ventas" ? ventas : devoluciones,
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalIntervaloVentas = async (date1, date2) => {
    let fecha1 = formattingDate(date1);
    let fecha2 = formattingDate(date2);

    const url2 = `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina/ventas-devoluciones/intervalo?nombreVitrina=${name}&fechaInicio=${fecha1}&fechaFin=${fecha2}&numeroDeElementos=${ROWS_TO_SHOW}`;

    try {
      const response = await axios.get(url2, {
        headers: {
          "Content-Type": "application/xml",
        },
      });
      const xmlDoc = parseData(response.data);
      const { ventas, devoluciones } = getVentasyDevoluciones(xmlDoc);
      setTotalVendidoIntervalo(
        xmlDoc?.getElementsByTagName("ventaTotal")[0]?.textContent,
      );
      setTotalDevueltoIntervalo(
        xmlDoc?.getElementsByTagName("devolucionTotal")[0]?.textContent,
      );
      setIngresoRecibido(
        xmlDoc?.getElementsByTagName("ingresoReal")[0]?.textContent,
      );
      setTablaVentas(ventas);
      setTablaDevoluciones(devoluciones);
      setTotalResults(ventas?.length);
      setDisplayedArticulos(ventas);
    } catch (error) {
      console.log(error);
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      bg={"mainBg"}
      height={"100%"}
      display={"flex"}
      flexDir={"column"}
      overflowY={"auto"}
      p={"1.25rem"}
      h={"calc(100% - " + HEADER_HEIGHT + "px)"}
    >
      <Box
        w={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        alignContent={"flex-end"}
        flexWrap={"wrap"}
        mb={2}
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
          alignItems={"flex-end"}
          flex={"1 1 200px"}
          gap={"10px"}
          flexWrap={{ base: "wrap", md: "nowrap" }}
          py={{ base: "15px", lg: "0px" }}
        >
          <DatePickerComponent
            startDate={fechaInicio}
            setStartDate={(date) => {
              getIntervaloVentas(date, fechaFin);
              getTotalIntervaloVentas(date, fechaFin);
              setFechaInicio(date);
            }}
            endDate={fechaFin}
            setEndDate={(date) => {
              getIntervaloVentas(fechaInicio, date);
              getTotalIntervaloVentas(fechaInicio, date);
              setFechaFin(date);
            }}
          />
          <Select
            borderColor={"grey.placeholder"}
            bg={"white"}
            borderRadius={"5px"}
            minW={"7.5rem"}
            height={"42px"}
            flex={"0 1 250px"}
            value={selectedOption}
            onChange={handleSelectChange}
            fontSize={"16px"}
          >
            <option>Ventas</option>
            <option>Devoluciones</option>
          </Select>
        </Box>
        <Box></Box>
      </Box>
      <Box
        w={"100%"}
        display="flex"
        flexDir={"column"}
        mb={2}
        h={{
          base: `calc(100% - ${TOP_SECTION_HEIGHT}px - ${BOTTOM_SECTION_HEIGHT_MOBILE}px - ${MARGINS}px)`,
          lg: `calc(100% - ${TOP_SECTION_HEIGHT}px - ${BOTTOM_SECTION_HEIGHT}px - ${MARGINS}px)`,
        }}
      >
        <TablaVentas
          displayedArticulos={displayedArticulos}
          totalResults={totalResults}
          currentPage={currentPage}
          totalPages={totalPages}
          getMasArticulos={getMasArticulos}
          tableTitle={
            selectedOption === "Ventas"
              ? "Productos Vendidos"
              : "Productos Devueltos"
          }
          selectedOption={selectedOption}
          setProds={setProds}
          setFecha={setFechaActual}
          setValorTotal={setValorTotal}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
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
              <Text textStyle={"RobotoSubheading"} color={"success.30"}>
                $
                {totalVendidoIntervalo !== null && totalVendidoIntervalo != ""
                  ? formatearNumero(totalVendidoIntervalo)
                  : "0"}
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
              <Text textStyle={"RobotoSubheading"}>
                $
                {totalDevueltoIntervalo !== null &&
                totalDevueltoIntervalo !== ""
                  ? formatearNumero(totalDevueltoIntervalo)
                  : "0"}
              </Text>
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
              <Text textStyle={"RobotoSubheading"}>
                $
                {ingresoRecibidoIntervalo !== null &&
                ingresoRecibidoIntervalo !== ""
                  ? formatearNumero(ingresoRecibidoIntervalo)
                  : "0"}
              </Text>
            </Box>
          }
        />
      </Box>
      <VerExistencias
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        productos={prods}
        fecha={fechaAct}
        total={valorTotal}
      />
    </Box>
  );
}
