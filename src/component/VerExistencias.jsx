import React from "react";
import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

import StandardButton from "./ui/buttons/standard";
import ClockIcon from "../assets/images/ClockIcon";
import UsdCircleIcon from "../assets/images/UsdCircleIcon";
import {
  capitalizeFirstLetter,
  formatearNumero,
  formatFecha,
} from "../utils/formatting";

export default function VerExistencias({
  fecha,
  total,
  productos,
  isOpen,
  onOpen,
  onClose,
  text,
}) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg={"rgba(0, 0, 0, 0.2)"} />
        <ModalContent borderRadius={"20px"} w={"100%"} maxW={"400px"}>
          <ModalHeader
            bg={"black"}
            display={"flex"}
            flexDir={"column"}
            borderTopRadius="20px"
          >
            <Text textStyle={"RobotoSubtitle"} color={"white"}>
              Productos Afectados
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
                flexGrow={1}
                display={"flex"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                gap={"5px"}
              >
                <ClockIcon width={"13px"} />
                <Text textStyle={"RobotoRegularBold"}>
                  {formatFecha(fecha)}
                </Text>
              </Box>
              <Box
                flexGrow={1}
                display={"flex"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                gap={"5px"}
              >
                <UsdCircleIcon width={"20px"} />
                <Text textStyle={"RobotoRegularBold"}>
                  ${formatearNumero(total)}
                </Text>
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
              >
                {productos?.map((producto, index) => (
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
                      {capitalizeFirstLetter(producto.nombre)}
                    </Text>
                    <Text textStyle={"RobotoBody"} color={"black"}>
                      {producto.cantidad}
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
