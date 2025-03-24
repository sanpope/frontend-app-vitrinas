import { Box, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import colors from "../theme/colors";
import ScrollContainer from "./ScrollContainer";

export default function Vitrina({ city, names, onClick }) {
  const [isChrome, setIsChrome] = useState(false);

  useEffect(() => {
    const detectChrome =
      typeof navigator !== "undefined" &&
      /Chrome/.test(navigator.userAgent) &&
      /Google Inc/.test(navigator.vendor);

    setIsChrome(detectChrome);
  }, []);

  return (
    <Box
      bg={colors.white}
      borderRadius={"20px"}
      w={"100%"}
      maxW={{ base: "200px", md: "240px", xl: "250px" }}
      maxH={"200px"}
      display={"flex"}
      flexDir={"column"}
      boxShadow="1px 0px 11px -5px rgba(66, 68, 90, 0.3)"
      cursor={"pointer"}
      overflowX={"hidden"}
      overflowY={"scroll"}
      position={"relative"}
      sx={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      className="scroll-container-parent"
    >
      <Box
        className="topSection"
        bg="white"
        color={colors.black}
        p={2}
        borderTopRadius="20px"
        borderBottom="1px"
        borderBottomColor={"mainBg"}
        position={"sticky"}
        top={0}
        backgroundColor={"white"}
      >
        <Text textStyle={"RobotoSubtitleBold"} ml={2}>
          {city}
        </Text>
      </Box>
      <Box
        alignSelf={"center"}
        justifySelf={"center"}
        className="scroll-wrapper"
      >
        <UnorderedList
          display={"flex"}
          flexDir={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          p={4}
          minH={"120px"}
          mb={1}
          styleType="circle"
        >
          {names.map((name, index) => {
            return (
              <ListItem
                key={index}
                textStyle={" RobotoBody"}
                _hover={{ color: "red" }}
                onClick={() => onClick(city, name)}
                py={1}
                textAlign={"left"}
                minW={"150px"}
                maxW={"100%"}
              >
                {name}
              </ListItem>
            );
          })}
        </UnorderedList>
      </Box>

      <Box pb={isChrome ? "20px !important" : "10px"} height="10px" />
    </Box>
  );
}
