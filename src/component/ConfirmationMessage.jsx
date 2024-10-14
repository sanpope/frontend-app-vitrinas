import {
  Box,
  Button,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import InfoIcon from "../assets/images/InfoIcon";
import StandardButton from "./ui/buttons/standard";
import { capitalizeFirstLetter } from "../utils/formatting";

export default function ConfirmationMessage({
  icon = <InfoIcon />,
  text,
  text2,
  colorText2,
  isOpen,
  onOpen,
  onClose,
  buttonText = "Confirmar",
  funcConfirmar,
  focusRow,
  isLoading,
}) {
  const handleClick = async () => {
    console.log(focusRow);
    await funcConfirmar(focusRow);
    onClose();
  };
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
              pb={3}
            >
              {icon}
              <Text textStyle={"RobotoBodyBold"} textAlign={"justify"} mb={3}>
                {text}
              </Text>
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
