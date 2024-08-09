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
import BottomTable from "./ui/tablas/Bottom";
import Contenedor from "./ui/tablas/Contenedor";

const HEADERS = [
  "Asesor",
  "Vitrinas",
  "Ubicación",
  "Usuario",
  "Contraseña",
  "Habilitar/Deshabilitar",
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
      <Contenedor maxHeight={"600px"}>
        <thead className="">
          <tr className="AsesorTr">
            <th className="checkBox">
              <Checkbox />
            </th>
            {HEADERS.map((name, index) => (
              <th key={index} className="AsesorTh">
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  gap={"5px"}
                  w={"100%"}
                  justifyContent={name === "Acciones" ? "center" : "flex-start"}
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
                      width={"13px"}
                      height={"13px"}
                      fill={"white"}
                      onClick={() =>
                        handleSortingClick(
                          name === "Asesor"
                            ? "asesor"
                            : name === "Vitrinas"
                              ? "vitrinas"
                              : name === "Ubicación"
                                ? "ubicacion"
                                : "",
                        )
                      }
                    />
                  ) : null}
                </Box>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="" style={{ height: "100%" }}>
          {displayedArticulos?.map((articulo, index) => {
            return (
              <tr key={index} className="">
                <td className="checkBox">
                  <Checkbox />
                </td>
                {Object.values(articulo).map((value, index) => {
                  return (
                    <td key={index} className="AsesorTd">
                      {value === `` ? (
                        <Box
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                        >
                          <SwitchElement />
                        </Box>
                      ) : (
                        value
                      )}
                    </td>
                  );
                })}
                <Box
                  display={"flex"}
                  columnGap={"20px"}
                  className="iconContainer"
                >
                  <EditIcon onClick={onSecondModalOpen} />
                  <TrashIcon onClick={onThirdModalOpen} />
                </Box>
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
    </>
  );
}
