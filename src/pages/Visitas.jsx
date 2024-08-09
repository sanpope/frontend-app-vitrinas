import React, { useEffect, useState } from "react";
import ConfirmationMessage from "../component/ConfirmationMessage";
import VisitaContainer from "../component/VisitaContainer";
import {
  Box,
  Select,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import VerExistencias from "../component/VerExistencias";
import StandardButton from "../component/ui/buttons/standard";
import ProductosEnDespacho from "../component/ProductosEnDespacho";
import CardVisitas from "../component/CardVisitas";
import CardMovimientosInventario from "../component/CardMovimientosInventario";
import CardCorreccionesInventario from "../component/CardCorreccionesInventario";

import xmlToJSON from "../services/XmlToJsonConverter";
import visitasData from "../services/visitasData";

import { useSelector, useDispatch } from "react-redux";

import WarningIcon from "../assets/images/WarningIcon";

export default function Visitas() {
  const city = useSelector((state) => state.vitrinaReducer.city);
  const name = useSelector((state) => state.vitrinaReducer.name);
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

  const [totalVisitas, setTotalVisitas] = useState(null);
  const [totalMovivmientos, setTotalMovimientos] = useState(null);
  const [totalCorrecciones, setTotalCorrecciones] = useState(null);

  useEffect(() => {
    parseData();
  }, []);

  const parseData = () => {
    const resumenInfo = xmlToJSON(visitasData);

    const Visitas = resumenInfo?.acontecimientosDeVisita?.Visitas;
    const Movimientos = resumenInfo?.acontecimientosDeVisita?.Movimientos;
    const Correcciones = resumenInfo?.acontecimientosDeVisita?.Correcciones;

    if (Visitas && Array.isArray(Visitas?.Visita)) {
      const listadoVisitas = Visitas?.Visita;
      const arrTotalVisitas = listadoVisitas?.map((Visita) => {
        const idVisita = Visita?.idVisita["#text"];
        const fechaHora = Visita?.fechaHora["#text"];
        const asesor = Visita?.asesor["#text"];
        const verificada = Visita?.verificada["#text"];
        const ingresos = Visita?.ingresos["#text"];
        const retiros = Visita?.retiros["#text"];
        const correccionesDeInventario =
          Visita?.correccionesDeInventario?.["#text"];
        const revertida = Visita?.revertida?.["#text"];
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
      setTotalVisitas(arrTotalVisitas);
    }

    if (Movimientos && Array.isArray(Movimientos?.Movim)) {
      const listadoMovimientos = Movimientos?.Movim;

      const arrTotalMovimientos = listadoMovimientos?.map((mov) => {
        const fechaHora = mov.fechaHora["#text"];
        const hechoEnVisita = mov.hechoEnVisita["#text"];
        const idVisita = mov.idVisita["#text"];
        let totalProdsIngr = [];
        let totalProdsRet = [];

        if (
          mov.ProductosIngresados &&
          Array.isArray(mov.ProductosIngresados.Producto)
        ) {
          const listadoProductosIngresados = mov.ProductosIngresados.Producto;
          totalProdsIngr = listadoProductosIngresados.map((prod) => {
            const nombre = prod.nombre["#text"];
            const cantidad = prod.cantidad["#text"];
            return { nombre, cantidad };
          });
        }

        if (
          mov.ProductosRetirados &&
          Array.isArray(mov.ProductosRetirados.Producto)
        ) {
          const listadoProductosRetirados = mov.ProductosRetirados.Producto;
          totalProdsRet = listadoProductosRetirados.map((prod) => {
            const nombre = prod.nombre["#text"];
            const cantidad = prod.cantidad["#text"];
            return { nombre, cantidad };
          });
        }

        return {
          fechaHora,
          hechoEnVisita,
          idVisita,
          totalProdsIngr,
          totalProdsRet,
        };
      });
      setTotalMovimientos(arrTotalMovimientos);
    }

    if (Correcciones && Array.isArray(Correcciones?.CorreccionDeExistencias)) {
      const listadoCorrecciones = Correcciones?.CorreccionDeExistencias;
      const arrTotalCorrecciones = listadoCorrecciones?.map((correccion) => {
        const fechaHora = correccion.fechaHora["#text"];
        const visita = correccion.visita["#text"];
        const idVisita = correccion.idVisita["#text"];

        let ProdsCorregidos = [];

        if (
          correccion.ProductosCorregidos &&
          Array.isArray(correccion.ProductosCorregidos.ProductoCorr)
        ) {
          const listadoProductosCorregidos =
            correccion.ProductosCorregidos.ProductoCorr;
          ProdsCorregidos = listadoProductosCorregidos.map((prod) => {
            const codigo = prod.codigo["#text"];
            const nombre = prod.nombre["#text"];
            const cantidad = prod.cantidadCorregida?.["#text"];
            const adicion = prod.adicion["#text"];
            const motivoDeCorreccion = prod.motivoDeCorreccion["#text"];
            const nota = prod.nota["#text"];
            return {
              codigo,
              nombre,
              cantidad,
              adicion,
              motivoDeCorreccion,
              nota,
            };
          });
        }

        return {
          fechaHora,
          visita,
          idVisita,
          ProdsCorregidos,
        };
      });
      setTotalCorrecciones(arrTotalCorrecciones);
    }
  };

  const {
    isOpen: isFirstModalOpen,
    onOpen: onFirstModalOpen,
    onClose: onFirstModalClose,
  } = useDisclosure();

  const {
    isOpen: isConfirmationModalOpen,
    onOpen: onConfirmationModalOpen,
    onClose: onConfirmationModalClose,
  } = useDisclosure();

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      w={"100%"}
      h={"100%"}
      p={"20px"}
      overflowY={"scroll"}
    >
      <Box
        display={"flex"}
        flexDir={{ base: "column", md: "row" }}
        justifyContent={{ base: "flex-start", md: "space-between" }}
        py={5}
        gap={"10px"}
      >
        <Box>
          <Text textStyle={"RobotoBody"}>
            {name} - {city}
          </Text>
          <Text textStyle={"RobotoTitleBold"}>Visitas</Text>
        </Box>

        <Box w={"100%"} maxW={"300px"}>
          <Select
            borderColor={"grey.placeholder"}
            bg={"white"}
            borderRadius={"5px"}
            placeholder={"Seleccionar un Intervalo"}
            pacing={2}
          >
            <option>Opción 1 </option>
            <option>Opción 2</option>
            <option>Opción 3</option>
          </Select>
        </Box>
      </Box>
      <Box
        order={{ base: "2", xl: "1" }}
        h={"90%"}
        display="flex"
        flexWrap="wrap"
        gap={"1.25rem"}
      >
        <VisitaContainer
          title="Visitas realizadas a esta vitrina"
          maxW="320px"
          children={totalVisitas?.map((visita, index) => (
            <CardVisitas
              key={index}
              asesor={visita.asesor}
              fecha={visita.fechaHora}
              ingresos={visita.ingresos}
              retiros={visita.retiros}
              correcciones={visita.correccionesDeInventario}
              verificada={visita.verificada}
            />
          ))}
        />
        <VisitaContainer
          title="Movimientos de inventario"
          maxW="320px"
          children={totalMovivmientos?.map((movimiento, index) => (
            <CardMovimientosInventario
              key={index}
              fecha={movimiento.fechaHora}
              visita={movimiento.hechoEnVisita}
              ProdIngr={movimiento.totalProdsIngr}
              ProdRet={movimiento.totalProdsRet}
            />
          ))}
        />
        <VisitaContainer
          title="Correcciones de inventario"
          maxW="320px"
          children={totalCorrecciones?.map((corr, index) => (
            <CardCorreccionesInventario
              key={index}
              fecha={corr?.fechaHora}
              visita={corr?.visita}
              ProdCorr={corr?.ProdsCorregidos}
            />
          ))}
        />
      </Box>
      <Box
        display={"flex"}
        gap={{ base: "5px", md: "10px" }}
        flexDirection={{ base: "column", sm: "row" }}
        justifyContent={{ base: "flex.start", sm: "flex-end" }}
        alignItems={"center"}
        margin={{ base: "0px", md: "20px" }}
        order={{ base: "1", xl: "2" }}
        py={"10px"}
      >
        <StandardButton
          variant={"WHITE_RED"}
          borderRadius="20px"
          py={"17px"}
          w={"fit-content"}
          fontSize={{ base: "12px", lg: "14px" }}
          fontWeight="400"
          onClick={onFirstModalOpen}
        >
          {isSmallScreen ? "Ver productos" : "Ver productos en despacho"}
        </StandardButton>
        <ProductosEnDespacho
          isOpen={isFirstModalOpen}
          onOpen={onFirstModalOpen}
          onClose={onFirstModalClose}
        />
        <StandardButton
          variant={"RED_PRIMARY"}
          borderRadius="20px"
          py={"17px"}
          px={"20px"}
          w={"fit-content"}
          fontSize={{ base: "12px", lg: "14px" }}
          fontWeight="400"
          onClick={onConfirmationModalOpen}
        >
          {isSmallScreen
            ? "Revertir movimientos"
            : "Revertir movimientos y correcciones"}
        </StandardButton>
        <ConfirmationMessage
          icon={<WarningIcon />}
          text={`¿Estás seguro que deseas revertir los cambios y acciones realizadas en la vista seleccionada?`}
          isOpen={isConfirmationModalOpen}
          onOpen={onConfirmationModalOpen}
          onClose={onConfirmationModalClose}
        />
      </Box>
    </Box>
  );
}
