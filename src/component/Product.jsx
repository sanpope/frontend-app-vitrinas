import {
  Box,
  Text,
  NumberInput,
  NumberInputField,
  Center,
} from "@chakra-ui/react";
import React, { useState } from "react";
import CloseIcon from "../assets/images/CloseIcon";
import { capitalizeFirstLetter } from "../utils/formatting";

export default function Product({
  productName,
  existencias,
  setProdCantidad,
  deleteProduct,
  producto,
}) {
  const [message, setMessage] = useState("");
  const [localValue, setLocalValue] = useState(producto.cantidad);

  const handleLocalChange = (valueString) => {
    setLocalValue(valueString);
  };

  const handleBlur = () => {
    if (localValue === "" || localValue === "0" || Number(localValue) === 0) {
      setLocalValue("1");
      setProdCantidad("1");
      setMessage("");
      return;
    }

    if (isNaN(Number(localValue))) {
      setLocalValue(producto.cantidad);
      return;
    }

    const cantidad = Number.parseInt(localValue);

    if (cantidad <= existencias) {
      setMessage("");
      setProdCantidad(localValue);
    } else {
      setMessage("La cantidad no puede superar la existencia.");
      setLocalValue(existencias);
      setProdCantidad(existencias.toString());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleBlur();
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
          {capitalizeFirstLetter(productName)}
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
          min={1}
          max={existencias}
          step={1}
          size="sm"
          maxW={"60px"}
          required
          borderRadius={"5px"}
          mx={2}
          value={localValue}
        >
          <NumberInputField
            fontSize={"16px"}
            textAlign={"center"}
            w={"100%"}
            m={0}
            p={0}
            onChange={(e) => handleLocalChange(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
        </NumberInput>

        <CloseIcon width="15px" height="15px" onClick={handleClick} />
      </Box>
      <Text color={"red.100"}>{message}</Text>
    </>
  );
}
