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
  useToast,
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

  const {
    isOpen: isSecondModalOpen,
    onOpen: onSecondModalOpen,
    onClose: onSecondModalClose,
  } = useDisclosure();

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
    const url = `${process.env.REACT_APP_SERVER_URL}/app/rest/negocio/vitrinas`;

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
              description: "Vitrina Agregada con Éxito!.",
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
            description: "Vitrina Agregada con Éxito!.",
            duration: 3000,
            position: "top-right",
            isClosable: true,
          });
          setCreateVitrinaLoading(false);
        }
      } catch (error) {
        toast({
          status: "error",
          description: "Error creando la vitrina.",
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
        description: "Error obteniendo mensajes no leídos.",
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
              {isSmallScreen &&
              ciudadesVitrinas != null &&
              Object.keys(ciudadesVitrinas).length > 0 ? (
                <Box w={"100%"} display={"flex"} flexWrap={"wrap"} gap={"10px"}>
                  {Object.entries(ciudadesVitrinas)
                    .filter(([_, vitrinas]) => vitrinas.length > 0)
                    .sort(([ciudadA], [ciudadB]) =>
                      ciudadA.localeCompare(ciudadB),
                    )
                    .map(([ciudad, vitrinas], index) => (
                      <UnorderedList
                        key={index}
                        cursor={"pointer"}
                        flex={"1 1 120px"}
                        boxShadow="1px 0px 11px -5px rgba(66, 68, 90, 0.3)"
                        p={3}
                        maxH={"200px"}
                        minW={"120px"}
                        maxW={"140px"}
                        overflowY={"auto"}
                        borderRadius={20}
                      >
                        <Text
                          textStyle={"RobotoBodyBold"}
                          py={2}
                          borderBottom="1px"
                          borderBottomColor={"mainBg"}
                        >
                          {ciudad}
                        </Text>
                        {vitrinas.map((name, index) => (
                          <ListItem ml={2} key={index} borderRadius={30}>
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
                    ))}
                </Box>
              ) : ciudadesVitrinas != null &&
                Object.keys(ciudadesVitrinas).length > 0 ? (
                Object.entries(ciudadesVitrinas)
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
                  ))
              ) : (
                <Box
                  display={"flex"}
                  width={"100%"}
                  height={"100%"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Text color={"grey.placeholder"}>
                    No se encontraron vitrinas disponibles, por favor crea una
                    vitrina.
                  </Text>
                </Box>
              )}
            </ModalBody>

            <ModalFooter m={"0px"} display={{ base: "none", md: "flex" }} p={3}>
              <StandardButton
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
              display={"flex"}
              width={"100%"}
              height={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              gap={"20px"}
            >
              <Loader />
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
