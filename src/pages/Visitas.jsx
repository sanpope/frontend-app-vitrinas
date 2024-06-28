import React from "react";
import ConfirmationMessage from "../component/ConfirmationMessage";
import VisitaContainer from "../component/VisitaContainer";
import { Box, useDisclosure } from "@chakra-ui/react";
import VerExistencias from "../component/VerExistencias";
import StandardButton from "../component/ui/buttons/standard";
import ProductosEnDespacho from "../component/ProductosEnDespacho";

import WarningIcon from "../assets/images/WarningIcon";

export default function Visitas() {
  const {
    isOpen: isFirstModalOpen,
    onOpen: onFirstModalOpen,
    onClose: onFirstModalClose,
  } = useDisclosure();

  const {
    isOpen: isConfirmationModalOpen,
    onOpen: onConfirmationModalOpen,
    onClose: onConfirmationModalClose,
  } = useDisclosure();

  return (
    <Box w={"100%"} h={"100%"} p={"20px"}>
      <Box></Box>
      <Box w={"100%"} h={"70%"} display={"flex"} flexWrap={"wrap"} gap={"20px"}>
        <VisitaContainer title={"Visitas realizadas a esta vitrina"} />
        <VisitaContainer title={"Movimientos de inventario"} />
        <VisitaContainer title={"Correcciones de inventario"} />
      </Box>
      <Box
        display={"flex"}
        gap={"10px"}
        justifyContent={"flex-end"}
        alignItems={"center"}
      >
        <StandardButton
          variant={"WHITE_RED"}
          borderRadius="20px"
          py={"17px"}
          w={"fit-content"}
          fontSize={"14px"}
          fontWeight="400"
          onClick={onFirstModalOpen}
        >
          Ver productos en despacho
        </StandardButton>
        <ProductosEnDespacho
          isOpen={isFirstModalOpen}
          onOpen={onFirstModalOpen}
          onClose={onFirstModalClose}
        />
        <StandardButton
          variant={"RED_PRIMARY"}
          borderRadius="20px"
          py={"17px"}
          px={"20px"}
          w={"fit-content"}
          fontSize={"12px"}
          fontWeight="400"
          onClick={onConfirmationModalOpen}
        >
          Revertir movimientos y correcciones
        </StandardButton>
        <ConfirmationMessage
          icon={<WarningIcon />}
          text={`¿Estás seguro que deseas revertir los cambios y acciones realizadas en la vista seleccionada?`}
          isOpen={isConfirmationModalOpen}
          onOpen={onConfirmationModalOpen}
          onClose={onConfirmationModalClose}
        />
      </Box>
    </Box>
  );
}
