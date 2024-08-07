import React from "react";
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
import registroVisitas from "../DummieData/registroVisitas";
import registroMovimientosInventario from "../DummieData/registroMovimientosInventario";
import registroCorreccionesInventario from "../DummieData/registroCorreccionesInventario";
import { useSelector, useDispatch } from "react-redux";

import WarningIcon from "../assets/images/WarningIcon";

export default function Visitas() {
  const city = useSelector((state) => state.vitrinaReducer.city);
  const name = useSelector((state) => state.vitrinaReducer.name);
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");
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
        <Text textStyle={"RobotoBody"}>
          {name} - {city}
        </Text>
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
          children={registroVisitas.map((visita, index) => (
            <CardVisitas
              key={index}
              asesor={visita.Asesor}
              fecha={visita["Fecha y hora"]}
              ingresos={visita.Ingresos}
              retiros={visita.Retiros}
              correcciones={visita.Correcciones}
              verificada={visita.Verificada}
            />
          ))}
        />
        <VisitaContainer
          title="Movimientos de inventario"
          maxW="320px"
          children={registroMovimientosInventario.map((inventario, index) => (
            <CardMovimientosInventario
              key={index}
              fecha={inventario["Fecha y hora"]}
              visita={inventario.Visita}
              ProdIngr={inventario["Productos Ingresados"]}
              ProdRet={inventario["Productos Retirados"]}
            />
          ))}
        />
        <VisitaContainer
          title="Correcciones de inventario"
          maxW="320px"
          children={registroCorreccionesInventario.map((corr, index) => (
            <CardCorreccionesInventario
              key={index}
              fecha={corr["Fecha y hora"]}
              visita={corr.Visita}
              ProdCorr={corr["Productos Corregidos"]}
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
