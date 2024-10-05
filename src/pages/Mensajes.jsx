import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Text, useDisclosure } from "@chakra-ui/react";
import StandardButton from "../component/ui/buttons/standard";
import ConfirmationMessage from "../component/ConfirmationMessage";
import WarningIcon from "../assets/images/WarningIcon";
import axios from "axios";
import Message from "../component/Message";

import { parseData } from "../utils/xmlParse";
import { formatFecha } from "../utils/formatting";

export default function Mensajes() {
  const city = useSelector((state) => state.vitrinaReducer.city);
  const name = useSelector((state) => state.vitrinaReducer.name);
  const [totalMensajes, setTotalMensajes] = useState(null);
  const [currentMsg, setCurrentMsg] = useState();

  const {
    isOpen: isConfirmationModalOpen,
    onOpen: onConfirmationModalOpen,
    onClose: onConfirmationModalClose,
  } = useDisclosure();

  const {
    isOpen: isEliminarMensajeOpen,
    onOpen: onEliminarMensajeOpen,
    onClose: onEliminarMensajeClose,
  } = useDisclosure();

  useEffect(() => {
    getMensajesVitrina();
  }, []);

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
    return mensajesArr;
  };

  const deleteMensaje = async (idMensaje, mensaje) => {
    const id = parseInt(idMensaje);
    console.log(idMensaje);
    console.log(mensaje);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina/mensajes?vitrina=${name}&idMensaje=${id}`,
        {
          headers: {
            "Content-Type": "application/xml",
          },
        },
      );
      console.log(response.data);
      if (response.data) {
        setTotalMensajes((prev) => {
          const index = prev.findIndex((item) => item.id === mensaje.id);
          if (index !== -1) {
            const copy = [...prev];
            copy.splice(index, 1);
            return copy;
          }
        });
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
      onEliminarMensajeClose();
    }
  };

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
              variant={"DISABLED"}
              borderRadius="20px"
              py={"17px"}
              w={"fit-content"}
              fontSize="14px"
              fontWeight="400"
              onClick={onConfirmationModalOpen}
              disabled={true}
              cursor={"not-allowed"}
            >
              Vaciar bendeja de entrada
            </StandardButton>
            <ConfirmationMessage
              icon={<WarningIcon />}
              text={`¿Estás seguro que desea eliminar Todos los mensajes?`}
              isOpen={isConfirmationModalOpen}
              onOpen={onConfirmationModalOpen}
              onClose={onConfirmationModalClose}
              products={null}
            />
          </Box>
        </Box>
      </Box>
      <Box display={"flex"} flexWrap={"wrap"} gap={"20px"} py={"10px"}>
        {totalMensajes?.map((mensaje, index) => (
          <>
            <Message
              key={index}
              name={mensaje.remitente}
              subject={mensaje.asunto}
              message={mensaje.contenido}
              visto={mensaje.visto}
              fechaHora={mensaje.fechaHora}
              onClick={onEliminarMensajeOpen}
            />
          </>
        ))}
      </Box>
      <ConfirmationMessage
        icon={<WarningIcon />}
        text={`¿Estás seguro que deseas eliminar este mensaje?`}
        isOpen={isEliminarMensajeOpen}
        onOpen={onEliminarMensajeOpen}
        onClose={onEliminarMensajeClose}
        funcConfirmar={() => {
          // deleteMensaje(mensaje.id, mensaje);
        }}
        products={null}
      />
    </Box>
  );
}
