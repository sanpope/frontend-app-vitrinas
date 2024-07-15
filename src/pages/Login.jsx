import { useState } from "react";

import { Box, Text } from "@chakra-ui/react";
import Checkbox from "../component/ui/checkbox/index";
import StandardButton from "../component/ui/buttons/standard/index";
import TextInput from "../component/ui/textInput";
import LogoComplete from "../assets/images/logoComplete";
import colors from "../theme/colors";
import { color } from "framer-motion";
import BUTTON_VARIANTS from "../component/ui/buttons/standard/types";
import textStyles from "../theme/textStyles";
import login from "../services/login";

function Login({ setLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(true);

  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errCheck, setErrCheck] = useState("");

  const onChangeEmail = (e) => {
    let emailLowerCase = e.toLowerCase();
    console.log(emailLowerCase);
    setEmail(emailLowerCase);
  };

  const onChangePassword = (e) => {
    console.log(e);
    setPassword(e);
  };

  const emailValidation = () => {
    let result = false;
    const rgExp = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    if (rgExp.test(email)) {
      setErrEmail("");
      result = false;
    } else if (email === "") {
      setErrEmail("Ingrese un correo");
      result = true;
    } else if (!rgExp.test(email)) {
      setErrEmail("Ingrese un correo valido");
      result = true;
    } else {
      setErrEmail("");
      result = false;
    }

    return result;
  };

  const passwordValidation = (pw) => {
    setErrPassword("");
    let result = false;
    let msg = "";

    const rgExp =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,15}$/;
    if (rgExp.test(pw)) {
      setErrPassword("");
      result = false;
      return result;
    } else {
      if (pw.length === 0) {
        msg = "El campo no puede estar vacío, agrega una contraseña";
        setErrPassword(msg);
        result = true;
      } else if (pw.length > 0 && pw.length < 6) {
        msg = "La contraseña debe:\n Contener mínimo 6 carácteres";
        result = true;
      } else if (pw.length > 15) {
        msg += "La contraseña debe:\n Contener máximo 15 carácteres.";
        result = true;
      }

      setErrPassword(msg);
    }

    return result;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = await login.login({ user: email, password });
    const validEmail = emailValidation();
    const validPassword = passwordValidation(password);
    if (!validEmail && !validPassword && loginData.status) {
      console.log(loginData.status);
      setLoggedIn(true);

      console.log("login success");
    } else {
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
            onSubmit={(e) => handleLogin(e)}
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
              value={email}
              onChange={(e) => onChangeEmail(e)}
              error={errEmail}
              rounded="md"
              placeholder={"example"}
            />

            <Box w="100%">
              <TextInput
                label="Contraseña"
                value={password}
                onChange={(e) => onChangePassword(e)}
                error={errPassword}
                placeholder={"************"}
                isPassword
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
