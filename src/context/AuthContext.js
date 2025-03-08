import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { setItem, getItem, removeItem } from "../utils/localStorage";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { setUserName } from "../store/slices/user";
import { parseData, extraerDatosUsuario } from "../utils/xmlParse";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const toast = useToast();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = getItem("authToken");
      const userName = getItem("userName");

      if (token) {
        try {
          setIsAuthenticated(true);
          setUser(userName || "");

          if (userName) {
            dispatch(setUserName(userName));
          } else {
            await fetchUserData();
          }
        } catch (error) {
          console.error("Error validando token:", error);
          removeItem("authToken");
          removeItem("userName");

          toast({
            title: "Error de autenticación",
            description:
              "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
      setInitialLoading(false);
    };

    checkAuthStatus();
  }, [dispatch, toast]);

  const fetchUserData = async (skipToast = false) => {
    try {
      const userData = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/admin/`,
        {
          headers: {
            Accept: "application/xml",
            Authorization: `Bearer ${getItem("authToken")}`,
          },
        },
      );

      if (userData.status === 200) {
        const xml = userData.data;
        const dataParsed = parseData(xml);
        const usuarioInfo = extraerDatosUsuario(dataParsed);

        setItem("userName", usuarioInfo.nombre);
        setUser(usuarioInfo.nombre);
        setUserInfo(usuarioInfo);
        dispatch(setUserName(usuarioInfo.nombre));

        return usuarioInfo;
      }
    } catch (error) {
      console.error("Error obteniendo los datos del usuario:", error);

      if (!skipToast) {
        toast({
          title: "Error",
          description: "No se pudieron obtener los datos del usuario.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }

      return null;
    }
  };

  const login = async (username, password, remember) => {
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/auth/login/`,
        `<credentials><username>${username}</username><password>${password}</password></credentials>`,
        {
          headers: {
            "Content-Type": "application/xml",
          },
        },
      );

      if (response.status === 200) {
        const token = response.data;
        setItem("authToken", token);

        if (remember) {
          setItem("hasRemembered", "true");
        } else {
          sessionStorage.setItem("username", username);
        }

        setIsAuthenticated(true);

        const userData = await fetchUserData();
        if (!userData) {
          throw new Error("No se pudieron obtener los datos del usuario");
        }

        return true;
      }
    } catch (error) {
      console.error("Error iniciando sesión:", error);
      setError(
        "Usuario o contraseña inválidos, por favor ingresa las credenciales correctas!",
      );

      toast({
        title: "Error de inicio de sesión",
        description:
          "Usuario o contraseña inválidos. Por favor, inténtalo nuevamente.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });

      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (
    nuevoNombre,
    nuevoUsuario,
    showToast = true,
  ) => {
    const prevIsAuthenticated = isAuthenticated;

    let localLoading = true;

    try {
      const formData = new URLSearchParams();
      formData.append("nombre", nuevoNombre);
      formData.append("usuario", nuevoUsuario);

      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/admin/`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${getItem("authToken")}`,
          },
        },
      );

      if (response.status === 200) {
        setItem("userName", nuevoNombre);
        setUser(nuevoNombre);
        dispatch(setUserName(nuevoNombre));

        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          nombre: nuevoNombre,
          usuario: nuevoUsuario,
        }));

        if (prevIsAuthenticated !== isAuthenticated) {
          setIsAuthenticated(prevIsAuthenticated);
        }

        if (showToast) {
          toast({
            title: "Perfil actualizado",
            description: "Tu información ha sido actualizada exitosamente.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }

        return true;
      } else {
        throw new Error("Error al actualizar el perfil");
      }
    } catch (error) {
      console.error("Error actualizando perfil:", error);

      if (prevIsAuthenticated !== isAuthenticated) {
        setIsAuthenticated(prevIsAuthenticated);
      }

      if (showToast) {
        toast({
          title: "Error",
          description:
            "No se pudo actualizar tu información. Intenta de nuevo.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }

      return false;
    } finally {
      localLoading = false;

      if (loading) {
        setLoading(false);
      }
    }
  };

  const updatePassword = async (antiguaClave, nuevaClave, showToast = true) => {
    const prevIsAuthenticated = isAuthenticated;

    let localLoading = true;

    try {
      const formData = new URLSearchParams();
      formData.append("clave", antiguaClave);
      formData.append("nuevaClave", nuevaClave);

      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/admin/clave`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${getItem("authToken")}`,
          },
        },
      );

      if (response.status === 200) {
        if (showToast) {
          toast({
            title: "Contraseña actualizada",
            description: "Tu contraseña ha sido actualizada exitosamente.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }

        if (prevIsAuthenticated !== isAuthenticated) {
          setIsAuthenticated(prevIsAuthenticated);
        }

        if (userInfo && nuevaClave) {
          setUserInfo({
            ...userInfo,
            longitudClave: nuevaClave.length,
          });
        }

        return true;
      } else {
        throw new Error("Error al actualizar la contraseña");
      }
    } catch (error) {
      console.error("Error actualizando contraseña:", error);

      let errorMessage =
        "No se pudo actualizar tu contraseña. Intenta de nuevo.";

      if (error.response && error.response.data) {
        errorMessage = error.response.data.message || errorMessage;
      }

      if (showToast) {
        toast({
          title: "Error",
          description: errorMessage,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }

      if (prevIsAuthenticated !== isAuthenticated) {
        setIsAuthenticated(prevIsAuthenticated);
      }

      throw error;
    } finally {
      localLoading = false;

      if (loading) {
        setLoading(false);
      }
    }
  };

  const logout = () => {
    removeItem("authToken");
    removeItem("userName");
    removeItem("hasRemembered");
    sessionStorage.removeItem("username");
    setIsAuthenticated(false);
    setUser(null);
    setUserInfo(null);

    // toast({
    //   title: "Sesión cerrada",
    //   description: "Has cerrado sesión exitosamente.",
    //   status: "info",
    //   duration: 3000,
    //   isClosable: true,
    // });
  };

  const value = {
    isAuthenticated,
    user,
    userInfo,
    initialLoading,
    loading,
    error,
    login,
    logout,
    fetchUserData,
    updateUserProfile,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
