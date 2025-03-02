import React, { useEffect, useState } from "react";
import { Box, Text, Toast } from "@chakra-ui/react";
import ConexionIcon from "../assets/images/ConexionIcon";
import DevIcon from "../assets/images/DevIcon";
import MobileIcon from "../assets/images/MobileIcon";
import PrinterIcon from "../assets/images/PrinterIcon";
import SadFaceIcon from "../assets/images/SadFaceIcon";
import ThumbUpIcon from "../assets/images/ThumbUpIcon";
import ThumbDownIcon from "../assets/images/ThumbDownIcon";
import WifiIcon from "../assets/images/WifiIcon";
import DispositivoContainer from "../component/DispositivoContainer";
import DispositivoPendiente from "../component/DispositivoPendiente";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import handleHttpError from "../utils/handleHttpError";

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
  const [dispositivosPendientes, setDispositivosPendientes] = useState(false);
  const [infoDispPend, setInfoDispPend] = useState([]);
  const [selectedCodApp, setSelectedCodApp] = useState(null);

  useEffect(() => {
    savingDispositivoData();
  }, [setDispositivosPendientes]);

  const showGenericError = (msg) => console.log(`Error genérico: ${msg}`);

  const savingDispositivoData = async () => {
    const url = `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina/dispositivo?vitrina=${name}`;

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
        },
      });

      if (response.status === 200) {
        console.log("Datos del dispositivo en xml: ", response.data);
        const xmlDoc = parseData(response.data);
        console.log("datos parseados: ", parseData(xmlDoc));
        setInfoDispositivo(dispositivoData(xmlDoc));
      }
    } catch (error) {
      const handlers = {
        400: () => {
          setDispositivosPendientes(true);
          getDispositivosPendientes();
        },
      };

      const defaultHandler = (errorInfo) => {
        showGenericError(`Ha ocurrido un error: ${errorInfo.message}`);
      };

      handleHttpError(error, handlers, defaultHandler);
    }
  };

  const getDispositivosPendientes = async () => {
    const url = `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina/dispositivo/pendientes?vitrina=${name}`;

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
        },
      });

      if (response.status === 200) {
        const xmlDoc = parseData(response.data);
        const pendientes = dispositivosPendientesData(xmlDoc);
        console.log("Dispositivos Pendientes: ", pendientes);
        setInfoDispPend(pendientes);
      }
    } catch (error) {
      Toast("Ha ocurrido un error, ", error);
    }
  };

  const dispositivoData = (xmlDoc) => {
    const safeGetTextContent = (element) => {
      if (element && element.length > 0) {
        return element[0].textContent;
      }
      return "";
    };

    const dispositivo = {
      aplicacion: {
        enEjecucion: safeGetTextContent(
          xmlDoc.getElementsByTagName("enEjecucion"),
        ),
        pantallaActiva: capitalizeFirstLetter(
          safeGetTextContent(xmlDoc.getElementsByTagName("pantallaActiva")) ||
            "",
        ),
      },
      conexionAInternet: {
        conectado: safeGetTextContent(xmlDoc.getElementsByTagName("conectado")),
        fechaDeLaUltimaConexion: safeGetTextContent(
          xmlDoc.getElementsByTagName("fechaDeLaUltimaConexion"),
        ),
      },
      estado: {
        detalleDeEstado: safeGetTextContent(
          xmlDoc.getElementsByTagName("detalleDeEstado"),
        ),
        estado:
          xmlDoc.getElementsByTagName("estado").length > 1
            ? xmlDoc.getElementsByTagName("estado")[1].textContent
            : "",
      },
      perifericos: {
        escaner: {
          conectado: safeGetTextContent(
            xmlDoc.getElementsByTagName("conexionAEscaner")?.length > 0
              ? xmlDoc
                  .getElementsByTagName("conexionAEscaner")[0]
                  .getElementsByTagName("conectado")
              : [],
          ),
          fechaDeLaUltimaConexion: safeGetTextContent(
            xmlDoc.getElementsByTagName("conexionAEscaner")?.length > 0
              ? xmlDoc
                  .getElementsByTagName("conexionAEscaner")[0]
                  .getElementsByTagName("fechaDeLaUltimaConexion")
              : [],
          ),
        },
        impresora: {
          conectado: safeGetTextContent(
            xmlDoc.getElementsByTagName("conexionAImpresora")?.length > 0
              ? xmlDoc
                  .getElementsByTagName("conexionAImpresora")[0]
                  .getElementsByTagName("conectado")
              : [],
          ),
          estadoPapel: safeGetTextContent(
            xmlDoc.getElementsByTagName("estadoPapel"),
          ),
          fechaDeLaUltimaConexion: safeGetTextContent(
            xmlDoc.getElementsByTagName("conexionAImpresora")?.length > 0
              ? xmlDoc
                  .getElementsByTagName("conexionAImpresora")[0]
                  .getElementsByTagName("fechaDeLaUltimaConexion")
              : [],
          ),
        },
      },
      bateria: safeGetTextContent(xmlDoc.getElementsByTagName("bateria")),
    };
    return dispositivo;
  };

  const dispositivosPendientesData = (xmlDoc) => {
    console.log(xmlDoc);
    const dispositivosElements = xmlDoc?.getElementsByTagName("dispositivo");

    const dispositivos = [];

    for (let i = 0; i < dispositivosElements?.length; i++) {
      const dispositivo = dispositivosElements[i];

      const codApp =
        dispositivo?.getElementsByTagName("codApp")[0]?.textContent || "";
      const nombre =
        dispositivo?.getElementsByTagName("nombre")[0]?.textContent || "";

      dispositivos.push({
        codApp,
        nombre,
      });
    }

    return dispositivos;
  };

  const aprobarSolicitudVinculacion = async (codApp) => {
    try {
      if (!codApp) {
        console.error("No hay código de aplicación disponible");
        return;
      }

      const headers = {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded",
        "codigo-aplicacion": codApp.toString(),
      };
      console.log("Código aprobar solicitud ", codApp.toString());

      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina/dispositivo/vinculacion/solicitud`,
        null,
        { headers },
      );

      if (response.status === 200) {
        Toast("El dispositivo ha sido aprobado!");
        console.log(response.data);
        savingDispositivoData();
        setDispositivosPendientes(false);
      }
    } catch (error) {
      console.error("Error al aprobar solicitud:", error);
      Toast("Ha ocurrido un error al aprobar la solicitud");
    }
  };

  const rechazarSolicitudVinculacion = async (codApp) => {
    try {
      if (!codApp) {
        console.error("No hay código de aplicación disponible");
        return;
      }

      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina/dispositivo/vinculacion/solicitud`,
        {
          headers: {
            Accept: "*/*",
            "codigo-aplicacion": codApp.toString(),
          },
        },
      );

      if (response.status === 200) {
        Toast("El dispositivo ha sido rechazado con éxito!");

        savingDispositivoData();
      }
    } catch (error) {
      console.error("Error al rechazar solicitud:", error);
      Toast("Ha ocurrido un error al rechazar la solicitud");
    }
  };

  const renderSafeDate = (dateString) => {
    if (!dateString) return "No disponible";
    try {
      return formatDate(dateString);
    } catch (error) {
      console.error("Error al formatear fecha:", error);
      return "Formato inválido";
    }
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
        <Text textStyle={"RobotoTitleBold"}>
          Dispositivo{" "}
          {dispositivosPendientes ? "-Solicitudes de vinculación" : ""}
        </Text>
      </Box>

      {dispositivosPendientes ? (
        infoDispPend.length === 0 ? (
          <NoteDispositivo
            text2={"No hay solicitudes de vinculación pendientes!"}
          />
        ) : (
          <Box display={"flex"} gap={7}>
            {infoDispPend.map((dispositivo, index) => (
              <DispositivoPendiente
                key={dispositivo.codApp}
                icon={<MobileIcon />}
                title={dispositivo.nombre}
                onAceptar={() =>
                  aprobarSolicitudVinculacion(dispositivo.codApp)
                }
                onRechazar={() =>
                  rechazarSolicitudVinculacion(dispositivo.codApp)
                }
                minW="200px"
                maxW="250px"
                height="100px"
              />
            ))}
          </Box>
        )
      ) : (
        <>
          {/* {infoDispositivo?.estado?.detalleDeEstado?.length > 0 && (
            <Box w={"100%"}>
              <NoteDispositivo text2={infoDispositivo.estado.detalleDeEstado} />
            </Box>
          )} */}

          {
            <Box
              display="flex"
              w={"100%"}
              borderWidth={1}
              borderColor={"#FFE58F"}
              bg={"#FFFBE6"}
              p="10px"
            >
              <Box display="flex" flexDirection={"column"}>
                <Text></Text> <Text></Text> <Text></Text>
              </Box>
              <Box></Box>
            </Box>
          }

          <Box display={"flex"} gap={"20px"} flexWrap={"wrap"}>
            <DispositivoContainer
              icon={<MobileIcon />}
              title={"Estado del Dispositivo:"}
              emoji={
                infoDispositivo?.estado?.estado === "No operando" ? (
                  <SadFaceIcon />
                ) : null
              }
              description={infoDispositivo?.estado?.estado || "No disponible"}
              date={""}
              text2={""}
              description2={""}
            />

            <DispositivoContainer
              icon={<WifiIcon />}
              title={"Conexión a internet:"}
              emoji={
                infoDispositivo?.conexionAInternet?.conectado === "true" ? (
                  <ThumbUpIcon />
                ) : (
                  <ThumbDownIcon />
                )
              }
              description={
                infoDispositivo?.conexionAInternet?.conectado === "true"
                  ? "Conectado"
                  : "No conectado"
              }
              date={`Última conexión el ${renderSafeDate(
                infoDispositivo?.conexionAInternet?.fechaDeLaUltimaConexion,
              )}`}
              text2={""}
              description2={""}
            />

            <DispositivoContainer
              icon={<PrinterIcon />}
              title={"Conexión a impresora:"}
              emoji={
                infoDispositivo?.perifericos?.impresora?.conectado ===
                "true" ? (
                  <ThumbUpIcon />
                ) : (
                  <ThumbDownIcon />
                )
              }
              description={
                infoDispositivo?.perifericos?.impresora?.conectado === "true"
                  ? "Conectado"
                  : "No Conectado"
              }
              text2={"Estado del papel:"}
              description2={
                infoDispositivo?.perifericos?.impresora?.estadoPapel ||
                "No disponible"
              }
              date={`Última conexión el ${renderSafeDate(
                infoDispositivo?.perifericos?.impresora
                  ?.fechaDeLaUltimaConexion,
              )}`}
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
                infoDispositivo?.perifericos?.escaner?.conectado === "true"
                  ? "Conectado"
                  : "No Conectado"
              }
              date={`Última conexión el ${renderSafeDate(
                infoDispositivo?.perifericos?.escaner?.fechaDeLaUltimaConexion,
              )}`}
              text2={""}
              description2={""}
            />

            <DispositivoContainer
              icon={<DevIcon />}
              title={"Aplicación:"}
              emoji={
                infoDispositivo?.aplicacion?.enEjecucion === "true" ? (
                  <ThumbUpIcon />
                ) : (
                  <ThumbDownIcon />
                )
              }
              description={
                infoDispositivo?.aplicacion?.enEjecucion === "true"
                  ? "Ejecutándose"
                  : "No ejecutándose"
              }
              text2={"Pantalla activa:"}
              description2={
                infoDispositivo?.aplicacion?.pantallaActiva || "No disponible"
              }
              date={""}
            />
          </Box>
        </>
      )}
    </Box>
  );
}
