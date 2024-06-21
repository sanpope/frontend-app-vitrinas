import { Box, Text } from "@chakra-ui/react";
import React from "react";
import colors from "../theme/colors";

export default function Vitrina({ city, name }) {
  return (
    <Box
      bg={colors.white}
      borderRadius={"20px"}
      w={"250px"}
      display={"flex"}
      flexDir={"column"}
      gap={"15px"}
      boxShadow="1px 0px 11px -5px rgba(66, 68, 90, 1)"
      _hover={{ ".topSection": { bg: "black", color: "white" } }}
      cursor={"default"}
    >
      <Box
        className="topSection"
        bg="white"
        color={colors.black}
        p={"15px"}
        borderTopRadius="20px"
        borderBottom="1px"
        borderBottomColor={"mainBg"}
        transition="background-color 3s ease, color 3s ease"
      >
        <Text textStyle={"RobotoSubtitle"}>{city}</Text>
      </Box>
      <Box
        display={"flex"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"20px"}
        p={"10px"}
      >
        <Text
          textStyle={"RobotoRegular"}
          _hover={{ color: "red" }}
          transition="color 0.5s ease"
        >
          {name}
        </Text>
        <Text
          textStyle={"RobotoRegular"}
          _hover={{ color: "red" }}
          transition="color 0.5s ease"
        >
          {name}
        </Text>
        <Text
          textStyle={"RobotoRegular"}
          _hover={{ color: "red" }}
          transition="color 0.5s ease"
        >
          {name}
        </Text>
      </Box>
    </Box>
  );
}
