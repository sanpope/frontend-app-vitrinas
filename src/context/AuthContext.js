import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { setItem, getItem, removeItem } from "../utils/localStorage";
import { useDispatch } from "react-redux";
import { setUserName } from "../store/slices/user";
import { parseData, extraerDatosUsuario } from "../utils/xmlParse";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

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
        }
      }
      setInitialLoading(false);
    };

    checkAuthStatus();
  }, [dispatch]);

  const fetchUserData = async () => {
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
      return null;
    }
  };

  const login = async (username, password, remember) => {
    setError("");

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
      throw error;
    }
  };

  const updateUserProfile = async (nuevoNombre, nuevoUsuario) => {
    try {
      const xmlData = `<admin><nombre>${nuevoNombre}</nombre><usuario>${nuevoUsuario}</usuario></admin>`;

      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/admin/`,
        xmlData,
        {
          headers: {
            "Content-Type": "application/xml",
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

        await fetchUserData();
        return true;
      } else {
        throw new Error("Error al actualizar el perfil");
      }
    } catch (error) {
      console.error("Error actualizando perfil:", error);
      throw error;
    }
  };

  const updatePassword = async (antiguaClave, nuevaClave) => {
    try {
      const xmlData = `<admin><antiguaClave>${antiguaClave}</antiguaClave><nuevaClave>${nuevaClave}</nuevaClave></admin>`;

      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/admin/clave`,
        xmlData,
        {
          headers: {
            "Content-Type": "application/xml",
            Authorization: `Bearer ${getItem("authToken")}`,
          },
        },
      );

      if (response.status === 200) {
        return true;
      } else {
        throw new Error("Error al actualizar la contraseña");
      }
    } catch (error) {
      console.error("Error actualizando contraseña:", error);
      throw error;
    }
  };

  const logout = () => {
    removeItem("authToken");
    removeItem("userName");
    setIsAuthenticated(false);
    setUser(null);
    setUserInfo(null);
  };

  const value = {
    isAuthenticated,
    user,
    userInfo,
    initialLoading,
    error,
    login,
    logout,
    fetchUserData,
    updateUserProfile,
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
