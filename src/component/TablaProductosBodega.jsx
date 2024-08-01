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
                <th className="ThHead">
                  <Checkbox />
                </th>
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
                          onClick={
                            name === "Proveedor"
                              ? onThirdModalOpen
                              : onFourthModalOpen
                          }
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
              {displayedArticulos.map((articulo, index) => {
                return (
                  <tr key={index} className="TrBody">
                    <td className="TdBody" style={{ paddingLeft: "33px" }}>
                      <Checkbox />
                    </td>
                    {Object.values(articulo).map((value, index) => {
                      return (
                        <td key={index} className="TdBody">
                          {value}
                        </td>
                      );
                    })}
                    <Box display={"flex"} columnGap={"5px"} px={"15px"}>
                      <EditIcon onClick={onSecondModalOpen} />
                      <TrashIcon onClick={() => handleDeleteButton(articulo)} />
                    </Box>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Box>
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
      />

      {/* Modal para Editar Producto */}
      <Editar
        isOpen={isSecondModalOpen}
        onOpen={onSecondModalOpen}
        onClose={onSecondModalClose}
      />

      <Box w={"100%"} h={"100%"}>
        <Box
          w={"100%"}
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
    </>
  );
}
