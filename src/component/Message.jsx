import { Box, Text } from "@chakra-ui/react";
import React from "react";
import colors from "../theme/colors";

export default function Message({
  name = "Brian Cox",
  subject = "Lorem ipsum",
  message = "Lorem ipsum dolor sit amet consectetur. Urna eu mattis diam et amet id. Platea habitant tempus tortor id. Eu feugiat amet malesuada nisl ornare quisque pretium pharetra. Enim turpis posuere condimentum proin ut convallis. ",
}) {
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
      <Text textStyle={"RobotoSubtitleBold"}>{name}</Text>
      <hr></hr>
      <Text textStyle={"RobotoSubtitle"}>Asunto: {subject}</Text>

      <Text textStyle={"RobotoRegular"}> {message}</Text>
    </Box>
  );
}
