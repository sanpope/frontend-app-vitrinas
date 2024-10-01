import { Box, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";

import EditIcon from "../assets/images/EditIcon";
import TrashIcon from "../assets/images/TrashIcon";
import WarningIcon from "../assets/images/WarningIcon";
import ConfirmationMessage from "./ConfirmationMessage";
import Editar from "../component/Editar";

export default function Product({ desc, elemento }) {
  const {
    isOpen: isFirstModalOpen,
    onOpen: onFirstModalOpen,
    onClose: onFirstModalClose,
  } = useDisclosure();

  const {
    isOpen: isSecondModalOpen,
    onOpen: onSecondModalOpen,
    onClose: onSecondModalClose,
  } = useDisclosure();
  return (
    <Box
      w={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      py={"10px"}
    >
      <Text textStyle={"RobotoRegular"} color={"black"}>{desc}</Text>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} gap={"10px"}>
        <EditIcon onClick={onFirstModalOpen} />
        <Editar
          isOpen={isFirstModalOpen}
          onOpen={onFirstModalOpen}
          onClose={onFirstModalClose}
          onClick={onFirstModalClose}
          desc={"información del Proveedor"}
          desc2={"Nombre del proveedor"}
        />
        <TrashIcon onClick={onSecondModalOpen} />
        <ConfirmationMessage
          isOpen={isSecondModalOpen}
          onOpen={onSecondModalOpen}
          onClose={onSecondModalClose}
          icon={<WarningIcon />}
          text={`¿Estás seguro que desea eliminar este ${elemento}?`}
          text2={
            "Esta acción eliminará permanentemente los registros de este asesor de tu sistema"
          }
          colorText2={"red.100"}
          buttonText={"Continuar"}
          products={null}
        />
      </Box>
    </Box>
  );
}
