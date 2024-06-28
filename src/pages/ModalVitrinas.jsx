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
  Select,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import colors from "../theme/colors";
import LeftTriangleIcon from "../assets/images/LeftTriangleIcon";
import TextInput from "../component/ui/textInput";
import StandardButton from "../component/ui/buttons/standard";
import { useSelector, useDispatch } from "react-redux";
import { setCity } from "../store/slices/vitrina";
import Vitrina from "../component/Vitrina";
import { useNavigate } from "react-router-dom";

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
          maxW={"850px"}
          p={"5px"}
          borderRadius={"20px"}
          left={"-55px"}
          top={"45px"}
          position="relative"
        >
          <Box position={"absolute"} left={"-45px"} top={"40px"}>
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
            <Modal isOpen={isSecondModalOpen} onClose={onSecondModalClose}>
              <ModalOverlay />
              <ModalContent borderRadius={"20px"}>
                <ModalHeader
                  bg={"black"}
                  display={"flex"}
                  flexDir={"column"}
                  borderTopRadius="20px"
                >
                  <Text textStyle={"RobotoSubtitle"} color={"white"}>
                    Agregar Vitrina
                  </Text>
                </ModalHeader>
                <ModalBody
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Box
                    w={"100%"}
                    display={"flex"}
                    flexDir={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <form onSubmit={createNewVitrina}>
                      <FormLabel display="flex" alignItems="center">
                        <span
                          style={{
                            color: "red",
                            marginRight: "0.25rem",
                            marginTop: "0.25rem",
                          }}
                        >
                          *
                        </span>
                        Ciudad
                      </FormLabel>
                      <Select
                        required
                        placeholder="Seleccionar"
                        onChange={(e) => saveVitrinaCity(e)}
                        sx={{
                          borderColor: "mainBg",
                          borderWidth: "1px",
                          _hover: {
                            borderColor: "blue.50",
                            borderWidth: "1px",
                          },
                          _focus: {
                            borderColor: "blue.50",
                            boxShadow: "0px 0px 5px 0px rgba(88, 178, 255, 1)",
                            borderWidth: "1px",
                          },
                        }}
                      >
                        <option>Bogotá</option>
                        <option>Medellín</option>
                        <option>Cali</option>
                      </Select>
                      <FormLabel display="flex" alignItems="center">
                        <span
                          style={{
                            color: "red",
                            marginRight: "0.25rem",
                            marginTop: "0.25rem",
                          }}
                        >
                          *
                        </span>
                        Nombre de la vitrina
                      </FormLabel>
                      <TextInput
                        type="email"
                        placeholder="example"
                        required
                        onChange={(e) => saveVitrinaName(e)}
                        sx={{
                          _hover: {
                            borderColor: "blue.50",
                            borderWidth: "1px",
                            borderRadius: "10px",
                          },
                          _focus: {
                            borderColor: "blue.50",
                            boxShadow: "0px 0px 5px 0px rgba(88, 178, 255, 1)",
                            borderWidth: "1px",
                          },
                        }}
                      />
                    </form>
                  </Box>
                </ModalBody>

                <ModalFooter display={"flex"} gap={"10px"}>
                  <StandardButton
                    variant={"WHITE_RED"}
                    borderRadius="20px"
                    py={"17px"}
                    w={"50%"}
                    fontSize="14px"
                    fontWeight="400"
                    onClick={onSecondModalClose}
                  >
                    Cancelar
                  </StandardButton>
                  <StandardButton
                    variant={"BLACK_PRIMARY"}
                    borderRadius="20px"
                    py={"17px"}
                    w={"50%"}
                    fontSize="14px"
                    fontWeight="400"
                    type={"submit"}
                  >
                    Guardar
                  </StandardButton>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
