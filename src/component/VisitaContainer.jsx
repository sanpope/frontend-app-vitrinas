import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default function VisitaContainer({
  title = "Porfavor agregue un título",
}) {
  return (
    <Box
      w={"100%"}
      h={"80%"}
      maxH={"1200px"}
      maxW={"420px"}
      display={"flex"}
      flexDir={"column"}
      borderRadius="20px"
    >
      <Box
        bg={"black"}
        w={"100%"}
        height={"60px"}
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        borderTopRadius="20px"
        p={"20px"}
      >
        <Text textStyle={"RobotoSubtitle"} color={"white"}>
          {title}
        </Text>
      </Box>
      <Box
        w={"100%"}
        h={"100%"}
        bg={"white"}
        borderBottomRadius={"20px"}
        overflowY="scroll"
        overflowX="hidden"
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
      ></Box>
    </Box>
  );
}
