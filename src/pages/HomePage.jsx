import React, { useEffect, useMemo, useState } from "react";
import { Box, ListItem, OrderedList, Text } from "@chakra-ui/react";

import ReceiptIcon from "../../src/assets/images/ReceiptIcon";
import StarIcon from "../../src/assets/images/StarIcon";
import TrophyIcon from "../../src/assets/images/TrophyIcon";
import BoxesIcon from "../../src/assets/images/BoxesIcon";
import PhoneLaptopIcon from "../../src/assets/images/PhoneLaptopIcon";
import TruckIcon from "../../src/assets/images/TruckIcon";
import FileCheckIcon from "../../src/assets/images/FileCheckIcon";
import TshirtIcon from "../../src/assets/images/TshirtIcon";
import GemIcon from "../../src/assets/images/GemIcon";
import ShoppingBagIcon from "../../src/assets/images/ShoppingBagIcon";
import MugIcon from "../../src/assets/images/MugIcon";
import HeadphonesIcon from "../../src/assets/images/HeadphonesIcon";

import Container from "../component/Container";
import TopVitrinaItem from "../component/TopVitrinaItem";
import TopCategoriaItem from "../component/TopCategoriaItem";
import TopProductoItem from "../component/TopProductoItem";
import GreenArrowICon from "../assets/images/GreenArrowIcon";
import VentasMesesAnteriores from "../component/VentasMesesAnteriores";
import TopVitrinasdelMes from "../component/TopVitrinasdelMes";
import ItemsTopVitrinasdelMes from "../component/ItemsTopVitrinasdelMes";
import DispositivosAveriados from "../component/DispositivosAveriados";
import axios from "axios";
import DespachosActuales from "../component/DespachosActuales";
import InventarioXverificar from "../component/InventarioXverificar";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { HEADER_HEIGHT } from "../component/Header";

import { useSelector, useDispatch } from "react-redux";
import {
  setVentaTotalMes,
  setTopCategoriasGlobal,
} from "../store/slices/homePage";

import xmlToJSON from "../services/XmlToJsonConverter";
import homePageData from "../services/homePageData";
import fetchXMLData from "../services/fetchXmlData";

const url = "";

const PADDING = 15;

