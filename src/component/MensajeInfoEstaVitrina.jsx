import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Text,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import AlertEstaVitrina from "../assets/images/AlertEstaVitrina";

export default function DeleteConfirmationDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef();

  const onClose = () => setIsOpen(false);

  const onDelete = () => {
    // Lógica de eliminación
    onClose();
  };

  return (
    <>
      <Text onClick={() => setIsOpen(true)} cursor={"pointer"}>
        MensajeInfo
      </Text>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg={"transparent"} bottom={0}>
            <AlertDialogBody>
              <AlertEstaVitrina />
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
