import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import TextInput from "./ui/textInput";
import StandardButton from "./ui/buttons/standard";
import ConfirmationMessage from "./ConfirmationMessage";
import WarningIcon from "../assets/images/WarningIcon";

export default function EditarExistencia() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isConfirmationModalOpen,
    onOpen: onConfirmationModalOpen,
    onClose: onConfirmationModalClose,
  } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Editar Existencia</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={"20px"}>
          <ModalHeader
            bg={"black"}
            display={"flex"}
            flexDir={"column"}
            borderTopRadius="20px"
          >
            <Text textStyle={"RobotoSubtitle"} color={"white"}>
              Editar existencia
            </Text>
          </ModalHeader>
          <ModalBody
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box
              w={"100%"}
              display={"flex"}
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <FormControl
                p={"10px"}
                display="flex"
                flexDirection={"column"}
                alignItems="center"
              >
                <Box
                  w={"100%"}
                  display={"flex"}
                  flexDirection={"column"}
                  gap={"10px"}
                  justifyContent={"center"}
                  alignItems={"flex-start"}
                >
                  <FormLabel>Nombre del producto</FormLabel>
                  <TextInput placeholder={"Nombre"} />
                  <FormLabel display="flex" alignItems="center">
                    Código
                  </FormLabel>
                  <TextInput placeholder={"Codigo"} />
                </Box>
                <Box w={"100%"} display={"flex"} gap={"10px"}>
                  <Box
                    pt={"10px"}
                    w={"50%"}
                    display={"flex"}
                    flexDir={"column"}
                    justifyContent={"center"}
                    alignItems={"flex-start"}
                    gap={"10px"}
                  >
                    <FormLabel display="flex" alignItems="center">
                      Categoría
                    </FormLabel>
                    <Select
                      required
                      placeholder="Tecnología"
                      onChange={(e) => e}
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
                      <option>Opt 1</option>
                      <option>Opt 2</option>
                      <option>Opt 3</option>
                    </Select>
                    <FormLabel display="flex" alignItems="center">
                      Precio
                    </FormLabel>
                    <TextInput placeholder={"Precio"} />
                    <FormLabel display="flex" alignItems="center">
                      Existencia
                    </FormLabel>
                    <TextInput placeholder={"Cantidad"} />
                    <FormLabel display="flex" alignItems="center">
                      Stock mínimo
                    </FormLabel>
                    <TextInput placeholder={"Cantidad"} />
                  </Box>
                  <Box
                    pt={"10px"}
                    w={"50%"}
                    display={"flex"}
                    flexDir={"column"}
                    justifyContent={"center"}
                    alignItems={"flex-start"}
                    gap={"10px"}
                  >
                    <FormLabel display="flex" alignItems="center">
                      Nombre del proveedor
                    </FormLabel>
                    <TextInput placeholder={"Nombre"} />
                    <FormLabel display="flex" alignItems="center">
                      Costo
                    </FormLabel>
                    <TextInput placeholder={"Costo"} />
                    <FormLabel display="flex" alignItems="center">
                      Existencia verificada
                    </FormLabel>
                    <TextInput placeholder={"Cantidad"} />
                    <FormLabel display="flex" alignItems="center">
                      Stock máximo
                    </FormLabel>
                    <TextInput placeholder={"Cantidad"} />
                  </Box>
                </Box>
              </FormControl>
            </Box>
          </ModalBody>

          <ModalFooter display={"flex"} gap={"10px"}>
            <StandardButton
              variant={"WHITE_RED"}
              borderRadius="20px"
              py={"17px"}
              w={"50%"}
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
              w={"50%"}
              fontSize="14px"
              fontWeight="400"
              onClick={onConfirmationModalOpen}
            >
              Guardar
            </StandardButton>
            <ConfirmationMessage
              icon={<WarningIcon />}
              text={`¿Estás seguro que desea corregir la existencia de este producto?`}
              isOpen={isConfirmationModalOpen}
              onOpen={onConfirmationModalOpen}
              onClose={onConfirmationModalClose}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
