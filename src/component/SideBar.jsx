import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Text, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import NameLogo from "../assets/images/NameLogo";
import IconLogo from "../assets/images/IconLogo";
import SignOutIcon from "../assets/images/SignOutIcon.jsx";
import StandardButton from "./ui/buttons/standard";

import MinusIcon from "../assets/images/minusIcon.jsx";
import Resumen from "../pages/Resumen.jsx";
import Inventario from "../pages/Inventario.jsx";
import Ventas from "../pages/Ventas.jsx";
import Visitas from "../pages/Visitas.jsx";
import Dispositivo from "../pages/Dispositivo.jsx";
import Mensajes from "../pages/Mensajes.jsx";
import EstaVitrina from "../pages/EstaVitrina.jsx";
import HomeIcon from "../assets/images/HomeIcon.jsx";
import StoreIcon from "../assets/images/StoreIcon.jsx";
import WareHouseIcon from "../assets/images/WareHouseIcon.jsx";
import BriefCaseIcon from "../assets/images/BriefCaseIcon.jsx";
import ModalVitrinas from "../pages/ModalVitrinas.jsx";

import { useSelector, useDispatch } from "react-redux";
import { setActive, setVitrinaActive } from "../store/slices/menu";

const routes = [
  {
    path: "/",
    label: "Inicio",
    leftIcon: <HomeIcon />,
  },
  {
    label: "Vitrinas",
    leftIcon: <StoreIcon />,
  },
  {
    path: "/productosybodega",
    label: "Productos y Bodega",
    leftIcon: <WareHouseIcon />,
  },
  {
    path: "/asesores",
    label: "Asesores",
    leftIcon: <BriefCaseIcon />,
  },
];

const vitrinasRoutes = [
  {
    path: "/resumen",
    element: <Resumen />,
    label: "Resumen",
    leftIcon: <MinusIcon />,
  },
  {
    path: "/inventario",
    element: <Inventario />,
    label: "Inventario",
    leftIcon: <MinusIcon />,
  },
  {
    path: "/ventas",
    element: <Ventas />,
    label: "Ventas",
    leftIcon: <MinusIcon />,
  },
  {
    path: "/visitas",
    element: <Visitas />,
    label: "Visitas",
    leftIcon: <MinusIcon />,
  },
  {
    path: "/dispositivo",
    element: <Dispositivo />,
    label: "Dispositivo",
    leftIcon: <MinusIcon />,
  },
  {
    path: "/mensajes",
    element: <Mensajes />,
    label: "Mensajes",
    leftIcon: <MinusIcon />,
  },
  {
    path: "/estaVitrina",
    element: <EstaVitrina />,
    label: "Esta Vitrina",
    leftIcon: <MinusIcon />,
  },
];

export const BIG_WIDTH = "320px";
export const SMALL_WIDTH = "80px";

