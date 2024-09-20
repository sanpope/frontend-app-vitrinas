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
import { parseData } from "../utils/xmlParse";
import { formatFecha } from "../utils/formatting";

export default function Mensajes() {
  const city = useSelector((state) => state.vitrinaReducer.city);
  const name = useSelector((state) => state.vitrinaReducer.name);
  const [totalMensajes, setTotalMensajes] = useState(null);

  useEffect(() => {
    getMensajesVitrina();
  }, []);

  const parserData = () => {
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
  const getMensajesVitrina = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina/mensajes?vitrina=${name}`,
        {
          headers: {
            "Content-Type": "application/xml",
          },
        },
      );
      const xmlDoc = parseData(response.data);
      setTotalMensajes(getMensajes(xmlDoc));
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

  const getMensajes = (xml) => {
    const mensajes = xml.querySelector("mensajes");
    const totalMensajes = mensajes.querySelectorAll("mensaje");
    let mensajesArr = [];
    for (let i = 0; i < totalMensajes?.length; i++) {
      mensajesArr.push({
        id: totalMensajes[i]?.getElementsByTagName("id")[0].textContent,
        fechaHora: formatFecha(
          totalMensajes[i]?.getElementsByTagName("fechaHora")[0].textContent,
        ),
        visto: totalMensajes[i]?.getElementsByTagName("visto")[0].textContent,
        remitente:
          totalMensajes[i]?.getElementsByTagName("remitente")[0].textContent,
        asunto: totalMensajes[i]?.getElementsByTagName("asunto")[0].textContent,
        contenido:
          totalMensajes[i]?.getElementsByTagName("contenido")[0].textContent,
      });
    }
    console.log(mensajesArr);
    return mensajesArr;
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
