import { Box, HStack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import colors from "../theme/colors";
import TrashIcon from "../assets/images/TrashIcon";
import DoubleCheckIcon from "../assets/images/DoubleCheckIcon";
import { formatFecha } from "../utils/formatting";

export default function Message({ mensaje, onClick }) {
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
          <Text textStyle={"RobotoSubtitleBold"}>{mensaje?.remitente}</Text>
          <Box display={"flex"} gap={2}>
            {mensaje?.visto === "true" ? <DoubleCheckIcon /> : null}
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
        <Text textStyle={"RobotoRegular"}>{mensaje?.asunto}</Text>
      </Box>

      <Text textStyle={"RobotoRegular"}> {mensaje?.contenido}</Text>
      <Box
        display={"flex"}
        w={"100%"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        gap={"5px"}
      >
        <Text
          textStyle={
            mensaje?.visto === "true" ? "RobotoTiny" : "RobotoTinyBold"
          }
        >
          {mensaje?.fechaHora !== null && mensaje?.fechaHora !== ""
            ? formatFecha(mensaje?.fechaHora)
            : ""}
        </Text>
      </Box>
    </Box>
  );
}
