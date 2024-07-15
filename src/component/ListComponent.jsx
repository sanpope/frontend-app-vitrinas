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
} from "@chakra-ui/react";
import ListaItem from "../component/ListaItem";

import StandardButton from "../component/ui/buttons/standard";

export default function Agregar({
  desc,
  desc2,
  isFirstModalOpen,
  onFirstModalOpen,
  onFirstModalClose,
  isSecondModalOpen,
  onSecondModalOpen,
  onSecondModalClose,
  lista = [],
  Children
}) {
  return (
    <Modal isOpen={isFirstModalOpen} onClose={onFirstModalClose}>
      <ModalOverlay />
      <ModalContent borderRadius={"20px"} w={"100%"} maxW={"340px"}>
        <ModalHeader
          bg={"black"}
          display={"flex"}
          flexDir={"column"}
          borderTopRadius="20px"
        >
          <Text textStyle={"RobotoSubtitle"} color={"white"}>
            Lista de {desc}
          </Text>
        </ModalHeader>
        <ModalBody
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          p={4}
        >
          <Box
            w={"100%"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text textStyle={"RobotoRegularBold"} color={"black"}>
              Nombre
            </Text>
            <Text textStyle={"RobotoRegularBold"} color={"black"}>
              Acciones
            </Text>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            overflowY={"scroll"}
            h={"250px"}
            w={"100%"}
          >
            {lista.map((item) => (
              <ListaItem desc={item.nombre} elemento={desc2} />
            ))}
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
            onClick={onFirstModalClose}
          >
            Cancelar
          </StandardButton>
          <StandardButton
            variant={"RED_PRIMARY"}
            borderRadius="20px"
            py={"17px"}
            px={"40px"}
            w={"fit-content"}
            fontSize="14px"
            fontWeight="400"
            onClick={onSecondModalOpen}
          >
            Agregar {desc2}
          </StandardButton>
          {Children}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
