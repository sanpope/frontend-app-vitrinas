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
    <Box
      display={"flex"}
      flexDirection={"column"}
      w={"100%"}
      h={"100%"}
      p={"20px"}
      overflowY={"scroll"}
    >
      <Box
        order={{ base: "2", xl: "1" }}
        h={"90%"}
        display="flex"
        flexWrap="wrap"
        gap={"1.25rem"}
      >
        <VisitaContainer
          title="Visitas realizadas a esta vitrina"
          maxW="320px"
        />
        <VisitaContainer title="Movimientos de inventario" maxW="320px" />
        <VisitaContainer title="Correcciones de inventario" maxW="320px" />
      </Box>
      <Box
        display={"flex"}
        gap={{ base: "5px", md: "10px" }}
        flexDirection={{ base: "column", sm: "row" }}
        justifyContent={{ base: "flex.start", sm: "flex-end" }}
        alignItems={"center"}
        margin={{ base: "0px", md: "20px" }}
        order={{ base: "1", xl: "2" }}
        py={"10px"}
      >
        <StandardButton
          variant={"WHITE_RED"}
          borderRadius="20px"
          py={"17px"}
          w={"fit-content"}
          fontSize={"12px"}
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
