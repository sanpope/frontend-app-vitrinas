import { Box, Button, HStack, Text } from "@chakra-ui/react";
import React from "react";
import UserIcon from "../assets/images/UserIcon";
import ClockICon from "../assets/images/ClockIcon";
import VerifiedIcon from "../assets/images/VerifiedIcon";
import NoVerifiedIcon from "../assets/images/NoVerified";
import StandardButton from "./ui/buttons/standard";

import CheckVerifiedIcon from "../assets/images/CheckVerifiedIcon";
import CloseNoVerifiedIcon from "../assets/images/CloseNoVerifiedIcon";
import ExclamationCircleIcon from "../assets/images/ExclamationCircleIcon";

export default function ActualizacionesInventario({
  visita,
  visitaSelected,
  seleccionarYVerificar,
  isSelected,
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
      onClick={seleccionarYVerificar}
    >
      <Box
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        gap={"10px"}
      >
        <UserIcon width={"15px"} height={"15px"} fill={"black"} />
        <Text textStyle={"RobotoRegularBold"}>Asesor: </Text>
        <Text textStyle={"RobotoRegular"}>{visita?.asesor}</Text>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        gap={"10px"}
      >
        <ClockICon width={"15px"} height={"15px"} />
        <Text textStyle={"RobotoRegularBold"}>Fecha y hora:</Text>
        <Text textStyle={"RobotoRegular"}>{visita?.fechaHora}</Text>
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
        <Text textStyle={"RobotoRegular"}>{visita?.ingresos}</Text>
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
        <Text textStyle={"RobotoRegular"}>{visita?.retiros}</Text>
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
        <Text textStyle={"RobotoRegular"}>{visita?.correcciones}</Text>
      </Box>
      <HStack spacing="15px">
        <StandardButton
          w={"110px"}
          height={"20px"}
          variant={visita?.verificada === "true" ? "VERIFIED" : "NO_VERIFIED"}
          fontSize={"12px"}
          borderWidth={".5px"}
          borderRadius={"2px"}
          textStyle={"RobotoNano"}
          leftIcon={
            visita?.verificada === "true" ? (
              <CheckVerifiedIcon />
            ) : (
              <CloseNoVerifiedIcon />
            )
          }
        >
          {visita?.verificada === "true" ? "Verificada" : "No verificada"}
        </StandardButton>
        {visita.revertida === true ? (
          <StandardButton
            w={"110px"}
            height={"20px"}
            variant={"REVERT"}
            fontSize={"12px"}
            borderWidth={".5px"}
            borderRadius={"2px"}
            textStyle={"RobotoNano"}
          >
            Revertida
          </StandardButton>
        ) : (
          <></>
        )}
      </HStack>
    </Box>
  );
}
