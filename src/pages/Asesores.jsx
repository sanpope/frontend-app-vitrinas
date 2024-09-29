import React, { useEffect, useState } from "react";
import { Box, Text, useDisclosure } from "@chakra-ui/react";
import StandardButton from "../component/ui/buttons/standard";
import TextInput from "../component/ui/textInput";
import Editar from "../component/Editar";
import ConfirmationMessage from "../component/ConfirmationMessage";
import EditIcon from "../assets/images/EditIcon";
import TrashIcon from "../assets/images/TrashIcon";
import WarningIcon from "../assets/images/WarningIcon";
import SearchIcon from "../assets/images/SearchIcon";
import PlusCircleIcon from "../assets/images/PlusCircleIcon";
import SmallRightArrowIcon from "../assets/images/SmallRightArrow";
import SyncIcon from "../assets/images/SyncIcon";
import TablaAsesores from "../component/TablaAsesores";
import AgregarAsesor from "../component/AgregarAsesor";
import { HEADER_HEIGHT } from "../component/Header";
import xmlToJSON from "../services/XmlToJsonConverter";
import asesoresData from "../services/asesoresData";

const TOP_HEIGHT = 72;

export default function Asesores() {
  const [tablaAsesores, setTablaAsesores] = useState(null);
  const [displayedArticulos, setDisplayedArticulos] = useState(null);
  const [totalResults, setTotalResults] = useState(null);
  const [loading, toggleLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsToShow, setRowsToShow] = useState(20);
  const totalPages = Math.ceil(tablaAsesores?.length / rowsToShow);
  const [isAscendent, setIsAscendent] = useState(false);
  const [sortingBy, setSortingBy] = useState(null);
  const [busqueda, setBusqueda] = useState(null);

  useEffect(() => {
    parseData();
  }, []);

  useEffect(() => {
    getMasArticulos(1);
  }, [tablaAsesores]);

  const parseData = () => {
    const DataAsesores = xmlToJSON(asesoresData);
    const infoAsesores = DataAsesores?.asesores;
    if (infoAsesores && Array.isArray(infoAsesores.asesor)) {
      const arrAsesores = infoAsesores?.asesor?.map((asesor) => {
        const nombre = asesor?.nombre["#text"];
        const vitrina = asesor?.vitrinas?.vitrina?.nombre["#text"];
        const ciudad = asesor?.vitrinas?.vitrina?.ciudad["#text"];
        const usuario = asesor?.usuario["#text"];
        const clave = asesor?.clave["#text"];
        const empty = "";
        return { nombre, vitrina, ciudad, usuario, clave, empty };
      });
      setTablaAsesores(arrAsesores);
      setTotalResults(arrAsesores.length);
      setDisplayedArticulos(arrAsesores);
    }
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

  const onBuscarChange = (e) => {
    setBusqueda(e);
  };

  useEffect(() => {
    if (busqueda) {
      Busqueda(busqueda);
    } else {
    }
  }, [busqueda]);

  const Busqueda = (textToSearch) => {
    let result = tablaAsesores?.filter((element) => {
      if (
        element.nombre
          .toString()
          .toLowerCase()
          .includes(textToSearch.toLowerCase()) ||
        element.vitrina
          .toString()
          .toLowerCase()
          .includes(textToSearch.toLowerCase()) ||
        element.ciudad
          .toString()
          .toLowerCase()
          .includes(textToSearch.toLowerCase())
      ) {
        return element;
      }
    });
    setDisplayedArticulos(result);
  };

  useEffect(() => {
    if (sortingBy) {
      let articulosCopy = [...displayedArticulos];
      switch (sortingBy) {
        case "asesor":
          articulosCopy?.sort((a, b) =>
            isAscendent
              ? a.nombre.localeCompare(b.nombre)
              : b.nombre.localeCompare(a.nombre),
          );
          break;
        case "vitrinas":
          articulosCopy?.sort((a, b) =>
            isAscendent
              ? a.vitrina.localeCompare(b.vitrina)
              : b.vitrina.localeCompare(a.vitrina),
          );
          break;
        case "ubicacion":
          articulosCopy?.sort((a, b) =>
            isAscendent
              ? a.ciudad.localeCompare(b.ciudad)
              : b.ciudad.localeCompare(a.ciudad),
          );
          break;
        default:
          break;
      }
      setDisplayedArticulos(articulosCopy);
    }
  }, [sortingBy, isAscendent]);

  const getMasArticulos = (pageNumber) => {
    toggleLoading(true);
    setCurrentPage(pageNumber);
    setDisplayedArticulos(
      tablaAsesores?.slice(
        (pageNumber - 1) * rowsToShow,
        (pageNumber - 1) * rowsToShow + rowsToShow,
      ),
    );
  };

  useEffect(() => {
    getMasArticulos(1);
  }, []);

  const handleSortingClick = (name) => {
    setIsAscendent(sortingBy === name ? !isAscendent : true);
    setSortingBy(name);
  };

  return (
    <Box
      bg={"mainBg"}
      w={"100%"}
      h={"calc(100% - " + HEADER_HEIGHT + "px)"}
      display={"flex"}
      flexDir={"column"}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        flexDirection={{ base: "column", sm: "row" }}
        alignItems={"center"}
        bgColor={"white"}
        p={"1rem"}
      >
        <TextInput
          w="100%"
          maxWidth="300px"
          placeholder={"Buscar"}
          leftIcon={<SearchIcon width={"15px"} height={"15px"} />}
          onChange={(e) => onBuscarChange(e)}
          value={busqueda}
        />
        <StandardButton
          variant={"RED_PRIMARY"}
          borderRadius="20px"
          py={"17px"}
          w={"fit-content"}
          fontSize={"14px"}
          fontWeight={"400"}
          onClick={onFirstModalOpen}
          leftIcon={<PlusCircleIcon />}
        >
          Agregar asesor
        </StandardButton>
      </Box>
      <Box p={"1.25rem"} w={"100%"} h={"calc(100% - " + TOP_HEIGHT + "px)"}>
        {
          <TablaAsesores
            isSecondModalOpen={isSecondModalOpen}
            onSecondModalOpen={onSecondModalOpen}
            onSecondModalClose={onSecondModalClose}
            isThirdModalOpen={isThirdModalOpen}
            onThirdModalOpen={onThirdModalOpen}
            onThirdModalClose={onThirdModalClose}
            displayedArticulos={displayedArticulos}
            totalResults={totalResults}
            currentPage={currentPage}
            totalPages={totalPages}
            getMasArticulos={getMasArticulos}
            handleSortingClick={handleSortingClick}
          />
        }
      </Box>
      <AgregarAsesor
        isOpen={isFirstModalOpen}
        onOpen={onFirstModalOpen}
        onClose={onFirstModalClose}
      />
    </Box>
  );
}
