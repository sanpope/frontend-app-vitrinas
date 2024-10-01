import {
  Box,
  Button,
  FormControl,
  FormLabel,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useEffect, useCallback } from "react";
import StandardButton from "./ui/buttons/standard";
import RightArrowIcon from "../assets/images/RightArrowIcon";
import FilterIcon from "../assets/images/FilterIcon";
import SearchIcon from "../assets/images/SearchIcon";
import TextInput from "./ui/textInput/index";
import Checkbox from "./ui/checkbox";
import colors from "../theme/colors";
import Product from "./Product";
import ConfirmationMessage from "./ConfirmationMessage";
import axios from "axios";

import { parseData } from "../utils/xmlParse";
import { generateProductsListXML } from "../utils/xmlParse";
import { capitalizeFirstLetter } from "../utils/formatting";
import { useMemo } from "react";

export default function Transferir({
  vitrina,
  isOpen,
  onOpen,
  onClose,
  productsList,
  setProductsList,
}) {
  const [desde, setDesde] = useState("Bodega");
  const [hacia, setHacia] = useState(vitrina);
  const [displayedArticulos, setDisplayedArticulos] = useState(productsList);
  const [totalProdcsBodega, setTotalProdcsBodega] = useState();
  const [busqueda, setBusqueda] = useState(null);
  const [loading, setLoading] = useState(false);
  const [productsToShow, setProductsToShow] = useState([]);

  const [activeProdcs, setActiveProdcs] = useState([]);

  useEffect(() => {
    if (busqueda !== null) {
      Busqueda(busqueda);
    } else {
    }
  }, [busqueda]);

  useEffect(() => {
    getBodegaInfo();
  }, []);

  useEffect(() => {
    if (totalProdcsBodega) {
      setActiveProdcs([]);
      setProductsToShow(
        desde === "Bodega" ? totalProdcsBodega : displayedArticulos,
      );
    }
  }, [desde]);

  const {
    isOpen: isConfirmationModalOpen,
    onOpen: onConfirmationModalOpen,
    onClose: onConfirmationModalClose,
  } = useDisclosure();

  const handleOnChange = (event) => {
    const desdeSelected = event.target.value;
    switch (desdeSelected) {
      case "Bodega":
        setDesde("Bodega");
        setHacia(vitrina);
        break;
      case vitrina:
        setDesde(vitrina);
        setHacia("Bodega");
        break;
      default:
        setDesde("Bodega");
        setHacia(vitrina);
        break;
    }
  };

  const Busqueda = (textToSearch) => {
    const tableToFilter =
      desde === "Bodega" ? totalProdcsBodega : displayedArticulos;
    console.log(textToSearch, " texto a buscar ", tableToFilter);
    let result = tableToFilter?.filter((element) => {
      if (
        element?.nombre?.toLowerCase().includes(textToSearch?.toLowerCase())
      ) {
        console.log(element);
        return element;
      }
    });
    setProductsToShow(result);
  };

  const onBuscarChange = (e) => {
    setBusqueda(e);
  };

  const handleCheck = (producto) => {
    const isChecked = activeProdcs.find(
      (item) => item.codigo === producto.codigo,
    );
    if (isChecked) {
      deleteProductFromList(producto);
    } else {
      const nuevoProducto = { ...producto, cantidad: 1 };
      setActiveProdcs((prev) => [...prev, nuevoProducto]);
    }
  };

  const setProdCantidad = (val, prod) => {
    const isProdExists = activeProdcs?.find(
      (item) => item.codigo === prod.codigo,
    );
    if (isProdExists) {
      setActiveProdcs((prev) => {
        const index = prev.findIndex((item) => item.codigo === prod.codigo);
        if (index !== -1) {
          const copy = [...prev];
          copy[index]["cantidad"] = val;
          return copy;
        }
      });
    }
  };

  const deleteProductFromList = (prod) => {
    setActiveProdcs((prev) => {
      const index = prev.findIndex((item) => item.codigo === prod.codigo);
      if (index !== -1) {
        const copy = [...prev];
        copy.splice(index, 1);
        return copy;
      }
    });
  };

  const ProductListItem = useCallback(
    (product, index) => {
      const isActive = activeProdcs.find((currentProduct) => {
        return currentProduct.codigo === product.codigo;
      });

      return (
        <ListItem
          key={index}
          w={"100%"}
          borderBottom="1px"
          borderColor="gray.200"
          py={"10px"}
        >
          <Checkbox
            checked={!!isActive}
            setChecked={() => handleCheck(product)}
            text={capitalizeFirstLetter(product.nombre)}
            colorScheme={"#1890FF"}
          />
        </ListItem>
      );
    },
    [activeProdcs],
  );

  const transferirProdcs = async () => {
    setLoading(true);
    const xmlData = generateProductsListXML(activeProdcs).toString();
    console.log(activeProdcs);

    const haciaVitrina = hacia === vitrina ? true : false;
    const url = `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina/inventario/productos/transferencia?vitrina=${vitrina}&haciaVitrina=${haciaVitrina}`;
    if (xmlData.length > 0) {
      fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/xml" },
        body: xmlData.toString(),
      })
        .then((response) => {
          console.log(response);
          if (response) {
            if (haciaVitrina) {
              setProductsList((prev) => {
                const copy = [...prev];
                for (let i = 0; i < activeProdcs?.length; i++) {
                  const index = copy.findIndex(
                    (prod) => prod.codigo === activeProdcs[i]?.codigo,
                  );
                  if (index !== -1) {
                    let existencia = copy[index].existencia;
                    let cantidad = activeProdcs[i].cantidad;
                    copy[index].existencia =
                      Number(existencia) + Number(cantidad);
                  }else{
                    //TODO AGREGAR PRODUCTO SI NO ESTA EN LA TABLA PREGUNTA POR LOS ITEMS DE LA TABLA  
                  }
                }
                return copy;
              });
            } else {
              setProductsList((prev) => {
                const copy = [...prev];
                for (let i = 0; i < activeProdcs?.length; i++) {
                  const index = copy.findIndex(
                    (prod) => prod.codigo === activeProdcs[i]?.codigo,
                  );
                  if (index !== -1) {
                    let existencia = copy[index].existencia;
                    let cantidad = activeProdcs[i].cantidad;
                    copy[index].existencia =
                      Number(existencia) - Number(cantidad);
                  }
                }
                return copy;
              });
            }
          }
          setLoading(false);
          onClose();
        })
        .then((data) => console.log(data))
        .catch((error) => {
          console.error("Error: ", error);
        });
    } else {
      alert("Agrega los productos a transferir");
    }
  };

  const getBodegaInfo = async () => {
    const url = `${process.env.REACT_APP_SERVER_URL}/app/rest/bodega/productos`;
    try {
      const response = await axios.get(url, {
        headers: {
          Accept: "application/xml",
        },
      });
      const xmlDoc = parseData(response.data);
      if (response) {
        const xmlDoc = parseData(response.data);
        setTotalProdcsBodega(() => {
          const totalProds = getProductosBodega(xmlDoc);
          const results = totalProds.filter(
            (item) => item.cantidadEnBodega > 0,
          );
          return results;
        });
        setProductsToShow(() => {
          const totalProds = getProductosBodega(xmlDoc);
          const results = totalProds.filter(
            (item) => item.cantidadEnBodega > 0,
          );
          return results;
        });
      }
    } catch (error) {
      console.error("Error fetching XML data:", error);
    }
  };

  const getProductosBodega = (xml) => {
    const productosDelNegocio = xml.querySelector("productosDelNegocio");
    const arrProductosBodega = productosDelNegocio.querySelectorAll("producto");
    const totalProdsBodegaArr = [];
    for (let i = 0; i < arrProductosBodega.length; i++) {
      const cantidadEnBodega =
        arrProductosBodega[i]?.getElementsByTagName("cantidadEnBodega")[0]
          .textContent;
      const cantidadEnVitrinas =
        arrProductosBodega[i]?.getElementsByTagName("cantidadEnVitrinas")[0]
          .textContent;
      const codigo =
        arrProductosBodega[i]?.getElementsByTagName("codigo")[0].textContent;
      const costo =
        arrProductosBodega[i]?.getElementsByTagName("costo")[0].textContent;
      const nombre =
        arrProductosBodega[i]?.getElementsByTagName("nombre")[0].textContent;
      const precio =
        arrProductosBodega[i]?.getElementsByTagName("precio")[0].textContent;

      totalProdsBodegaArr.push({
        cantidadEnBodega,
        cantidadEnVitrinas,
        codigo,
        costo,
        nombre,
        precio,
      });
    }

    return totalProdsBodegaArr;
  };

  const CantidadTotal = useMemo(() => {
    return activeProdcs.reduce((arr, item) => {
      return arr + Number.parseInt(item.cantidad);
    }, 0);
  }, [activeProdcs]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        borderRadius={"20px"}
        maxW={"70%"}
        height={"auto"}
        bg={"white"}
      >
        <ModalHeader
          bg={"black"}
          display={"flex"}
          flexDir={"column"}
          borderTopRadius="20px"
        >
          <Text textStyle={"RobotoSubtitle"} color={"white"}>
            Transferir
          </Text>
        </ModalHeader>
        <ModalBody display={"flex"} flexDirection={"column"} gap={2}>
          <Box w={"100%"} display={"flex"} flexDir={"column"}>
            <Box
              w={"100%"}
              display={"flex"}
              alignContent={"center"}
              gap={2}
              justifyContent={"flex-start"}
              pb={2}
            >
              <Text
                w={"100%"}
                maxW={"250px"}
                textStyle={"RobotoSubtitleRegular"}
                color={"grey.placeholder"}
              >
                Se transferiran productos desde:
              </Text>
              <Text w={"50px"}></Text>
              <Text
                w={"100%"}
                maxW={"250px"}
                textStyle={"RobotoSubtitleRegular"}
                color={"grey.placeholder"}
              >
                Hacia:
              </Text>
            </Box>
            <Box
              display={"flex"}
              alignContent={"center"}
              gap={2}
              justifyContent={"flex-start"}
            >
              <Select
                minH={"40px"}
                w={"100%"}
                maxW={"250px"}
                onChange={handleOnChange}
                required
                color={"grey.placeholder"}
                sx={{
                  borderColor: "mainBg",
                  borderWidth: "1px",
                  _hover: {
                    borderColor: "blue.50",
                    borderWidth: "1px",
                  },
                  _focus: {
                    borderColor: "blue.50",
                    boxShadow: "0px 0px 5px 0px rgba(88, 178, 255, 1)",
                    borderWidth: "1px",
                  },
                }}
              >
                <option>{"Bodega"}</option>
                <option>{vitrina}</option>
              </Select>
              <Box
                display={{ base: "none", lg: "flex" }}
                justifyContent={"center"}
                alignItems={"center"}
                alignSelf={"center"}
              >
                <RightArrowIcon height="100%" />
              </Box>

              <Text
                minH={"40px"}
                w={"100%"}
                maxW={"240px"}
                textStyle={"RobotoSubtitleRegular"}
                borderRadius={"5px"}
                borderWidth={1}
                borderColor={"mainBg"}
                p={2}
              >
                {hacia}
              </Text>
            </Box>
          </Box>

          <Box
            w={"100%"}
            display={"flex"}
            flexDir={{ base: "column", md: "row" }}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"1.25rem"}
          >
            <Box
              w={{ base: "100%", md: "50%" }}
              height={"240px"}
              borderRadius={"20px"}
              border="1px"
              borderColor="gray.200"
              p={"0.938rem"}
            >
              <FormControl>
                <Text textStyle={"RobotoSubtitleBold"} py={"10px"}>
                  Seleccionar productos
                </Text>
                <FormLabel
                  display="flex"
                  alignItems="center"
                  justifyContent={"space-between"}
                  gap={"0.625rem"}
                >
                  <TextInput
                    placeholder={"Buscar"}
                    leftIcon={<SearchIcon />}
                    onChange={(e) => onBuscarChange(e)}
                    value={busqueda}
                  />
                  <FilterIcon />
                </FormLabel>

                <FormLabel display="flex" alignItems="center">
                  <UnorderedList
                    styleType="none"
                    w={"100%"}
                    m={0}
                    px={1}
                    height={"120px"}
                    overflowY="scroll"
                    sx={{
                      "::-webkit-scrollbar": {
                        width: "8px",
                        height: "4px",
                      },
                      "::-webkit-scrollbar-track": {
                        background: "tranparent",
                      },
                      "::-webkit-scrollbar-thumb": {
                        background: "gray.200",
                        borderRadius: "10px",
                      },
                      "::-webkit-scrollbar-thumb:hover": {
                        background: "gray.200",
                      },
                    }}
                  >
                    {productsToShow?.map((product, index) => {
                      return ProductListItem(product, index);
                    })}
                  </UnorderedList>
                </FormLabel>
              </FormControl>
            </Box>
            <Box
              w={{ base: "100%", md: "50%" }}
              height={"240px"}
              borderRadius={"20px"}
              border="1px"
              borderColor="gray.200"
              p={"15px"}
            >
              {activeProdcs?.length > 0 ? (
                <FormControl
                  w={"100%"}
                  display={"flex"}
                  flexDirection={"column"}
                >
                  <Text textStyle={"RobotoSubtitleBold"} p={"10px"}>
                    Productos a transferir
                  </Text>

                  <Box
                    alignSelf={"flex-end"}
                    mr={"12%"}
                    display={"flex"}
                    w={"50%"}
                    alignItems={"center"}
                    justifyContent={"space-around"}
                  >
                    <Text textStyle={"RobotoBody"} py={"10px"}>
                      Stock
                    </Text>
                    <Text textStyle={"RobotoBody"} py={"10px"}>
                      Cantidad
                    </Text>
                  </Box>

                  <FormLabel
                    display="flex"
                    alignItems="center"
                    flexDirection={"column"}
                    height={"120px"}
                    overflowY="scroll"
                    overflowX="hidden"
                    sx={{
                      "::-webkit-scrollbar": {
                        width: "8px",
                        height: "4px",
                      },
                      "::-webkit-scrollbar-track": {
                        background: "tranparent",
                      },
                      "::-webkit-scrollbar-thumb": {
                        background: "gray.200",
                        borderRadius: "10px",
                      },
                      "::-webkit-scrollbar-thumb:hover": {
                        background: "gray.200",
                      },
                    }}
                  >
                    <UnorderedList
                      styleType="none"
                      w={"100%"}
                      height={"120px"}
                      overflowY="scroll"
                      sx={{
                        "::-webkit-scrollbar": {
                          width: "8px",
                          height: "4px",
                        },
                        "::-webkit-scrollbar-track": {
                          background: "tranparent",
                        },
                        "::-webkit-scrollbar-thumb": {
                          background: "gray.200",
                          borderRadius: "10px",
                        },
                        "::-webkit-scrollbar-thumb:hover": {
                          background: "gray.200",
                        },
                      }}
                    >
                      {console.log(activeProdcs)}
                      {activeProdcs?.map((product, index) => {
                        return (
                          <ListItem key={index}>
                            <Product
                              productName={product.nombre}
                              existencias={
                                product.existencia || product.cantidadEnBodega
                              }
                              producto={product}
                              setProdCantidad={(val) =>
                                setProdCantidad(val, product)
                              }
                              deleteProduct={deleteProductFromList}
                            />
                          </ListItem>
                        );
                      })}
                    </UnorderedList>
                  </FormLabel>
                </FormControl>
              ) : (
                <Box
                  w={"100%"}
                  h={"100%"}
                  display={"flex"}
                  flexDirection={"column"}
                >
                  <Text textStyle={"RobotoSubtitleBold"} py={"10px"}>
                    Productos a transferir
                  </Text>
                  <Box
                    w={"100%"}
                    h={"100%"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Text color={"grey.placeholder"}>
                      Porfavor seleccione los productos a transferir
                    </Text>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </ModalBody>

        <ModalFooter display={"flex"} gap={"10px"}>
          <StandardButton
            variant={"WHITE_RED"}
            borderRadius="20px"
            py={"17px"}
            w={"150px"}
            fontSize="14px"
            fontWeight="400"
            onClick={onClose}
          >
            Cancelar
          </StandardButton>
          <StandardButton
            variant={activeProdcs?.length > 0 ? "RED_PRIMARY" : "DISABLED"}
            borderRadius="20px"
            py={"17px"}
            w={"150px"}
            fontSize="14px"
            fontWeight="400"
            onClick={onConfirmationModalOpen}
            disabled={activeProdcs?.length > 0 ? false : true}
            cursor={activeProdcs?.length > 0 ? "pointer" : "not-allowed"}
          >
            Enviar
          </StandardButton>
          <ConfirmationMessage
            text={`Se transferirán ${CantidadTotal} productos desde ${desde} hacia ${hacia}.`}
            isOpen={isConfirmationModalOpen}
            onOpen={onConfirmationModalOpen}
            onClose={onConfirmationModalClose}
            funcConfirmar={transferirProdcs}
            isLoading={loading}
            desde={desde}
            hacia={hacia}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
