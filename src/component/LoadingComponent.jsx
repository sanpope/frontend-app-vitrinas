import React from "react";
import { Box, Text, Spinner } from "@chakra-ui/react";

export default function LoadingComponent({
  size = "lg",
  text,
  fontSize = "RobotoSubtitleBold",
}) {
  return (
    <Box
      width={"100%"}
      height={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={10}
    >
      <Spinner size={size} color="gray.400" thickness="3px" />
      <Text textAlign="center" fontSize={fontSize} color={"mainBg"}>
        {text}
      </Text>
    </Box>
  );
}
