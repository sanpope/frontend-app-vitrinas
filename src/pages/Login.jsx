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

function App() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(true);

  const [errUser, setErrUser] = useState(false);
  const [errPassword, setErrPassword] = useState(false);
  const [errCheck, setErrCheck] = useState(false);

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
              onChange={setUser}
              error={errUser}
              rounded="md"
              placeholder={"example"}
            />

            <Box w="100%">
              <TextInput
                label="Contraseña"
                value={password}
                onChange={setPassword}
                error={errPassword}
                placeholder={"************"}
                borderColor={"black"}
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

export default App;
