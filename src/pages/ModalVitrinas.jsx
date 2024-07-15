import React, { useState } from "react";
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
} from "@chakra-ui/react";
import colors from "../theme/colors";
import LeftTriangleIcon from "../assets/images/LeftTriangleIcon";
import StandardButton from "../component/ui/buttons/standard";
import { useSelector, useDispatch } from "react-redux";
import { setCity } from "../store/slices/vitrina";
import { setVitrinaActive } from "../store/slices/menu";
import Vitrina from "../component/Vitrina";
import { useNavigate } from "react-router-dom";
import Agregar from "../component/Agregar";

export default function ModalVitrinas({
  isFirstModalOpen,
  onFirstModalOpen,
  onFirstModalClose,

  showOptions,
  setShowOptions,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ciudadesVitrinas, setCiudadesVitrinas] = useState([
    "Barranquilla",
    "Bogotá",
    "Bucaramanga",
    "Cali",
    "Cartagena",
    "Medellín",
  ]);
  const {
    isOpen: isSecondModalOpen,
    onOpen: onSecondModalOpen,
    onClose: onSecondModalClose,
  } = useDisclosure();

  const [newVitrinaName, setNewVitrinaName] = useState("");
  const [newVitrinaCity, setNewVitrinaCity] = useState("");

  const handleVitrinaClick = (cityName) => {
    dispatch(setCity(cityName));
    dispatch(setVitrinaActive(0));
    setShowOptions(true);
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

  return (
    <>
      <Modal isOpen={isFirstModalOpen} onClose={onFirstModalClose}>
        <ModalOverlay />
        <ModalContent
          bg={colors.white}
          w={"90%"}
          maxW={"850px"}
          p={"5px"}
          borderRadius={"20px"}
          left={{ base: "0px", xl: "-55px" }}
          top={"45px"}
          position="relative"
        >
          <Box
            display={{ base: "none", xl: "block" }}
            position={"absolute"}
            left={"-45px"}
            top={"40px"}
          >
            <LeftTriangleIcon width={"60px"} height={"50px"} />
          </Box>
          <ModalBody
            display={"flex"}
            flexWrap={"wrap"}
            gap={"20px"}
            justifyContent={"center"}
            flexDir={"row"}
            w={"100%"}
            mt={"15px"}
          >
            {ciudadesVitrinas.map((vitrina) => {
              return (
                <Vitrina
                  key={vitrina}
                  city={vitrina}
                  names={[
                    "Nombre de la vitrina",
                    "Nombre de la vitrina",
                    "Nombre de la vitrina",
                  ]}
                  onClick={() => handleVitrinaClick(vitrina)}
                />
              );
            })}
          </ModalBody>
          <ModalFooter m={"0px"}>
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
