import { Box, Text } from "@chakra-ui/react";
import React from "react";
import StandardButton from "./ui/buttons/standard";
import useNormalize from "../hooks/useNormalize";

export default function DispositivoContainer({
  h,
  minH,
  w,
  minW,
  maxW,
  icon,
  title = "Título",
  onAceptar,
  onRechazar,
  loading,
}) {
  const normalize = useNormalize();
  return (
    <Box
      w={w}
      minW={minW}
      maxW={maxW}
      h={h}
      minH={minH}
      bg="white"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent={"space-between"}
      borderRadius="30px"
      p={5}
      gap={5}
    >
      <Box w="100%">{icon}</Box>
      <Box w="100%">
        <Text textStyle="RobotoBodyBold" color="black">
          {title}
        </Text>
      </Box>
      <Box
        w="100%"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={2}
      >
        <StandardButton
          variant={"RED_PRIMARY"}
          borderRadius="30px"
          w={normalize(30)}
          onClick={() => {
            onAceptar();
          }}
          loading={loading}
        >
          Aceptar
        </StandardButton>
        <StandardButton
          variant={"WHITE_BLACK"}
          borderRadius="30px"
          w={normalize(30)}
          onClick={() => {
            onRechazar();
          }}
        >
          Rechazar
        </StandardButton>
      </Box>
    </Box>
  );
}
