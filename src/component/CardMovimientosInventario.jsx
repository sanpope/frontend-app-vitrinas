import { Box, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import React from "react";
import TimesCircleIcon from "../assets/images/TimesCircleIcon";
import ClockICon from "../assets/images/ClockIcon";

export default function CardMovimientosInventario({
  fecha,
  visita,
  ProdIngr,
  ProdRet,
}) {
  return (
    <Box
      w={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"flex-start"}
      p={2}
      py={3}
      gap={2}
      borderBottomColor={"grey.placeholder"}
      borderBlockEndWidth={1}
      bg="white"
      _hover={{
        bg: "red.40",
        transition: "all 0.2s ease-in-out",
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        gap={"10px"}
      >
        <ClockICon width={"15px"} height={"15px"} />
        <Text textStyle={"RobotoRegularBold"}>Fecha y hora:</Text>
        <Text textStyle={"RobotoRegular"}>{fecha}</Text>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        gap={"10px"}
      >
        <TimesCircleIcon width={"15px"} height={"15px"} />
        <Text textStyle={"RobotoRegularBold"}>Visita:</Text>
        <Text textStyle={"RobotoRegular"}>{visita}</Text>
      </Box>
      <Box display={"flex"} flexDirection={"column"}>
        <Box
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          gap={"10px"}
        >
          <Box
            bg="green"
            w={3}
            h={3}
            borderRadius="full"
            display={"inline-flex"}
          ></Box>
          <Text textStyle={"RobotoRegularBold"}>Productos Ingresados:</Text>
        </Box>
      
      </Box>
      <Box display={"flex"} flexDirection={"column"}>
        <Box
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          gap={"10px"}
        >
          <Box
            bg="red"
            w={3}
            h={3}
            borderRadius="full"
            display={"inline-flex"}
          ></Box>
          <Text textStyle={"RobotoRegularBold"}>Productos Retirados:</Text>
        </Box>
        <UnorderedList p={1}>
          {ProdRet.map((prod, index) => (
            <ListItem key={index} >
              <Text textStyle={"RobotoRegular"}>{prod}</Text>
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
    </Box>
  );
}
