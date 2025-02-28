export const parseData = (xml) => {
  const xmlText = xml;
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, "text/xml");
  return xmlDoc;
};

export const parseTextFields = (xmlDoc, fieldNames) => {
  const obj = {};
  for (let i = 0; i < fieldNames.length; i++) {
    const val = xmlDoc?.getElementsByTagName(fieldNames[i])[0].textContent;
    if (val) {
      obj[fieldNames[i]] = val;
    }
  }
  return obj;
};

export const generateProductsListXML = (productos) => {
  let productosXML = productos
    .map((producto) => {
      return `
      <producto>
        <codigo>${producto.codigo}</codigo>
        <cantidad>${producto.cantidad}</cantidad>
      </producto>
    `;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
    <productosAMover>
      ${productosXML}
    </productosAMover>`;
};

export const extraerDatosUsuario = (xmlDoc) => {
  const datos = {
    nombre: "",
    longitudClave: 0,
    usuario: "",
  };

  const nombreElement = xmlDoc.getElementsByTagName("nombre")[0];
  if (nombreElement) {
    datos.nombre = nombreElement.textContent;
  }

  const caracteresClaveElement =
    xmlDoc.getElementsByTagName("caracteresClave")[0];
  if (caracteresClaveElement) {
    datos.longitudClave = parseInt(caracteresClaveElement.textContent, 10);
  }

  const usuarioElement = xmlDoc.getElementsByTagName("usuario")[0];
  if (usuarioElement) {
    datos.usuario = usuarioElement.textContent;
  }

  return datos;
};
