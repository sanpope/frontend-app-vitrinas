import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import UserIcon from "../assets/images/UserIcon";
import ClockICon from "../assets/images/ClockIcon";
import VerifiedIcon from "../assets/images/VerifiedIcon";
import NoVerifiedIcon from "../assets/images/NoVerified";
import StandardButton from "./ui/buttons/standard";

import CheckVerifiedIcon from "../assets/images/CheckVerifiedIcon";
import CloseNoVerifiedIcon from "../assets/images/CloseNoVerifiedIcon";

export default function ActualizacionesInventario({
  asesor,
  fecha,
  ingresos,
  retiros,
  correcciones,
  verificada,
  visitaSelected,
  setVisitaSelected,
  isSelected,
  verificarVisita,
}) {
  return (
    <Box
      w={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"flex-start"}
      p={2}
      py={"20px"}
      gap={2}
      borderBottomColor={"grey.placeholder"}
      borderBlockEndWidth={1}
      bg={isSelected ? "red.40" : "white"}
      _hover={{
        bg: "red.40",
        transition: "all 0.2s ease-in-out",
      }}
      cursor={"pointer"}
      onClick={setVisitaSelected}
    >
      <Box
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        gap={"10px"}
      >
        <UserIcon width={"15px"} height={"15px"} fill={"black"} />
        <Text textStyle={"RobotoRegularBold"}>Asesor: </Text>
        <Text textStyle={"RobotoRegular"}>{asesor}</Text>
      </Box>
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
        <Box
          bg="green"
          w={3}
          h={3}
          borderRadius="full"
          display={"inline-flex"}
        ></Box>
        <Text textStyle={"RobotoRegularBold"}>Ingresos:</Text>
        <Text textStyle={"RobotoRegular"}>{ingresos}</Text>
      </Box>
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
        <Text textStyle={"RobotoRegularBold"}>Retiros:</Text>
        <Text textStyle={"RobotoRegular"}>{retiros}</Text>
      </Box>
      <Box
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
        <Text textStyle={"RobotoRegularBold"} mr={1}>
          Correcciones:
        </Text>
        <Text textStyle={"RobotoRegular"}>{correcciones}</Text>
      </Box>

      <StandardButton
        w={"110px"}
        height={"20px"}
        variant={verificada === "true" ? "VERIFIED" : "NO_VERIFIED"}
        fontSize={"12px"}
        cursor={verificada === "true" ? "not-allowed" : "grab"}
        borderWidth={".5px"}
        borderRadius={"2px"}
        textStyle={"RobotoNano"}
        leftIcon={
          verificada === "true" ? (
            <CheckVerifiedIcon />
          ) : (
            <CloseNoVerifiedIcon />
          )
        }
        disabled={verificada === "true" ? true : false}
        onClick={verificada === "true" ? null : verificarVisita}
      >
        {verificada === "true" ? "Verificada" : "No verificada"}
      </StandardButton>
    </Box>
  );
}
