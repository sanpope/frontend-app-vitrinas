import React, { useState, useEffect } from "react";
import { Box, FormControl, FormLabel, Text, useToast } from "@chakra-ui/react";
import StandardButton from "../component/ui/buttons/standard";
import TextInput from "../component/ui/textInput";
import EditIcon from "../assets/images/EditIcon";
import UserCircleIcon from "../assets/images/UserCircleIcon";
import LockIcon from "../assets/images/LockIcon";
import EyeSlashIcon from "../assets/images/EyeSlashIcon";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, userInfo, fetchUserData, updateUserProfile, updatePassword } =
    useAuth();

  const [formData, setFormData] = useState({
    nombre: "",
    username: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [view, setView] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [localUserInfo, setLocalUserInfo] = useState(null);

  const toast = useToast();

  useEffect(() => {
    if (userInfo) {
      setLocalUserInfo(userInfo);
      setFormData({
        nombre: userInfo.nombre || "",
        username: userInfo.usuario || "",
      });
    } else {
      const loadUserData = async () => {
        const data = await fetchUserData();
        if (data) {
          setLocalUserInfo(data);
          setFormData({
            nombre: data.nombre || "",
            username: data.usuario || "",
          });
        }
      };

      loadUserData();
    }
  }, [userInfo, fetchUserData]);

  useEffect(() => {
    const isValid =
      passwordData.oldPassword.trim() !== "" &&
      passwordData.newPassword.trim() !== "";

    setIsPasswordValid(isValid);
  }, [passwordData.oldPassword, passwordData.newPassword]);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData({
      ...passwordData,
      [field]: value,
    });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const mainContent = document.querySelector("main") || document.body;
      if (mainContent) {
        mainContent.classList.add("profile-updating");
      }

      const success = await updateUserProfile(
        formData.nombre,
        formData.username,
        false,
      );

      if (success) {
        setLocalUserInfo((prev) => ({
          ...prev,
          nombre: formData.nombre,
          usuario: formData.username,
        }));

        setTimeout(() => {
          toast({
            title: "Perfil actualizado",
            description: "Tu información ha sido actualizada exitosamente.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }, 100);

        setTimeout(() => {
          setView("profile");
        }, 150);
      } else {
        throw new Error("No se pudo actualizar el perfil");
      }
    } catch (error) {
      console.error("Error actualizando perfil:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar tu información. Intenta de nuevo.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      const mainContent = document.querySelector("main") || document.body;
      if (mainContent) {
        mainContent.classList.remove("profile-updating");
      }

      setIsSaving(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    setIsChangingPassword(true);

    try {
      const mainContent = document.querySelector("main") || document.body;
      if (mainContent) {
        mainContent.classList.add("password-updating");
      }

      const success = await updatePassword(
        passwordData.oldPassword,
        passwordData.newPassword,
        false,
      );

      if (success) {
        setTimeout(() => {
          toast({
            title: "Contraseña actualizada",
            description: "Tu contraseña ha sido actualizada exitosamente.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }, 100);

        if (localUserInfo && passwordData.newPassword) {
          setLocalUserInfo({
            ...localUserInfo,
            longitudClave: passwordData.newPassword.length,
          });
        }

        setPasswordData({
          oldPassword: "",
          newPassword: "",
        });

        setTimeout(() => {
          setView("profile");
        }, 150);
      }
    } catch (error) {
      console.error("Error actualizando contraseña:", error);

      let errorMessage =
        "No se pudo actualizar tu contraseña. Intenta de nuevo.";
      if (error.response && error.response.data) {
        errorMessage = error.response.data.message || errorMessage;
      }

      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      const mainContent = document.querySelector("main") || document.body;
      if (mainContent) {
        mainContent.classList.remove("password-updating");
      }

      setIsChangingPassword(false);
    }
  };

  const cancelEditing = () => {
    if (localUserInfo) {
      setFormData({
        nombre: localUserInfo.nombre || "",
        username: localUserInfo.usuario || "",
      });
    }
    setView("profile");
  };

  const cancelPasswordChange = () => {
    setPasswordData({
      oldPassword: "",
      newPassword: "",
    });
    setView("profile");
  };

  if (view === "profile") {
    return (
      <Box
        bg={"mainBg"}
        w={"100%"}
        height={"100%"}
        display={"flex"}
        p={6}
        justifyContent={"center"}
        alignItems={"flex-start"}
      >
        <Box
          w={"100%"}
          maxW={"480px"}
          display={"flex"}
          flexDir={"column"}
          gap={"25px"}
          bg={"white"}
          borderRadius={"20px"}
          p={"2rem"}
        >
          <Box
            borderBottom={"1px"}
            borderBottomColor={"mainBg"}
            display={"flex"}
            alignItems={"flex-start"}
          >
            <Text textStyle={"RobotoTitleBold"} color={"black"} pb={2}>
              {localUserInfo?.nombre || user}
            </Text>
          </Box>
          <Box display={"flex"} flexDir={"column"}>
            <Box display={"flex"} alignItems={"center"} py={4}>
              <UserCircleIcon width={"18px"} height={"18px"} />
              <Text textStyle={"RobotoSubtitle"} ml={2}>
                {(localUserInfo && localUserInfo.usuario) || ""}
              </Text>
            </Box>

            <Box display={"flex"} alignItems={"center"} py={4}>
              <LockIcon width={"17px"} height={"17px"} />
              <Text textStyle={"RobotoSubtitle"} ml={2} textAlign={"center"}>
                {localUserInfo && localUserInfo.longitudClave
                  ? "*".repeat(localUserInfo.longitudClave)
                  : ""}
              </Text>
            </Box>
          </Box>
          <Box
            display={"flex"}
            gap={"15px"}
            alignItems={"center"}
            justifyContent={"center"}
            pt={4}
          >
            <StandardButton
              variant={"WHITE_RED"}
              borderRadius="20px"
              py={"17px"}
              w={"185px"}
              fontSize="15px"
              fontWeight="400"
              leftIcon={<LockIcon width={"10px"} height={"10px"} />}
              onClick={() => setView("changePassword")}
              size="md"
            >
              Cambiar Contraseña
            </StandardButton>
            <StandardButton
              variant={"RED_PRIMARY"}
              borderRadius="20px"
              py={"17px"}
              w={"185px"}
              fontSize="15px"
              fontWeight="400"
              leftIcon={<EditIcon fill="white" />}
              onClick={() => setView("editProfile")}
              size="md"
            >
              Editar Información
            </StandardButton>
          </Box>
        </Box>
      </Box>
    );
  }

  if (view === "editProfile") {
    return (
      <Box
        bg={"mainBg"}
        w={"100%"}
        height={"100%"}
        display={"flex"}
        p={6}
        justifyContent={"center"}
        alignItems={"flex-start"}
      >
        <Box
          w={"100%"}
          maxW={"480px"}
          display={"flex"}
          flexDir={"column"}
          bg={"white"}
          borderRadius={"20px"}
        >
          <Box
            bg={"black"}
            display={"flex"}
            flexDir={"column"}
            borderTopRadius="20px"
            p={4}
          >
            <Text textStyle={"RobotoBodyBold"} color={"white"}>
              Editar Información
            </Text>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            px={6}
            py={2}
          >
            <FormControl
              w={"100%"}
              display={"flex"}
              flexDir={"column"}
              justifyContent={"space-between"}
              alignItems={"flex-start"}
              as="form"
              onSubmit={handleSaveChanges}
              gap={2}
            >
              <FormLabel display="flex" alignItems="center" margin={0}>
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
                placeholder="Nombre completo"
                required
                value={formData.nombre}
                onChange={(value) => handleInputChange("nombre", value)}
              />

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
                Nombre de usuario
              </FormLabel>
              <TextInput
                type="text"
                placeholder="Nombre de usuario"
                required
                value={formData.username}
                onChange={(value) => handleInputChange("username", value)}
              />

              <Box
                display={"flex"}
                justifyContent={"center"}
                gap={"10px"}
                p={4}
                w={"100%"}
              >
                <StandardButton
                  variant={"WHITE_RED"}
                  borderRadius="20px"
                  py={"17px"}
                  w={"185px"}
                  fontWeight="400"
                  onClick={cancelEditing}
                  isDisabled={isSaving}
                  size="md"
                >
                  Cancelar
                </StandardButton>
                <StandardButton
                  variant={"RED_PRIMARY"}
                  borderRadius="20px"
                  py={"17px"}
                  w={"185px"}
                  fontWeight="400"
                  type={"submit"}
                  isLoading={isSaving}
                  size="md"
                >
                  Guardar Cambios
                </StandardButton>
              </Box>
            </FormControl>
          </Box>
        </Box>
      </Box>
    );
  }

  if (view === "changePassword") {
    return (
      <Box
        bg={"mainBg"}
        w={"100%"}
        height={"100%"}
        display={"flex"}
        p={6}
        justifyContent={"center"}
        alignItems={"flex-start"}
      >
        <Box
          w={"100%"}
          maxW={"480px"}
          display={"flex"}
          flexDir={"column"}
          bg={"white"}
          borderRadius={"20px"}
        >
          <Box
            bg={"black"}
            display={"flex"}
            flexDir={"column"}
            borderTopRadius="20px"
            p={4}
          >
            <Text textStyle={"RobotoBodyBold"} color={"white"}>
              Cambiar Contraseña
            </Text>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            px={6}
            py={2}
          >
            <FormControl
              w={"100%"}
              display={"flex"}
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"flex-start"}
              as="form"
              onSubmit={handlePasswordSubmit}
              gap={2}
            >
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
                Contraseña anterior
              </FormLabel>
              <TextInput
                type="password"
                placeholder="*****"
                required
                value={passwordData.oldPassword}
                onChange={(value) => handlePasswordChange("oldPassword", value)}
                isPassword
                rightIcon={<EyeSlashIcon />}
              />

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
                Nueva contraseña
              </FormLabel>
              <TextInput
                type="password"
                placeholder="*****"
                required
                value={passwordData.newPassword}
                onChange={(value) => handlePasswordChange("newPassword", value)}
                isPassword
                rightIcon={<EyeSlashIcon />}
              />

              <Box
                display={"flex"}
                justifyContent={"center"}
                gap={"10px"}
                p={4}
                w={"100%"}
              >
                <StandardButton
                  variant={"WHITE_RED"}
                  borderRadius="20px"
                  py={"17px"}
                  w={"185px"}
                  fontWeight="400"
                  onClick={cancelPasswordChange}
                  isDisabled={isChangingPassword}
                  size="md"
                >
                  Cancelar
                </StandardButton>
                <StandardButton
                  variant={
                    isPasswordValid && !isChangingPassword
                      ? "RED_PRIMARY"
                      : "DISABLED"
                  }
                  borderRadius="20px"
                  py={"17px"}
                  w={"185px"}
                  fontWeight="400"
                  type={"submit"}
                  isLoading={isChangingPassword}
                  isDisabled={isChangingPassword || !isPasswordValid}
                  size="md"
                  cursor={
                    isPasswordValid && !isChangingPassword
                      ? "pointer"
                      : "not-allowed"
                  }
                >
                  Cambiar
                </StandardButton>
              </Box>
            </FormControl>
          </Box>
        </Box>
      </Box>
    );
  }
}
