import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default function InventarioXverificar({
  date = "06/Abr",
  hour = "2:50PM",
  name = "José C",
  vitrina = "Corales de Indias",
  ingresos = 5,
  retiros = 8,
  correcciones = 2,
}) {
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
        justifyContent={"flex-start"}
        gap={"1rem"}
      >
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Box
            bg="green"
            w={3}
            h={3}
            borderRadius="full"
            mr={"10px"}
            display={"inline-flex"}
          ></Box>
          <Text>Ingresos</Text>
        </Box>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Box
            bg="red"
            w={3}
            h={3}
            borderRadius="full"
            mr={"10px"}
            display={"inline-flex"}
          ></Box>
          <Text>Retiros</Text>
        </Box>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Box
            bg="#FFD80C"
            w={3}
            h={3}
            borderRadius="full"
            mr={"10px"}
            display={"inline-flex"}
          ></Box>
          <Text>Correcciones</Text>
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
        <Text
          textStyle={""}
          color={"grey.placeholder"}
          textAlign={"left"}
          w={"6rem"}
        >
          Visita
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
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"flex-start"}
        >
          <Text textStyle={"RobotoBodyBold"}>{name}</Text>
          <Text textStyle={"RobotoRegular"} color={"grey.placeholder"}>
            {vitrina}
          </Text>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"flex-end"}
        >
          <Text
            minW={"5rem"}
            textStyle={"RobotoRegular"}
            textAlign={"left"}
            color={"grey.placeholder"}
          >
            {date} {hour}
          </Text>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box
              bg="green"
              w={3}
              h={3}
              borderRadius="full"
              display={"inline-flex"}
            ></Box>
            <Text>{ingresos}</Text>
            <Box
              bg="red"
              w={3}
              h={3}
              borderRadius="full"
              display={"inline-flex"}
            ></Box>
            <Text>{retiros}</Text>
            <Box
              bg="#FFD80C"
              w={3}
              h={3}
              borderRadius="full"
              display={"inline-flex"}
            ></Box>
            <Text>{correcciones}</Text>
          </Box>
        </Box>
      </Box>
      <Box
        w={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"flex-start"}
        >
          <Text textStyle={"RobotoBodyBold"}>{name}</Text>
          <Text textStyle={"RobotoRegular"} color={"grey.placeholder"}>
            {vitrina}
          </Text>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"flex-end"}
        >
          <Text
            minW={"5rem"}
            textStyle={"RobotoRegular"}
            textAlign={"left"}
            color={"grey.placeholder"}
          >
            {date} {hour}
          </Text>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box
              bg="green"
              w={3}
              h={3}
              borderRadius="full"
              display={"inline-flex"}
            ></Box>
            <Text>{ingresos}</Text>
            <Box
              bg="red"
              w={3}
              h={3}
              borderRadius="full"
              display={"inline-flex"}
            ></Box>
            <Text>{retiros}</Text>
            <Box
              bg="#FFD80C"
              w={3}
              h={3}
              borderRadius="full"
              display={"inline-flex"}
            ></Box>
            <Text>{correcciones}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
