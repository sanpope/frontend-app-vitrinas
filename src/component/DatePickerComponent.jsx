import React, { useState, useEffect } from "react";
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
  Grid,
  GridItem,
  Flex,
  Text,
  Button,
  IconButton,
  VStack,
  HStack,
} from "@chakra-ui/react";
import StandardButton from "./ui/buttons/standard";
import SwapRightIcon from "../assets/images/SwapRightIcon";
import CalendarIcon from "../assets/images/CalendarIcon";
import PrevIcon from "../assets/images/PrevIcon";
import NextIcon from "../assets/images/NextIcon";
import { capitalizeFirstLetter } from "../utils/formatting";

const DualCalendarDateRangePicker = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onFilterChange,
}) => {
  const {
    isOpen: isCalendarOpen,
    onOpen: onCalendarOpen,
    onClose: onCalendarClose,
  } = useDisclosure();

  const toast = useToast();
  const [isSmallScreen] = useMediaQuery("(max-width: 350px)");

  const [selectedDatesLocal, setSelectedDatesLocal] = useState([
    startDate ? new Date(startDate) : null,
    endDate ? new Date(endDate) : null,
  ]);

  const [leftMonth, setLeftMonth] = useState(() => {
    if (startDate) {
      return new Date(startDate);
    }
    return new Date();
  });

  const [rightMonth, setRightMonth] = useState(() => {
    if (endDate) {
      return new Date(endDate);
    } else {
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      return nextMonth;
    }
  });

  useEffect(() => {
    const newStartDate = startDate ? new Date(startDate) : null;
    const newEndDate = endDate ? new Date(endDate) : null;

    setSelectedDatesLocal([newStartDate, newEndDate]);

    if (newStartDate) {
      setLeftMonth(new Date(newStartDate));
    }

    if (newEndDate) {
      setRightMonth(new Date(newEndDate));
    }
  }, [startDate, endDate]);

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatMonth = (date) => {
    if (!date) return "";
    return date.toLocaleString("es-ES", {
      month: "long",
      year: "numeric",
    });
  };

  const formatDateToYYYYMMDD = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateSelect = (date, isStartDate) => {
    const newDate = new Date(date);
    newDate.setHours(12, 0, 0, 0);
    
    let newDates = [...selectedDatesLocal];

    if (isStartDate) {
      newDates[0] = newDate;

      if (newDates[1] && newDate > newDates[1]) {
        newDates[1] = null;
      }
    } else {
      if (newDates[0]) {
        if (newDate >= newDates[0]) {
          newDates[1] = newDate;
        } else {
          newDates[0] = newDate;
          newDates[1] = null;
        }
      } else {
        newDates[0] = newDate;
      }
    }

    setSelectedDatesLocal(newDates);

  };

  const handleConfirm = () => {
    if (selectedDatesLocal[0] && selectedDatesLocal[1]) {
      setStartDate(selectedDatesLocal[0]);
      setEndDate(selectedDatesLocal[1]);

     
      if (typeof onFilterChange === "function") {
        onFilterChange({
          startDate: formatDateToYYYYMMDD(selectedDatesLocal[0]),
          endDate: formatDateToYYYYMMDD(selectedDatesLocal[1]),
        });
      }

      onCalendarClose();
    } else if (selectedDatesLocal[0] && !selectedDatesLocal[1]) {
      if (toast) {
        toast({
          title: "Fecha de fin requerida",
          description:
            "Por favor selecciona una fecha de fin para completar el rango",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        alert("Por favor selecciona una fecha de fin para completar el rango");
      }
    } else {
      if (toast) {
        toast({
          title: "Fechas requeridas",
          description: "Por favor selecciona ambas fechas",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        alert("Por favor selecciona ambas fechas");
      }
    }
  };

  const handleClearSelection = () => {
    setSelectedDatesLocal([null, null]);
  };

  const navigateMonth = (calendar, direction) => {
    const monthOffset = direction === "prev" ? -1 : 1;

    if (calendar === "left") {
      const newDate = new Date(leftMonth);
      newDate.setMonth(newDate.getMonth() + monthOffset);
      setLeftMonth(newDate);
    } else {
      const newDate = new Date(rightMonth);
      newDate.setMonth(newDate.getMonth() + monthOffset);
      setRightMonth(newDate);
    }
  };

  const generateCalendarDays = (baseDate) => {
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let firstDayOfWeek = firstDay.getDay();

    if (firstDayOfWeek === 0) firstDayOfWeek = 7;

    const days = [];

    for (let i = firstDayOfWeek - 1; i > 0; i--) {
      const date = new Date(year, month, 1 - i);
      days.push({
        date,
        dayNumber: date.getDate(),
        isCurrentMonth: false,
      });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({
        date: new Date(year, month, i),
        dayNumber: i,
        isCurrentMonth: true,
      });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        dayNumber: date.getDate(),
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const renderCalendar = (baseDate, isLeftCalendar) => {
    const today = new Date();
    
    today.setHours(0, 0, 0, 0);
    
    const days = generateCalendarDays(baseDate);

    const isDateDisabled = (date) => {
     
      const dateToCheck = new Date(date);
      dateToCheck.setHours(0, 0, 0, 0);
      
      const isToday = dateToCheck.getDate() === today.getDate() && 
                     dateToCheck.getMonth() === today.getMonth() &&
                     dateToCheck.getFullYear() === today.getFullYear();
                     
      const result = dateToCheck.getTime() > today.getTime();
      
      return result;
    };

    const isSelected = (date) => {
      const selectedDate = isLeftCalendar
        ? selectedDatesLocal[0]
        : selectedDatesLocal[1];

      return (
        selectedDate &&
        date.getFullYear() === selectedDate.getFullYear() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getDate() === selectedDate.getDate()
      );
    };

    const isInRange = (date) => {
      return false;
    };

    return (
      <VStack spacing={3} align="stretch">
        <Flex
          justify="space-between"
          align="center"
          borderBottomWidth={"1px"}
          borderBottomColor={"placeholder"}
          paddingBottom={"10px"}
        >
          <IconButton
            style={{ backgroundColor: "transparent" }}
            size="sm"
            icon={<PrevIcon />}
            aria-label="Previous month"
            onClick={() =>
              navigateMonth(isLeftCalendar ? "left" : "right", "prev")
            }
          />
          <Text textStyle={"RobotoSubtitle"}>
            {capitalizeFirstLetter(
              baseDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              }),
            )}
          </Text>
          <IconButton
            style={{ backgroundColor: "transparent" }}
            size="sm"
            icon={<NextIcon />}
            aria-label="Next month"
            onClick={() =>
              navigateMonth(isLeftCalendar ? "left" : "right", "next")
            }
            isDisabled={
              baseDate.getMonth() === today.getMonth() &&
              baseDate.getFullYear() === today.getFullYear()
            }
          />
        </Flex>

        <Grid templateColumns="repeat(7, 1fr)" mb={1}>
          {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day) => (
            <GridItem key={day} textAlign="center">
              <Text textStyle={"RobotoBody"}>{day}</Text>
            </GridItem>
          ))}
        </Grid>

        <Grid templateColumns="repeat(7, 1fr)" gap={1}>
          {days.map((day, index) => {
            const isDisabled = isDateDisabled(day.date);
            const selected = isSelected(day.date);
            const inRange = isInRange(day.date);
            
            const isToday = day.date.getDate() === new Date().getDate() && 
                         day.date.getMonth() === new Date().getMonth() && 
                         day.date.getFullYear() === new Date().getFullYear();
                         
            return (
              <GridItem key={index} textAlign="center">
                <Button
                  size="sm"
                  variant={"ghost"}
                  colorScheme={"gray"}
                  fontWeight={400}
                  textStyle="RobotoBody"
                  p={2}
                  bg={selected ? "red.500" : isToday ? "blue.100" : "transparent"}
                  color={
                    selected
                      ? "white"
                      : !day.isCurrentMonth
                        ? "gray.400"
                        : isDisabled
                          ? "gray.300"
                          : "black"
                  }
                  opacity={!day.isCurrentMonth ? 0.5 : 1}
                  onClick={() => {
                    handleDateSelect(day.date, isLeftCalendar);
                  }}
                  isDisabled={isDisabled || !day.isCurrentMonth}
                  _hover={{
                    bg:
                      day.isCurrentMonth && !isDisabled ? "red.100" : undefined,
                  }}
                  height="30px"
                  minWidth="30px"
                  padding="0"
                >
                  {day.dayNumber}
                </Button>
              </GridItem>
            );
          })}
        </Grid>
      </VStack>
    );
  };

  return (
    <Box>
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
              placeholder="Fecha de inicio"
              value={formatDate(startDate)}
              readOnly
              onClick={onCalendarOpen}
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
              placeholder="Fecha de fin"
              value={formatDate(endDate)}
              readOnly
              onClick={onCalendarOpen}
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
      </Box>

      <Modal
        isOpen={isCalendarOpen}
        onClose={() => {
          onCalendarClose();
        }}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent w={"100%"} maxW={"800px"}>
          <ModalBody py={4}>
            <Flex
              direction={isSmallScreen ? "column" : "row"}
              justifyContent={"space-between"}
              gap={4}
            >
              <Box flex="1" py={3}>
                {renderCalendar(leftMonth, true)}
              </Box>

              <Box flex="1" py={3}>
                {renderCalendar(rightMonth, false)}
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <HStack>
              <StandardButton
                variant={"RED_PRIMARY"}
                w={"fit-content"}
                fontSize="14px"
                onClick={handleConfirm}
              >
                Ok
              </StandardButton>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DualCalendarDateRangePicker;