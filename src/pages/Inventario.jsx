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

import TextInput from "../component/ui/textInput";
import SearchIcon from "../assets/images/SearchIcon";
import { parseData, parseTextFields } from "../utils/xmlParse";
import {
  capitalizeFirstLetter,
  formatString,
  formatearNumero,
} from "../utils/formatting";
import { HEADER_HEIGHT } from "../component/Header";

export default function Inventario() {
  const city = useSelector((state) => state.vitrinaReducer.city);
  const name = useSelector((state) => state.vitrinaReducer.name);

  const [tablaInventario, setTablaInventario] = useState([]);
  const [displayedArticulos, setDisplayedArticulos] = useState(tablaInventario);
  const [totalResults, setTotalResults] = useState(null);
  const [loading, toggleLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsToShow, setRowsToShow] = useState(30);
  const [busqueda, setBusqueda] = useState(null);
  const [verificacionesPendientes, setVerificacionesPendientes] =
    useState(null);

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
    if (busqueda !== null) {
      Busqueda(busqueda);
    }
  }, [busqueda]);

  const Busqueda = (textToSearch) => {
    if (!textToSearch.length) {
      setDisplayedArticulos(tablaInventario);
      return;
    }

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
      const xmlDoc = parseData(response.data);
      console.log(xmlDoc);
      setTablaInventario(getProductos(xmlDoc));
      setTotalResults(tablaInventario?.length);
      setVerificacionesPendientes(getPendienteXverificar(xmlDoc));
    } catch (error) {
      console.error("Error fetching XML data:", error);
    }
  };

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
        const precio = formatearNumero(
          listadoProds[i]?.getElementsByTagName("precio")[0].textContent,
        );
        const costo = formatearNumero(
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

        const proveedor =
          listadoProds[i]?.getElementsByTagName("proveedor")[0].textContent;

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
          proveedor,
        });
      }
      //console.log(totalProdsArr);
      return totalProdsArr;
    } else {
      return null;
    }
  };

  const getPendienteXverificar = (xml) => {
    const totalVerificaciones = xml.querySelector(
      "verificacionesDeCambiosPendientes",
    );
    const totalModificaciones =
      totalVerificaciones.querySelectorAll("modificacion");
    const totalVerifPendientes = [];
    if (totalModificaciones.length > 0) {
      for (let i = 0; i < totalModificaciones.length; i++) {
        const cantidadDeCambios =
          totalModificaciones[i]?.getElementsByTagName("cantidadDeCambios")[0]
            .textContent;
        const fecha =
          totalModificaciones[i]?.getElementsByTagName("fecha")[0].textContent;
        totalVerifPendientes.push({ cantidadDeCambios, fecha });
      }
    }
    return totalVerifPendientes;
  };

  const handleProdClick = async (index, articulo) => {};

  return (
    <Box bg={"mainBg"} p={"1.25rem"} h={"calc(100% - " + HEADER_HEIGHT + "px)"}>
      <Text textStyle={"RobotoBody"}>
        {name} - {city}
      </Text>
      <Text textStyle={"RobotoTitleBold"}>Inventario</Text>

      <Box
        display={"flex"}
        flexDirection={{ base: "column-reverse", lg: "row" }}
        justifyContent={{ base: "flex-start", lg: "space-between" }}
        alignItems={{ base: "flex-start", lg: "center" }}
        gap={2}
        mb={2}
      >
        <TextInput
          w={{ base: "100%", md: "450px" }}
          placeholder={"Buscar"}
          leftIcon={<SearchIcon width={"15px"} height={"15px"} />}
          onChange={(e) => onBuscarChange(e)}
          value={busqueda}
        />

        <Box
          display={"flex"}
          flexDirection={{ base: "column", sm: "row" }}
          justifyContent={"center"}
          alignItems={"center"}
          gap={{ base: "5px", md: "10px" }}
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
          {isFirstModalOpen && (
            <Despachar
              isOpen={isFirstModalOpen}
              onOpen={onFirstModalOpen}
              onClose={onFirstModalClose}
              vitrina={name}
              productsList={tablaInventario}
              setProductsList={setTablaInventario}
            />
          )}
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
          {isSecondModalOpen && (
            <Transferir
              isOpen={isSecondModalOpen}
              onOpen={onSecondModalOpen}
              onClose={onSecondModalClose}
              vitrina={name}
              productsList={tablaInventario}
              setProductsList={setTablaInventario}
            />
          )}
        </Box>
      </Box>

      <Box
        display={"flex"}
        flexDirection={"column"}
        w={"100%"}
        h={{
          base: "calc(100% - 50px - 175px)",
          lg: "calc(100% - 50px - 130px)",
        }}
        mb="8px"
      >
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
        arr={
          verificacionesPendientes?.length > 0 ? verificacionesPendientes : null
        }
        text2={"No se encontraron visitas pendientes"}
      />
      <EditarExistencia
        isOpen={!!selectedArticulo}
        articulo={selectedArticulo}
        onClose={() => setSelectedArticulo(null)}
        setTablaInventario={setTablaInventario}
        setDisplayedArticulos={setDisplayedArticulos}
      />
    </Box>
  );
}
