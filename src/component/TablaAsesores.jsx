import React, { useState, useEffect, useRef } from "react";
import { Box, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import EditIcon from "../assets/images/EditIcon";

import UnionIcon from "../assets/images/UnionIcon";
import TrashIcon from "../assets/images/TrashIcon";

import Pagination from "./Pagination";
import BottomTable from "./ui/tablas/Bottom";
import Contenedor from "./ui/tablas/Contenedor";
import SwitchOnIcon from "../assets/images/SwitchOnIcon";
import SwitchOffIcon from "../assets/images/SwitchOffICon";

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
  onSecondModalOpen,
  onThirdModalOpen,
  displayedArticulos,
  setDisplayedArticulos,
  ciudadesVitrina,
  totalResults,
  currentPage,
  totalPages,
  getMasArticulos,
  handleSortingClick,
  setCurrentAsesor,
}) {
  const toast = useToast();
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

  const handleSwitchClick = async (
    isEnabled,
    asesor,
    indice,
    setDisplayedArticulos,
  ) => {
    const newState = !isEnabled;
    const nombre = asesor.nombre;
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/asesores/habilitar?nombre=${nombre}&habilitar=${newState}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      if (response.status == 200) {
        setDisplayedArticulos((prev) => {
          const copy = [...prev] || [];
          copy[indice] = { ...asesor, habilitado: newState };
          return copy;
        });
        toast({
          status: newState ? "success" : "warning",
          description: newState
            ? "Asesor habilitado para modificación"
            : "Asesor deshabilitado para modificación",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        status: "error",
        description: "Error con la selección",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
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
                <th key={index} className="AsesorTh">
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
                          handleSortingClick(name === "Asesor" ? "asesor" : "")
                        }
                      />
                    ) : null}
                  </Box>
                </th>
              ))}
            </tr>
          </thead>
          {displayedArticulos != null && displayedArticulos.length > 0 ? (
            <tbody style={{ height: "100%" }}>
              {displayedArticulos?.map((asesor, index) => {
                // Encontrar las ciudades correspondientes a las vitrinas
                const ubicaciones = Object.entries(ciudadesVitrina)
                  .filter(([ciudad, vitrinas]) =>
                    vitrinas.some((vitrina) =>
                      asesor.vitrinas.includes(vitrina),
                    ),
                  )
                  .map(([ciudad]) => ciudad);

                return (
                  <tr key={index}>
                    {/* Nombre del asesor */}
                    <td className="AsesorTd">{asesor.nombre}</td>

                    {/* Lista de vitrinas */}
                    <td className="AsesorTd">
                      {asesor.vitrinas.map((vitrina, idx) => (
                        <p
                          key={idx}
                          style={{
                            width: "100%",
                            textAlign: "justify",
                            paddingLeft: "10px",
                          }}
                        >
                          {vitrina}
                        </p>
                      ))}
                    </td>

                    {/* Ubicación (Ciudades) */}
                    <td className="AsesorTd">
                      {ubicaciones.map((ubicacion, idx) => (
                        <p
                          key={idx}
                          style={{
                            width: "100%",
                            textAlign: "justify",
                            paddingLeft: "15%",
                            wordWrap: "break-word",
                          }}
                        >
                          {ubicacion}
                        </p>
                      ))}
                    </td>

                    {/* Usuario */}
                    <td className="AsesorTd">{asesor.usuario}</td>

                    {/* Campo de Contraseña */}
                    <td className="AsesorTd">{asesor.clave}</td>

                    {/* Switch de Habilitar/Deshabilitar */}
                    <td className="AsesorTd">
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {asesor?.habilitado === true ||
                        asesor?.habilitado === "true" ? (
                          <SwitchOnIcon
                            width="1.50rem"
                            height="1.50rem"
                            onClick={() =>
                              handleSwitchClick(
                                true,
                                asesor,
                                index,
                                setDisplayedArticulos,
                              )
                            }
                          />
                        ) : (
                          <SwitchOffIcon
                            width="1.50rem"
                            height="1.50rem"
                            onClick={() =>
                              handleSwitchClick(
                                false,
                                asesor,
                                index,
                                setDisplayedArticulos,
                              )
                            }
                          />
                        )}
                      </Box>
                    </td>

                    {/* Acciones (Editar / Eliminar) */}
                    <td className="iconContainer">
                      <EditIcon
                        width="17px"
                        onClick={() => {
                          setCurrentAsesor(asesor);
                          onSecondModalOpen();
                        }}
                        style={{ cursor: "pointer", marginRight: "10px" }}
                      />
                      <TrashIcon
                        height="17px"
                        onClick={() => {
                          setCurrentAsesor(asesor);
                          onThirdModalOpen();
                        }}
                        style={{ cursor: "pointer" }}
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
                    No se encontraron Asesores.
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
