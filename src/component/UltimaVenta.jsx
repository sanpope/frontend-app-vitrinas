import React from "react";
import { Box, Text } from "@chakra-ui/react";
import {
  capitalizeFirstLetter,
  formatDate,
  formatearNumero,
} from "../utils/formatting";

const UltimaVenta = ({ prodslUltimasVentas }) => {
  const fecha =
    prodslUltimasVentas?.fecha !== null &&
    prodslUltimasVentas?.fecha !== undefined &&
    prodslUltimasVentas?.fecha !== ""
      ? formatDate(prodslUltimasVentas?.fecha)
      : "";

  const valor =
    prodslUltimasVentas?.valor !== null &&
    prodslUltimasVentas?.valor !== "undefined" &&
    prodslUltimasVentas?.valor !== ""
      ? formatearNumero(prodslUltimasVentas?.valor)
      : 0;
  const Prod1Cant =
    prodslUltimasVentas?.prod1?.cantidad !== null &&
    prodslUltimasVentas?.prod1?.cantidad !== undefined &&
    prodslUltimasVentas?.prod1?.cantidad !== ""
      ? prodslUltimasVentas?.prod1?.cantidad
      : "";

  const Prod1Nomb =
    prodslUltimasVentas?.prod1?.nombre !== null &&
    prodslUltimasVentas?.prod1?.nombre !== undefined &&
    prodslUltimasVentas?.prod1?.nombre !== ""
      ? capitalizeFirstLetter(prodslUltimasVentas?.prod1?.nombre)
      : "";
  const Prod2Cant =
    prodslUltimasVentas?.prod2?.cantidad !== null &&
    prodslUltimasVentas?.prod2?.cantidad !== undefined &&
    prodslUltimasVentas?.prod2?.cantidad !== ""
      ? prodslUltimasVentas?.prod2?.cantidad
      : "";
  const Prod2Nomb =
    prodslUltimasVentas?.prod2?.nombre !== null &&
    prodslUltimasVentas?.prod2?.nombre !== undefined &&
    prodslUltimasVentas?.prod2?.nombre !== ""
      ? capitalizeFirstLetter(prodslUltimasVentas?.prod2?.nombre)
      : "";

  const masProductos =
    prodslUltimasVentas?.masProductos !== null &&
    prodslUltimasVentas?.masProductos !== undefined &&
    prodslUltimasVentas?.masProductos !== ""
      ? prodslUltimasVentas?.masProductos
      : "false";
  return (
    <>
      {prodslUltimasVentas !== null ? (
        <Box
          w={"100%"}
          h={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
        >
          <Text
            color={"grey.placeholder"}
            textAlign={"left"}
            textStyle={"RobotoRegular"}
          >
            {fecha}
          </Text>
          <Box display={"flex"} flexDirection={"column"}>
            <Text textStyle={"RobotoHeaderBold"} color={"black"}>
              ${valor}
            </Text>
          </Box>

          <Box>
            <Box display={"flex"} gap={"5px"}>
              <Text color={"black"} textStyle={"RobotoRegular"}>
                {Prod1Cant}
              </Text>
              <Text color={"grey.placeholder"} textStyle={"RobotoRegular"}>
                {Prod1Nomb}{Prod2Cant && Prod2Nomb ? "," : ""}
              </Text>
            </Box>
            <Box display={"flex"}>
              <Text color={"grey.placeholder"} textStyle={"RobotoRegular"}>
                <span style={{ color: "black" }}>{Prod2Cant}</span> {Prod2Nomb}
                {masProductos !== "false" ? (
                  <>
                    <span>,</span>
                    <span style={{ color: "red" }}> y otros más...</span>
                  </>
                ) : (
                  ""
                )}
              </Text>
            </Box>
          </Box>
        </Box>
      ) : (
        <Text color={"grey.placeholder"} alignSelf={"center"}>
          Última venta No registrada!.
        </Text>
      )}
    </>
  );
};

export default UltimaVenta;
