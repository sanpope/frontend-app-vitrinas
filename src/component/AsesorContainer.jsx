import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import TrashIcon from "../assets/images/TrashIcon";
import EditIcon from "../assets/images/EditIcon";

export default function AsesorContainer({
  asesor,
  email,
  password,
  Editar,
  openModal,
  setDeleteAsesor,
}) {

  const handleEditButton = (asesorName)=>{

  }

  const handleDeleteButton = (asesorName) => {
    openModal();
    setDeleteAsesor(asesorName);
  };

  return (
    <Box
      w={"100%"}
      maxW={"280px"}
      flexGrow={1}
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
            onClick={() => handleDeleteButton(asesor)}
          />
        </Box>
        <Box
          w={"50%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <EditIcon height={"20px"} width={"20px"} onClick={Editar} />
        </Box>
      </Box>
    </Box>
  );
}
