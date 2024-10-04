import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default function TopCategoriaItem({
  icon,
  catName,
  catPercentage,
  justifyContent,
  flexDirA,
  flexDirB,
}) {
  return (
    <Box
      display={"flex"}
      flexDirection={{ base: flexDirA, sm: flexDirB }}
      justifyContent={justifyContent}
      alignItems={"center"}
      flex={"1 1 auto"}
      maxH={"40px"}
    >
      <Box
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        h={"100%"}
      >
        {icon}
        <Text textStyle={"RobotoBody"} px={2} w={"95px"}>
          {catName}
        </Text>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        h={"80%"}
      >
        <Text
          textStyle={"RobotoBodyBold"}
          textAlign={"left"}
          pl={2}
          minW={"40px"}
          borderLeftWidth={"2px"}
          borderLeftColor={"grey.placeholder"}
        >
          {catPercentage}%
        </Text>
      </Box>
    </Box>
  );
}
