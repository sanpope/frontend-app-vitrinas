import React from "react";
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

export default function Dispositivo() {
  const city = useSelector((state) => state.vitrinaReducer.city);
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
        <Text textStyle={" RobotoBody"}>{city}</Text>
        <Text textStyle={"RobotoTitleBold"}>Dispositivo</Text>
      </Box>
      <Box display={"flex"} gap={"20px"} flexWrap={"wrap"}>
        <DispositivoContainer
          icon={<MobileIcon />}
          title={"Estado del Dispositivo:"}
          emoji={<SadFaceIcon />}
          description={"Operando con dificultades"}
        />
        <DispositivoContainer
          icon={<WifiIcon />}
          title={"Conexión a internet:"}
          emoji={<ThumbDownIcon />}
          description={"No conectado"}
        />
        <DispositivoContainer
          icon={<PrinterIcon />}
          title={"Conexión a impresora:"}
          emoji={<ThumbUpIcon />}
          description={"Conectado"}
          text2={"Estado del papel:"}
          description2={"Con suficiente papel"}
        />
        <DispositivoContainer
          icon={<ConexionIcon />}
          title={"Conexión a escáner de códigos:"}
          emoji={<ThumbUpIcon />}
          description={"Conectado"}
        />
        <DispositivoContainer
          icon={<DevIcon />}
          title={"Aplicación:"}
          emoji={<ThumbDownIcon />}
          description={"No ejecutándose"}
          text2={"Pantalla activa:"}
          description2={"Nombre de la pantalla"}
        />
      </Box>
    </Box>
  );
}
