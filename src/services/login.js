import xmlToJSON from "./XmlToJsonConverter";

const login = async (credentials) => {
  const xmlData = `
    <credentials>
      <username>${credentials.user}</username>
      <password>${credentials.password}</password>
    </credentials>
  `;

  try {
    const respuesta = await fetch("http://localhost:8080/app/rest/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/xml",
      },
      body: xmlData,
    });

    if (respuesta.ok) {
      const datos = await respuesta.text();

      localStorage.setItem("token", datos);

      return { status: true, message: localStorage.getItem("token") };
    } else {
      return { status: false, message: "Usuario o contraseña incorrectos" };
    }
  } catch (error) {
    console.error("Hubo un problema con la solicitud fetch:", error);
    return { status: false, message: "Error de conexión" };
  }
};

const logout = () => {
  localStorage.removeItem("token");
};

const authService = {
  login,
  logout,
};

export default authService;
