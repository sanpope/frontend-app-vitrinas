import React, { useState, useEffect, useRef } from "react";
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
  useToast,
  Spinner,
} from "@chakra-ui/react";
import LeftTriangleIcon from "../assets/images/LeftTriangleIcon";
import StandardButton from "../component/ui/buttons/standard";
import { useSelector, useDispatch } from "react-redux";
import {
  setCiudadesVitrinas,
  setCity,
  setName,
  setMensajesVitrina,
  setMensajesNoLeidos,
} from "../store/slices/vitrina";

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
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDeskMenuOpen = useSelector(
    (state) => state.menuReducer.isDeskMenuOpen,
  );

  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");
  const ciudadesVitrinas = useSelector(
    (state) => state.vitrinaReducer.ciudadesVitrinas,
  );

  const [mensaje, setMensaje] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const [createVitrinaLoading, setCreateVitrinaLoading] = useState(false);

  const [hasScroll, setHasScroll] = useState(false);

  const modalBodyRef = useRef(null);

  const {
    isOpen: isSecondModalOpen,
    onOpen: onSecondModalOpen,
    onClose: onSecondModalClose,
  } = useDisclosure();

  const checkForScroll = () => {
    if (modalBodyRef.current) {
      const { scrollHeight, clientHeight } = modalBodyRef.current;
      setHasScroll(scrollHeight > clientHeight);
    }
  };

  useEffect(() => {
    if (isFirstModalOpen && !isLoading) {
      checkForScroll();

      window.addEventListener("resize", checkForScroll);

      return () => {
        window.removeEventListener("resize", checkForScroll);
      };
    }
  }, [isFirstModalOpen, isLoading, ciudadesVitrinas]);

  useEffect(() => {
    getVitrinasInfo();
  }, []);

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

      const data = response.data;
      if (data) {
        navigate("/resumen");
        getMensajesNoLeidos(vitrinaName);
      }
    } catch (error) {
      console.error("Error fetching XML data:", error);
    } finally {
      onFirstModalClose();
    }
  };

  const createNewVitrina = async (city, name) => {
    const formData = new URLSearchParams();
    formData.append("nombre", name);
    formData.append("ciudad", city);
    const url = `${process.env.REACT_APP_SERVER_URL}/app/rest/negocio/vitrina`;

    if (city in ciudadesVitrinas) {
      const index = ciudadesVitrinas[city].findIndex((item) => item === name);
      if (index !== -1) {
        setMensaje("La vitrina ya existe en la ciudad seleccionada!");
      } else {
        try {
          setCreateVitrinaLoading(true);
          const response = await axios.post(url, formData, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          });
          if (response.status == 200 && response.data) {
            const copy = { ...ciudadesVitrinas };
            copy[city] = [...copy[city], name];
            dispatch(setCiudadesVitrinas(copy));
            toast({
              status: "success",
              description: "¡Vitrina agregada con éxito!",
              duration: 3000,
              position: "top-right",
              isClosable: true,
            });
            setCreateVitrinaLoading(false);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setMensaje("");
          onSecondModalClose();
        }
      }
    } else {
      try {
        setCreateVitrinaLoading(true);
        const response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
        if (response.status == 200 && response.data) {
          const copy = { ...ciudadesVitrinas };
          copy[city] = [name];
          dispatch(setCiudadesVitrinas(copy));
          toast({
            status: "success",
            description: "¡Vitrina agregada con éxito!",
            duration: 3000,
            position: "top-right",
            isClosable: true,
          });
          setCreateVitrinaLoading(false);
        }
      } catch (error) {
        toast({
          status: "error",
          description: "Error creando la vitrina",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      } finally {
        setMensaje("");
        onSecondModalClose();
      }
    }
  };

  const handleFirstModalClose = () => {
    if (showOptions === undefined) {
      navigate("/");
    }
    onFirstModalClose();
  };

  const getVitrinasInfo = async () => {
    setIsLoading(true);
    const url = `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina`;
    await axios
      .get(url, {
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
        },
      })
      .then((response) => {
        const xmlDoc = parseData(response.data);
        dispatch(setCiudadesVitrinas(vitrinasData(xmlDoc)));
        setIsLoading(false);
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

  const getMensajesNoLeidos = async (vitrinaName) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina/mensajes?vitrina=${vitrinaName}`,
        {
          headers: {
            "Content-Type": "application/xml",
          },
        },
      );
      if (response.status === 200 && response.data) {
        const xmlDoc = parseData(response.data);
        const mensajes = xmlDoc.querySelector("mensajes");
        const noLeidos = mensajes.querySelectorAll("mensaje > visto");
        const count = Array.from(noLeidos).filter(
          (elem) => elem.textContent === "false",
        ).length;
        dispatch(setMensajesNoLeidos(count));
      }
    } catch (error) {
      toast({
        status: "error",
        description: "Error obteniendo mensajes no leídos",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Modal
        isOpen={isFirstModalOpen}
        onClose={handleFirstModalClose}
        size={"lg"}
        scrollBehavior={"inside"}
      >
        <ModalOverlay className="overlay-vitrinas" bg={"rgba(0, 0, 0, 0.2)"} />
        {isLoading === false ? (
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
              display={{ base: "none", sm: "block" }}
              position={"absolute"}
              left={"-26px"}
              top={"40px"}
              w={"40px"}
              h={"30px"}
            >
              <LeftTriangleIcon width={"40px"} height={"30px"} />
            </Box>
            <ModalBody
              ref={modalBodyRef}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              w={"100%"}
              mt={{ base: "0px", md: "15px" }}
              onScroll={checkForScroll}
            >
              {ciudadesVitrinas != null &&
              Object.keys(ciudadesVitrinas).length > 0 &&
              Object.values(ciudadesVitrinas).some(
                (vitrinas) => vitrinas.length > 0,
              ) ? (
                <Box
                  w={"100%"}
                  height={"100%"}
                  display={"flex"}
                  flexWrap={"wrap"}
                  gap={{ base: "10px", sm: "25px", xl: "30px" }}
                  alignSelf={"center"}
                  className="vitrinasContainer"
                >
                  {Object.entries(ciudadesVitrinas)
                    .filter(([_, vitrinas]) => vitrinas.length > 0)
                    .sort(([ciudadA], [ciudadB]) =>
                      ciudadA.localeCompare(ciudadB),
                    )
                    .map(([ciudad, vitrinas]) => (
                      <Vitrina
                        key={ciudad}
                        city={ciudad}
                        names={vitrinas}
                        onClick={handleVitrinaClick}
                      />
                    ))}
                </Box>
              ) : (
                <Box
                  display={"flex"}
                  width={"100%"}
                  height={"100%"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Text color={"grey.placeholder"}>
                    No se encontraron vitrinas disponibles, por favor crea una.
                  </Text>
                </Box>
              )}
            </ModalBody>

            <ModalFooter
              m={"0px"}
              p={3}
              borderTopWidth={hasScroll ? "1px" : "none"}
              borderTopColor={hasScroll ? "mainBg" : "transparent"}
            >
              <StandardButton
                display={{ base: "none", md: "flex" }}
                variant={"RED_PRIMARY"}
                borderRadius="30px"
                size="15px"
                w={180}
                p={2}
                onClick={onSecondModalOpen}
                children={
                  <Text textStyle={"RobotoSubtitleRegular"}>
                    Crear una vitrina
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
                Agregar={createNewVitrina}
                mensajeError={mensaje}
                isLoading={createVitrinaLoading}
              />
            </ModalFooter>
          </ModalContent>
        ) : (
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
              display={{ base: "none", sm: "block" }}
              position={"absolute"}
              left={"-26px"}
              top={"40px"}
              w={"40px"}
              h={"30px"}
            >
              <LeftTriangleIcon width={"40px"} height={"30px"} />
            </Box>
            <Box
              display={"flex"}
              width={"100%"}
              height={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              gap={"20px"}
            >
              <Spinner size={"xl"} />
              <Text color={"grey.placeholder"}>
                Cargando información de las vitrinas.
              </Text>
            </Box>
          </ModalContent>
        )}
      </Modal>
    </>
  );
}
