import TshirtIcon from "../../src/assets/images/TshirtIcon";
import GemIcon from "../../src/assets/images/GemIcon";
import ShoppingBagIcon from "../../src/assets/images/ShoppingBagIcon";
import MugIcon from "../../src/assets/images/MugIcon";
import HeadphonesIcon from "../../src/assets/images/HeadphonesIcon";

import {
  convertirFecha,
  capitalizeFirstLetter,
  formatearNumero,
  getPorcentage,
} from "./formatting";

export const getTiempoInactividad = (xml) => {
  const resumenActividad = xml.querySelector("resumenDeActividadReciente");
  const inactividad =
    resumenActividad.getElementsByTagName("inactividad")[0].textContent;
  return inactividad?.length ? inactividad : null;
};

export const getUltimasVentas = (xml) => {
  const actividadReciente = xml.querySelector("resumenDeActividadReciente");
  let valor = actividadReciente?.getElementsByTagName("valor")[0].textContent;
  let fecha = actividadReciente?.getElementsByTagName("fecha")[0].textContent;
  let masProductos =
    actividadReciente?.getElementsByTagName("masProductos")[0].textContent;
  let producto1 = actividadReciente?.querySelector("producto1");
  let producto2 = actividadReciente?.querySelector("producto2");

  let prod1 = {
    nombre: producto1?.getElementsByTagName("nombre")[0].textContent,
    cantidad: producto1?.getElementsByTagName("cantidad")[0].textContent,
  };

  let prod2 = {
    nombre: producto2?.getElementsByTagName("nombre")[0].textContent,
    cantidad: producto2?.getElementsByTagName("cantidad")[0].textContent,
  };

  return { valor, fecha, masProductos, prod1, prod2 };
};

export const getVentasDia = (xml) => {
  const resumenActividad = xml.querySelector("resumenDeActividadReciente");
  let ventasDelDia = resumenActividad.querySelector("ventasDelDia");
  let cantidad = ventasDelDia.getElementsByTagName("cantidad")[0].textContent;
  let porcentajeDeCrecimiento = ventasDelDia.getElementsByTagName(
    "porcentajeDeCrecimiento",
  )[0].textContent;
  return { cantidad, porcentajeDeCrecimiento };
};

export const getEstadoDispositivo = (xml) => {
  const estaVitrina = xml.querySelector("sobreEstaVitrina");

  const estadoDispositivo = xml.getElementsByTagName("estadoDelDispositivo")[0]
    .textContent;
  return estadoDispositivo;
};

export const getVentasMes = (xml) => {
  const ventasDelMes = xml.querySelector("ventaDelMes");
  let porcentajeDeCrecimiento = ventasDelMes.getElementsByTagName(
    "porcentajeDeCrecimiento",
  )[0].textContent;
  let valor = formatearNumero(
    ventasDelMes.getElementsByTagName("valor")[0].textContent,
  );
  return { valor, porcentajeDeCrecimiento };
};

export const getVentaMesesAnteriores = (xml) => {
  let infoTotalVentasAnt = [];
  let totalVentasAnt = xml.querySelector("ventasDeUltimosMeses");
  let totalVentasArr = totalVentasAnt.querySelectorAll("ventaDeMes");
  for (let i = 0; i < totalVentasArr.length; i++) {
    let mes = totalVentasArr[i].getElementsByTagName("mes")[0].textContent;
    let valor = totalVentasArr[i].getElementsByTagName("valor")[0].textContent;
    infoTotalVentasAnt.push({
      mes: mes,
      valor: valor,
    });
  }
  return infoTotalVentasAnt;
};

