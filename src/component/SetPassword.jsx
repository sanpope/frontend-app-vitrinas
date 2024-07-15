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
import LockRedIcon from "../assets/images/LockRedIcon";
import EyeSlashIcon from "../assets/images/EyeSlashIcon";
import StandardButton from "./ui/buttons/standard";
import TextInput from "./ui/textInput";

export default function setPassword({ isOpen, onOpen, onClose }) {
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
              <LockRedIcon />
              <Box ml={2}>
                <Text textStyle={"RobotoSubtitleBold"}>
                  Restablecer contraseña
                </Text>
                <Text
                  textStyle={"RobotoRegular"}
                  color={"grey.placeholder"}
                  pt={"3px"}
                >
                  Continúe si desea cambiar su contraseña
                </Text>
              </Box>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={"20px"}
              py={"1rem"}
            >
              <TextInput
                label="Introduzca su vieja contraseña"
                value={"password"}
                onChange={"(e) => onChangePassword(e)"}
                error={""}
                placeholder={"************"}
                isPassword
                color={"grey.placeholder"}
                rightIcon={<EyeSlashIcon />}
              />
              <TextInput
                label="Introduzca su nueva contraseña"
                value={"password"}
                onChange={"(e) => onChangePassword(e)"}
                error={""}
                placeholder={"************"}
                isPassword
                color={"grey.placeholder"}
                rightIcon={<EyeSlashIcon />}
              />
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
              onClick={""}
            >
              Cambiar
            </StandardButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
