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

  const {
    isOpen: isSecondModalOpen,
    onOpen: onSecondModalOpen,
    onClose: onSecondModalClose,
  } = useDisclosure();

  const [newVitrinaName, setNewVitrinaName] = useState("");
  const [newVitrinaCity, setNewVitrinaCity] = useState("");

  const handleVitrinaClick = async (cityName, vitrinaName) => {
    dispatch(setCity(cityName));
    dispatch(setName(vitrinaName));
    const url =
      "http://34.176.231.167:8080/app/rest/vitrina/resumen-de-actividad";

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
      console.log(response.data); // response.data contendrá el XML
      navigate("/resumen");
    } catch (error) {
      console.error("Error fetching XML data:", error);
    }

    onFirstModalClose();
  };

  const createNewVitrina = (city, name) => {
    const formData = new URLSearchParams();
    formData.append("nombre", name);
    formData.append("ciudad", city);

    //ToDO Agregar vitrina POST/rest/vitrina
    const url = "http://34.176.231.167:8080/app/rest/negocio/vitrinas";
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching the XML data: ", error);
      });
    onSecondModalClose();
  };

  useEffect(() => {
    getVitrinasInfo();
  }, [createNewVitrina]);

  const handleFirstModalClose = () => {
    if (showOptions === undefined) {
      navigate("/");
    }
    onFirstModalClose();
  };

  const getVitrinasInfo = () => {
    const url = "http://34.176.231.167:8080/app/rest/vitrina";
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
        },
      })
      .then((response) => {
        const data = response.data;
        //setOutput(data); // Guardamos el XML en estado para mostrarlo
        // Parseamos el XML
        const xmlText = response.data;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        dispatch(setListaDeVitrinas(vitrinasData(xmlDoc)));
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
    setCiudadesVitrinas(vitrinasObj);
    return vitrinasList;
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
                      {vitrinas.map((name) => (
                        <ListItem ml={2}>
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
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
