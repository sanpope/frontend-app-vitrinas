import { Box, Text } from "@chakra-ui/react";
import React from "react";
import TrashIcon from "../assets/images/TrashIcon";
import EditIcon from "../assets/images/EditIcon";
import ConfirmationMessage from "./ConfirmationMessage";
import EditarAsesor from "./EditarAsesor";
import WarningIcon from "../assets/images/WarningIcon";

const newDate = new Date();

export default function AsesorContainer({
  asesor = "Juan Pérez",
  email = "@juanperez",
  password = "Alej4525urru",
  isFirstModalOpen,
  onFirstModalOpen,
  onFirstModalClose,
  isSecondModalOpen,
  onSecondModalOpen,
  onSecondModalClose,
  Editar,
  Eliminar,
}) {
  return (
    <Box
      w={"100%"}
      maxW={"280px"}
      bg={"white"}
      display="flex"
      flexDirection={"column"}
      alignItems={"space-between"}
      justifyContent="center"
      borderRadius={"30px"}
      boxShadow="1px 0px 11px -5px rgba(66, 68, 90, 1)"
      p={1}
    >
      <Box
        borderBottom="1px"
        borderBottomColor={"mainBg"}
        h={"25%"}
        px={"25px"}
        py={"15px"}
      >
        <Text textStyle={"RobotoBodyBold"}>{asesor}</Text>
      </Box>
      <Box
        h={"60%"}
        display={"flex"}
        flexDir={"column"}
        alignContent={"flex-start"}
        justifyContent={"center"}
        px={"25px"}
        py={"15px"}
        gap={"10px"}
      >
        <Text textStyle={"RobotoBody"}>
          Usuario:
          <span
            textStyle={"RobotoBody"}
            style={{ color: "#AEAEB2", paddingLeft: "5px" }}
          >
            {email}
          </span>
        </Text>
        <Text textStyle={"RobotoBody"}>
          Contraseña:
          <span
            textStyle={"RobotoBody"}
            style={{ color: "#AEAEB2", paddingLeft: "5px" }}
          >
            {password}
          </span>
        </Text>
      </Box>
      <Box
        w={"100%"}
        h={"20%"}
        borderTop="1px"
        borderTopColor={"mainBg"}
        p={1}
        display={"flex"}
      >
        <Box
          w={"50%"}
          borderRight={"1px"}
          borderRightColor={"mainBg"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <TrashIcon
            height={"20px"}
            width={"20px"}
            onClick={onFirstModalOpen}
          />
          <ConfirmationMessage
            isOpen={isFirstModalOpen}
            onOpen={onFirstModalOpen}
            onClose={onFirstModalClose}
            icon={<WarningIcon />}
            text={"¿Estás seguro que desea eliminar a este asesor?"}
            text2={
              "Esta acción eliminará permanentemente los registros de este asesor de tu sistema"
            }
            colorText2={"red.100"}
            buttonText={"Continuar"}
          />
        </Box>
        <Box
          w={"50%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <EditIcon
            height={"20px"}
            width={"20px"}
            onClick={onSecondModalOpen}
          />
          <EditarAsesor
            isOpen={isSecondModalOpen}
            onOpen={onSecondModalOpen}
            onClose={onSecondModalClose}
          />
        </Box>
      </Box>
    </Box>
  );
}
