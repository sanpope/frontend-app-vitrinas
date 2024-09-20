import { Box, Text } from "@chakra-ui/react";
import React from "react";

const newDate = new Date();

export default function DispositivoContainer({
  minH = "200px",
  maxW = "340px",
  icon,
  title = "Título",
  emoji,
  description,
  date,
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
      borderRadius={"30px"}
      p={3}
    >
      <Box w={"100%"} mb={2}>
        {icon}
      </Box>

      <Box
        w={"100%"}
        h={"100%"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        justifyContent={"center"}
        gap={2}
      >
        <Text textStyle={"RobotoBodyBold"} color={"black"}>
          {title}
        </Text>

        <Box
          display={"flex"}
          gap={"5px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text textStyle={"RobotoBodyBold"} color={"grey"}>
            {emoji}
          </Text>
          <Text textStyle={"RobotoBodyBold"} color={"grey"} textAlign={"justify"}>
            {description}
          </Text>
        </Box>

        <Text textStyle={"RobotoBodyBold"} display={"flex"} gap={"5px"}>
          {text2}
          <span style={{ fontSize: "16px", color: "grey" }}>
            {description2}
          </span>
        </Text>
      </Box>
      <Text p={1} textStyle={"RobotoRegularBold"}>
        ÚLtima conexión el {date}
      </Text>
    </Box>
  );
}
