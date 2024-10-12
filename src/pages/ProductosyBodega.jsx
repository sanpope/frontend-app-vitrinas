import React, { useEffect, useState } from "react";
import { Box, list, Text, useDisclosure, useToast } from "@chakra-ui/react";
import StandardButton from "../component/ui/buttons/standard";
import TextInput from "../component/ui/textInput";
import SearchIcon from "../assets/images/SearchIcon";
import IngresarProducto from "../component/IngresarProducto";
import DespacharVitrinas from "../component/Despachar";
import TransferirVitrinas from "../component/Transferir";
import TablaProductosBodega from "../component/TablaProductosBodega";
import axios from "axios";

import { HEADER_HEIGHT } from "../component/Header";
import { MIN_TABLE_HEIGHT } from "../component/ui/tablas/Contenedor";
import { parseData } from "../utils/xmlParse";
import { capitalizeFirstLetter } from "../utils/formatting";

const TOP_HEIGHT = 72;

export default function ProductosyBodega() {
  const toast = useToast();
  const [busqueda, setBusqueda] = useState(null);
  const [tablaProductos, setTablaProductos] = useState([]);
  const [displayedArticulos, setDisplayedArticulos] = useState([]);
  const [totalResults, setTotalResults] = useState([]);
  const [loading, toggleLoading] = useState(false);
  const [isAscendent, setIsAscendent] = useState(false);
  const [sortingBy, setSortingBy] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsToShow, setRowsToShow] = useState(20);
  const totalPages = Math.ceil(tablaProductos?.length / rowsToShow);
  const [totalProveedores, setTotalProveedores] = useState(null);
  const [totalCategorias, setTotalCategorias] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [productSelected, setProductSelected] = useState(null);

  useEffect(() => {
    getInventarioInfo();
    getProveedoresInfo();
    getCategoriasInfo();
  }, []);

  useEffect(() => {
    getMasArticulos(1);
  }, [tablaProductos]);

  const getInventarioInfo = async () => {
    const url = `${process.env.REACT_APP_SERVER_URL}/app/rest/bodega/productos`;
    try {
      const response = await axios.get(url, {
        headers: {
          Accept: "application/xml",
        },
      });
      if (response.status == 200 && response.data) {
        const xmlDoc = parseData(response.data);
        setTablaProductos(getProductos(xmlDoc));
        setDisplayedArticulos(getProductos(xmlDoc));
      }
    } catch (error) {
      console.error("Error fetching XML data:", error);
    }
  };

  const getProveedoresInfo = async () => {
    const url = `${process.env.REACT_APP_SERVER_URL}/app/rest/bodega/proveedores`;
    try {
      const response = await axios.get(url, {
        headers: {
          Accept: "application/xml",
        },
      });
      if (response.status == 200 && response.data) {
        const xmlDoc = parseData(response.data);
        setTotalProveedores(getProveedores(xmlDoc));
      }
    } catch (error) {
      console.error("Error fetching XML data:", error);
    }
  };

  const getCategoriasInfo = async () => {
    const url = `${process.env.REACT_APP_SERVER_URL}/app/rest/bodega/categorias`;
    try {
      const response = await axios.get(url, {
        headers: {
          Accept: "application/xml",
        },
      });
      if (response.status == 200 && response.data) {
        const xmlDoc = parseData(response.data);
        setTotalCategorias(getCategorias(xmlDoc));
      }
    } catch (error) {
      console.error("Error fetching XML data:", error);
    }
  };

  const getProductos = (xml) => {
    const totalProdsArr = [];
    const productosNegocio = xml?.querySelector("productosDelNegocio");

    const listadoProds = productosNegocio?.querySelectorAll("producto") ?? [];

    if (listadoProds.length > 0) {
      for (let i = 0; i < listadoProds.length; i++) {
        const producto = listadoProds[i];

        const getElementTextContent = (elementName) => {
          const element = producto?.getElementsByTagName(elementName);
          return element && element[0] ? element[0].textContent ?? "" : "";
        };

        const nombre = capitalizeFirstLetter(getElementTextContent("nombre"));
        const codigo = getElementTextContent("codigo");
        const precio = getElementTextContent("precio");
        const costo = getElementTextContent("costo");
        const cantidadEnBodega = getElementTextContent("cantidadEnBodega");
        const cantidadEnVitrinas = getElementTextContent("cantidadEnVitrinas");
        const proveedor = getElementTextContent("proveedor");
        const categoria = getElementTextContent("categoria");

        totalProdsArr.push({
          nombre,
          codigo,
          precio,
          costo,
          cantidadEnBodega,
          cantidadEnVitrinas,
          proveedor,
          categoria,
        });
      }

      return totalProdsArr;
    }

    return []; // Retorna un array vacío si no hay productos
  };

  const getProveedores = (xml) => {
    const proveedorElements = xml.getElementsByTagName("proveedor");
    return Array.from(proveedorElements)
      .map((el) => {
        const content = el.textContent.trim();
        return content === "" ? null : content;
      })
      .filter((proveedor) => proveedor !== null);
  };

  const getCategorias = (xml) => {
    const categoriaElements = xml.getElementsByTagName("categoria");
    return Array.from(categoriaElements)
      .map((el) => {
        const content = el.textContent.trim();
        return content === "" ? null : content;
      })
      .filter((category) => category !== null);
  };

  const createProducto = async (newProducto, cerrar) => {
    const nuevoProducto = new URLSearchParams();
    nuevoProducto.append("nombre", `${newProducto.nombre}`);
    nuevoProducto.append("codigo", `${newProducto.codigo}`);
    nuevoProducto.append("precio", `${newProducto.precio}`);
    nuevoProducto.append("costo", `${newProducto.costo}`);
    nuevoProducto.append("cantidadEnBodega", `${newProducto.cantidad}`);
    nuevoProducto.append("categoria", `${newProducto.categoria}`);
    nuevoProducto.append("proveedor", `${newProducto.proveedor}`);

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/bodega/productos`,
        nuevoProducto,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      if (response.status === 200) {
        const newProd = {
          ...newProducto,
          cantidadEnVitrinas: 0,
          codigo: newProducto.codigo.toString(),
        };

        const index = tablaProductos?.findIndex(
          (prod) => prod.codigo == newProd.codigo,
        );

        if (index === -1) {
          setTablaProductos((prev) => {
            const copy = [...(prev || []), newProd];
            return copy;
          });
          setDisplayedArticulos((prev) => {
            const copy = [...(prev || []), newProd];
            return copy;
          });

          toast({
            status: "success",
            description: "Producto creado con éxito!",
            duration: 3000,
            position: "top-right",
            isClosable: true,
          });
        } else {
          
          toast({
            status: "info",
            description: "El producto ya existe en la base de datos.",
            duration: 3000,
            position: "top-right",
            isClosable: true,
          });
        }
      }
    } catch (error) {
      toast({
        status: "error",
        description: "Error creando el Producto.",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      cerrar();
    }
  };

  const EditarProducto = async (productoAtualizado, handleOnClose) => {
    
    const updadtedProduct = new URLSearchParams();
    updadtedProduct.append("nuevoNombre", `${productoAtualizado.nombre}`);
    updadtedProduct.append("nuevoCodigo", `${productoAtualizado.codigo}`);
    updadtedProduct.append("nuevoPrecio", `${productoAtualizado.precio}`);
    updadtedProduct.append("nuevoCosto", `${productoAtualizado.costo}`);
    updadtedProduct.append(
      "nuevaCantEnBodega",
      `${productoAtualizado.cantidad}`,
    );
    updadtedProduct.append("nuevaCategoria", `${productoAtualizado.categoria}`);
    updadtedProduct.append("nuevoProveedor", `${productoAtualizado.proveedor}`);

    const code = Number.parseInt(productSelected?.codigo);
    setIsLoading(true);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/bodega/productos?codigo=${code}`,
        updadtedProduct,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      if (response.status == 200 && response.data) {
        const index = tablaProductos?.findIndex(
          (prod) => prod.codigo === productSelected?.codigo?.toString(),
        );
        const updProd = {
          nombre: productoAtualizado.nombre,
          codigo: productoAtualizado.codigo,
          precio: productoAtualizado.precio,
          costo: productoAtualizado.costo,
          cantidadEnBodega: productoAtualizado.cantidad,
          cantidadEnVitrinas: productSelected?.cantidadEnVitrinas,
          proveedor: productoAtualizado.proveedor,
          categoria: productoAtualizado.categoria,
        };

        if (index !== -1) {
          setTablaProductos((prev) => {
            const copy = [...prev];
            copy[index] = updProd;
            return copy;
          });

          setDisplayedArticulos((prev) => {
            const copy = [...prev];
            const index = copy.findIndex(
              (prod) => prod.codigo === productSelected?.codigo?.toString(),
            );
            if (index !== -1) {
              copy[index] = updProd;
            }
            return copy;
          });

          toast({
            status: "success",
            description: "Producto editado con éxito!.",
            duration: 3000,
            position: "top-right",
            isClosable: true,
          });
        }
      }
    } catch (error) {
      toast({
        status: "error",
        description: "Error editando el producto.",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      handleOnClose();
      setIsLoading(false);
      setProductSelected(null);
    }
  };

  const DeleteProducto = async (codigo) => {
    
    const code = Number.parseInt(codigo);
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/bodega/productos?codigo=${code}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      if (response.status == 200) {
        const index = tablaProductos?.findIndex(
          (prod) => prod.codigo === codigo,
        );

        if (index !== -1) {
          setTablaProductos((prev) => {
            const copy = [...prev];
            const totalResults = copy.filter((prod) => prod.codigo !== codigo);
            return totalResults;
          });

          setDisplayedArticulos((prev) => {
            const copy = [...prev];
            const index = copy.findIndex((prod) => prod.codigo === codigo);
            if (index !== -1) {
              const totalResults = copy.filter(
                (prod) => prod.codigo !== codigo,
              );
              return totalResults;
            }
          });
          toast({
            status: "success",
            description: "Producto eliminado con éxito!.",
            duration: 3000,
            position: "top-right",
            isClosable: true,
          });
        }
      }
    } catch (error) {
      toast({
        status: "error",
        description: "Error eliminando el producto.",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
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
    if (busqueda !== null) {
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
      h={"calc(100% - " + HEADER_HEIGHT + "px)"}
      display={"flex"}
      flexDir={"column"}
    >
      <Box
        display={"flex"}
        flexDirection={{ base: "column-reverse", xl: "row" }}
        justifyContent={{ base: "flex-start", xl: "space-between" }}
        alignItems={{ base: "flex-start", xl: "center" }}
        w={"100%"}
        bg={"white"}
        p={"1rem"}
      >
        <Box>
          <TextInput
            maxWidth="300px"
            placeholder={"Buscar"}
            leftIcon={<SearchIcon width={"15px"} height={"15px"} />}
            onChange={(e) => onBuscarChange(e)}
            value={busqueda}
          />
        </Box>

        <Box
          display={"flex"}
          flexDirection={{ base: "column", md: "row" }}
          justifyContent={{ base: "flex-start", md: "flex-end" }}
          alignItems={{ base: "flex-start", md: "center" }}
          gap={"1rem"}
          py={2}
        >
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
        </Box>
      </Box>
      <Box
        h={"calc(100% - " + TOP_HEIGHT + "px)"}
        p={"1.25rem"}
        w={"100%"}
        minH={MIN_TABLE_HEIGHT + "px"}
      >
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
            // totalPages={displayedArticulos ? displayedArticulos.length : 0}
            getMasArticulos={getMasArticulos}
            listaProveedores={totalProveedores ? totalProveedores : []}
            setListaProveedores={setTotalProveedores}
            listaCategorias={totalCategorias ? totalCategorias : []}
            setListaCategorias={setTotalCategorias}
            displayedArticulos={displayedArticulos ? displayedArticulos : []}
            productSelected={productSelected}
            setProductSelected={setProductSelected}
            editProducto={EditarProducto}
            deleteProducto={DeleteProducto}
          />
        }
      </Box>
      <IngresarProducto
        isOpen={isFirstModalOpen}
        onOpen={onFirstModalOpen}
        onClose={onFirstModalClose}
        listaCategorias={totalCategorias}
        listaProveedores={totalProveedores}
        isLoading={isLoading}
        addProducto={createProducto}
      />
      <DespacharVitrinas
        isOpen={isSecondModalOpen}
        onOpen={onSecondModalOpen}
        onClose={onSecondModalClose}
      />
      <TransferirVitrinas
        isOpen={isThirdModalOpen}
        onOpen={onThirdModalOpen}
        onClose={onThirdModalClose}
      />
    </Box>
  );
}
