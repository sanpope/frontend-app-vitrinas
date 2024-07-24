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
  useMediaQuery,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import LeftTriangleIcon from "../assets/images/LeftTriangleIcon";
import StandardButton from "../component/ui/buttons/standard";
import { useSelector, useDispatch } from "react-redux";
import { setCity } from "../store/slices/vitrina";
import { setVitrinaActive } from "../store/slices/menu";
import Vitrina from "../component/Vitrina";
import { useNavigate } from "react-router-dom";
import Agregar from "../component/Agregar";
import vitrinas from "../DummieData/vitrinas";
import { BIG_WIDTH, SMALL_WIDTH } from "../component/SideBar";

export default function ModalVitrinas({
  isFirstModalOpen,
  onFirstModalOpen,
  onFirstModalClose,
  showOptions,
  setShowOptions,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDeskMenuOpen = useSelector(
    (state) => state.menuReducer.isDeskMenuOpen,
  );
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");
  const [ciudadesVitrinas, setCiudadesVitrinas] = useState(vitrinas);
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
      <Modal
        isOpen={isFirstModalOpen}
        onClose={onFirstModalClose}
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
            {isSmallScreen ? (
              <Box w={"100%"} display={"flex"} flexWrap={"wrap"} gap={"10px"}>
                {ciudadesVitrinas.map((vitrina) => (
                  <UnorderedList
                    onClick={() => handleVitrinaClick(vitrina.ciudad)}
                    cursor={"pointer"}
                    flex={"1 1 120px"}
                    boxShadow="1px 0px 11px -5px rgba(66, 68, 90, 1)"
                    p={3}
                  >
                    <Text textStyle={"RobotoBodyBold"}>{vitrina.ciudad}</Text>
                    {vitrina.vitrinas.map((name) => (
                      <ListItem textStyle={"RobotoBody"} ml={2}>
                        {name}
                      </ListItem>
                    ))}
                  </UnorderedList>
                ))}
              </Box>
            ) : (
              ciudadesVitrinas.map((vitrina) => {
                return (
                  <Vitrina
                    key={vitrina.ciudad}
                    city={vitrina.ciudad}
                    names={vitrina.vitrinas}
                    onClick={() => handleVitrinaClick(vitrina.ciudad)}
                  />
                );
              })
            )}
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
