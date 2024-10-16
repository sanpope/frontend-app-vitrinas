import React, { useEffect, useState } from "react";
import { Box, Text, useDisclosure, useToast } from "@chakra-ui/react";
import StandardButton from "../component/ui/buttons/standard";
import TextInput from "../component/ui/textInput";

import ConfirmationMessage from "../component/ConfirmationMessage";
import EditIcon from "../assets/images/EditIcon";
import TrashIcon from "../assets/images/TrashIcon";
import WarningIcon from "../assets/images/WarningIcon";
import SearchIcon from "../assets/images/SearchIcon";
import PlusCircleIcon from "../assets/images/PlusCircleIcon";
import SmallRightArrowIcon from "../assets/images/SmallRightArrow";
import SyncIcon from "../assets/images/SyncIcon";
import TablaAsesores from "../component/TablaAsesores";
import AgregarAsesorVitrinas from "../component/AgregarAsesorVitrinas";
import { HEADER_HEIGHT } from "../component/Header";
import xmlToJSON from "../services/XmlToJsonConverter";
import asesoresData from "../services/asesoresData";
import { MIN_TABLE_HEIGHT } from "../component/ui/tablas/Contenedor";
import axios from "axios";
import { parseData } from "../utils/xmlParse";
import { capitalizeFirstLetter } from "../utils/formatting";
import EditarAsesorVitrinas from "../component/EditarAsesorVitrinas";

const TOP_HEIGHT = 72;

