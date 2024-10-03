import React from "react";
import { Box, Text } from "@chakra-ui/react";

export default function Container({
  bg = "white",
  color = "black",
  icon,
  title,
  withLineBreaks = false,
  lineHeight = "normal",
  width,
  children,
  heightChildren,
  className,
  ...props
}) {
  return (
    <Box
      position={"relative"}
      bg={bg}
      borderRadius={"20px"}
      p={3}
      display="flex"
      flexDir={"column"}
      width={width}
      className={className}
      {...props}
    >
      <Box display="flex" alignItems={"flex-start"} columnGap="6px">
        {icon}
        {title ? (
          <Text
            textStyle={{ base: "RobotoBodyBold", md: "RobotoSubtitleBold" }}
            color={color}
            whiteSpace={withLineBreaks ? "pre-line" : "normal"}
            lineHeight={lineHeight}
          >
            {title}
          </Text>
        ) : null}
      </Box>
      <Box display="flex" flexGrow={1} height={heightChildren} w={"100%"} p={1}>
        {children}
      </Box>
    </Box>
  );
}
