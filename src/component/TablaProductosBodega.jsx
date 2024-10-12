import React, { useCallback, useState, useEffect, useRef } from "react";
import { Box, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import EditIcon from "../assets/images/EditIcon";
import ConfirmationMessage from "./ConfirmationMessage";
import UnionIcon from "../assets/images/UnionIcon";
import TrashIcon from "../assets/images/TrashIcon";
import WarningIcon from "../assets/images/WarningIcon";
import Editar from "./EditarProducto";
import ListComponent from "../component/ListComponent";
import Agregar from "./Agregar";
import AgregarCategoria from "./AgregarCategoria";
import Pagination from "../component/Pagination";
import BottomTable from "./ui/tablas/Bottom";
import Contenedor from "./ui/tablas/Contenedor";
import EditarProducto from "./EditarProducto";

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
  listaProveedores,
  setListaProveedores,
  listaCategorias,
  setListaCategorias,
  displayedArticulos,
  handleSortingClick,
  totalResults,
  currentPage,
  totalPages,
  getMasArticulos,
  productSelected,
  setProductSelected,
  editProducto,
  deleteProducto,
}) {
  const toast = useToast();
  const [focusRow, setFocusRow] = useState(null);
  const [parentHeight, setParentHeight] = useState(0);
  const parentRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const crearCategoria = async (nuevaCategoria) => {
    const category = new URLSearchParams();
    category.append("nombre", `${nuevaCategoria}`);

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/bodega/categorias`,
        category,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      if (response.status === 200) {
        const index = listaCategorias?.findIndex(
          (cat) => cat?.toLowerCase() === nuevaCategoria?.toLowerCase(),
        );
        if (index === -1) {
          setListaCategorias((prev) => {
            let copy = prev ? [...prev] : [];
            copy.push(nuevaCategoria);
            return copy;
          });
          toast({
            status: "success",
            description: "Categoría creado con éxito!",
            duration: 3000,
            position: "top-right",
            isClosable: true,
          });
        }
      } else {
        toast({
          status: "info",
          description: "La categoría ya existe, no se agregó.",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        status: "error",
        description: "Error creando la Categoría.",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const editCategoria = async (currentCategoria, categoriaUpdated, onClose) => {
    const uptCategoria = new URLSearchParams();
    uptCategoria.append("nuevoNombreCategoria", `${categoriaUpdated}`);

    setIsLoading(true);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/bodega/categorias?nombreCategoria=${currentCategoria}`,
        uptCategoria,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      if (response.status === 200) {
        const index = listaCategorias?.findIndex(
          (cat) => cat?.toLowerCase() === currentCategoria?.toLowerCase(),
        );

        if (index !== -1) {
          setListaCategorias((prev) => {
            let copy = prev ? [...prev] : [];
            copy.splice(index, 1, categoriaUpdated);

            return copy;
          });
          toast({
            status: "success",
            description: "Categoría actualizada con éxito!",
            duration: 3000,
            position: "top-right",
            isClosable: true,
          });
        }
      } else {
        toast({
          status: "info",
          description: "La categoría ya existe, no se agregó.",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        status: "error",
        description: "Error actualizando la Categoría.",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  const deleteCategoria = async (currentCategoria) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/bodega/categorias?nombreCategoria=${currentCategoria}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      if (response.status === 200) {
        const index = listaCategorias?.findIndex(
          (cat) => cat?.toLowerCase() === currentCategoria?.toLowerCase(),
        );

        if (index !== -1) {
          setListaCategorias((prev) => {
            let copy = prev ? [...prev] : [];

            copy = copy.filter(
              (cat) => cat?.toLowerCase() !== currentCategoria?.toLowerCase(),
            );

            return copy;
          });
          toast({
            status: "success",
            description: "Categoría eliminada con éxito!",
            duration: 3000,
            position: "top-right",
            isClosable: true,
          });
        }
      }
    } catch (error) {
      toast({
        status: "error",
        description: "Error eliminando la Categoría.",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const crearProveedor = async (nuevoProveedor) => {
    const prov = new URLSearchParams();
    prov.append("nombreProveedor", `${nuevoProveedor}`);

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/bodega/proveedores`,
        prov,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      if (response.status === 200) {
        const index = listaProveedores?.findIndex(
          (cat) => cat?.toLowerCase() === nuevoProveedor?.toLowerCase(),
        );
        if (index === -1) {
          setListaProveedores((prev) => {
            let copy = prev ? [...prev] : [];
            copy.push(nuevoProveedor);
            return copy;
          });
          toast({
            status: "success",
            description: "Proveedor creado con éxito!",
            duration: 3000,
            position: "top-right",
            isClosable: true,
          });
        }
      } else {
        toast({
          status: "info",
          description: "El proveedor ya existe, no se agregó.",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        status: "error",
        description: "Error creando el proveedor.",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const editProveedor = async (currentProveedor, proveedorUpdated, onClose) => {
    const uptProveedor = new URLSearchParams();
    uptProveedor.append("nuevoNombreProveedor", `${proveedorUpdated}`);

    setIsLoading(true);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/bodega/proveedores?nombreProveedor=${currentProveedor}`,
        uptProveedor,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      if (response.status === 200) {
        const index = listaProveedores?.findIndex(
          (prov) => prov?.toLowerCase() === currentProveedor?.toLowerCase(),
        );

        if (index !== -1) {
          setListaProveedores((prev) => {
            let copy = prev ? [...prev] : [];
            copy.splice(index, 1, proveedorUpdated);
            return copy;
          });
          toast({
            status: "success",
            description: "Proveedor actualizado con éxito!",
            duration: 3000,
            position: "top-right",
            isClosable: true,
          });
        }
      } else {
        toast({
          status: "info",
          description: "El proveedor ya existe, no se agregó.",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        status: "error",
        description: "Error actualizando el Proveedor.",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  const deleteProveedor = async (currentProveedor) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/bodega/proveedores?nombreProveedor=${currentProveedor}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      if (response.status === 200) {
        const index = listaProveedores?.findIndex(
          (cat) => cat?.toLowerCase() === currentProveedor?.toLowerCase(),
        );
        if (index !== -1) {
          setListaProveedores((prev) => {
            let copy = prev ? [...prev] : [];

            copy = copy.filter(
              (prov) => prov?.toLowerCase() !== currentProveedor?.toLowerCase(),
            );
            return copy;
          });
          toast({
            status: "success",
            description: "Proveedor eliminado con éxito!",
            duration: 3000,
            position: "top-right",
            isClosable: true,
          });
        }
      }
    } catch (error) {
      toast({
        status: "error",
        description: "Error eliminando el proveedor.",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box h="full">
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
                    <td className="iconContainer">
                      <span
                        style={{
                          display: "inline-block",
                          height: "100%",
                          verticalAlign: "middle",
                          marginLeft: "15px",
                        }}
                      ></span>
                      <EditIcon
                        onClick={() => {
                          setProductSelected(articulo);
                          onSecondModalOpen();
                        }}
                        width="17px"
                        height="17px"
                      />
                      <TrashIcon
                        onClick={() => {
                          setFocusRow(articulo?.codigo);

                          onSixthModalOpen();
                        }}
                        width="17px"
                        height="17px"
                      />
                    </td>
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
                    No se encontraron productos
                  </Text>
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
        lista={listaProveedores}
        isSecondModalOpen={isFifthModalOpen}
        onSecondModalOpen={onFifthModalOpen}
        onSixthModalClose={onFifthModalClose}
        isLoading={isLoading}
        funcionEditar={editProveedor}
        funcionEliminar={deleteProveedor}
      />
      {/* Modal que abre el modal Agregar Proveedor*/}

      <Agregar
        isOpen={isFifthModalOpen}
        onOpen={onFifthModalOpen}
        onClose={onFifthModalClose}
        desc={"Proveedor"}
        desc2={"Nombre del Proveedor"}
        isLoading={isLoading}
        Agregar={crearProveedor}
      />

      {/* Modal que abre la Lista de Categorias */}
      <ListComponent
        desc={"Categorías"}
        desc2={"Categoría"}
        isFirstModalOpen={isFourthModalOpen}
        onFirstModalOpen={onFourthModalOpen}
        onFirstModalClose={onFourthModalClose}
        lista={listaCategorias}
        isSecondModalOpen={isFirstModalOpen}
        onSecondModalOpen={onFirstModalOpen}
        onSixthModalClose={onFirstModalClose}
        isLoading={isLoading}
        funcionEditar={editCategoria}
        funcionEliminar={deleteCategoria}
      />
      {/* Modal que abre el modal Agregar Categoria */}
      <AgregarCategoria
        isOpen={isFirstModalOpen}
        onOpen={onFirstModalOpen}
        onClose={onFirstModalClose}
        desc={"Categoría"}
        desc2={"Nombre de la Categoría"}
        isLoading={isLoading}
        Agregar={crearCategoria}
      />

      {/*Modal para Eliminar Producto*/}

      <ConfirmationMessage
        icon={<WarningIcon />}
        text={`¿Estás seguro que desea eliminar ${""}`}
        text2={
          "Esta cción eliminará permanentemente los registros de este producto de tu sistema"
        }
        colorText2={"red.100"}
        isOpen={isSixthModalOpen}
        onOpen={onSixthModalOpen}
        onClose={onSixthModalClose}
        focusRow={focusRow}
        funcConfirmar={deleteProducto}
      />
      {/* Modal para Editar Producto */}

      {isSecondModalOpen && (
        <EditarProducto
          isOpen={isSecondModalOpen}
          onOpen={onSecondModalOpen}
          onClose={onSecondModalClose}
          listaCategorias={listaCategorias}
          listaProveedores={listaProveedores}
          producto={productSelected}
          setProducto={setProductSelected}
          editProducto={editProducto}
        />
      )}
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
