import axios from "axios";
import xmlToJSON from "./XmlToJsonConverter";

async function fetchXMLData(url) {
  
  try {
    // Realizar la solicitud GET para obtener los datos XML desde la URL proporcionada
    const response = await axios.get(url);

    // Convertir los datos XML a JSON
    const jsonData = xmlToJSON(response.data);
    console.log(jsonData);
    return jsonData;

  } catch (error) {

    console.error(`Error fetching the XML data from ${url}:`, error);
    return null;
  }
}

export default fetchXMLData;
