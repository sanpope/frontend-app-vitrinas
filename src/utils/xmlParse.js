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
