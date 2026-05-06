async function obtenerLibrosVerne() {
  const base = "https://es.wikipedia.org/w/api.php";
  
  // Lista de títulos exactos que quieres buscar
  const librosDeseados = [
    "La vuelta al mundo en ochenta días",
    "La isla misteriosa",
    "Dos años de vacaciones",
    "Dueño del mundo (novela)",
    "Miguel Strogoff",
    "El castillo de los Cárpatos",
    "Viaje a la Luna", // Nombre común en Wikipedia
    "De la Tierra a la Luna",
    
    // Extras representativos para completar los 17
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
    titles: librosDeseados.join('|'), // Buscamos por títulos específicos
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

    // El orden de Wikipedia suele ser por ID de página, 
    // así que mapeamos los resultados
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