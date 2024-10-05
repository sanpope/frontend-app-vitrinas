import { Box, HStack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import colors from "../theme/colors";
import TrashIcon from "../assets/images/TrashIcon";
import DoubleCheckIcon from "../assets/images/DoubleCheckIcon";

export default function Message({
  name = "Brian Cox",
  subject = "Lorem ipsum",
  message = "Lorem ipsum dolor sit amet consectetur. Urna eu mattis diam et amet id. Platea habitant tempus tortor id. Eu feugiat amet malesuada nisl ornare quisque pretium pharetra. Enim turpis posuere condimentum proin ut convallis. ",
  visto = "true",
  fechaHora = "01/04/2024 a las 22:18:53",
  onClick,
}) {
  return (
    <Box
      bg={colors.white}
      borderRadius={"10px"}
      w={"100%"}
      p={"20px"}
      display={"flex"}
      flexDir={"column"}
      gap={"15px"}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        pb={1}
        borderBottomWidth={1}
        borderBottomColor={"grey.placeholder"}
      >
        <HStack w={"100%"} display={"flex"} justifyContent={"space-between"}>
          <Text textStyle={"RobotoSubtitleBold"}>{name}</Text>
          <Box display={"flex"} gap={2}>
            {visto === "true" ? <DoubleCheckIcon /> : null}
            <TrashIcon
              width={"1.2rem"}
              height={"1.2rem"}
              fill={"#E60F0F"}
              onClick={onClick}
            />
          </Box>
        </HStack>
      </Box>

      <Box display={"flex"} gap={"5px"}>
        <Text textStyle={"RobotoRegularBold"}>Asunto:</Text>
        <Text textStyle={"RobotoRegular"}>{subject}</Text>
      </Box>

      <Text textStyle={"RobotoRegular"}> {message}</Text>
      <Box
        display={"flex"}
        w={"100%"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        gap={"5px"}
      >
        <Text textStyle={visto === "true" ? "RobotoTiny" : "RobotoTinyBold"}>
          {fechaHora}
        </Text>
      </Box>
    </Box>
  );
}
