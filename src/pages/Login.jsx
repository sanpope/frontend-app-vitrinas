import { useState } from "react";
import axios from "axios";
import { Box, Text } from "@chakra-ui/react";
import Checkbox from "../component/ui/checkbox/index";
import StandardButton from "../component/ui/buttons/standard/index";
import TextInput from "../component/ui/textInput";
import LogoComplete from "../assets/images/logoComplete";
import { setItem, getItem } from "../utils/localStorage";

function Login({ setLoggedIn }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(true);
  const [loading, setLoading] = useState(false);

  const [err, setErr] = useState("");
  const [errCheck, setErrCheck] = useState("");

  const onChangeEmail = (e) => {
    setUser(e.trim());
  };

  const onChangePassword = (e) => {
    setPassword(e.toString().trim());
  };

  const handleLoginAdmin = async () => {
    if (!user || !password) {
      alert("Error", "Usuario y contraseña son requeridos");
      return;
    }

    setLoading(true);
    try {
      console.log("datos a enviar: ", user, " ", password);
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/app/rest/auth/login/`,
        `<credentials><username>${user}</username><password>${password}</password></credentials>`,
        {
          headers: {
            "Content-Type": "application/xml",
          },
        },
      );
      console.log("Respuesta autenticacion: ", response);

      if (response.status === 200) {
        setItem("authToken", response.data);
        setItem("rememberedUser", user);
        if (check) {
          setItem("hasRemembered", "true");
        }
        setLoggedIn(true);
      }
    } catch (error) {
      console.log("error para iniciar sesion: ", error);
      setErr(
        "Usuario o contraseña invalidos, por favor ingresa las credenciales correctas!",
      );
    } finally {
      console.log(check);
      if (check) {
      } else {
        setLoading(false);
        setUser("");
        setPassword("");
        setErr("");
      }
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
            onSubmit={(e) => {
              e.preventDefault();
              handleLoginAdmin();
            }}
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
              error={err}
              rounded="md"
            />

            <Box w="100%">
              <TextInput
                label="Contraseña"
                id="password"
                value={password}
                onChange={(e) => onChangePassword(e)}
                error={err}
                type="text"
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
                error={errCheck}
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
