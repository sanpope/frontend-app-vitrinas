import { Box, ListItem, OrderedList, Text } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "../component/Container";
import ResumenVentaMesAnterior from "../component/ResumenVentaMesAnterior";
import DistribucionVentas from "../component/DistribucionVentas";
import EvolucionVentaDiaria from "../component/EvolucionVentaDiaria";
import TopCategoriaItem from "../component/TopCategoriaItem";
import ActualizacionesInventario from "../component/ActualizacionesInventario";
import CashRegisterIcon from "../assets/images/CashRegisterIcon";
import ShippingTimed from "../assets/images/ShippingTimed";
import BadgeDollarIcon from "../assets/images/BadgeDollarIcon";
import AlarmClockIcon from "../assets/images/AlarmClockIcon";
import BagsShoppingIcon from "../assets/images/BagsShoppingIcon";
import ShoppingCartIcon from "../assets/images/ShoppingCartIcon";
import CalendarAltIcon from "../assets/images/CalendarAltIcon";
import FileExclamationIcon from "../assets/images/FileExclamationIcon";
import StartIcon from "../assets/images/StarIcon";
import BoxesIcon from "../assets/images/BoxesIcon";
import ThumbUpIcon from "../assets/images/ThumbUpIcon";
import topCategorias from "../DummieData/topCategorias";

import MobileIcon from "../assets/images/MobileIcon";
import PocoStock from "../component/PocoStock";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { HEADER_HEIGHT } from "../component/Header";

const PADDING = 15;

