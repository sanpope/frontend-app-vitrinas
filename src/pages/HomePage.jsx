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
  const [output, setOutput] = useState("");

  useEffect(() => {
    savingData();
  }, []);

  const obtenerDatos = async () => {
    try {
      console.log("Intento de obtener datos");

      const respuesta = await fetch(
        "http://localhost:8080/app/rest/negocio/resumen",
        {
          method: "GET",
          headers: {},
        },
      );

      if (respuesta.ok) {
        console.log("Datos recibidos");
        const datos = await respuesta.text();
        console.log(datos);
        return datos;
      } else {
        console.log("Hubo un error, los datos no han podido recibirse");
        return homePageData;
      }
    } catch (error) {
      console.error("Hubo un problema con la solicitud fetch:", error);
      return homePageData;
    }
  };

  const savingData = async () => {
    const url = "http://34.176.231.167:8080/app/rest/negocio/resumen";
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
        },
      })
      .then((response) => {
        const data = response.data;
        setOutput(data); // Guardamos el XML en estado para mostrarlo

        // Parseamos el XML
        const xmlText = response.data;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        vitrinasData(xmlDoc);
        dispatch(setVentaTotalMes(getVentaDelMes(xmlDoc)));
        setVentaMesesAnteriores(getVentaMesesAnteriores(xmlDoc));
        setVitrinasConMasVtasDelMes(getVitrinasVentasMes(xmlDoc));
        setTopTotalVitrinas(getTopVitrinas(xmlDoc));
        setTotalCategorias(getTopCategorias(xmlDoc));
        //dispatch(setTopCategoriasGlobal(getTopCategorias(xmlDoc)));
        setTopTotalProductos(getTopProductos(xmlDoc));
        setTotalDispAv(getDispositivosAveriados(xmlDoc));
        setTotalDespachos(getDespachosActuales(xmlDoc));
        setTotalVisiasNoVerif(getInventarioPorVerificar(xmlDoc));
      })
      .catch((error) => {
        console.error("Error fetching the XML data: ", error);
      });
  };

  const vitrinasData = (xml) => {
    let infoVentaTotalArr = [];
    let vitrinas = xml.querySelector("vitrinas");
    let totalVitrinas = vitrinas.querySelectorAll("vitrina");
    for (let i = 0; i < totalVitrinas.length; i++) {
      let ciudad =
        totalVitrinas[i].getElementsByTagName("ciudad")[0].textContent;
      let nombre =
        totalVitrinas[i].getElementsByTagName("nombre")[0].textContent;

      infoVentaTotalArr.push({
        ciudad: ciudad,
        nombre: nombre,
      });
    }
    return infoVentaTotalArr;
  };

  const getVentaDelMes = (xml) => {
    let resumenDelNegocio = xml.querySelector("resumenDeNegocio");
    let infoTotalVentas = resumenDelNegocio.querySelector("ventaTotalDelMes");

    const porcentajeDeCrecimiento = infoTotalVentas.getElementsByTagName(
      "porcentajeDeCrecimiento",
    )[0].textContent;
    const valor = infoTotalVentas.getElementsByTagName("valor")[0].textContent;

    let total = {
      valor,
      porcentajeDeCrecimiento,
    };

    return total;
  };

  const getVentaMesesAnteriores = (xml) => {
    let infoTotalVentasAnt = [];
    let totalVentasAnt = xml.querySelector("ventaDeUltimosOnceMeses");
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

  const getVitrinasVentasMes = (xml) => {
    let infoTotalVitrinas = [];
    const arrLabels = [];
    const arrDataCharts = [];
    let topVitrinas = xml.querySelector("vitrinasConMasVentasEnElMes");
    let totalVentasVitrinasMes = topVitrinas.querySelectorAll("vitrina");

    for (let i = 0; i < 3; i++) {
      let nombre =
        totalVentasVitrinasMes[i].getElementsByTagName("nombre")[0].textContent;
      arrLabels.push(nombre);

      let venta = new Intl.NumberFormat("es-ES", {
        maximumFractionDigits: 0,
      }).format(
        totalVentasVitrinasMes[i].getElementsByTagName("venta")[0].textContent,
      );

      arrDataCharts.push(venta.replace(/[\.,]/g, ""));
      infoTotalVitrinas.push({
        nombre: nombre,
        venta: venta,
      });
    }

    setLabels(arrLabels);
    setDataChart(arrDataCharts);
    return infoTotalVitrinas;
  };

  const getTopVitrinas = (xml) => {
    let infoTotalVitrinas = [];
    let topVitrinas = xml.querySelector("vitrinasConMasVentas");
    let totalTopVitrinas = topVitrinas.querySelectorAll("vitrina");
    for (let i = 0; i < 3; i++) {
      let nombre =
        totalTopVitrinas[i].getElementsByTagName("nombre")[0].textContent;
      let venta = new Intl.NumberFormat("es-ES", {
        maximumFractionDigits: 0,
      }).format(
        totalTopVitrinas[i].getElementsByTagName("venta")[0].textContent,
      );

      infoTotalVitrinas.push({
        nombre: nombre,
        venta: venta,
      });
    }
    return infoTotalVitrinas;
  };

  const getTopCategorias = (xml) => {
    const totalCategoriasArr = [];
    let categorias = xml.querySelector("categoriasMasPopulares");
    let totalTopCategorias = categorias.querySelectorAll("categoria");

    for (let i = 0; i < totalTopCategorias.length; i++) {
      const nombre =
        totalTopCategorias[i].getElementsByTagName("nombre")[0].textContent;
      const porcentaje =
        totalTopCategorias[i].getElementsByTagName("porcentaje")[0].textContent;
      const iconMap = {
        ropa: <TshirtIcon />,
        artesanias: <MugIcon />,
        joyas: <GemIcon />,
        tecnologia: <HeadphonesIcon />,
      };
      const icon = iconMap[nombre] || <ShoppingBagIcon />;
      totalCategoriasArr.push({ nombre, porcentaje, icon });
    }
    return totalCategoriasArr;
  };

  const getTopProductos = (xml) => {
    const TopProductos = [];
    let productos = xml.querySelector("productosMasPopulares");
    let topProductos = productos.querySelectorAll("producto");

    for (let i = 0; i < topProductos.length; i++) {
      let nombre =
        topProductos[i].getElementsByTagName("nombre")[0].textContent;
      nombre = nombre.toLowerCase();
      nombre = nombre.split(" ");

      for (let i = 0; i < nombre.length; i++) {
        nombre[i] = nombre[i][0].toUpperCase() + nombre[i].substr(1);
      }
      nombre = nombre.join(" ");

      const porcentaje =
        topProductos[i].getElementsByTagName("porcentaje")[0].textContent;
      TopProductos.push({ nombre, porcentaje });
    }
    return TopProductos;
  };

  function formatDate(dateString) {
    const date = new Date(dateString);

    const options = {
      day: "2-digit",
      month: "short", // Mes abreviado
      hour: "numeric", // Esto elimina el cero inicial en las horas
      minute: "2-digit",
      hour12: true, // Para formato 12 horas (AM/PM)
    };

    let formattedDate = date.toLocaleString("es-ES", options);

    // Convertir la inicial del mes a mayúscula
    formattedDate = formattedDate.replace(
      /(\d{2}) (\w{3}),/, // Captura el día y el mes abreviado
      (match, day, month) =>
        `${day}/${month.charAt(0).toUpperCase()}${month.slice(1)},`,
    );

    // Convertir cualquier variación de "a. m." o "p. m." a "AM" o "PM" (quitamos puntos y espacios)
    formattedDate = formattedDate
      .replace(/\s?a\.?\s?m\.?/i, "AM")
      .replace(/\s?p\.?\s?m\.?/i, "PM");

    return formattedDate;
  }

  const getDispositivosAveriados = (xml) => {
    const dispositivosArr = [];
    let dispositivos = xml.querySelector("dispositivosConProblemas");
    let totalDispositivos = dispositivos.querySelectorAll("dispositivo");

    for (let i = 0; i < totalDispositivos.length; i++) {
      const vitrina =
        totalDispositivos[i].getElementsByTagName("vitrina")[0].textContent;
      const detalleDeEstado =
        totalDispositivos[i].getElementsByTagName("detalleDeEstado")[0]
          .textContent;
      let fechaDelProblema =
        totalDispositivos[i].getElementsByTagName("fechaDelProblema")[0]
          .textContent;

      fechaDelProblema = formatDate(fechaDelProblema);

      dispositivosArr.push({
        vitrina,
        detalleDeEstado,
        fechaDelProblema,
      });
    }
    return dispositivosArr;
  };

  const getDespachosActuales = (xml) => {
    const despachosArr = [];
    let despachos = xml.querySelector("despachosActuales");
    let totalDespachos = despachos.querySelectorAll("despacho");

    for (let i = 0; i < totalDespachos.length; i++) {
      const vitrina =
        totalDespachos[i].getElementsByTagName("vitrina")[0].textContent;
      const fecha =
        totalDespachos[i].getElementsByTagName("fecha")[0].textContent;
      const cantidadDeProductosDespachados = totalDespachos[
        i
      ].getElementsByTagName("cantidadDeProductosDespachados")[0].textContent;
      despachosArr.push({
        vitrina,
        fecha,
        cantidadDeProductosDespachados,
      });
    }
    return despachosArr;
  };

  const getInventarioPorVerificar = (xml) => {
    const visitasArr = [];
    let visitas = xml.querySelector("visitasSinVerificar");

    let totalVisitas = visitas.querySelectorAll("visita");

    for (let i = 0; i < totalVisitas.length; i++) {
      const fecha =
        totalVisitas[i].getElementsByTagName("fecha")[0].textContent;

      const vitrina =
        totalVisitas[i].getElementsByTagName("vitrina")[0].textContent;

      const asesor =
        totalVisitas[i].getElementsByTagName("asesor")[0].textContent;

      //ToDo, Verificar la longitud del nombre del asesor y si está vacio asignar N/A

      const ingresos =
        totalVisitas[i].getElementsByTagName("ingresos")[0].textContent;

      const retiros =
        totalVisitas[i].getElementsByTagName("retiros")[0].textContent;

      const correcciones =
        totalVisitas[i].getElementsByTagName("correcciones")[0].textContent;

      visitasArr.push({
        fecha,
        vitrina,
        asesor,
        ingresos,
        retiros,
        correcciones,
      });
    }
    return visitasArr;
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
          title={"Venta del mes"}
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
                    lg: "RobotoeBannerBold",
                  }}
                  color={"black"}
                >
                  ${ventaTotalMes != null ? ` ${ventaTotalMes.valor}` : "0"}
                </Text>
              </Box>
              <Box
                display={{ base: "none", md: "flex" }}
                alignItems={"center"}
                columnGap={"5px"}
              >
                <Text textStyle={"RobotoSubSmall"} color={"success.10"}>
                  {ventaTotalMes != null
                    ? `${ventaTotalMes.porcentajeDeCrecimiento}% con respecto al promedio`
                    : "No se cuenta con información registrada."}
                </Text>
                {ventaTotalMes != null ? <GreenArrowICon /> : null}
              </Box>
            </Box>
          }
        />
        <Container
          display={{ base: "none", xl: "block" }}
          height={ContainerHeight + "px"}
          minHeight={"225px"}
          maxW={"450px"}
          title={"Venta en meses anteriores"}
          icon={<ReceiptIcon width={"1.5rem"} height={"1.5rem"} />}
          children={
            <Box w={"100%"} h={"100%"}>
              <VentasMesesAnteriores
                VentasMesAnterior={
                  ventasMesesAnteriores != null ? ventasMesesAnteriores : null
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
              justifyContent={"center"}
              p={1}
            >
              <ItemsTopVitrinasdelMes
                topVitrinas={
                  VitrinasConMasVtasDelMes ? VitrinasConMasVtasDelMes : null
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
            topTotalVitrinas != null ? (
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
            ) : (
              <Text>
                Información insuficiente para determinar el Top de Vitrinas{" "}
              </Text>
            )
          }
        />
        <Container
          display={{ base: "none", lg: "block" }}
          height={ContainerHeight + "px"}
          minHeight="225px"
          title={"Top Categorías"}
          icon={<StarIcon width={"1.5rem"} height={"1.5rem"} />}
          //heightChildren={"100%"}
          children={
            <>
              {topTotalCategorias != null ? (
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
              ) : (
                <Text>
                  Información insuficiente para determinar el Top de Categorías
                </Text>
              )}
            </>
          }
        />
        <Container
          display={{ base: "none", lg: "block" }}
          height={ContainerHeight + "px"}
          minHeight="225px"
          title={"Top Productos"}
          icon={<BoxesIcon width={"1.5rem"} height={"1.5rem"} />}
          children={
            <>
              {topTotalProductos != null ? (
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
              ) : (
                <Text>
                  Información insuficiente para determinar el Top de Productos
                </Text>
              )}
            </>
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
              listadoDispositivos={totalDispAver ? totalDispAver : null}
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
              listaDeDespachos={totalDespachos ? totalDespachos : null}
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
                totalVisitasNoVerif ? totalVisitasNoVerif : null
              }
            />
          }
        />
      </Box>
    </Box>
  );
}
