import { Box, Text } from "@chakra-ui/react";
import React from "react";

const COLORS = ["#000000", "#555555", "#BBBBBB"];

export default function TopCategoriaItem({ topVitrinas }) {
  return (
    <>
      {topVitrinas != null ? (
        <Box
          h={"100%"}
          w={{ base: "100%" }}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"1.2rem"}
        >
          {topVitrinas?.map((venta, index) => (
            <Box
              key={index}
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
                  bg={COLORS[index]}
                  w={3}
                  h={3}
                  borderRadius="full"
                  mr={"10px"}
                  display={{ base: "none", md: "inline-flex" }}
                ></Box>
                <Text textStyle={"RobotoRegular"}>{venta.nombre}</Text>
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
                  ${venta.venta}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <></>
      )}
    </>
  );
}
