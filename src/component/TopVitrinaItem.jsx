import { Box, Text } from "@chakra-ui/react";
import React from "react";
const COLORS = ["#000000", "#555555", "#BBBBBB"];

export default function TopVitrinaItem({ index, vitrinaName, vitrinaAmount }) {
  return (
    <Box
      display={"flex"}
      flexDirection={{ base: "column", sm: "row" }}
      justifyContent={{ base: "flex-start", md: "space-between" }}
      alignItems={{ base: "flex-start", md: "center" }}
      pt={"0.500rem"}
    >
      <Box display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
        <Box
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          <Box
            bg={COLORS[index]}
            w={3}
            h={3}
            borderRadius="full"
            mr={"10px"}
            display={{ base: "none", md: "inline-flex" }}
          ></Box>
          <Text textStyle={"RobotoRegular"}>{vitrinaName}</Text>
        </Box>
      </Box>
      <Box
        display={{ base: "none", md: "flex" }}
        justifyContent={"flex-end"}
        borderLeftWidth={"2px"}
        borderLeftColor={"mainBg"}
      >
        <Text
          minW={"100px"}
          w={"100%"}
          maxW={"150px"}
          textStyle={"RobotoRegularBold"}
          textAlign={"left"}
          ml={2}
        >
          ${vitrinaAmount}
        </Text>
      </Box>
    </Box>
  );
}
