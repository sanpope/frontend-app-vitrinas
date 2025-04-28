import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useMemo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Container from "../component/Container";
import ScrollContainer from "../component/ScrollContainer";
import LoadingComponent from "../component/LoadingComponent";
import ResumenVentaMesAnterior from "../component/ResumenVentaMesAnterior";
import DistribucionVentas from "../component/DistribucionVentas";
import EvolucionVentaDiaria from "../component/EvolucionVentaDiaria";
import TopCategoriaItem from "../component/TopCategoriaItem";
import ActualizacionesInventario from "../component/ActualizacionesInventario";
import UltimaVenta from "../component/UltimaVenta";
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
import SadFaceIcon from "../assets/images/SadFaceIcon";

import {
  getTiempoInactividad,
  getUltimasVentas,
  getVentasDia,
  getEstadoDispositivo,
  getVentaMesesAnteriores,
  getVentasMes,
  getActualizacionesInventario,
  getEvolucionDiariaVentas,
  getTopCategorias,
  getDistribucionDiaria,
  getProductosPocoStock,
} from "../utils/functions";

import GreenArrowICon from "../assets/images/GreenArrowIcon";
import RedArrowDownIcon from "../assets/images/RedArrowDownIcon";

import MobileIcon from "../assets/images/MobileIcon";
import PocoStock from "../component/PocoStock";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { HEADER_HEIGHT } from "../component/Header";

import axios from "axios";
import ThumbDownIcon from "../assets/images/ThumbDownIcon";
import { getPorcentage } from "../utils/formatting";
import { parseData } from "../utils/xmlParse";
import { BIG_WIDTH, SMALL_WIDTH } from "../component/SideBar";
import colors from "../theme/colors";

const PADDING = 15;

