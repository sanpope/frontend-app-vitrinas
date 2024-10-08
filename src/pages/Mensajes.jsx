import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Text, useDisclosure, useToast } from "@chakra-ui/react";
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
import { formatFecha } from "../utils/formatting";

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
      if (response.status == 200 && response.data) {
        const xmlDoc = parseData(response.data);
        dispatch(setMensajesVitrina(getMensajes(xmlDoc)));
      }
    } catch (error) {
      toast({
        status: "error",
        description: "Error obteniendo los mensajes.",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
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

      if (response.status == 200 && response.data) {
        const copy = [...totalMensajes];
        const index = copy.findIndex((item) => item.id === mensaje.id);
        if (index !== -1) {
          copy.splice(index, 1);
        }
        const mensajesNoLeidos = copy.filter((msj) => msj.visto === "false");
        dispatch(setMensajesVitrina(copy));

        dispatch(setMensajesNoLeidos(mensajesNoLeidos?.length));
        toast({
          status: "success",
          description: "Mensaje eliminado con éxito!.",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        status: "error",
        description: "Error eliminando el mensaje.",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      onEliminarMensajeClose();
      setIsLoading(false);
    }
  };

  const deleteTotalMensajes = async (mensajes) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina/mensajes?vitrina=${name}&idMensaje=${""}`,
        {
          headers: {
            "Content-Type": "application/xml",
          },
        },
      );
    } catch (error) {
      console.log(error);
    } finally {
      onConfirmationModalClose();
    }
  };

  // useEffect(() => {
  //   return () => {
  //     try {
  //       const response = axios.get(
  //         //ToDo Actualizar el EndPoint para marcas los mensajes como leidos, esta funcion se ejecutara cuando el usuario abandona la pag de mensajes
  //         `${process.env.REACT_APP_SERVER_URL}/app/rest/`,
  //         {
  //           headers: {
  //             "Content-Type": "application/xml",
  //           },
  //         },
  //       );
  //       console.log(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  // }, []);

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
        isLoading={isLoading}
      />
    </Box>
  );
}