export default function HomePage() {
  const dispatch = useDispatch();
  const { height } = useWindowDimensions();
  const ventaTotalMes = useSelector(
    (state) => state.homePageReducer.ventaTotalMes,
  );
  const name = useSelector((state) => state.userReducer.userName);

  const [ventasMesesAnteriores, setVentaMesesAnteriores] = useState(null);
  const [VitrinasConMasVtasDelMes, setVitrinasConMasVtasDelMes] =
    useState(null);
  const [labels, setLabels] = useState(null);
  const [dataChart, setDataChart] = useState(null);
  const [topTotalVitrinas, setTopTotalVitrinas] = useState(null);
  const [topTotalCategorias, setTotalCategorias] = useState(null);
  const [topTotalProductos, setTopTotalProductos] = useState(null);
  const [totalDispAver, setTotalDispAv] = useState(null);
  const [totalDespachos, setTotalDespachos] = useState(null);
  const [totalVisitasNoVerif, setTotalVisiasNoVerif] = useState(null);

  useEffect(() => {
    parseData();
    //serverConexion();
  }, []);

  const parseData = () => {
    const resumenInfo = xmlToJSON(homePageData);

    //Ventas del Mes
    const Valor =
      resumenInfo?.datosDeNegocio?.resumenDeNegocio?.ventaTotalMes?.valor[
        "#text"
      ];
    const Porcentaje =
      resumenInfo?.datosDeNegocio?.resumenDeNegocio?.ventaTotalMes
        ?.porcentajeDeCrecimiento["#text"];

    if (Valor && Porcentaje) {
      dispatch(
        setVentaTotalMes({ valor: Valor, porcentajeDeCrecimiento: Porcentaje }),
      );
    }

    //Ventas de Meses Anteriores
    const ventaUltimosMeses =
      resumenInfo?.datosDeNegocio?.resumenDeNegocio?.ventaUltimosMeses;
    if (ventaUltimosMeses && Array.isArray(ventaUltimosMeses.ventaDeMes)) {
      const ventasMesesAnt = ventaUltimosMeses.ventaDeMes;

      const arrVentasMesAnt = ventasMesesAnt.map((venta) => {
        const mes = venta.mes?.["#text"];
        const valor = venta.valor?.["#text"];
        return { mes, valor };
      });
      setVentaMesesAnteriores(arrVentasMesAnt);
    } else {
      setVentaMesesAnteriores([
        "No se encontraron ventas de los últimos meses.",
      ]);
    }

    //Top Vitrinas del Mes
    const TopVitrinasDelMes =
      resumenInfo?.datosDeNegocio?.resumenDeNegocio?.vitrinasConMasVtasDelMes;

    if (TopVitrinasDelMes && Array.isArray(TopVitrinasDelMes.vitrina)) {
      const topVitrinasMes = TopVitrinasDelMes.vitrina;
      const arrLabels = [];
      const arrDataCharts = [];
      const arrTopVitrinasMes = topVitrinasMes.map((vitrina) => {
        const nombre = vitrina.nombre?.["#text"];
        arrLabels.push(nombre.toString());
        const venta = vitrina.venta?.["#text"];
        arrDataCharts.push(+venta.replace(/[\.,]/g, ""));

        return { nombre, venta };
      });
      setVitrinasConMasVtasDelMes(arrTopVitrinasMes);
      setLabels(arrLabels);
      setDataChart(arrDataCharts);
    } else {
      setVitrinasConMasVtasDelMes([
        { nombre: "No se encontraron Vitrinas del Mes" },
      ]);
    }

    // Top Vitrinas
    const TopVitrinas =
      resumenInfo?.datosDeNegocio?.resumenDeNegocio?.vitrinasConMasVtas;
    if (TopVitrinas && Array.isArray(TopVitrinas.vitrina)) {
      const topVitrinas = TopVitrinas.vitrina;

      const arrTopVitrinasMes = topVitrinas.map((vitrina) => {
        const nombre = vitrina.nombre?.["#text"];
        const venta = vitrina.venta?.["#text"];
        return { nombre, venta };
      });
      setTopTotalVitrinas(arrTopVitrinasMes);
    } else {
      setTopTotalVitrinas([{ nombre: "No se encontraron Top de Vitrinas." }]);
    }

    //Top Categorías
    const TopCategorias =
      resumenInfo?.datosDeNegocio?.resumenDeNegocio?.categoriasPopulares;
    if (TopCategorias && Array.isArray(TopCategorias.categoria)) {
      const topCategorias = TopCategorias.categoria;

      const arrTopCategorias = topCategorias.map((categoria) => {
        const nombre = categoria.nombre?.["#text"];
        const porcentaje = categoria.porcentaje?.["#text"];
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
      dispatch(setTopCategoriasGlobal(arrTopCategorias));
    } else {
      setTotalCategorias([{ nombre: "Top de Categorías no encontradas" }]);
    }

    //Top Productos
    const TopProductos =
      resumenInfo?.datosDeNegocio?.resumenDeNegocio?.productosPopulares;
    if (TopProductos && Array.isArray(TopProductos.producto)) {
      const topProductos = TopProductos.producto;

      const arrTopProductos = topProductos.map((producto) => {
        const nombre = producto.nombre?.["#text"];
        const porcentaje = producto.porcentaje?.["#text"];
        return { nombre, porcentaje };
      });
      setTopTotalProductos(arrTopProductos);
    } else {
      setTopTotalProductos([
        { nombre: "No se encontraron  Top de Productos." },
      ]);
    }

    //Dispositivos Averiados
    const DispositivosAveriados =
      resumenInfo?.datosDeNegocio?.actualidad?.dispositivosFallidos;

    if (
      DispositivosAveriados &&
      Array.isArray(DispositivosAveriados.dispositivo)
    ) {
      const topDispositivos = DispositivosAveriados.dispositivo;

      const arrDispositivosAveriados = topDispositivos.map((dispositivo) => {
        const vitrina = dispositivo.vitrina?.["#text"];
        const detalleDeEstado = dispositivo.detalleDeEstado?.["#text"];
        const fechaDelProblema = dispositivo.fechaDelProblema?.["#text"];
        return { vitrina, detalleDeEstado, fechaDelProblema };
      });
      setTotalDispAv(arrDispositivosAveriados);
    } else {
      setTotalDispAv([
        { vitrina: "No se encontraron Dispositivos Averiados." },
      ]);
    }

    // Despachos Actuales
    const DespachosActuales =
      resumenInfo?.datosDeNegocio?.actualidad?.despachosActuales;

    if (DespachosActuales && Array.isArray(DespachosActuales.despacho)) {
      const despachosActuales = DespachosActuales.despacho;

      const arrDespachosActuales = despachosActuales.map((despacho) => {
        const vitrina = despacho.vitrina?.["#text"];
        const fecha = despacho.fecha?.["#text"];
        const cantidadDeProductosDespachados =
          despacho.cantidadDeProductosDespachados?.["#text"];
        return { vitrina, fecha, cantidadDeProductosDespachados };
      });
      setTotalDespachos(arrDespachosActuales);
    } else {
      setTotalDespachos([{ vitrina: "No se encontraron Despachos Actuales." }]);
    }

    // Visitas No Verificadas
    const VisitasNoVerificadas =
      resumenInfo?.datosDeNegocio?.actualidad?.visitasNoVerificadas;

    if (VisitasNoVerificadas && Array.isArray(VisitasNoVerificadas.visita)) {
      const visitasNoVerificadas = VisitasNoVerificadas.visita;

      const arrVisitasNoVerificadas = visitasNoVerificadas.map((visita) => {
        const idVisita = visita.idVisita?.["#text"];
        const fechaHora = visita.fechaHora?.["#text"];
        const asesor = visita.asesor?.["#text"];
        const verificada = visita.verificada?.["#text"];
        const ingresos = visita.ingresos?.["#text"];
        const retiros = visita.retiros?.["#text"];
        const correccionesDeInventario =
          visita.correccionesDeInventario?.["#text"];
        const revertida = visita.revertida?.["#text"];

        return {
          idVisita,
          fechaHora,
          asesor,
          verificada,
          ingresos,
          retiros,
          correccionesDeInventario,
          revertida,
        };
      });
      setTotalVisiasNoVerif(arrVisitasNoVerificadas);
    } else {
      setTotalVisiasNoVerif([
        { asesor: "No se encontraron Visitas No Verificadas." },
      ]);
    }
  };

  const serverConexion = async () => {
    axios({
      method: "get",
      url,
    })
      .then((response) => {})
      .catch((error) => {});
  };

  const ContainerHeight = useMemo(() => {
    return Math.floor((height - HEADER_HEIGHT - PADDING * 5 - 35) / 3);
  }, [height]);

  return (
    <Box
      bg={"mainBg"}
      w={"100%"}
      height={"100%"}
      position="relative"
      flexDir={"column"}
      display={"flex"}
      gap={PADDING + "px"}
      p={PADDING + "px"}
      overflowY={{ base: "hidden", md: "auto" }}
    >
      <Text textStyle={"RobotoTitleSemiBold"} color={"black"}>
        ¡Hola {name}, bienvenido! 👋🏻
      </Text>
      <Box display="grid" gridGap={"1rem"} className="dashboard-grid-container">
        <Container
          height={{ base: "150px", md: ContainerHeight + "px" }}
          minHeight={{ base: "170px", md: "225px" }}
          title={"Ventas del mes"}
          icon={<ReceiptIcon width={"24px"} height={"24px"} />}
          children={
            <Box
              display={"flex"}
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"flex-start"}
              gap={"10px"}
            >
              <Box display={"flex"} alignItems={"center"} flexGrow={1}>
                <Text
                  textStyle={{
                    base: "RobotoSubheadingBold",
                    md: "RobotoeBannerBold",
                  }}
                  color={"black"}
                >
                  {ventaTotalMes != null
                    ? `$ ${ventaTotalMes.valor}`
                    : "No hay información"}
                </Text>
              </Box>
              <Box
                display={{ base: "none", md: "flex" }}
                alignItems={"center"}
                columnGap={"5px"}
              >
                <Text textStyle={"RobotoSubSmall"} color={"success.30"}>
                  {ventaTotalMes != null
                    ? `+ ${ventaTotalMes.porcentajeDeCrecimiento} con respecto al promedio`
                    : "No hay información"}
                </Text>
                <GreenArrowICon />
              </Box>
            </Box>
          }
        />
        <Container
          display={{ base: "none", xl: "block" }}
          height={ContainerHeight + "px"}
          minHeight={"225px"}
          maxW={"450px"}
          title={"Ventas de meses anteriores"}
          icon={<ReceiptIcon width={"1.5rem"} height={"1.5rem"} />}
          children={
            <Box w={"100%"} h={"100%"}>
              <VentasMesesAnteriores
                VentasMesAnterior={
                  ventasMesesAnteriores ? ventasMesesAnteriores : []
                }
              />
            </Box>
          }
        />
        <Container
          height={ContainerHeight + "px"}
          minHeight={{ base: "170px", md: "225px" }}
          title={"Top Vitrinas del Mes"}
          icon={<StarIcon width={"1.5rem"} height={"1.5rem"} />}
          children={
            <Box
              display={"flex"}
              flexDirection={{ base: "column", sm: "row" }}
              w={"100%"}
              h={"100%"}
              justifyContent={"space-betweeen"}
              p={1}
            >
              <ItemsTopVitrinasdelMes
                topVitrinas={
                  VitrinasConMasVtasDelMes ? VitrinasConMasVtasDelMes : []
                }
              />

              <TopVitrinasdelMes
                labels={labels ? labels : []}
                data={dataChart ? dataChart : []}
              />
            </Box>
          }
        />
        <Container
          height={ContainerHeight + "px"}
          minHeight={{ base: "170px", md: "225px" }}
          title={"Top Vitrinas"}
          icon={<TrophyIcon width={"1.5rem"} height={"1.5rem"} />}
          children={
            <OrderedList
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-around"}
              pl={"2rem"}
              gap={"0.300rem"}
              width="100%"
              marginLeft={"0"}
            >
              {topTotalVitrinas?.map((vitrina, index) => (
                <ListItem key={index}>
                  <TopVitrinaItem
                    vitrinaName={vitrina.nombre}
                    vitrinaAmount={vitrina.venta}
                  />
                </ListItem>
              ))}
            </OrderedList>
          }
        />
        <Container
          display={{ base: "none", lg: "block" }}
          height={ContainerHeight + "px"}
          minHeight="225px"
          title={"Top Categorías"}
          icon={<StarIcon width={"1.5rem"} height={"1.5rem"} />}
          heightChildren={"90%"}
          children={
            <Box h={"100%"} display={"flex"} flexWrap={"wrap"} gap={"1rem"}>
              {topTotalCategorias?.map((cat, index) => (
                <TopCategoriaItem
                  key={index}
                  icon={cat.icon}
                  catName={cat.nombre}
                  justifyContent={"flex-start"}
                  flexDirection={{ base: "column", sm: "row" }}
                  flexDirA={"column"}
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
          minHeight="225px"
          title={"Top Productos"}
          icon={<BoxesIcon width={"1.5rem"} height={"1.5rem"} />}
          children={
            <Box
              display={"flex"}
              flexDirection={"column"}
              maxH={"160px"}
              overflowY={"scroll"}
              width="100%"
              className="scroll-wrapper "
            >
              {topTotalProductos?.map((prod, index) => (
                <TopProductoItem
                  key={index}
                  prodName={prod.nombre}
                  prodPercentage={prod.porcentaje}
                />
              ))}
            </Box>
          }
        />
        <Container
          display={{ base: "none", lg: "block" }}
          height={ContainerHeight + "px"}
          minHeight="225px"
          title={"Dispositivos averiados"}
          icon={<PhoneLaptopIcon width={"1.5rem"} height={"1.5rem"} />}
          children={
            <DispositivosAveriados
              listadoDispositivos={totalDispAver ? totalDispAver : []}
            />
          }
        />
        <Container
          display={{ base: "none", lg: "block" }}
          height={ContainerHeight + "px"}
          minHeight="225px"
          title={"Despachos actuales"}
          icon={<TruckIcon width={"1.5rem"} height={"1.5rem"} />}
          children={
            <DespachosActuales
              listaDeDespachos={totalDespachos ? totalDespachos : []}
            />
          }
        />
        <Container
          display={{ base: "none", lg: "block" }}
          height={ContainerHeight + "px"}
          minHeight="225px"
          title={"Inventario pendiente de verificar"}
          icon={<FileCheckIcon width={"1.5rem"} height={"1.5rem"} />}
          children={
            <InventarioXverificar
              visitasNoVerificadas={
                totalVisitasNoVerif ? totalVisitasNoVerif : []
              }
            />
          }
        />
      </Box>
    </Box>
  );
}
