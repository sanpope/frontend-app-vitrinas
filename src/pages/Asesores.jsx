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
import tablaAsesoresData from "../DummieData/tablaAsesoresData";

export default function Asesores() {
  const [tablaAsesores, setTablaAsesores] = useState(tablaAsesoresData);
  const [displayedArticulos, setDisplayedArticulos] =
    useState(tablaAsesoresData);
  const [totalResults, setTotalResults] = useState(tablaAsesores.length);
  const [loading, toggleLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsToShow, setRowsToShow] = useState(10);
  const totalPages = Math.ceil(tablaAsesores.length / rowsToShow);
  const [isAscendent, setIsAscendent] = useState(false);
  const [sortingBy, setSortingBy] = useState(null);
  const [busqueda, setBusqueda] = useState(null);

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
    let result = tablaAsesores.filter((element) => {
      if (
        element.Asesor.toString()
          .toLowerCase()
          .includes(textToSearch.toLowerCase()) ||
        element.Vitrinas.toString()
          .toLowerCase()
          .includes(textToSearch.toLowerCase()) ||
        element.Ubicacion.toString()
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
          articulosCopy.sort((a, b) =>
            isAscendent
              ? a.Asesor.localeCompare(b.Asesor)
              : b.Asesor.localeCompare(a.Asesor),
          );
          break;
        case "vitrinas":
          articulosCopy.sort((a, b) =>
            isAscendent ? a.Vitrinas - b.Vitrinas : b.Vitrinas - a.Vitrinas,
          );
          break;
        case "ubicacion":
          articulosCopy.sort((a, b) =>
            isAscendent ? a.Ubicacion - b.Ubicacion : b.Ubicacion - a.Ubicacion,
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
      tablaAsesores.slice(
        (pageNumber - 1) * rowsToShow,
        (pageNumber - 1) * rowsToShow + rowsToShow,
      ),
    );
  };

  React.useEffect(() => {
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
      height={"100%"}
      display={"flex"}
      flexDir={"column"}
    >
      <Box
        display={"flex"}
        flexDir={"column"}
        gap={"10px"}
        w={"100%"}
        bg={"white"}
        borderTop={"1px"}
        borderTopColor={"mainBg"}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          flexDirection={{ base: "column", sm: "row" }}
          alignItems={"center"}
        >
          <Box
            w={"100%"}
            order={{ base: "2", sm: "1" }}
            display={"flex"}
            justifyContent={"center"}
            flexDirection={{ base: "column", sm: "row" }}
            alignItems={"center"}
            gap={"10px"}
            p={3}
          >
            <TextInput
              placeholder={"Buscar"}
              leftIcon={<SearchIcon width={"15px"} height={"15px"} />}
              onChange={(e) => onBuscarChange(e)}
              value={busqueda}
            />
          </Box>
          <Box
            w={"100%"}
            order={{ base: "1", sm: "2" }}
            display={"flex"}
            justifyContent={{ base: "flex.start", sm: "flex-end" }}
            alignItems={"center"}
            p={{ base: "0px", md: "1rem" }}
          >
            <StandardButton
              variant={"RED_PRIMARY"}
              borderRadius="20px"
              py={"17px"}
              my={3}
              w={"fit-content"}
              fontSize={"14px"}
              fontWeight={"400"}
              onClick={onFirstModalOpen}
              leftIcon={<PlusCircleIcon />}
            >
              Agregar asesor
            </StandardButton>
            <AgregarAsesor
              isOpen={isFirstModalOpen}
              onOpen={onFirstModalOpen}
              onClose={onFirstModalClose}
            />
          </Box>
        </Box>
      </Box>
      <Box gap={"10px"} p={"20px"} w={"100%"}>
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
    </Box>
  );
}
