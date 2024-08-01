import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default function DespachosActuales({ listaDeDespachos }) {
  function truncateText(text, maxLength = 15) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }
  return (
    <Box
      w={"100%"}
      height={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"space-between"}
    >
      <Box
        w={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        borderBottomWidth={2}
        borderBottomColor={"mainBg"}
        flexGrow={1}
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
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-around"}
        w={"100%"}
        height={"140px"}
        flexGrow={1}
        className={"scroll-wrapper"}
      >
        {listaDeDespachos?.map((despacho, index) => (
          <Box
            key={index}
            w={"100%"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            borderBottomWidth={2}
            borderBottomColor={"mainBg"}
            py={1}
          >
            <Box
              display={"flex"}
              justifyContent={"flex-start"}
              alignItems={"center"}
              w={"120px"}
            >
              <Text textStyle={"RobotoRegular"}>
                {truncateText(despacho.vitrina)}
              </Text>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Text textStyle={"RobotoRegular"} textAlign={"center"}>
                {despacho.cantidadDeProductosDespachados}
              </Text>
            </Box>
            <Box display={"flex"} justifyContent={"flex-end"} w={"120px"}>
              <Text
                minW={"4.40rem"}
                textStyle={"RobotoRegular"}
                textAlign={"left"}
                pl={2}
                color={"grey.placeholder"}
              >
                {despacho.fecha}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
