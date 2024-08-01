import { Box, ListItem, OrderedList, Text } from "@chakra-ui/react";
import React, { useMemo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "../component/Container";
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
import TshirtIcon from "../../src/assets/images/TshirtIcon";
import GemIcon from "../../src/assets/images/GemIcon";
import ShoppingBagIcon from "../../src/assets/images/ShoppingBagIcon";
import MugIcon from "../../src/assets/images/MugIcon";
import HeadphonesIcon from "../../src/assets/images/HeadphonesIcon";

import MobileIcon from "../assets/images/MobileIcon";
import PocoStock from "../component/PocoStock";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { HEADER_HEIGHT } from "../component/Header";

import xmlToJSON from "../services/XmlToJsonConverter";
import resumenData from "../services/resumenData";

const PADDING = 15;

export default function Resumen() {
  const { height } = useWindowDimensions();
  const ContainerHeight = useMemo(() => {
    return Math.floor((height - HEADER_HEIGHT - PADDING * 5 - 60) / 3);
  }, [height]);

  const city = useSelector((state) => state.vitrinaReducer.city);
  const name = useSelector((state) => state.vitrinaReducer.name);
  const TopCategoriasGlobal = useSelector(
    (state) => state.homePageReducer.TopCategoriasGlobal,
  );
  const [inactividad, setInactividad] = useState("");
  const [prodslUltimasVentas, setProdsUltimasVentas] = useState(null);
  const [totalVentasDia, setTotalVentasDia] = useState(null);
  const [estadoDelDispositivo, setEtadoDelDispositivo] = useState(null);
  const [totalVentasMes, setTotalVentasMes] = useState(null);
  const [totalMesesAnteriores, setTotalMesesAnteriores] = useState(null);
  const [intervaloDelDia, setIntervaloDelDia] = useState(null);
  const [labelsEvolucionVD, setLabelsEvolucionVD] = useState(null);
  const [topTotalCategorias, setTotalCategorias] = useState(null);
  const [dataPointsEvolucionVD, setDataPointsEvolucionVD] = useState(null);
  const [totalDistribucionVentaDiaria, setTotalDistribucionVentaDiaria] =
    useState(null);
  const [actualizacionesInvNoRev, setActualizacionesInvNoRev] = useState(null);
  const [totalProductosPocoStock, setTotalProductosPocoStock] = useState(null);

  useEffect(() => {
    parseData();
    //serverConexion();
  }, []);

  const parseData = () => {
    const resumenInfo = xmlToJSON(resumenData);
    console.log(resumenInfo);
    //Tiempo de Inactividad
    const tiempoInactividad =
      resumenInfo?.datosDeVitrina?.actividadReciente?.inactividad?.["#text"];
    setInactividad(tiempoInactividad ? tiempoInactividad : "0");

    //Últimas ventas
    const UltimasVentas =
      resumenInfo?.datosDeVitrina?.actividadReciente?.ultimaVenta;
    if (UltimasVentas) {
      setProdsUltimasVentas({
        fecha: UltimasVentas.fecha?.["#text"],
        valor: UltimasVentas.valor?.["#text"],
        masProductos: UltimasVentas.masProductos?.["#text"],
        prod1: {
          nombre: UltimasVentas?.prod1?.nombre?.["#text"],
          cantidad: UltimasVentas?.prod1?.cantidad?.["#text"],
        },
        prod2: {
          nombre: UltimasVentas?.prod2?.nombre?.["#text"],
          cantidad: UltimasVentas?.prod2?.cantidad?.["#text"],
        },
      });
    } else {
      setProdsUltimasVentas([
        { valor: "No se encontraron Visitas No Verificadas." },
      ]);
    }

    //Ventas del día
    const VentasDelDia =
      resumenInfo?.datosDeVitrina?.actividadReciente?.ventasDelDia;
    if (VentasDelDia) {
      setTotalVentasDia({
        cantidad: VentasDelDia?.cantidad["#text"],
        porcentajeDeCrecimiento: VentasDelDia?.porcentajeDeCrecimiento["#text"],
      });
    }
    //Estado del Dispositivo
    const estadoDispositivo =
      resumenInfo?.datosDeVitrina?.resumenDeVisitas?.estadoDelDispositivo?.[
        "#text"
      ];
    setEtadoDelDispositivo(estadoDispositivo ? estadoDispositivo : "");

    //Ventas del Mes
    const ventasMes =
      resumenInfo?.datosDeVitrina?.actividadGeneral?.ventaMesActual;
    setTotalVentasMes(
      ventasMes
        ? {
            valor: ventasMes?.valor?.["#text"],
            porcentajeDeCrecimiento:
              ventasMes?.porcentajeDeCrecimiento?.["#text"],
          }
        : { valor: "No hay Registros" },
    );

    //Ventas meses anteriores
    const VentaMesesAnteriores =
      resumenInfo?.datosDeVitrina?.actividadGeneral?.ventasDeUltimosMeses;

    if (
      VentaMesesAnteriores &&
      Array.isArray(VentaMesesAnteriores.ventaDeMes)
    ) {
      const ventamesesant = VentaMesesAnteriores.ventaDeMes;

      const arrVentaMesesAnteriores = ventamesesant?.map((venta) => {
        const mes = venta?.mes["#text"];
        const valor = venta?.valor["#text"];
        return { mes, valor };
      });
      setTotalMesesAnteriores(arrVentaMesesAnteriores);
    } else {
      setTotalMesesAnteriores([
        { valor: "No se encontraron Despachos Actuales." },
      ]);
    }

    //Evolucion venta diaria
    const EvolucionDiaria =
      resumenInfo?.datosDeVitrina?.actividadGeneral?.intervalosDelDia;
    const arrDias = [];
    const arrPorc = [];
    if (EvolucionDiaria && Array.isArray(EvolucionDiaria.intervaloDelDia)) {
      const evolucionVentD = EvolucionDiaria.intervaloDelDia;
      const arrayEvolucionDiaria = evolucionVentD.map((venta) => {
        const intervalo = venta?.intervalo?.["#text"];
        arrDias.push(intervalo);
        const porcentajeDeVentas = venta?.porcentajeDeVentas?.["#text"];
        arrPorc.push(porcentajeDeVentas);
        return { intervalo, porcentajeDeVentas };
      });
      setIntervaloDelDia(arrayEvolucionDiaria);
      setLabelsEvolucionVD(arrDias);
      setDataPointsEvolucionVD(arrPorc);
    }

    //Top Categorias

    const TopCategorias =
      resumenInfo?.datosDeVitrina?.actividadGeneral?.categorias;
    if (TopCategorias && Array.isArray(TopCategorias.categoria)) {
      const topCategorias = TopCategorias.categoria;

      const arrTopCategorias = topCategorias.map((categoria) => {
        const nombre = categoria.nombre?.["#text"];
        const porcentaje = categoria.porcentajeDeLasVentas?.["#text"];
        const icon =
          nombre === "Ropa" ? (
            <TshirtIcon />
          ) : nombre === "Artesanías" ? (
            <MugIcon />
          ) : nombre === "Joyas" ? (
            <GemIcon />
          ) : nombre === "Tecnología" ? (
            <HeadphonesIcon />
          ) : (
            <ShoppingBagIcon />
          );
        return { nombre, porcentaje, icon };
      });
      setTotalCategorias(arrTopCategorias);
    } else {
      setTotalCategorias([{ nombre: "Top de Categorías no encontradas" }]);
    }

    // Distribucion diaria de ventas
    const DistribucionDV =
      resumenInfo?.datosDeVitrina?.actividadGeneral?.ventasDeDiasDelMes;
    if (DistribucionDV && Array.isArray(DistribucionDV.ventaDia)) {
      const distrVentaMes = DistribucionDV.ventaDia;

      const arrDistribucionDV = distrVentaMes?.map((ventaDia) => {
        const dia = ventaDia?.dia?.["#text"];
        const valor = ventaDia?.valor?.["#text"];
        return { dia, valor };
      });

      setTotalDistribucionVentaDiaria(arrDistribucionDV);
    } else {
      setTotalDistribucionVentaDiaria([
        { dia: "No se encontraron Despachos Actuales." },
      ]);
    }

    //Actualizaciones de Inventario
    const ActualizacionesInventario =
      resumenInfo?.datosDeVitrina?.resumenDeVisitas?.verificacionesPdtes;
    console.log(ActualizacionesInventario.modificacion);
    if (
      ActualizacionesInventario &&
      Array.isArray(ActualizacionesInventario.modificacion)
    ) {
      const actualNoRev = ActualizacionesInventario.modificacion;

      const arrActualizacionesInventario = actualNoRev?.map((modificacion) => {
        const fechaHora = modificacion?.fechaHora?.["#text"];
        const cantidadProductosIngresados =
          modificacion?.cantidadProductosIngresados?.["#text"];
        const cantidadProductosRetirados =
          modificacion?.cantidadProductosRetirados?.["#text"];
        const cantidadDeCorrecciones =
          modificacion?.cantidadDeCorrecciones?.["#text"];

        return {
          fechaHora,
          cantidadProductosIngresados,
          cantidadProductosRetirados,
          cantidadDeCorrecciones,
        };
      });

      setActualizacionesInvNoRev(arrActualizacionesInventario);
    } else {
      setActualizacionesInvNoRev([
        { fechaHora: "No se encontraron Despachos Actuales." },
      ]);
    }

    //Productos con Poco Stock
    const ProductosPocoStock =
      resumenInfo?.datosDeVitrina?.resumenDeVisitas?.reposicionesUrg;
    console.log(ProductosPocoStock);
    console.log(ProductosPocoStock.reposicionesUrg);
    if (ProductosPocoStock && Array.isArray(ProductosPocoStock.producto)) {
      const prodPcoStock = ProductosPocoStock.producto;

      const arrProductosPocoStock = prodPcoStock?.map((producto) => {
        const nombre = producto?.nombre?.["#text"];
        const existenciasActuales = producto?.existenciasActuales?.["#text"];
        const cantidadMinima = producto?.cantidadMinima?.["#text"];

        return {
          nombre,
          existenciasActuales,
          cantidadMinima,
        };
      });

      setTotalProductosPocoStock(arrProductosPocoStock);
    } else {
      setTotalProductosPocoStock([{ nombre: "No encontrados." }]);
    }
  };

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
        <Text textStyle={" RobotoBody"}>
          {name} - {city}
        </Text>
        <Text textStyle={"RobotoTitleBold"}>Resumen</Text>
      </Box>
      <Box
        display="flex"
        flexWrap={"wrap"}
        gridGap={"1rem"}
        justifyContent={"flex-start"}
      >
        <Container
          flex={"1 1 auto"}
          height={ContainerHeight + "px"}
          minHeight="215px"
          minW={"250px"}
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
                {inactividad} Hrs.
              </Text>
            </Box>
          }
        />
        <Container
          flex={"1 1 auto"}
          height={ContainerHeight + "px"}
          minHeight={"215px"}
          minW={"250px"}
          icon={<BagsShoppingIcon />}
          title={"Última venta"}
          children={
            <UltimaVenta
              fecha={prodslUltimasVentas?.fecha}
              valor={prodslUltimasVentas?.valor}
              Prod1Cant={prodslUltimasVentas?.prod1?.cantidad}
              Prod1Nomb={prodslUltimasVentas?.prod1?.nombre}
              Prod2Cant={prodslUltimasVentas?.prod2?.cantidad}
              Prod2Nomb={prodslUltimasVentas?.prod2?.nombre}
            />
          }
        />
        <Container
          height={ContainerHeight + "px"}
          minHeight="215px"
          minW={"250px"}
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
                  {totalVentasDia?.cantidad}
                </Text>
              </Box>

              <Text textStyle={"RobotoSubSmall"} color={"#00BC4F"}>
                +{totalVentasDia?.porcentajeDeCrecimiento}% por encima del
                promedio
              </Text>
            </Box>
          }
        />
        <Box
          height={ContainerHeight + "px"}
          minHeight={"215px"}
          minW={"250px"}
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
            <ThumbUpIcon />{" "}
            <Text textStyle={"RobotoBodyBold"}>{estadoDelDispositivo}</Text>
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
                  ${totalVentasMes?.valor}
                </Text>
              </Box>

              <Text
                textStyle={"RobotoSubSmall"}
                color={"success.30"}
                display={
                  totalVentasDia?.porcentajeDeCrecimiento !== null
                    ? "flex"
                    : "none"
                }
              >
                +{totalVentasMes?.porcentajeDeCrecimiento}% por encima del
                promedio
              </Text>
            </Box>
          }
        />
        <Container
          display={{ base: "none", xl: "block" }}
          height={ContainerHeight + "px"}
          minHeight="215px"
          flex={"1 1 auto"}
          width={"560px"}
          title={"Ventas meses anteriores"}
          icon={<CashRegisterIcon />}
          children={
            <Box w={"100%"} h={"100%"}>
              <ResumenVentaMesAnterior
                resumenVentaMesAnterior={
                  totalMesesAnteriores ? totalMesesAnteriores : []
                }
              />
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
          children={
            <ActualizacionesInventario
              actualizacionesInventarioNV={
                actualizacionesInvNoRev ? actualizacionesInvNoRev : []
              }
            />
          }
        />
        <Container
          display={{ base: "none", lg: "block" }}
          height={ContainerHeight + "px"}
          minHeight={"215px"}
          minW={"262px"}
          flex={"1 1 auto"}
          title={"Evolución de venta diaria"}
          icon={<BadgeDollarIcon />}
          children={
            <Box w={"100%"} maxW={"220px"} h={"100%"}>
              <EvolucionVentaDiaria
                labels={labelsEvolucionVD}
                dataPoints={dataPointsEvolucionVD}
              />
            </Box>
          }
        />
        <Container
          height={ContainerHeight + "px"}
          minHeight={"215px"}
          minW={"262px"}
          flex={"1 1 auto"}
          icon={<StartIcon />}
          title={"Top Categorías"}
          children={
            <Box w={"100%"} display={"flex"} flexDirection={"column"}>
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
            </Box>
          }
        />
        <Container
          display={{ base: "none", lg: "block" }}
          height={ContainerHeight + "px"}
          minHeight={"215px"}
          minW={"262px"}
          flex={"1 1 auto"}
          maxW={"fit-content"}
          title={"Distribución diaria de ventas"}
          icon={<ShippingTimed />}
          children={
            <Box h={"100%"} display={"flex"} justifyContent={"center"}>
              <DistribucionVentas
                distribucionVentas={
                  totalDistribucionVentaDiaria
                    ? totalDistribucionVentaDiaria
                    : []
                }
              />
            </Box>
          }
        />
        <Container
          display={{ base: "none", lg: "block" }}
          height={ContainerHeight + "px"}
          minHeight={"215px"}
          minW={"262px"}
          maxW={"270px"}
          flex={"1 1 auto"}
          icon={<BoxesIcon />}
          title={"Productos con poco stock"}
          children={
            <Box
              w={"100%"}
              h={"100%"}
              display={"flex"}
              justifyContent={"center"}
              mb={3}
            >
              <PocoStock
                productosConPocoStock={
                  totalProductosPocoStock ? totalProductosPocoStock : []
                }
              />
            </Box>
          }
        />
      </Box>
    </Box>
  );
}
