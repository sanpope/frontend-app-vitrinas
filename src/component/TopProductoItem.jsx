import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default function TopProductoItem({ prodName, prodPercentage }) {
  return (
    <Box
      w={"100%"}
      display={"flex"}
      flexDirection={{ base: "column", sm: "row" }}
      justifyContent={"space-between"}
      alignItems={"center"}
      py={2}
    >
      <Box display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
        <Text textStyle={"RobotoBody"}>{prodName}</Text>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"flex-end"}
        alignSelf={"flex-end"}
        borderLeftWidth={"2px"}
        borderLeftColor={"mainBg"}
      >
        <Text minW={"40px"} textStyle={"RobotoBodyBold"} textAlign={"end"}>
          {prodPercentage}%
        </Text>
      </Box>
    </Box>
  );
}
