import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Modal,
  useMediaQuery,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import LeftTriangleIcon from "../assets/images/LeftTriangleIcon";
import StandardButton from "../component/ui/buttons/standard";
import { useSelector, useDispatch } from "react-redux";
import { setListaDeVitrinas, setCity, setName } from "../store/slices/vitrina";

import Vitrina from "../component/Vitrina";
import { useNavigate } from "react-router-dom";
import Agregar from "../component/Agregar";
import { BIG_WIDTH, SMALL_WIDTH } from "../component/SideBar";

import axios from "axios";
import Loader from "../component/Loader";
import { parseData } from "../utils/xmlParse";

export default function ModalVitrinas({
  isFirstModalOpen,
  onFirstModalOpen,
  onFirstModalClose,
  showOptions,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDeskMenuOpen = useSelector(
    (state) => state.menuReducer.isDeskMenuOpen,
  );

  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");
  const [ciudadesVitrinas, setCiudadesVitrinas] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const {
    isOpen: isSecondModalOpen,
    onOpen: onSecondModalOpen,
    onClose: onSecondModalClose,
  } = useDisclosure();

  const handleVitrinaClick = async (cityName, vitrinaName) => {
    dispatch(setCity(cityName));
    dispatch(setName(vitrinaName));
    const url = `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina/resumen-de-actividad`;

    try {
      const response = await axios.get(url, {
        headers: {
          Accept: "application/xml",
        },
        params: {
          nombre: vitrinaName,
        },
      });

      // Si el servidor responde con XML, puedes manejarlo aquí
      const data = response.data;
      // Parseamos el XML
      if (data) {
        navigate("/resumen");
      }
    } catch (error) {
      console.error("Error fetching XML data:", error);
    }

    onFirstModalClose();
  };

  const createNewVitrina = async (city, name) => {
    const formData = new URLSearchParams();
    formData.append("nombre", name);
    formData.append("ciudad", city);
    const url = `${process.env.REACT_APP_SERVER_URL}/app/rest/negocio/vitrinas`;

    if (city in ciudadesVitrinas) {
      const index = ciudadesVitrinas[city].findIndex((item) => item === name);
      if (index !== -1) {
        // Si el índice es diferente de -1, la vitrina ya existe
        console.log("La vitrina ya existe");
        setMensaje("La vitrina ya existe en la ciudad seleccionada!");
      } else {
        // Si el índice es -1, la vitrina no existe
        console.log("Procede con la peticion");
        // Hacer la petición y agregar la vitrina a la ciudad encontrada
        try {
          const response = await axios.post(url, formData, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          });
          console.log(response.data);
          if (response.data) {
            setCiudadesVitrinas((prev) => {
              const copy = { ...prev };
              copy[city].push(name);
              return copy;
            });
            alert("Vitrina Agregada con Éxito");
          }
        } catch (error) {
          if (error.response) {
            console.error(
              "Error en la respuesta del servidor:",
              error.response.status,
            );
            console.error("Detalles:", error.response.data);
            setMensaje(error.response.data);
          } else if (error.request) {
            console.error(
              "No se recibió respuesta del servidor:",
              error.request,
            );
            setMensaje(error.request);
          } else {
            console.error("Error en la solicitud:", error.message);
            setMensaje(error.message);
          }
        } finally {
          setMensaje("");
          onSecondModalClose();
        }
      }
    } else {
      console.log("Ciudad no encontrada");
      try {
        const response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
        console.log(response.data);
        if (response.data) {
          setCiudadesVitrinas((prev) => {
            const copy = { ...prev };
            copy[city] = [name];
            return copy;
          });
          alert("Vitrina Agregada con Éxito");
        }
      } catch (error) {
        if (error.response) {
          console.error(
            "Error en la respuesta del servidor:",
            error.response.status,
          );
          setMensaje(error.response.data);
          console.error("Detalles:", error.response.data);
        } else if (error.request) {
          console.error("No se recibió respuesta del servidor:", error.request);
          setMensaje(error.request);
        } else {
          console.error("Error en la solicitud:", error.message);
          setMensaje(error.message);
        }
      } finally {
        setMensaje("");
        onSecondModalClose();
      }
    }
  };

  useEffect(() => {
    getVitrinasInfo();
  }, []);

  const handleFirstModalClose = () => {
    if (showOptions === undefined) {
      navigate("/");
    }
    onFirstModalClose();
  };

  const getVitrinasInfo = async () => {
    const url = `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina`;
    await axios
      .get(url, {
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
        },
      })
      .then((response) => {
        const xmlDoc = parseData(response.data);
        setCiudadesVitrinas(vitrinasData(xmlDoc));
      })
      .catch((error) => {
        console.error("Error fetching the XML data: ", error);
        return error;
      });
  };

  const vitrinasData = (xml) => {
    const vitrinasList = [];
    let DataVitrina = xml.querySelector("vitrinas");
    let totalVitrinas = DataVitrina.querySelectorAll("vitrina");
    const vitrinasObj = {};

    for (let i = 0; i < totalVitrinas.length; i++) {
      let city = totalVitrinas[i].getElementsByTagName("ciudad")[0].textContent;
      let vitrina =
        totalVitrinas[i].getElementsByTagName("nombre")[0].textContent;
      vitrinasList.push(vitrina);
      if (!(city in vitrinasObj)) {
        vitrinasObj[city] = [];
      }
      vitrinasObj[city].push(vitrina);
    }
    return vitrinasObj;
  };

  return (
    <>
      <Modal
        isOpen={isFirstModalOpen}
        onClose={handleFirstModalClose}
        size={"xl"}
        scrollBehavior={"inside"}
      >
        <ModalOverlay className="overlay-vitrinas" bg={"rgba(0, 0, 0, 0.2)"} />
        <ModalContent
          ml={isDeskMenuOpen && !isSmallScreen ? BIG_WIDTH : SMALL_WIDTH}
          justifyContent="flex-center"
          w={"100%"}
          maxW={"865px"}
          h={"525px"}
          bg={"white"}
          borderRadius={{ base: "0px", md: "20px" }}
          position="relative"
          top={{ base: "0px", md: "35px" }}
          left={{ base: "0px", md: "-45px" }}
        >
          <Box
            display={{ base: "none", xl: "block" }}
            position={"absolute"}
            left={"-26px"}
            top={"40px"}
            w={"40px"}
            h={"30px"}
          >
            <LeftTriangleIcon width={"40px"} height={"30px"} />
          </Box>
          <ModalBody
            display={"flex"}
            justifyContent={"flex-start"}
            flexWrap={"wrap"}
            gap={{ base: "0px", md: "20px" }}
            flexDir={"row"}
            w={"100%"}
            mt={{ base: "0px", md: "15px" }}
          >
            {isSmallScreen && ciudadesVitrinas != null ? (
              <Box w={"100%"} display={"flex"} flexWrap={"wrap"} gap={"10px"}>
                {Object.entries(ciudadesVitrinas).map(
                  ([ciudad, vitrinas], index) => (
                    <UnorderedList
                      key={index}
                      cursor={"pointer"}
                      flex={"1 1 120px"}
                      boxShadow="1px 0px 11px -5px rgba(66, 68, 90, 1)"
                      p={3}
                      maxH={"200px"}
                    >
                      <Text textStyle={"RobotoBodyBold"}>{ciudad}</Text>
                      {vitrinas.map((name, index) => (
                        <ListItem ml={2} key={index}>
                          <Text
                            textStyle={"RobotoBody"}
                            onClick={() => handleVitrinaClick(ciudad, name)}
                            color={"black"}
                            _hover={{ color: "red.100" }}
                          >
                            {name}
                          </Text>
                        </ListItem>
                      ))}
                    </UnorderedList>
                  ),
                )}
              </Box>
            ) : ciudadesVitrinas != null ? (
              Object.entries(ciudadesVitrinas).map(([ciudad, vitrinas]) => {
                return (
                  <Vitrina
                    key={ciudad}
                    city={ciudad}
                    names={vitrinas}
                    onClick={handleVitrinaClick}
                  />
                );
              })
            ) : null}
          </ModalBody>
          <ModalFooter m={"0px"} display={{ base: "none", md: "flex" }}>
            <StandardButton
              variant={"RED_PRIMARY"}
              borderRadius="30px"
              size="14px"
              py={"5px"}
              onClick={onSecondModalOpen}
              children={
                <Text textStyle={"RobotoSubtitleRegular"}>
                  Crear una Vitrina
                </Text>
              }
            ></StandardButton>
            <Agregar
              isOpen={isSecondModalOpen}
              onOpen={onSecondModalOpen}
              onClose={onSecondModalClose}
              onClick={onSecondModalClose}
              desc={"Vitrina"}
              desc2={"Nombre de la vitrina"}
              funcAgregar={createNewVitrina}
              mensajeError={mensaje}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
