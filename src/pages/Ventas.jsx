import React, { useState } from "react";
import Transferir from "../component/Transferir";
import { useSelector, useDispatch } from "react-redux";
import { Box, Select, Text } from "@chakra-ui/react";
import TablaVentas from "../component/TablaVentas";
import DatePickerComponent from "../component/DatePickerComponent";
import StandardButton from "../component/ui/buttons/standard";
import Container from "../component/Container";
import tablaVentasData from "../DummieData/tablaVentasData";

export default function Ventas() {
  const city = useSelector((state) => state.vitrinaReducer.city);
  const [selectedOption, setSelectedOption] = useState("Todos");

  const [tablaVentas, setTablaVentas] = useState(tablaVentasData);
  const [displayedArticulos, setDisplayedArticulos] = useState(tablaVentasData);
  const [totalResults, setTotalResults] = useState(tablaVentas.length);
  const [loading, toggleLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsToShow, setRowsToShow] = useState(8);
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
      gap={"0.625rem"}
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
          <Text textStyle={" RobotoBody"}>{city}</Text>
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
      {
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          gap={"20px"}
          justifyContent={"center"}
        >
          <Container bg={"black"} w={"250px"} heigth={"150px"} />
          <Container w={"250px"} heigth={"150px"} />
          <Container w={"250px"} heigth={"150px"} />
        </Box>
      }
    </Box>
  );
}
