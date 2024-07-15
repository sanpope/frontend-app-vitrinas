import { Box, Text } from "@chakra-ui/react";
import React from "react";

const newDate = new Date();

export default function DispositivoContainer({
  minH = "200px",
  maxW = "340px",
  icon,
  title = "Título",
  emoji,
  description = "Agregar descripción",
  date = newDate.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }),
  text2,
  description2,
}) {
  return (
    <Box
      flex={`0 1 ${maxW}`}
      minH={minH}
      bg={"white"}
      display="flex"
      flexDirection={"column"}
      alignItems={"flex-start"}
      justifyContent="center"
      borderRadius={"30px"}
      p={"20px"}
      gap={"15px"}
    >
      {icon}
      <Text textStyle={"RobotoBodyBold"} color={"black"}>
        {title}
      </Text>
      <Box
        w={"100%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        columnGap={"6px"}
      >
        {emoji}
        <Text textStyle={"RobotoBodyBold"} color={"grey"}>
          {description}
        </Text>
      </Box>
      <Text textStyle={"RobotoBodyBold"}>
        {text2}{" "}
        <span style={{ fontSize: "16px", color: "grey" }}>{description2}</span>
      </Text>
      <Text textStyle={"RobotoRegularBold"}>ÚLtima conexión el {date}</Text>
    </Box>
  );
}
