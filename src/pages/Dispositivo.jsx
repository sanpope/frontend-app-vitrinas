import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import ConexionIcon from "../assets/images/ConexionIcon";
import DevIcon from "../assets/images/DevIcon";
import MobileIcon from "../assets/images/MobileIcon";
import PrinterIcon from "../assets/images/PrinterIcon";
import SadFaceIcon from "../assets/images/SadFaceIcon";
import ThumbUpIcon from "../assets/images/ThumbUpIcon";
import ThumbDownIcon from "../assets/images/ThumbDownIcon";
import WifiIcon from "../assets/images/WifiIcon";
import DispositivoContainer from "../component/DispositivoContainer";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { parseData } from "../utils/xmlParse";
import {
  capitalizeFirstLetter,
  formatStringToDate,
  formatDate,
} from "../utils/formatting";
import NoteDispositivo from "../component/Note";

export default function Dispositivo() {
  const city = useSelector((state) => state.vitrinaReducer.city);
  const name = useSelector((state) => state.vitrinaReducer.name);
  const [infoDispositivo, setInfoDispositivo] = useState(null);

  useEffect(() => {
    savingDispositivoData();
  }, []);

  const savingDispositivoData = async () => {
    const url = `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina/dispositivo?vitrina=${name}`;
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
        },
      })
      .then((response) => {
        const xmlDoc = parseData(response.data);
        setInfoDispositivo(dispositivoData(xmlDoc));
      })
      .catch((error) => {
        console.error("Error fetching the XML data: ", error);
      });
  };

  const dispositivoData = (xmlDoc) => {
    const dispositivo = {
      aplicacion: {
        enEjecucion: xmlDoc.getElementsByTagName("enEjecucion")[0].textContent,
        pantallaActiva: capitalizeFirstLetter(
          xmlDoc.getElementsByTagName("pantallaActiva")[0].textContent,
        ),
      },
      conexionAInternet: {
        conectado: xmlDoc.getElementsByTagName("conectado")[0].textContent,
        fechaDeLaUltimaConexion: xmlDoc.getElementsByTagName(
          "fechaDeLaUltimaConexion",
        )[0].textContent,
      },
      estado: {
        detalleDeEstado:
          xmlDoc.getElementsByTagName("detalleDeEstado")[0].textContent,
        estado: xmlDoc.getElementsByTagName("estado")[1].textContent, // el segundo "estado" está en esta sección
      },
      perifericos: {
        escaner: {
          conectado: xmlDoc
            .getElementsByTagName("conexionAEscaner")[0]
            .getElementsByTagName("conectado")[0].textContent,
          fechaDeLaUltimaConexion: xmlDoc
            .getElementsByTagName("conexionAEscaner")[0]
            .getElementsByTagName("fechaDeLaUltimaConexion")[0].textContent,
        },
        impresora: {
          conectado: xmlDoc
            .getElementsByTagName("conexionAImpresora")[0]
            .getElementsByTagName("conectado")[0].textContent,
          estadoPapel:
            xmlDoc.getElementsByTagName("estadoPapel")[0].textContent,
          fechaDeLaUltimaConexion: xmlDoc
            .getElementsByTagName("conexionAImpresora")[0]
            .getElementsByTagName("fechaDeLaUltimaConexion")[0].textContent,
        },
      },
      bateria: xmlDoc.getElementsByTagName("bateria")[0].textContent,
    };
    return dispositivo;
  };

  return (
    <Box
      bg={"mainBg"}
      w={"100%"}
      height={"100%"}
      position="relative"
      flexDir={"column"}
      display={"flex"}
      gap={"20px"}
      px={"1.5rem"}
      pt={"10px"}
      overflowY={"scroll"}
    >
      <Box display={"flex"} flexDir={"column"} gap={"10px"}>
        <Text textStyle={" RobotoBody"}>
          {name} - {city}
        </Text>
        <Text textStyle={"RobotoTitleBold"}>Dispositivo</Text>
      </Box>
      <Box w={"100%"}>
        {infoDispositivo?.estado?.detalleDeEstado?.length > 0 ? (
          <NoteDispositivo text2={infoDispositivo?.estado?.detalleDeEstado} />
        ) : (
          <></>
        )}
      </Box>
      <Box display={"flex"} gap={"20px"} flexWrap={"wrap"}>
        <DispositivoContainer
          icon={<MobileIcon />}
          title={"Estado del Dispositivo:"}
          emoji={
            infoDispositivo?.estado?.estado === "No operando" ? (
              <SadFaceIcon />
            ) : null
          }
          description={
            infoDispositivo?.estado?.estado !== null &&
            infoDispositivo?.estado?.estado.length > 0
              ? infoDispositivo?.estado?.estado
              : null
          }
          date={""}
          text2={""}
          description2={""}
        />

        <DispositivoContainer
          icon={<WifiIcon />}
          title={"Conexión a internet:"}
          emoji={
            infoDispositivo?.conexionAInternet?.conectado === "false" ? (
              <ThumbDownIcon />
            ) : (
              <ThumbUpIcon />
            )
          }
          description={
            infoDispositivo?.conexionAInternet?.conectado !== null &&
            infoDispositivo?.conexionAInternet?.conectado !== ""
              ? infoDispositivo?.conexionAInternet?.conectado === "false"
                ? "No conectado"
                : "Conectado"
              : null
          }
          date={`Última conexión el  
          ${
            infoDispositivo?.conexionAInternet?.fechaDeLaUltimaConexion !==
              null &&
            infoDispositivo?.conexionAInternet?.fechaDeLaUltimaConexion !== ""
              ? formatDate(
                  infoDispositivo?.conexionAInternet?.fechaDeLaUltimaConexion,
                )
              : null
          }`}
          text2={""}
          description2={""}
        />

        <DispositivoContainer
          icon={<PrinterIcon />}
          title={"Conexión a impresora:"}
          emoji={
            infoDispositivo?.perifericos?.impresora?.conectado === "true" ? (
              <ThumbUpIcon />
            ) : (
              <ThumbDownIcon />
            )
          }
          description={
            infoDispositivo?.perifericos?.impresora?.conectado !== null &&
            infoDispositivo?.perifericos?.impresora?.conectado !== ""
              ? infoDispositivo?.perifericos?.impresora?.conectado
                ? "Conectado"
                : "No Conectado"
              : null
          }
          text2={"Estado del papel:"}
          description2={
            infoDispositivo?.perifericos?.impresora?.estadoPapel !== null &&
            infoDispositivo?.perifericos?.impresora?.estadoPapel !== ""
              ? infoDispositivo?.perifericos?.impresora?.estadoPapel
              : null
          }
          date={` Última conexión el  ${
            infoDispositivo?.perifericos?.impresora?.fechaDeLaUltimaConexion !==
              null &&
            infoDispositivo?.perifericos?.impresora?.fechaDeLaUltimaConexion !==
              ""
              ? formatDate(
                  infoDispositivo?.perifericos?.impresora
                    ?.fechaDeLaUltimaConexion,
                )
              : null
          }`}
        />

        <DispositivoContainer
          icon={<ConexionIcon />}
          title={"Conexión a escáner de códigos:"}
          emoji={
            infoDispositivo?.perifericos?.escaner?.conectado === "true" ? (
              <ThumbUpIcon />
            ) : (
              <ThumbDownIcon />
            )
          }
          description={
            infoDispositivo?.perifericos?.escaner?.conectado !== null &&
            infoDispositivo?.perifericos?.escaner?.conectado !== ""
              ? infoDispositivo?.perifericos?.escaner?.conectado === "true"
                ? "Conectado"
                : "No Conectado"
              : null
          }
          date={`Última conexión el  ${formatDate(
            infoDispositivo?.perifericos?.escaner?.fechaDeLaUltimaConexion,
          )}`}
          text2={""}
          description2={""}
        />

        <DispositivoContainer
          icon={<DevIcon />}
          title={"Aplicación:"}
          emoji={
            infoDispositivo?.aplicacion?.enEjecucion === "false" ? (
              <ThumbDownIcon />
            ) : (
              <ThumbUpIcon />
            )
          }
          description={
            infoDispositivo?.aplicacion?.enEjecucion !== null &&
            infoDispositivo?.aplicacion?.enEjecucion !== ""
              ? infoDispositivo?.aplicacion?.enEjecucion === "false"
                ? "No ejecutándose"
                : "Ejecutándose"
              : null
          }
          text2={"Pantalla activa:"}
          description2={
            infoDispositivo?.aplicacion?.pantallaActiva !== null &&
            infoDispositivo?.aplicacion?.pantallaActiva !== ""
              ? infoDispositivo?.aplicacion?.pantallaActiva
              : null
          }
          date={`Última conexión el  ${
            infoDispositivo?.perifericos?.impresora?.fechaDeLaUltimaConexion !==
              null &&
            infoDispositivo?.perifericos?.impresora?.fechaDeLaUltimaConexion !==
              ""
              ? formatDate(
                  infoDispositivo?.perifericos?.impresora
                    ?.fechaDeLaUltimaConexion,
                )
              : null
          }`}
        />
      </Box>
    </Box>
  );
}
