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
      px={"40px"}
      py={"20px"}
      overflowY={"scroll"}
    >
      <Box display={"flex"} flexDir={"column"} gap={"10px"}>
        <Text textStyle={" RobotoBody"}>{city}</Text>
        <Text textStyle={"RobotoTitleBold"}>Resumen</Text>
      </Box>
      <Box display={"flex"} flexWrap={"wrap"} gap={"20px"}>
        <Container maxW={"290px"} />
        <Container maxW={"290px"} />
        <Container maxW={"290px"} />
        <Container maxW={"290px"} />
        <Container maxW={"290px"} />
        <Container maxW={"600px"} />
        <Container maxW={"290px"} />
        <Container maxW={"290px"} />
        <Container maxW={"290px"} />
        <Container maxW={"290px"} />
        <Container maxW={"290px"} />
      </Box>
    </Box>
  );
}
