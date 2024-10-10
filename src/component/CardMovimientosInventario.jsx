import { Box, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import React from "react";
import TimesCircleIcon from "../assets/images/TimesCircleIcon";
import ClockICon from "../assets/images/ClockIcon";

export default function CardMovimientosInventario({ movimiento }) {
  return (
    <Box
      id={"movimiento-" + movimiento?.idVisita}
      w={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"flex-start"}
      p={2}
      py={3}
      gap={2}
      borderBottomColor={"grey.placeholder"}
      borderBlockEndWidth={1}
      bg={movimiento?.esVisita ? "red.40" : "white"}
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
        <Text textStyle={"RobotoRegular"}>{movimiento?.fechaHora}</Text>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        gap={"10px"}
      >
        <TimesCircleIcon width={"15px"} height={"15px"} />
        <Text textStyle={"RobotoRegularBold"}>Hecho en visita:</Text>
        <Text textStyle={"RobotoRegular"}>
          {movimiento?.hechoEnVisita === "true" ||
          movimiento?.hechoEnVisita === true
            ? "Sí"
            : "No"}
        </Text>
      </Box>
      <Box display={"flex"} flexDirection={"column"}>
        <Box
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          gap={"10px"}
        >
          <Box
            bg="green"
            w={3}
            h={3}
            borderRadius="full"
            display={"inline-flex"}
          ></Box>
          <Text textStyle={"RobotoRegularBold"}>Productos Ingresados:</Text>
        </Box>
        <UnorderedList p={1}>
          {movimiento?.totalProdsIngr !== null &&
          movimiento?.totalProdsIngr?.length > 0 ? (
            movimiento?.totalProdsIngr?.map((prod, index) => (
              <ListItem key={index}>
                <Text textStyle={"RobotoRegular"}>
                  {prod.nombre} x {prod.cantidad} unds.
                </Text>
              </ListItem>
            ))
          ) : (
            <Text textStyle={"RobotoRegularBold"} color={"grey.placeholder"}>
              No se encontraron productos ingresados.
            </Text>
          )}
        </UnorderedList>
      </Box>
      <Box display={"flex"} flexDirection={"column"}>
        <Box
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          gap={"10px"}
        >
          <Box
            bg="red"
            w={3}
            h={3}
            borderRadius="full"
            display={"inline-flex"}
          ></Box>
          <Text textStyle={"RobotoRegularBold"}>Productos Retirados:</Text>
        </Box>
        <UnorderedList p={1}>
          {movimiento?.totalProdsRet !== null &&
          movimiento?.totalProdsRet?.length > 0 ? (
            movimiento?.totalProdsRet?.map((prod, index) => (
              <ListItem key={index}>
                <Text textStyle={"RobotoRegular"}>
                  {prod.nombre} x {prod.cantidad} unds.
                </Text>
              </ListItem>
            ))
          ) : (
            <Text textStyle={"RobotoRegularBold"} color={"grey.placeholder"}>
              No se encontraron productos retirados.
            </Text>
          )}
        </UnorderedList>
      </Box>
    </Box>
  );
}
