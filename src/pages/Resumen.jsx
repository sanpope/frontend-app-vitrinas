import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "../component/Container";

export default function Resumen() {
  const city = useSelector((state) => state.vitrinaReducer.city);

  return (
    <Box
      bg={"mainBg"}
      w={"100%"}
      height={"100%"}
      display={"flex"}
      flexDir={"column"}
      gap={"10px"}
      px={"1.5rem"}
      py={"1rem"}
      overflowY={"scroll"}
    >
      <Box display={"flex"} flexDir={"column"} gap={"10px"}>
        <Text textStyle={" RobotoBody"}>{city}</Text>
        <Text textStyle={"RobotoTitleBold"}>Resumen</Text>
      </Box>
      <Box display={"flex"} flexWrap={"wrap"} gap={"20px"}>
        <Container maxW={"250px"} />
        <Container maxW={"250px"} />
        <Container maxW={"250px"} />
        <Container maxW={"250px"} />
        <Container maxW={"250px"} />
        <Container maxW={"525px"} />
        <Container maxW={"250px"} />
        <Container maxW={"250px"} />
        <Container maxW={"250px"} />
        <Container maxW={"250px"} />
        <Container maxW={"250px"} />
      </Box>
    </Box>
  );
}
