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
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import Checkbox from "./ui/checkbox";
import LeftArrowIcon from "../assets/images/LeftArrowIcon";
import BiggerThanIcon from "../assets/images/BiggerThanIcon";
import EditIcon from "../assets/images/EditIcon";
import EditarExistencia from "./EditarExistencia";
import Pagination from "./Pagination";

export default function TablaInventario({
  isOpen,
  onOpen,
  onClose,
  displayedArticulos,
  totalResults,
  currentPage,
  totalPages,
  getMasArticulos,
}) {
  return (
    <Box flexGrow={1} mt={"20px"} overflowX={"auto"}>
      <TableContainer
        borderTopLeftRadius={"20px"}
        borderTopRightRadius={"20px"}
      >
        <Table variant="simple" w={"100%"} bg={"black"}>
          <Thead h={"50px"}>
            <Tr>
              <Th p={1}></Th>
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
                  Nombre
                </Text>
              </Th>
              <Th p={1}>
                <Text
                  color="white"
                  textStyle={"RobotoRegularBold"}
                  textTransform={"capitalize"}
                  textAlign={"center"}
                >
                  Categoría
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
              <Th p={1}>
                <Text
                  color="white"
                  textStyle={"RobotoRegularBold"}
                  textTransform={"capitalize"}
                  textAlign={"center"}
                >
                  Existencia
                </Text>
              </Th>
              <Th p={1}>
                <Text
                  color="white"
                  textStyle={"RobotoRegularBold"}
                  textTransform={"capitalize"}
                  textAlign={"center"}
                >
                  Exis verificados
                </Text>
              </Th>
              <Th p={1}>
                <Text
                  color="white"
                  textStyle={"RobotoRegularBold"}
                  textTransform={"capitalize"}
                  textAlign={"center"}
                >
                  Stok mín
                </Text>
              </Th>
              <Th p={1}>
                <Text
                  color="white"
                  textStyle={"RobotoRegularBold"}
                  textTransform={"capitalize"}
                  textAlign={"center"}
                >
                  Stok máx
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
                <Tr>
                  <Th p={1}>
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
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
                      {articulo.Código}
                    </Text>
                  </Th>
                  <Th p={1}>
                    <Text
                      color="black"
                      textStyle={"RobotoRegular"}
                      textTransform={"capitalize"}
                      textAlign={"center"}
                    >
                      {" "}
                      {articulo.Nombre}
                    </Text>
                  </Th>
                  <Th p={1}>
                    <Text
                      color="black"
                      textStyle={"RobotoRegular"}
                      textTransform={"capitalize"}
                      textAlign={"center"}
                    >
                      {articulo.Categoría}
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
                      {articulo.Existencia}
                    </Text>
                  </Th>
                  <Th p={1}>
                    <Text
                      color="black"
                      textStyle={"RobotoRegular"}
                      textTransform={"capitalize"}
                      textAlign={"center"}
                    >
                      {articulo.Exis_verificadas}
                    </Text>
                  </Th>
                  <Th p={1}>
                    <Text
                      color="black"
                      textStyle={"RobotoRegular"}
                      textTransform={"capitalize"}
                      textAlign={"center"}
                    >
                      {articulo.Stock_mín}
                    </Text>
                  </Th>
                  <Th p={1}>
                    <Text
                      color="black"
                      textStyle={"RobotoRegular"}
                      textTransform={"capitalize"}
                      textAlign={"center"}
                    >
                      {articulo.Stock_máx}
                    </Text>
                  </Th>
                  <Th>
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <EditIcon onClick={onOpen} />
                      <EditarExistencia
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onClose={onClose}
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
