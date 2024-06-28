import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Text, useDisclosure } from "@chakra-ui/react";
import NameLogo from "../assets/images/NameLogo";
import IconLogo from "../assets/images/IconLogo";
import SignOutIcon from "../assets/images/SignOutIcon.jsx";
import StandardButton from "./ui/buttons/standard";
import BUTTON_VARIANTS from "../component/ui/buttons/standard/types";

import colors from "../theme/colors.js";
import textStyles from "../theme/textStyles.js";
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

export default function SideBar({ setLoggedIn }) {
  const [menuActive, setMenuActive] = useState(0);
  const [vitrinaActive, setVitrinaActive] = useState(0);
  const [showOptions, setShowOptions] = useState(false);

  const {
    isOpen: isFirstModalOpen,
    onOpen: onFirstModalOpen,
    onClose: onFirstModalClose,
  } = useDisclosure();

  

  const handleClickLogOut = () => {
    setLoggedIn(false);
  };

  return (
    <Box
      style={{
        padding: "10px",
        width: "23%",
        height: "100%",
        background: "black",
        position: "relative",
      }}
    >
      <Box
        w="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="10px"
      >
        <IconLogo width={"50px"} height={"40px"} stroke={"white"} />
        <NameLogo width={"180px"} height={"60px"} />
      </Box>

      <Box display="flex" flexDirection="column" gap="20px" p="20px">
        {routes.map((route, index) => (
          <Box>
            <Link to={route.path}>
              <StandardButton
                variant={
                  menuActive === index ? "RED_PRIMARY_OPT2" : "BLACK_PRIMARY"
                }
                borderRadius="30px"
                w="100%"
                py="1.2rem"
                leftIcon={route.leftIcon}
                display="flex"
                justifyContent="flex-start"
                onClick={
                  route.label === "Vitrinas"
                    ? () => {
                        onFirstModalOpen();
                        setMenuActive(index);
                      }
                    : () => {
                        setShowOptions(false);
                        setMenuActive(index);
                      }
                }
              >
                <Text textStyle={"RobotoRegular"}>{route.label}</Text>
              </StandardButton>
              {showOptions && route.label === "Vitrinas" ? (
                <Box
                  w={"100%"}
                  display={"flex"}
                  flexDirection={"column"}
                  gap={"10px"}
                  py={"10px"}
                >
                  {vitrinasRoutes.map((route, index) => (
                    <Link to={route.path} w="100%">
                      <StandardButton
                        variant={
                          vitrinaActive === index
                            ? "DARK_GREY_OPT2"
                            : "DARK_GREY"
                        }
                        bg={"red"}
                        borderRadius="30px"
                        w={"100%"}
                        maxW={"220px"}
                        ml={"30px"}
                        px={"20px"}
                        py={"18px"}
                        display={"flex"}
                        justifyContent={"flex-start"}
                        leftIcon={
                          vitrinaActive === index ? route.leftIcon : null
                        }
                        onClick={() => {
                          setVitrinaActive(index);
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
      <Box
        w="100%"
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        gap="10px"
        position={"absolute"}
        pl={"10%"}
        bottom={"40px"}
        cursor={"pointer"}
        onClick={handleClickLogOut}
      >
        <SignOutIcon width={"24px"} height={"24px"} />

        <Text textStyle={"RobotoRegular"} color={colors.white}>
          Cerrar Sesión
        </Text>
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
