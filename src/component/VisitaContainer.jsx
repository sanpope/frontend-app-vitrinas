import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default function VisitaContainer({
  title = "Porfavor agregue un título",
  maxW,
}) {
  return (
    <Box
      flexGrow={1}
      flexShrink={1}
      flexBasis={{ base: "100%", md: maxW }}
      h={"600px"}
      display={"flex"}
      flexDir={"column"}
      borderRadius="20px"
    >
      <Box
        bg={"black"}
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
        h={"100%"}
        bg={"white"}
        borderBottomRadius={"20px"}
        overflowY="auto"
        overflowX="hidden"
      ></Box>
    </Box>
  );
}
