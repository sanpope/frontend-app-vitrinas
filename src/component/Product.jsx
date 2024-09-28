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
  existencias,
  setProdCantidad,
  deleteProduct,
  producto,
}) {
  const [message, setMessage] = useState("");
  const [value, setValue] = useState(null);

  const handleOnChange = (e) => {
    if (e > 0 && e <= existencias) {
      setValue(e);
      setMessage("");
      setProdCantidad(e);
    } else if (e > existencias) {
      setMessage("La cantidad no puede superar la existencia.");
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
        p={"5px"}
      >
        <Text w={"150px"} textStyle={"RobotoBody"}>
          {productName}
        </Text>
        <Center
          w={"60px"}
          h={`32px`}
          textStyle={"RobotoBody"}
          borderColor="mainBg"
          borderWidth="1px"
          borderRadius={"5px"}
          textAlign={"center"}
          bg={"mainBg"}
          cursor={"not-allowed"}
        >
          {existencias}
        </Center>

        <NumberInput
          defaultValue={0}
          min={1}
          max={existencias}
          step={1}
          size="sm"
          maxW={"60px"}
          h={"30px"}
          required
          borderRadius={"5px"}
          mx={2}
          onChange={handleOnChange}
        >
          <NumberInputField
            fontSize={"16px"}
            textAlign={"center"}
            w={"100%"}
            m={0}
            p={0}
          />
        </NumberInput>

        <CloseIcon width="15px" height="15px" onClick={handleClick} />
      </Box>
      <Text color={"red.100"}>{message}</Text>
    </>
  );
}
