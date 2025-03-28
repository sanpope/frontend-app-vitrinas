import { Box, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import StandardButton from "./ui/buttons/standard";
import useNormalize from "../hooks/useNormalize";
import ConfirmationMessage from "./ConfirmationMessage";
import ThumbUpIcon from "../assets/images/ThumbUpIcon";
import WarningIcon from "../assets/images/WarningIcon";

export default function DispositivoContainer({
  h,
  minH,
  w,
  minW,
  maxW,
  icon,
  title = "Título",
  dispositivo,
  currentDispositivo,
  setCurrentDispositivo,
  onAceptar,
  onRechazar,
  loading,
  loadingAprobar,
  loadingRechazar,
}) {
  const normalize = useNormalize();
  const {
    isOpen: isAprobarSolicitudOpen,
    onOpen: onAprobarSolicitudOpen,
    onClose: onAprobarSolicitudClose,
  } = useDisclosure();

  const {
    isOpen: isRechazarSolicitudOpen,
    onOpen: onRechazarSolicitudOpen,
    onClose: onRechazarSolicitudClose,
  } = useDisclosure();

  const handleOpenAprobarSolicitud = () => {
    setCurrentDispositivo({ ...currentDispositivo });
    onAprobarSolicitudOpen();
  };
  const handleOpenRechazarSolicitud = () => {
    setCurrentDispositivo({ ...currentDispositivo });
    onRechazarSolicitudOpen();
  };
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
          minW={"100px"}
          onClick={() => {
            handleOpenAprobarSolicitud();
          }}
          loading={loading}
        >
          Aceptar
        </StandardButton>
        <StandardButton
          variant={"WHITE_BLACK"}
          borderRadius="30px"
          w={normalize(30)}
          minW={"100px"}
          onClick={() => {
            handleOpenRechazarSolicitud();
          }}
        >
          Rechazar
        </StandardButton>
      </Box>

      {isAprobarSolicitudOpen && (
        <ConfirmationMessage
          isOpen={isAprobarSolicitudOpen}
          onOpen={onAprobarSolicitudOpen}
          onClose={onAprobarSolicitudClose}
          icon={
            <WarningIcon colorBc="#91D5FF" colorIcon="#1890FF" width="80px" />
          }
          text={`¿Estás seguro que deseas aceptar la solicitud de vinculación del dispositivo ${dispositivo?.nombre}?`}
          text2={"Esta acción vinculará el dispositivo a tu vitrina"}
          buttonText={"Continuar"}
          funcConfirmar={() => onAceptar(dispositivo?.codApp)}
          isLoading={loadingAprobar}
        />
      )}

      {isRechazarSolicitudOpen && (
        <ConfirmationMessage
          isOpen={isRechazarSolicitudOpen}
          onOpen={onRechazarSolicitudOpen}
          onClose={onRechazarSolicitudClose}
          icon={<WarningIcon width="80px" />}
          text={`¿Estás seguro que deseas rechazar la solicitud de vinculación del dispositivo ${dispositivo?.nombre}?`}
          text2={
            "Esta acción rechazará permanentemente la solicitud de vinculación"
          }
          colorText2={"red.100"}
          buttonText={"Continuar"}
          funcConfirmar={() => onRechazar(dispositivo?.codApp)}
          isLoading={loadingRechazar}
        />
      )}
    </Box>
  );
}
