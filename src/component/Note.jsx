import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default function Name({
  width = "100%",
  pl = "10px",
  text1,
  text2,
}) {
  return (
    <Box
      display={{ base: "flex" }}
      flexDirection={"column"}
      justifyContent={"space-around"}
      w={width}
      borderWidth={1}
      borderColor={"#FFE58F"}
      bg={"#FFFBE6"}
      pl={pl}
      py="0.25rem"
    >
      <Text>{text1}</Text>
      <Text>{text2}</Text>
    </Box>
  );
}
