import React, { useCallback, useState, useEffect } from "react";
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
import Pagination from "../component/Pagination";
import BottomTable from "./ui/tablas/Bottom";
import Contenedor from "./ui/tablas/Contenedor";

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
  funcConfirmar,
}) {
  const [focusRow, setFocusRow] = useState(null);

  const handleDeleteButton = (art) => {
    setFocusRow(art);
    onSixthModalOpen();
  };

  return (
    <Box h="full">
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
                <th key={index} className="ProdTh">
                  {name === "Código" ||
                  name === "Precio" ||
                  name === "Costo" ? (
                    <Text
                      color="white"
                      textStyle={"RobotoRegularBold"}
                      textTransform={"capitalize"}
                    >
                      {name}
                    </Text>
                  ) : (
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      gap={"5px"}
                      w={"100%"}
                      height={"100%"}
                    >
                      <Text
                        color="white"
                        textStyle={"RobotoRegularBold"}
                        textTransform={"capitalize"}
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
                          width={"18px"}
                          height={"18px"}
                          fill={"white"}
                          onClick={
                            name === "Proveedor"
                              ? onThirdModalOpen
                              : onFourthModalOpen
                          }
                        />
                      ) : null}
                    </Box>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          {displayedArticulos != null && displayedArticulos.length > 0 ? (
            <tbody className="" style={{ height: "100%" }}>
              {displayedArticulos.map((articulo, index) => {
                return (
                  <tr key={index} className="">
                    {Object.values(articulo).map((value, index) => {
                      return (
                        <td key={index} className="ProdTd">
                          {value}
                        </td>
                      );
                    })}
                    <Box
                      display={"flex"}
                      columnGap={"20px"}
                      px={"15px"}
                      className="iconContainer"
                    >
                      <EditIcon
                        onClick={onSecondModalOpen}
                        width="19px"
                        height="19px"
                      />
                      <TrashIcon
                        onClick={() => handleDeleteButton(articulo)}
                        width="19px"
                        height="19px"
                      />
                    </Box>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tbody style={{ height: "100%" }}>
              <tr style={{ height: "350px", borderBottom: "none" }}>
                <td
                  colSpan={HEADERS.length}
                  style={{
                    textAlign: "center",
                    verticalAlign: "middle",
                    padding: "20px",
                    color: "grey",
                  }}
                >
                  No se encontraron productos
                </td>
              </tr>
            </tbody>
          )}
        </Contenedor>
      </Box>

      {/* Modal que abre la Lista de Proveedores */}
      <ListComponent
        desc={"Proveedores"}
        desc2={"Proveedor"}
        isFirstModalOpen={isThirdModalOpen}
        onFirstModalOpen={onThirdModalOpen}
        onFirstModalClose={onThirdModalClose}
        lista={lista1}
        isSecondModalOpen={isFifthModalOpen}
        onSecondModalOpen={onFifthModalOpen}
        onSixthModalClose={onFifthModalClose}
        /* Modal que abre el modal Agregar Proveedor */
        Children={
          <Agregar
            isOpen={isFifthModalOpen}
            onOpen={onFifthModalOpen}
            onClose={onFifthModalClose}
            desc={"Proveedor"}
            desc2={"example"}
          />
        }
      />

      {/* Modal que abre la Lista de Categorias */}
      <ListComponent
        desc={"Categorías"}
        desc2={"Categoría"}
        isFirstModalOpen={isFourthModalOpen}
        onFirstModalOpen={onFourthModalOpen}
        onFirstModalClose={onFourthModalClose}
        lista={lista2}
        isSecondModalOpen={isFirstModalOpen}
        onSecondModalOpen={onFirstModalOpen}
        onSixthModalClose={onFirstModalClose}
        /* Modal que abre el modal Agregar Categoria */
        Children={
          <AgregarCategoria
            isOpen={isFirstModalOpen}
            onOpen={onFirstModalOpen}
            onClose={onFirstModalClose}
          />
        }
      />

      {/*Modal para Eliminar*/}
      <ConfirmationMessage
        icon={<WarningIcon />}
        text={"¿Estás seguro que desea eliminar a este producto?"}
        text2={
          "Esta cción eliminará permanentemente los registros de este producto de tu sistema"
        }
        colorText2={"red.100"}
        isOpen={isSixthModalOpen}
        onOpen={onSixthModalOpen}
        onClose={onSixthModalClose}
        focusRow={focusRow}
        funcConfirmar={funcConfirmar}
        products={null}
      />

      {/* Modal para Editar Producto */}
      <Editar
        isOpen={isSecondModalOpen}
        onOpen={onSecondModalOpen}
        onClose={onSecondModalClose}
      />

      <BottomTable
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={getMasArticulos}
        totalResults={totalResults}
      />
    </Box>
  );
}
