import {
  Box,
  Select,
  Text,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Center,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import TextInput from "./ui/textInput";
import CloseIcon from "../assets/images/CloseIcon";

export default function Product({
  productName,
  stock,
  setProdCantidad,
  deleteProduct,
  producto,
}) {
  const [message, setMessage] = useState("");
  const [value, setValue] = useState(null);

  const handleOnChange = (e) => {
    if (e > 0 && e <= stock) {
      setValue(e);
      setMessage("");
      setProdCantidad(e);
    } else if (e > stock) {
      setMessage("La cantidad no puede superar el stock.");
    }
  };

  const handleClick = () => {
    deleteProduct(producto);
  };
  return (
    <>
      <Box
        w={"100%"}
        display={"flex"}
        borderBottom="1px"
        borderColor="gray.200"
        alignItems={"center"}
        justifyContent={"space-around"}
        p={"10px"}
      >
        <Text w={"150px"} textStyle={"RobotoBody"}>
          {productName}
        </Text>
        <Center
          minW={"60px"}
          h={`32px`}
          textStyle={"RobotoBody"}
          borderColor="mainBg"
          borderWidth="1px"
          borderRadius={"5px"}
          textAlign={"center"}
          bg={"mainBg"}
          cursor={"not-allowed"}
        >
          {stock}
        </Center>

        <NumberInput
          defaultValue={0}
          min={1}
          max={stock}
          size="sm"
          maxW={"80px"}
          h={"30px"}
          required
          borderRadius={"5px"}
          textAlign={"center"}
          mx={2}
          onChange={handleOnChange}
        >
          <NumberInputField fontSize={"16px"} textAlign={"center"} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        <CloseIcon width="15px" height="15px" onClick={handleClick} />
      </Box>
      <Text color={"red.100"}>{message}</Text>
    </>
  );
}
