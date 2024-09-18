export function capitalizeFirstLetter(str) {
  if (!str) return ""; // Retorna vacío si el string está vacío o indefinido
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Funcion para formato de fecha 07/Ago, 1:20PM
export function formatDate(dateString) {
  const date = new Date(dateString);

  const options = {
    day: "2-digit",
    month: "short", // Mes abreviado
    hour: "numeric", // Esto elimina el cero inicial en las horas
    minute: "2-digit",
    hour12: true, // Para formato 12 horas (AM/PM)
  };

  let formattedDate = date.toLocaleString("es-ES", options);

  // Convertir la inicial del mes a mayúscula
  formattedDate = formattedDate.replace(
    /(\d{2}) (\w{3}),/, // Captura el día y el mes abreviado
    (match, day, month) =>
      `${day}/${month.charAt(0).toUpperCase()}${month.slice(1)},`,
  );

  // Convertir cualquier variación de "a. m." o "p. m." a "AM" o "PM" (quitamos puntos y espacios)
  formattedDate = formattedDate
    .replace(/\s?a\.?\s?m\.?/i, "AM")
    .replace(/\s?p\.?\s?m\.?/i, "PM");

  return formattedDate;
}

export function formatString(nombre) {
  nombre = nombre.toLowerCase();
  nombre = nombre.split(" ");

  for (let i = 0; i < nombre.length; i++) {
    nombre[i] = nombre[i][0]?.toUpperCase() + nombre[i].substr(1);
  }
  nombre = nombre.join(" ");
  return nombre;
}

// Funcion para formato 09/28/2024 | 10:00AM
export function convertirFecha(date) {
  const fecha = new Date(date);
  // Obtener los componentes de la fecha
  let day = fecha.getDate();
  let month = fecha.getMonth() + 1;
  const year = fecha.getFullYear();

  // Obtener la hora y los minutos
  let horas = fecha.getHours();
  let minutos = fecha.getMinutes();

  // Determinar si es AM o PM
  const ampm = horas >= 12 ? "PM" : "AM";

  // Convertir las horas al formato de 12 horas
  horas = horas % 12;
  horas = horas ? horas : 12; // La hora 0 debe ser 12
  minutos = minutos < 10 ? "0" + minutos : minutos; // Asegurar que los minutos tengan dos dígitos

  // Asegurar que el día y el month tengan dos dígitos
  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  // Formatear la fecha y la hora por separado
  const fechaFormateada = `${month}/${day}/${year}`;
  const horaFormateada = `${horas}:${minutos}${ampm}`;

  return { fecha: fechaFormateada, hora: horaFormateada };
}

//Formato de fecha 01/04/2024 a las 22:18
export function formatFecha(dateString) {
  const date = new Date(dateString); // Convertir cadena a objeto Date

  // Opciones de formato para fecha y hora
  const opcionesFecha = { day: "2-digit", month: "2-digit", year: "numeric" };
  const opcionesHora = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  // Formatear fecha y hora usando la configuración local "es-ES"
  const fechaFormateada = date.toLocaleDateString("es-ES", opcionesFecha);
  const horaFormateada = date.toLocaleTimeString("es-ES", opcionesHora);

  return `${fechaFormateada} a las ${horaFormateada}`;
}

//Formato de Numero a pesos Cop 
export function formatearNumero(numero) {
  return new Intl.NumberFormat("es-ES", {
    maximumFractionDigits: 0,
  }).format(numero);
}