import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Box, list, Text, useDisclosure } from "@chakra-ui/react";
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

  
  const [selectedArticulo, setSelectedArticulo] = useState(null);

  const totalPages = Math.ceil(tablaInventario?.length / rowsToShow);

  useEffect(() => {
    getInventarioInfo(name);
  }, []);

  useEffect(() => {
    getMasArticulos(1);
  }, [tablaInventario]);

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

  const getInventarioInfo = async (vitrinaName) => {
    const url = `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina/inventario?vitrina=${vitrinaName}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Accept: "application/xml",
        },
      });
      const xmlText = response.data;
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "text/xml");
      setTablaInventario(getProductos(xmlDoc));
      setTotalResults(tablaInventario?.length);
    } catch (error) {
      console.error("Error fetching XML data:", error);
    }
  };

  function formatString(string) {
    string = string.toLowerCase();
    string = string.split(" ");

    for (let i = 0; i < string.length; i++) {
      string[i] = string[i][0]?.toUpperCase() + string[i].substr(1);
    }
    string = string.join(" ");
    return string;
  }

  function capitalizeFirstLetter(str) {
    if (!str) return ""; // Retorna vacío si el string está vacío o indefinido
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const getProductos = (xml) => {
    const totalProdsArr = [];
    const inventarios = xml.querySelector("inventarios");
    const listadoProds = inventarios.querySelectorAll("producto");
    if (listadoProds?.length > 0) {
      for (let i = 0; i < listadoProds.length; i++) {
        const codigo =
          listadoProds[i]?.getElementsByTagName("codigo")[0].textContent;
        let nombre = formatString(
          listadoProds[i]?.getElementsByTagName("nombre")[0].textContent,
        );
        const categoria = capitalizeFirstLetter(
          listadoProds[i]?.getElementsByTagName("categoria")[0].textContent,
        );
        const precio = new Intl.NumberFormat("es-ES", {
          maximumFractionDigits: 0,
        }).format(
          listadoProds[i]?.getElementsByTagName("precio")[0].textContent,
        );
        const costo = new Intl.NumberFormat("es-ES", {
          maximumFractionDigits: 0,
        }).format(
          listadoProds[i]?.getElementsByTagName("costo")[0].textContent,
        );
        const existencia =
          listadoProds[i]?.getElementsByTagName("existencias")[0].textContent;
        const exisVerificadas = listadoProds[i]?.getElementsByTagName(
          "existenciasVerificadas",
        )[0].textContent;
        const stockMin =
          listadoProds[i]?.getElementsByTagName("stockMinimo")[0].textContent;
        const stockMax =
          listadoProds[i]?.getElementsByTagName("stockMaximo")[0].textContent;

        totalProdsArr.push({
          codigo,
          nombre,
          categoria,
          precio,
          costo,
          existencia,
          exisVerificadas,
          stockMin,
          stockMax,
        });
      }
      return totalProdsArr;
    } else {
      return null;
    }
  };

  const handleProdClick = async (index, articulo) => {};

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
              vitrina={name}
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
              vitrina={name}
              productsList={tablaInventario}
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
            setArticulo={setSelectedArticulo}
           
            handleArtClick={handleProdClick}
          />
        }
      </Box>
      <Note
        text1={"Pendiente verificar actualizaciones realizadas en visitas del:"}
        text2={"01/04/2024, 15/03/2024 y 01/03/2024"}
      />
      <EditarExistencia
        isOpen={!!selectedArticulo}
        articulo={selectedArticulo}
        onClose={() => setSelectedArticulo(null)}
      />
    </Box>
  );
}
