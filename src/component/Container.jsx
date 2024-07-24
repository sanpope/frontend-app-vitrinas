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
  className,
  ...props
}) {
  return (
    <Box
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
            textStyle={"RobotoSubtitleBold"}
            color={color}
            whiteSpace={withLineBreaks ? "pre-line" : "normal"}
            lineHeight={lineHeight}
          >
            {title}
          </Text>
        ) : null}
      </Box>
      <Box display="flex" flexGrow={1} width="100%" p={2}>
        {children}
      </Box>
    </Box>
  );
}
