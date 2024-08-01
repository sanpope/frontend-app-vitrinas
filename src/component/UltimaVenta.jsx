import React from "react";
import { Box, Text } from "@chakra-ui/react";

const UltimaVenta = ({
  fecha,
  valor,
  Prod1Cant,
  Prod1Nomb,
  Prod2Cant,
  Prod2Nomb,
}) => {
  return (
    <Box
      w={"100%"}
      h={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
    >
      <Text color={"grey.placeholder"} textAlign={"left"} pl={"19px"}>
        {fecha}
      </Text>

      <Text textStyle={"RobotoHeaderBold"} color={"black"}>
        ${valor}
      </Text>

      <Box display={"flex"} gap={"10px"}>
        <Text color={"black"}>{Prod1Cant}</Text>
        <Text color={"grey.placeholder"}>{Prod1Nomb}</Text>
      </Box>
      <Box display={"flex"} gap={"10px"}>
        <Text color={"black"}>{Prod2Cant}</Text>
        <Text color={"grey.placeholder"}>
          {Prod2Nomb}
          <span style={{ color: "#E60F0F", cursor: "pointer" }}>
            {Prod2Nomb != null ? "  otros más..." : ""}
          </span>
        </Text>
      </Box>
    </Box>
  );
};

export default UltimaVenta;
