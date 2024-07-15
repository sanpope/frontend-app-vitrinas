import React from "react";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import StandardButton from "./ui/buttons/standard";
import ClockIcon from "../assets/images/ClockIcon";
import UsdCircleIcon from "../assets/images/UsdCircleIcon";
const newDate = new Date();

export default function VerExistencias({
  date = newDate.toLocaleDateString(),
  hour = newDate.toLocaleTimeString(),
  total = "245.000",
  products = [
    { Nombre: "Producto 1", Cantidad: 45 },
    { Nombre: "Producto 2", Cantidad: 45 },
    { Nombre: "Producto 3", Cantidad: 45 },
    { Nombre: "Producto 4", Cantidad: 45 },
    { Nombre: "Producto 5", Cantidad: 45 },
    { Nombre: "Producto 6", Cantidad: 45 },
    { Nombre: "Producto 7", Cantidad: 45 },
  ],
  isOpen,
  onOpen,
  onClose,
}) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={"20px"} w={"100%"} maxW={"400px"}>
          <ModalHeader
            bg={"black"}
            display={"flex"}
            flexDir={"column"}
            borderTopRadius="20px"
          >
            <Text textStyle={"RobotoSubtitle"} color={"white"}>
              Productos vendidos
            </Text>
          </ModalHeader>
          <ModalBody display={"flex"} flexDirection={"column"} p={"20px"}>
            <Box
              w={"100%"}
              display={"flex"}
              gap={"20px"}
              borderBottom="1px"
              borderColor="gray.200"
              py={"10px"}
            >
              <Box
                w={"50%"}
                display={"flex"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                gap={"5px"}
              >
                <ClockIcon width={"13px"} />
                <Text textStyle={"RobotoTinyBold"}>
                  {date} a las {hour}
                </Text>
              </Box>
              <Box
                w={"50%"}
                display={"flex"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                gap={"5px"}
              >
                <UsdCircleIcon width={"20px"} />
                <Text textStyle={"RobotoTinyBold"}>${total}</Text>
              </Box>
            </Box>
            <Box
              w={"100%"}
              display={"flex"}
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box
                w={"100%"}
                display={"flex"}
                borderBottom="1px"
                borderColor="gray.200"
                alignItems={"center"}
                justifyContent={"space-between"}
                py={"10px"}
              >
                <Text
                  textStyle={"RobotoRegularBold"}
                  color={"grey.placeholder"}
                >
                  Producto
                </Text>
                <Text
                  textStyle={"RobotoRegularBold"}
                  color={"grey.placeholder"}
                >
                  Unidades
                </Text>
              </Box>
              <Box
                w={"100%"}
                height={"170px"}
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
                {products.map((producto, index) => (
                  <Box
                    key={index}
                    w={"100%"}
                    display={"flex"}
                    borderBottom="1px"
                    borderColor="gray.200"
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    py={"10px"}
                    pr={"15px"}
                  >
                    <Text textStyle={"RobotoBody"} color={"black"}>
                      {producto.Nombre}
                    </Text>
                    <Text textStyle={"RobotoBody"} color={"black"}>
                      {producto.Cantidad}
                    </Text>
                  </Box>
                ))}
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter
            display={"flex"}
            gap={"10px"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <StandardButton
              variant={"WHITE_RED"}
              borderRadius="20px"
              py={"17px"}
              w={"100%"}
              maxW={"230px"}
              fontSize={"14px"}
              fontWeight="400"
              onClick={onClose}
            >
              Salir
            </StandardButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
