import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default function InventarioXverificar({ visitasNoVerificadas }) {
  return (
    <> {visitasNoVerificadas != null ? 
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
          display={"flex"}
          flexDirection={"column"}
          w={"100%"}
          height={"100px"}
          flexGrow={1}
          className={"scroll-wrapper"}
          gap={3}
        >
          {visitasNoVerificadas?.map((visita, index) => (
            <Box
              key={index}
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
                <Text textStyle={"RobotoBodyBold"}>{visita.asesor}</Text>
                <Text textStyle={"RobotoRegular"} color={"grey.placeholder"}>
                  {"Pendiente"}
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
                  {visita.fecha}
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
                  <Text>{visita.ingresos}</Text>
                  <Box
                    bg="red"
                    w={3}
                    h={3}
                    borderRadius="full"
                    display={"inline-flex"}
                  ></Box>
                  <Text>{visita.retiros}</Text>
                  <Box
                    bg="#FFD80C"
                    w={3}
                    h={3}
                    borderRadius="full"
                    display={"inline-flex"}
                  ></Box>
                  <Text>{visita.correcciones}</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box> : <Text>No se encontró Inventario Pendiente por verificar</Text>}
    </>
  );
}
