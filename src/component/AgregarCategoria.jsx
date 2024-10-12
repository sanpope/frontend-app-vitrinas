import React, { useState } from "react";
import {
  Box,
  Text,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Modal,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

import TextInput from "../component/ui/textInput";
import StandardButton from "../component/ui/buttons/standard";

export default function AgregarCategoria({
  isOpen,
  onOpen,
  onClose,
  Agregar,
  isLoading,
}) {
  const [name, setName] = useState("");

  const saveName = (e) => {
    setName(e);
  };

  const handleOnClose = () => {
    setName("");
    onClose();
  };

  const handleGuardar = () => {
    Agregar(name);
    handleOnClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={handleOnClose}>
      <ModalOverlay />
      <ModalContent borderRadius={"20px"}>
        <ModalHeader
          bg={"black"}
          display={"flex"}
          flexDir={"column"}
          borderTopRadius="20px"
        >
          <Text textStyle={"RobotoSubtitle"} color={"white"}>
            Agregar Categoría
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
            <Box width={"100%"}>
              <FormLabel display="flex" alignItems="center">
                <span
                  style={{
                    color: "red",
                    marginRight: "0.25rem",
                    marginTop: "0.25rem",
                  }}
                >
                  *
                </span>
                Nombre de la Categoría
              </FormLabel>
              <TextInput
                type="text"
                placeholder="Tecnología"
                required
                onChange={(e) => saveName(e)}
                value={name}
              />
            </Box>
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
            onClick={handleOnClose}
          >
            Cancelar
          </StandardButton>
          <StandardButton
            variant={name !== "" ? "BLACK_PRIMARY" : "DISABLED"}
            borderRadius="20px"
            py={"17px"}
            w={"50%"}
            fontSize="14px"
            fontWeight="400"
            onClick={name !== "" ? handleGuardar : null}
            disabled={name !== "" ? false : true}
            cursor={name !== "" ? "pointer" : "not-allowed"}
          >
            Guardar
          </StandardButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
