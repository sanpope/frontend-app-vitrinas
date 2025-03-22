import { Box, Text } from "@chakra-ui/react";
import React from "react";
import useNormalize from "../hooks/useNormalize";

const COLORS = ["#000000", "#555555", "#BBBBBB"];
const GRAY_COLOR = "#BBBBBB";

export default function TopCategoriaItem({ topVitrinas }) {
  const normalize = useNormalize();
  return (
    <>
      {topVitrinas != null ? (
        <Box
          h={"100%"}
          w={{ base: "100%" }}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-around"}
          alignItems={"center"}
          gap={normalize(0.2)}
        >
          {topVitrinas?.map((venta, index) => (
            <Box
              key={index}
              w={"100%"}
              display={"flex"}
              justifyContent={"space-around"}
              alignItems={"center"}
              mr={"4px"}
            >
              <Box
                display={"flex"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                minW={"145px"}
              >
                <Box
                  bg={COLORS[index]}
                  w={3}
                  h={3}
                  borderRadius="full"
                  mr={"10px"}
                  display={{ base: "none", md: "inline-flex" }}
                ></Box>
                <Text textStyle={"RobotoRegular"} pr={1}>
                  {venta.nombre}
                </Text>
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
