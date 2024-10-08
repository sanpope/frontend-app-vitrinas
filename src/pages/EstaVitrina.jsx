import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Text, useDisclosure, useToast } from "@chakra-ui/react";
import StandardButton from "../component/ui/buttons/standard";
import Editar from "../component/Editar";
import ConfirmationMessage from "../component/ConfirmationMessage";
import EditIcon from "../assets/images/EditIcon";
import TrashIcon from "../assets/images/TrashIcon";
import WarningIcon from "../assets/images/WarningIcon";
import PlusCircleIcon from "../assets/images/PlusCircleIcon";
import AgregarAsesor from "../component/AgregarAsesor";
import AsesorContainer from "../component/AsesorContainer";
import MensajeInfoEstaVitrina from "../component/MensajeInfoEstaVitrina";
import xmlToJSON from "../services/XmlToJsonConverter";
import estaVitrina from "../services/estaVitrina";
import { parseData } from "../utils/xmlParse";
import axios from "axios";
import MensajeInfo from "../component/MensajeInfo";
import { setCity, setName, setCiudadesVitrinas } from "../store/slices/vitrina";
import { useNavigate } from "react-router-dom";
import EditarAsesor from "../component/EditarAsesor";

export default function EstaVitrina() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const name = useSelector((state) => state.vitrinaReducer.name);
  const city = useSelector((state) => state.vitrinaReducer.city);
  const ciudadesVitrinas = useSelector(
    (state) => state.vitrinaReducer.ciudadesVitrinas,
  );

  const [updatedName, setUpdatedName] = useState(name);
  const [updatedCity, setUpdatedCity] = useState(city);

  const [infoTotalVitrina, setInfoTotalVitrina] = useState();
  const [asesor, setAsesor] = useState();
  const [currentAsesor, setCurrentAsesor] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getInfoVitrina();
  }, []);

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

  const getInfoVitrina = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina/info?vitrina=${name}`,
        {
          headers: {
            "Content-Type": "application/xml",
          },
        },
      );
      if (response.status == 200) {
        const xmlDoc = parseData(response.data);
        const infoVitrina = getInfoEstaVitrina(xmlDoc);
        setInfoTotalVitrina(infoVitrina);
        setUpdatedCity(infoVitrina.ciudadDeVitrina);
      }
    } catch (error) {
      toast({
        status: "error",
        description: "Error obteniendo la información de la vitrina.",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      onSecondModalClose();
    }
  };

  const getInfoEstaVitrina = (xml) => {
    const estaVitrina = xml.querySelector("estaVitrina");
    const asesores = xml.querySelector("asesores");
    const totalAsesores = asesores.querySelectorAll("asesor");
    let asesoresArr = [];
    for (let i = 0; i < totalAsesores?.length; i++) {
      asesoresArr.push({
        nombre:
          totalAsesores[i]?.getElementsByTagName("nombre")[0]?.textContent,
        usuario:
          totalAsesores[i]?.getElementsByTagName("usuario")[0]?.textContent,
        contraseña:
          totalAsesores[i]?.getElementsByTagName("contraseña")[0]?.textContent,
      });
    }
    const infoVitrina = {
      ciudadDeVitrina:
        estaVitrina.getElementsByTagName("ciudadDeVitrina")[0]?.textContent,
      fechaDeCreacion:
        estaVitrina.getElementsByTagName("fechaDeCreacion")[0]?.textContent,
      mensaje: estaVitrina.getElementsByTagName("mensaje")[0]?.textContent,
      nombreDeVitrina:
        estaVitrina.getElementsByTagName("nombreDeVitrina")[0]?.textContent,
      asesores: asesoresArr,
    };

    return infoVitrina;
  };

  const updateVitrina = async (nombre, ciudad) => {
    console.log(ciudadesVitrinas);

    const vitrinaUpdated = new URLSearchParams();
    vitrinaUpdated.append("nuevoNombre", `${nombre}`);
    vitrinaUpdated.append("nuevaCiudad", `${ciudad}`);

    try {
      setIsLoading(true);
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina?nombre=${name}`,
        vitrinaUpdated,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      if (response.status == 200 && response.data) {
        setUpdatedName(nombre);
        setUpdatedCity(ciudad);
        const copy = { ...ciudadesVitrinas };
        const updatedCityArray = [...copy[city]];
        const index = updatedCityArray.findIndex((item) => item === name);
        console.log(index);
        if (index !== -1) {
          if (city === ciudad) {
            const updatedCopy = { ...copy };
            const updatedCityArray = [...updatedCopy[city]];
            updatedCityArray.splice(index, 1, nombre);
            updatedCopy[city] = updatedCityArray;
            dispatch(setCiudadesVitrinas(updatedCopy));
            dispatch(setName(nombre));
          } else {
            const updatedCopy = { ...copy };
            updatedCopy[city] = updatedCopy[city].filter(
              (item) => item !== name,
            );
            updatedCopy[ciudad] = [...updatedCopy[ciudad], nombre];

            dispatch(setCiudadesVitrinas(updatedCopy));
            dispatch(setName(nombre));
            dispatch(setCity(ciudad));
          }
          toast({
            status: "succes",
            description: "Vitrina actualizada con éxito!.",
            duration: 3000,
            position: "top-right",
            isClosable: true,
          });
        } else {
        }
      }
    } catch (error) {
      toast({
        status: "error",
        description: "Error actualizando la vitrina.",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      onFirstModalClose();
      setIsLoading(false);
    }
  };

  const deleteVitrina = async (nombre) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/vitrina?nombre=${nombre}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      if (response.status == 200) {
        //Eliminar vitrina de la lista de vitrinas
        const copy = { ...ciudadesVitrinas };
        const updatedCityArray = [...copy[city]];
        const index = updatedCityArray.findIndex((item) => item === name);
        console.log(index);
        if (index !== -1) {
          copy[city] = copy[city].filter((item) => item !== name);
          const updatedCopy = { ...copy };
          updatedCopy[city] = updatedCopy[city].filter((item) => item !== name);
          dispatch(setCiudadesVitrinas(updatedCopy));
        }
        toast({
          status: "success",
          description: "Vitrina Eliminada con éxito!.",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        status: "error",
        description: "Error eliminando la vitrina.",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      onSecondModalClose();
      navigate("/");
      setIsLoading(false);
    }
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
    console.log(newAsesor);
    console.log(nuevoAsesor);

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/asesores`,
        nuevoAsesor,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      console.log(response.data);
      if (response.status == 200) {
        const index = infoTotalVitrina?.asesores?.findIndex(
          (item) => item.nombre === newAsesor.nombre,
        );
        if (index === -1) {
          setInfoTotalVitrina((prev) => {
            const copy = { ...prev };
            copy["asesores"] = [
              ...copy["asesores"],
              {
                nombre: newAsesor.nombre,
                usuario: newAsesor.usuarioApp,
                contraseña: newAsesor.claveApp,
              },
            ];
            return copy;
          });
        }
      }
      toast({
        status: "success",
        description: "Asesor creado con éxito!.",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } catch (error) {
      toast({
        status: "error",
        description: "Error creando el asesor.",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      onThirdModalClose();
    }
  };

  const editAsesor = async (asesorActualizado, handleOnClose) => {
    console.log(asesorActualizado);
    console.log(infoTotalVitrina);
    const updatedAsesor = new URLSearchParams();
    updatedAsesor.append("nuevoNombre", `${asesorActualizado.nombre}`);
    updatedAsesor.append("nuevoUsuarioApp", `${asesorActualizado.usuarioApp}`);
    updatedAsesor.append("nuevaClaveApp", `${asesorActualizado.claveApp}`);
    asesorActualizado?.vitrinas?.map((vitrina) => {
      return updatedAsesor.append("nuevasVitrinas", `${vitrina}`);
    });
    updatedAsesor.append("habilitado", `${asesorActualizado.habilitado}`);
    try {
      setIsLoading(true);
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
        const index = infoTotalVitrina?.asesores?.findIndex(
          (item) => item.nombre === currentAsesor.nombre,
        );
        console.log(index);
        console.log(infoTotalVitrina.asesores[index]);
        if (index !== -1) {
          setInfoTotalVitrina((prev) => ({
            ...prev,
            asesores: prev.asesores.map((asesor, i) =>
              i === index
                ? {
                    nombre: asesorActualizado.nombre,
                    usuario: asesorActualizado.usuarioApp,
                    contraseña: asesorActualizado.claveApp,
                  }
                : asesor,
            ),
          }));
        }
        toast({
          status: "success",
          description: "Asesor editado con éxito!.",
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
      handleOnClose();
      setIsLoading(false);
    }
  };

  const deleteAsesor = async (nombreAsesor) => {
    console.log(nombreAsesor);
    try {
      setIsLoading(true);
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
        setInfoTotalVitrina((prev) => {
          const copy = { ...prev };
          return {
            asesores: copy.asesores.filter(
              (asesor) => asesor.nombre !== nombreAsesor,
            ),
          };
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
      setIsLoading(false);
    }
  };

  return (
    <Box
      bg={"mainBg"}
      w={"100%"}
      height={"100%"}
      display={"flex"}
      flexDir={"column"}
      gap={"20px"}
      p={"20px"}
      overflowY={"scroll"}
    >
      <Box display={"flex"} flexDir={"column"} gap={"10px"}>
        <Box
          display={"flex"}
          flexDirection={{ base: "column", md: "row" }}
          justifyContent={{ base: "flex-start", md: "space-between" }}
          alignItems={{ base: "flex-start", md: "center" }}
        >
          <Box display={"flex"} flexDirection={"column"} p={1}>
            <Text textStyle={"RobotoBodyBold"}>{name}</Text>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-around"}
              gap={"10px"}
            >
              <Text textStyle={"RobotoBodyBold"}>Ciudad:</Text>
              <Text textStyle={"RobotoBody"}>{city}</Text>
              <Text textStyle={"RobotoBodyBold"}>Fecha de creación:</Text>
              <Text textStyle={"RobotoBody"}>
                {infoTotalVitrina?.fechaDeCreacion}
              </Text>
            </Box>
          </Box>
          <Box
            display={"flex"}
            flexDirection={{ base: "column", sm: "row" }}
            justifyContent={{ base: "flex-start", md: "center" }}
            alignItems={"center"}
            gap={"10px"}
          >
            <StandardButton
              variant={"WHITE_RED"}
              borderRadius="20px"
              py={"17px"}
              w={"10.25rem"}
              fontSize={"14px"}
              fontWeight={"400"}
              onClick={onFirstModalOpen}
            >
              Editar Vitrina
            </StandardButton>

            <Editar
              isOpen={isFirstModalOpen}
              onOpen={onFirstModalOpen}
              onClose={onFirstModalClose}
              onClick={onFirstModalClose}
              desc={"Vitrina"}
              desc2={"Vitrina"}
              name={updatedName}
              setName={setUpdatedName}
              city={updatedCity}
              setCity={setUpdatedCity}
              Editar={updateVitrina}
              isLoading={isLoading}
            />
            <StandardButton
              variant={"WHITE_RED"}
              borderRadius="20px"
              py={"17px"}
              w={"10.25rem"}
              fontSize={"14px"}
              fontWeight={"400"}
              onClick={onSecondModalOpen}
            >
              Eliminar Vitrina
            </StandardButton>
            <ConfirmationMessage
              isOpen={isSecondModalOpen}
              onOpen={onSecondModalOpen}
              onClose={onSecondModalClose}
              icon={<WarningIcon />}
              text={"¿Estás seguro que desea eliminar a esta vitrina?"}
              text2={
                "Esta acción eliminará permanentemente los registros de esta vitrina de tu sistema"
              }
              colorText2={"red.100"}
              buttonText={"Continuar"}
              funcConfirmar={() => {
                console.log("Eliminar");
                deleteVitrina(name);
              }}
              products={null}
              isLoading={isLoading}
            />
          </Box>
        </Box>
      </Box>
      <Box display={"flex"} flexDir={"column"} gap={"20px"}>
        <Text textStyle={"RobotoBodyBold"}>Asesores:</Text>

        <Box display={"flex"} flexWrap={"wrap"} gap={"20px"}>
          {infoTotalVitrina != null && infoTotalVitrina?.asesores.length > 0 ? (
            infoTotalVitrina?.asesores?.map((asesor, index) => (
              <AsesorContainer
                key={index}
                vitrinaName={name}
                asesor={asesor}
                currentAsesor={currentAsesor}
                setCurrentAsesor={setCurrentAsesor}
                Editar={editAsesor}
                Eliminar={deleteAsesor}
                isLoading={isLoading}
              />
            ))
          ) : (
            <Text>No se encontraron Asesores asignados a esta vitrina.</Text>
          )}
        </Box>

        <StandardButton
          variant={"RED_PRIMARY"}
          borderRadius="20px"
          py={"17px"}
          w={"fit-content"}
          fontSize={"14px"}
          fontWeight={"400"}
          onClick={onThirdModalOpen}
          leftIcon={<PlusCircleIcon />}
        >
          Agregar Asesor
        </StandardButton>
        <AgregarAsesor
          vitrinaName={name}
          isOpen={isThirdModalOpen}
          onOpen={onThirdModalOpen}
          onClose={onThirdModalClose}
          asesor={asesor}
          setAsesor={setAsesor}
          addAsesor={createAsesor}
          isLoading={isLoading}
        />
      </Box>

      {infoTotalVitrina?.mensaje?.length > 0 ? (
        <MensajeInfo mensaje={infoTotalVitrina?.mensaje} />
      ) : (
        <></>
      )}
    </Box>
  );
}
