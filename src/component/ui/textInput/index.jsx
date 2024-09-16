import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Text,
  useTheme,
} from "@chakra-ui/react";
import colors from "./types.json";
import ErrorMessage from "../errorMessage";
// import { FIELD_SIZE } from "#/types/consts";

import EyeIcon from "../../../assets/images/EyeIcon";
import EyeOffIcon from "../../../assets/images/EyeOffIcon";
import useColorFormatConverter from "../../../theme/useColorFormatConverter";

export default function TextInput(props) {
  const {
    name,
    value,
    onChange,
    error,
    placeholder,
    disabled,
    label,
    size,
    leftIcon,
    rightIcon,
    isPassword,
    maxLength = 150,
    baseColor = "white",
    staticText,
    borderTopWidth = "1px",
    borderBottomWidth = "1px",
    borderRightWidth = "0px",
    borderLeftWidth = "1px",
    ...rest
  } = props;

  const theme = useTheme();

  const colorConverter = useColorFormatConverter();

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const palette = React.useMemo(() => {
    return colors[baseColor];
  }, [baseColor]);

  return (
    <FormControl {...rest}>
      {label && (
        <FormLabel fontSize={14} lineHeight={"100%"} htmlFor={name}>
          {label}&nbsp;
        </FormLabel>
      )}
      <InputGroup
        // _focusWithin={{
        //   borderColor: getBorderColor(true),
        //   ".chakra-input__left-addon": {
        //     borderColor: `${innerBorderColor} !important`,
        //   },
        //   ".chakra-input": {
        //     borderTopColor: `${innerBorderColor} !important`,
        //     borderBottomColor: `${innerBorderColor} !important`,
        //     borderLeftColor: `${
        //       leftIcon ? "transparent" : innerBorderColor
        //     } !important`,
        //     borderRightColor: `${
        //       rightIcon ? "transparent" : innerBorderColor
        //     } !important`,
        //   },
        // }}
        // borderColor={getBorderColor(false)}
        borderWidth="1px"
        borderRadius="5px"
        h={`40px`}
      >
        {leftIcon && (
          <InputLeftAddon
            pointerEvents="none"
            children={leftIcon}
            bgColor={"white"}
            h="full"
            border={"0px solid transparent"}
          />
        )}
        {staticText && (
          <Box
            borderTopWidth={borderTopWidth}
            borderBottomWidth={borderBottomWidth}
            borderRightWidth={borderRightWidth}
            borderLeftWidth={borderLeftWidth}
            borderTopRightRadius={0}
            borderBottomRightRadius={0}
            borderTopLeftRadius={"5px"}
            borderBottomLeftRadius={"5px"}
            height="38px"
            display="flex"
            alignItems={"center"}
            justifyContent={"center"}
            borderColor={
              !error && baseColor === "white" ? palette?.border : "transparent"
            }
            _hover={{
              borderColor:
                !error && baseColor === "white"
                  ? palette?.border
                  : "transparent",
            }}
          >
            <Text ml="1rem">{staticText}</Text>
          </Box>
        )}
        <Input
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          h="full"
          data-testid={`input-${name}`}
          disabled={disabled}
          placeholder={placeholder}
          _placeholder={{ opacity: 0.4, color: palette?.placeholder }}
          fontFamily="Roboto"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="150%"
          maxLength={maxLength}
          type={!show && isPassword ? "password" : "text"}
          bgColor={error ? palette.errorBg : baseColor}
          color={palette?.text}
          border={"0px solid transparent"}
          borderColor={
            error
              ? colorConverter(palette.error) + " " + "!important"
              : !error && baseColor === "white"
                ? palette?.border
                : "transparent"
          }
          _hover={{
            borderColor:
              !error && baseColor === "white" ? palette?.border : "transparent",
          }}
          _disabled={{
            borderColor: palette?.border,
          }}
          _autofill={{
            WebkitTextFillColor: colorConverter(palette.text),
            WebkitBoxShadow: `inset 0 0 20px 20px ${
              baseColor === "white" || baseColor === "black"
                ? baseColor
                : colorConverter(baseColor)
            }`,
          }}
        />
        {rightIcon && (
          <InputRightElement pointerEvents="none" children={rightIcon} />
        )}
        {isPassword && (
          <InputRightElement h="full" onClick={handleClick} cursor="pointer">
            {show ? <EyeIcon /> : <EyeOffIcon />}
          </InputRightElement>
        )}
      </InputGroup>
      {!!error && <ErrorMessage color={palette?.error}>{error}</ErrorMessage>}
    </FormControl>
  );
}
