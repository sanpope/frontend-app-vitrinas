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

import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import WarningIcon from "../assets/images/WarningIcon";
import {
  formatFecha,
  capitalizeFirstLetter,
  formattingDate,
} from "../utils/formatting";
import { parseData } from "../utils/xmlParse";

export default function Visitas() {
  const city = useSelector((state) => state.vitrinaReducer.city);
  const name = useSelector((state) => state.vitrinaReducer.name);
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

  const [totalVisitas, setTotalVisitas] = useState(null);
  const [totalMovivmientos, setTotalMovimientos] = useState(null);
  const [totalCorrecciones, setTotalCorrecciones] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  const [productosDespachados, setProductosDespachados] = useState(null);
  const [enviarProdcsLoading, setEnviarProdcsLoading] = useState(false);

  useEffect(() => {
    getIntervaloVisitas(fechaInicio, fechaFin);
  }, [selectedOption]);

  const getIntervaloVisitas = async (date1, date2) => {
    let fecha1, fecha2;
    if (date1 === null || date2 === null) {
      let today = new Date();
      fecha2 = formattingDate(today);
      fecha1 = new Date(today.getFullYear(), today.getMonth(), 1);
      fecha1 = formattingDate(fecha1);
    } else {
      fecha1 = fechaInicio;
      fecha2 = fechaFin;
    }

    const url = `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina/visitas/intervalo?vitrina=${name}&fechaInicio=${fecha1}&fechaFin=${fecha2}`;

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/xml",
        },
      });

      const xmlDoc = parseData(response.data);
      const visitas = getVisitasData(xmlDoc);
      setTotalVisitas(visitas.visitas);
      setTotalCorrecciones(visitas.correcciones);
      setTotalMovimientos(visitas.movimientos);
    } catch (error) {
      if (error.response) {
        console.error(
          "Error en la respuesta del servidor:",
          error.response.status,
        );
        console.error("Detalles:", error.response.data);
      } else if (error.request) {
        console.error("No se recibió respuesta del servidor:", error.request);
      } else {
        console.error("Error en la solicitud:", error.message);
      }
    } finally {
    }
  };

  const getVisitasData = (xml) => {
    const visitasContainer = xml.querySelector("visitas");
    const totalVisitas = visitasContainer.querySelectorAll("visita");
    // Extraer visitas
    const visitasArray = [];
    for (let i = 0; i < totalVisitas?.length; i++) {
      console.log();
      visitasArray.push({
        idVisita:
          totalVisitas[i]?.getElementsByTagName("idVisita")[0].textContent,
        fechaHora: formatFecha(
          totalVisitas[i].getElementsByTagName("fechaHora")?.[0].textContent,
        ),
        asesor: totalVisitas[i].getElementsByTagName("asesor")?.[0].textContent,
        verificada:
          totalVisitas[i].getElementsByTagName("verificada")?.[0].textContent,
        ingresos:
          totalVisitas[i].getElementsByTagName("ingresos")?.[0].textContent,
        retiros:
          totalVisitas[i].getElementsByTagName("retiros")?.[0].textContent,
        correccionesDeInventario: totalVisitas[i].getElementsByTagName(
          "correccionesDeInventario",
        )?.[0].textContent,
        revertida:
          totalVisitas[i].getElementsByTagName("revertida")?.[0].textContent,
      });
    }

    // Extraer movimientos
    const movimientosContainer = xml.querySelector("movimientos");
    const movimientos = movimientosContainer?.querySelectorAll("movimiento");
    const movimientosArray = [];
    for (let i = 0; i < movimientos?.length; i++) {
      const movimiento = movimientos[i];
      const productosIngresados = [];
      const productosIngresadosElements = movimiento.querySelectorAll(
        "productosIngresados > producto",
      );
      for (let j = 0; j < productosIngresadosElements.length; j++) {
        const prod = productosIngresadosElements[j];
        productosIngresados.push({
          nombre: capitalizeFirstLetter(
            prod.getElementsByTagName("nombre")?.[0].textContent,
          ),
          cantidad: prod.getElementsByTagName("cantidad")?.[0].textContent,
        });
      }

      const productosRetirados = [];
      const productosRetiradosElements = movimiento.querySelectorAll(
        "productosRetirados > producto",
      );
      for (let j = 0; j < productosRetiradosElements.length; j++) {
        const prod = productosRetiradosElements[j];
        productosRetirados.push({
          nombre: capitalizeFirstLetter(
            prod.getElementsByTagName("nombre")?.[0].textContent,
          ),
          cantidad: prod.getElementsByTagName("cantidad")?.[0].textContent,
        });
      }

      movimientosArray.push({
        fechaHora: formatFecha(
          movimiento.getElementsByTagName("fechaHora")?.[0].textContent,
        ),
        hechoEnVisita:
          movimiento.getElementsByTagName("hechoEnVisita")?.[0].textContent,
        idVisita: movimiento.getElementsByTagName("idVisita")?.[0].textContent,
        totalProdsIngr: productosIngresados,
        totalProdsRet: productosRetirados,
      });
    }

    // Extraer correcciones
    const correccionesContainer = xml.querySelector("correcciones");
    const correcciones = correccionesContainer.querySelectorAll("correccion");
    const correccionesArray = [];
    for (let i = 0; i < correcciones.length; i++) {
      const correccion = correcciones[i];
      const productosCorregidos = [];
      const productosCorregidosElements = correccion.querySelectorAll(
        "productos > producto",
      );
      for (let j = 0; j < productosCorregidosElements.length; j++) {
        const prod = productosCorregidosElements[j];
        productosCorregidos.push({
          codigo: prod.getElementsByTagName("codigo")?.[0].textContent,
          nombre: capitalizeFirstLetter(
            prod.getElementsByTagName("nombre")?.[0].textContent,
          ),
          cantidad:
            prod.getElementsByTagName("cantidadCorregida")?.[0].textContent,
          adicion: prod.getElementsByTagName("adicion")?.[0].textContent,
          motivoDeCorreccion:
            prod.getElementsByTagName("motivoDeCorreccion")?.[0].textContent,
          nota: prod.getElementsByTagName("nota")?.[0].textContent,
        });
      }

      correccionesArray.push({
        fechaHora: formatFecha(
          correccion.getElementsByTagName("fechaHora")?.[0].textContent,
        ),
        visita: correccion.getElementsByTagName("idVisita")?.[0].textContent,
        idVisita: correccion.getElementsByTagName("idVisita")?.[0].textContent,
        ProdsCorregidos: productosCorregidos,
      });
    }

    return {
      visitas: visitasArray,
      correcciones: correccionesArray,
      movimientos: movimientosArray,
    };
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

  const handleSelectChange = (e) => {
    const option = e.target.value;
    setSelectedOption(option);

    const today = new Date();
    let startDate, endDate;

    // Fecha de fin siempre es la fecha actual
    endDate = formattingDate(today); // Usamos la función formattingDate
    setFechaFin(endDate);

    if (option === "Mes actual") {
      // Primer día del mes actual
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    } else if (option === "Últimos tres meses") {
      // Fecha exacta tres meses atrás
      startDate = new Date(
        today.getFullYear(),
        today.getMonth() - 3,
        today.getDate(),
      );
    } else if (option === "Último semestre") {
      // Fecha exacta seis meses atrás
      startDate = new Date(
        today.getFullYear(),
        today.getMonth() - 6,
        today.getDate(),
      );
    }
    startDate = formattingDate(startDate);
    setFechaInicio(startDate);
  };

  const handleClickVerProductos = async () => {
    onFirstModalOpen();
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina/visitas/productos-despachados?vitrina=${name}`,
        {
          headers: {
            "Content-Type": "application/xml",
          },
        },
      );

      const xmlDoc = parseData(response.data);
      setProductosDespachados(getProductosDespachados(xmlDoc));
    } catch (error) {
      if (error.response) {
        console.error(
          "Error en la respuesta del servidor:",
          error.response.status,
        );
        console.error("Detalles:", error.response.data);
      } else if (error.request) {
        console.error("No se recibió respuesta del servidor:", error.request);
      } else {
        console.error("Error en la solicitud:", error.message);
      }
    } finally {
    }
  };

  const enviarProductosEnDespacho = async () => {
    setEnviarProdcsLoading(true);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina/visitas/productos-despachados?vitrina=${name}`,
        {
          headers: {
            "Content-Type": "application/xml",
          },
        },
      );

      const xmlDoc = parseData(response.data);
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        console.error(
          "Error en la respuesta del servidor:",
          error.response.status,
        );
        console.error("Detalles:", error.response.data);
      } else if (error.request) {
        console.error("No se recibió respuesta del servidor:", error.request);
      } else {
        console.error("Error en la solicitud:", error.message);
      }
    } finally {
      setEnviarProdcsLoading(false);
      onFirstModalClose();
    }
  };

  const getProductosDespachados = (xml) => {
    const productosDespachados = xml.querySelector("productosDespachados");
    const totalProdcs = productosDespachados?.querySelectorAll("producto");
    const productosArray = [];
    for (let i = 0; i < totalProdcs?.length; i++) {
      productosArray.push({
        cantidad:
          totalProdcs[i]?.getElementsByTagName("cantidad")[0].textContent,
        codigo: totalProdcs[i]?.getElementsByTagName("codigo")[0].textContent,
        nombre: capitalizeFirstLetter(
          totalProdcs[i]?.getElementsByTagName("nombre")[0].textContent,
        ),
        fecha:
          totalProdcs[i]?.getElementsByTagName("fechaDespacho")[0].textContent,
      });
    }
    return productosArray;
  };

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
            color={
              !selectedOption || selectedOption === "Selecciona el intervalo"
                ? "grey.placeholder"
                : "black"
            }
            placeholder={"Selecciona el intervalo"}
            value={selectedOption}
            onChange={(e) => handleSelectChange(e)}
          >
            <option>Mes actual </option>
            <option>Últimos tres meses</option>
            <option>Último semestre</option>
          </Select>
        </Box>
      </Box>
      <Box
        order={{ base: "2", xl: "1" }}
        h={"80%"}
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
          onClick={handleClickVerProductos}
        >
          {isSmallScreen ? "Ver productos" : "Ver productos en despacho"}
        </StandardButton>
        <ProductosEnDespacho
          isOpen={isFirstModalOpen}
          onOpen={onFirstModalOpen}
          onClose={onFirstModalClose}
          products={productosDespachados}
          handleIngresarProductos={enviarProductosEnDespacho}
          isLoading={enviarProdcsLoading}
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
