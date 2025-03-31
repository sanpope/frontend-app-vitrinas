import { Button } from "@chakra-ui/react";
import React from "react";
import BUTTON_VARIANTS from "./types";

export default function StandardButton({
  children,
  onClick,
  type,
  textStyle = "RobotoRegular",
  fontSize,
  size = "sm",
  variant,
  disabled = false,
  isLoading,
  leftIcon,
  px, // Capturamos px para compatibilidad con código existente
  py, // Capturamos py para compatibilidad con código existente
  ...rest
}) {
  const palette = React.useMemo(() => BUTTON_VARIANTS[variant], [variant]);
  const { normal, hover, disabled: disabledColor, active } = palette;

  // Convertir propiedades de padding abreviadas a completas para Safari
  const paddingProps = {};
  if (px) {
    paddingProps.paddingLeft = px;
    paddingProps.paddingRight = px;
  }
  if (py) {
    paddingProps.paddingTop = py;
    paddingProps.paddingBottom = py;
  }

  return (
    <Button
      {...rest}
      {...paddingProps}
      onClick={onClick}
      bg={normal.bg}
      leftIcon={leftIcon}
      disabled={disabled || isLoading}
      _disabled={disabledColor}
      _hover={!disabled ? hover : {}}
      _active={active}
      borderWidth="1.8px"
      borderColor={normal.borderColor}
      size={size}
      type={type}
      textStyle={textStyle}
      color={normal.color}
      isLoading={isLoading}
      fontFamily="Roboto"
      fontSize={fontSize ?? "1rem"}
      fontStyle="normal"
      fontWeight="600"
    >
      {children}
    </Button>
  );
}
