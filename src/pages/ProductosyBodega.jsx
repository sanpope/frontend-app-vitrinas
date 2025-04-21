import React, { useEffect, useState } from "react";
import { Box, list, Text, useDisclosure, useToast } from "@chakra-ui/react";
import StandardButton from "../component/ui/buttons/standard";
import TextInput from "../component/ui/textInput";
import SearchIcon from "../assets/images/SearchIcon";
import IngresarProducto from "../component/IngresarProducto";

import TablaProductosBodega from "../component/TablaProductosBodega";
import axios from "axios";

import { HEADER_HEIGHT } from "../component/Header";
import { MIN_TABLE_HEIGHT } from "../component/ui/tablas/Contenedor";
import { parseData } from "../utils/xmlParse";
import { capitalizeFirstLetter } from "../utils/formatting";
import DespacharProdsBod from "../component/DespacharProdsBod";
import TransferirProdsBod from "../component/TransferirProdsBod";
import LoadingComponent from "../component/LoadingComponent";

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
  const [rowsToShow, setRowsToShow] = useState(15);
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
  
  const formatearNumero = (numero) => {
    if (numero === 0) {
      return "0";
    }
    
    if (numero === undefined || numero === null || numero === "") {
      return "0";
    }
    
    let num;
    
    if (typeof numero === 'string') {

      const sinMoneda = numero.replace('$', '');
      num = parseFloat(sinMoneda.replace(/\./g, '').replace(',', '.'));
    } else {
      num = Number(numero);
    }
    
    if (isNaN(num)) {
      return "0";
    }
    
    return num.toLocaleString('es-CL');
  };

  const getInventarioInfo = async () => {
    setIsLoading(true);
    const url = `${process.env.REACT_APP_SERVER_URL}/app/rest/bodega/productos`;
    try {
      const response = await axios.get(url, {
        headers: {
          Accept: "application/xml",
        },
      });
      if (response.status == 200 && response.data) {
        const xmlDoc = parseData(response.data);
        const prods = getProductos(xmlDoc);
        setTablaProductos(prods);
        setDisplayedArticulos(prods);
        setTotalResults(prods?.length);
      }
    } catch (error) {
      console.error("Error fetching XML data:", error);
      toast({
        status: "error",
        description: "Error al cargar los productos",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
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
        const precio = formatearNumero(getElementTextContent("precio"));
        const costo = formatearNumero(getElementTextContent("costo"));
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

      totalProdsArr.sort((a, b) => a.nombre.localeCompare(b.nombre));

      return totalProdsArr;
    }

    return [];
  };

  const getProveedoresInfo = async () => {
    setIsLoading(true);
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
      toast({
        status: "error",
        description: "Error al cargar los proveedores",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoriasInfo = async () => {
    setIsLoading(true);
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
      toast({
        status: "error",
        description: "Error al cargar las categorías",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
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
    nuevoProducto.append("codigo", parseInt(newProducto.codigo, 10));
    nuevoProducto.append("precio", parseFloat(newProducto.precio));
    nuevoProducto.append("costo", parseFloat(newProducto.costo));
    nuevoProducto.append(
      "cantidadEnBodega",
      parseInt(newProducto.cantidad, 10),
    );
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
            description: "¡Producto creado con éxito!",
            duration: 3000,
            position: "top-right",
            isClosable: true,
          });
        } else {
          toast({
            status: "info",
            description: "El producto ya existe en la base de datos",
            duration: 3000,
            position: "top-right",
            isClosable: true,
          });
        }
      }
    } catch (error) {
      toast({
        status: "error",
        description: "Error creando el Producto",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      setBusqueda(null);
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
          precio: formatearNumero(productoAtualizado.precio),
          costo: formatearNumero(productoAtualizado.costo),
          cantidadEnBodega:
            productoAtualizado.cantidad === 0 ? 0 : 
            productoAtualizado.cantidad || productoAtualizado.cantidadEnBodega,
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
            description: "¡Producto editado con éxito!",
            duration: 3000,
            position: "top-right",
            isClosable: true,
          });
        }
      }
    } catch (error) {
      toast({
        status: "error",
        description: "Error editando el producto",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      setProductSelected(null);
      setBusqueda(null);
      handleOnClose();
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
            const total = copy.filter((prod) => prod.codigo !== codigo);
            return total;
          });

          setDisplayedArticulos((prev) => {
            const copy = [...prev];
            const index = copy.findIndex((prod) => prod.codigo === codigo);
            if (index !== -1) {
              const total = copy.filter((prod) => prod.codigo !== codigo);
              return total;
            }
          });
          toast({
            status: "success",
            description: "¡Producto eliminado con éxito!",
            duration: 3000,
            position: "top-right",
            isClosable: true,
          });
        }
      }
    } catch (error) {
      toast({
        status: "error",
        description: "Error eliminando el producto",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setBusqueda(null);
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
    if (!textToSearch) {
      getMasArticulos(1);
      return;
    }

    const textoNormalizado = textToSearch
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    let result = tablaProductos?.filter((element) => {
      const nombreNormalizado = element?.nombre
        ? element.nombre
            .toString()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        : "";

      const proveedorNormalizado = element?.proveedor
        ? element.proveedor
            .toString()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        : "";

      const categoriaNormalizada = element?.categoria
        ? element.categoria
            .toString()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        : "";

      const codigoNormalizado = element?.codigo
        ? element.codigo
            .toString()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        : "";

      return (
        nombreNormalizado.includes(textoNormalizado) ||
        proveedorNormalizado.includes(textoNormalizado) ||
        categoriaNormalizada.includes(textoNormalizado) ||
        codigoNormalizado.includes(textoNormalizado)
      );
    });

    setDisplayedArticulos(result);
    setTotalResults(result?.length || 0);
  };

  useEffect(() => {
    if (sortingBy) {
      let articulosCopy = [...displayedArticulos];
      let tablaCopy = [...tablaProductos];

      switch (sortingBy) {
        case "productos":
          const compareFn = (a, b) => {
            return isAscendent
              ? a.nombre.localeCompare(b.nombre)
              : b.nombre.localeCompare(a.nombre);
          };
          articulosCopy.sort(compareFn);
          tablaCopy.sort(compareFn);
          break;
        case "bodega":
          articulosCopy.sort((a, b) => {
            const cantA = parseInt(a.cantidadEnBodega) || 0;
            const cantB = parseInt(b.cantidadEnBodega) || 0;
            return isAscendent ? cantA - cantB : cantB - cantA;
          });
          tablaCopy.sort((a, b) => {
            const cantA = parseInt(a.cantidadEnBodega) || 0;
            const cantB = parseInt(b.cantidadEnBodega) || 0;
            return isAscendent ? cantA - cantB : cantB - cantA;
          });
          break;
        case "vitrinas":
          articulosCopy.sort((a, b) => {
            const cantA = parseInt(a.cantidadEnVitrinas) || 0;
            const cantB = parseInt(b.cantidadEnVitrinas) || 0;
            return isAscendent ? cantA - cantB : cantB - cantA;
          });
          tablaCopy.sort((a, b) => {
            const cantA = parseInt(a.cantidadEnVitrinas) || 0;
            const cantB = parseInt(b.cantidadEnVitrinas) || 0;
            return isAscendent ? cantA - cantB : cantB - cantA;
          });
          break;
        default:
          break;
      }

      setDisplayedArticulos(articulosCopy);
      setTablaProductos(tablaCopy);
    }
  }, [sortingBy, isAscendent]);

  const getMasArticulos = (pageNumber) => {
    setIsLoading(true);
    setCurrentPage(pageNumber);

    setTimeout(() => {
      const start = (pageNumber - 1) * rowsToShow;
      const end = start + rowsToShow;

      setDisplayedArticulos(tablaProductos.slice(start, end));
      setIsLoading(false);
    }, 300);
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
        <Box flex={1}>
          <TextInput
            w={"100%"}
            maxWidth="350px"
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
            totalPages={totalPages}
            getMasArticulos={getMasArticulos}
            listaProveedores={totalProveedores ? totalProveedores : []}
            setListaProveedores={setTotalProveedores}
            listaCategorias={totalCategorias ? totalCategorias : []}
            setListaCategorias={setTotalCategorias}
            displayedArticulos={displayedArticulos ? displayedArticulos : []}
            setDisplayedArticulos={setDisplayedArticulos}
            setTablaProductos={setTablaProductos}
            productSelected={productSelected}
            setProductSelected={setProductSelected}
            editProducto={EditarProducto}
            deleteProducto={DeleteProducto}
            setBusqueda={setBusqueda}
            isLoading={isLoading}
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
      {isSecondModalOpen && (
        <DespacharProdsBod
          isOpen={isSecondModalOpen}
          onOpen={onSecondModalOpen}
          onClose={onSecondModalClose}
          totalProdcsBodega={tablaProductos}
          setTotalProdcsBodega={setTablaProductos}
          displayedArticulos={displayedArticulos}
          setDisplayedArticulos={setDisplayedArticulos}
        />
      )}
      {isThirdModalOpen && (
        <TransferirProdsBod
          isOpen={isThirdModalOpen}
          onOpen={onThirdModalOpen}
          onClose={onThirdModalClose}
          totalProdcsBodega={tablaProductos}
          setTotalProdcsBodega={setTablaProductos}
          displayedArticulos={displayedArticulos}
          setDisplayedArticulos={setDisplayedArticulos}
        />
      )}
    </Box>
  );
}
