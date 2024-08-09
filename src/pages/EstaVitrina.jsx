import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Text, useDisclosure } from "@chakra-ui/react";
import StandardButton from "../component/ui/buttons/standard";
import Editar from "../component/Editar";
import ConfirmationMessage from "../component/ConfirmationMessage";
import EditIcon from "../assets/images/EditIcon";
import TrashIcon from "../assets/images/TrashIcon";
import WarningIcon from "../assets/images/WarningIcon";
import PlusCircleIcon from "../assets/images/PlusCircleIcon";
import AgregarAsesor from "../component/AgregarAsesor";
import AsesorContainer from "../component/AsesorContainer";
import MensajeInfoEstaVitrina from "../component/MensajeInfoEstaVitrina";
import xmlToJSON from "../services/XmlToJsonConverter";
import estaVitrina from "../services/estaVitrina";

export default function EstaVitrina() {
  const city = useSelector((state) => state.vitrinaReducer.city);
  const name = useSelector((state) => state.vitrinaReducer.name);
  const [infoTotalVitrina, setInfoTotalVitrina] = useState(null);

  useEffect(() => {
    parseData();
  }, []);

  const parseData = () => {
    const resumenInfo = xmlToJSON(estaVitrina);
    const datosDeVitrina = resumenInfo.estaVitrina;

    const asesoresArray = datosDeVitrina?.asesores?.asesor.map((asesor) => ({
      nombre: asesor?.nombre["#text"],
      usuario: asesor?.usuario["#text"],
      contraseña: asesor?.contraseña["#text"],
    }));

    const infoVitrina = {
      ciudadDeVitrina: datosDeVitrina.ciudadDeVitrina["#text"],
      fechaDeCreacion: datosDeVitrina.fechaDeCreacion["#text"],
      mensaje: datosDeVitrina.mensaje["#text"],
      nombreDeVitrina: datosDeVitrina.nombreDeVitrina["#text"],
      asesores: asesoresArray,
    };

    setInfoTotalVitrina(infoVitrina);
  };

  const {
    isOpen: isFirstModalOpen,
    onOpen: onFirstModalOpen,
    onClose: onFirstModalClose,
  } = useDisclosure();

  const {
    isOpen: isSecondModalOpen,
    onOpen: onSecondModalOpen,
    onClose: onSecondModalClose,
  } = useDisclosure();

  const {
    isOpen: isThirdModalOpen,
    onOpen: onThirdModalOpen,
    onClose: onThirdModalClose,
  } = useDisclosure();

  const {
    isOpen: isFourthModalOpen,
    onOpen: onFourthModalOpen,
    onClose: onFourthModalClose,
  } = useDisclosure();

  const {
    isOpen: isFifthModalOpen,
    onOpen: onFifthModalOpen,
    onClose: onFifthModalClose,
  } = useDisclosure();

  return (
    <Box
      bg={"mainBg"}
      w={"100%"}
      height={"100%"}
      display={"flex"}
      flexDir={"column"}
      gap={"20px"}
      p={"20px"}
      overflowY={"scroll"}
    >
      <Box display={"flex"} flexDir={"column"} gap={"10px"}>
        <Box
          display={"flex"}
          flexDirection={{ base: "column", md: "row" }}
          justifyContent={{ base: "flex-start", md: "space-between" }}
          alignItems={{ base: "flex-start", md: "center" }}
        >
          <Box display={"flex"} flexDirection={"column"} p={1}>
            <Text textStyle={"RobotoBodyBold"}>
              {infoTotalVitrina?.nombreDeVitrina}
            </Text>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-around"}
              gap={"10px"}
            >
              <Text textStyle={"RobotoBodyBold"}>Ciudad:</Text>
              <Text textStyle={"RobotoBody"}>
                {infoTotalVitrina?.ciudadDeVitrina}
              </Text>
              <Text textStyle={"RobotoBodyBold"}>Fecha de creación:</Text>
              <Text textStyle={"RobotoBody"}>
                {infoTotalVitrina?.fechaDeCreacion}
              </Text>
            </Box>
          </Box>
          <Box
            display={"flex"}
            flexDirection={{ base: "column", sm: "row" }}
            justifyContent={{ base: "flex-start", md: "center" }}
            alignItems={"center"}
            gap={"10px"}
          >
            <StandardButton
              variant={"WHITE_RED"}
              borderRadius="20px"
              py={"17px"}
              w={"10.25rem"}
              fontSize={"14px"}
              fontWeight={"400"}
              onClick={onFirstModalOpen}
            >
              Editar Vitrina
            </StandardButton>

            <Editar
              isOpen={isFirstModalOpen}
              onOpen={onFirstModalOpen}
              onClose={onFirstModalClose}
              onClick={onFirstModalClose}
              desc={"Vitrina"}
              desc2={"Vitrina"}
            />
            <StandardButton
              variant={"WHITE_RED"}
              borderRadius="20px"
              py={"17px"}
              w={"10.25rem"}
              fontSize={"14px"}
              fontWeight={"400"}
              onClick={onSecondModalOpen}
            >
              Eliminar Vitrina
            </StandardButton>
            <ConfirmationMessage
              isOpen={isSecondModalOpen}
              onOpen={onSecondModalOpen}
              onClose={onSecondModalClose}
              icon={<WarningIcon />}
              text={"¿Estás seguro que desea eliminar a esta vitrina?"}
              text2={
                "Esta acción eliminará permanentemente los registros de esta vitrina de tu sistema"
              }
              colorText2={"red.100"}
              buttonText={"Continuar"}
            />
          </Box>
        </Box>
      </Box>
      <Box display={"flex"} flexDir={"column"} gap={"20px"}>
        <Text textStyle={"RobotoBodyBold"}>Asesores:</Text>

        <Box display={"flex"} flexWrap={"wrap"} gap={"20px"}>
          {infoTotalVitrina?.asesores?.map((asesor) => (
            <AsesorContainer
              asesor={asesor.nombre}
              email={asesor.usuario}
              password={asesor.contraseña}
              isFirstModalOpen={isFourthModalOpen}
              onFirstModalOpen={onFourthModalOpen}
              onFirstModalClose={onFourthModalClose}
              isSecondModalOpen={isFifthModalOpen}
              onSecondModalOpen={onFifthModalOpen}
              onSecondModalClose={onFifthModalClose}
            />
          ))}
        </Box>

        <StandardButton
          variant={"RED_PRIMARY"}
          borderRadius="20px"
          py={"17px"}
          w={"fit-content"}
          fontSize={"14px"}
          fontWeight={"400"}
          onClick={onThirdModalOpen}
          leftIcon={<PlusCircleIcon />}
        >
          Agregar Asesor
        </StandardButton>
        <AgregarAsesor
          isOpen={isThirdModalOpen}
          onOpen={onThirdModalOpen}
          onClose={onThirdModalClose}
        />
      </Box>
      <MensajeInfoEstaVitrina />
    </Box>
  );
}
