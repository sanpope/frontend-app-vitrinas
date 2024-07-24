import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default function TopProductoItem({ prodName, prodPercentage }) {
  return (
    <Box
      display={"flex"}
      flexDirection={{ base: "column", sm: "row" }}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Box display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
        <Text textStyle={"RobotoBody"}>{prodName}</Text>
      </Box>
      <Box
        display={"flex"}
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
          {prodPercentage}%
        </Text>
      </Box>
    </Box>
  );
}
