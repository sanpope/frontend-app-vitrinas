import { Box, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import React from "react";

export default function NoteDispositivo({ width = "100%", text2 }) {
  return (
    <Box
      display="flex"
      flexDirection={"column"}
      w={width}
      borderWidth={1}
      borderColor={"#FFE58F"}
      bg={"#FFFBE6"}
      p="10px"
    >
      <Text>{text2}</Text>
    </Box>
  );
}
