import React, { useState, useEffect, useRef } from "react";
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
              {HEADERS.map((name, index) => (
                <th key={index} className="ventastTh">
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          {console.log(displayedArticulos)}
          {displayedArticulos !== null && displayedArticulos?.length > 0 ? (
            <tbody>
              {displayedArticulos?.map((articulo, articuloIndex) => {
                const productosVisibles =
                  articulo?.productosAfectados?.slice(0, 2) || [];
                const productosRestantes =
                  (articulo?.productosAfectados?.length || 0) - 2;
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
                      <ul
                        style={{ listStyleType: "disc", paddingLeft: "20px" }}
                      >
                        {productosVisibles.map((producto, index) => (
                          <li key={index} style={{ marginBottom: "5px" }}>
                            {capitalizeFirstLetter(producto?.nombre)} x{" "}
                            {producto?.cantidad} unds
                            {index === productosVisibles.length - 1 &&
                              productosRestantes > 0 && (
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    marginLeft: "5px",
                                  }}
                                >
                                  y {productosRestantes} más...
                                </span>
                              )}
                          </li>
                        ))}
                      </ul>
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
                    {`No se encontraron ${selectedOption} para mostrar.`}
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
        totalResults={
          displayedArticulos !== null ? displayedArticulos?.length : 0
        }
      />
    </Box>
  );
}
