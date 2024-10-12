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
  useDisclosure,
} from "@chakra-ui/react";
import ListaItem from "../component/ListaItem";
import Editar from "../component/Editar";
import StandardButton from "../component/ui/buttons/standard";
import { capitalizeFirstLetter } from "../utils/formatting";
import ConfirmationMessage from "./ConfirmationMessage";
import WarningIcon from "../assets/images/WarningIcon";

export default function ListComponent({
  desc,
  desc2,
  isFirstModalOpen,
  onFirstModalOpen,
  onFirstModalClose,
  isSecondModalOpen,
  onSecondModalOpen,
  onSecondModalClose,
  lista,
  isLoading,
  funcionEditar,
  funcionEliminar
}) {
  const {
    isOpen: isEditarModalOpen,
    onOpen: onEditarModalOpen,
    onClose: onEditarModalClose,
  } = useDisclosure();

  const {
    isOpen: isEliminarModalOpen,
    onOpen: onEliminarModalOpen,
    onClose: onEliminarModalClose,
  } = useDisclosure();

  const [currentItem, setCurrentItem] = useState();

  return (
    <Modal isOpen={isFirstModalOpen} onClose={onFirstModalClose}>
      <ModalOverlay />
      <ModalContent borderRadius={"20px"} w={"100%"} maxW={"380px"}>
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

        {lista.length > 0 ? (
          <ModalBody
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            p={4}
          >
            <Box w={"100%"} display={"flex"} alignItems={"center"} px={1}>
              <Text
                textStyle={"RobotoBodyBold"}
                color={"black"}
                flex={1}
                textAlign={"left"}
              >
                Nombre
              </Text>
              <Text
                textStyle={"RobotoBodyBold"}
                color={"black"}
                flex={1}
                textAlign={"right"}
              >
                Acciones
              </Text>
            </Box>
            <Box
              className="scroll-wrapper"
              display={"flex"}
              flexDirection={"column"}
              overflowY={"auto"}
              h={"250px"}
              w={"100%"}
            >
              {lista.map((item, index) => (
                <ListaItem
                  key={index}
                  desc={capitalizeFirstLetter(item)}
                  elemento={desc2}
                  setCurrentItem={setCurrentItem}
                  onEditarModalOpen={onEditarModalOpen}
                  onEliminarModalOpen={onEliminarModalOpen}
                />
              ))}
            </Box>
          </ModalBody>
        ) : (
          <ModalBody>
            <Box
              minH={"250px"}
              height={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text color={"grey.placeholder"}>No se encontraron {desc}</Text>
            </Box>
          </ModalBody>
        )}

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
            variant={lista.length > 0 ? "RED_PRIMARY" : "DISABLED"}
            disabled={lista.length > 0 ? false : true}
            cursor={lista.length > 0 ? "pointer" : "not-allowed"}
            borderRadius="20px"
            py={"17px"}
            px={"40px"}
            w={"fit-content"}
            fontSize="14px"
            fontWeight="400"
            onClick={lista.length > 0 ? onSecondModalOpen : null}
          >
            Agregar {desc2}
          </StandardButton>
        </ModalFooter>
      </ModalContent>

      <Editar
        isOpen={isEditarModalOpen}
        onOpen={onEditarModalOpen}
        onClose={onEditarModalClose}
        onClick={onEditarModalClose}
        desc={desc}
        desc2={desc2}
        currentItem={currentItem}
        Editar={funcionEditar}
      />

      <ConfirmationMessage
        isOpen={isEliminarModalOpen}
        onOpen={onEliminarModalOpen}
        onClose={onEliminarModalClose}
        icon={<WarningIcon />}
        text={`¿Estás seguro que desea eliminar ${desc2}?`}
        text2={`Esta acción eliminará permanentemente los registros de ${desc2} de tu sistema`}
        colorText2={"red.100"}
        funcConfirmar={funcionEliminar}
        focusRow={currentItem}
        buttonText={"Continuar"}
      />
    </Modal>
  );
}
