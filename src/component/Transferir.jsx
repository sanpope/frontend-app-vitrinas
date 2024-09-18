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

export default function Transferir({
  vitrina,
  isOpen,
  onOpen,
  onClose,
  productsList,
}) {
  const [desde, setDesde] = useState("Bodega");
  const [hacia, setHacia] = useState(vitrina);
  const [totalProducts, setTotalProducts] = useState(productsList);
  const [activeProdcs, setActiveProdcs] = useState([]);
  const [displayedArticulos, setDisplayedArticulos] = useState(productsList);
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
          w={"100%"}
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

  const transferirProdcs = async () => {
    setLoading(true);
    const xmlData = generateProductsListXML(activeProdcs).toString();
    console.log(xmlData.length);
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
              justifyContent={"space-between"}
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
                  Se transferiran productos desde:
                </Text>
                <Select
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
                  {hacia}
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
                    {displayedArticulos?.map((product, index) => {
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
            >
              <FormControl w={"100%"} display={"flex"} flexDirection={"column"}>
                <Text textStyle={"RobotoSubtitleBold"} p={"10px"}>
                  Productos a transferir
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
            disabled={activeProdcs.length > 0 ? false : true}
          >
            Enviar
          </StandardButton>
          <ConfirmationMessage
            text={`Se transferirán ${activeProdcs?.length} productos desde ${desde} hacia ${hacia} `}
            isOpen={isConfirmationModalOpen}
            onOpen={onConfirmationModalOpen}
            onClose={onConfirmationModalClose}
            funcConfirmar={transferirProdcs}
            isLoading={loading}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
