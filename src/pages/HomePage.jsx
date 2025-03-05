import React, { useEffect, useMemo, useState } from "react";
import { Box, HStack, Text, useMediaQuery } from "@chakra-ui/react";
import axios from "axios";

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
import { useDispatch, useSelector } from "react-redux";

import Container, { CONTAINER_PADDING } from "../component/Container";
import TopVitrinaItem from "../component/TopVitrinaItem";
import TopCategoriaItem from "../component/TopCategoriaItem";
import TopProductoItem from "../component/TopProductoItem";
import GreenArrowICon from "../assets/images/GreenArrowIcon";
import RedArrowDownIcon from "../assets/images/RedArrowDownIcon";
import VentasMesesAnteriores from "../component/VentasMesesAnteriores";
import TopVitrinasdelMes from "../component/TopVitrinasdelMes";
import ItemsTopVitrinasdelMes from "../component/ItemsTopVitrinasdelMes";
import DispositivosAveriados from "../component/DispositivosAveriados";

import DespachosActuales from "../component/DespachosActuales";
import InventarioXverificar from "../component/InventarioXverificar";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { HEADER_HEIGHT } from "../component/Header";

import { setVentaTotalMes } from "../store/slices/homePage";
import {
  capitalizeFirstLetter,
  formatDate,
  formatearNumero,
  getPorcentage,
} from "../utils/formatting";

import { parseData } from "../utils/xmlParse";
import TopVitrinas from "../component/TopVitrinas";
import useNormalize from "../hooks/useNormalize";
import LoadingComponent from "../component/LoadingComponent";
import { BIG_WIDTH, SMALL_WIDTH } from "../component/SideBar";

