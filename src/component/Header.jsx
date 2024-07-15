import React from "react";
import { Box, Text } from "@chakra-ui/react";
import colors from "../theme/colors";
import BarsMain from "../assets/images/BarsMenuIcon";
import UserIcon from "../assets/images/UserIcon";
import EnvelopeIcon from "../assets/images/EnvelopeIcon";
import { useSelector, useDispatch } from "react-redux";
import { toggleMenu } from "../store/slices/menu";
import { useNavigate } from "react-router-dom";
import { setActive, setVitrinaActive } from "../store/slices/menu";

export default function Header() {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.userReducer.userName);
  const isMenuOpen = useSelector((state) => state.menuReducer.isMenuOpen);
  const navigate = useNavigate();

  const handleToggleMenu = () => {
    console.log("Click Menu");
    dispatch(toggleMenu());
  };

  const goToProfile = () => {
    console.log(isMenuOpen);
    console.log("GO TO PROFILE");
    navigate("/profile");
    dispatch(setActive(null));
    dispatch(setVitrinaActive(null));
  };
  return (
    <Box
      bg={"white"}
      height={"60px"}
      flexGrow={1}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      px={"10px"}
      flexWrap={{ base: "wrap", md: "nowrap" }}
    >
      <Box display={{ base: "none", md: "flex" }} alignItems="center">
        <BarsMain
          fill={"black"}
          width={"30px"}
          height={"30px"}
          onClick={handleToggleMenu}
        />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        gap={"5px"}
        flex="1"
        minW="0"
      >
        <EnvelopeIcon width={"18px"} height={"18px"} />
        <UserIcon
          fill={colors.black}
          width={"17px"}
          height={"17px"}
          onClick={() => goToProfile()}
        />
        <Text
          textStyle={"RobotoSubtitle"}
          cursor={"pointer"}
          onClick={() => goToProfile()}
        >
          {name}
        </Text>
      </Box>
    </Box>
  );
}
