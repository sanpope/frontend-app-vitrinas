import { Box, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import React from "react";
import TimesCircleIcon from "../assets/images/TimesCircleIcon";
import ClockICon from "../assets/images/ClockIcon";

export default function CardCorreccionesInventario({ correccion }) {
  return (
    <Box
      id={"correccion-" + correccion?.idVisita}
      w={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"flex-start"}
      p={2}
      py={3}
      gap={2}
      bg={correccion?.esVisita ? "red.40" : "white"}
      _hover={{
        bg: "red.40",
        transition: "all 0.2s ease-in-out",
      }}
      borderBottomColor={"grey.placeholder"}
      borderBlockEndWidth={1}
      my={1}
      role="group"
    >
      <Box
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        gap={"10px"}
      >
        <ClockICon width={"15px"} height={"15px"} />
        <Text textStyle={"RobotoRegularBold"}>Fecha y hora:</Text>
        <Text textStyle={"RobotoRegular"}>{correccion?.fechaHora}</Text>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        gap={"10px"}
      >
        <TimesCircleIcon width={"15px"} height={"15px"} />
        <Text textStyle={"RobotoRegularBold"}>Visita:</Text>
        <Text textStyle={"RobotoRegular"}>{correccion?.visita}</Text>
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
        {correccion?.ProdsCorregidos != null &&
        correccion?.ProdsCorregidos?.length > 0 ? (
          correccion?.ProdsCorregidos?.map((producto, index) => (
            <Box
              key={index}
              display="flex"
              flexDirection="column"
              borderWidth={1}
              borderColor={correccion?.esVisita ? "white" : "grey.placeholder"}
              p={2}
              w="100%"
              _groupHover={{
                borderColor: "white",
              }}
            >
              <Box display={"flex"} flexDirection={"column"} p={2}>
                <Box display={"flex"} justifyContent={"flex-start"} gap={"5px"}>
                  <Text textStyle={"RobotoRegularBold"}>Nombre:</Text>
                  <Text textStyle={"RobotoRegular"}>{producto.nombre}</Text>
                </Box>

                <Box display={"flex"} justifyContent={"flex-start"} gap={"5px"}>
                  <Text textStyle={"RobotoRegularBold"}>Unidades:</Text>
                  <Text textStyle={"RobotoRegular"}>{producto.cantidad}</Text>
                </Box>

                <Box display={"flex"} justifyContent={"flex-start"} gap={"5px"}>
                  <Text textStyle={"RobotoRegularBold"}>Motivo:</Text>
                  <Text textStyle={"RobotoRegular"}>
                    {producto.motivoDeCorreccion}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"flex-start"}
                  gap={"5px"}
                  w={"100%"}
                >
                  <Text textStyle={"RobotoRegularBold"}>Nota:</Text>
                  <Text textStyle={"RobotoRegular"} w={"100%"}>
                    {producto.nota}
                  </Text>
                </Box>
              </Box>
            </Box>
          ))
        ) : (
          <Text textStyle={"RobotoRegularBold"} color={"grey.placeholder"}>
            No se encontraron productos corregidos
          </Text>
        )}
      </Box>
    </Box>
  );
}
