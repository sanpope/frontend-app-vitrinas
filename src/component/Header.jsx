import React from "react";
import { Box, Text } from "@chakra-ui/react";
import colors from "../theme/colors";
import BarsMain from "../assets/images/BarsMenuIcon";
import UserIcon from "../assets/images/UserIcon";
import { useSelector, useDispatch } from "react-redux";
import { toggleMenu } from "../store/slices/menu";
import { useNavigate } from "react-router-dom";

export const HEADER_HEIGHT = 50;

export default function Header() {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.userReducer.userName);
  const isMenuOpen = useSelector((state) => state.menuReducer.isMenuOpen);
  const navigate = useNavigate();

  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };

  const goToProfile = () => {
    navigate("/profile");
  };
  return (
    <Box
      bg={"white"}
      height={HEADER_HEIGHT + "px"}
      display={"block"}
      p={"10px"}
      position="relative"
    >
      <Box display="inline-block">
        <BarsMain
          fill={"black"}
          width={"30px"}
          height={"30px"}
          onClick={handleToggleMenu}
        />
      </Box>
      <Box
        display="flex"
        position="absolute"
        right={"10px"}
        top={"50%"}
        transform="translateY(-50%)"
        alignItems="center"
        justifyContent="flex-end"
        gap={"15px"}
      >
        <UserIcon
          fill={colors.black}
          width={"17px"}
          height={"17px"}
          onClick={goToProfile}
        />
        <Text
          textStyle={"RobotoSubtitle"}
          cursor={"pointer"}
          onClick={goToProfile}
        >
          {name}
        </Text>
      </Box>
    </Box>
  );
}
