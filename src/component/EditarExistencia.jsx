import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
  Input,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import TextInput from "./ui/textInput";
import StandardButton from "./ui/buttons/standard";
import ConfirmationMessage from "./ConfirmationMessage";
import WarningIcon from "../assets/images/WarningIcon";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import { parseData, parseTextFields } from "../utils/xmlParse";

const FIELD_NAMES = [
  "categoria",
  "codigo",
  "costo",
  "existencias",
  "existenciasVerificadas",
  "nombre",
  "precio",
  "proveedor",
  "stockMaximo",
  "stockMinimo",
];

export default function EditarExistencia({
  isOpen,
  onOpen,
  onClose,
  articulo,
  setTablaInventario,
  setDisplayedArticulos,
}) {
  const {
    isOpen: isConfirmationModalOpen,
    onOpen: onConfirmationModalOpen,
    onClose: onConfirmationModalClose,
  } = useDisclosure();

  const toast = useToast();
  const vitrinaName = useSelector((state) => state.vitrinaReducer.name);
  const [loading, setLoading] = useState(false);

  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [precio, setPrecio] = useState("");
  const [costo, setCosto] = useState("");
  const [existencia, setExistencia] = useState("");
  const [exisVerificada, setExisVerificada] = useState();
  const [stockMin, setStockMin] = useState("");
  const [stockMax, setStockMax] = useState("");
  const disabled = true;

  useEffect(() => {
    if (articulo) {
      const {
        codigo,
        nombre,
        categoria,
        precio,
        costo,
        existencia,
        exisVerificadas,
        stockMin,
        stockMax,
        proveedor,
      } = articulo;
      setNombre(nombre);
      setCodigo(codigo);
      setCategoria(categoria);
      setPrecio(precio);
      setCosto(costo);
      setExistencia(existencia);
      setExisVerificada(exisVerificadas);
      setStockMin(stockMin);
      setStockMax(stockMax);
      setProveedor(proveedor);
    }
  }, [articulo]);

  const updateProducto = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina/inventario/productos?vitrina=${vitrinaName}&producto=${codigo}`,
        {
          cantidad: Number(existencia),
          stockMinimo: Number(stockMin),
          stockMaximo: Number(stockMax),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      if (response.status == 200 && response.data) {
        const xmlDoc = parseData(response.data);
        const updatedData = parseTextFields(xmlDoc, FIELD_NAMES);
        setTablaInventario((prevState) => {
          let copy = [...prevState];
          var index = copy
            .map((producto) => producto.codigo)
            .indexOf(updatedData.codigo);
          copy[index]["existencia"] = updatedData.existencias;
          copy[index]["stockMin"] = updatedData.stockMinimo;
          copy[index]["stockMax"] = updatedData.stockMaximo;
          return copy;
        });

        setDisplayedArticulos((prevState) => {
          let copy = [...prevState];
          var index = copy
            .map((producto) => producto.codigo)
            .indexOf(updatedData.codigo);
          copy[index]["existencia"] = updatedData.existencias;
          copy[index]["stockMin"] = updatedData.stockMinimo;
          copy[index]["stockMax"] = updatedData.stockMaximo;
          return copy;
        });
        toast({
          status: "success",
          description: "Producto editado con éxito.",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      }

      onClose();
    } catch (error) {
      toast({
        status: "error",
        description: "Error actualizando el producto",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={"20px"}>
          <ModalHeader
            bg={"black"}
            display={"flex"}
            flexDir={"column"}
            borderTopRadius="20px"
          >
            <Text textStyle={"RobotoSubtitle"} color={"white"}>
              Editar existencia
            </Text>
          </ModalHeader>
          <ModalBody
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box
              w={"100%"}
              display={"flex"}
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <FormControl
                p={"10px"}
                display="flex"
                flexDirection={"column"}
                alignItems="center"
              >
                <Box
                  w={"100%"}
                  display={"flex"}
                  flexDirection={"column"}
                  gap={"10px"}
                  justifyContent={"center"}
                  alignItems={"flex-start"}
                >
                  <FormLabel>Nombre del producto</FormLabel>
                  <Input
                    onChange={(val) => setNombre(val)}
                    value={nombre}
                    isDisabled={disabled}
                    color={disabled ? "grey.placeholder.60" : "black"}
                    bg={"mainBg"}
                  />
                  <FormLabel display="flex" alignItems="center">
                    Código
                  </FormLabel>
                  <Input
                    value={codigo}
                    isDisabled={disabled}
                    _hover={{ cursor: "not-allowed" }}
                    color={disabled ? "grey.placeholder.60" : "black"}
                    bg={"mainBg"}
                  />
                </Box>
                <Box w={"100%"} display={"flex"} gap={"10px"}>
                  <Box
                    pt={"10px"}
                    w={"50%"}
                    display={"flex"}
                    flexDir={"column"}
                    justifyContent={"center"}
                    alignItems={"flex-start"}
                    gap={"10px"}
                  >
                    <FormLabel display="flex" alignItems="center">
                      Categoría
                    </FormLabel>
                    <Select
                      disabled={disabled}
                      required
                      // onChange={(val) => setCategoria(val.target.value)}
                      _hover={{ cursor: "not-allowed" }}
                      color={disabled ? "grey.placeholder.60" : "black"}
                      bg={"mainBg"}
                    >
                      <option>{categoria}</option>
                      {/* <option>Ropa</option>
                      <option>Joyas</option>
                      <option>Artesanias</option>
                      <option>Belleza</option>
                      <option>Otros</option> */}
                    </Select>
                    <FormLabel display="flex" alignItems="center">
                      Precio
                    </FormLabel>
                    <Input
                      onChange={(val) => setPrecio(val)}
                      value={precio}
                      isDisabled={disabled}
                      _hover={{ cursor: "not-allowed" }}
                      color={disabled ? "grey.placeholder.60" : "black"}
                      bg={"mainBg"}
                    />
                    <FormLabel display="flex" alignItems="center">
                      Existencia
                    </FormLabel>
                    <TextInput
                      onChange={(val) => setExistencia(val)}
                      value={existencia}
                    />
                    <FormLabel display="flex" alignItems="center">
                      Stock mínimo
                    </FormLabel>
                    <TextInput
                      onChange={(val) => setStockMin(val)}
                      value={stockMin}
                    />
                  </Box>
                  <Box
                    pt={"10px"}
                    w={"50%"}
                    display={"flex"}
                    flexDir={"column"}
                    justifyContent={"center"}
                    alignItems={"flex-start"}
                    gap={"10px"}
                  >
                    <FormLabel display="flex" alignItems="center">
                      Nombre del proveedor
                    </FormLabel>
                    <Input
                      onChange={(val) => setProveedor(val)}
                      value={proveedor}
                      isDisabled={disabled}
                      _hover={{ cursor: "not-allowed" }}
                      color={disabled ? "grey.placeholder.60" : "black"}
                      bg={"mainBg"}
                    />
                    <FormLabel display="flex" alignItems="center">
                      Costo
                    </FormLabel>
                    <Input
                      onChange={(val) => setCosto(val)}
                      value={costo}
                      isDisabled={disabled}
                      _hover={{ cursor: "not-allowed" }}
                      color={disabled ? "grey.placeholder.60" : "black"}
                      bg={"mainBg"}
                    />
                    <FormLabel display="flex" alignItems="center">
                      Existencia verificada
                    </FormLabel>
                    <Input
                      onChange={(val) => setExisVerificada(val)}
                      value={exisVerificada}
                      isDisabled={disabled}
                      _hover={{ cursor: "not-allowed" }}
                      color={disabled ? "grey.placeholder.60" : "black"}
                      bg={"mainBg"}
                    />
                    <FormLabel display="flex" alignItems="center">
                      Stock máximo
                    </FormLabel>
                    <TextInput
                      onChange={(val) => {
                        setStockMax(val);
                      }}
                      value={stockMax}
                    />
                  </Box>
                </Box>
              </FormControl>
            </Box>
          </ModalBody>

          <ModalFooter display={"flex"} gap={"10px"}>
            <StandardButton
              variant={"WHITE_RED"}
              borderRadius="20px"
              py={"17px"}
              w={"50%"}
              fontSize="14px"
              fontWeight="400"
              onClick={onClose}
            >
              Cancelar
            </StandardButton>
            <StandardButton
              variant={"RED_PRIMARY"}
              borderRadius="20px"
              py={"17px"}
              w={"50%"}
              fontSize="14px"
              fontWeight="400"
              onClick={onConfirmationModalOpen}
            >
              Guardar
            </StandardButton>
            <ConfirmationMessage
              icon={<WarningIcon />}
              text={`¿Estás seguro que desea corregir la existencia de este producto?`}
              isOpen={isConfirmationModalOpen}
              onOpen={onConfirmationModalOpen}
              onClose={onConfirmationModalClose}
              funcConfirmar={updateProducto}
              isLoading={loading}
              products={null}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
