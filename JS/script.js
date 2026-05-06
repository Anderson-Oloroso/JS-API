async function obtenerLibrosVerne() {
  // Endpoint específico para evitar redirecciones 301
  const base = "https://es.wikipedia.org/w/api.php";
  
  const params = {
    action: "query",
    generator: "categorymembers",
    gcmtitle: "Categoría:Novelas de Julio Verne", // Asegúrate que la categoría sea exacta
    gcmlimit: "12",
    prop: "extracts|pageimages",
    exsentences: "2",
    exintro: "1",
    explaintext: "1",
    piprop: "thumbnail",
    pithumbsize: "400",
    format: "json",
    origin: "*" // Crucial para evitar el error de Cross-Origin
  };

  // Convertimos el objeto a una cadena de texto segura para URL
  const queryPath = Object.keys(params)
    .map(k => `${k}=${encodeURIComponent(params[k])}`)
    .join('&');

  try {
    const response = await fetch(`${base}?${queryPath}`);
    if (!response.ok) throw new Error("Error en la conexión");

    const data = await response.json();
    
    // Wikipedia devuelve las páginas dentro de data.query.pages
    if (!data.query || !data.query.pages) {
      console.warn("No se encontraron resultados.");
      return [];
    }

    const resultados = Object.values(data.query.pages).map(p => ({
      titulo: p.title,
      resumen: p.extract || "Sin descripción.",
      imagen: p.thumbnail ? p.thumbnail.source : "https://placeholder.com"
    }));

    console.log("Éxito:", resultados);
    return resultados;

  } catch (err) {
    console.error("Falló la petición:", err.message);
  }
}

obtenerLibrosVerne();
