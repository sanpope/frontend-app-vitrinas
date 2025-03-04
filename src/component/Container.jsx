import React from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import useNormalize from "../hooks/useNormalize";

export const CONTAINER_PADDING = 15;

export default function Container({
  bg = "white",
  color = "black",
  icon,
  title,
  withLineBreaks = false,
  lineHeight = "1.1",
  width,
  children,
  heightChildren,
  paddingChildren = 1,
  className,
  overflow = "hidden",
  ...props
}) {
  return (
    <Box
      position={"relative"}
      bg={bg}
      borderRadius={"20px"}
      p={CONTAINER_PADDING + "px"}
      display="flex"
      flexDir={"column"}
      width={width}
      className={className}
      {...props}
      minH={"150px"}
      boxSizing="border-box"
      overflow={overflow}
    >
      <Box display="flex" alignItems={"flex-start"} columnGap="6px" marginBottom={2}>
        <HStack display={"flex"} spacing={"5px"}>
          <Box minW={"25px"} alignSelf={"flex-start"}>
            {icon}
          </Box>
          {title ? (
            <Text
              textStyle={{ base: "RobotoBodyBold", md: "RobotoSubtitleBold" }}
              color={color}
              whiteSpace={withLineBreaks ? "pre-line" : "normal"}
              lineHeight={{ base: "1.5", lg: lineHeight }}
              noOfLines={2}
            >
              {title}
            </Text>
          ) : null}
        </HStack>
      </Box>
      <Box
        display="flex"
        flexGrow={1}
        height={heightChildren}
        w={"100%"}
        p={paddingChildren}
      >
        {children}
      </Box>
    </Box>
  );
}
