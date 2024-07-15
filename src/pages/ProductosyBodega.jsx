import React, { useEffect, useState } from "react";
import { Box, Text, useDisclosure, useMediaQuery } from "@chakra-ui/react";
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
import IngresarProducto from "../component/Ingresar_Editar_Producto";
import Despachar from "../component/Despachar";
import Transferir from "../component/Transferir";
import TablaProductosBodega from "../component/TablaProductosBodega";
import tablaProductosData from "../DummieData/tablaProductosData";

const lista1 = [
  { nombre: "Alejandra Gutiérrez" },
  { nombre: "Alejandra Gutiérrez" },
  { nombre: "Alejandra Gutiérrez" },
  { nombre: "Alejandra Gutiérrez" },
  { nombre: "Alejandra Gutiérrez" },
  { nombre: "Alejandra Gutiérrez" },
  { nombre: "Alejandra Gutiérrez" },
  { nombre: "Alejandra Gutiérrez" },
];

const lista2 = [
  { nombre: "Categoría" },
  { nombre: "Categoría" },
  { nombre: "Categoría" },
  { nombre: "Categoría" },
  { nombre: "Categoría" },
  { nombre: "Categoría" },
  { nombre: "Categoría" },
  { nombre: "Categoría" },
];

export default function ProductosyBodega() {
  const [busqueda, setBusqueda] = useState(null);
  const [isSmallScreen] = useMediaQuery("(max-width: 475px)");
  const [tablaProductos, setTablaProductos] = useState(tablaProductosData);
  const [displayedArticulos, setDisplayedArticulos] =
    useState(tablaProductosData);
  const [totalResults, setTotalResults] = useState(tablaProductos.length);
  const [loading, toggleLoading] = useState(false);
  const [isAscendent, setIsAscendent] = useState(false);
  const [sortingBy, setSortingBy] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsToShow, setRowsToShow] = useState(5);
  const totalPages = Math.ceil(tablaProductos.length / rowsToShow);

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

  const {
    isOpen: isFourthModalOpen,
    onOpen: onFourthModalOpen,
    onClose: onFourthModalClose,
  } = useDisclosure();

  const {
    isOpen: isFifthModalOpen,
    onOpen: onFifthModalOpen,
    onClose: onFifthModalClose,
  } = useDisclosure();

  const {
    isOpen: isSixthModalOpen,
    onOpen: onSixthModalOpen,
    onClose: onSixthModalClose,
  } = useDisclosure();

  const {
    isOpen: isSeventhModalOpen,
    onOpen: onSeventhModalOpen,
    onClose: onSeventhModalClose,
  } = useDisclosure();

  const {
    isOpen: isEighthModalOpen,
    onOpen: onEighthModalOpen,
    onClose: onEighthModalClose,
  } = useDisclosure();

  const {
    isOpen: isNinthModalOpen,
    onOpen: onNinthModalOpen,
    onClose: onNinthModalClose,
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
    let result = tablaProductos.filter((element) => {
      if (
        element.Producto.toString()
          .toLowerCase()
          .includes(textToSearch.toLowerCase()) ||
        element.Proveedor.toString()
          .toLowerCase()
          .includes(textToSearch.toLowerCase()) ||
        element.Categorias.toString()
          .toLowerCase()
          .includes(textToSearch.toLowerCase())
      ) {
        return element;
      }
    });
    setDisplayedArticulos(result);
    console.log(result);
  };

  useEffect(() => {
    if (sortingBy) {
      let articulosCopy = [...displayedArticulos];

      switch (sortingBy) {
        case "productos":
          articulosCopy.sort((a, b) =>
            isAscendent
              ? a.Producto.localeCompare(b.Producto)
              : b.Producto.localeCompare(a.Producto),
          );
          break;
        case "bodega":
          articulosCopy.sort((a, b) =>
            isAscendent ? a.Bodega - b.Bodega : b.Bodega - a.Bodega,
          );
          break;
        case "vitrinas":
          articulosCopy.sort((a, b) =>
            isAscendent ? a.Vitrinas - b.Vitrinas : b.Vitrinas - a.Vitrinas,
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
      tablaProductos.slice(
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
      overflowY={"scroll"}
      overflowX={"scroll"}
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
          w={"100%"}
          display={"flex"}
          flexDirection={{ base: "column", lg: "row" }}
          justifyContent={{ base: "flex-start", lg: "space-between" }}
          alignItems={{ base: "flex-start", lg: "center" }}
          py={{ base: "0px", md: "1.25rem" }}
        >
          <Box
            w={"100%"}
            order={{ base: "2", lg: "1" }}
            display={"flex"}
            flexDirection={{ base: "column", sm: "row" }}
            justifyContent={{ base: "center", lg: "flex-start" }}
            alignItems={"center"}
            gap={"1rem"}
            p={{ base: "1.25rem", md: "5px" }}
          >
            <TextInput
              maxW={"250px"}
              placeholder={"Buscar"}
              leftIcon={<SearchIcon width={"15px"} height={"15px"} />}
              onChange={(e) => onBuscarChange(e)}
              value={busqueda}
            />
            <StandardButton
              variant={"WHITE_RED"}
              borderRadius="20px"
              py={"17px"}
              px={"30px"}
              w={isSmallScreen ? "13rem" : "fit-content"}
              fontSize={"14px"}
              fontWeight={"400"}
              onClick={""}
              leftIcon={<SearchIcon width={"20px"} height={"20px"} />}
            >
              Buscar
            </StandardButton>
          </Box>
          <Box
            w={"100%"}
            display={"flex"}
            order={{ base: "1", lg: "2" }}
            flexDirection={{ base: "column", md: "row" }}
            flexWrap={{ base: "wrap", xl: "nowrap" }}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"5px"}
            p={{ base: "1.25rem", md: "5px" }}
          >
            <StandardButton
              variant={"WHITE_RED"}
              borderRadius="20px"
              py={"17px"}
              w={isSmallScreen ? "13rem" : "fit-content"}
              fontSize={"14px"}
              fontWeight={"400"}
              onClick={onFirstModalOpen}
              leftIcon={<PlusCircleIcon fill="black" />}
            >
              Ingresar Nuevo Producto
            </StandardButton>
            <IngresarProducto
              isOpen={isFirstModalOpen}
              onOpen={onFirstModalOpen}
              onClose={onFirstModalClose}
            />
            <StandardButton
              variant={"WHITE_RED"}
              borderRadius="20px"
              py={"17px"}
              w={isSmallScreen ? "13rem" : "fit-content"}
              fontSize={"14px"}
              fontWeight={"400"}
              onClick={onSecondModalOpen}
              leftIcon={<SmallRightArrowIcon />}
            >
              Despachar Producto
            </StandardButton>
            <Despachar
              isOpen={isSecondModalOpen}
              onOpen={onSecondModalOpen}
              onClose={onSecondModalClose}
            />
            <StandardButton
              variant={"WHITE_RED"}
              borderRadius="20px"
              py={"17px"}
              w={"fit-content"}
              fontSize={"14px"}
              fontWeight={"400"}
              onClick={onThirdModalOpen}
              leftIcon={<SyncIcon />}
            >
              Transferir Productos
            </StandardButton>
            <Transferir
              isOpen={isThirdModalOpen}
              onOpen={onThirdModalOpen}
              onClose={onThirdModalClose}
            />
          </Box>
        </Box>
      </Box>
      <Box gap={"10px"} p={"20px"} w={"100%"}>
        {
          <TablaProductosBodega
            isFirstModalOpen={isFourthModalOpen}
            onFirstModalOpen={onFourthModalOpen}
            onFirstModalClose={onFourthModalClose}
            isSecondModalOpen={isFifthModalOpen}
            onSecondModalOpen={onFifthModalOpen}
            onSecondModalClose={onFifthModalClose}
            isThirdModalOpen={isSixthModalOpen}
            onThirdModalOpen={onSixthModalOpen}
            onThirdModalClose={onSixthModalClose}
            isFourthModalOpen={isSeventhModalOpen}
            onFourthModalOpen={onSeventhModalOpen}
            onFourthModalClose={onSeventhModalClose}
            isFifthModalOpen={isEighthModalOpen}
            onFifthModalOpen={onEighthModalOpen}
            onFifthModalClose={onEighthModalClose}
            isSixthModalOpen={isNinthModalOpen}
            onSixthModalOpen={onNinthModalOpen}
            onSixthModalClose={onNinthModalClose}
            lista1={lista1}
            lista2={lista2}
            displayedArticulos={displayedArticulos}
            handleSortingClick={handleSortingClick}
            totalResults={totalResults}
            currentPage={currentPage}
            totalPages={totalPages}
            getMasArticulos={getMasArticulos}
          />
        }
      </Box>
    </Box>
  );
}
