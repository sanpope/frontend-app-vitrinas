import { Box, Select, Text } from "@chakra-ui/react";
import React from "react";
import TextInput from "./ui/textInput";
import CloseIcon from "../assets/images/CloseIcon";

export default function Product({
  productName = "Nombre del Producto",
  stock = 20,
  cantidad = 10,
}) {
  return (
    <Box
      w={"100%"}
      display={"flex"}
      borderBottom="1px"
      borderColor="gray.200"
      alignItems={"center"}
      justifyContent={"space-around"}
      py={"10px"}
    >
      <Text textStyle={"RobotoBody"}>{productName}</Text>
      <Text
        w={"80px"}
        h={`30px`}
        textStyle={"RobotoBody"}
        borderColor="mainBg"
        borderWidth="1px"
        borderRadius={"5px"}
        textAlign={"center"}
        bg={"mainBg"}
        cursor={"not-allowed"}
      >
        {stock}
      </Text>
      <Select
        w={"80px"}
        h={"30px"}
        required
        icon={<></>}
        placeholder="10"
        borderColor="mainBg"
        borderWidth="1px"
        borderRadius={"5px"}
        textAlign={"center"}
      >
        <option>20</option>
        <option>30</option>
      </Select>
      <CloseIcon width="15px" height="15px" />
    </Box>
  );
}
