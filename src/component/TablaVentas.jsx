import React, { useState } from "react";
import {
  Box,
  HStack,
  ListItem,
  Text,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import EyeIcon from "../assets/images/EyeIcon";
import VerExistencias from "./VerExistencias";
import Note from "../component/Note";
import BottomTable from "./ui/tablas/Bottom";
import Contenedor from "./ui/tablas/Contenedor";
import {
  formatFecha,
  formatearNumero,
  capitalizeFirstLetter,
} from "../utils/formatting";

export default function TablaVentas({
  displayedArticulos,
  totalResults,
  currentPage,
  totalPages,
  getMasArticulos,
  tableTitle,
  selectedOption,
  setProds,
  setFecha,
  setValorTotal,
  isOpen,
  onOpen,
  onClose,
}) {
  const HEADERS = [
    "Venta",
    "Fecha y Hora",
    "Precio",
    tableTitle,
    "Nota",
    "Acciones",
  ];

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
              {HEADERS.map((name, index) => (
                <th key={index} className="ventastTh">
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          {displayedArticulos !== null && displayedArticulos?.length > 0 ? (
            <tbody>
              {displayedArticulos?.map((articulo, articuloIndex) => {
                return (
                  <tr key={articuloIndex} className="">
                    <td className="ventasTd">{articulo.codigo}</td>
                    <td className="ventasTd">
                      {formatFecha(articulo.fechaHora)}
                    </td>
                    <td className="ventasTd">
                      ${formatearNumero(articulo.valor)}
                    </td>
                    <td className="ventasTd">
                      <UnorderedList
                        sx={{
                          listStyleType: "disc",
                          "::-webkit-scrollbar": {
                            width: "8px",
                            height: "4px",
                          },
                          "::-webkit-scrollbar-track": {
                            background: "tranparent",
                          },
                          "::-webkit-scrollbar-thumb": {
                            background: "gray.200",
                            borderRadius: "10px",
                          },
                          "::-webkit-scrollbar-thumb:hover": {
                            background: "gray.200",
                          },
                        }}
                      >
                        {articulo?.productosAfectados
                          .slice(0, 2)
                          .map((articulo, index) => (
                            <ListItem
                              key={index}
                              display={"block"}
                              w={"100%"}
                              textAlignLast={"right"}
                            >
                              {capitalizeFirstLetter(articulo.nombre)} x
                              {articulo.cantidad} unds
                            </ListItem>
                          ))}
                        <span style={{ fontWeight: "bolder" }}>
                          {articulo.productosAfectados.length - 2 > 0
                            ? "y "
                            : ""}
                          {articulo.productosAfectados.length - 2 > 0
                            ? articulo.productosAfectados.length - 2 + " más..."
                            : ""}
                        </span>
                      </UnorderedList>
                    </td>
                    <td className="ventasTd">
                      {articulo?.generadaEnCorreccion === "true" ? (
                        <Note
                          arr={null}
                          text2={
                            "¡Transacción generada por un asesor para corregir inventario!  "
                          }
                        />
                      ) : (
                        <></>
                      )}
                    </td>
                    <td className="iconContainer">
                      <EyeIcon
                        width="20px"
                        height="20px"
                        onClick={() => {
                          onOpen();
                          setProds(articulo.productosAfectados);
                          setFecha(articulo.fechaHora);
                          setValorTotal(articulo.valor);
                        }}
                        p={1}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tbody>
              <tr style={{ height: "200px", borderBottom: "none" }}>
                <td
                  colSpan={HEADERS.length}
                  style={{
                    textAlign: "center",
                    verticalAlign: "middle",
                    padding: "20px",
                    color: "grey",
                  }}
                >
                  {`No se encontraron ${selectedOption} para mostrar, en el rango seleccionado.`}
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
          displayedArticulos !== null ? displayedArticulos?.length : 0
        }
      />
    </Box>
  );
}
