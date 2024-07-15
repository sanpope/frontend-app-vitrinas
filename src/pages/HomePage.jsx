import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import textStyles from "../theme/textStyles";
import colors from "../theme/colors";
import Container from "../component/Container";
import ReceiptIcon from "../../src/assets/images/ReceiptIcon";
import StarIcon from "../../src/assets/images/StarIcon";
import TrophyIcon from "../../src/assets/images/TrophyIcon";
import BoxesIcon from "../../src/assets/images/BoxesIcon";
import PhoneLaptopIcon from "../../src/assets/images/PhoneLaptopIcon";
import TruckIcon from "../../src/assets/images/TruckIcon";
import FileCheckIcon from "../../src/assets/images/FileCheckIcon";
import { useSelector, useDispatch } from "react-redux";
import { setCity } from "../store/slices/vitrina";

import axios from "axios";

import GreenArrowICon from "../assets/images/GreenArrowIcon";
import VentasMesesAnteriores from "../component/VentasMesesAnteriores";
import TopVitrinasdelMes from "../component/TopVitrinasdelMes";

const url = "";

export default function HomePage() {
  //const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const name = useSelector((state) => state.userReducer.userName);
  const [ventasMes, setVentasMes] = useState("22.000.000");

  useEffect(() => {
    serverConexion();
  }, []);

  const serverConexion = async () => {
    axios({
      method: "get",
      url,
    })
      .then((response) => {
        console.log(response.data.groups);
      })
      .catch((error) => {
        console.log("Error fetching data", error);
      });
  };

  const emptyFunction = (cityName) => {
    dispatch(setCity(cityName));
  };

  return (
    <Box
      bg={colors.mainBg}
      w={"100%"}
      height={"100%"}
      position="relative"
      flexDir={"column"}
      display={"flex"}
      gap={"1.5rem"}
      p={"1.5rem"}
      pt={"10px"}
      overflowY={"scroll"}
    >
      <Box>
        <Text textStyle={"RobotoHeaderBold"} color={colors.textBlack}>
          ¡Hola {name}, bienvenido! 👋🏻
        </Text>
      </Box>
      <Box display={"flex"} flexWrap={"wrap"} gap={"1.5rem"}>
        <Container
          width={"1.5rem"}
          height={"1.5rem"}
          title={"Ventas del mes"}
          icon={<ReceiptIcon width={"24px"} height={"24px"} />}
          children={
            <Box
              h={"100%"}
              display={"flex"}
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"flex-start"}
              gap={"10px"}
            >
              <Text textStyle={"RobotoeBanner"} color={colors.textBlack}>
                $ {ventasMes}
              </Text>
              <Box display={"flex"} alignItems={"center"} columnGap={"5px"}>
                <Text textStyle={"RobotoSubSmall"} color={"success.10"}>
                  +5% con respecto al promedio
                </Text>
                <GreenArrowICon />
              </Box>
            </Box>
          }
        />
        <Container
          title={"Ventas de meses anteriores"}
          icon={<ReceiptIcon width={"1.5rem"} height={"1.5rem"} />}
          children={
            <Box>
              <VentasMesesAnteriores />
            </Box>
          }
        />
        <Container
          title={"Top Vitrinas del Mes"}
          icon={
            <StarIcon
              width={"1.5rem"}
              height={"1.5rem"}
              children={<Box></Box>}
            />
          }
        />
        <Container
          title={"Top Vitrinas"}
          icon={
            <TrophyIcon width={"1.5rem"} height={"1.5rem"} children={<></>} />
          }
        />
        <Container
          title={"Top Categorías"}
          icon={
            <StarIcon width={"1.5rem"} height={"1.5rem"} children={<></>} />
          }
        />
        <Container
          title={"Top Productos"}
          icon={
            <BoxesIcon width={"1.5rem"} height={"1.5rem"} children={<></>} />
          }
        />
        <Container
          title={"Dispositivos averiados"}
          icon={
            <PhoneLaptopIcon
              width={"1.5rem"}
              height={"1.5rem"}
              children={<></>}
            />
          }
        />
        <Container
          title={"Despachos actuales"}
          icon={
            <TruckIcon width={"1.5rem"} height={"1.5rem"} children={<></>} />
          }
        />
        <Container
          title={"Inventario pendiente de verificar"}
          icon={
            <FileCheckIcon
              width={"1.5rem"}
              height={"1.5rem"}
              children={<></>}
            />
          }
        />
      </Box>
    </Box>
  );
}
