import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default function TopCategoriaItem({ icon, catName, catPercentage }) {
  return (
    <Box
      display={"flex"}
      flexDirection={{ base: "column", sm: "row" }}
      justifyContent={"space-between"}
      alignItems={"center"}
      py={2}
    >
      <Box display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
        {icon}
        <Text textStyle={"RobotoBody"} marginLeft={2}>
          {catName}
        </Text>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"flex-end"}
        borderLeftWidth={"2px"}
        borderLeftColor={"mainBg"}
      >
        <Text
          w={"50px"}
          textStyle={"RobotoBodyBold"}
          textAlign={"rigth"}
          ml={1}
        >
          {catPercentage}%
        </Text>
      </Box>
    </Box>
  );
}
