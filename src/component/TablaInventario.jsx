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
          {displayedArticulos != null && displayedArticulos.length > 0 ? (
            <tbody>
              {displayedArticulos?.map((articulo, index) => {
                return (
                  <tr key={index} className="" style={{ cursor: "pointer" }}>
                    {Object.entries(articulo)
                      .filter((keyValArr) => {
                        if (
                          keyValArr[0] === "precio" ||
                          keyValArr[0] === "costo"
                        ) {
                          keyValArr[1] = "$" + keyValArr[1];
                        }
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
                      <span
                        style={{
                          display: "inline-block",
                          height: "100%",
                          verticalAlign: "middle",
                        }}
                      ></span>
                      <EditIcon
                        width="16px"
                        height="16px"
                        onClick={() => setArticulo(articulo)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tbody style={{ height: "100%" }}>
              <tr style={{ height: "350px", borderBottom: "none" }}>
                <td
                  colSpan={HEADERS.length}
                  style={{
                    textAlign: "center",
                    verticalAlign: "middle",
                    padding: "20px",
                    color: "grey",
                  }}
                >
                  No se encontraron productos
                </td>
              </tr>
            </tbody>
          )}
        </Contenedor>
      </Box>
      <BottomTable
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={getMasArticulos}
        totalResults={
          displayedArticulos !== null ? displayedArticulos?.length : "0"
        }
      />
      <Editar />
    </Box>
  );
}