export default function Resumen() {
  const city = useSelector((state) => state.vitrinaReducer.city);
  const { height } = useWindowDimensions();

  const Cantidad1 = 1;
  const Producto1 = "Adaptador Universal";
  const Cantidad2 = 3;
  const Producto2 = "Gorra de Colombia";

  const ContainerHeight = useMemo(() => {
    return Math.floor((height - HEADER_HEIGHT - PADDING * 5 - 60) / 3);
  }, [height]);

  return (
    <Box
      bg={"mainBg"}
      w={"100%"}
      height={"100%"}
      display={"flex"}
      flexDir={"column"}
      gap={PADDING + "px"}
      p={PADDING + "px"}
      overflowY={{ base: "hidden", md: "auto" }}
    >
      <Box display={"flex"} flexDir={"column"}>
        <Text textStyle={" RobotoBody"}>{city}</Text>
        <Text textStyle={"RobotoTitleBold"}>Resumen</Text>
      </Box>
      <Box
        display="flex"
        flexWrap={"wrap"}
        gridGap={"1rem"}
        justifyContent={"space-between"}
      >
        <Container
          flex={"1 1 auto"}
          height={ContainerHeight + "px"}
          minHeight="215px"
          icon={<AlarmClockIcon />}
          title={"Tiempo de Inactividad"}
          children={
            <Box
              h={"100%"}
              display={"flex"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Text textStyle={"RobotoeBannerBold"} color={"black"}>
                20 Hrs.
              </Text>
            </Box>
          }
        />
        <Container
          flex={"1 1 auto"}
          height={ContainerHeight + "px"}
          minHeight="215px"
          icon={<BagsShoppingIcon />}
          title={"Última venta"}
          children={
            <Box
              h={"100%"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-between"}
            >
              <Text color={"grey.placeholder"} textAlign={"left"} pl={"19px"}>
                Ayer a las 8:35pm
              </Text>

              <Text textStyle={"RobotoHeaderBold"} color={"black"}>
                $95.000
              </Text>
              <Box display={"flex"} gap={"10px"}>
                <Text color={"black"}>{Cantidad1}</Text>
                <Text color={"grey.placeholder"}>{Producto1}</Text>
              </Box>
              <Box display={"flex"} gap={"10px"}>
                <Text color={"black"}>{Cantidad2}</Text>
                <Text color={"grey.placeholder"}>
                  {Producto2}{" "}
                  <span style={{ color: "#E60F0F" }}>y otros más...</span>
                </Text>
              </Box>
            </Box>
          }
        />
        <Container
          height={ContainerHeight + "px"}
          minHeight="215px"
          flex={"1 1 auto"}
          icon={<ShoppingCartIcon />}
          title={"Ventas del día"}
          children={
            <Box
              h={"100%"}
              display={"flex"}
              flexDir={"column"}
              alignItems={"flex-start"}
            >
              <Box display={"flex"} alignItems={"center"} flexGrow={1}>
                <Text textStyle={"RobotoeBannerBold"} color={"black"}>
                  13
                </Text>
              </Box>

              <Text textStyle={"RobotoSubSmall"} color={"#00BC4F"}>
                +5% por encima del promedio
              </Text>
            </Box>
          }
        />
        <Box
          height={ContainerHeight + "px"}
          minHeight="215px"
          flex={"1 1 auto"}
          bg={"white"}
          borderRadius={"20px"}
          p={3}
          display="flex"
          flexDir={"column"}
          justifyContent={"space-between"}
        >
          <MobileIcon width={"40px"} fill={"#00BC4F"} />
          <Text textStyle={"RobotoBodyBold"}>Estado del Dispositivo</Text>
          <Box display={"flex"} justifyContent={"flex-start"}>
            <ThumbUpIcon /> <Text textStyle={"RobotoBodyBold"}>Ok</Text>
          </Box>
        </Box>
        <Container
          height={ContainerHeight + "px"}
          minHeight="215px"
          flex={"1 1 auto"}
          icon={<CalendarAltIcon />}
          title={"Ventas del mes"}
          children={
            <Box
              h={"100%"}
              display={"flex"}
              flexDir={"column"}
              alignItems={"flex-start"}
            >
              <Box display={"flex"} alignItems={"center"} flexGrow={1}>
                <Text textStyle={"RobotoeBannerBold"} color={"black"}>
                  $905.800
                </Text>
              </Box>

              <Text textStyle={"RobotoSubSmall"} color={"success.30"}>
                +5% por encima del promedio
              </Text>
            </Box>
          }
        />
        <Container
          display={{ base: "none", lg: "block" }}
          height={ContainerHeight + "px"}
          minHeight="215px"
          flex={"1 1 auto"}
          width={"520px"}
          title={"Ventas meses anteriores"}
          icon={<CashRegisterIcon />}
          children={
            <Box w={"100%"}>
              <ResumenVentaMesAnterior />
            </Box>
          }
        />

        <Container
          display={{ base: "none", lg: "block" }}
          height={ContainerHeight + "px"}
          minHeight="215px"
          flex={"1 1 auto"}
          icon={<FileExclamationIcon />}
          title={`Actualizaciones de 
            inventario no revisadas`}
          withLineBreaks={true}
          alignItems={"flex-start"}
          children={<ActualizacionesInventario />}
        />
        <Container
          display={{ base: "none", lg: "block" }}
          height={ContainerHeight + "px"}
          minHeight="215px"
          flex={"1 1 auto"}
          title={"Evolución de venta diaria"}
          icon={<BadgeDollarIcon />}
          children={
            <Box
              w={"97%"}
              maxW={"220px"}
              h={"100%"}
              display={"flex"}
              justifyContent={"center"}
            >
              <EvolucionVentaDiaria />
            </Box>
          }
        />
        <Container
          height={ContainerHeight + "px"}
          minHeight="215px"
          flex={"1 1 auto"}
          icon={<StartIcon />}
          title={"Top Categorías"}
          children={
            <Box w={"100%"} display={"flex"} flexDirection={"column"}>
              {topCategorias.map((cat) => (
                <TopCategoriaItem
                  icon={cat.Icon}
                  catName={cat.nombre}
                  justifyContent={"space-between"}
                  flexDirA={"row"}
                  flexDirB={"row"}
                  catPercentage={cat.porcentaje}
                />
              ))}
            </Box>
          }
        />
        <Container
          display={{ base: "none", lg: "block" }}
          height={ContainerHeight + "px"}
          minHeight="215px"
          flex={"1 1 auto"}
          title={"Distribución diaria de ventas"}
          icon={<ShippingTimed />}
          children={
            <Box
              w={"97%"}
              maxW={"360px"}
              h={"100%"}
              display={"flex"}
              justifyContent={"center"}
            >
              <DistribucionVentas />{" "}
            </Box>
          }
        />
        <Container
          display={{ base: "none", lg: "block" }}
          height={ContainerHeight + "px"}
          minHeight="215px"
          maxW={"450px"}
          flex={"1 1 auto"}
          icon={<BoxesIcon />}
          title={"Productos con poco stock"}
          children={
            <Box
              w={"100%"}
              h={"100%"}
              display={"flex"}
              justifyContent={"center"}
            >
              <PocoStock />
            </Box>
          }
        />
      </Box>
    </Box>
  );
}
