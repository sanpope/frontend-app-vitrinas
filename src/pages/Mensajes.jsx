import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Text, useDisclosure } from "@chakra-ui/react";
import StandardButton from "../component/ui/buttons/standard";
import ConfirmationMessage from "../component/ConfirmationMessage";
import WarningIcon from "../assets/images/WarningIcon";
import axios from "axios";
import Message from "../component/Message";
import MensajeInfo from "../component/MensajeInfo";
import { setMensajesVitrina } from "../store/slices/vitrina";

import { parseData } from "../utils/xmlParse";
import { formatFecha } from "../utils/formatting";

export default function Mensajes() {
  const dispatch = useDispatch();
  const city = useSelector((state) => state.vitrinaReducer.city);
  const name = useSelector((state) => state.vitrinaReducer.name);
  const totalMensajes = useSelector(
    (state) => state.vitrinaReducer.mensajesVitrina,
  );
  console.log(totalMensajes);
  // const [totalMensajes, setTotalMensajes] = useState(null);
  const [currentMsg, setCurrentMsg] = useState(null);

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

  // useEffect(() => {
  //   // getMensajesVitrina();
  // }, []);

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
      dispatch(setMensajesVitrina(getMensajes(xmlDoc)));
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

  const deleteMensaje = async (mensaje) => {
    const id = Number.parseInt(mensaje?.id);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina/mensajes?vitrina=${name}&idMensaje=${id}`,
        {
          headers: {
            "Content-Type": "application/xml",
          },
        },
      );

      if (response.data) {
        const copy = [...totalMensajes];
        const index = copy.findIndex((item) => item.id === mensaje.id);
        if (index !== -1) {
          copy.splice(index, 1);
        }
        dispatch(setMensajesVitrina(copy));
        alert("Mensaje Eliminado con Éxito");
      }
    } catch (error) {
      console.log(error);
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
              // isOpen={isConfirmationModalOpen}
              // onOpen={onConfirmationModalOpen}
              // onClose={onConfirmationModalClose}
              // products={null}
            />
          </Box>
        </Box>
      </Box>
      <Box display={"flex"} flexWrap={"wrap"} gap={"20px"} py={"10px"}>
        {totalMensajes !== null && totalMensajes?.length > 0 ? (
          totalMensajes?.map((mensaje, index) => (
            <Message
              key={index}
              mensaje={mensaje}
              onClick={() => {
                console.log(mensaje);
                onEliminarMensajeOpen();
                setCurrentMsg(mensaje);
              }}
            />
          ))
        ) : (
          <MensajeInfo
            mensaje={"No tienes mensajes en tu bandeja de entrada."}
          />
        )}
      </Box>

      <ConfirmationMessage
        icon={<WarningIcon />}
        text={`¿Estás seguro que deseas eliminar este mensaje?`}
        isOpen={isEliminarMensajeOpen}
        onOpen={onEliminarMensajeOpen}
        onClose={onEliminarMensajeClose}
        funcConfirmar={() => {
          deleteMensaje(currentMsg);
        }}
        products={null}
      />
    </Box>
  );
}
