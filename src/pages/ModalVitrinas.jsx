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
import { setCity, setDispositivo, setName } from "../store/slices/vitrina";

import Vitrina from "../component/Vitrina";
import { useNavigate } from "react-router-dom";
import Agregar from "../component/Agregar";
import { BIG_WIDTH, SMALL_WIDTH } from "../component/SideBar";
import xmlToJSON from "../services/XmlToJsonConverter";
import dataXmlVitrinas from "../services/vitrinasData";

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

  const handleVitrinaClick = (cityName, vitrinaName) => {
    dispatch(setCity(cityName));

    dispatch(setName(vitrinaName));
    //dispatch(setVitrinaActive(0));

    navigate("/resumen");
    onFirstModalClose();
  };

  const saveVitrinaCity = (e) => {
    setNewVitrinaCity(e.target.value);
  };

  const saveVitrinaName = (e) => {
    setNewVitrinaName(e);
  };

  const createNewVitrina = () => {
    //ToDO Agregar vitrina POST/rest/vitrina
  };

  useEffect(() => {
    const DataVitrina = xmlToJSON(dataXmlVitrinas).vitrinas.vitrina;
    const vitrinasObj = {};

    for (let i = 0; i < DataVitrina.length; i++) {
      const city = DataVitrina[i].ciudad["#text"];
      const vitrina = DataVitrina[i].nombre["#text"];
      if (!(city in vitrinasObj)) {
        vitrinasObj[city] = [];
      }
      vitrinasObj[city].push(vitrina);
    }
    setCiudadesVitrinas(vitrinasObj);
  }, []);

  const handleFirstModalClose = () => {
    if (showOptions === undefined) {
      navigate("/");
    }
    onFirstModalClose();
  };

  return (
    <>
      <Modal
        isOpen={isFirstModalOpen}
        onClose={handleFirstModalClose}
        size={"xl"}
        scrollBehavior={"inside"}
      >
        <ModalOverlay className="overlay-vitrinas" />
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
            justifyContent={"center"}
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
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
