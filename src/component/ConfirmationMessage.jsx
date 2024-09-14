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
  text2,
  colorText2,
  isOpen,
  onOpen,
  onClose,
  funcConfirmar,
  buttonText = "Confirmar",
  focusRow,
  isLoading,
}) {

  async function handleClick() {
    await funcConfirmar(focusRow);
    onClose();
  }

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg={"rgba(0, 0, 0, 0.2)"} />
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
              alignItems={"flex-start"}
              gap={"10px"}
            >
              {icon}
              <Text textStyle={"RobotoBodyBold"}>{text}</Text>
            </Box>
            <Box>
              <Text
                textStyle={"RobotoBody"}
                color={colorText2}
                textAlign={"center"}
              >
                {text2}
              </Text>
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
              disabled={isLoading}
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
              onClick={handleClick}
              isLoading={isLoading}
            >
              {buttonText}
            </StandardButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
