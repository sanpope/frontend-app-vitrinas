import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default function VisitaContainer({ id, title, maxW, height, children }) {
  return (
    <Box
      position={"relative"}
      flexGrow={1}
      flexShrink={1}
      flexBasis={{ base: "100%", md: maxW }}
      maxHeight={height || "600px"}
      display={"flex"}
      flexDir={"column"}
      borderRadius="20px"
      overflow="hidden"
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
        flex="1"
        bg={"white"}
        p={3}
        className="container"
        borderBottomRadius={"20px"}
      >
        <Box
          className="scroll-wrapper"
          id={id}
          height="100%"
          overflowY="auto"
          css={{
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#CDCDCD",
              borderRadius: "24px",
            },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
