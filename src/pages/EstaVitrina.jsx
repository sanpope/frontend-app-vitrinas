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
import { parseData } from "../utils/xmlParse";
import axios from "axios";
import MensajeInfo from "../component/MensajeInfo";
import { setCity, setName } from "../store/slices/vitrina";
export default function EstaVitrina() {
  const dispatch = useDispatch();
  const city = useSelector((state) => state.vitrinaReducer.city);
  const name = useSelector((state) => state.vitrinaReducer.name);
  const [infoTotalVitrina, setInfoTotalVitrina] = useState(null);

  const [updatedName, setUpdatedName] = useState("");
  const [updatedCity, setUpdatedCity] = useState("");

  useEffect(() => {
    getInfoVitrina();
  }, []);

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

  const getInfoVitrina = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina/info?vitrina=${name}`,
        {
          headers: {
            "Content-Type": "application/xml",
          },
        },
      );

      const xmlDoc = parseData(response.data);
      const infoVitrina = getInfoEstaVitrina(xmlDoc);
      setInfoTotalVitrina(infoVitrina);
      setUpdatedCity(infoVitrina.ciudadDeVitrina);
    } catch (error) {
      if (error.response) {
        console.error(
          "Error en la respuesta del servidor:",
          error.response.status,
        );
        console.error("Detalles:", error.response.data);
      } else if (error.request) {
        console.error("No se recibió respuesta del servidor:", error.request);
      } else {
        console.error("Error en la solicitud:", error.message);
      }
    } finally {
    }
  };

  const getInfoEstaVitrina = (xml) => {
    const estaVitrina = xml.querySelector("estaVitrina");
    console.log(estaVitrina);
    const asesores = xml.querySelector("asesores");
    const totalAsesores = asesores.querySelectorAll("asesor");
    let asesoresArr = [];
    for (let i = 0; i < totalAsesores?.length; i++) {
      asesoresArr.push({
        nombre:
          totalAsesores[i]?.getElementsByTagName("nombre")[0]?.textContent,
        usuario:
          totalAsesores[i]?.getElementsByTagName("usuario")[0]?.textContent,
        contraseña:
          totalAsesores[i]?.getElementsByTagName("contraseña")[0]?.textContent,
      });
    }
    const infoVitrina = {
      ciudadDeVitrina:
        estaVitrina.getElementsByTagName("ciudadDeVitrina")[0]?.textContent,
      fechaDeCreacion:
        estaVitrina.getElementsByTagName("fechaDeCreacion")[0]?.textContent,
      mensaje: estaVitrina.getElementsByTagName("mensaje")[0]?.textContent,
      nombreDeVitrina:
        estaVitrina.getElementsByTagName("nombreDeVitrina")[0]?.textContent,
      asesores: asesoresArr,
    };

    return infoVitrina;
  };

  const updateVitrina = async (nombre, ciudad) => {
    const params = new URLSearchParams();
    params.append("nuevoNombre", `${nombre}`);
    params.append("nuevaCiudad", `${ciudad}`);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina?nombre=${name}`,
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      console.log(response.data);
      if (response.data) {
        dispatch(setCity(nombre));
        dispatch(setName(ciudad));
        //ToDo Actualizar inmediatamente la lista de vitrinas en el modal
      }
    } catch (error) {
      if (error.response) {
        console.error(
          "Error en la respuesta del servidor:",
          error.response.status,
        );
        console.error("Detalles:", error.response.data);
      } else if (error.request) {
        console.error("No se recibió respuesta del servidor:", error.request);
      } else {
        console.error("Error en la solicitud:", error.message);
      }
    } finally {
      onFirstModalClose();
    }
  };

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
              name={updatedName}
              setName={setUpdatedName}
              city={updatedCity}
              setCity={setUpdatedCity}
              Editar={updateVitrina}
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
          {infoTotalVitrina != null ? (
            infoTotalVitrina?.asesores?.map((asesor) => (
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
            ))
          ) : (
            <Text>No se encontraron Asesores asignados a esta vitrina.</Text>
          )}
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
      <MensajeInfo mensaje={infoTotalVitrina?.mensaje} />
    </Box>
  );
}
