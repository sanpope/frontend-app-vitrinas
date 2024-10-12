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
  Select,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

import TextInput from "../component/ui/textInput";
import StandardButton from "../component/ui/buttons/standard";

export default function Agregar({
  desc,
  desc2,
  isOpen,
  onOpen,
  onClose,
  Agregar,
  mensajeError,
  isLoading,
}) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  const saveName = (e) => {
    setName(e);
  };

  const saveCity = (e) => {
    setCity(e.target.value);
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
            Agregar {desc}
          </Text>
        </ModalHeader>
        <ModalBody
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          px={"20px"}
          pt={"10px"}
        >
          <Box
            w={"100%"}
            display={"flex"}
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <FormControl pt={"10px"}>
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
                {desc2}
              </FormLabel>
              <TextInput
                type="text"
                placeholder="Alejandro SantaMaria"
                required
                onChange={(e) => saveName(e)}
                value={name}
              />
              {/* <FormLabel display="flex" alignItems="center" mt={3}>
                <span
                  style={{
                    color: "red",
                    marginRight: "0.25rem",
                    marginTop: "0.25rem",
                  }}
                >
                  *
                </span>
                Ciudad
              </FormLabel>
              <Select
                required
                onChange={(e) => saveCity(e)}
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
                <option>Barranquilla</option>
                <option>Bogotá</option>
                <option>Bucaramanga</option>
                <option>Cali</option>
                <option>Cartagena</option>
                <option>Cúcuta</option>
                <option>Ibagué</option>
                <option>Manizales</option>
                <option>Medellín</option>
                <option>Montería</option>
                <option>Pasto</option>
                <option>Pereira</option>
                <option>Villavicencio</option>
              </Select> */}
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
            type={"submit"}
            onClick={name !== "" ? handleGuardar : null}
            disabled={name !== "" ? false : true}
            cursor={name !== "" ? "pointer" : "not-allowed"}
          >
            Guardar
          </StandardButton>
        </ModalFooter>
        <Text p={2} color={"red.100"}>
          {mensajeError}
        </Text>
      </ModalContent>
    </Modal>
  );
}
