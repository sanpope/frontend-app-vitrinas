import React from "react";
import Transferir from "../component/Transferir";
import { useSelector, useDispatch } from "react-redux";
import { Box, Text } from "@chakra-ui/react";
import Tabla from "../component/Tabla";
import VerExistencias from "../component/VerExistencias";
import StandardButton from "../component/ui/buttons/standard";

export default function Ventas() {
  const city = useSelector((state) => state.vitrinaReducer.city);
  return (
    <Box
      bg={"mainBg"}
      w={"100%"}
      height={"100%"}
      display={"flex"}
      flexDir={"column"}
      gap={"10px"}
      px={"40px"}
      py={"20px"}
      overflowY={"scroll"}
    >
      <Box display={"flex"} flexDir={"column"} gap={"10px"}>
        <Text textStyle={" RobotoBody"}>{city}</Text>
        <Text textStyle={"RobotoTitleBold"}>Ventas</Text>
      </Box>
      <Box>
        <Tabla />
      </Box>
      <VerExistencias />
     
    </Box>
  );
}
