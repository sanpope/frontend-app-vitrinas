import React, { useEffect, useState } from "react";
import ConfirmationMessage from "../component/ConfirmationMessage";
import VisitaContainer from "../component/VisitaContainer";
import {
  Box,
  Select,
  Text,
  useDisclosure,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";

import StandardButton from "../component/ui/buttons/standard";
import ProductosEnDespacho from "../component/ProductosEnDespacho";
import CardVisitas from "../component/CardVisitas";
import CardMovimientosInventario from "../component/CardMovimientosInventario";
import CardCorreccionesInventario from "../component/CardCorreccionesInventario";
import LoadingComponent from "../component/LoadingComponent";
import useWindowDimensions from "../hooks/useWindowDimensions";

import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import WarningIcon from "../assets/images/WarningIcon";
import {
  formatFecha,
  capitalizeFirstLetter,
  formattingDate,
} from "../utils/formatting";
import { parseData } from "../utils/xmlParse";
import { HEADER_HEIGHT } from "../component/Header";

export default function Visitas() {
  const toast = useToast();
  const city = useSelector((state) => state.vitrinaReducer.city);
  const name = useSelector((state) => state.vitrinaReducer.name);
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

  const [totalVisitas, setTotalVisitas] = useState(null);
  const [totalMovivmientos, setTotalMovimientos] = useState([]);
  const [totalCorrecciones, setTotalCorrecciones] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  const [productosDespachados, setProductosDespachados] = useState(null);
  const [enviarProdcsLoading, setEnviarProdcsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visitasLoading, setVisitasLoading] = useState(false);
  const [movimientosLoading, setMovimientosLoading] = useState(false);
  const [correccionesLoading, setCorreccionesLoading] = useState(false);
  const [productosDespachoLoading, setProductosDespachoLoading] =
    useState(false);

  const [visitaSelected, setVisitaSelected] = useState(null);

  const { height } = useWindowDimensions();
  const containerHeight = height - HEADER_HEIGHT - 150;

  useEffect(() => {
    getIntervaloVisitas(fechaInicio, fechaFin);
  }, [selectedOption]);

  const getIntervaloVisitas = async (date1, date2) => {
    setVisitasLoading(true);
    setMovimientosLoading(true);
    setCorreccionesLoading(true);

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
      if (response.status == 200 && response.data) {
        const xmlDoc = parseData(response.data);
        const visitas = getVisitasData(xmlDoc);
        setTotalVisitas(visitas?.visitas);
        setTotalMovimientos(visitas?.movimientos);
        setTotalCorrecciones(visitas?.correcciones);
      }
    } catch (error) {
      toast({
        status: "error",
        description: "Error al obtener información",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setTimeout(() => setVisitasLoading(false), 300);
      setTimeout(() => setMovimientosLoading(false), 400);
      setTimeout(() => setCorreccionesLoading(false), 500);
    }
  };

  const getVisitasData = (xml) => {
    const visitasContainer = xml.querySelector("visitas");
    const totalVisitas = visitasContainer.querySelectorAll("visita");

    const visitasArray = [];
    for (let i = 0; i < totalVisitas?.length; i++) {
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

    endDate = formattingDate(today);
    setFechaFin(endDate);

    if (option === "Mes actual") {
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    } else if (option === "Últimos tres meses") {
      startDate = new Date(
        today.getFullYear(),
        today.getMonth() - 3,
        today.getDate(),
      );
    } else if (option === "Último semestre") {
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
    setProductosDespachoLoading(true);

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
        toast({
          status: "error",
          description: "Error al cargar los productos en despacho",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      } else if (error.request) {
        console.error("No se recibió respuesta del servidor:", error.request);
        toast({
          status: "error",
          description: "No se obtuvo respuesta del servidor",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      } else {
        console.error("Error en la solicitud:", error.message);
        toast({
          status: "error",
          description: "Error en la solicitud",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      }
    } finally {
      setTimeout(() => setProductosDespachoLoading(false), 300);
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
      if (response.status == 200 && response.data) {
        toast({
          status: "success",
          description: "¡Productos ingresados con éxito!",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        status: "error",
        description: "Error ingresando los productos",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
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

  const setReversionVisita = async (idVisita) => {
    const id = parseInt(idVisita);

    setIsLoading(true);

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina/visitas/reversion-de-visita?vitrina=${name}&idVisita=${id}`,
        {
          headers: {
            "Content-Type": "application/xml",
          },
        },
      );

      if (response.status == 200 && response.data) {
        setTotalVisitas((prev) => {
          const copy = [...prev];
          const index = copy.findIndex(
            (visita) => visita.idVisita === idVisita,
          );
          if (index !== -1) {
            copy[index].revertida = true;
            copy[index].ingresos = 0;
            copy[index].retiros = 0;
            copy[index].correccionesDeInventario = 0;
          }
          return copy;
        });

        setTotalMovimientos((prev) => {
          const copy = [...prev];
          const index = copy.findIndex(
            (movimiento) => movimiento.idVisita === idVisita,
          );
          if (index !== -1) {
            copy[index].hechoEnVisita = false;
            copy[index].totalProdsIngr = [];
            copy[index].totalProdsRet = [];
          }
          return copy;
        });

        setTotalCorrecciones((prev) => {
          const copy = [...prev];
          const index = copy.findIndex(
            (correccion) => correccion.idVisita === idVisita,
          );
          if (index !== -1) {
            copy[index].ProdsCorregidos = [];
          }
          return copy;
        });
        toast({
          status: "success",
          description: "Reversión realizada con éxito!",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        status: "error",
        description: "Error, No fue posible realizar la reversión",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      onConfirmationModalClose();
    }
  };

  const verificarVisita = async (idVisita, visita) => {
    const id = parseInt(idVisita);
    if (visita.verificada === "false") {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina/visitas/verificacion-de-visita?vitrina=${name}&idVisita=${id}`,
          {
            headers: {
              "Content-Type": "application/xml",
            },
          },
        );

        if (response.status == 200 && response.data) {
          setTotalVisitas((prev) => {
            const index = prev.findIndex(
              (item) => item.idVisita === visita.idVisita,
            );
            if (index !== -1) {
              const copy = [...prev];
              copy[index]["verificada"] = "true";
              return copy;
            }
          });

          toast({
            status: "success",
            description: "Visita verificada correctamente",
            duration: 3000,
            position: "top-right",
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          status: "error",
          description: "Error verificando la visita",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      } finally {
      }
    }
  };

  const showInfoVisitaRelated = (visita) => {
    setTotalMovimientos((prev) => {
      const copy = [...prev];
      return copy.map((movimiento) => ({
        ...movimiento,
        esVisita: movimiento.idVisita === visita?.idVisita,
      }));
    });

    setTotalCorrecciones((prev) => {
      const copy = [...prev];
      return copy.map((correccion) => ({
        ...correccion,
        esVisita: correccion.idVisita === visita?.idVisita,
      }));
    });
  };

  const scrollToId = (id) => {
    var movimiento = document.getElementById(`movimiento-${id}`);
    var correccion = document.getElementById(`correccion-${id}`);
    var topPosMov = movimiento.offsetTop;
    var topPosCorr = correccion.offsetTop;
    document.getElementById("movContainer").scrollTop = topPosMov - 20;
    document.getElementById("corrContainer").scrollTop = topPosCorr - 20;
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"space-between"}
      w={"100%"}
      h={"calc(100% - " + HEADER_HEIGHT + "px)"}
      p={"10px"}
    >
      <Box
        display={"flex"}
        flexDir={{ base: "column", md: "row" }}
        justifyContent={{ base: "flex-start", md: "space-between" }}
        alignItems={"flex-end"}
        gap={"10px"}
        py={"10px"}
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
            color={"black"}
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
        display="flex"
        flexWrap="noWrap"
        gap={"1.25rem"}
        height={`${containerHeight}px`}
        overflowY="hidden"
      >
        <VisitaContainer
          title="Visitas realizadas a esta vitrina"
          maxW="310px"
          height={`${containerHeight}px`}
          children={
            visitasLoading ? (
              <Box
                width={"100%"}
                height={"100%"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <LoadingComponent size="md" />
              </Box>
            ) : totalVisitas !== null && totalVisitas?.length > 0 ? (
              totalVisitas?.map((visita, index) => (
                <CardVisitas
                  key={index}
                  visita={visita}
                  isSelected={visitaSelected?.idVisita === visita.idVisita}
                  seleccionarYVerificar={() => {
                    setVisitaSelected(visita);
                    verificarVisita(visita?.idVisita, visita);
                    showInfoVisitaRelated(visita);
                    scrollToId(visita?.idVisita);
                  }}
                />
              ))
            ) : (
              <Box
                width={"100%"}
                height={"100%"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Text color={"grey.placeholder"} textAlign={"center"}>
                  Sin Información
                </Text>
              </Box>
            )
          }
        />

        <VisitaContainer
          id={"movContainer"}
          title="Movimientos de inventario"
          maxW="310px"
          height={`${containerHeight}px`}
          children={
            movimientosLoading ? (
              <Box
                width={"100%"}
                height={"100%"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <LoadingComponent size="md" />
              </Box>
            ) : totalMovivmientos !== null && totalMovivmientos?.length > 0 ? (
              totalMovivmientos?.map((movimiento, index) => (
                <CardMovimientosInventario
                  key={index}
                  movimiento={movimiento}
                />
              ))
            ) : (
              <Box
                width={"100%"}
                height={"100%"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Text color={"grey.placeholder"} textAlign={"center"}>
                  Sin Información
                </Text>
              </Box>
            )
          }
        />

        <VisitaContainer
          id={"corrContainer"}
          title="Correcciones de inventario"
          maxW="310px"
          height={`${containerHeight}px`}
          children={
            correccionesLoading ? (
              <Box
                width={"100%"}
                height={"100%"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <LoadingComponent size="md" />
              </Box>
            ) : totalCorrecciones !== null && totalCorrecciones?.length > 0 ? (
              totalCorrecciones?.map((corr, index) => (
                <CardCorreccionesInventario key={index} correccion={corr} />
              ))
            ) : (
              <Box
                width={"100%"}
                height={"100%"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Text color={"grey.placeholder"} textAlign={"center"}>
                  Sin Información
                </Text>
              </Box>
            )
          }
        />
      </Box>
      <Box
        display={"flex"}
        gap={{ base: "5px", md: "10px" }}
        flexDirection={{ base: "column", sm: "row" }}
        justifyContent={{ base: "flex.start", sm: "flex-end" }}
        alignItems={"center"}
        margin={{ base: "0px", md: "20px" }}
        order={{ base: "1", lg: "2" }}
      >
        <StandardButton
          variant={"WHITE_RED"}
          borderRadius="20px"
          py={"17px"}
          w={"fit-content"}
          fontSize={{ base: "12px", lg: "14px" }}
          fontWeight="400"
          onClick={handleClickVerProductos}
          isDisabled={productosDespachoLoading}
        >
          {productosDespachoLoading
            ? "Cargando..."
            : isSmallScreen
              ? "Ver productos"
              : "Ver productos en despacho"}
        </StandardButton>
        <ProductosEnDespacho
          isOpen={isFirstModalOpen}
          onOpen={onFirstModalOpen}
          onClose={onFirstModalClose}
          products={productosDespachados}
          handleIngresarProductos={enviarProductosEnDespacho}
          isLoading={enviarProdcsLoading || productosDespachoLoading}
        />
        <StandardButton
          variant={visitaSelected != null ? "RED_PRIMARY" : "DISABLED"}
          borderRadius="20px"
          py={"17px"}
          px={"20px"}
          w={"fit-content"}
          fontSize={{ base: "12px", lg: "14px" }}
          fontWeight="400"
          onClick={visitaSelected != null ? onConfirmationModalOpen : null}
          disabled={visitaSelected != null ? false : true}
          cursor={visitaSelected != null ? "cursor" : "not-allowed"}
          isDisabled={isLoading}
        >
          {isLoading
            ? "Procesando..."
            : isSmallScreen
              ? "Revertir movimientos"
              : "Revertir movimientos y correcciones"}
        </StandardButton>
        <ConfirmationMessage
          icon={<WarningIcon />}
          text={`¿Estás seguro que deseas revertir los cambios y acciones realizadas en la visita seleccionada?`}
          isOpen={isConfirmationModalOpen}
          onOpen={onConfirmationModalOpen}
          onClose={onConfirmationModalClose}
          funcConfirmar={visitaSelected ? setReversionVisita : null}
          focusRow={visitaSelected ? visitaSelected?.idVisita : null}
          products={null}
          isLoading={isLoading}
        />
      </Box>
    </Box>
  );
}
