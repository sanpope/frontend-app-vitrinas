import React, { useState } from "react";
import {
  Box,
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

export default function TablaVentas({
  displayedArticulos,
  totalResults,
  currentPage,
  totalPages,
  getMasArticulos,
  tableTitle,
  productosRestantes,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const HEADERS = [
    "Venta",
    "Fecha y Hora",
    "Precio",
    tableTitle,
    "Nota",
    "Acciones",
  ];

  const [prods, setProds] = useState(null);
  const [fechaAct, setFechaActual] = useState(null);
  const [valorTotal, setValorTotal] = useState(null);

  const handleOnOpen = (prods, date, vTotal) => {
    setProds(prods);
    setFechaActual(date);
    setValorTotal(vTotal);
    onOpen();
  };

  return (
    <>
      <Contenedor maxHeight={"460px"}>
        <thead className="">
          <tr className="">
            {HEADERS.map((name, index) => (
              <th key={index} className="ventastTh">
                {name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="">
          {displayedArticulos?.map((articulo, articuloIndex) => {
            return (
              <tr key={articuloIndex} className="">
                <td className="ventasTd">{articulo.codigo}</td>
                <td className="ventasTd">{articulo.fechaHora}</td>
                <td className="ventasTd">${articulo.valor}</td>
                <td className="ventasTd">
                  <UnorderedList>
                    <ListItem>
                      {articulo.nombre1} x {articulo.cantidad1} unds
                    </ListItem>
                    <ListItem>
                      {articulo.nombre2} x {articulo.cantidad2} unds
                      <span style={{ fontWeight: "bolder" }}>
                        y {productosRestantes} más ...
                      </span>
                    </ListItem>
                  </UnorderedList>
                </td>
                <td className="ventasTd">
                  {articulo?.generadaEnCorreccion === "true" ? (
                    <Note
                      text1={
                        "¡Transacción generada por un asesor para corregir inventario!  "
                      }
                    />
                  ) : (
                    <></>
                  )}
                </td>
                <td className="iconContainer" onClick={() => ""}>
                  <EyeIcon
                    width="20px"
                    height="20px"
                    onClick={() =>
                      handleOnOpen(
                        articulo.totalProds,
                        articulo.fechaHora,
                        articulo.valor,
                      )
                    }
                    p={1}
                  />
                  <VerExistencias
                    isOpen={isOpen}
                    onClose={onClose}
                    productos={prods}
                    fecha={fechaAct}
                    total={valorTotal}
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
    </>
  );
}
