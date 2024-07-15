import React, { useCallback, useState, useEffect } from "react";
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
import Pagination from "../component/Pagination";

export default function TablaProductosBodega({
  isFirstModalOpen,
  onFirstModalOpen,
  onFirstModalClose,
  isSecondModalOpen,
  onSecondModalOpen,
  onSecondModalClose,
  isThirdModalOpen,
  onThirdModalOpen,
  onThirdModalClose,
  isFourthModalOpen,
  onFourthModalOpen,
  onFourthModalClose,
  isFifthModalOpen,
  onFifthModalOpen,
  onFifthModalClose,
  isSixthModalOpen,
  onSixthModalOpen,
  onSixthModalClose,
  lista1,
  lista2,
  displayedArticulos,
  handleSortingClick,
  totalResults,
  currentPage,
  totalPages,
  getMasArticulos,
}) {
  return (
    <Box w={"100%"} mt={"20px"} overflowX={"auto"}>
      <TableContainer
        borderTopLeftRadius={"20px"}
        borderTopRightRadius={"20px"}
        w={"100%"}
        overflowY={"auto"}
        overflowX="auto"
      >
        <Table variant="simple" bg={"black"}>
          <Thead h={"50px"}>
            <Tr>
              <Th p={1}></Th>
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
                    Productos
                  </Text>
                  <UnionIcon
                    width={"10px"}
                    height={"10px"}
                    fill={"white"}
                    onClick={() => handleSortingClick("productos")}
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
                  Código
                </Text>
              </Th>

              <Th p={1}>
                <Text
                  color="white"
                  textStyle={"RobotoRegularBold"}
                  textTransform={"capitalize"}
                  textAlign={"center"}
                >
                  Precio
                </Text>
              </Th>
              <Th p={1}>
                <Text
                  color="white"
                  textStyle={"RobotoRegularBold"}
                  textTransform={"capitalize"}
                  textAlign={"center"}
                >
                  Costo
                </Text>
              </Th>
              <Th>
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
                    Bodega
                  </Text>
                  <UnionIcon
                    width={"10px"}
                    height={"10px"}
                    fill={"white"}
                    onClick={() => handleSortingClick("bodega")}
                  />
                </Box>
              </Th>
              <Th>
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
              <Th>
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
                    Proveedor
                  </Text>
                  <EditIcon
                    width={"15px"}
                    height={"15px"}
                    fill={"white"}
                    onClick={onThirdModalOpen}
                  />
                  <ListComponent
                    desc={"Proveedores"}
                    desc2={"proveedor"}
                    isFirstModalOpen={isThirdModalOpen}
                    onFirstModalOpen={onThirdModalOpen}
                    onFirstModalClose={onThirdModalClose}
                    isSecondModalOpen={isFourthModalOpen}
                    onSecondModalOpen={onFourthModalOpen}
                    onSecondModalClose={onFourthModalClose}
                    lista={lista1}
                    Children={
                      <Agregar
                        isOpen={isFourthModalOpen}
                        onOpen={onFourthModalOpen}
                        onClose={onFourthModalClose}
                        onClick={onFourthModalClose}
                        desc={"proveedor"}
                        desc2={"Nombre del proveedor"}
                      />
                    }
                  />
                </Box>
              </Th>
              <Th>
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
                    Categorías
                  </Text>
                  <EditIcon
                    width={"15px"}
                    height={"15px"}
                    fill={"white"}
                    onClick={onFifthModalOpen}
                  />
                  <ListComponent
                    desc={"Categorías"}
                    desc2={"categoría"}
                    isFirstModalOpen={isFifthModalOpen}
                    onFirstModalOpen={onFifthModalOpen}
                    onFirstModalClose={onFifthModalClose}
                    isSecondModalOpen={isSixthModalOpen}
                    onSecondModalOpen={onSixthModalOpen}
                    onSecondModalClose={onSixthModalClose}
                    lista={lista2}
                    Children={
                      <AgregarCategoria
                        isOpen={isSixthModalOpen}
                        onOpen={onSixthModalOpen}
                        onClose={onSixthModalClose}
                        onClick={onSixthModalClose}
                      />
                    }
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
                  Acciones
                </Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody bg={"white"} w={"100%"} h={"100%"}>
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
                      textAlign={"center"}
                    >
                      {articulo.Producto}
                    </Text>
                  </Th>
                  <Th p={1}>
                    <Text
                      color="black"
                      textStyle={"RobotoRegular"}
                      textTransform={"capitalize"}
                      textAlign={"center"}
                    >
                      {articulo.Codigo}
                    </Text>
                  </Th>
                  <Th p={1}>
                    <Text
                      color="black"
                      textStyle={"RobotoRegular"}
                      textTransform={"capitalize"}
                      textAlign={"center"}
                    >
                      {articulo.Precio}
                    </Text>
                  </Th>
                  <Th p={1}>
                    <Text
                      color="black"
                      textStyle={"RobotoRegular"}
                      textTransform={"capitalize"}
                      textAlign={"center"}
                    >
                      {articulo.Costo}
                    </Text>
                  </Th>
                  <Th p={1}>
                    <Text
                      color="black"
                      textStyle={"RobotoRegular"}
                      textTransform={"capitalize"}
                      textAlign={"center"}
                    >
                      {articulo.Bodega}
                    </Text>
                  </Th>
                  <Th p={1}>
                    <Text
                      color="black"
                      textStyle={"RobotoRegular"}
                      textTransform={"capitalize"}
                      textAlign={"center"}
                    >
                      {articulo.Vitrinas}
                    </Text>
                  </Th>
                  <Th p={1}>
                    <Text
                      color="black"
                      textStyle={"RobotoRegular"}
                      textTransform={"capitalize"}
                      textAlign={"center"}
                    >
                      {articulo.Proveedor}
                    </Text>
                  </Th>
                  <Th p={1}>
                    <Text
                      color="black"
                      textStyle={"RobotoRegular"}
                      textTransform={"capitalize"}
                      textAlign={"center"}
                    >
                      {articulo.Categorias}
                    </Text>
                  </Th>

                  <Th p={1}>
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      gap={"10px"}
                    >
                      <EditIcon onClick={onFirstModalOpen} />
                      <Editar
                        desc={"Editar"}
                        isOpen={isFirstModalOpen}
                        onOpen={onFirstModalOpen}
                        onClose={onFirstModalClose}
                      />
                      <TrashIcon onClick={onSecondModalOpen} />
                      <ConfirmationMessage
                        isOpen={isSecondModalOpen}
                        onOpen={onSecondModalOpen}
                        onClose={onSecondModalClose}
                        icon={<WarningIcon />}
                        text={
                          "¿Estás seguro que desea eliminar a este producto?"
                        }
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