export default function HomePage() {
  const normalize = useNormalize();
  const dispatch = useDispatch();
  const { height, width } = useWindowDimensions();
  const ventaTotalMes = useSelector(
    (state) => state.homePageReducer.ventaTotalMes,
  );
  const name = useSelector((state) => state.userReducer.userName);
  const [ventaDelMes, setVentaDelMes] = useState(null);
  const [ventaMesActual, setVentaMesActual] = useState(null);
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

  const isDeskMenuOpen = useSelector(
    (state) => state.menuReducer.isDeskMenuOpen,
  );
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    savingData();
  }, []);

  const savingData = async () => {
    const url = `${process.env.REACT_APP_SERVER_URL}/app/rest/negocio/resumen`;
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
        },
      })
      .then((response) => {
        const xmlDoc = parseData(response.data);
        dispatch(setVentaTotalMes(getVentaDelMes(xmlDoc)));
        const { valor, porcentajeDeCrecimiento } = getVentaDelMes(xmlDoc);
        setVentaDelMes(getPorcentage(valor, porcentajeDeCrecimiento));
        setVentaMesActual(getVentaDelMes(xmlDoc));
        setVentaMesesAnteriores(getVentaMesesAnteriores(xmlDoc));
        setVitrinasConMasVtasDelMes(getVitrinasVentasMes(xmlDoc));
        setTopTotalVitrinas(getTopVitrinas(xmlDoc));
        setTotalCategorias(getTopCategorias(xmlDoc));
        setTopTotalProductos(getTopProductos(xmlDoc));
        setTotalDispAv(getDispositivosAveriados(xmlDoc));
        setTotalDespachos(getDespachosActuales(xmlDoc));
        setTotalVisiasNoVerif(getInventarioPorVerificar(xmlDoc));
      })
      .catch((error) => {
        console.error("Error fetching the XML data: ", error);
      });
  };

  const getVentaDelMes = (xml) => {
    let resumenDelNegocio = xml.querySelector("resumenDeNegocio");
    let infoTotalVentas = resumenDelNegocio.querySelector("ventaTotalDelMes");

    const porcentajeDeCrecimiento = infoTotalVentas.getElementsByTagName(
      "porcentajeDeCrecimiento",
    )[0].textContent;

    let valor = formatearNumero(
      infoTotalVentas.getElementsByTagName("valor")[0].textContent,
    );
    if (valor == 0 || valor.length === 0) {
      valor = 0;
    }
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

      let venta = formatearNumero(
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
      let venta = formatearNumero(
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
      const iconMap = {
        ropa: <TshirtIcon />,
        artesanias: <MugIcon />,
        joyas: <GemIcon />,
        tecnologia: <HeadphonesIcon />,
      };
      let nombre =
        totalTopCategorias[i].getElementsByTagName("nombre")[0].textContent;
      const icon = iconMap[nombre] || <ShoppingBagIcon />;

      const porcentaje =
        totalTopCategorias[i].getElementsByTagName("porcentaje")[0].textContent;

      nombre = capitalizeFirstLetter(nombre);

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

  const ContainerWidth = useMemo(() => {
    const sidebarWidth = isSmallScreen
      ? parseInt(SMALL_WIDTH, 10)
      : isDeskMenuOpen
        ? parseInt(BIG_WIDTH, 10)
        : parseInt(SMALL_WIDTH, 10);

    const safetyMargin = 20;

    if (width > 768) {
      const columnCount = width > 1280 ? 3 : 2;
      const availableWidth =
        width - sidebarWidth - CONTAINER_PADDING * 2 - safetyMargin;

      return Math.floor(
        (availableWidth - 16 * (columnCount - 1)) / columnCount,
      );
    } else {
      return width - sidebarWidth - CONTAINER_PADDING * 2 - safetyMargin;
    }
  }, [width, isDeskMenuOpen, isSmallScreen]);

  const ContainerHeight = useMemo(() => {
    const result = Math.floor(
      (height - normalize(1) - HEADER_HEIGHT - CONTAINER_PADDING * 5 - 35) / 3,
    );

    return result;
  }, [height]);

  return (
    <Box
      bg={"mainBg"}
      w={"100%"}
      height={"100%"}
      position="relative"
      flexDir={"column"}
      display={"flex"}
      gap={{
        base: CONTAINER_PADDING - 3 + "px",
        md: CONTAINER_PADDING - 2 + "px",
        lg: CONTAINER_PADDING + "px",
      }}
      p={{
        base: CONTAINER_PADDING / 2 + "px",
        md: CONTAINER_PADDING + "px",
      }}
      boxSizing="border-box"
      overflow="hidden"
    >
      <Text textStyle={"RobotoTitleSemiBold"} color={"black"}>
        ¡Hola {name}, bienvenido! 👋🏻
      </Text>
      <Box
        display="grid"
        gridTemplateColumns={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
          xl: "repeat(3, 1fr)",
        }}
        gridGap={"1rem"}
        className="dashboard-grid-container"
        overflow={{ base: "auto", xl: "hidden" }}
        maxHeight={{ base: "none", xl: "100%" }}
      >
        <Container
          height={ContainerHeight + "px"}
          width={{ base: "100%", lg: ContainerWidth + "px" }}
          maxWidth={{ base: "100%", lg: "none" }}
          title={"Venta del mes"}
          icon={<ReceiptIcon width={"26px"} height={"27px"} />}
          children={
            <Box
              width={"100%"}
              display={"flex"}
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={ventaDelMes === null ? "center" : "flex-start"}
              gap={"10px"}
            >
              {ventaDelMes === null ? (
                <LoadingComponent />
              ) : (
                <>
                  <Box display={"flex"} alignItems={"center"} flexGrow={1}>
                    <Text
                      textStyle={{
                        base: "RobotoSubheadingBold",
                        lg: "RobotoeBannerBold",
                      }}
                      color={"black"}
                    >
                      $ {ventaDelMes != null ? `${ventaDelMes.valor}` : "0"}
                    </Text>
                  </Box>
                  <Box display={"flex"} alignItems={"center"} columnGap={"5px"}>
                    <HStack display={"flex"}>
                      <Text
                        textStyle={"RobotoSubSmall"}
                        color={`${ventaDelMes?.color}` || "grey.placeholder"}
                      >
                        {ventaDelMes != null ? (
                          `${ventaDelMes?.porcentajeDeCrecimiento}% ${ventaDelMes?.text}`
                        ) : (
                          <Text color={"grey.placeholder"}>
                            Sin ventas registradas.
                          </Text>
                        )}
                      </Text>
                    </HStack>
                    <Text>
                      {ventaDelMes != null &&
                      ventaDelMes?.color === "red.100" ? (
                        <RedArrowDownIcon />
                      ) : ventaDelMes != null &&
                        ventaDelMes?.color !== "red.100" ? (
                        <GreenArrowICon />
                      ) : null}
                    </Text>
                  </Box>
                </>
              )}
            </Box>
          }
        />
        <Container
          height={ContainerHeight + "px"}
          width={{ base: "100%", lg: ContainerWidth + "px" }}
          heightChildren={"90%"}
          title={"Venta en meses anteriores"}
          icon={<ReceiptIcon width={"26px"} height={"27px"} />}
          children={
            <Box width={"100%"} height={"100%"}>
              {ventasMesesAnteriores === null || ventaMesActual === null ? (
                <LoadingComponent />
              ) : (
                <VentasMesesAnteriores
                  VentasMesAnterior={
                    ventasMesesAnteriores != null ? ventasMesesAnteriores : []
                  }
                  ventaMesActual={ventaMesActual != null ? ventaMesActual : {}}
                />
              )}
            </Box>
          }
        />
        <Container
          height={ContainerHeight + "px"}
          width={{ base: "100%", lg: ContainerWidth + "px" }}
          heightChildren={"100%"}
          title={"Top vitrinas del mes"}
          icon={<StarIcon />}
          children={
            <>
              {VitrinasConMasVtasDelMes === null ? (
                <LoadingComponent />
              ) : (
                <Box
                  display={"flex"}
                  flexDirection={{ base: "column", sm: "row" }}
                  w={"100%"}
                  h={"100%"}
                  justifyContent={{
                    base: "center",
                    lg: "space-around",
                  }}
                  gap={{ base: "0.5rem", lg: "1.2rem" }}
                  p={1}
                  overflow={"hidden"}
                >
                  <ItemsTopVitrinasdelMes
                    topVitrinas={
                      VitrinasConMasVtasDelMes !== null
                        ? VitrinasConMasVtasDelMes
                        : null
                    }
                  />

                  <TopVitrinasdelMes
                    labels={labels !== null ? labels : null}
                    data={dataChart !== null ? dataChart : null}
                  />
                </Box>
              )}
            </>
          }
        />
        <Container
          height={ContainerHeight + "px"}
          width={{ base: "100%", lg: ContainerWidth + "px" }}
          heightChildren={"100%"}
          title={"Top vitrinas"}
          icon={<TrophyIcon width={"1.5rem"} height={"1.5rem"} />}
          children={
            topTotalVitrinas === null ? (
              <LoadingComponent />
            ) : topTotalVitrinas != null ? (
              <Box w={"100%"} display={"flex"} overflow={"hidden"}>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={{
                    base: "center",
                    lg: "space-around",
                  }}
                  gap={{ base: "0.5rem", lg: "1.2rem" }}
                  width="100%"
                >
                  {topTotalVitrinas?.map((vitrina, index) => (
                    <TopVitrinaItem
                      index={index}
                      vitrinaName={vitrina.nombre}
                      vitrinaAmount={vitrina.venta}
                    />
                  ))}
                </Box>
                <TopVitrinas
                  topVitrinas={topTotalVitrinas ? topTotalVitrinas : null}
                />
              </Box>
            ) : (
              <Box
                width={"100%"}
                height={"100%"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"flex-start"}
              >
                <Text color={"grey.placeholder"}>Sin información.</Text>
              </Box>
            )
          }
        />
        <Container
          height={ContainerHeight + "px"}
          width={{ base: "100%", lg: ContainerWidth + "px" }}
          heightChildren={"100%"}
          minHeight="225px"
          title={"Top categorías"}
          icon={<StarIcon width={"1.5rem"} height={"1.5rem"} />}
          paddingChildren={topTotalCategorias != null ? 0 : 1}
          children={
            <>
              {topTotalCategorias === null ? (
                <LoadingComponent />
              ) : topTotalCategorias != null ? (
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  maxH={"160px"}
                  overflowY={"scroll"}
                  w={"100%"}
                  className="scroll-wrapper"
                >
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
                <Box
                  width={"100%"}
                  height={"85%"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  flex={1}
                >
                  <Text color={"grey.placeholder"}>
                   Sin información.
                  </Text>
                </Box>
              )}
            </>
          }
        />
        <Container
          height={ContainerHeight + "px"}
          width={{ base: "100%", lg: ContainerWidth + "px" }}
          minHeight="225px"
          title={"Top productos"}
          icon={<BoxesIcon width={"1.5rem"} height={"1.5rem"} />}
          heightChildren={topTotalProductos != null ? "auto" : "100%"}
          paddingChildren={topTotalProductos != null ? 1 : 0}
          children={
            <>
              {topTotalProductos === null ? (
                <LoadingComponent />
              ) : topTotalProductos != null ? (
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  maxH={"160px"}
                  overflowY={"scroll"}
                  w={"100%"}
                  className="scroll-wrapper"
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
                <Box
                  width={"100%"}
                  height={"85%"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  flex={1}
                >
                  <Text color={"grey.placeholder"}>
                    Sin información.
                  </Text>
                </Box>
              )}
            </>
          }
        />
        <Container
          height={ContainerHeight + "px"}
          width={{ base: "100%", lg: ContainerWidth + "px" }}
          minHeight="225px"
          title={"Dispositivos averiados"}
          icon={<PhoneLaptopIcon width={"25px"} height={"25px"} />}
          heightChildren={totalDispAver != null ? "auto" : "100%"}
          paddingChildren={totalDispAver != null ? 0 : 1}
          children={
            <>
              {totalDispAver === null ? (
                <LoadingComponent />
              ) : totalDispAver !== null ? (
                <DispositivosAveriados listadoDispositivos={totalDispAver} />
              ) : (
                <Box
                  width={"100%"}
                  height={"85%"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  flex={1}
                >
                  <Text color={"grey.placeholder"}>
                    Sin información.
                  </Text>
                </Box>
              )}
            </>
          }
        />
        <Container
          height={ContainerHeight + "px"}
          width={{ base: "100%", lg: ContainerWidth + "px" }}
          minHeight="225px"
          title={"Despachos actuales"}
          icon={<TruckIcon width={"25px"} height={"25px"} />}
          heightChildren={totalDespachos != null ? "auto" : "100%"}
          paddingChildren={totalDespachos != null ? 0 : 1}
          children={
            <>
              {totalDespachos === null ? (
                <LoadingComponent />
              ) : totalDespachos !== null ? (
                <DespachosActuales listaDeDespachos={totalDespachos} />
              ) : (
                <Box
                  width={"100%"}
                  height={"85%"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  flex={1}
                >
                  <Text color={"grey.placeholder"}>
                   Sin información.
                  </Text>
                </Box>
              )}
            </>
          }
        />
        <Container
          height={ContainerHeight + "px"}
          width={{ base: "100%", lg: ContainerWidth + "px" }}
          minHeight="225px"
          title={"Inventario pendiente de verificar"}
          icon={<FileCheckIcon />}
          heightChildren={totalVisitasNoVerif != null ? "auto" : "100%"}
          paddingChildren={totalVisitasNoVerif != null ? 1 : 0}
          children={
            <>
              {totalVisitasNoVerif === null ? (
                <LoadingComponent />
              ) : totalVisitasNoVerif !== null ? (
                <Box w={"100%"}>
                  <InventarioXverificar
                    visitasNoVerificadas={totalVisitasNoVerif}
                  />
                </Box>
              ) : (
                <Box
                  width={"100%"}
                  height={"85%"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  flex={1}
                >
                  <Text color={"grey.placeholder"}>
                   Sin información
                  </Text>
                </Box>
              )}
            </>
          }
        />
      </Box>
    </Box>
  );
}
