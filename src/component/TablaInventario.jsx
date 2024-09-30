import React, { useState } from "react";
import { Box, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import axios from "axios";
import Checkbox from "./ui/checkbox";
import LeftArrowIcon from "../assets/images/LeftArrowIcon";
import BiggerThanIcon from "../assets/images/BiggerThanIcon";
import EditIcon from "../assets/images/EditIcon";
import Editar from "../component/Editar";
import EditarProducto from "../component/EditarProducto";
import WarningIcon from "../assets/images/WarningIcon";

import Pagination from "./Pagination";
import BottomTable from "./ui/tablas/Bottom";
import Contenedor from "./ui/tablas/Contenedor";

const HEADERS = [
  "Código",
  "Nombre",
  "Categoría",
  "Precio",
  "Costo",
  "Existencia",
  "Exis verificadas",
  "Stok mín",
  "Stok máx",
  "Acciones",
];

export default function TablaInventario({
  displayedArticulos,
  totalResults,
  currentPage,
  totalPages,
  getMasArticulos,
  setArticulo,
}) {
  return (
    <Box h="100%">
      <Box
        h="calc(100% - 60px)"
        bgColor={"white"}
        borderTopLeftRadius={{ base: "0px", md: "20px" }}
        borderTopRightRadius={{ base: "0px", md: "20px" }}
      >
        {displayedArticulos != null ? (
          <Contenedor>
            <thead className="">
              <tr className="">
                {HEADERS?.map((name, index) => (
                  <th key={index} className="inventTh">
                    {name}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {displayedArticulos?.map((articulo, index) => {
                return (
                  <tr key={index} className="" style={{ cursor: "pointer" }}>
                    {Object.entries(articulo)
                      .filter((keyValArr) => {
                        return keyValArr[0] != "proveedor";
                      })
                      .map((keyValArr, index) => {
                        return (
                          <td key={index} className="inventTd">
                            {keyValArr[1]}
                          </td>
                        );
                      })}
                    <td className="iconContainer">
                      <EditIcon
                        width="18px"
                        height="18px"
                        onClick={() => setArticulo(articulo)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Contenedor>
        ) : (
          <Box
            display="flex"
            h="full"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text>No se encontraron productos</Text>
          </Box>
        )}
      </Box>
      <BottomTable
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={getMasArticulos}
        totalResults={totalResults}
      />
      <Editar />
    </Box>
  );
}
