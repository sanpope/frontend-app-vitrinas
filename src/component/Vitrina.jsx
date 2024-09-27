import { Box, Text } from "@chakra-ui/react";
import React from "react";
import colors from "../theme/colors";

export default function Vitrina({ city, names, onClick }) {
  return (
    <Box
      bg={colors.white}
      borderRadius={"20px"}
      w={"250px"}
      display={"flex"}
      flexDir={"column"}
      gap={"15px"}
      boxShadow="1px 0px 11px -5px rgba(66, 68, 90, 1)"
      cursor={"pointer"}
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
      <Box p={2}>
        <Box
          w={"100%"}
          display={"flex"}
          flexDir={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          p={4}
          h={"130px"}
          overflowY={"scroll"}
          className="scroll-wrapper"
          mb={1}
        >
          {names.map((name, index) => {
            return (
              <Text
                key={index}
                textStyle={"RobotoRegular"}
                _hover={{ color: "red" }}
                transition="color 0.5s ease"
                onClick={() => onClick(city, name)}
                py={1}
              >
                {name}
              </Text>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
