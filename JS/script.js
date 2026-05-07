async function obtenerLibrosVerne() {
  const base = "https://es.wikipedia.org/w/api.php";
  const librosDeseados = [
    "La vuelta al mundo en ochenta días",
    "La isla misteriosa",
    "Dos años de vacaciones",
    "Dueño del mundo (novela)",
    "Miguel Strogoff",
    "El castillo de los Cárpatos",
    "Viaje a la Luna",
    "De la Tierra a la Luna",
    "Veinte mil leguas de viaje submarino",
    "Viaje al centro de la Tierra",
    "Cinco semanas en globo",
    "El faro del fin del mundo",
    "Los hijos del capitán Grant",
    "Una ciudad flotante",
    "Escuela de Robinsones",
    "Las tribulaciones de un chino en China",
    "Robur el conquistador"
  ];

  const params = {
    action: "query",
    titles: librosDeseados.join('|'),
    prop: "extracts|pageimages",
    exsentences: "2",
    exintro: "1",
    explaintext: "1",
    piprop: "thumbnail",
    pithumbsize: "400",
    format: "json",
    origin: "*"
  };

  const queryPath = Object.keys(params)
    .map(k => `${k}=${encodeURIComponent(params[k])}`)
    .join('&');

  try {
    const response = await fetch(`${base}?${queryPath}`);
    if (!response.ok) throw new Error("Error en la conexión");

    const data = await response.json();
    
    if (!data.query || !data.query.pages) {
      console.warn("No se encontraron resultados.");
      return [];
    }

    const resultados = Object.values(data.query.pages).map(p => ({
      titulo: p.title,
      resumen: p.extract || "Sin descripción.",
      imagen: p.thumbnail ? p.thumbnail.source : "https://via.placeholder.com/400x600?text=Sin+Imagen"
    }));

    console.log("Libros encontrados:", resultados);
    return resultados;

  } catch (err) {
    console.error("Falló la petición:", err.message);
  }
}
obtenerLibrosVerne();

const aventuraViajes = [
  "La vuelta al mundo en ochenta días",
  "Dos años de vacaciones",
  "Cinco semanas en globo",
  "Una ciudad flotante",
  "Los hijos del capitán Grant",
  "El faro del fin del mundo"
];

const cienciaFiccion = [
  "Viaje a la Luna",
  "De la Tierra a la Luna",
  "Veinte mil leguas de viaje submarino",
  "Viaje al centro de la Tierra",
  "Robur el conquistador"
];

const aventuraHistorica = [
  "Miguel Strogoff",
  "La isla misteriosa"
];

const misterioGotico = [
  "El castillo de los Cárpatos",
  "Las tribulaciones de un chino en China"
];

const juvenilEscuela = [
  "Escuela de Robinsones"
];

const satiricoSocial = [
  "Dueño del mundo (novela)"
];

// // Opcional: objeto que agrupa todo
// const categorias = {
//   "Aventura / Viajes 🛫": aventuraViajes,
//   "Ciencia ficción 🤖": cienciaFiccion,
//   "Aventura histórica / Épica 🐘": aventuraHistorica,
//   "Misterio / Gótico 🕯️": misterioGotico,
//   "Juvenil / Escuela 📚": juvenilEscuela,
//   "Satírico / Social 😄": satiricoSocial
// };

const gridElementos = document.getElementsByClassName("grid");
const caja = document.createElement("div");
for (let i = 0; i < gridElementos.length; i++) {
  console.log(gridElementos[i]);
}
gridElementos[0].addEventListener("click", (e) => {
  if (e.target.tagName === "H2") {
    alert(`Has hecho clic en el género: ${e.target.textContent}`);
    caja.textContent = resultados
  } else if (e.target.tagName === "DIV") {
    alert(`Has hecho clic en el género: ${e.target.textContent}`);
  } else {
    alert("Haz hecho clic en un área vacía de la cuadrícula.");
  }     
});



