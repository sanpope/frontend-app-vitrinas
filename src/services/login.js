import api from "./api";

const login = async (credentials) => {
  const fallo = "user_invalidoasdasdasd";
  // const xmlData = `
  //   <?xml version="1.0" encoding="UTF-8"?>
  //   <credentials>
  //     <username>${credentials.user}</username>
  //     <password>${credentials.password}</password>
  //   </credentials>
  // `;

  // const response = await api.post('/auth/login', xmlData, {
  //   headers: {
  //     'Content-Type': 'application/xml'
  //   },
  // });

  // // Si la respuesta es en XML, parsearla
  // const parser = new DOMParser();
  // const xmlDoc = parser.parseFromString(response.data, "application/xml");
  // const token = xmlDoc.getElementsByTagName("token")[0]?.textContent;

  // if (token) {
  //   localStorage.setItem('token', token);
  // }

  // return response.data;

  if (fallo === "user_invalido")
    return { status: false, message: "Usuario o contraseña incorrectos" };
  else {
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ1c3VhcmlvIiwiaWF0IjoxNzE3NTM3NzIyLCJleHAiOjE3MTc1NDEzMjJ9.hiaqmUVMX3Nm7p5dyR9BVtVgXZjFchpy0my4tfczGTHcbGqdCNipCoUDSBAIHkYX",
    );
    return { status: true, message: localStorage.getItem("token") };
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
