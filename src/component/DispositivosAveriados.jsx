import { Box, list, Text } from "@chakra-ui/react";
import React from "react";
import useNormalize from "../hooks/useNormalize";

export default function DispositivosAveriados({ listadoDispositivos }) {
  const normalize = useNormalize();
  return (
    <Box
      w={"100%"}
      height={"100%"}
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
        position={"sticky"}
        top={0}
        zIndex={1}
        backgroundColor={"white"}
      >
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Box
            bg="#FFD80C"
            w={normalize(0.7)}
            maxW={3}
            h={normalize(0.7)}
            maxH={3}
            borderRadius="full"
            mr={normalize(0.2)}
            display={"inline-flex"}
          ></Box>
          <Text>Con fallas</Text>
        </Box>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Box
            bg="red"
            w={normalize(0.7)}
            maxW={3}
            h={normalize(0.7)}
            maxH={3}
            borderRadius="full"
            mr={normalize(0.2)}
            display={"inline-flex"}
          ></Box>
          <Text>No operando</Text>
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
        <Text textStyle={""} color={"grey.placeholder"} textAlign={"left"}>
          Vitrina
        </Text>
        <Text
          textStyle={""}
          color={"grey.placeholder"}
          textAlign={"left"}
          w={"6rem"}
        >
          Desde
        </Text>
      </Box>

      <Box
        display={"flex"}
        flexDirection={"column"}
        w={"100%"}
        height={"100px"}
        gap={3}
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {listadoDispositivos?.map((dispositivo, index) => (
          <Box
            key={index}
            w={"100%"}
            display={"flex"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            borderBottomWidth={2}
            borderBottomColor={"mainBg"}
          >
            <Box
              display={"flex"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Box
                bg={
                  dispositivo.detalleDeEstado === "No operando"
                    ? "red"
                    : "#FFD80C"
                }
                w={normalize(0.7)}
                maxW={3}
                h={normalize(0.7)}
                maxH={3}
                borderRadius="full"
                mr={normalize(0.2)}
                display={"inline-flex"}
              ></Box>
              <Text textStyle={"RobotoRegular"}>{dispositivo.vitrina}</Text>
            </Box>
            <Box flex={1} display={"flex"} justifyContent={"flex-end"}>
              <Text
                minW={"4.40rem"}
                textStyle={"RobotoRegular"}
                textAlign={"left"}
                ml={2}
                color={"grey.placeholder"}
              >
                {dispositivo.fechaDelProblema}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
