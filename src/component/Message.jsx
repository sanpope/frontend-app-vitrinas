import { Box, Text } from "@chakra-ui/react";
import React from "react";
import colors from "../theme/colors";

export default function Message({ name, subject, message }) {
  return (
    <Box
      bg={colors.white}
      borderRadius={"20px"}
      w={"100%"}
      p={"20px"}
      display={"flex"}
      flexDir={"column"}
      gap={"15px"}
    >
      <Text textStyle={"RobotoSubtitle"}>{name}</Text>
      <hr></hr>
      <Text textStyle={"RobotoSubtitle"}>Asunto: {subject}</Text>

      <Text textStyle={"RobotoRegular"}> {message}</Text>
    </Box>
  );
}
