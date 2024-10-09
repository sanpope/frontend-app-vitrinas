import React, { useState, useEffect, useRef } from "react";
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
  const [parentHeight, setParentHeight] = useState(0);
  const parentRef = useRef(null);

  useEffect(() => {
    const updateHeight = () => {
      if (parentRef.current) {
        setParentHeight(parentRef.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <Box h="100%">
      <Box
        h="calc(100% - 60px)"
        bgColor={"white"}
        borderTopLeftRadius={{ base: "0px", md: "20px" }}
        borderTopRightRadius={{ base: "0px", md: "20px" }}
        ref={parentRef}
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
            <tbody>
              <tr
                style={{
                  borderBottom: "none",
                }}
              >
                <td
                  colSpan={HEADERS.length}
                  style={{
                    height: `${parentHeight - 80}px`,
                    textAlign: "center",
                    verticalAlign: "middle",
                    color: "grey",
                  }}
                >
                  <Text
                    display={"flex"}
                    height={"100%"}
                    width={{ base: "50%", lg: "100%" }}
                    color={"grey.placeholder"}
                    textStyle={"RobotoBody"}
                    justifyContent={{ base: "flex-start", lg: "center" }}
                    alignItems={"center"}
                  >
                    No se encontraron productos.
                  </Text>
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
        totalResults={displayedArticulos ? displayedArticulos?.length : "0"}
      />
      <Editar />
    </Box>
  );
}
