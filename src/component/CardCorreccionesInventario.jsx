import { Box, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import React from "react";
import TimesCircleIcon from "../assets/images/TimesCircleIcon";
import ClockICon from "../assets/images/ClockIcon";

export default function CardCorreccionesInventario({
  fecha,
  visita,
  ProdCorr,
}) {
  return (
    <Box
      w={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"flex-start"}
      p={2}
      py={3}
      gap={2}
      bg="white"
      _hover={{
        bg: "red.40",
        transition: "all 0.2s ease-in-out",
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        gap={"10px"}
      >
        <ClockICon width={"15px"} height={"15px"} />
        <Text textStyle={"RobotoRegularBold"}>Fecha y hora:</Text>
        <Text textStyle={"RobotoRegular"}>{fecha}</Text>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        gap={"10px"}
      >
        <TimesCircleIcon width={"15px"} height={"15px"} />
        <Text textStyle={"RobotoRegularBold"}>Visita:</Text>
        <Text textStyle={"RobotoRegular"}>{visita}</Text>
      </Box>
      <Box w={"100%"} display={"flex"} flexDirection={"column"} gap={2}>
        <Box
          w={"100%"}
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          gap={"10px"}
        >
          <Box
            bg="#FFD80C"
            w={3}
            h={3}
            borderRadius="full"
            display={"inline-flex"}
          ></Box>
          <Text textStyle={"RobotoRegularBold"}>Productos Corregidos:</Text>
        </Box>
        {ProdCorr.map((producto, index) => (
          <Box
            key={index}
            display={"flex"}
            flexDirection={"column"}
            borderWidth={1}
            borderColor={"grey.placegholder"}
            p={2}
            w={"100%"}
          >
            <Box display={"flex"} flexDirection={"column"} p={2}>
              <Box display={"flex"} justifyContent={"flex-start"} gap={"5px"}>
                <Text textStyle={"RobotoRegularBold"}>Nombre:</Text>
                <Text textStyle={"RobotoRegular"}>{producto.Nombre}</Text>
              </Box>

              <Box display={"flex"} justifyContent={"flex-start"} gap={"5px"}>
                <Text textStyle={"RobotoRegularBold"}>Unidades:</Text>
                <Text textStyle={"RobotoRegular"}>{producto.Unidades}</Text>
              </Box>

              <Box display={"flex"} justifyContent={"flex-start"} gap={"5px"}>
                <Text textStyle={"RobotoRegularBold"}>Motivo:</Text>
                <Text textStyle={"RobotoRegular"}>{producto.Motivo}</Text>
              </Box>

              <Box
                display={"flex"}
                justifyContent={"flex-start"}
                gap={"5px"}
                w={"100%"}
              >
                <Text textStyle={"RobotoRegularBold"}>Nota:</Text>
                <Text textStyle={"RobotoRegular"} w={"100%"}>
                  {producto.Nota}
                </Text>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
