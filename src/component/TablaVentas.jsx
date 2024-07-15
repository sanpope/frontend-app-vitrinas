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
  TableContainer,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import Checkbox from "./ui/checkbox";
import LeftArrowIcon from "../assets/images/LeftArrowIcon";
import BiggerThanIcon from "../assets/images/BiggerThanIcon";
import EyeIcon from "../assets/images/EyeIcon";
import UnionIcon from "../assets/images/UnionIcon";
import TrashIcon from "../assets/images/TrashIcon";
import WarningIcon from "../assets/images/WarningIcon";
import VerExistencias from "./VerExistencias";
import Pagination from "./Pagination";

export default function TablaVentas({
  displayedArticulos,
  totalResults,
  currentPage,
  totalPages,
  getMasArticulos,
  tableTitle,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
                <Text
                  color="white"
                  textStyle={"RobotoRegularBold"}
                  textTransform={"capitalize"}
                  textAlign={"center"}
                >
                  Venta
                </Text>
              </Th>
              <Th p={1}>
                <Text
                  color="white"
                  textStyle={"RobotoRegularBold"}
                  textTransform={"capitalize"}
                  textAlign={"center"}
                >
                  Fecha y Hora
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
                  {tableTitle}
                </Text>
              </Th>
              <Th p={1}>
                <Text
                  color="white"
                  textStyle={"RobotoRegularBold"}
                  textTransform={"capitalize"}
                  textAlign={"center"}
                >
                  Nota
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
          <Tbody bg={"white"} overflowY={"scroll"}>
            {displayedArticulos.map((articulo) => {
              return (
                <Tr color="black">
                  <Th p={1}>
                    <Text
                      color="black"
                      textStyle={"RobotoRegular"}
                      textTransform={"capitalize"}
                      textAlign={"center"}
                    >
                      {articulo.venta}
                    </Text>
                  </Th>
                  <Th p={1}>
                    <Text
                      color="black"
                      textStyle={"RobotoRegular"}
                      textTransform={"capitalize"}
                      textAlign={"center"}
                    >
                      {articulo.fechaYhora}
                    </Text>
                  </Th>
                  <Th p={1}>
                    <Text
                      color="black"
                      textStyle={"RobotoRegular"}
                      textTransform={"capitalize"}
                      textAlign={"center"}
                    >
                      {articulo.precio}
                    </Text>
                  </Th>
                  <Th p={1}>
                    <Text
                      color="black"
                      textStyle={"RobotoRegular"}
                      textTransform={"capitalize"}
                      textAlign={"center"}
                    >
                      {articulo.productos}
                    </Text>
                  </Th>
                  <Th p={1}>
                    <Box>
                      <Text
                        color="black"
                        textStyle={"RobotoRegular"}
                        textTransform={"capitalize"}
                        textAlign={"center"}
                      >
                        {articulo.nota}
                      </Text>
                    </Box>
                  </Th>

                  <Th>
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <EyeIcon
                        onClick={onOpen}
                        width={"18px"}
                        height={"18px"}
                      />
                    </Box>

                    <VerExistencias
                      isOpen={isOpen}
                      onOpen={onOpen}
                      onClose={onClose}
                    />
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
