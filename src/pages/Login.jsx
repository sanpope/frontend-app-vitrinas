import { useState, useEffect } from "react";
import { Box, Text, useToast } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import Checkbox from "../component/ui/checkbox/index";
import StandardButton from "../component/ui/buttons/standard/index";
import TextInput from "../component/ui/textInput";
import LogoComplete from "../assets/images/logoComplete";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
   const toast = useToast();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(true);

  const { login, error, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const onChangeEmail = (e) => {
    setUser(e.trim());
  };

  const onChangePassword = (e) => {
    setPassword(e.toString().trim());
  };

  const handleLoginAdmin = async (e) => {
    e.preventDefault();

    if (!user || !password) {
      alert("Error", "Usuario y contraseña son requeridos");
      return;
    }

    const success = await login(user, password, check);

    if (!success && !check) {
      setUser("");
      setPassword("");
    }
  };

  return (
    <Box
      className="App"
      display="flex"
      flexDir={"row"}
      height={"100vh"}
      pos="relative"
    >
      <Box
        pos="absolute"
        display={{ base: "flex", lg: "none" }}
        zIndex={1}
        w="100%"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <LogoComplete fill={"black"} />
      </Box>
      <Box
        display={{ base: "none", lg: "flex" }}
        width={{ base: "0%", lg: "50%" }}
        height={"100%"}
        flexDir={"column"}
        alignItems="center"
        justifyContent="center"
        bg="black"
      >
        <LogoComplete width="300px" height="400px" />
      </Box>
      <Box
        width={{ base: "100%", lg: "50%" }}
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          m="2"
          boxShadow={{ base: "2xl", lg: "none" }}
          rounded={{ base: "lg", lg: "none" }}
        >
          <form
            style={{
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
              maxWidth: "450px",
              height: "400px",
              padding: "10px",
              borderRadius: "10px",
            }}
            onSubmit={handleLoginAdmin}
          >
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Text textStyle={"RobotoHeader"}>¡Comencemos ya!</Text>
              <Text textStyle={"RobotoBody"}>
                Ingresa tus credenciales para acceder a tu cuenta
              </Text>
            </Box>

            <TextInput
              label="Usuario"
              type="text"
              id="user"
              value={user}
              onChange={(e) => onChangeEmail(e)}
              error={error}
              rounded="md"
            />

            <Box w="100%">
              <TextInput
                label="Contraseña"
                id="password"
                value={password}
                onChange={(e) => onChangePassword(e)}
                error={error}
                type="password"
              />
            </Box>

            <Box
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Checkbox
                value={check}
                onChange={setCheck}
                defaultChecked={check}
              />
              <Text>Recordarme</Text>
            </Box>
            <Box
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StandardButton
                variant={"RED_PRIMARY"}
                px="2rem"
                py="1rem"
                borderRadius="30px"
                w="fit-content"
                type={"submit"}
                isLoading={loading}
                onClick={handleLoginAdmin}
              >
                Iniciar sesión
              </StandardButton>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
