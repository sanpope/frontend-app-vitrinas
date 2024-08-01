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

const HEADERS = [
  "Código",
  "Nombre",
  "Categoría",
  "Precio",
  "Costo",
  "Existencia",
  "Exis verificados",
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
    <Box
      mt={"5px"}
      position="relative"
      display="flex"
      flexDir="column"
      flexGrow={1}
    >
      <Box
        overflowY={"auto"}
        borderTopLeftRadius={{ base: "0px", md: "20px" }}
        borderTopRightRadius={{ base: "0px", md: "20px" }}
      >
        <table className="Table">
          <thead className="TableHead">
            <tr className="TrHead">
              <th className="" style={{ padding: "15px", marginTop: "5px" }}>
                <Checkbox />
              </th>
              {HEADERS.map((name, index) => (
                <th
                  key={index}
                  className="ThHead"
                  style={{ paddingLeft: "15px", textAlign: "left" }}
                >
                  {name}
                </th>
              ))}
            </tr>
          </thead>

          <tbody
            className="TableBody"
            style={{ height: "100%", maxHeight: "450px" }}
          >
            {displayedArticulos.map((articulo, index) => {
              return (
                <tr key={index} className="TrBody">
                  <td className="" style={{ paddingLeft: "10px" }}>
                    <Checkbox />
                  </td>
                  {Object.values(articulo).map((value, index) => {
                    return (
                      <td
                        key={index}
                        style={{ paddingLeft: "30px" }}
                        className="TdBody"
                      >
                        {value}
                      </td>
                    );
                  })}
                  <td
                    className="TdBody"
                    style={{ paddingLeft: "40px" }}
                    onClick={() => setArticulo(articulo)}
                  >
                    <EditIcon />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Box>

      <Box
        bg={"#d7d7d7"}
        px={1}
        pb={1}
        borderBottomLeftRadius={{ base: "0px", md: "20px" }}
        borderBottomRightRadius={{ base: "0px", md: "20px" }}
        color={"black"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          p={3}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"1rem"}
        >
          <Text
            display={{ base: "none", md: "inline-flex" }}
            textStyle={"RobotoRegularBold"}
          >
            {totalResults} elementos
          </Text>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={getMasArticulos}
          />
        </Box>
      </Box>
      <Editar/>
    </Box>
  );
}
