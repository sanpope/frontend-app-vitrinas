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
import React, { useState } from "react";
import StandardButton from "./ui/buttons/standard";
import RightArrowIcon from "../assets/images/RightArrowIcon";
import FilterIcon from "../assets/images/FilterIcon";
import SearchIcon from "../assets/images/SearchIcon";
import TextInput from "./ui/textInput/index";
import Checkbox from "./ui/checkbox";
import colors from "../theme/colors";
import Product from "./Product";
import ConfirmationMessage from "./ConfirmationMessage";

export default function Transferir({
  vitrina = "Vitrina",
  isOpen,
  onOpen,
  onClose,
}) {
  const [productsList, setProductsList] = useState([
    "Nombre del producto",
    "Nombre del producto",
    "Nombre del producto",
    "Nombre del producto",
  ]);
  const [active, setActive] = useState(0);
  const [productosATransferir, setProductosATransferir] = useState(25);
  const {
    isOpen: isConfirmationModalOpen,
    onOpen: onConfirmationModalOpen,
    onClose: onConfirmationModalClose,
  } = useDisclosure();
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
          >
            <Box
              w={{ base: "100%", lg: "50%" }}
              display={"flex"}
              justifyContent={"space-between"}
              gap={"1.25rem"}
            >
              <Box
                py={"1.25rem"}
                display={"flex"}
                flexDirection={"column"}
                gap={"1.25rem"}
              >
                <Text textStyle={"RobotoSubtitleRegular"}>
                  Se transferiran productos desde
                </Text>
                <Select
                  required
                  placeholder="Bodega"
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
                  <option>La bodega</option>
                  <option>Nombre de la Vitrina</option>
                </Select>
              </Box>
              <Box
                display={{ base: "none", lg: "flex" }}
                justifyContent={"center"}
                alignItems={"flex-end"}
                p={"1.25rem"}
              >
                <RightArrowIcon />
              </Box>
              <Box
                p={"1.25rem"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-between"}
                gap={"1.25rem"}
              >
                <Text textStyle={"RobotoSubtitleRegular"}>Hacia</Text>
                <Text textStyle={"RobotoSubtitleRegular"}>{vitrina}</Text>
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
                  <TextInput placeholder={"Buscar"} leftIcon={<SearchIcon />} />
                  <FilterIcon />
                </FormLabel>

                <FormLabel display="flex" alignItems="center">
                  <UnorderedList
                    styleType="none"
                    w={"100%"}
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
                    {productsList.map((product, index) => {
                      return (
                        <ListItem
                          key={index}
                          w={"95%"}
                          borderBottom="1px"
                          borderColor="gray.200"
                          py={"10px"}
                          onClick={() => setActive(index)}
                        >
                          <Checkbox
                            defaultChecked={active === index ? true : false}
                            text={product}
                            colorScheme={"#1890FF"}
                          />
                        </ListItem>
                      );
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
              <FormControl w={"100%"} display={"flex"} flexDirection={"column"}>
                <Text textStyle={"RobotoSubtitleBold"} py={"10px"}>
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
                  <Product />
                  <Product />
                  <Product />
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
          >
            Enviar
          </StandardButton>
          <ConfirmationMessage
            text={`Se transferirán ${productosATransferir} productos de la bodega hacia la vitrina `}
            isOpen={isConfirmationModalOpen}
            onOpen={onConfirmationModalOpen}
            onClose={onConfirmationModalClose}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
