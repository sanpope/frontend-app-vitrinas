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
                <td className="ventasTd">{formatFecha(articulo.fechaHora)}</td>
                <td className="ventasTd">${formatearNumero(articulo.valor)}</td>
                <td className="ventasTd">
                  <UnorderedList
                    sx={{
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
                    {articulo.productosAfectados
                      .slice(0, 2)
                      .map((articulo, index) => (
                        <ListItem key={index}>
                          {capitalizeFirstLetter(articulo.nombre)} x
                          {articulo.cantidad} unds
                        </ListItem>
                      ))}
                    <span style={{ fontWeight: "bolder" }}>
                      y {articulo.productosAfectados.length} más...
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
                    productos={articulo.productosAfectados}
                    totalProdcs={articulo.productosAfectados.length}
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
