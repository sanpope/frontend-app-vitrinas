import React, { useState } from "react";
import {
  Box,
  Text,
  IconButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import SwitchOnIcon from "../assets/images/SwitchOnIcon";
import SwitchOffIcon from "../assets/images/SwitchOffICon";
import ExclamationUpIcon from "../assets/images/ExclamationUpIcon";
import ExclamationDownIcon from "../assets/images/ExclamationDownIcon";

const SwitchElement = () => {
  const [showContent, setShowContent] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [showEnablePopup, setShowEnablePopup] = useState(false);
  const [showDisablePopup, setShowDisablePopup] = useState(false);

  const handleToggle = () => {
    if (isEnabled) {
      setIsEnabled(false);
      setShowDisablePopup(true);
    } else {
      setIsEnabled(true);
      setShowEnablePopup(true);
    }
    setShowContent(false);
  };

  const onCloseEnablePopup = () => setShowEnablePopup(false);
  const onCloseDisablePopup = () => setShowDisablePopup(false);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {isEnabled ? (
          <SwitchOnIcon
            width={"1.50rem"}
            height={"1.50rem"}
            onClick={handleToggle}
          />
        ) : (
          <SwitchOffIcon
            width={"1.50rem"}
            height={"1.50rem"}
            onClick={handleToggle}
          />
        )}
      </Box>

      <AlertDialog isOpen={showEnablePopup} onClose={onCloseEnablePopup}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogBody
            display="flex"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
          >
            <ExclamationUpIcon />
            <Text>Asesor habilitado para modificación</Text>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog isOpen={showDisablePopup} onClose={onCloseDisablePopup}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogBody>
            <Box
              w={"100%"}
              h={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <ExclamationDownIcon />
              <Text>Asesor deshabilitado para modificación.</Text>
            </Box>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};

export default SwitchElement;
