import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  useMediaQuery,
} from "@chakra-ui/react";
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

import xmlToJSON from "../services/XmlToJsonConverter";
import {
  bodegaProductos,
  categoriasProductos,
  proveedoresProductos,
} from "../services/productosYBodegaData";

export default function ProductosyBodega() {
  const [busqueda, setBusqueda] = useState(null);
  const [tablaProductos, setTablaProductos] = useState(null);
  const [displayedArticulos, setDisplayedArticulos] = useState(null);
  const [totalResults, setTotalResults] = useState(null);
  const [loading, toggleLoading] = useState(false);
  const [isAscendent, setIsAscendent] = useState(false);
  const [sortingBy, setSortingBy] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsToShow, setRowsToShow] = useState(20);
  const totalPages = Math.ceil(tablaProductos?.length / rowsToShow);
  const [totalProveedores, setTotalProveedores] = useState(null);
  const [totalCategorias, setTotalCategorias] = useState(null);

  useEffect(() => {
    parseData();
  }, []);

  useEffect(() => {
    getMasArticulos(1);
  }, [tablaProductos]);

  const parseData = () => {
    const ProductosBodega = xmlToJSON(bodegaProductos);
    const TotalProductos = ProductosBodega?.productosDelNegocio?.producto;
    const arrayProdsBodega = TotalProductos?.map((prod) => {
      const nombre = prod?.nombre["#text"];
      const codigo = prod?.codigo["#text"];
      const precio = prod?.precio["#text"];
      const costo = prod?.costo["#text"];
      const bodega = prod?.bodega["#text"];
      const vitrinas = prod?.vitrinas["#text"];
      const proveedor = prod?.proveedor["#text"];
      const categoria = prod?.categoria["#text"];

      return {
        nombre,
        codigo,
        precio,
        costo,
        bodega,
        vitrinas,
        proveedor,
        categoria,
      };
    });
    setTablaProductos(arrayProdsBodega);
    setTotalResults(arrayProdsBodega.length);
    setDisplayedArticulos(arrayProdsBodega);

    const Proveedores = xmlToJSON(proveedoresProductos);
    const TotalProveedores = Proveedores?.proveedoresDelNegocio?.proveedor;
    const arrayProveedores = TotalProveedores?.map((prove) => {
      return { nombre: prove?.["#text"] };
    });
    setTotalProveedores(arrayProveedores);

    const Categorias = xmlToJSON(categoriasProductos);
    const TotalCategorias = Categorias?.categoriasDelNegocio?.categoria;
    const arrCategorias = TotalCategorias?.map((cat) => {
      return { nombre: cat?.["#text"] };
    });
    setTotalCategorias(arrCategorias);
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
    let result = tablaProductos?.filter((element) => {
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

  useEffect(() => {
    if (sortingBy) {
      let articulosCopy = [...displayedArticulos];

      switch (sortingBy) {
        case "productos":
          articulosCopy?.sort((a, b) => {
            return isAscendent
              ? a?.nombre.localeCompare(b?.nombre)
              : b?.nombre.localeCompare(a?.nombre);
          });
          break;
        case "bodega":
          articulosCopy?.sort((a, b) =>
            isAscendent ? a.bodega - b.bodega : b.bodega - a.bodega,
          );
          break;
        case "vitrinas":
          articulosCopy?.sort((a, b) =>
            isAscendent ? a.vitrinas - b.vitrinas : b.vitrinas - a.vitrinas,
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
      tablaProductos?.slice(
        (pageNumber - 1) * rowsToShow,
        (pageNumber - 1) * rowsToShow + rowsToShow,
      ),
    );
  };

  const handleConfirmarDelete = (Prod) => {
    const codigoProd = Prod.Codigo;
    let copy = [...displayedArticulos];
    let prodToDelete = copy.filter((p) => p.Codigo != codigoProd);
    setTablaProductos(prodToDelete);
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
        flexDirection={{ base: "column", lg: "row" }}
        justifyContent={{ base: "flex-start", lg: "space-around" }}
        alignItems={{ base: "flex-start", lg: "center" }}
        w={"100%"}
        bg={"white"}
        borderTop={"1px"}
        borderTopColor={"mainBg"}
        py={"1.25rem"}
      >
        <Box
          w={"100%"}
          order={{ base: "2", lg: "1" }}
          display={"flex"}
          flexDirection={{ base: "column", sm: "row" }}
          justifyContent={"flex-start"}
          alignItems={"center"}
          gap={"1rem"}
          p={{ base: "5px", md: "10px" }}
        >
          <TextInput
            maxW={"250px"}
            placeholder={"Buscar"}
            leftIcon={<SearchIcon width={"15px"} height={"15px"} />}
            onChange={(e) => onBuscarChange(e)}
            value={busqueda}
          />
        </Box>

        <Box
          w={"100%"}
          display={"flex"}
          order={{ base: "1", lg: "2" }}
          flexDirection={{ base: "column", md: "row" }}
          justifyContent={{ base: "flex-start", md: "center" }}
          alignItems={{ base: "flex-start", md: "center" }}
        >
          <Box m={1}>
            <StandardButton
              variant={"WHITE_RED"}
              borderRadius="20px"
              py={"17px"}
              w={{ base: "160px", md: "fit-content" }}
              fontSize={"14px"}
              fontWeight={"400"}
              onClick={onFirstModalOpen}
              children={
                <Text
                  textAlign={"left"}
                  textStyle={{
                    base: "RobotoTinyBold",
                    md: "RobotoRegularBold",
                  }}
                >
                  Ingresar Nuevo Producto
                </Text>
              }
            ></StandardButton>
            <IngresarProducto
              isOpen={isFirstModalOpen}
              onOpen={onFirstModalOpen}
              onClose={onFirstModalClose}
            />
          </Box>
          <Box m={1}>
            <StandardButton
              variant={"WHITE_RED"}
              borderRadius="20px"
              py={"17px"}
              w={{ base: "160px", md: "fit-content" }}
              fontSize={"14px"}
              fontWeight={"400"}
              onClick={onSecondModalOpen}
              children={
                <Text
                  textAlign={"left"}
                  textStyle={{
                    base: "RobotoTinyBold",
                    md: "RobotoRegularBold",
                  }}
                >
                  Despachar Producto
                </Text>
              }
            ></StandardButton>
            <Despachar
              isOpen={isSecondModalOpen}
              onOpen={onSecondModalOpen}
              onClose={onSecondModalClose}
            />
          </Box>
          <Box m={1}>
            <StandardButton
              variant={"WHITE_RED"}
              borderRadius="20px"
              py={"17px"}
              w={{ base: "160px", md: "fit-content" }}
              fontSize={"14px"}
              fontWeight={"400"}
              onClick={onThirdModalOpen}
              children={
                <Text
                  textAlign={"left"}
                  textStyle={{
                    base: "RobotoTinyBold",
                    md: "RobotoRegularBold",
                  }}
                >
                  Transferir Productos
                </Text>
              }
            ></StandardButton>
            <Transferir
              isOpen={isThirdModalOpen}
              onOpen={onThirdModalOpen}
              onClose={onThirdModalClose}
            />
          </Box>
        </Box>
      </Box>
      <Box display="flex" flexDir={"column"} h="100%" p={"20px"} w={"100%"}>
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
            handleSortingClick={handleSortingClick}
            totalResults={totalResults}
            currentPage={currentPage}
            totalPages={totalPages}
            getMasArticulos={getMasArticulos}
            funcConfirmar={handleConfirmarDelete}
            lista1={totalProveedores ? totalProveedores : []}
            lista2={totalCategorias ? totalCategorias : []}
            displayedArticulos={displayedArticulos ? displayedArticulos : []}
          />
        }
      </Box>
    </Box>
  );
}
