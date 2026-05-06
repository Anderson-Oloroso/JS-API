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
    "El conde de Montecristo", // Aparecerá aunque sea de Dumas
    "Viaje a la Luna",
    "De la Tierra a la Luna",
    "Viaje al centro de la Tierra",
    "Veinte mil leguas de viaje submarino"
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