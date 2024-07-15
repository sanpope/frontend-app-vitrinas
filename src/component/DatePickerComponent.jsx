import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Flex,
  Icon,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useMediaQuery,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import StandardButton from "./ui/buttons/standard";
import TextInput from "./ui/textInput";
import SwapRightIcon from "../assets/images/SwapRightIcon";
import CalendarIcon from "../assets/images/CalendarIcon";

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showCalendars, setShowCalendars] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSmallScreen] = useMediaQuery("(max-width: 350px)");

  const handleClick = () => {
    setShowCalendars(true);
  };

  return (
    <Box
      display={"flex"}
      border={"1px"}
      borderColor={"grey.placeholder"}
      bg={"white"}
      borderRadius={"5px"}
      p={0}
      flex={"0 1 250px"}
    >
      <FormControl>
        <InputGroup size="md">
          <Input
            placeholder="Start date"
            value={startDate ? startDate.toLocaleDateString() : ""}
            readOnly
            onClick={onOpen}
            onChange={(e) => setEndDate(e.target.value)}
            fontSize={"1rem"}
            w={"9.375rem"}
            borderTopWidth={"0px"}
            borderBottomWidth={"0px"}
            borderRightWidth={"0px"}
            borderLeftWidth={"0px"}
            color={"mainBg"}
          />
          <InputRightElement width="4.5rem">
            {!isSmallScreen ? <SwapRightIcon /> : <></>}
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl>
        <InputGroup size="md">
          <Input
            placeholder="End date"
            value={endDate ? endDate.toLocaleDateString() : ""}
            readOnly
            onClick={onOpen}
            onChange={(e) => setEndDate(e.target.value)}
            fontSize={"1rem"}
            w={"9.375rem"}
            borderTopWidth={"0px"}
            borderBottomWidth={"0px"}
            borderRightWidth={"0px"}
            borderLeftWidth={"0px"}
            color={"mainBg"}
          />
          <InputRightElement width="4.5rem">
            {!isSmallScreen ? <CalendarIcon /> : <></>}
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w={"100%"} maxW={"515px"}>
          <ModalBody>
            <Box display={"flex"} justifyContent={"center"} gap={"5px"}>
              <Box>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  inline
                />
              </Box>
              <Box>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  inline
                />
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <StandardButton
              variant={"RED_PRIMARY"}
              py={"17px"}
              w={"fit-content"}
              fontSize="14px"
              fontWeight="400"
              onClick={onClose}
            >
              Ok
            </StandardButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DateRangePicker;
{
  /*<TextInput
            baseColor="transparent"
            placeholder="Start date"
            value={startDate ? startDate.toLocaleDateString() : ""}
            readOnly
            onClick={onOpen}
            onChange={(e) => setEndDate(e.target.value)}
            fontSize={"0.75rem"}
            w={"9.375rem"}
            rightIcon={!isSmallScreen ? <SwapRightIcon /> : <></>}
            borderTopWidth={"0px"}
            borderBottomWidth={"1px"}
            borderRightWidth={"0px"}
            borderLeftWidth={"0px"}
            style={{ borderStyle: "hidden" }}
          />*/
}
