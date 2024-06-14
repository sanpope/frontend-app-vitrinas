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
import colors from "./theme.json";
import ErrorMessage from "../errorMessage";
// import { FIELD_SIZE } from "#/types/consts";
// import EyeOff from "#/images/svgs/eye-off";
import Eye from "../../../assets/images/Eye";
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
        borderRadius="2px"
        h={`40px`}
      >
        {leftIcon && (
          <InputLeftAddon
            pointerEvents="none"
            children={leftIcon}
            borderColor={error ? palette.error : palette?.iconContainer}
            bgColor={palette?.iconContainer}
            h="full"
            borderTopWidth="1px"
            borderBottomWidth="1px"
            borderLeftWidth={"1px"}
            borderRightWidth={0}
          />
        )}
        {staticText && (
          <Box
            borderTopWidth="1px"
            borderBottomWidth="1px"
            borderRightWidth={0}
            borderLeftWidth={"1px"}
            borderTopRightRadius={0}
            borderBottomRightRadius={0}
            borderTopLeftRadius={"2px"}
            borderBottomLeftRadius={"2px"}
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
          fontFamily="Inter"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="150%"
          maxLength={maxLength}
          type={!show && isPassword ? "password" : "text"}
          bgColor={error ? palette.errorBg : baseColor}
          color={palette?.text}
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
          borderTopWidth="1px"
          borderBottomWidth="1px"
          borderLeftWidth={leftIcon || staticText ? 0 : "1px"}
          borderRightWidth={rightIcon ? 0 : "1px"}
          focusBorderColor="transparent"
          errorBorderColor="transparent"
          borderTopLeftRadius={leftIcon || staticText ? 0 : "2px"}
          borderBottomLeftRadius={leftIcon || staticText ? 0 : "2px"}
          borderBottomRightRadius={rightIcon ? 0 : "2px"}
          borderTopRightRadius={rightIcon ? 0 : "2px"}
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
              <Eye />
          </InputRightElement>
        )}
      </InputGroup>
      {!!error && <ErrorMessage color={palette?.text}>{error}</ErrorMessage>}
    </FormControl>
  );
}
