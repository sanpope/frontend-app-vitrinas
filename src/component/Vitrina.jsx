import { Box, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import React from "react";
import colors from "../theme/colors";

export default function Vitrina({ city, names, onClick }) {
  return (
    <Box
      bg={colors.white}
      borderRadius={"20px"}
      w={"250px"}
      display={"flex"}
      flexDir={"column"}
      gap={"15px"}
      boxShadow="1px 0px 11px -5px rgba(66, 68, 90, 0.3)"
      cursor={"pointer"}
    >
      <Box
        className="topSection"
        bg="white"
        color={colors.black}
        p={3}
        borderTopRadius="20px"
        borderBottom="1px"
        borderBottomColor={"mainBg"}
      >
        <Text textStyle={"RobotoBodyBold"} ml={2}>{city}</Text>
      </Box>
      <Box w={"80%"} alignSelf={"center"} justifySelf={"center"}>
        <UnorderedList
          w={"100%"}
          height={"100%"}
          display={"flex"}
          flexDir={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          p={4}
          minH={"120px"}
          overflowY={"scroll"}
          className="scroll-wrapper"
          mb={1}
          styleType="circle"
        >
          {names.map((name, index) => {
            return (
              <ListItem
                key={index}
                textStyle={"RobotoRegular"}
                _hover={{ color: "red" }}
                onClick={() => onClick(city, name)}
                py={1}
                w={"100%"}
                textAlign={"left"}
              >
                {name}
              </ListItem>
            );
          })}
        </UnorderedList>
      </Box>
    </Box>
  );
}
