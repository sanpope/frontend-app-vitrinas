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
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
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

export default function Despachar({
  vitrina,
  isOpen,
  onOpen,
  onClose,
  productsList,
}) {
  const [productosADespachar, setProductosADespachar] = useState(25);
  const [totalProducts, setTotalProducts] = useState(productsList);
  const [displayedArticulos, setDisplayedArticulos] = useState(productsList);
  const [activeProdcs, setActiveProdcs] = useState([]);
  const [busqueda, setBusqueda] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (busqueda) {
      Busqueda(busqueda);
    } else {
    }
  }, [busqueda]);

  const {
    isOpen: isConfirmationModalOpen,
    onOpen: onConfirmationModalOpen,
    onClose: onConfirmationModalClose,
  } = useDisclosure();

  const Busqueda = (textToSearch) => {
    let result = totalProducts?.filter((element) => {
      if (
        element?.nombre
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

  const handleCheck = (producto) => {
    const isChecked = activeProdcs.find(
      (item) => item.codigo === producto.codigo,
    );
    if (isChecked) {
      deleteProductFromList(producto);
    } else {
      const nuevoProducto = { ...producto, cantidad: 0 };
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
          w="100%"
          borderBottom="1px"
          borderColor="gray.200"
          py={"10px"}
        >
          <Checkbox
            checked={!!isActive}
            setChecked={() => handleCheck(product)}
            text={product.nombre}
            colorScheme={"#1890FF"}
          />
        </ListItem>
      );
    },
    [activeProdcs],
  );

  const despacharProdcs = async () => {
    const xmlData = generateProductsListXML(activeProdcs).toString();
    setLoading(true);
    const url = `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina/inventario/productos/transferencia?vitrina=${vitrina}`;
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/xml" },
      body: xmlData.toString(),
    })
      .then((response) => {
        console.log(response);
        setLoading(false);
        
      })
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error: ", error);
        setLoading(false);
      });
  };

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
          <ModalBody display={"flex"} flexDirection={"column"}>
            <Box
              display={"flex"}
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"flex-start"}
              gap={1}
              p={1}
              pb={3}
            >
              <Box
                display={"flex"}
                justifyContent={"space-around"}
                gap={"1.25rem"}
              >
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"space-between"}
                >
                  <Text
                    textStyle={"RobotoSubtitleRegular"}
                    color={"grey.placeholder"}
                  >
                    Se despacharán productos desde:
                  </Text>
                  <Text textStyle={"RobotoSubtitleRegular"} p={1}>
                    Bodega
                  </Text>
                </Box>
                <Box
                  display={{ base: "none", lg: "flex" }}
                  justifyContent={"center"}
                  alignItems={"flex-end"}
                >
                  <RightArrowIcon />
                </Box>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"space-between"}
                >
                  <Text
                    textStyle={"RobotoSubtitleRegular"}
                    color={"grey.placeholder"}
                    p={1}
                  >
                    Hacia
                  </Text>
                  <Text
                    textStyle={"RobotoSubtitleRegular"}
                    borderRadius={"10px"}
                    borderWidth={1}
                    borderColor={"mainBg"}
                    p={1}
                  >
                    {vitrina}
                  </Text>
                </Box>
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
                      height={"120px"}
                      overflowY="scroll"
                      overflowX="hidden"
                      m={0}
                      px={1}
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
                      {displayedArticulos.map((product, index) => {
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
                <FormControl
                  w={"100%"}
                  display={"flex"}
                  flexDirection={"column"}
                >
                  <Text textStyle={"RobotoSubtitleBold"} py={"10px"}>
                    Productos a despachar
                  </Text>
                  <Box
                    alignSelf={"flex-end"}
                    mr={"14%"}
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
                      {activeProdcs?.map((product, index) => {
                        return (
                          <ListItem key={index}>
                            <Product
                              productName={product.nombre}
                              stock={product.stockMax}
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
              variant={"RED_PRIMARY"}
              borderRadius="20px"
              py={"17px"}
              w={"150px"}
              fontSize="14px"
              fontWeight="400"
              onClick={onConfirmationModalOpen}
              disabled={true}
              _disabled={"mainBg"}
            >
              Enviar
            </StandardButton>
            <ConfirmationMessage
              text={`Se despacharán ${productosADespachar} productos de la bodega hacia la vitrina `}
              isOpen={isConfirmationModalOpen}
              onOpen={onConfirmationModalOpen}
              onClose={onConfirmationModalClose}
              isLoading={loading}
              funcConfirmar={despacharProdcs}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
