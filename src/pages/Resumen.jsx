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

import axios from "axios";
import ThumbDownIcon from "../assets/images/ThumbDownIcon";
import {
  formatString,
  formatDate,
  convertirFecha,
  capitalizeFirstLetter,
  formatearNumero,
} from "../utils/formatting";
import { parseData } from "../utils/xmlParse";

const PADDING = 15;

export default function Resumen() {
  const { height } = useWindowDimensions();
  const ContainerHeight = useMemo(() => {
    return Math.floor((height - HEADER_HEIGHT - PADDING * 5 - 60) / 3);
  }, [height]);

  const city = useSelector((state) => state.vitrinaReducer.city);
  const name = useSelector((state) => state.vitrinaReducer.name);

  const [inactividad, setInactividad] = useState("");
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
      setTotalVentasDia(getVentasDia(xmlDoc));
      setEtadoDelDispositivo(getEstadoDispositivo(xmlDoc));
      setTotalMesesAnteriores(getVentaMesesAnteriores(xmlDoc));
      setTotalVentasMes(getVentasMes(xmlDoc));
      setActualizacionesInvNoRev(getActualizacionesInventario(xmlDoc));
      setIntervaloDelDia(getEvolucionDiariaVentas(xmlDoc));
      setTotalCategorias(getTopCategorias(xmlDoc));
      setTotalDistribucionVentaDiaria(getDistribucionDiaria(xmlDoc));
      getProductosPocoStock(xmlDoc);
    } catch (error) {
      console.error("Error fetching XML data:", error);
    }
  };

  const getTiempoInactividad = (xml) => {
    const resumenActividad = xml.querySelector("resumenDeActividadReciente");
    const inactividad =
      resumenActividad.getElementsByTagName("inactividad")[0].textContent;
    return inactividad?.length ? inactividad : null;
  };

  const getUltimasVentas = (xml) => {
    const actividadReciente = xml.querySelector("resumenDeActividadReciente");
    let valor = formatearNumero(
      actividadReciente?.getElementsByTagName("valor")[0].textContent,
    );
    let fecha = formatDate(
      actividadReciente?.getElementsByTagName("fecha")[0].textContent,
    );
    let masProductos =
      actividadReciente?.getElementsByTagName("masProductos")[0].textContent;
    let producto1 = actividadReciente?.querySelector("producto1");
    let producto2 = actividadReciente?.querySelector("producto2");

    let prod1 = {
      nombre: formatString(
        producto1?.getElementsByTagName("nombre")[0].textContent,
      ),
      cantidad: producto1?.getElementsByTagName("cantidad")[0].textContent,
    };

    let prod2 = {
      nombre: formatString(
        producto2?.getElementsByTagName("nombre")[0].textContent,
      ),
      cantidad: producto2?.getElementsByTagName("cantidad")[0].textContent,
    };

    return { valor, fecha, masProductos, prod1, prod2 };
  };

  const getVentasDia = (xml) => {
    const resumenActividad = xml.querySelector("resumenDeActividadReciente");
    let ventasDelDia = resumenActividad.querySelector("ventasDelDia");
    let cantidad = ventasDelDia.getElementsByTagName("cantidad")[0].textContent;
    let porcentajeDeCrecimiento =
      ventasDelDia.getElementsByTagName("porcentajeDeCrecimiento")[0]
        .textContent / 100;
    return { cantidad, porcentajeDeCrecimiento };
  };

  const getEstadoDispositivo = (xml) => {
    const estaVitrina = xml.querySelector("sobreEstaVitrina");
    const estadoDispositivo = estaVitrina.getElementsByTagName(
      "estadoDelDispositivo",
    )[0].textContent;
    return estadoDispositivo;
  };

  const getVentasMes = (xml) => {
    const ventasDelMes = xml.querySelector("ventaDelMes");
    let porcentajeDeCrecimiento =
      ventasDelMes.getElementsByTagName("porcentajeDeCrecimiento")[0]
        .textContent / 100;
    let valor = formatearNumero(
      ventasDelMes.getElementsByTagName("valor")[0].textContent,
    );

    return { valor, porcentajeDeCrecimiento };
  };

  const getVentaMesesAnteriores = (xml) => {
    let infoTotalVentasAnt = [];
    let totalVentasAnt = xml.querySelector("ventasDeUltimosMeses");
    let totalVentasArr = totalVentasAnt.querySelectorAll("ventaDeMes");
    for (let i = 0; i < totalVentasArr.length; i++) {
      let mes = totalVentasArr[i].getElementsByTagName("mes")[0].textContent;
      let valor =
        totalVentasArr[i].getElementsByTagName("valor")[0].textContent;
      infoTotalVentasAnt.push({
        mes: mes,
        valor: valor,
      });
    }
    return infoTotalVentasAnt;
  };

  const getActualizacionesInventario = (xml) => {
    let actualizacionesInventarioArr = [];
    const actualizacionesInventario = xml.querySelector(
      "modificacionesDeInventarioNoRevisadas",
    );
    const modificaciones =
      actualizacionesInventario.querySelectorAll("modificacion");

    for (let i = 0; i < modificaciones.length; i++) {
      const fechaHora = modificaciones[i].getAttribute("fechaHora");
      const { fecha, hora } = convertirFecha(fechaHora);
      const cantidadProductosIngresados = modificaciones[
        i
      ].getElementsByTagName("cantidadProductosIngresados")[0].textContent;
      const cantidadProductosRetirados = modificaciones[i].getElementsByTagName(
        "cantidadProductosRetirados",
      )[0].textContent;
      const cantidadDeCorrecciones = modificaciones[i].getElementsByTagName(
        "cantidadDeCorrecciones",
      )[0].textContent;

      actualizacionesInventarioArr.push({
        fecha,
        hora,
        cantidadProductosIngresados,
        cantidadProductosRetirados,
        cantidadDeCorrecciones,
      });
    }

    return actualizacionesInventarioArr;
  };

  const getEvolucionDiariaVentas = (xml) => {
    let infoTotalVentasDia = [];
    let totalVentasDia = xml.querySelector("ventasDeDiasDelMes");
    let totalVentasArr = totalVentasDia.querySelectorAll("ventaDia");
    for (let i = 0; i < totalVentasArr.length; i++) {
      let dia = totalVentasArr[i].getElementsByTagName("dia")[0].textContent;
      let valor =
        totalVentasArr[i].getElementsByTagName("valor")[0].textContent;
      infoTotalVentasDia.push({
        dia: dia,
        valor: valor,
      });
    }
    return infoTotalVentasDia;
  };

  const getTopCategorias = (xml) => {
    const totalCategoriasArr = [];
    let categorias = xml.querySelector("categoriasMasPopulares");
    let totalTopCategorias = categorias.querySelectorAll("categoria");

    for (let i = 0; i < totalTopCategorias.length; i++) {
      const iconMap = {
        ropa: <TshirtIcon />,
        artesanias: <MugIcon />,
        joyas: <GemIcon />,
        tecnologia: <HeadphonesIcon />,
      };
      let nombre =
        totalTopCategorias[i].getElementsByTagName("nombre")[0].textContent;
      const icon = iconMap[nombre] || <ShoppingBagIcon />;

      const porcentaje = totalTopCategorias[i].getElementsByTagName(
        "porcentajeDeLasVentas",
      )[0].textContent;

      if (nombre === "") {
        nombre = "Otros";
      }

      nombre = capitalizeFirstLetter(nombre);

      totalCategoriasArr.push({ nombre, porcentaje, icon });
    }
    return totalCategoriasArr;
  };

  const getDistribucionDiaria = (xml) => {
    let infoTotalDistribucion = [];
    let totalDistribucion = xml.querySelector("porcentajeDeIntervalos");
    let distribucionesVentasArr =
      totalDistribucion.querySelectorAll("intervaloDelDia");
    for (let i = 0; i < distribucionesVentasArr.length; i++) {
      let hora =
        distribucionesVentasArr[i].getElementsByTagName("intervalo")[0]
          .textContent;
      switch (hora) {
        case "0a5":
          hora = "0-6am";
          break;
        case "5a10":
          hora = "6-10am";
          break;
        case "10a15":
          hora = "10-1pm";
          break;
        case "15a20":
          hora = "1-8pm";
          break;
        case "20a24":
          hora = "8-12pm";
          break;
        default:
          break;
      }
      let valor = Math.trunc(
        distribucionesVentasArr[i].getElementsByTagName("porcentajeDeVentas")[0]
          .textContent,
      );
      infoTotalDistribucion.push({
        hora: hora,
        valor: valor,
      });
    }
    return infoTotalDistribucion;
  };

  const getProductosPocoStock = (xml) => {
    const totalProdsPocoStockArr = [];
    const prodsPocoStock = xml.querySelector("productosConPocoStock");
    const productos = prodsPocoStock.querySelectorAll("producto");
    if (productos.length > 0) {
      for (let i = 0; i < productos.length; i++) {
        const nombre = productos?.[i].getElementsByTagName("")[0].textContent;
        const existenciasActuales =
          productos?.[i].getElementsByTagName("")[0].textContent;
        const cantidadMinima =
          productos?.[i].getElementsByTagName("")[0].textContent;
        totalProdsPocoStockArr.push({
          nombre,
          existenciasActuales,
          cantidadMinima,
        });
      }
      return totalProdsPocoStockArr;
    } else {
      return null;
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
                {inactividad != null ? inactividad : 0} Hrs.
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
            {estadoDelDispositivo === "Ok" ? (
              <ThumbUpIcon />
            ) : (
              <ThumbDownIcon />
            )}
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
            <Box w={"100%"} h={"100%"} flexGrow={1} flexShrink={1}>
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
          maxW={"220px"}
          flex={"1 1 auto"}
          title={"Evolución de venta diaria"}
          icon={<BadgeDollarIcon />}
          children={
            <Box w={"600px"} overflowX={"scroll"} h={"100%"}>
              <EvolucionVentaDiaria evolucionVentaDiaria={intervaloDelDia} />
            </Box>
          }
        />

        <Container
          height={ContainerHeight + "px"}
          minHeight={"215px"}
          maxW={"262px"}
          flex={"1 1 auto"}
          icon={<StartIcon />}
          title={"Top Categorías"}
          children={
            <Box w={"100%"} display={"flex"} flexDirection={"column"} gap={1}>
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
                  totalProductosPocoStock ? totalProductosPocoStock : null
                }
              />
            </Box>
          }
        />
      </Box>
    </Box>
  );
}
