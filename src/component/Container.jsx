import React from "react";
import { Box, Text } from "@chakra-ui/react";

export default function Container({
  maxW = "350px",
  minH = "200px",
  bg = "white",
  icon,
  title,
  children,
}) {
  return (
    <Box
      flex={`1 1 ${maxW}`}
      minH={minH}
      bg={bg}
      display="flex"
      flexDirection={"column"}
      borderRadius={"30px"}
      p={"20px"}
    >
      <Box
        w="100%"
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        columnGap="6px"
      >
        {icon}
        {title ? (
          <Text textStyle={"RobotoSubtitle"} color={"black"}>
            {title}
          </Text>
        ) : null}
      </Box>
      {children}
    </Box>
  );
}
