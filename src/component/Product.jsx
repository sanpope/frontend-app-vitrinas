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
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import TextInput from "./ui/textInput";
import CloseIcon from "../assets/images/CloseIcon";

export default function Product({
  productName = "Nombre del Producto",
  stock = 20,
  setProdCantidad,
  deleteProduct,
}) {
  const [message, setMessage] = useState("");
  const [value, setValue] = useState(null);

  // useEffect(() => {
  //   if (value) {
  //     setProdCantidad(value);
  //   } else {
  //   }
  // }, [value]);

  const handleOnChange = (e) => {
    if (e > 0 && e <= stock) {
      setValue(e);
      setMessage("");
    } else if (e > stock) {
      setMessage("La cantidad no puede superar el stock.");
    }
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
        <Text textStyle={"RobotoBody"}>{productName}</Text>
        <Text
          w={"80px"}
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
        </Text>

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

        <CloseIcon width="15px" height="15px" onClick={deleteProduct} />
      </Box>
      <Text color={"red.100"}>{message}</Text>
    </>
  );
}
