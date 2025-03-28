import { Box, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import React from "react";

export default function Note({ width = "100%", maxH, text1, text2, arr }) {
  return (
    <Box
      maxH={maxH}
      width={"100%"}
      flex={1}
      display="flex"
      flexDirection={"column"}
      w={width}
      borderWidth={1}
      borderColor={"#FFE58F"}
      bg={"#FFFBE6"}
      p="5px"
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
        <Box flex={1} display={"flex"}>
          <Text alignSelf={"center"}>{text2}</Text>
        </Box>
      )}
    </Box>
  );
}
