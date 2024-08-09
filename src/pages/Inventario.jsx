import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Text, useDisclosure } from "@chakra-ui/react";
import StandardButton from "../component/ui/buttons/standard";
import Despachar from "../component/Despachar";
import Transferir from "../component/Transferir";
import TablaInventario from "../component/TablaInventario";
import EditarExistencia from "../component/EditarExistencia";
import Note from "../component/Note";

import xmlToJSON from "../services/XmlToJsonConverter";
import inventarioData from "../services/inventarioData";
import TextInput from "../component/ui/textInput";
import SearchIcon from "../assets/images/SearchIcon";

export default function Inventario() {
  const city = useSelector((state) => state.vitrinaReducer.city);
  const name = useSelector((state) => state.vitrinaReducer.name);
  const [tablaInventario, setTablaInventario] = useState(null);
  const [displayedArticulos, setDisplayedArticulos] = useState(tablaInventario);
  const [totalResults, setTotalResults] = useState(null);
  const [loading, toggleLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsToShow, setRowsToShow] = useState(30);
  const [busqueda, setBusqueda] = useState(null);

  const [selectedArticulo, setArticulo] = useState(null);

  const totalPages = Math.ceil(tablaInventario?.length / rowsToShow);

  useEffect(() => {
    parseData();
  }, []);

  useEffect(() => {
    getMasArticulos(1);
  }, [tablaInventario]);

  const parseData = () => {
    const resumenInfo = xmlToJSON(inventarioData);
    const totalProductos =
      resumenInfo?.datosDeInventario?.inventario?.productos;

    if (totalProductos && Array.isArray(totalProductos?.producto)) {
      const listadoProductos = totalProductos?.producto;
      const arrTotalProductos = listadoProductos?.map((producto) => {
        const codigo = producto?.codigo["#text"];
        const nombre = producto?.nombre["#text"];
        const categoria = producto?.categoria["#text"];
        const precio = producto?.precio["#text"];
        const costo = producto?.costo["#text"];
        const existencia = producto?.existencia["#text"];
        const exisVerificadas = producto?.exisVerificadas["#text"];
        const stockMin = producto?.stockMin["#text"];
        const stockMax = producto?.stockMax["#text"];
        return {
          codigo,
          nombre,
          categoria,
          precio,
          costo,
          existencia,
          exisVerificadas,
          stockMin,
          stockMax,
        };
      });
      setTablaInventario(arrTotalProductos);
      setTotalResults(arrTotalProductos.length);
    } else {
    }
  };

  const getMasArticulos = (pageNumber) => {
    toggleLoading(true);
    setCurrentPage(pageNumber);
    setDisplayedArticulos(
      tablaInventario?.slice(
        (pageNumber - 1) * rowsToShow,
        (pageNumber - 1) * rowsToShow + rowsToShow,
      ),
    );
  };

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

  useEffect(() => {
    if (busqueda) {
      Busqueda(busqueda);
    } else {
    }
  }, [busqueda]);

  const Busqueda = (textToSearch) => {
    let result = tablaInventario?.filter((element) => {
      if (
        element?.nombre
          ?.toString()
          .toLowerCase()
          .includes(textToSearch?.toLowerCase()) ||
        element?.proveedor
          ?.toString()
          .toLowerCase()
          .includes(textToSearch?.toLowerCase()) ||
        element?.categoria
          ?.toString()
          .toLowerCase()
          .includes(textToSearch?.toLowerCase())
      ) {
        return element;
      }
    });
    setDisplayedArticulos(result);
  };

  const onBuscarChange = (e) => {
    setBusqueda(e);
  };

  return (
    <Box
      bg={"mainBg"}
      height={"100%"}
      display={"flex"}
      flexDir={"column"}
      gap={"1.25rem"}
      p={"1.25rem"}
    >
      <Box display={"flex"} flexDir={"column"} gap={"10px"}>
        <Text textStyle={"RobotoBody"}>
          {name} - {city}
        </Text>
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
        <Box
          w={"100%"}
          display={"flex"}
          flexDirection={{ base: "column", sm: "row" }}
          justifyContent={"flex-start"}
          alignItems={"center"}
          gap={"1rem"}
        >
          <TextInput
            maxW={"250px"}
            placeholder={"Buscar"}
            leftIcon={<SearchIcon width={"15px"} height={"15px"} />}
            onChange={(e) => onBuscarChange(e)}
            value={busqueda}
          />
        </Box>
      </Box>
      <Box display={"flex"} flexDirection={"column"} w={"100%"} flexGrow={1}>
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
      </Box>
      <Note
        text1={"Pendiente verificar actualizaciones realizadas en visitas del:"}
        text2={"01/04/2024, 15/03/2024 y 01/03/2024"}
      />
      <EditarExistencia
        isOpen={!!selectedArticulo}
        onClose={() => setArticulo(null)}
        articulo={selectedArticulo}
      />
    </Box>
  );
}
