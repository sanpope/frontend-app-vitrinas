import React, { useEffect, useMemo, useState } from "react";
import { Box, ListItem, OrderedList, Text } from "@chakra-ui/react";

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
import topVitrinas from "../DummieData/topVitrinas";
import TopVitrinaItem from "../component/TopVitrinaItem";
import topCategorias from "../DummieData/topCategorias";
import TopCategoriaItem from "../component/TopCategoriaItem";
import topProductos from "../DummieData/topProductos";
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

const url = "";

const PADDING = 15;

export default function HomePage() {
  //const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const { height } = useWindowDimensions();

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

  const ContainerHeight = useMemo(() => {
    return Math.floor((height - HEADER_HEIGHT - (PADDING * 5) - 35) / 3);
  }, [height])

  return (
    <Box
      bg={colors.mainBg}
      w={"100%"}
      height={"100%"}
      position="relative"
      flexDir={"column"}
      display={"flex"}
      gap={PADDING + "px"}
      p={PADDING + "px"}
      overflowY={"auto"}
    >
      <Text textStyle={"RobotoTitleSemiBold"} color={colors.textBlack}>
        ¡Hola {name}, bienvenido! 👋🏻
      </Text>
      <Box display="grid" gridGap={"1rem"} className="dashboard-grid-container">
        <Container
          height={ContainerHeight + "px"}
          minHeight="225px"
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
              <Text textStyle={"RobotoeBannerBold"} color={"black"}>
                $ {ventasMes}
              </Text>
              <Box display={"flex"} alignItems={"center"} columnGap={"5px"}>
                <Text textStyle={"RobotoSubSmall"} color={"success.30"}>
                  +50% con respecto al promedio
                </Text>
                <GreenArrowICon />
              </Box>
            </Box>
          }
        />
        <Container
          height={ContainerHeight + "px"}
          minHeight="225px"
          title={"Ventas de meses anteriores"}
          icon={<ReceiptIcon width={"1.5rem"} height={"1.5rem"} />}
          children={<VentasMesesAnteriores />}
        />
        <Container
          height={ContainerHeight + "px"}
          minHeight="225px"
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
              <ItemsTopVitrinasdelMes />

              <TopVitrinasdelMes />
            </Box>
          }
        />
        <Container
          height={ContainerHeight + "px"}
          minHeight="225px"
          title={"Top Vitrinas"}
          icon={<TrophyIcon width={"1.5rem"} height={"1.5rem"} />}
          children={
            <OrderedList
              display={"flex"}
              flexDirection={"column"}
              pl={"2rem"}
              gap={"0.300rem"}
              width="100%"
              marginLeft={"0"}
            >
              {topVitrinas.map((vitrina) => (
                <ListItem>
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
          height={ContainerHeight + "px"}
          minHeight="225px"
          title={"Top Categorías"}
          icon={<StarIcon width={"1.5rem"} height={"1.5rem"} />}
          children={
            <Box display={"flex"} flexWrap={"wrap"} gap={"1rem"}>
              {topCategorias.map((cat) => (
                <TopCategoriaItem
                  icon={cat.Icon}
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
          height={ContainerHeight + "px"}
          minHeight="225px"
          title={"Top Productos"}
          icon={<BoxesIcon width={"1.5rem"} height={"1.5rem"} />}
          children={
            <Box
              display={"flex"}
              flexDirection={"column"}
              maxH={"8rem"}
              overflowY={"scroll"}
              width="100%"
            >
              {topProductos.map((prod) => (
                <TopProductoItem
                  prodName={prod.producto}
                  prodPercentage={prod.porcentaje}
                />
              ))}
            </Box>
          }
        />
        <Container
          height={ContainerHeight + "px"}
          minHeight="225px"
          title={"Dispositivos averiados"}
          icon={<PhoneLaptopIcon width={"1.5rem"} height={"1.5rem"} />}
          children={<DispositivosAveriados />}
        />
        <Container
          height={ContainerHeight + "px"}
          minHeight="225px"
          title={"Despachos actuales"}
          icon={<TruckIcon width={"1.5rem"} height={"1.5rem"} />}
          children={<DespachosActuales />}
        />
        <Container
          height={ContainerHeight + "px"}
          minHeight="225px"
          title={"Inventario pendiente de verificar"}
          icon={<FileCheckIcon width={"1.5rem"} height={"1.5rem"} />}
          children={<InventarioXverificar />}
        />
      </Box>
    </Box>
  );
}
