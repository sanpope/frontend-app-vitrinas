import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default function TopCategoriaItem({}) {
  return (
    <Box
      h={"100%"}
      w={{ base: "100%" }}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"1.2rem"}
    >
      <Box
        w={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          <Box
            bg="#000000"
            w={3}
            h={3}
            borderRadius="full"
            mr={"10px"}
            display={{ base: "none", md: "inline-flex" }}
          ></Box>
          <Text textStyle={"RobotoRegular"}>Corales de Indias</Text>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"flex-end"}
          borderLeftWidth={"2px"}
          borderLeftColor={"mainBg"}
        >
          <Text
            minW={"4.40rem"}
            textStyle={"RobotoRegularBold"}
            textAlign={"left"}
            ml={2}
          >
            $2.100.000
          </Text>
        </Box>
      </Box>
      <Box
        w={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          <Box
            bg="#555555"
            w={3}
            h={3}
            borderRadius="full"
            mr={"10px"}
            display={{ base: "none", md: "inline-flex" }}
          ></Box>
          <Text textStyle={"RobotoRegular"}>Double Tree Bogotá</Text>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"flex-end"}
          borderLeftWidth={"2px"}
          borderLeftColor={"mainBg"}
        >
          <Text
            textStyle={"RobotoRegularBold"}
            minW={"4.40rem"}
            textAlign={"left"}
            ml={2}
          >
            $800.000
          </Text>
        </Box>
      </Box>
      <Box
        w={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box
          display={{ base: "none", md: "flex" }}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          <Box
            bg="#BBBBBB"
            w={3}
            h={3}
            borderRadius="full"
            mr={"10px"}
            display={"inline-flex"}
          ></Box>
          <Text textStyle={"RobotoRegular"}>Double Tree Bogotá</Text>
        </Box>
        <Box
          display={{ base: "none", md: "flex" }}
          justifyContent={"flex-end"}
          borderLeftWidth={"2px"}
          borderLeftColor={"mainBg"}
        >
          <Text
            textStyle={"RobotoRegularBold"}
            minW={"4.40rem"}
            textAlign={"left"}
            ml={2}
          >
            $500.000
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
