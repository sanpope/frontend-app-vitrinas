import { Box, Text } from "@chakra-ui/react";
import React from "react";
import useNormalize from "../hooks/useNormalize";

export default function InventarioXverificar({ visitasNoVerificadas }) {
  const normalize = useNormalize();
  return (
    <Box
      w={"100%"}
      h={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"0.5rem"}
    >
      <Box
        w={"100%"}
        display={"flex"}
        justifyContent={"center"}
        gap={"1rem"}
        position={"sticky"}
        top={0}
        backgroundColor={"white"}
        zIndex={1}
      >
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Box
            bg="green"
            w={normalize(0.7)}
            maxW={3}
            h={normalize(0.7)}
            maxH={3}
            borderRadius="full"
            mr={normalize(0.2)}
            display={"inline-flex"}
          ></Box>
          <Text>Ingresos</Text>
        </Box>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Box
            bg="red"
            w={normalize(0.7)}
            maxW={3}
            h={normalize(0.7)}
            maxH={3}
            borderRadius="full"
            mr={normalize(0.3)}
            display={"inline-flex"}
          ></Box>
          <Text>Retiros</Text>
        </Box>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Box
            bg="#FFD80C"
            w={normalize(0.7)}
            maxW={3}
            h={normalize(0.7)}
            maxH={3}
            borderRadius="full"
            mr={normalize(0.3)}
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
        position={"relative"}
        flex={1}
        display={"flex"}
        flexDirection={"column"}
        w={"100%"}
        flexGrow={1}
        gap={3}
        marginInline={10}
        overflow={"auto"}
        maxH={"calc(100% - 80px)"}
        minH={"150px"}
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
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
              <Text textStyle={"RobotoBodyBold"}>{visita.vitrina}</Text>
              <Text textStyle={"RobotoRegular"} color={"grey.placeholder"}>
                {visita.asesor}
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
                textAlign={"right"}
                color={"grey.placeholder"}
              >
                {visita.fecha}
              </Text>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                gap={1.5}
              >
                <Box
                  bg="green"
                  w={normalize(0.7)}
                  maxW={3}
                  h={normalize(0.7)}
                  maxH={3}
                  borderRadius="full"
                  display={"inline-flex"}
                ></Box>
                <Text>{visita.ingresos}</Text>
                <Box
                  bg="red"
                  w={normalize(0.7)}
                  maxW={3}
                  h={normalize(0.7)}
                  maxH={3}
                  borderRadius="full"
                  display={"inline-flex"}
                ></Box>
                <Text>{visita.retiros}</Text>
                <Box
                  bg="#FFD80C"
                  w={normalize(0.7)}
                  maxW={3}
                  h={normalize(0.7)}
                  maxH={3}
                  borderRadius="full"
                  display={"inline-flex"}
                ></Box>
                <Text>{visita.correcciones}</Text>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
