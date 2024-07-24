import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default function TopVitrinaItem({ vitrinaName, vitrinaAmount }) {
  return (
    <Box
      display={"flex"}
      flexDirection={{ base: "column", sm: "row" }}
      justifyContent={{base: "flex-start", md: "space-between"}}
      alignItems={{base: "flex-start", md: "center"}}
      pt={"0.500rem"}
    >
      <Box display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
        <Text textStyle={"RobotoBody"} textAlign={"left"}>
          {vitrinaName}
        </Text>
      </Box>
      <Box
        display={{ base: "none", md: "flex" }}
        justifyContent={"flex-end"}
        borderLeftWidth={"2px"}
        borderLeftColor={"mainBg"}
      >
        <Text
          minW={"4.40rem"}
          textStyle={"RobotoBodyBold"}
          textAlign={"left"}
          ml={2}
        >
          {vitrinaAmount}
        </Text>
      </Box>
    </Box>
  );
}