export const getActualizacionesInventario = (xml) => {
  let actualizacionesInventarioArr = [];
  const actualizacionesInventario = xml.querySelector(
    "modificacionesDeInventarioNoRevisadas",
  );
  const modificaciones =
    actualizacionesInventario.querySelectorAll("modificacion");

  for (let i = 0; i < modificaciones.length; i++) {
    const fechaHora = modificaciones[i].getAttribute("fechaHora");
    const { fecha, hora } = convertirFecha(fechaHora);
    const cantidadProductosIngresados = modificaciones[i].getElementsByTagName(
      "cantidadProductosIngresados",
    )[0].textContent;
    const cantidadProductosRetirados = modificaciones[i].getElementsByTagName(
      "cantidadProductosRetirados",
    )[0].textContent;
    const cantidadDeCorrecciones = modificaciones[i].getElementsByTagName(
      "cantidadDeCorrecciones",
    )[0].textContent;

    actualizacionesInventarioArr.push({
      fecha,
      hora,
      cantidadProductosIngresados,
      cantidadProductosRetirados,
      cantidadDeCorrecciones,
    });
  }

  return actualizacionesInventarioArr;
};

export const getEvolucionDiariaVentas = (xml) => {
  let infoTotalVentasDia = [];
  let totalVentasDia = xml.querySelector("ventasDeDiasDelMes");
  let totalVentasArr = totalVentasDia.querySelectorAll("ventaDia");
  for (let i = 0; i < totalVentasArr.length; i++) {
    let dia = totalVentasArr[i].getElementsByTagName("dia")[0].textContent;
    let valor = totalVentasArr[i].getElementsByTagName("valor")[0].textContent;
    infoTotalVentasDia.push({
      dia: dia,
      valor: valor,
    });
  }
  return infoTotalVentasDia;
};

export const getTopCategorias = (xml) => {
  const totalCategoriasArr = [];
  let categorias = xml.querySelector("categoriasMasPopulares");
  let totalTopCategorias = categorias.querySelectorAll("categoria");

  for (let i = 0; i < totalTopCategorias.length; i++) {
    const iconMap = {
      ropa: <TshirtIcon />,
      artesanias: <MugIcon />,
      joyas: <GemIcon />,
      tecnologia: <HeadphonesIcon />,
    };
    let nombre =
      totalTopCategorias[i].getElementsByTagName("nombre")[0].textContent;
    const icon = iconMap[nombre] || <ShoppingBagIcon />;

    const porcentaje = totalTopCategorias[i].getElementsByTagName(
      "porcentajeDeLasVentas",
    )[0].textContent;

    if (nombre === "") {
      nombre = "Otros";
    }

    nombre = capitalizeFirstLetter(nombre);

    totalCategoriasArr.push({ nombre, porcentaje, icon });
  }
  return totalCategoriasArr;
};

export const getDistribucionDiaria = (xml) => {
  let infoTotalDistribucion = [];
  let totalDistribucion = xml.querySelector("porcentajeDeIntervalos");
  let distribucionesVentasArr =
    totalDistribucion.querySelectorAll("intervaloDelDia");
  for (let i = 0; i < distribucionesVentasArr.length; i++) {
    let hora =
      distribucionesVentasArr[i].getElementsByTagName("intervalo")[0]
        .textContent;
    switch (hora) {
      case "0a5":
        hora = "0-6am";
        break;
      case "5a10":
        hora = "6-10am";
        break;
      case "10a15":
        hora = "10-1pm";
        break;
      case "15a20":
        hora = "1-8pm";
        break;
      case "20a24":
        hora = "8-12pm";
        break;
      default:
        break;
    }
    let valor = Math.trunc(
      distribucionesVentasArr[i].getElementsByTagName("porcentajeDeVentas")[0]
        .textContent,
    );
    infoTotalDistribucion.push({
      hora: hora,
      valor: valor,
    });
  }
  return infoTotalDistribucion;
};

export const getProductosPocoStock = (xml) => {
  const prodsPocoStock = xml.querySelector("productosConPocoStock");
  const productos = prodsPocoStock.querySelectorAll("producto");
  const totalProdsPocoStockArr = [];
  for (let i = 0; i < productos.length; i++) {
    const nombre = productos?.[i].getElementsByTagName("nombre")[0].textContent;
    const existenciasActuales = productos?.[i].getElementsByTagName(
      "existenciasActuales",
    )[0].textContent;
    const cantidadMinima =
      productos?.[i].getElementsByTagName("cantidadMinima")[0].textContent;
    totalProdsPocoStockArr.push({
      nombre,
      existenciasActuales,
      cantidadMinima,
    });
  }
  return totalProdsPocoStockArr;
};
