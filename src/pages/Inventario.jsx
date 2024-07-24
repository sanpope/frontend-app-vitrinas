import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Text, useDisclosure } from "@chakra-ui/react";
import StandardButton from "../component/ui/buttons/standard";
import Despachar from "../component/Despachar";
import Transferir from "../component/Transferir";
import TablaInventario from "../component/TablaInventario";
import EditarExistencia from "../component/EditarExistencia";
import tablaIventarioData from "../DummieData/tablaInventarioData";

export default function Inventario() {
  const city = useSelector((state) => state.vitrinaReducer.city);
  const [tablaInventario, setTablaInventario] = useState(tablaIventarioData);
  const [displayedArticulos, setDisplayedArticulos] =
    useState(tablaIventarioData);
  const [totalResults, setTotalResults] = useState(tablaInventario.length);
  const [loading, toggleLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsToShow, setRowsToShow] = useState(15);
  const [selectedArticulo, setArticulo] = useState(null);
  const totalPages = Math.ceil(tablaInventario.length / rowsToShow);

  const getMasArticulos = (pageNumber) => {
    toggleLoading(true);
    setCurrentPage(pageNumber);
    setDisplayedArticulos(
      tablaInventario.slice(
        (pageNumber - 1) * rowsToShow,
        (pageNumber - 1) * rowsToShow + rowsToShow,
      ),
    );
  };

  React.useEffect(() => {
    getMasArticulos(1);
  }, []);

  const {
    isOpen: isFirstModalOpen,
    onOpen: onFirstModalOpen,
    onClose: onFirstModalClose,
  } = useDisclosure();

  const {
    isOpen: isSecondModalOpen,
    onOpen: onSecondModalOpen,
    onClose: onSecondModalClose,
  } = useDisclosure();

  const {
    isOpen: isThirdModalOpen,
    onOpen: onThirdModalOpen,
    onClose: onThirdModalClose,
  } = useDisclosure();

  return (
    <Box
      bg={"mainBg"}
      height={"100%"}
      display={"flex"}
      flexDir={"column"}
      gap={"0.625rem"}
      p={"1.25rem"}
    >
      <Box display={"flex"} flexDir={"column"} gap={"10px"}>
        <Text textStyle={"RobotoBody"}>{city}</Text>
        <Box
          w={"100%"}
          display={"flex"}
          flexDirection={{ base: "column", md: "row" }}
          justifyContent={{ base: "flex-start", md: "space-between" }}
          alignItems={{ base: "flex-start", md: "center" }}
          flexWrap="wrap"
        >
          <Text textStyle={"RobotoTitleBold"}>Inventario</Text>
          <Box
            display={"flex"}
            flexDirection={{ base: "column", sm: "row" }}
            justifyContent={"center"}
            alignItems={"center"}
            gap={{ base: "5px", md: "10px" }}
            mt={{ base: "10px", md: "0" }}
          >
            <StandardButton
              variant={"WHITE_RED"}
              borderRadius="20px"
              py={"17px"}
              w={"150px"}
              fontSize="14px"
              fontWeight="400"
              onClick={onFirstModalOpen}
            >
              Despachar
            </StandardButton>
            <Despachar
              isOpen={isFirstModalOpen}
              onOpen={onFirstModalOpen}
              onClose={onFirstModalClose}
            />
            <StandardButton
              variant={"WHITE_RED"}
              borderRadius="20px"
              py={"17px"}
              w={"150px"}
              fontSize="14px"
              fontWeight="400"
              onClick={onSecondModalOpen}
            >
              Transferir
            </StandardButton>
            <Transferir
              isOpen={isSecondModalOpen}
              onOpen={onSecondModalOpen}
              onClose={onSecondModalClose}
            />
          </Box>
        </Box>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"space-around"}
        gap={"20px"}
        w={"100%"}
        flexGrow="1"
      >
        {
          <TablaInventario
            displayedArticulos={displayedArticulos}
            totalResults={totalResults}
            currentPage={currentPage}
            totalPages={totalPages}
            getMasArticulos={getMasArticulos}
            setArticulo={setArticulo}
          />
        }
        <Box
          display={{ base: "flex" }}
          flexDirection={"column"}
          justifyContent={"space-around"}
          w={"100%"}
          h={"80px"}
          borderWidth={1}
          borderColor={"#FFE58F"}
          bg={"#FFFBE6"}
          pl={"10px"}
        >
          <Text>
            Pendiente verificar actualizaciones realizadas en visitas del:
          </Text>
          <Text>01/04/2024, 15/03/2024 y 01/03/2024</Text>
        </Box>
      </Box>
      <EditarExistencia
        isOpen={!!selectedArticulo}
        onClose={() => setArticulo(null)}
        articulo={selectedArticulo}
      />
    </Box>
  );
}
