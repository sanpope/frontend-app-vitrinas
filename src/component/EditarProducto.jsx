import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Modal,
  FormControl,
  FormLabel,
  Select,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";

import TextInput from "./ui/textInput";
import StandardButton from "./ui/buttons/standard";
import NumberInputFloat from "./NumberInputFloat";
import { capitalizeFirstLetter } from "../utils/formatting";

const desformatearNumero = (valor) => {
  if (valor === undefined || valor === null || valor === '') {
    return 0;
  }
  
  if (typeof valor === 'number') {
    return valor;
  }
  
  if (typeof valor === 'string') {

    let valorLimpio = valor.replace(/\$/g, '').trim();
    
    if (valorLimpio.endsWith('.0')) {
      valorLimpio = valorLimpio.substring(0, valorLimpio.length - 2);
    }
    
    const valorSinSeparadores = valorLimpio.replace(/\./g, '');
    const resultado = Number(valorSinSeparadores);
    
    return resultado;
  }
  
  return Number(valor);
};

export default function EditarProducto({
  desc,
  isOpen,
  onOpen,
  onClose,
  listaCategorias,
  listaProveedores,
  isLoading,
  producto,
  editProducto,
}) {
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [costo, setCosto] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [categoria, setCategoria] = useState("");
  const [proveedor, setProveedor] = useState("");

  useEffect(() => {
    if (producto) {
      
      setNombre(producto.nombre || '');
      setCodigo(producto.codigo || '');
      
      const costoDesformateado = desformatearNumero(producto.costo);
      setCosto(costoDesformateado);
      
      const precioDesformateado = desformatearNumero(producto.precio);
      setPrecio(precioDesformateado);
      
      setCantidad(producto.cantidadEnBodega || 0);
      setCategoria(producto.categoria || '');
      setProveedor(producto.proveedor || '');
    }
    
    if (listaCategorias && listaCategorias.length > 0 && !categoria) {
      setCategoria(capitalizeFirstLetter(listaCategorias[0]));
    }

    if (listaProveedores && listaProveedores.length > 0 && !proveedor) {
      setProveedor(listaProveedores[0]);
    }
  
  }, [producto, listaCategorias, listaProveedores]);

  useEffect(() => {
    if (categoria === "" && listaCategorias && listaCategorias.length > 0) {
      setCategoria(capitalizeFirstLetter(listaCategorias[0]));
    }
    
    if (proveedor === "" && listaProveedores && listaProveedores.length > 0) {
      setProveedor(listaProveedores[0]);
    }
  }, [categoria, proveedor, listaCategorias, listaProveedores]);

  const saveName = (val) => {
    setNombre(val);
  };
  
  const saveCodigo = (val) => {
    setCodigo(val);
  };
  
  const saveCosto = (val) => {
    setCosto(val);
  };
  
  const savePrecio = (val) => {
    setPrecio(val);
  };
  
  const saveCantidad = (val) => {
    setCantidad(val);
  };
  
  const saveCategoria = (val) => {
    setCategoria(val.target.value);
  };
  
  const saveProveedor = (val) => {
    setProveedor(val.target.value);
  };

  const checkFileds = () => {
    const nombreValido = nombre?.length > 0;
    const codigoValido = codigo !== "" && codigo !== 0;
    const costoValido = costo !== 0;
    const precioValido = precio !== 0;
    const cantidadValida = cantidad >= 0;
    const categoriaValida = categoria !== "" && categoria !== "No existen Categorías";
    const proveedorValido = proveedor !== "";
    
    return nombreValido && codigoValido && costoValido && precioValido && 
           cantidadValida && categoriaValida && proveedorValido;
  };

  const handleSubmit = () => {
    
    const productoActualizado = {
      nombre,
      codigo,
      costo: Number(costo), 
      precio: Number(precio),
      cantidad: Number(cantidad),
      categoria,
      proveedor,
    };
    
    editProducto(productoActualizado, handleOnClose);
  };

  const handleOnClose = () => {
    if (producto) {
      setNombre(producto.nombre || '');
      setCodigo(producto.codigo || '');
      setCosto(desformatearNumero(producto.costo));
      setPrecio(desformatearNumero(producto.precio));
      setCantidad(producto.cantidadEnBodega || 0);
      
      if (producto.categoria) {
        setCategoria(producto.categoria);
      } else if (listaCategorias && listaCategorias.length > 0) {
        setCategoria(capitalizeFirstLetter(listaCategorias[0]));
      } else {
        setCategoria('');
      }
      
      if (producto.proveedor) {
        setProveedor(producto.proveedor);
      } else if (listaProveedores && listaProveedores.length > 0) {
        setProveedor(listaProveedores[0]);
      } else {
        setProveedor('');
      }
    } else {
      setNombre('');
      setCodigo('');
      setCosto(0);
      setPrecio(0);
      setCantidad(0);
      
      if (listaCategorias && listaCategorias.length > 0) {
        setCategoria(capitalizeFirstLetter(listaCategorias[0]));
      } else {
        setCategoria('');
      }
      
      if (listaProveedores && listaProveedores.length > 0) {
        setProveedor(listaProveedores[0]);
      } else {
        setProveedor('');
      }
    }

    onClose();
  };
  
  const proveedoresFiltered = listaProveedores.filter((prov) => {
    return prov?.toLowerCase() !== producto?.proveedor?.toLowerCase();
  });

  const categoriasFiltered = listaCategorias.filter((cat) => {
    return cat?.toLowerCase() !== producto?.categoria?.toLowerCase();
  });

  const listProvToShow =
    producto?.proveedor !== "" ? proveedoresFiltered : listaProveedores;

  const listCatToShow =
    producto?.categoria !== "" ? categoriasFiltered : listaCategorias;

  return (
    <Modal isOpen={isOpen} onClose={handleOnClose}>
      <ModalOverlay />
      <ModalContent borderRadius={"20px"} marginTop={"15px"}>
        <ModalHeader
          bg={"black"}
          display={"flex"}
          flexDir={"column"}
          borderTopRadius="20px"
        >
          <Text textStyle={"RobotoSubtitle"} color={"white"}>
            Editar Producto
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
            <Box width={"100%"}>
              <FormLabel display="flex" alignItems="center">
                <span
                  style={{
                    color: "red",
                    marginRight: "0.25rem",
                    marginTop: "0.25rem",
                  }}
                >
                  *
                </span>
                Nombre
              </FormLabel>
              <TextInput
                type="text"
                placeholder="Camisetas"
                required
                onChange={(e) => saveName(e)}
                value={nombre}
              />

              <FormLabel display="flex" alignItems="center" mt={3}>
                <span
                  style={{
                    color: "red",
                    marginRight: "0.25rem",
                    marginTop: "0.25rem",
                  }}
                >
                  *
                </span>
                Código
              </FormLabel>
              <NumberInput
                min={1}
                size="md"
                maxW={"100%"}
                required
                borderRadius={"5px"}
                onChange={(val) => saveCodigo(val)}
                value={codigo}
              >
                <NumberInputField
                  fontSize={"16px"}
                  textAlign={"left"}
                  w={"100%"}
                />
              </NumberInput>
              <FormLabel display="flex" alignItems="left" mt={3}>
                <span
                  style={{
                    color: "red",
                    marginRight: "0.25rem",
                    marginTop: "0.25rem",
                  }}
                >
                  *
                </span>
                Costo
              </FormLabel>
              <NumberInputFloat
                value={costo}
                onChange={(costo) => saveCosto(costo)}
              />

              <FormLabel display="flex" alignItems="center" mt={3}>
                <span
                  style={{
                    color: "red",
                    marginRight: "0.25rem",
                    marginTop: "0.25rem",
                  }}
                >
                  *
                </span>
                Precio
              </FormLabel>

              <NumberInputFloat
                value={precio}
                onChange={(precio) => savePrecio(precio)}
              />

              <FormLabel display="flex" alignItems="center" mt={3}>
                <span
                  style={{
                    color: "red",
                    marginRight: "0.25rem",
                    marginTop: "0.25rem",
                  }}
                >
                  *
                </span>
                Cantidad
              </FormLabel>

              <NumberInput
                min={0}
                size="md"
                maxW={"100%"}
                required
                borderRadius={"5px"}
                onChange={(val) => saveCantidad(val)}
                value={cantidad}
              >
                <NumberInputField
                  fontSize={"16px"}
                  textAlign={"left"}
                  w={"100%"}
                />
              </NumberInput>

              <FormLabel display="flex" alignItems="center" mt={3}>
                <span
                  style={{
                    color: "red",
                    marginRight: "0.25rem",
                    marginTop: "0.25rem",
                  }}
                >
                  *
                </span>
                Categoría
              </FormLabel>
              <Select
                required
                onChange={(e) => saveCategoria(e)}
                value={categoria}
                placeholder={
                  producto?.categoria !== ""
                    ? capitalizeFirstLetter(producto?.categoria)
                    : "Selecciona la Categoría"
                }
                defaultValue={listaCategorias && listaCategorias.length > 0 ? capitalizeFirstLetter(listaCategorias[0]) : ""}
              >
                {listCatToShow !== null && listCatToShow?.length > 0 ? (
                  listCatToShow?.map((cat, index) => (
                    <option key={index} value={cat}>
                      {capitalizeFirstLetter(cat)}
                    </option>
                  ))
                ) : (
                  <option value="No existen Categorías">
                    No existen Categorías
                  </option>
                )}
              </Select>
              <FormLabel display="flex" alignItems="center" mt={3}>
                <span
                  style={{
                    color: "red",
                    marginRight: "0.25rem",
                    marginTop: "0.25rem",
                  }}
                >
                  *
                </span>
                Proveedor
              </FormLabel>
              <Select
                required
                onChange={(e) => saveProveedor(e)}
                value={proveedor}
                placeholder={
                  producto?.proveedor !== ""
                    ? capitalizeFirstLetter(producto?.proveedor)
                    : "Selecciona Proveedor"
                }
                defaultValue={listaProveedores && listaProveedores.length > 0 ? listaProveedores[0] : ""}
              >
                {listProvToShow && listProvToShow.length > 0
                  ? listProvToShow.map((prov, index) => (
                      <option key={index} value={prov}>
                        {capitalizeFirstLetter(prov)}
                      </option>
                    ))
                  : <option value="No existen Proveedores">
                      No existen Proveedores
                    </option>
                }
              </Select>
            </Box>
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
            onClick={handleOnClose}
          >
            Cancelar
          </StandardButton>
          <StandardButton
            variant={checkFileds() ? "RED_PRIMARY" : "DISABLED"}
            borderRadius="20px"
            py={"17px"}
            w={"50%"}
            fontSize="14px"
            fontWeight="400"
            type={"submit"}
            onClick={checkFileds() ? handleSubmit : null}
            disabled={checkFileds() ? false : true}
            cursor={checkFileds() ? "pointer" : "not-allowed"}
            isLoading={isLoading}
          >
            Confirmar
          </StandardButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}