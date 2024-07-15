import React, { useState } from "react";
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import axios from "axios";
import Checkbox from "./ui/checkbox";
import LeftArrowIcon from "../assets/images/LeftArrowIcon";
import BiggerThanIcon from "../assets/images/BiggerThanIcon";
import EditIcon from "../assets/images/EditIcon";
import EditarExistencia from "./EditarExistencia";
import ConfirmationMessage from "./ConfirmationMessage";
import UnionIcon from "../assets/images/UnionIcon";
import TrashIcon from "../assets/images/TrashIcon";
import WarningIcon from "../assets/images/WarningIcon";
import Editar from "../component/Ingresar_Editar_Producto";
import ListComponent from "../component/ListComponent";
import Agregar from "./Agregar";
import AgregarCategoria from "./AgregarCategoria";
import SwitchElement from "./SwitchElement";
import EditarAsesor from "./EditarAsesor";
import Pagination from "./Pagination";

export default function TablaProductosBodega({
  isSecondModalOpen,
  onSecondModalOpen,
  onSecondModalClose,
  isThirdModalOpen,
  onThirdModalOpen,
  onThirdModalClose,
  displayedArticulos,
  totalResults,
  currentPage,
  totalPages,
  getMasArticulos,
  handleSortingClick,
}) {
  return (
    <Box w={"100%"} mt={"20px"} overflowX={"auto"}>
      <TableContainer
        borderTopLeftRadius={"20px"}
        borderTopRightRadius={"20px"}
      >
        <Table variant="simple" w={"100%"} bg={"black"}>
          <Thead h={"50px"}>
            <Tr>
              <Th p={1}>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={"5px"}
                  pl={2}
                >
                  <Checkbox />
                </Box>
              </Th>
              <Th p={1}>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={"5px"}
                >
                  <Text
                    color="white"
                    textStyle={"RobotoRegularBold"}
                    textTransform={"capitalize"}
                    textAlign={"center"}
                  >
                    Asesor
                  </Text>
                  <UnionIcon
                    width={"10px"}
                    height={"10px"}
                    fill={"white"}
                    onClick={() => handleSortingClick("asesor")}
                  />
                </Box>
              </Th>
              <Th p={1}>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={"5px"}
                >
                  <Text
                    color="white"
                    textStyle={"RobotoRegularBold"}
                    textTransform={"capitalize"}
                    textAlign={"center"}
                  >
                    Vitrinas
                  </Text>
                  <UnionIcon
                    width={"10px"}
                    height={"10px"}
                    fill={"white"}
                    onClick={() => handleSortingClick("vitrinas")}
                  />
                </Box>
              </Th>
              <Th p={1}>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={"5px"}
                >
                  <Text
                    color="white"
                    textStyle={"RobotoRegularBold"}
                    textTransform={"capitalize"}
                    textAlign={"center"}
                  >
                    Ubicación
                  </Text>
                  <UnionIcon
                    width={"10px"}
                    height={"10px"}
                    fill={"white"}
                    onClick={() => handleSortingClick("ubicacion")}
                  />
                </Box>
              </Th>
              <Th p={1}>
                <Text
                  color="white"
                  textStyle={"RobotoRegularBold"}
                  textTransform={"capitalize"}
                  textAlign={"center"}
                >
                  Usuario
                </Text>
              </Th>

              <Th p={1}>
                <Text
                  color="white"
                  textStyle={"RobotoRegularBold"}
                  textTransform={"capitalize"}
                  textAlign={"center"}
                >
                  Contraseña
                </Text>
              </Th>
              <Th p={1}>
                <Text
                  color="white"
                  textStyle={"RobotoRegularBold"}
                  textTransform={"capitalize"}
                  textAlign={"center"}
                >
                  Habilitar/Deshabilitar Asesor
                </Text>
              </Th>

              <Th p={1}>
                <Text
                  color="white"
                  textStyle={"RobotoRegularBold"}
                  textTransform={"capitalize"}
                  textAlign={"center"}
                >
                  Acciones
                </Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody bg={"white"}>
            {displayedArticulos.map((articulo) => {
              return (
                <Tr color="black">
                  <Th p={1}>
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Checkbox />
                    </Box>
                  </Th>
                  <Th p={1}>
                    <Text
                      color="black"
                      textStyle={"RobotoRegular"}
                      textTransform={"capitalize"}
                      textAlign={"left"}
                    >
                      {articulo.Asesor}
                    </Text>
                  </Th>
                  <Th p={1}>
                    <Text
                      color="black"
                      textStyle={"RobotoRegular"}
                      textTransform={"capitalize"}
                      textAlign={"left"}
                    >
                      {articulo.Vitrinas}
                    </Text>
                  </Th>
                  <Th p={1}>
                    <Text
                      color="black"
                      textStyle={"RobotoRegular"}
                      textTransform={"capitalize"}
                      textAlign={"left"}
                    >
                      {articulo.Ubicacion}
                    </Text>
                  </Th>
                  <Th p={1}>
                    <Text
                      color="black"
                      textStyle={"RobotoRegular"}
                      textTransform={"capitalize"}
                      textAlign={"center"}
                    >
                      {articulo.Usuario}
                    </Text>
                  </Th>
                  <Th p={1}>
                    <Text
                      color="black"
                      textStyle={"RobotoRegular"}
                      textTransform={"capitalize"}
                      textAlign={"center"}
                    >
                      {articulo.Contraseña}
                    </Text>
                  </Th>
                  <Th p={1}>
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      gap={"10px"}
                    >
                      <Text
                        color="black"
                        textStyle={"RobotoRegular"}
                        textTransform={"capitalize"}
                        textAlign={"center"}
                      >
                        {articulo.Hab_Des}
                      </Text>
                      <SwitchElement />
                    </Box>
                  </Th>

                  <Th p={1}>
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      gap={"10px"}
                    >
                      <EditIcon onClick={onSecondModalOpen} />
                      <EditarAsesor
                        desc={"Editar"}
                        isOpen={isSecondModalOpen}
                        onOpen={onSecondModalOpen}
                        onClose={onSecondModalClose}
                      />
                      <TrashIcon onClick={onThirdModalOpen} />
                      <ConfirmationMessage
                        isOpen={isThirdModalOpen}
                        onOpen={onThirdModalOpen}
                        onClose={onThirdModalClose}
                        icon={<WarningIcon />}
                        text={"¿Estás seguro que desea eliminar a este Asesor?"}
                        text2={
                          "Esta acción eliminará permanentemente los registros de este asesor de tu sistema"
                        }
                        colorText2={"red.100"}
                        buttonText={"Continuar"}
                      />
                    </Box>
                  </Th>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Box
        bg={"#d7d7d7"}
        p={1}
        borderBottomLeftRadius={"20px"}
        borderBottomRightRadius={"20px"}
        color={"black"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          p={2}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"1rem"}
        >
          <Text textStyle={"RobotoRegularBold"}>{totalResults} elementos</Text>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={getMasArticulos}
          />
        </Box>
      </Box>
    </Box>
  );
}
