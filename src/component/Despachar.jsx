import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  List,
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
  useToast,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { generateProductsListXML, parseData } from "../utils/xmlParse";
import { capitalizeFirstLetter } from "../utils/formatting";
import LoadingComponent from "./LoadingComponent";

export default function Despachar({ vitrina, isOpen, onOpen, onClose }) {
  const toast = useToast();
  const [totalProdcsBodega, setTotalProdcsBodega] = useState([]);
  const [displayedArticulos, setDisplayedArticulos] = useState([]);
  const [activeProdcs, setActiveProdcs] = useState([]);
  const [busqueda, setBusqueda] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBodegaInfo();
  }, []);

  useEffect(() => {
    if (busqueda !== null) {
      Busqueda(busqueda);
    } else {
    }
  }, [busqueda]);

  const {
    isOpen: isConfirmationModalOpen,
    onOpen: onConfirmationModalOpen,
    onClose: onConfirmationModalClose,
  } = useDisclosure();

  const getBodegaInfo = async () => {
    const url = `${process.env.REACT_APP_SERVER_URL}/app/rest/bodega/productos`;
    try {
      setLoading(true);
      const response = await axios.get(url, {
        headers: {
          Accept: "application/xml",
        },
      });
      if (response.status == 200 && response.data) {
        const xmlDoc = parseData(response.data);
        setTotalProdcsBodega(() => {
          const totalProds = getProductosBodega(xmlDoc);
          const results = totalProds.filter(
            (item) => item.cantidadEnBodega > 0,
          );
          return results;
        });
        setDisplayedArticulos(() => {
          const totalProds = getProductosBodega(xmlDoc);
          const results = totalProds.filter(
            (item) => item.cantidadEnBodega > 0,
          );
          return results;
        });
      }
    } catch (error) {
      console.error("Error fetching XML data:", error);
    } finally {
      setLoading(false);
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

  const Busqueda = (textToSearch) => {
    if (!textToSearch) {
      setDisplayedArticulos(totalProdcsBodega);
      return;
    }

    const textoNormalizado = textToSearch
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    let result = totalProdcsBodega?.filter((element) => {
      if (element?.nombre) {
        const nombreNormalizado = element.nombre
          .toString()
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        return nombreNormalizado.includes(textoNormalizado);
      }
      return false;
    });

    setDisplayedArticulos(result);
  };

  const onBuscarChange = (e) => {
    setBusqueda(e);
  };

  const handleCheck = useCallback((producto) => {
    setActiveProdcs((prev) => {
      const exists = prev.some((item) => item.codigo === producto.codigo);
      if (exists) {
        return prev.filter((item) => item.codigo !== producto.codigo);
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  }, []);

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
      return prev;
    });
  };

  const ProductListItem = useCallback(
    (product, index) => {
      const isActive = activeProdcs.some(
        (item) => item.codigo === product.codigo,
      );

      const onItemClick = (e) => {
        e.stopPropagation();

        if (isActive) {
          setActiveProdcs((prev) =>
            prev.filter((item) => item.codigo !== product.codigo),
          );
        } else {
          setActiveProdcs((prev) => [...prev, { ...product, cantidad: 1 }]);
        }
      };

      return (
        <ListItem
          key={index}
          w="100%"
          borderBottom="1px"
          borderColor="gray.200"
          py={"10px"}
        >
          <Box
            display="flex"
            alignItems="center"
            onClick={onItemClick}
            cursor="pointer"
          >
            <input
              type="checkbox"
              checked={isActive}
              readOnly={true}
              style={{ marginRight: "8px" }}
            />
            <Text>{capitalizeFirstLetter(product.nombre)}</Text>
          </Box>
        </ListItem>
      );
    },
    [activeProdcs],
  );

  const despacharProdcs = async () => {
    const xmlData = generateProductsListXML(activeProdcs).toString();
    setLoading(true);
    const url = `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina/inventario/productos/despacho?vitrina=${vitrina}`;
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/xml" },
      body: xmlData,
    })
      .then((response) => {
        if (response.status == 200) {
          toast({
            status: "success",
            description: "¡Despacho realizado con éxito!",
            duration: 3000,
            position: "top-right",
            isClosable: true,
          });
        }
        setLoading(false);
        onClose();
      })
      .catch((error) => {
        toast({
          status: "error",
          description: "Error despachando los productos",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
        setLoading(false);
      });
  };

  const CantidadTotal = useMemo(() => {
    return activeProdcs.reduce((arr, item) => {
      return arr + Number.parseInt(item.cantidad);
    }, 0);
  }, [activeProdcs]);

  return (
    <Box>
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
              Despachar
            </Text>
          </ModalHeader>
          <ModalBody display={"flex"} flexDirection={"column"} gap={"10px"}>
            <Box w={"100%"} display={"flex"} flexDir={"column"} mt={"10px"}>
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
                  Se despacharán productos desde:
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
                <Text
                  minH={"40px"}
                  w={"100%"}
                  maxW={"250px"}
                  textStyle={"RobotoSubtitleRegular"}
                  borderRadius={"5px"}
                  borderWidth={1}
                  borderColor={"mainBg"}
                  p={2}
                >
                  Bodega
                </Text>
                <Box
                  h={"100%"}
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
                  {vitrina}
                </Text>
              </Box>
            </Box>
            <Box
              w={"100%"}
              height={"100%"}
              display={"flex"}
              gap={"1.25rem"}
              flexDirection={{ base: "column", md: "row" }}
              paddingTop={"10px"}
            >
              <Box
                w={{ base: "100%", md: "50%" }}
                height={"240px"}
                borderRadius={"20px"}
                border="1px"
                borderColor="gray.200"
                p={"0.938rem"}
                pl={"20px"}
              >
                <FormControl>
                  <Text textStyle={"RobotoSubtitleBold"} pb={"10px"}>
                    Seleccionar productos
                  </Text>
                  {loading ? (
                    <Box height="160px">
                      <LoadingComponent
                        size="md"
                        text="Cargando productos..."
                      />
                    </Box>
                  ) : displayedArticulos && displayedArticulos.length > 0 ? (
                    <>
                      <FormLabel
                        display="flex"
                        flexDirection={"column"}
                        alignItems="center"
                        justifyContent={"center"}
                        gap={"0.625rem"}
                        width={"100%"}
                        height={"100%"}
                      >
                        <TextInput
                          placeholder={"Buscar"}
                          leftIcon={<SearchIcon width="17px" height="17px" />}
                          onChange={(e) => onBuscarChange(e)}
                          value={busqueda}
                        />
                      </FormLabel>

                      <FormLabel display="flex" alignItems="center">
                        <UnorderedList
                          styleType="none"
                          w={"100%"}
                          height={"120px"}
                          overflowY="scroll"
                          overflowX="hidden"
                          m={0}
                          px={"5px"}
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
                          {displayedArticulos?.map((product, index) => {
                            return ProductListItem(product, index);
                          })}
                        </UnorderedList>
                      </FormLabel>
                    </>
                  ) : (
                    <Box
                      width="100%"
                      height="160px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text color={"grey.placeholder"}>
                        No hay productos que mostrar
                      </Text>
                    </Box>
                  )}
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
                    <Text textStyle={"RobotoSubtitleBold"} pb={"10px"}>
                      Productos a despachar
                    </Text>

                    <Box
                      alignSelf={"flex-end"}
                      display={"flex"}
                      w={"100%"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Text
                        flex={1}
                        textStyle={"RobotoBodyBold"}
                        py={"5px"}
                        textAlign={"center"}
                      >
                        Producto
                      </Text>
                      <Text
                        flex={1}
                        textStyle={"RobotoBodyBold"}
                        py={"5px"}
                        textAlign={"center"}
                      >
                        Stock
                      </Text>
                      <Text
                        flex={1}
                        textStyle={"RobotoBodyBold"}
                        py={"5px"}
                        textAlign={"left"}
                      >
                        Cantidad
                      </Text>
                    </Box>

                    <FormLabel
                      display={"flex"}
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
                        {activeProdcs?.map((product, index) => {
                          return (
                            <ListItem key={index}>
                              <Product
                                productName={capitalizeFirstLetter(
                                  product.nombre,
                                )}
                                existencias={product.cantidadEnBodega}
                                producto={product}
                                setProdCantidad={(val) => {
                                  setProdCantidad(val, product);
                                }}
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
                    <Text textStyle={"RobotoSubtitleBold"} pb={"10px"}>
                      Productos a despachar
                    </Text>
                    <Box
                      w={"100%"}
                      h={"100%"}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Text color={"grey.placeholder"}>
                        Por favor seleccione los productos a despachar
                      </Text>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter display={"flex"} gap={"10px"} paddingTop={"10px"}>
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
              onClick={
                activeProdcs?.length > 0 ? onConfirmationModalOpen : null
              }
              disabled={activeProdcs?.length > 0 ? false : true}
              cursor={activeProdcs?.length > 0 ? "pointer" : "not-allowed"}
              isLoading={loading}
            >
              Enviar
            </StandardButton>
            <ConfirmationMessage
              text={`Se despacharán ${CantidadTotal} productos desde La Bodega hacia ${vitrina}. `}
              isOpen={isConfirmationModalOpen}
              onOpen={onConfirmationModalOpen}
              onClose={onConfirmationModalClose}
              isLoading={loading}
              funcConfirmar={despacharProdcs}
              products={null}
              desde={"Bodega"}
              hacia={vitrina}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
