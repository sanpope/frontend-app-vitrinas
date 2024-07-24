import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default function DespachosActuales({
  date = "06/Abr",
  hour = "2:50PM",
}) {
  function truncateText(text, maxLength = 15) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }
  return (
    <Box
      w={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"0.5rem"}
    >
      <Box
        w={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        borderBottomWidth={2}
        borderBottomColor={"mainBg"}
      >
        <Text
          textStyle={""}
          color={"grey.placeholder"}
          textAlign={"left"}
          w={"6rem"}
        >
          Vitrina
        </Text>
        <Text
          textStyle={""}
          color={"grey.placeholder"}
          textAlign={"center"}
          w={"6rem"}
        >
          Unidades
        </Text>
        <Text
          textStyle={""}
          color={"grey.placeholder"}
          textAlign={"left"}
          w={"6rem"}
        >
          Fecha
        </Text>
      </Box>

      <Box
        w={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        borderBottomWidth={2}
        borderBottomColor={"mainBg"}
      >
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Text textStyle={"RobotoRegular"}>
            {truncateText("Corales de Indias")}
          </Text>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          <Text textStyle={"RobotoRegular"}>45</Text>
        </Box>
        <Box display={"flex"} justifyContent={"flex-end"}>
          <Text
            minW={"4.40rem"}
            textStyle={"RobotoRegular"}
            textAlign={"left"}
            ml={2}
            color={"grey.placeholder"}
          >
            {date} {hour}
          </Text>
        </Box>
      </Box>
      <Box
        w={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        borderBottomWidth={2}
        borderBottomColor={"mainBg"}
      >
        <Box
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          <Text textStyle={"RobotoRegular"}>
            {truncateText("Double Tree Bogotá")}
          </Text>
        </Box>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Text textStyle={"RobotoRegular"}>34</Text>
        </Box>
        <Box display={"flex"} justifyContent={"flex-end"}>
          <Text
            minW={"4.40rem"}
            textStyle={"RobotoRegular"}
            textAlign={"left"}
            ml={2}
            color={"grey.placeholder"}
          >
            {date} {hour}
          </Text>
        </Box>
      </Box>
      <Box
        w={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        borderBottomWidth={2}
        borderBottomColor={"mainBg"}
      >
        <Box
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          <Text textStyle={"RobotoRegular"}>
            {truncateText("Double Tree Bogotá")}
          </Text>
        </Box>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Text textStyle={"RobotoRegular"}>78</Text>
        </Box>
        <Box display={"flex"} justifyContent={"flex-end"}>
          <Text
            minW={"4.40rem"}
            textStyle={"RobotoRegular"}
            textAlign={"left"}
            ml={2}
            color={"grey.placeholder"}
          >
            {date} {hour}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
