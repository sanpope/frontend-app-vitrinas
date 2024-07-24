import React, { useCallback, useState, useEffect } from "react";
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import axios from "axios";
import Checkbox from "./ui/checkbox";
import LeftArrowIcon from "../assets/images/LeftArrowIcon";
import BiggerThanIcon from "../assets/images/BiggerThanIcon";
import EditIcon from "../assets/images/EditIcon";
import EditarExistencia from "./EditarExistencia";
import ConfirmationMessage from "./ConfirmationMessage";
import UnionIcon from "../assets/images/UnionIcon";
import TrashIcon from "../assets/images/TrashIcon";
import WarningIcon from "../assets/images/WarningIcon";
import Editar from "../component/Ingresar_Editar_Producto";
import ListComponent from "../component/ListComponent";
import Agregar from "./Agregar";
import AgregarCategoria from "./AgregarCategoria";
import Pagination from "../component/Pagination";

const HEADERS = [
  "Productos",
  "Código",
  "Precio",
  "Costo",
  "Bodega",
  "Vitrinas",
  "Proveedor",
  "Categorías",
  "Acciones",
];

export default function TablaProductosBodega({
  isFirstModalOpen,
  onFirstModalOpen,
  onFirstModalClose,
  isSecondModalOpen,
  onSecondModalOpen,
  onSecondModalClose,
  isThirdModalOpen,
  onThirdModalOpen,
  onThirdModalClose,
  isFourthModalOpen,
  onFourthModalOpen,
  onFourthModalClose,
  isFifthModalOpen,
  onFifthModalOpen,
  onFifthModalClose,
  isSixthModalOpen,
  onSixthModalOpen,
  onSixthModalClose,
  lista1,
  lista2,
  displayedArticulos,
  handleSortingClick,
  totalResults,
  currentPage,
  totalPages,
  getMasArticulos,
}) {
  return (
    <Box
      mt={"5px"}
      position="relative"
      width="100%"
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
              <th className="ThHead">
                <Checkbox />
              </th>
              {HEADERS.map((name) => (
                <th className="ThHead">
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={"5px"}
                  >
                    <Text
                      color="white"
                      textStyle={"RobotoRegularBold"}
                      textTransform={"capitalize"}
                      textAlign={"center"}
                    >
                      {name}
                    </Text>
                    {name === "Productos" ||
                    name === "Bodega" ||
                    name === "Vitrinas" ? (
                      <UnionIcon
                        width={"10px"}
                        height={"10px"}
                        fill={"white"}
                        onClick={() => handleSortingClick("productos")}
                      />
                    ) : name === "Proveedor" || name === "Categorías" ? (
                      <EditIcon
                        width={"15px"}
                        height={"15px"}
                        fill={"white"}
                        onClick={onThirdModalOpen}
                      />
                    ) : null}
                  </Box>
                </th>
              ))}
            </tr>
          </thead>
          <tbody
            className="TableBody"
            style={{ height: "100%", maxHeight: "450px" }}
          >
            {displayedArticulos.map((articulo) => {
              return (
                <tr className="TrBody">
                  <td className="TdBody" style={{ paddingLeft: "33px" }}>
                    <Checkbox />
                  </td>
                  {Object.values(articulo).map((value) => {
                    return <td className="TdBody">{value}</td>;
                  })}
                  <Box display={"flex"} columnGap={"5px"} px={"15px"}>
                    <EditIcon onClick={() => ""} />
                    <TrashIcon onClick={() => ""} />
                  </Box>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Box
          bg={"#d7d7d7"}
          p={1}
          borderBottomLeftRadius={{ base: "0px", md: "20px" }}
          borderBottomRightRadius={{ base: "0px", md: "20px" }}
          color={"black"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box
            p={2}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"1rem"}
          >
            <Text textStyle={"RobotoRegularBold"}>
              {totalResults} elementos
            </Text>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={getMasArticulos}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
