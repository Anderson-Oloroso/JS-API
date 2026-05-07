async function obtenerLibrosVerne(arreglo) {
  const base = "https://es.wikipedia.org/w/api.php";
  const librosDeseados = arreglo
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

const scienceFiction = [
  "Viaje a la Luna",
  "De la Tierra a la Luna",
  "Veinte mil leguas de viaje submarino",
  "Viaje al centro de la Tierra",
  "Robur el conquistador",
  "Dueño del mundo (novela)"
];

const epicJourneys = [
  "La vuelta al mundo en ochenta días",
  "Miguel Strogoff",
  "Los hijos del capitán Grant",
  "El faro del fin del mundo"
];

const exploration = [
  "Cinco semanas en globo",
  "Una ciudad flotante",
  "La isla misteriosa"
];

const survival = [
  "Dos años de vacaciones",
  "Escuela de Robinsones"
];

const mystery = [
  "El castillo de los Cárpatos"
];

const actionThrillers = [
  "Las tribulaciones de un chino en China"
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

function getCardClick(){
  const gridElementos = document.getElementsByClassName("grid");
  for(let i = 0; i < gridElementos.length; i++){
    gridElementos[i].addEventListener("click", (numCard)=>{
      const texto = numCard.currentTarget.textContent
      if (i === 0){
        let data = obtenerLibrosVerne(scienceFiction)
        data.then(libros => {
          libros.forEach(libro => console.log(libro.titulo, "\n",libro.resumen,"\n",libro.imagen))
          const ficcion = document.getElementById("card__ficcion");
          libros.forEach(libro => {
            const libroCard = document.createElement("libro-card");
            libroCard.setAttribute("titulo", libro.titulo);
            libroCard.setAttribute("resumen", libro.resumen);
            libroCard.setAttribute("imagen", libro.imagen);
            ficcion.appendChild(libroCard);
          })
        })
      }else if (i === 1){
        epicJourneys.forEach(libro => console.log(libro))
        obtenerLibrosVerne(epicJourneys)
      }else if (i === 2){
        exploration.forEach(libro => console.log(libro))
        obtenerLibrosVerne(exploration)
      }else if (i === 3){
        survival.forEach(libro => console.log(libro))
        obtenerLibrosVerne(survival)
      }else if (i === 4){
        mystery.forEach(libro => console.log(libro))
        obtenerLibrosVerne(mystery)
      }else if (i === 5){
        actionThrillers.forEach(libro => console.log(libro))
        obtenerLibrosVerne(actionThrillers)
      }
    })
  }
}
getCardClick()


class libro extends HTMLElement{
  constructor(){
    super();
    const shadowRoot = this.attachShadow({mode: "open"});
  }
  connectedCallback(){
    const titulo = this.getAttribute("titulo") || "Título desconocido";
    const resumen = this.getAttribute("resumen") || "Sin descripción.";
    const imagen = this.getAttribute("imagen") || "https://via.placeholder.com/400x600?text=Sin+Imagen";
    this.shadowRoot.innerHTML = `
      <style>
        .grid {
          width: 90vh;
          display: flex;
          flex-flow: row wrap;
          gap: 1rem;
          margin-top: 1rem;
        }
        .card {   
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 1rem;
          background-color: #fff;
          border-radius: 15px;
          box-shadow: 0px 0px 5px cyan;
        }
        .card img {
          width: 100%;
          height: auto;
          border-radius: 10px;
          margin-bottom: 1rem;
        }
        .card h2 {
          font-size: 1.5rem;
          margin: 0.5rem 0;
        }
        .card p {
          font-size: 1rem;
          text-align: center;
        }
      </style>
      <div class="card">  
        <img src="${imagen}" alt="${titulo}">
        <h2>${titulo}</h2>
        <p>${resumen}</p> 
      </div>
    `;
  } 
}
customElements.define("libro-card", libro); 