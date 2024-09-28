import { Box, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import React from "react";

export default function Note({
  width = "100%",
  text1,
  text2,
  arr,
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
      p="10px"
    >
      {arr != null && <Text>{text1}</Text>}
      {arr != null ? (
        <UnorderedList
          display={"flex"}
          styleType="none"
          w={"100%"}
          gap={3}
          overflowY="scroll"
          sx={{
            "::-webkit-scrollbar": {
              width: "8px",
              height: "4px",
            },
            "::-webkit-scrollbar-track": {
              background: "tranparent",
            },
            "::-webkit-scrollbar-thumb": {
              background: "gray.200",
              borderRadius: "10px",
            },
            "::-webkit-scrollbar-thumb:hover": {
              background: "gray.200",
            },
          }}
        >
          {arr?.map((modif, index) => {
            return (
              <ListItem key={index}>
                <Text>{modif?.fecha}</Text>
              </ListItem>
            );
          })}
        </UnorderedList>
      ) : (
        <Text>{text2}.</Text>
      )}
    </Box>
  );
}
