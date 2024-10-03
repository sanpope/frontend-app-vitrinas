import { Box, ListItem, Text, UnorderedList, HStack } from "@chakra-ui/react";
import React from "react";

export default function NoteInventario({ width = "100%", text1, text2, arr }) {
  return (
    <HStack
      spacing="10px"
      height="70px"
      w={width}
      borderWidth={1}
      borderColor={"#FFE58F"}
      bg={"#FFFBE6"}
      p="10px"
      display={"flex"}
      flexWrap={"wrap"}
    >
      {arr != null && <Text>{text1}</Text>}
      {arr != null ? (
        arr?.map((modif, index) => {
          return (
            <Text>
              {modif?.fecha} ({modif.cantidadDeCambios})
            </Text>
          );
        })
      ) : (
        <Text>{text2}.</Text>
      )}
    </HStack>
  );
}
