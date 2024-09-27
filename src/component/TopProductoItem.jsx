import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default function TopProductoItem({ prodName, prodPercentage }) {
  return (
    <Box
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
        borderLeftWidth={"2px"}
        borderLeftColor={"mainBg"}
      >
        <Text
          w={"30px"}
          textStyle={"RobotoBodyBold"}
          textAlign={"rigth"}
          ml={1}
        >
          {prodPercentage}%
        </Text>
      </Box>
    </Box>
  );
}