export default function Asesores() {
  const toast = useToast();
  const [tablaAsesores, setTablaAsesores] = useState(null);
  const [displayedArticulos, setDisplayedArticulos] = useState(null);
  const [totalResults, setTotalResults] = useState(null);
  const [loading, toggleLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsToShow, setRowsToShow] = useState(20);
  const totalPages = Math.ceil(tablaAsesores?.length / rowsToShow);
  const [isAscendent, setIsAscendent] = useState(false);
  const [sortingBy, setSortingBy] = useState(null);
  const [busqueda, setBusqueda] = useState(null);
  const [ciudadesVitrinas, setCiudadesVitrinas] = useState([]);
  const [currentAsesor, setCurrentAsesor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getVitrinasInfo();
    getAsesoresInfo();
  }, []);

  useEffect(() => {
    getMasArticulos(1);
  }, [tablaAsesores]);

  const getUbicaciones = (vitrinas) => {
    return Object.entries(ciudadesVitrinas)
      .filter(([ciudad, vitrinasCity]) =>
        vitrinasCity.some((vitrina) => vitrinas.includes(vitrina)),
      )
      .map(([ciudad]) => ciudad);
  };

  const getVitrinasInfo = async () => {
    const url = `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina`;
    await axios
      .get(url, {
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
        },
      })
      .then((response) => {
        const xmlDoc = parseData(response.data);
        setCiudadesVitrinas(vitrinasData(xmlDoc));
      })
      .catch((error) => {
        console.error("Error fetching the XML data: ", error);
        return error;
      });
  };

  const vitrinasData = (xml) => {
    const vitrinasList = [];
    let DataVitrina = xml.querySelector("vitrinas");
    let totalVitrinas = DataVitrina.querySelectorAll("vitrina");
    const vitrinasObj = {};

    for (let i = 0; i < totalVitrinas.length; i++) {
      let city = totalVitrinas[i].getElementsByTagName("ciudad")[0].textContent;
      let vitrina =
        totalVitrinas[i].getElementsByTagName("nombre")[0].textContent;
      vitrinasList.push(vitrina);
      if (!(city in vitrinasObj)) {
        vitrinasObj[city] = [];
      }
      vitrinasObj[city].push(vitrina);
    }
    return vitrinasObj;
  };

  const getAsesoresInfo = async () => {
    const url = `${process.env.REACT_APP_SERVER_URL}/app/rest/asesores`;
    try {
      const response = await axios.get(url, {
        headers: {
          Accept: "application/xml",
        },
      });

      if (response.status === 200 && response.data) {
        const xmlDoc = parseData(response.data);
        const asesores = getAsesores(xmlDoc);

        // Añadimos las ubicaciones a cada asesor
        const asesoresConUbicaciones = asesores.map((asesor) => {
          const ubicaciones = Object.entries(ciudadesVitrinas)
            .filter(([ciudad, vitrinas]) =>
              vitrinas.some((vitrina) => asesor.vitrinas.includes(vitrina)),
            )
            .map(([ciudad]) => ciudad);

          return {
            ...asesor,
            ubicaciones,
          };
        });

        setTablaAsesores(asesoresConUbicaciones);
        setDisplayedArticulos(asesoresConUbicaciones);
      }
    } catch (error) {
      console.error("Error fetching XML data:", error);
    }
  };

  const getAsesores = (xml) => {
    const totalAsesoresArr = [];
    const asesoresNegocio = xml?.querySelector("asesores");
    const listadoAsesores = asesoresNegocio?.querySelectorAll("asesor") ?? [];

    if (listadoAsesores.length > 0) {
      for (let i = 0; i < listadoAsesores.length; i++) {
        const asesor = listadoAsesores[i];

        const nombre =
          asesor.getElementsByTagName("nombre")[0]?.textContent ?? "";
        const usuario =
          asesor.getElementsByTagName("usuario")[0]?.textContent ?? "";
        const clave =
          asesor.getElementsByTagName("clave")[0]?.textContent ?? "";
        const habilitado =
          asesor.getElementsByTagName("habilitado")[0]?.textContent ?? "";

        // Crear un array para las vitrinas del asesor
        const vitrinasNodes = asesor.querySelectorAll("vitrina");
        const vitrinas = Array.from(
          vitrinasNodes,
          (vitrina) => vitrina.textContent,
        );

        // Agregar el objeto del asesor al array principal
        totalAsesoresArr.push({
          nombre,
          usuario,
          clave,
          habilitado,
          vitrinas,
        });
      }
    }

    return totalAsesoresArr;
  };

  const {
    isOpen: isFirstModalOpen,
    onOpen: onFirstModalOpen,
    onClose: onFirstModalClose,
  } = useDisclosure();

  const {
    isOpen: isSecondModalOpen,
    onOpen: onSecondModalOpen,
    onClose: onSecondModalClose,
  } = useDisclosure();

  const {
    isOpen: isThirdModalOpen,
    onOpen: onThirdModalOpen,
    onClose: onThirdModalClose,
  } = useDisclosure();

  const onBuscarChange = (e) => {
    setBusqueda(e);
  };

  useEffect(() => {
    if (busqueda !== null) {
      Busqueda(busqueda);
    } else {
    }
  }, [busqueda]);

  const Busqueda = (textToSearch) => {
    let result = tablaAsesores?.filter((element) => {
      console.log(tablaAsesores);
      return (
        element.nombre
          .toString()
          .toLowerCase()
          .includes(textToSearch?.toLowerCase()) ||
        element.vitrinas.some((vitrina) =>
          vitrina.toLowerCase().includes(textToSearch.toLowerCase()),
        ) ||
        element.ubicaciones.some((ubicacion) =>
          ubicacion.toLowerCase().includes(textToSearch.toLowerCase()),
        )
      );
    });
    setDisplayedArticulos(result);
  };

  useEffect(() => {
    if (sortingBy) {
      let articulosCopy = [...displayedArticulos];
      switch (sortingBy) {
        case "asesor":
          articulosCopy?.sort((a, b) =>
            isAscendent
              ? a.nombre.localeCompare(b.nombre)
              : b.nombre.localeCompare(a.nombre),
          );
          break;
        case "vitrinas":
          articulosCopy?.sort((a, b) =>
            isAscendent
              ? a.vitrina.localeCompare(b.vitrina)
              : b.vitrina.localeCompare(a.vitrina),
          );
          break;
        case "ubicacion":
          articulosCopy?.sort((a, b) =>
            isAscendent
              ? a.ciudad.localeCompare(b.ciudad)
              : b.ciudad.localeCompare(a.ciudad),
          );
          break;
        default:
          break;
      }
      setDisplayedArticulos(articulosCopy);
    }
  }, [sortingBy, isAscendent]);

  const getMasArticulos = (pageNumber) => {
    toggleLoading(true);
    setCurrentPage(pageNumber);
    setDisplayedArticulos(
      tablaAsesores?.slice(
        (pageNumber - 1) * rowsToShow,
        (pageNumber - 1) * rowsToShow + rowsToShow,
      ),
    );
  };

  useEffect(() => {
    getMasArticulos(1);
  }, []);

  const handleSortingClick = (name) => {
    setIsAscendent((prevIsAscendent) =>
      sortingBy === name ? !prevIsAscendent : true,
    );
    setSortingBy(name);
  };

  const createAsesor = async (newAsesor) => {
    const nuevoAsesor = new URLSearchParams();
    nuevoAsesor.append("nombre", `${newAsesor.nombre}`);
    nuevoAsesor.append("usuarioApp", `${newAsesor.usuarioApp}`);
    nuevoAsesor.append("claveApp", `${newAsesor.claveApp}`);
    newAsesor?.vitrinas?.map((vitrina) => {
      return nuevoAsesor.append("vitrinas", `${vitrina}`);
    });
    nuevoAsesor.append("habilitado", `${newAsesor.habilitado}`);

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/asesores`,
        nuevoAsesor,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      if (response.status === 200) {
        const index = displayedArticulos?.findIndex(
          (item) => item.nombre === newAsesor.nombre,
        );

        if (index === -1) {
          setDisplayedArticulos((prev) => {
            const copy = prev ? [...prev] : [];
            return [
              ...copy,
              {
                nombre: newAsesor.nombre,
                usuario: newAsesor.usuarioApp,
                clave: newAsesor.claveApp,
                vitrinas: newAsesor.vitrinas,
                habilitado: newAsesor.habilitado,
              },
            ];
          });
          toast({
            status: "success",
            description: "Asesor creado con éxito!.",
            duration: 3000,
            position: "top-right",
            isClosable: true,
          });
        }
      }
    } catch (error) {
      toast({
        status: "error",
        description: "Error creando el asesor.",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setBusqueda(null);
      setIsLoading(false);
      onThirdModalClose();
    }
  };

  const editAsesor = async (
    currentAsesor,
    asesorActualizado,
    handleOnClose,
  ) => {
    const updatedAsesor = new URLSearchParams();
    updatedAsesor.append("nuevoNombre", `${asesorActualizado.nombre}`);
    updatedAsesor.append("nuevoUsuarioApp", `${asesorActualizado.usuarioApp}`);
    updatedAsesor.append("nuevaClaveApp", `${asesorActualizado.claveApp}`);
    asesorActualizado?.vitrinas?.map((vitrina) => {
      return updatedAsesor.append("nuevasVitrinas", `${vitrina}`);
    });
    updatedAsesor.append("habilitado", `${asesorActualizado.habilitado}`);
    setIsLoading(true);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/asesores?nombre=${currentAsesor?.nombre}`,
        updatedAsesor,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      if (response.status == 200 && response.data) {
        console.log(asesorActualizado);
        setDisplayedArticulos((prev) => {
          const copy = [...prev];
          const index = copy.findIndex(
            (item) =>
              item.nombre.toLowerCase() === currentAsesor.nombre.toLowerCase(),
          );
          console.log(index);
          if (index !== -1) {
            copy[index] = {
              nombre: asesorActualizado.nombre,
              usuario: asesorActualizado.usuarioApp,
              clave: asesorActualizado.claveApp,
              vitrinas: asesorActualizado.vitrinas,
              habilitado: asesorActualizado.habilitado,
            };
          }
          return copy;
        });
        setTablaAsesores((prev) => {
          const copy = [...(prev || [])];
          const index = copy?.findIndex(
            (item) =>
              item.nombre.toLowerCase() === currentAsesor.nombre.toLowerCase(),
          );
          if (index !== -1) {
            copy[index] = {
              nombre: asesorActualizado.nombre,
              usuario: asesorActualizado.usuarioApp,
              clave: asesorActualizado.claveApp,
              vitrinas: asesorActualizado.vitrinas,
              habilitado: asesorActualizado.habilitado,
            };
          }

          return copy;
        });

        toast({
          status: "success",
          description: "Asesor actualizado con éxito!",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        status: "error",
        description: "Error editando el asesor.",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setBusqueda(null);
      handleOnClose();
      setIsLoading(false);
    }
  };

  const deleteAsesor = async (nombreAsesor) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/asesores?nombre=${nombreAsesor}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      console.log(response);

      if (response.status == 200) {
        setDisplayedArticulos((prev) => {
          const copy = [...(prev || [])];
          return copy.filter((asesor) => asesor.nombre !== nombreAsesor);
        });
        setTablaAsesores((prev) => {
          const copy = [...(prev || [])];
          return copy.filter((asesor) => asesor.nombre !== nombreAsesor);
        });
        toast({
          status: "success",
          description: "Asesor eliminado con éxito!.",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        status: "error",
        description: "Error eliminando el asesor.",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setBusqueda(null);
      setIsLoading(false);
    }
  };

  return (
    <Box
      bg={"mainBg"}
      w={"100%"}
      h={"calc(100% - " + HEADER_HEIGHT + "px)"}
      display={"flex"}
      flexDir={"column"}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        flexDirection={{ base: "column", sm: "row" }}
        alignItems={"center"}
        bgColor={"white"}
        p={"1rem"}
      >
        <TextInput
          w="100%"
          maxWidth="300px"
          placeholder={"Buscar"}
          leftIcon={<SearchIcon width={"15px"} height={"15px"} />}
          onChange={(e) => onBuscarChange(e)}
          value={busqueda}
        />
        <StandardButton
          variant={"RED_PRIMARY"}
          borderRadius="20px"
          py={"17px"}
          w={"fit-content"}
          fontSize={"14px"}
          fontWeight={"400"}
          onClick={onFirstModalOpen}
          leftIcon={<PlusCircleIcon />}
        >
          Agregar asesor
        </StandardButton>
      </Box>
      <Box
        p={"1.25rem"}
        minH={MIN_TABLE_HEIGHT + "px"}
        w={"100%"}
        h={"calc(100% - " + TOP_HEIGHT + "px)"}
      >
        {
          <TablaAsesores
            onSecondModalOpen={onSecondModalOpen}
            onThirdModalOpen={onThirdModalOpen}
            displayedArticulos={displayedArticulos}
            setDisplayedArticulos={setDisplayedArticulos}
            totalResults={totalResults}
            currentPage={currentPage}
            totalPages={totalPages}
            getMasArticulos={getMasArticulos}
            handleSortingClick={handleSortingClick}
            setCurrentAsesor={setCurrentAsesor}
            ciudadesVitrina={ciudadesVitrinas}
          />
        }
      </Box>

      <AgregarAsesorVitrinas
        isOpen={isFirstModalOpen}
        onOpen={onFirstModalOpen}
        onClose={onFirstModalClose}
        ciudadesVitrinas={ciudadesVitrinas}
        addAsesor={createAsesor}
        setAsesor={setCurrentAsesor}
      />

      {isSecondModalOpen && (
        <EditarAsesorVitrinas
          desc={"Editar"}
          isOpen={isSecondModalOpen}
          onOpen={onSecondModalOpen}
          onClose={onSecondModalClose}
          ciudadesVitrinas={ciudadesVitrinas}
          asesor={currentAsesor}
          Editar={editAsesor}
        />
      )}

      {/* Eliminar un Asesor  */}
      {isThirdModalOpen && (
        <ConfirmationMessage
          isOpen={isThirdModalOpen}
          onOpen={onThirdModalOpen}
          onClose={onThirdModalClose}
          icon={<WarningIcon />}
          text={"¿Estás seguro que desea eliminar a este Asesor?"}
          text2={
            "Esta acción eliminará permanentemente los registros de este asesor de tu sistema"
          }
          colorText2={"red.100"}
          buttonText={"Continuar"}
          products={null}
          funcConfirmar={deleteAsesor}
          focusRow={currentAsesor.nombre}
        />
      )}
    </Box>
  );
}
