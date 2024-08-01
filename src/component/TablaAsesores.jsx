import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
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
import SwitchElement from "./SwitchElement";
import EditarAsesor from "./EditarAsesor";
import Pagination from "./Pagination";

const HEADERS = [
  <Checkbox />,
  "Asesor",
  "Vitrinas",
  "Ubicación",
  "Usuario",
  "Contraseña",
  "Habilitar/Deshabilitar Asesor",
  "Acciones",
];

export default function TablaProductosBodega({
  isSecondModalOpen,
  onSecondModalOpen,
  onSecondModalClose,
  isThirdModalOpen,
  onThirdModalOpen,
  onThirdModalClose,
  displayedArticulos,
  totalResults,
  currentPage,
  totalPages,
  getMasArticulos,
  handleSortingClick,
}) {
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
                {HEADERS.map((name, index) => (
                  <th key={index} className="ThHead">
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
                      {name === "Asesor" ||
                      name === "Vitrinas" ||
                      name === "Ubicación" ? (
                        <UnionIcon
                          width={"10px"}
                          height={"10px"}
                          fill={"white"}
                          onClick={() => handleSortingClick("productos")}
                        />
                      ) : null}
                    </Box>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody
              className="TableBody"
              style={{ height: "100%", maxHeight: "500px" }}
            >
              {displayedArticulos.map((articulo, index) => {
                return (
                  <tr key={index} className="TrBody">
                    <td className="TdBody" style={{ paddingLeft: "20px" }}>
                      <Checkbox />
                    </td>
                    {Object.values(articulo).map((value, index) => {
                      return (
                        <td
                          key={index}
                          className="TdBody"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            columnGap: "5px",
                            textAlign: "left",
                          }}
                        >
                          {value}
                          {value ===
                          `Habilitar / deshabilitar para modificar` ? (
                            <SwitchElement />
                          ) : null}
                        </td>
                      );
                    })}
                    <Box display={"flex"} columnGap={"5px"}>
                      <EditIcon onClick={onSecondModalOpen} />
                      <TrashIcon onClick={onThirdModalOpen} />
                    </Box>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Box>
      </Box>
      <Box w={"100%"} h={"1000%"}>
        <Box
          w={"100%"}
          bg={"#d7d7d7"}
          p={1}
          borderBottomLeftRadius={"20px"}
          borderBottomRightRadius={"20px"}
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

      <Box w={"100%"} mt={"20px"} overflowX={"auto"}>
        <EditarAsesor
          desc={"Editar"}
          isOpen={isSecondModalOpen}
          onOpen={onSecondModalOpen}
          onClose={onSecondModalClose}
        />
        <ConfirmationMessage
          isOpen={isThirdModalOpen}
          onOpen={onThirdModalOpen}
          onClose={onThirdModalClose}
          icon={<WarningIcon />}
          text={"¿Estás seguro que desea eliminar a este Asesor?"}
          text2={
            "Esta acción eliminará permanentemente los registros de este asesor de tu sistema"
          }
          colorText2={"red.100"}
          buttonText={"Continuar"}
        />
      </Box>
    </>
  );
}
