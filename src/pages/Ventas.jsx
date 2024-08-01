import React, { useState } from "react";
import Transferir from "../component/Transferir";
import { useSelector, useDispatch } from "react-redux";
import { Box, Select, Text } from "@chakra-ui/react";
import TablaVentas from "../component/TablaVentas";
import DatePickerComponent from "../component/DatePickerComponent";
import StandardButton from "../component/ui/buttons/standard";
import Container from "../component/Container";
import tablaVentasData from "../DummieData/tablaVentasData";
import CoinsIcon from "../assets/images/CoinsIcon";
import ChartLineDownIcon from "../assets/images/ChartLineDownIcon";
import HandsUsdIcon from "../assets/images/HandsUsdIcon";

export default function Ventas() {
  const city = useSelector((state) => state.vitrinaReducer.city);
  const name = useSelector((state) => state.vitrinaReducer.name);
  const [selectedOption, setSelectedOption] = useState("Todos");

  const [tablaVentas, setTablaVentas] = useState(tablaVentasData);
  const [displayedArticulos, setDisplayedArticulos] = useState(tablaVentasData);
  const [totalResults, setTotalResults] = useState(tablaVentas.length);
  const [loading, toggleLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsToShow, setRowsToShow] = useState(11);
  const totalPages = Math.ceil(tablaVentas.length / rowsToShow);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const getMasArticulos = (pageNumber) => {
    toggleLoading(true);
    setCurrentPage(pageNumber);
    setDisplayedArticulos(
      tablaVentas.slice(
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
      p={"16px"}
    >
      <Box
        w={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        alignContent={"center"}
        flexWrap={"wrap"}
        p={2}
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
      />

      <Box
        w={"100%"}
        h={"100%"}
        display="flex"
        flexWrap={"wrap"}
        gridGap={"1rem"}
        justifyContent={"space-between"}
        m={2}
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
