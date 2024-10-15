import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Box,
  Input,
  FormControl,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  useMediaQuery,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import StandardButton from "./ui/buttons/standard";
import SwapRightIcon from "../assets/images/SwapRightIcon";
import CalendarIcon from "../assets/images/CalendarIcon";

const DateRangePicker = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const {
    isOpen: isStartOpen,
    onOpen: onStartOpen,
    onClose: onStartClose,
  } = useDisclosure();
  const {
    isOpen: isEndOpen,
    onOpen: onEndOpen,
    onClose: onEndClose,
  } = useDisclosure();
  const [isSmallScreen] = useMediaQuery("(max-width: 350px)");
  const [focusedStart, setFocusedStart] = useState(startDate);
  const [focusedEnd, setFocusedEnd] = useState(endDate);
  const toast = useToast();

  const handleStartDateChange = (date) => {
    setFocusedStart(date);
    if (focusedEnd && date > focusedEnd) {
      setFocusedEnd(null);
      setEndDate(null);
    }
  };

  const handleEndDateChange = (date) => {
    setFocusedEnd(date);
  };

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Box
      display={"flex"}
      border={"1px"}
      borderColor={"grey.placeholder"}
      bg={"white"}
      borderRadius={"5px"}
      px={0}
      flex={"0 1 auto"}
    >
      <FormControl display={"flex"} alignContent={"center"}>
        <InputGroup>
          <Input
            placeholder="Start date"
            value={formatDate(startDate)}
            readOnly
            onClick={onStartOpen}
            fontSize={"1rem"}
            w={"auto"}
            borderTopWidth={"0px"}
            borderBottomWidth={"0px"}
            borderRightWidth={"0px"}
            borderLeftWidth={"0px"}
            color={"black"}
            cursor={"pointer"}
          />
          <InputRightElement width="4.5rem">
            {!isSmallScreen ? <SwapRightIcon /> : <></>}
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl>
        <InputGroup>
          <Input
            placeholder="End date"
            value={formatDate(endDate)}
            readOnly
            onClick={() => {
              if (startDate) {
                onEndOpen();
              } else {
                toast({
                  title: "Start date required",
                  description: "Please select a start date first",
                  status: "warning",
                  duration: 3000,
                  isClosable: true,
                  position: "top",
                });
              }
            }}
            fontSize={"1rem"}
            w={"11rem"}
            borderTopWidth={"0px"}
            borderBottomWidth={"0px"}
            borderRightWidth={"0px"}
            borderLeftWidth={"0px"}
            color={"black"}
            cursor={"pointer"}
          />
          <InputRightElement width="4.5rem">
            {!isSmallScreen ? <CalendarIcon /> : <></>}
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Modal isOpen={isStartOpen} onClose={onStartClose} size={"xs"}>
        <ModalOverlay />
        <ModalContent w={"100%"} top={"80px"} left={"300px"}>
          <ModalBody>
            <Box display={"flex"} justifyContent={"center"}>
              <DatePicker
                selected={focusedStart}
                onChange={handleStartDateChange}
                inline
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <StandardButton
              variant={"RED_PRIMARY"}
              w={"fit-content"}
              fontSize="14px"
              fontWeight="400"
              onClick={() => {
                setStartDate(focusedStart);
                onStartClose();
              }}
            >
              Ok
            </StandardButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isEndOpen} onClose={onEndClose} size={"xs"}>
        <ModalOverlay />
        <ModalContent w={"100%"} top={"80px"} left={"300px"}>
          <ModalBody>
            <Box display={"flex"} justifyContent={"center"}>
              <DatePicker
                selected={focusedEnd}
                onChange={handleEndDateChange}
                minDate={startDate}
                inline
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <StandardButton
              variant={"RED_PRIMARY"}
              w={"fit-content"}
              fontSize="14px"
              fontWeight="400"
              onClick={() => {
                setEndDate(focusedEnd);
                onEndClose();
              }}
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
