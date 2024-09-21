import React from "react";
import MensajeInfoIcon from "../assets/images/MensajeInfoIcon";
import StandardButton from "./ui/buttons/standard";

export default function MensajeInfo({ mensaje }) {
  return (
    <StandardButton
      w={"fit-content"}
      h={"40px"}
      variant={"INFO"}
      leftIcon={<MensajeInfoIcon />}
      p={2}
      borderWidth={"1px"}
      textStyle="RobotoTiny"
      fontSize={"14px"}
      fontWeight={"normal"}
    >
      {mensaje}
    </StandardButton>
  );
}
