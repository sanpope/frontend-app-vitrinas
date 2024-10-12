import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";

import TextInput from "../component/ui/textInput";
import StandardButton from "../component/ui/buttons/standard";

export default function Agregar({
  desc,
  desc2,
  isOpen,
  onOpen,
  onClose,
  currentItem,
  Editar,
  isLoading,
}) {
  const [name, setName] = useState("");
  const [city, setCity] = useState();

  useEffect(() => {
    setName(currentItem);
  }, [currentItem]);

  const saveName = (val) => {
    setName(val);
  };
  const saveCity = (val) => {
    setCity(val);
  };
  const handleOnClick = () => {
    setName(currentItem);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleOnClick}>
      <ModalOverlay bg={"rgba(0, 0, 0, 0.2)"} />
      <ModalContent borderRadius={"20px"}>
        <ModalHeader
          bg={"black"}
          display={"flex"}
          flexDir={"column"}
          borderTopRadius="20px"
        >
          <Text textStyle={"RobotoSubtitle"} color={"white"}>
            Editar {desc}
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
            <Box w={"100%"}>
              <Box display={"flex"} alignItems={"center"} w={"100%"}>
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
              </Box>

              <TextInput
                w={"100%"}
                type="text"
                required
                onChange={(val) => saveName(val)}
                value={name}
              />

              {/* <Box display="flex" alignItems="center" w={"100%"}>
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
              </Box>
              <Select
                required
                value={city}
                placeholder={city}
                onChange={(val) => saveCity(val.target.value)}
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
                {[
                  "Bogotá",
                  "Medellín",
                  "Cali",
                  "Barranquilla",
                  "Bucaramanga",
                  "Manizales",
                  "Pereira",
                  "Cúcuta",
                  "Pasto",
                  "Ibagué",
                  "Montería",
                  "Cartagena",
                  "Villavicencio",
                ]
                  .filter((option) => option !== city)
                  .map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </Select> */}
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
            onClick={handleOnClick}
          >
            Cancelar
          </StandardButton>
          <StandardButton
            variant={name?.length > 0 ? "RED_PRIMARY" : "DISABLED"}
            disabled={name?.length > 0 ? false : true}
            cursor={name?.length > 0 ? "pointer" : "not-allowed"}
            borderRadius="20px"
            py={"17px"}
            w={"50%"}
            fontSize="14px"
            fontWeight="400"
            type={"button"}
            onClick={
              name?.length > 0
                ? () => {
                    Editar(currentItem, name, handleOnClick);
                  }
                : null
            }
            isLoading={isLoading}
          >
            Guardar Cambios
          </StandardButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
