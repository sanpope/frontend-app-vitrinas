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
import React from "react";
import InfoIcon from "../assets/images/InfoIcon";
import StandardButton from "./ui/buttons/standard";

export default function ConfirmationMessage({
  icon = <InfoIcon />,
  text = "Se procederá con la selección anterior",
  isOpen,
  onOpen,
  onClose,
  funcConfirmar
}) {
  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          borderRadius={"10px"}
          height={"auto"}
          bg={"white"}
          p={"20px"}
        >
          <ModalBody display={"flex"} flexDirection={"column"} pb={"20px"}>
            <Box
              display={"flex"}
              justifyContent={"flex-start"}
              alignItems={"center"}
              gap={"10px"}
            >
              {icon}
              <Text textStyle={"RobotoBodyBold"}>{text}</Text>
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
              onClick={() => funcConfirmar}
            >
              Guardar
            </StandardButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
