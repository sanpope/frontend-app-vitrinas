import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default function VisitaContainer({ id, title, maxW, children }) {
  return (
    <Box
      position={"relative"}
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
        p={3}
        className="container"
        borderBottomRadius={"20px"}
      >
        <Box className="scroll-wrapper" id={id}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
