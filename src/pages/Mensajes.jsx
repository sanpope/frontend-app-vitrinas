import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Text, useDisclosure, useToast, Spinner } from "@chakra-ui/react";
import StandardButton from "../component/ui/buttons/standard";
import ConfirmationMessage from "../component/ConfirmationMessage";
import WarningIcon from "../assets/images/WarningIcon";
import axios from "axios";
import Message from "../component/Message";
import MensajeInfo from "../component/MensajeInfo";
import {
  setMensajesVitrina,
  setMensajesNoLeidos,
} from "../store/slices/vitrina";

import { parseData } from "../utils/xmlParse";
import { formatFecha, formatearFechaSimplificada } from "../utils/formatting";
import { HEADER_HEIGHT } from "../component/Header";

export default function Mensajes() {
  const toast = useToast();
  const dispatch = useDispatch();
  const city = useSelector((state) => state.vitrinaReducer.city);
  const name = useSelector((state) => state.vitrinaReducer.name);
  const totalMensajes = useSelector(
    (state) => state.vitrinaReducer.mensajesVitrina,
  );
  const [currentMsg, setCurrentMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

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
    if (name) {
      getMensajesVitrina();
    }
  }, [name]);

  const marcarTodosMensajesComoLeidos = async () => {
    const mensajesNoLeidos = totalMensajes.filter(
      (msj) => msj.visto === "false",
    );
    if (mensajesNoLeidos.length === 0 || !name) return;

    try {
      const promesas = mensajesNoLeidos.map(async (mensaje) => {
        const id = Number.parseInt(mensaje.id);
        return axios.put(
          `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina/mensajes/marcar-como-visto?vitrina=${name}&mensaje=${id}`,
          {},
          {
            headers: {
              "Content-Type": "application/xml",
            },
          },
        );
      });

      await Promise.all(promesas);

      const mensajesActualizados = totalMensajes.map((msj) => ({
        ...msj,
        visto: "true",
      }));

      dispatch(setMensajesVitrina(mensajesActualizados));
      dispatch(setMensajesNoLeidos(0));

      localStorage.setItem(
        `mensajes_${name}`,
        JSON.stringify(mensajesActualizados),
      );
    } catch (error) {
      console.error("Error al marcar mensajes como leídos:", error);
    }
  };

  useEffect(() => {
    return () => {
      marcarTodosMensajesComoLeidos();
    };
  }, [totalMensajes, name]);

  const getMensajesVitrina = async () => {
    setIsLoadingMessages(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina/mensajes?vitrina=${name}`,
        {
          headers: {
            "Content-Type": "application/xml",
          },
        },
      );
      if (response.status === 200 && response.data) {
        const xmlDoc = parseData(response.data);
        dispatch(setMensajesVitrina(getMensajes(xmlDoc)));
      }
    } catch (error) {
      toast({
        status: "error",
        description: "Error obteniendo los mensajes",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const getMensajes = (xml) => {
    const mensajes = xml.querySelector("mensajes");
    const totalMensajes = mensajes.querySelectorAll("mensaje");
    let mensajesArr = [];

    function formatearFechaSimplificada(fechaStr) {
      try {
        if (fechaStr.length < 16) {
          return "Fecha no disponible";
        }

        const año = fechaStr.substring(0, 4);
        const mes = fechaStr.substring(5, 7);
        const dia = fechaStr.substring(8, 10);
        const hora = fechaStr.substring(11, 13);
        const minuto = fechaStr.substring(14, 16);

        const segundo =
          fechaStr.length >= 19 ? fechaStr.substring(17, 19) : "00";

        if (
          isNaN(parseInt(año)) ||
          isNaN(parseInt(mes)) ||
          isNaN(parseInt(dia)) ||
          isNaN(parseInt(hora)) ||
          isNaN(parseInt(minuto)) ||
          isNaN(parseInt(segundo))
        ) {
          return "Fecha no disponible";
        }

        return `${dia}/${mes}/${año} a las ${hora}:${minuto}:${segundo}`;
      } catch (error) {
        console.error(`Error procesando fecha:`, fechaStr, error);
        return "Fecha no disponible";
      }
    }

    for (let i = 0; i < totalMensajes?.length; i++) {
      const fechaTexto =
        totalMensajes[i]?.getElementsByTagName("fechaHora")[0].textContent;

      const fechaFormateada = formatearFechaSimplificada(fechaTexto);

      mensajesArr.push({
        id: totalMensajes[i]?.getElementsByTagName("id")[0].textContent,
        fechaHora: fechaFormateada,
        visto: totalMensajes[i]?.getElementsByTagName("visto")[0].textContent,
        remitente:
          totalMensajes[i]?.getElementsByTagName("remitente")[0].textContent,
        asunto: totalMensajes[i]?.getElementsByTagName("asunto")[0].textContent,
        contenido:
          totalMensajes[i]?.getElementsByTagName("contenido")[0].textContent,
      });
    }

    const mensajesNoLeidos = mensajesArr.filter((msj) => msj.visto === "false");
    dispatch(setMensajesNoLeidos(mensajesNoLeidos.length));

    return mensajesArr;
  };

  const deleteMensaje = async (mensaje) => {
    const id = Number.parseInt(mensaje?.id);
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina/mensajes?vitrina=${name}&idMensaje=${id}`,
        {
          headers: {
            "Content-Type": "application/xml",
          },
        },
      );

      if (response.status === 200 && response.data) {
        const copy = [...totalMensajes];
        const index = copy.findIndex((item) => item.id === mensaje.id);
        if (index !== -1) {
          copy.splice(index, 1);
        }
        const mensajesNoLeidos = copy.filter((msj) => msj.visto === "false");
        dispatch(setMensajesVitrina(copy));

        dispatch(setMensajesNoLeidos(mensajesNoLeidos?.length));
        localStorage.setItem(`mensajes_${name}`, JSON.stringify(copy));

        toast({
          status: "success",
          description: "¡Mensaje eliminado con éxito!",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        status: "error",
        description: "Error eliminando el mensaje",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      onEliminarMensajeClose();
      setIsLoading(false);
    }
  };

  const deleteTotalMensajes = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina/mensajes/vaciar?vitrina=${name}`,
        {
          headers: {
            "Content-Type": "application/xml",
          },
        },
      );
      if (response.status === 200) {
        dispatch(setMensajesVitrina([]));
        dispatch(setMensajesNoLeidos(0));
        localStorage.setItem(`mensajes_${name}`, JSON.stringify([]));

        toast({
          status: "success",
          description: "Mensajes eliminados con éxito!",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        status: "error",
        description: "Error eliminando los mensajes",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      onConfirmationModalClose();
    }
  };

  return isLoadingMessages ? (
    <Box display="flex" justifyContent="center" alignItems="center" flex={1}>
      <Spinner size="xl" />
    </Box>
  ) : (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"space-between"}
      w={"100%"}
      h={"calc(100% - " + HEADER_HEIGHT + "px)"}
      p={"10px"}
    >
      <Box position={"sticky"} top={0} p={"10px"}>
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
              variant={totalMensajes?.length === 0 ? "DISABLED" : "RED_PRIMARY"}
              borderRadius="20px"
              py={"17px"}
              w={"fit-content"}
              fontSize="14px"
              fontWeight="400"
              onClick={onConfirmationModalOpen}
              disabled={totalMensajes?.length === 0}
              cursor={totalMensajes?.length === 0 ? "not-allowed" : "pointer"}
            >
              Vaciar bandeja de entrada
            </StandardButton>
            <ConfirmationMessage
              icon={<WarningIcon />}
              text={`¿Estás seguro que desea eliminar Todos los mensajes?`}
              isOpen={isConfirmationModalOpen}
              onOpen={onConfirmationModalOpen}
              onClose={onConfirmationModalClose}
              funcConfirmar={deleteTotalMensajes}
            />
          </Box>
        </Box>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"20px"}
        p={"10px"}
        overflowY={"auto"}
        flex={1}
      >
        {totalMensajes !== null && totalMensajes?.length > 0 ? (
          totalMensajes?.map((mensaje, index) => (
            <Message
              key={index}
              mensaje={mensaje}
              onClick={() => {
                onEliminarMensajeOpen();
                setCurrentMsg(mensaje);
              }}
            />
          ))
        ) : (
          <MensajeInfo mensaje={"Sin información"} />
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
        isLoading={isLoading}
      />
    </Box>
  );
}
