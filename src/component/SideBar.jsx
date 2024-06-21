import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Text, useDisclosure } from "@chakra-ui/react";
import NameLogo from "../assets/images/NameLogo";
import IconLogo from "../assets/images/IconLogo";
import SignOutIcon from "../assets/images/SignOutIcon.jsx";
import StandardButton from "./ui/buttons/standard";
import BUTTON_VARIANTS from "../component/ui/buttons/standard/types";
import { routes } from "../App.js";
import colors from "../theme/colors.js";

export default function SideBar({ isOpen, setIsOpen }) {
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
        {routes.map((route) => (
          <Link to={route.label !== "Vitrinas" ? route.path : null}>
            <StandardButton
              variant={"BLACK_PRIMARY"}
              borderRadius="30px"
              w="100%"
              py="1.2rem"
              leftIcon={route.leftIcon}
              display="flex"
              justifyContent="flex-start"
              onClick={
                route.label === "Vitrinas"
                  ? () => {
                      setIsOpen(true);
                    }
                  : null
              }
            >
              {route.label}
            </StandardButton>
          </Link>
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
      >
        <SignOutIcon width={"24px"} height={"24px"} />

        <Text textStyle={"RobotoRegular"} color={colors.white}>
          Cerrar Sesión
        </Text>
      </Box>
    </Box>
  );
}
