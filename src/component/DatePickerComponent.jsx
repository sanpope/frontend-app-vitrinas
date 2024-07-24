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
} from "@chakra-ui/react";
import StandardButton from "./ui/buttons/standard";
import SwapRightIcon from "../assets/images/SwapRightIcon";
import CalendarIcon from "../assets/images/CalendarIcon";

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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

  return (
    <Box
      display={"flex"}
      border={"1px"}
      borderColor={"grey.placeholder"}
      bg={"white"}
      borderRadius={"5px"}
      p={0}
      flex={"0 1 auto"}
    >
      <FormControl display={"flex"} alignContent={"center"}>
        <InputGroup>
          <Input
            placeholder="Start date"
            value={startDate ? startDate.toLocaleDateString() : ""}
            readOnly
            onClick={onStartOpen}
            fontSize={"1rem"}
            w={"auto"}
            borderTopWidth={"0px"}
            borderBottomWidth={"0px"}
            borderRightWidth={"0px"}
            borderLeftWidth={"0px"}
            color={"mainBg"}
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
            value={endDate ? endDate.toLocaleDateString() : ""}
            readOnly
            onClick={onEndOpen}
            fontSize={"1rem"}
            w={"9.375rem"}
            borderTopWidth={"0px"}
            borderBottomWidth={"0px"}
            borderRightWidth={"0px"}
            borderLeftWidth={"0px"}
            color={"mainBg"}
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
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                inline
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <StandardButton
              variant={"RED_PRIMARY"}
              py={"17px"}
              w={"fit-content"}
              fontSize="14px"
              fontWeight="400"
              onClick={onStartClose}
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
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                inline
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <StandardButton
              variant={"RED_PRIMARY"}
              py={"17px"}
              w={"fit-content"}
              fontSize="14px"
              fontWeight="400"
              onClick={onEndClose}
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