export default function SideBar({ setLoggedIn }) {
  const dispatch = useDispatch();
  const isDeskMenuOpen = useSelector(
    (state) => state.menuReducer.isDeskMenuOpen,
  );
  const active = useSelector((state) => state.menuReducer.active);
  const vitrinaActive = useSelector((state) => state.menuReducer.vitrinaActive);
  const [showOptions, setShowOptions] = useState(false);
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

  console.log(active);
  console.log(vitrinaActive);

  const {
    isOpen: isFirstModalOpen,
    onOpen: onFirstModalOpen,
    onClose: onFirstModalClose,
  } = useDisclosure();

  const handleClickLogOut = () => {
    setLoggedIn(false);
  };

  const handleClickOnLogo = () => {
    dispatch(setActive(0));
    setShowOptions(false);
  };

  return (
    <Box
      w={isSmallScreen ? SMALL_WIDTH : ""}
      p={{ base: "5px", md: "10px" }}
      h={"100%"}
      bg={"black"}
      display={isDeskMenuOpen ? "flex" : "none"}
      flexDirection={"column"}
      justifyContent={"space-between"}
    >
      <Box
        w="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection={"column"}
        gap="10px"
      >
        <Box
          display={isDeskMenuOpen ? "flex" : "none"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box display={{ base: "flex", md: "none" }} mt={"10px"}>
            <Link to={"/"} onClick={() => handleClickOnLogo()}>
              <IconLogo width={"40px"} height={"40px"} stroke={"white"} />
            </Link>
          </Box>
          <Link to={"/"} onClick={() => handleClickOnLogo()}>
            <Box
              display={{ base: "none", md: "flex" }}
              justifyContent={isDeskMenuOpen ? "flex-start" : "center"}
              alignItems={{ base: "none", md: "center" }}
              gap={"20px"}
              p={2}
            >
              <IconLogo width={"40px"} height={"40px"} stroke={"white"} />
              {!isSmallScreen ? (
                <NameLogo width={"170px"} height={"50px"} />
              ) : null}
            </Box>
          </Link>
        </Box>
        {!isSmallScreen ? (
          <Box
            display={isDeskMenuOpen ? "flex" : "none"}
            flexDirection="column"
            gap="10px"
          >
            {routes.map((route, index) => (
              <Box>
                <Link to={route.path}>
                  <StandardButton
                    variant={
                      active === index ? "RED_PRIMARY_OPT2" : "BLACK_PRIMARY"
                    }
                    borderRadius="30px"
                    fontSize={"0.875rem"}
                    w="230px"
                    py="1.2rem"
                    leftIcon={route.leftIcon}
                    display="flex"
                    justifyContent="flex-start"
                    onClick={
                      route.label === "Vitrinas"
                        ? () => {
                            onFirstModalOpen();
                            dispatch(setActive(index));
                          }
                        : () => {
                            setShowOptions(false);
                            dispatch(setActive(index));
                          }
                    }
                  >
                    <Text>{route.label}</Text>
                  </StandardButton>
                  {showOptions && route.label === "Vitrinas" ? (
                    <Box
                      display={isDeskMenuOpen ? "flex" : "none"}
                      flexDirection={"column"}
                      gap={"5px"}
                      py={"10px"}
                    >
                      {vitrinasRoutes.map((route, index) => (
                        <Link to={route.path}>
                          <StandardButton
                            variant={
                              vitrinaActive === index
                                ? "DARK_GREY_OPT2"
                                : "DARK_GREY"
                            }
                            bg={"red"}
                            borderRadius="30px"
                            w={"100%"}
                            maxW={"200px"}
                            ml={"30px"}
                            px={"20px"}
                            py={"18px"}
                            display={"flex"}
                            justifyContent={"flex-start"}
                            leftIcon={
                              vitrinaActive === index ? route.leftIcon : null
                            }
                            onClick={() => {
                              dispatch(setVitrinaActive(index));
                            }}
                          >
                            <Text
                              textStyle={"RobotoRegular"}
                              color={"white"}
                              textAlign={"left"}
                            >
                              {route.label}
                            </Text>
                          </StandardButton>
                        </Link>
                      ))}
                    </Box>
                  ) : null}
                </Link>
              </Box>
            ))}
          </Box>
        ) : (
          <Box
            display={isDeskMenuOpen ? "flex" : "none"}
            flexDirection={"column"}
            alignItems={"center"}
            gap="10px"
          >
            {routes.map((route, index) => (
              <Link key={index} to={route.path}>
                <StandardButton
                  variant={
                    active === index ? "RED_PRIMARY_OPT2" : "BLACK_PRIMARY"
                  }
                  borderRadius="30px"
                  w="60px"
                  h="60px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  onClick={
                    route.label === "Vitrinas"
                      ? () => {
                          onFirstModalOpen();
                          dispatch(setActive(index));
                        }
                      : () => {
                          setShowOptions(false);
                          dispatch(setActive(index));
                        }
                  }
                >
                  {route.leftIcon}
                </StandardButton>
              </Link>
            ))}
          </Box>
        )}
      </Box>

      <Box
        w="100%"
        display={isDeskMenuOpen ? "flex" : "none"}
        alignItems="center"
        justifyContent={"center"}
        gap="10px"
        bottom={"40px"}
        cursor={"pointer"}
        onClick={handleClickLogOut}
        mb={"2rem"}
      >
        <SignOutIcon width={"24px"} height={"24px"} />
        {!isSmallScreen ? (
          <Text
            display={"inline-flex"}
            textStyle={"RobotoRegular"}
            color={"white"}
          >
            Cerrar Sesión
          </Text>
        ) : null}
      </Box>
      <ModalVitrinas
        isFirstModalOpen={isFirstModalOpen}
        onFirstModalOpen={onFirstModalOpen}
        onFirstModalClose={onFirstModalClose}
        showOptions={showOptions}
        setShowOptions={setShowOptions}
      />
    </Box>
  );
}
