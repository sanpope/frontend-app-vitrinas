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
  const [active, setActive] = useState(0);
  return (
    <>
      {displayedArticulos != null ? (
        <>
          <Contenedor maxHeight={"470px"}>
            <thead className="">
              <tr className="">
                <th className="checkBox">
                  <Checkbox />
                </th>
                {HEADERS?.map((name, index) => (
                  <th key={index} className="inventTh">
                    {name}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="">
              {displayedArticulos?.map((articulo, index) => {
                return (
                  <tr key={index} className="" style={{ cursor: "pointer" }}>
                    <td className="checkBox">
                      <Checkbox onClick={() => setActive(index)} />
                    </td>
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
          <BottomTable
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={getMasArticulos}
            totalResults={totalResults}
          />

          <Editar />
        </>
      ) : (
        <Text>No se encontraron productos</Text>
      )}
    </>
  );
}
