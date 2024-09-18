import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Text, useDisclosure } from "@chakra-ui/react";
import StandardButton from "../component/ui/buttons/standard";
import ConfirmationMessage from "../component/ConfirmationMessage";
import WarningIcon from "../assets/images/WarningIcon";
import axios from "axios";
import Message from "../component/Message";

import xmlToJSON from "../services/XmlToJsonConverter";
import mensajesData from "../services/mensajesData";

export default function Mensajes() {
  const city = useSelector((state) => state.vitrinaReducer.city);
  const name = useSelector((state) => state.vitrinaReducer.name);
  const [totalMensajes, setTotalMensajes] = useState(null);

  useEffect(() => {
    parseData();
    getMensajes();
  }, []);

  const parseData = () => {
    const resumenInfo = xmlToJSON(mensajesData);
    const Mensajes = resumenInfo.mensajes;

    if (Mensajes && Array.isArray(Mensajes.mensaje)) {
      const listadoMensajes = Mensajes.mensaje;
      const arrayMensajes = listadoMensajes.map((mensaje) => {
        const id = mensaje.id["#text"];
        const fechaHora = mensaje.fechaHora["#text"];
        const visto = mensaje.visto["#text"];
        const remitente = mensaje.remitente["#text"];
        const asunto = mensaje.asunto["#text"];
        const contenido = mensaje.contenido["#text"];
        return { id, fechaHora, visto, remitente, asunto, contenido };
      });
      setTotalMensajes(arrayMensajes);
    }
  };

  const getMensajes = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/ vitrina/mensajes?vitrina=${name}`,
        {
          headers: {
            Accept: "application/xml",
          },
        },
      );

      const xmlDoc = parseData(response.data);
      console.log(xmlDoc);
    } catch (error) {
      if (error.response) {
        // La solicitud fue enviada pero el servidor respondió con un código de error
        console.error(
          "Error en la respuesta del servidor:",
          error.response.status,
        );
        console.error("Detalles:", error.response.data);
      } else if (error.request) {
        // La solicitud fue enviada pero no se recibió respuesta
        console.error("No se recibió respuesta del servidor:", error.request);
      } else {
        // Ocurrió un error en la configuración de la solicitud
        console.error("Error en la solicitud:", error.message);
      }
    } finally {
    }
  };

  const {
    isOpen: isConfirmationModalOpen,
    onOpen: onConfirmationModalOpen,
    onClose: onConfirmationModalClose,
  } = useDisclosure();
  return (
    <Box
      bg={"mainBg"}
      w={"100%"}
      height={"100%"}
      display={"flex"}
      flexDir={"column"}
      gap={"10px"}
      px={"40px"}
      py={"20px"}
      overflowY={"scroll"}
    >
      <Box display={"flex"} flexDir={"column"} gap={"10px"}>
        <Text textStyle={" RobotoBody"}>
          {name} - {city}
        </Text>
        <Box
          display={"flex"}
          flexDirection={{ base: "column", sm: "row" }}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text textStyle={"RobotoTitleBold"}>Mensajes</Text>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"10px"}
          >
            <StandardButton
              variant={"RED_PRIMARY"}
              borderRadius="20px"
              py={"17px"}
              w={"fit-content"}
              fontSize="14px"
              fontWeight="400"
              onClick={onConfirmationModalOpen}
            >
              Vaciar bendeja de entrada
            </StandardButton>
            <ConfirmationMessage
              icon={<WarningIcon />}
              text={`¿Estás seguro que desea eliminar a este mensaje?`}
              isOpen={isConfirmationModalOpen}
              onOpen={onConfirmationModalOpen}
              onClose={onConfirmationModalClose}
            />
          </Box>
        </Box>
      </Box>
      <Box display={"flex"} flexWrap={"wrap"} gap={"20px"} py={"10px"}>
        {totalMensajes?.map((mensaje, index) => (
          <Message
            key={index}
            name={mensaje.remitente}
            subject={mensaje.asunto}
            message={mensaje.contenido}
            visto={mensaje.visto}
            fechaHora={mensaje.fechaHora}
            onClick={onConfirmationModalOpen}
          />
        ))}
      </Box>
    </Box>
  );
}