export default function Resumen() {
  const { height, width } = useWindowDimensions();
  const ContainerHeight = useMemo(() => {
    return Math.floor((height - HEADER_HEIGHT - PADDING * 5 - 60) / 3);
  }, [height]);

  const city = useSelector((state) => state.vitrinaReducer.city);
  const name = useSelector((state) => state.vitrinaReducer.name);

  const [inactividad, setInactividad] = useState(null);
  const [prodslUltimasVentas, setProdsUltimasVentas] = useState(null);
  const [totalVentasDia, setTotalVentasDia] = useState(null);
  const [estadoDelDispositivo, setEtadoDelDispositivo] = useState(null);
  const [totalVentasMes, setTotalVentasMes] = useState(null);
  const [totalMesesAnteriores, setTotalMesesAnteriores] = useState(null);
  const [topTotalCategorias, setTotalCategorias] = useState(null);

  const [intervaloDelDia, setIntervaloDelDia] = useState(null);

  const [totalDistribucionVentaDiaria, setTotalDistribucionVentaDiaria] =
    useState(null);
  const [actualizacionesInvNoRev, setActualizacionesInvNoRev] = useState(null);
  const [totalProductosPocoStock, setTotalProductosPocoStock] = useState(null);
  const isDeskMenuOpen = useSelector(
    (state) => state.menuReducer.isDeskMenuOpen,
  );

  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    getResumenInfo(name);
  }, [name]);
  
  const getResumenInfo = async (vitrinaName) => {
    const url = `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina/resumen-de-actividad?nombre=${vitrinaName}`;
  
    try {
      const response = await axios.get(url, {
        headers: {
          Accept: "application/xml",
        },
      });
  
      const xmlDoc = parseData(response.data);
      setInactividad(getTiempoInactividad(xmlDoc));
      setProdsUltimasVentas(getUltimasVentas(xmlDoc));
  
      const { cantidad, porcentajeDeCrecimiento } = getVentasDia(xmlDoc);
      setTotalVentasDia(getPorcentage(cantidad, porcentajeDeCrecimiento));
      setEtadoDelDispositivo(getEstadoDispositivo(xmlDoc));
      setTotalMesesAnteriores(getVentaMesesAnteriores(xmlDoc));
      
      const valorYPorcentajeMes = getVentasMes(xmlDoc);
  
      if (valorYPorcentajeMes.valor === 0 || valorYPorcentajeMes.valor === "0") {
        setTotalVentasMes({
          valor: valorYPorcentajeMes.valor,
          porcentajeDeCrecimiento: 0,
          text: "",
          color: "grey.placeholder"
        });
      } 
      else if (valorYPorcentajeMes.porcentajeDeCrecimiento === "") {
        setTotalVentasMes({
          valor: valorYPorcentajeMes.valor,
          porcentajeDeCrecimiento: "",
          text: "",
          color: "green.100"
        });
      } else {
        setTotalVentasMes(
          getPorcentage(
            valorYPorcentajeMes.valor,
            valorYPorcentajeMes.porcentajeDeCrecimiento,
          )
        );
      }
      
      setActualizacionesInvNoRev(getActualizacionesInventario(xmlDoc));
      setIntervaloDelDia(getEvolucionDiariaVentas(xmlDoc));
      setTotalCategorias(getTopCategorias(xmlDoc));
      setTotalDistribucionVentaDiaria(getDistribucionDiaria(xmlDoc));
      setTotalProductosPocoStock(getProductosPocoStock(xmlDoc));
    } catch (error) {
      console.error("Error fetching XML data:", error);
    }
  };


  const REM_BASE = 16;

  const ContainerWidth = useMemo(() => {
    const sidebarWidth = isSmallScreen
      ? parseInt(SMALL_WIDTH, 10)
      : isDeskMenuOpen
        ? parseInt(BIG_WIDTH, 10)
        : parseInt(SMALL_WIDTH, 10);

    const safetyMargin = 40;
    const gridGapPx = 16;

    if (width > 768) {
      const columnCount = width > 1280 ? 4 : width > 992 ? 3 : 2;
      const availableWidth =
        width - sidebarWidth - (PADDING * 2 + 10) - safetyMargin;

      return Math.floor(
        (availableWidth - gridGapPx * (columnCount - 1)) / columnCount,
      );
    } else if (width > 480) {
      return width - sidebarWidth - (PADDING * 2 + 10) - safetyMargin;
    } else {
      return width - sidebarWidth - PADDING * 2 - 10;
    }
  }, [width, isDeskMenuOpen, isSmallScreen]);

  return (
    <Box
      bg={"mainBg"}
      w={"100%"}
      height={"100%"}
      display={"flex"}
      flexDir={"column"}
      gap={PADDING + "px"}
      p={PADDING + "px"}
      overflowY={"auto"}
      sx={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <Box display={"flex"} flexDir={"column"}>
        <Text textStyle={" RobotoBody"}>
          {name} - {city}
        </Text>
        <Text textStyle={"RobotoTitleBold"}>Resumen</Text>
      </Box>
      <Box
        display={{ base: "flex", md: "grid" }}
        flexDirection={{ base: "column" }}
        gridTemplateColumns={{
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
        gridAutoFlow={"dense"}
        gridGap={"1rem"}
        width={"100%"}
      >
        <Container
          height={ContainerHeight + "px"}
          minHeight={"215px"}
          width={"100%"}
          icon={<AlarmClockIcon />}
          title={"Tiempo de inactividad"}
          children={
            <Box
              h={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text textStyle={"RobotoHeaderBold"} color={"black"}>
                {inactividad != null ? Math.ceil(inactividad) : 0} Hrs.
              </Text>
            </Box>
          }
        />
        <Container
          height={ContainerHeight + "px"}
          minHeight={"215px"}
          width={"100%"}
          icon={<BagsShoppingIcon />}
          title={"Última venta"}
          gridColumnEnd="span 1.8"
          children={
            prodslUltimasVentas === null ? (
              <LoadingComponent />
            ) : (
              <UltimaVenta
                prodslUltimasVentas={
                  prodslUltimasVentas != null ? prodslUltimasVentas : null
                }
              />
            )
          }
        />
        <Container
          height={ContainerHeight + "px"}
          minHeight={"215px"}
          width={"100%"}
          icon={<ShoppingCartIcon />}
          title={"Ventas del día"}
          children={
            totalVentasDia === null ? (
              <LoadingComponent />
            ) : (
              <Box
                h={"100%"}
                display={"flex"}
                flexDir={"column"}
                alignItems={"flex-start"}
              >
                <Box display={"flex"} alignItems={"center"} flexGrow={1}>
                  <Text textStyle={"RobotoHeaderBold"} color={"black"}>
                    {totalVentasDia?.valor || "0"}
                  </Text>
                </Box>

                {totalVentasDia != null &&
                totalVentasDia.porcentajeDeCrecimiento === 0 ? (
                  <Text textStyle={"RobotoBody"} color={"grey.placeholder"}>
                    No se han registrado ventas
                  </Text>
                ) : (
                  <Box display="flex" alignItems="center">
                    <Text
                      textStyle={"RobotoRegular"}
                      color={totalVentasDia?.color || "grey.placeholder"}
                      mr={1}
                    >
                      {totalVentasDia != null &&
                      totalVentasDia.porcentajeDeCrecimiento !== 0
                        ? `${totalVentasDia?.porcentajeDeCrecimiento}% ${totalVentasDia?.text}`
                        : "Sin información."}
                    </Text>
                    {totalVentasDia?.color &&
                    totalVentasDia?.color === "red.100" ? (
                      <RedArrowDownIcon />
                    ) : totalVentasDia?.color &&
                      totalVentasDia?.color !== "red.100" ? (
                      <GreenArrowICon />
                    ) : null}
                  </Box>
                )}
              </Box>
            )
          }
        />
        <Container
          height={ContainerHeight + "px"}
          minHeight={"215px"}
          width={"100%"}
          title={"Estado del Dispositivo"}
          icon={
            <MobileIcon
              width={"40px"}
              fill={
                estadoDelDispositivo === "Ok"
                  ? "#00BC4F"
                  : estadoDelDispositivo === "Operando con dificultades"
                    ? "#FEB220"
                    : estadoDelDispositivo === "No operando"
                      ? "#E60F0F"
                      : colors.black
              }
            />
          }
          children={
            estadoDelDispositivo === null ? (
              <LoadingComponent />
            ) : (
              <Box
                h={"100%"}
                display={"flex"}
                flexDir={"column"}
                justifyContent={"flex-end"}
              >
                <Box
                  display={"flex"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  {estadoDelDispositivo === "Ok" ? (
                    <ThumbUpIcon />
                  ) : estadoDelDispositivo === "Operando con dificultades" ? (
                    <SadFaceIcon />
                  ) : estadoDelDispositivo === "No operando" ? (
                    <ThumbDownIcon />
                  ) : (
                    <></>
                  )}

                  <Box display={"flex"} ml={1}>
                    {estadoDelDispositivo !== "" &&
                    estadoDelDispositivo !== null ? (
                      <Text textStyle={"RobotoBodyBold"}>
                        {estadoDelDispositivo}{" "}
                      </Text>
                    ) : (
                      <Text color={"grey.placeholder"} alignSelf={"flex-end"}>
                        Ninguno vinculado
                      </Text>
                    )}
                  </Box>
                </Box>
              </Box>
            )
          }
        />

        <Container
          height={ContainerHeight + "px"}
          minHeight={"215px"}
          width={"100%"}
          icon={<CalendarAltIcon />}
          title={"Ventas del mes"}
          children={
            totalVentasMes === null ? (
              <LoadingComponent />
            ) : (
              <Box
                h={"100%"}
                display={"flex"}
                flexDir={"column"}
                alignItems={"flex-start"}
              >
                <Box display={"flex"} alignItems={"center"} flexGrow={1}>
                  <Text textStyle={"RobotoHeaderBold"} color={"black"}>
                    ${totalVentasMes != null ? totalVentasMes.valor : 0}
                  </Text>
                </Box>
                
                
                {(totalVentasMes?.valor === 0 || 
                  totalVentasMes?.valor === "0" || 
                  totalVentasMes?.porcentajeDeCrecimiento === 0) ? (
                  <Text textStyle={"RobotoBody"} color={"grey.placeholder"}>
                    No se han registrado ventas
                  </Text>
                ) : totalVentasMes?.porcentajeDeCrecimiento === "" ? (
                  <Box display="flex" alignItems="center">
                    <Text textStyle={"RobotoRegular"} color="green" mr={1}>
                      Por encima del promedio
                    </Text>
                    <GreenArrowICon />
                  </Box>
                ) : (
                  <Box display="flex" alignItems="center">
                    <Text
                      textStyle={"RobotoRegular"}
                      color={totalVentasMes?.color || "grey.placeholder"}
                      mr={1}
                    >
                      {totalVentasMes?.porcentajeDeCrecimiento}% {totalVentasMes?.text || ""}
                    </Text>
                    {totalVentasMes?.color && totalVentasMes?.color === "red.100" ? (
                      <RedArrowDownIcon />
                    ) : (
                      <GreenArrowICon />
                    )}
                  </Box>
                )}
              </Box>
            )
          }
        />
        <Container
          height={ContainerHeight + "px"}
          minHeight={"215px"}
          width={"100%"}
          title={"Ventas meses anteriores"}
          gridColumn={"span 2"}
          icon={<CashRegisterIcon />}
          children={
            <Box w={"100%"} h={"100%"}>
              {totalMesesAnteriores === null ? (
                <LoadingComponent />
              ) : (
                <ResumenVentaMesAnterior
                  resumenVentaMesAnterior={
                    totalMesesAnteriores ? totalMesesAnteriores : []
                  }
                />
              )}
            </Box>
          }
        />
        <Container
          height={ContainerHeight + "px"}
          minHeight={"215px"}
          width={"100%"}
          icon={<FileExclamationIcon />}
          title={`Actualizaciones de inventario`}
          withLineBreaks={true}
          alignItems={"flex-start"}
          children={
            <Box
              w={"100%"}
              h={"100%"}
              display={"flex"}
              justifyContent={"center"}
            >
              {actualizacionesInvNoRev === null ? (
                <LoadingComponent />
              ) : (
                <ActualizacionesInventario
                  actualizacionesInventarioNV={
                    actualizacionesInvNoRev ? actualizacionesInvNoRev : []
                  }
                />
              )}
            </Box>
          }
        />
        <Container
          width={"100%"}
          height={ContainerHeight + "px"}
          minHeight={"215px"}
          title={"Evolución de venta diaria"}
          icon={<BadgeDollarIcon />}
          children={
            <Box w={"100%"} h={"100%"} className="scroll-hidden">
              {intervaloDelDia === null ? (
                <LoadingComponent />
              ) : (
                <EvolucionVentaDiaria evolucionVentaDiaria={intervaloDelDia} />
              )}
            </Box>
          }
        />

        <Container
          height={ContainerHeight + "px"}
          minHeight={"215px"}
          width={"100%"}
          icon={<StartIcon />}
          title={"Top categorías"}
          children={
            topTotalCategorias === null ? (
              <LoadingComponent />
            ) : topTotalCategorias !== null &&
              topTotalCategorias?.length > 0 ? (
              <ScrollContainer>
                {topTotalCategorias?.map((cat, index) => (
                  <TopCategoriaItem
                    key={index}
                    icon={cat.icon}
                    catName={cat.nombre}
                    justifyContent={"space-between"}
                    flexDirA={"row"}
                    flexDirB={"row"}
                    catPercentage={cat.porcentaje}
                  />
                ))}
              </ScrollContainer>
            ) : (
              <Box
                w={"100%"}
                h={"100%"}
                display={"flex"}
                justifyContent={"flex-start"}
                alignItems={"center"}
              >
                <Text color={"grey.placeholder"}>
                  No existe información sobre el ranking
                </Text>
              </Box>
            )
          }
        />

        <Container
          height={ContainerHeight + "px"}
          minHeight={"215px"}
          width={"100%"}
          title={"Distribución diaria de ventas"}
          icon={<ShippingTimed />}
          paddingChildren={0}
          children={
            <>
              {totalDistribucionVentaDiaria === null ? (
                <LoadingComponent />
              ) : (
                <Box display={"flex"} justifyContent={"center"}>
                  <DistribucionVentas
                    distribucionVentas={
                      totalDistribucionVentaDiaria
                        ? totalDistribucionVentaDiaria
                        : []
                    }
                  />
                </Box>
              )}
            </>
          }
        />

        <Container
          height={ContainerHeight + "px"}
          minHeight={"215px"}
          width={"100%"}
          icon={<BoxesIcon />}
          title={"Productos con poco stock"}
          children={
            <Box
              w={"100%"}
              h={"100%"}
              display={"flex"}
              justifyContent={"center"}
            >
              {totalProductosPocoStock === null ? (
                <LoadingComponent />
              ) : (
                <PocoStock productosConPocoStock={totalProductosPocoStock} />
              )}
            </Box>
          }
        />
      </Box>
    </Box>
  );
}
