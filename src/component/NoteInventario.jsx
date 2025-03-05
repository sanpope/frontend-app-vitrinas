import { Box, ListItem, Text, UnorderedList, HStack } from "@chakra-ui/react";
import React from "react";

export default function NoteInventario({ width = "100%", text1, text2, arr }) {
  return (
    <HStack
      spacing="10px"
      height="60px"
      w={width}
      borderWidth={1}
      borderColor={"#FFE58F"}
      bg={"#FFFBE6"}
      p="5px"
      display={"flex"}
      flexWrap={"wrap"}
    >
      {arr != null && <Text>{text1}</Text>}
      {arr != null ? (
        arr?.map((modif, index) => {
          return (
            <Text key={index}>
              {modif?.fecha} ({modif.cantidadDeCambios})
              {index < arr.length - 2
                ? ", "
                : index === arr.length - 2
                  ? " \u00A0y "
                  : ""}
            </Text>
          );
        })
      ) : (
        <Text>{text2}.</Text>
      )}
    </HStack>
  );
}
