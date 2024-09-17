import React from "react";
import { Checkbox as ChakraCheckbox } from "@chakra-ui/react";
import FileCheckIcon from "../../../assets/images/FileCheckIcon";

export default function Checkbox({
  checked,
  setChecked,
  text,
  defaultChecked,
  size,
  disabled,
  colorScheme = "red",
  checkIcon = <FileCheckIcon />,
  onClick
}) {
  return (
    <ChakraCheckbox
      isChecked={checked}
      onChange={setChecked}
      checkIcon={checkIcon}
      defaultChecked={defaultChecked ?? false}
      disabled={disabled}
      size={size ?? "md"}
      _checked={{
        "& .chakra-checkbox__control": {
          background: colorScheme,
          border: `1px solid ${colorScheme}`,
        },
      }}
      iconColor="white"
      onClick={onClick}
    >
      {text}
    </ChakraCheckbox>
  );
}
