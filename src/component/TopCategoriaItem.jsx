import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default function TopCategoriaItem({
  icon,
  catName,
  catPercentage,
  justifyContent,
  flexDirA, 
  flexDirB
}) {
  return (
    <Box
      display={"flex"}
      flexDirection={{ base: flexDirA, sm: flexDirB }}
      justifyContent={justifyContent}
      alignItems={"center"}
      flex={"1 1 auto"}
    >
      <Box display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
        {icon}
        <Text textStyle={"RobotoBody"} px={2}>
          {catName}
        </Text>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"flex-end"}
        borderLeftWidth={"2px"}
        borderLeftColor={"mainBg"}
      >
        <Text textStyle={"RobotoBodyBold"} textAlign={"left"} ml={2}>
          {catPercentage}%
        </Text>
      </Box>
    </Box>
  );
}
