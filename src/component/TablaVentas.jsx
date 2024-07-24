import React, { useState } from "react";
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import Checkbox from "./ui/checkbox";
import LeftArrowIcon from "../assets/images/LeftArrowIcon";
import BiggerThanIcon from "../assets/images/BiggerThanIcon";
import EyeIcon from "../assets/images/EyeIcon";
import UnionIcon from "../assets/images/UnionIcon";
import TrashIcon from "../assets/images/TrashIcon";
import WarningIcon from "../assets/images/WarningIcon";
import VerExistencias from "./VerExistencias";
import Pagination from "./Pagination";

const HEADERS = [
  "Venta",
  "Fecha Y Hora",
  "Precio",
  "Productos",
  "Nota",
  "Acciones",
];

export default function TablaVentas({
  displayedArticulos,
  totalResults,
  currentPage,
  totalPages,
  getMasArticulos,
  tableTitle,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
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
                {HEADERS.map((name) => (
                  <th className="ThHead">{name}</th>
                ))}
              </tr>
            </thead>

            <tbody
              className="TableBody"
              style={{ height: "100%", maxHeight: "400px" }}
            >
              {displayedArticulos.map((articulo) => {
                return (
                  <tr className="TrBody">
                    {Object.values(articulo).map((value) => {
                      return <td className="TdBody">{value}</td>;
                    })}
                    <td
                      style={{ paddingLeft: "15px", textAlign: "end" }}
                      onClick={() => ""}
                    >
                      <EyeIcon width="20px" height="20px" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Box>
      </Box>

      <Box w={"100%"} h={"100%"}>
        <Box
          bg={"#d7d7d7"}
          px={1}
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
      </Box>
    </>
  );
}
