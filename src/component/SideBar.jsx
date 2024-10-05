import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
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

export const BIG_WIDTH = "266px";
export const SMALL_WIDTH = "80px";

export default function SideBar({ setLoggedIn }) {
  const city = useSelector((state) => state.vitrinaReducer.city);
  const name = useSelector((state) => state.vitrinaReducer.name);

  const mensajesNoLeidos = useSelector(
    (state) => state.vitrinaReducer.mensajesNoLeidos,
  );

  const router = useLocation();

  const isDeskMenuOpen = useSelector(
    (state) => state.menuReducer.isDeskMenuOpen,
  );

  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

  const {
    isOpen: isFirstModalOpen,
    onOpen: onFirstModalOpen,
    onClose: onFirstModalClose,
  } = useDisclosure();

  const handleClickLogOut = () => {
    setLoggedIn(false);
  };

  useEffect(() => {}, [router]);

  const isSubMenuOPen = useMemo(() => {
    return vitrinasRoutes.find((route) => route.path === router.pathname);
  }, [router]);

  return (
    <Box
      w={isSmallScreen ? SMALL_WIDTH : ""}
      h={"100%"}
      bg={"black"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
    >
      <Box
        w="100%"
        h="100%"
        overflowY={"auto"}
        display="flex"
        flexDirection={"column"}
        p={{ base: "5px", md: "10px" }}
        gap="10px"
        className="scroll-hidden"
      >
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Box display={{ base: "flex", md: "none" }} mt={"10px"}>
            <Link to={"/"}>
              <IconLogo width={"40px"} height={"40px"} stroke={"white"} />
            </Link>
          </Box>
          <Link to={"/"}>
            <Box
              display={{ base: "none", md: "flex" }}
              justifyContent={isDeskMenuOpen ? "flex-start" : "center"}
              alignItems={{ base: "none", md: "center" }}
              gap={"20px"}
              p={2}
            >
              <IconLogo width={"40px"} height={"40px"} stroke={"white"} />
              {isDeskMenuOpen ? (
                <NameLogo width={"170px"} height={"50px"} />
              ) : null}
            </Box>
          </Link>
        </Box>
        {isDeskMenuOpen && !isSmallScreen ? (
          <Box display={"flex"} flexDirection="column" gap="10px">
            {routes.map((route, index) => (
              <Box key={index}>
                <Link to={route.path}>
                  <StandardButton
                    variant={
                      route.path === router.pathname ||
                      (isSubMenuOPen && route.label === "Vitrinas")
                        ? "RED_GREY"
                        : "BLACK_PRIMARY"
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
                          }
                        : null
                    }
                  >
                    <Text>{route.label}</Text>
                  </StandardButton>
                  {isSubMenuOPen && route.label === "Vitrinas" ? (
                    <Box
                      display={isDeskMenuOpen ? "flex" : "none"}
                      flexDirection={"column"}
                      gap={"5px"}
                      py={"10px"}
                    >
                      <Box display={"flex"} justifyContent={"center"} p={1}>
                        <Text
                          textStyle={" RobotoBodyBold"}
                          color={"grey.placeholder"}
                        >
                          {name && city
                            ? `${name} - ${city}`
                            : "Selecciona una Vitrina"}
                        </Text>
                      </Box>
                      {vitrinasRoutes.map((route, index) => (
                        <Link key={index} to={route.path}>
                          <StandardButton
                            variant={
                              route.path === router.pathname
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
                              route.path === router.pathname
                                ? route.leftIcon
                                : null
                            }
                          >
                            <Text
                              textStyle={"RobotoRegular"}
                              color={"white"}
                              textAlign={"left"}
                            >
                              {route.label}
                              {route.label === "Mensajes" &&
                              mensajesNoLeidos !== null ? (
                                <span
                                  style={{
                                    paddingInline: "5px",
                                    color: "#E60F0F",
                                  }}
                                >
                                  ({mensajesNoLeidos})
                                </span>
                              ) : (
                                <></>
                              )}
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
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            gap="10px"
            mt={3}
          >
            {routes.map((route, index) => (
              <Link key={index} to={route.path}>
                <StandardButton
                  variant={
                    route.path === router.pathname ||
                    (isSubMenuOPen && route.label === "Vitrinas")
                      ? "RED_GREY"
                      : "BLACK_PRIMARY"
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
                        }
                      : null
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
        w={isDeskMenuOpen ? "230px" : "100%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"15px"}
        bottom={"40px"}
        cursor={"pointer"}
        my={"2rem"}
      >
        <SignOutIcon width={"24px"} height={"24px"} />
        {isDeskMenuOpen && !isSmallScreen ? (
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
        showOptions={isSubMenuOPen}
      />
    </Box>
  );
}
