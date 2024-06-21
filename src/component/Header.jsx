import React from "react";
import { Box, Text } from "@chakra-ui/react";
import colors from "../theme/colors";
import BarsMain from "../assets/images/BarsMenuIcon";
import UserIcon from "../assets/images/UserIcon";
import EnvelopeIcon from "../assets/images/EnvelopeIcon";

export default function Header() {
  const [name, setName] = "";
  return (
    <Box
      bg={colors.white}
      w={"100%"}
      height={"60px"}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px={"10px"}
    >
      <Box w={"50%"}>
        <BarsMain fill={colors.black} width={"30px"} height={"30px"} />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        marginRight={"60px"}
        gap={"5px"}
        w={"50%"}
      >
        <Box marginRight={"40px"}>
          <EnvelopeIcon width={"18px"} height={"18px"} />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-around"
          gap={"10px"}
        >
          <UserIcon fill={colors.black} width={"17px"} height={"17px"} />
          <Text textStyle={"RobotoSubtitle"}>Edgar Poveda</Text>
        </Box>
      </Box>
    </Box>
  );
}
