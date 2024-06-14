import React from "react";
import { Link } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
import NameLogo from "../assets/images/NameLogo";
import IconLogo from "../assets/images/IconLogo";
import StandardButton from "./ui/buttons/standard";
import BUTTON_VARIANTS from "../component/ui/buttons/standard/types";
import { routes } from "../App.js";

export default function SideBar() {
  return (
    <Box
      style={{
        padding: "10px",
        width: "35%",
        height: "100%",
        background: "black",
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
          <Link to={route.path}>
            <StandardButton
              variant={"BLACK_PRIMARY"}
              borderRadius="30px"
              w="100%"
              py="1.2rem"
              leftIcon={route.leftIcon}
              display="flex"
              justifyContent="flex-start"
            >
              {route.label}
            </StandardButton>
          </Link>
        ))}
      </Box>
    </Box>
  );
}
