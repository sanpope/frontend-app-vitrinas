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

import xmlToJSON from "../services/XmlToJsonConverter";
import dispositivoData from "../services/dispositivoData";

export default function Dispositivo() {
  const city = useSelector((state) => state.vitrinaReducer.city);
  const name = useSelector((state) => state.vitrinaReducer.name);
  const [infoDispositivo, setInfoDispositivo] = useState(null);

  useEffect(() => {
    parseData();
  }, []);

  const parseData = () => {
    const resumenInfo = xmlToJSON(dispositivoData);
    const datosDispositivo = resumenInfo?.dispositivo;

    const infoDisp = {
      detalleDeEstado: datosDispositivo?.estado?.detalleDeEstado["#text"],
      estado: datosDispositivo?.estado?.estado["#text"],
      fechaConexionDispositivo:
        datosDispositivo?.estado?.fechaDeLaUltimaConexion["#text"],
      bateria: datosDispositivo?.bateria["#text"],
      conectadoAInternet: datosDispositivo?.conInternet?.conectado["#text"],
      fechaConexionInternet:
        datosDispositivo?.conInternet?.fechaDeLaUltimaConexion["#text"],
      impresoraConectada:
        datosDispositivo?.perifericos?.impresora?.conectado["#text"],
      fechaConexionImpresora:
        datosDispositivo?.perifericos?.impresora?.fechaDeLaUltimaConexion[
          "#text"
        ],
      estadoDePapel:
        datosDispositivo?.perifericos?.impresora?.estadoPapel["#text"],
      escanerConectado:
        datosDispositivo?.perifericos?.escaner?.conectado["#text"],
      fechaConexionEscaner:
        datosDispositivo?.perifericos?.escaner?.fechaDeLaUltimaConexion?.[
          "#text"
        ],
      ejecucionApp: datosDispositivo?.app?.ejecucion?.["#text"],
      pantallaActiva: datosDispositivo?.app?.pantallaActiva["#text"],
      fechaConexionApp:
        datosDispositivo?.app?.fechaDeLaUltimaConexion?.["#text"],
    };

    console.log(infoDisp);
    setInfoDispositivo(infoDisp);
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
      <Box display={"flex"} gap={"20px"} flexWrap={"wrap"}>
        <DispositivoContainer
          icon={<MobileIcon />}
          title={"Estado del Dispositivo:"}
          emoji={infoDispositivo?.detalleDeEstado ? <SadFaceIcon /> : null}
          description={infoDispositivo?.estado}
          date={infoDispositivo?.fechaConexionDispositivo}
        />
        <DispositivoContainer
          icon={<WifiIcon />}
          title={"Conexión a internet:"}
          emoji={
            infoDispositivo?.conectadoAInternet === "false" ? (
              <ThumbDownIcon />
            ) : (
              <ThumbUpIcon />
            )
          }
          description={
            infoDispositivo?.conectadoAInternet === "false"
              ? "No conectado"
              : "Conectado"
          }
          date={infoDispositivo?.fechaConexionInternet}
        />
        <DispositivoContainer
          icon={<PrinterIcon />}
          title={"Conexión a impresora:"}
          emoji={
            infoDispositivo?.impresoraConectada === "true" ? (
              <ThumbUpIcon />
            ) : (
              <ThumbDownIcon />
            )
          }
          description={
            infoDispositivo?.impresoraConectada === "true"
              ? "Conectado"
              : "No Conectado"
          }
          text2={"Estado del papel:"}
          description2={infoDispositivo?.estadoDePapel}
          date={infoDispositivo?.fechaConexionImpresora}
        />
        <DispositivoContainer
          icon={<ConexionIcon />}
          title={"Conexión a escáner de códigos:"}
          emoji={
            infoDispositivo?.escanerConectado === "true" ? (
              <ThumbUpIcon />
            ) : (
              <ThumbDownIcon />
            )
          }
          description={
            infoDispositivo?.escanerConectado === "true"
              ? "Conectado"
              : "No Conectado"
          }
          date={infoDispositivo?.fechaConexionEscaner}
        />
        <DispositivoContainer
          icon={<DevIcon />}
          title={"Aplicación:"}
          emoji={
            infoDispositivo?.ejecucionApp === "false" ? (
              <ThumbDownIcon />
            ) : (
              <ThumbUpIcon />
            )
          }
          description={
            infoDispositivo?.ejecucionApp === "false"
              ? "No ejecutándose"
              : "Ejecutándose"
          }
          text2={"Pantalla activa:"}
          description2={infoDispositivo?.pantallaActiva}
          date={infoDispositivo?.fechaConexionApp}
        />
      </Box>
    </Box>
  );
}
