import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

export default function Tabla() {
  return (
    <Box p={4}>
      <TableContainer borderRadius={"20px"}>
        <Table variant="simple">
          <TableCaption>Elementos de la tabla </TableCaption>
          <Thead bg={"black"}>
            <Tr>
              <Th color={"white"}></Th>
              <Th color={"white"}>Código</Th>
              <Th color={"white"}>Nombre</Th>
              <Th color={"white"}>Categoría</Th>
              <Th color={"white"}>Precio</Th>
              <Th color={"white"}>Costo</Th>
              <Th color={"white"}>Existencia</Th>
              <Th color={"white"}>Exis verificadas</Th>
              <Th color={"white"}>Stock mín</Th>
              <Th color={"white"}>Stock máx</Th>
              <Th color={"white"}>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody bg={"white"}>
            <Tr>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
            </Tr>
            <Tr>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
            </Tr>
            <Tr>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
