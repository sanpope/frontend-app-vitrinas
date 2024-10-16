import React, { useState } from "react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  Text,
} from "@chakra-ui/react";

const NumberInputFloat = ({ value, onChange, placeholder }) => {
  const format = (val) => val?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const parse = (val) => val?.replace(/,/g, "");

  return (
    <NumberInput
      value={format(value?.toString())}
      min={0}
      max={1000000}
      step={0.1}
      precision={2}
      onChange={(valueString) => onChange(parse(valueString))}
    >
      <NumberInputField textAlign="left" placeholder={placeholder} />
    </NumberInput>
  );
};

export default NumberInputFloat;
