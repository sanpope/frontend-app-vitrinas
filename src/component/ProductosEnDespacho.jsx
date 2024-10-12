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
const newDate = new Date();

export default function ProductosEnDespacho({
  isOpen,
  onOpen,
  onClose,
  date = newDate.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
  }),
  hour = newDate.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }),

  products,
  handleIngresarProductos,
  isLoading,
}) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={"20px"} w={"100%"} maxW={"550px"}>
          <ModalHeader
            bg={"black"}
            display={"flex"}
            flexDir={"column"}
            borderTopRadius="20px"
          >
            <Text textStyle={"RobotoSubtitle"} color={"white"}>
              Productos en despacho
            </Text>
          </ModalHeader>
          <ModalBody
            display={"flex"}
            flexDirection={"column"}
            p={"20px"}
            justifyContent={"center"}
          >
            {products != null && products?.length > 0 ? (
              <>
                <Box w={"100%"} display={"flex"} gap={"20px"} py={"10px"}>
                  <Text textStyle={"RobotoRegularBold"}>
                    Fecha del despacho: {date} {hour}
                  </Text>
                </Box>
                <Box
                  w={"100%"}
                  minH={"200px"}
                  display={"flex"}
                  flexDir={"column"}
                  justifyContent={"flex-start"}
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
                    {products?.map((producto, index) => (
                      <Box
                        key={index}
                        w={"100%"}
                        display={"flex"}
                        borderBottom="1px"
                        borderColor={"gray.200"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        py={"10px"}
                        pr={"15px"}
                      >
                        <Text textStyle={"RobotoBody"} color={"black"}>
                          {producto.nombre}
                        </Text>
                        <Text textStyle={"RobotoBody"} color={"black"}>
                          {producto.cantidad}
                        </Text>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </>
            ) : (
              <Box
                w={"100%"}
                h={"100%"}
                display={"flex"}
                minH={"200px"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Text color={"grey.placeholder"}>
                  No se encontraron productos pendientes para Despacho
                </Text>
              </Box>
            )}
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
              w={"180px"}
              fontSize={"14px"}
              fontWeight="400"
              onClick={onClose}
            >
              Salir
            </StandardButton>
            <StandardButton
              variant={
                products != null && products?.length > 0
                  ? "RED_PRIMARY"
                  : "DISABLED"
              }
              borderRadius="20px"
              py={"17px"}
              px={"20px"}
              w={"fit-content"}
              fontSize={"0.875rem"}
              fontWeight="400"
              onClick={
                products != null && products?.length > 0
                  ? handleIngresarProductos
                  : null
              }
              disabled={products != null && products?.length > 0 ? false : true}
              cursor={
                products != null && products?.length > 0
                  ? "cursor"
                  : "not-allowed"
              }
            >
              Ingresar todos los productos en despacho
            </StandardButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
