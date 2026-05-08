async function obtenerLibrosVerne(arreglo) {
  const base = "https://es.wikipedia.org/w/api.php";
  const librosDeseados = arreglo
  const params = {
    action: "query",
    titles: librosDeseados.join('|'),
    prop: "extracts|pageimages",
    exsentences: "1",
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


function getCardClick(){
  const gridElementos = document.getElementsByClassName("grid");
  for(let i = 0; i < gridElementos.length; i++){
    gridElementos[i].addEventListener("click", () => {
      if (i === 0){
        obtenerLibrosVerne(scienceFiction).then(libros => {
          const ficcion = document.getElementById("card__ficcion");
          libros.forEach(libro => {
            const libroCard = document.createElement("libro-card");
            libroCard.setAttribute("titulo", libro.titulo);
            libroCard.setAttribute("resumen", libro.resumen);
            libroCard.setAttribute("imagen", libro.imagen);
            ficcion.appendChild(libroCard);
          });
        });
      } else if (i === 1){
        obtenerLibrosVerne(epicJourneys).then(libros => {
          const epic = document.getElementById("card__epica");
          libros.forEach(libro => {
            const libroCard = document.createElement("libro-card");
            libroCard.setAttribute("titulo", libro.titulo);
            libroCard.setAttribute("resumen", libro.resumen);
            libroCard.setAttribute("imagen", libro.imagen);
            epic.appendChild(libroCard);
          });
        });
      } else if (i === 2){
        obtenerLibrosVerne(exploration).then(libros => {
          const explorationCard = document.getElementById("card__exploracion");
          libros.forEach(libro => {
            const libroCard = document.createElement("libro-card");
            libroCard.setAttribute("titulo", libro.titulo);
            libroCard.setAttribute("resumen", libro.resumen);
            libroCard.setAttribute("imagen", libro.imagen);
            explorationCard.appendChild(libroCard);
          });
        });
      } else if (i === 3){
        obtenerLibrosVerne(survival).then(libros => {
          const survivalCard = document.getElementById("card__supervivencia");
          libros.forEach(libro => {
            const libroCard = document.createElement("libro-card");
            libroCard.setAttribute("titulo", libro.titulo);
            libroCard.setAttribute("resumen", libro.resumen);
            libroCard.setAttribute("imagen", libro.imagen);
            survivalCard.appendChild(libroCard);
          });
        });
      } else if (i === 4){
        obtenerLibrosVerne(mystery).then(libros => {
          const mysteryCard = document.getElementById("card__misterio");
          libros.forEach(libro => {
            const libroCard = document.createElement("libro-card");
            libroCard.setAttribute("titulo", libro.titulo);
            libroCard.setAttribute("resumen", libro.resumen);
            libroCard.setAttribute("imagen", libro.imagen);
            mysteryCard.appendChild(libroCard);
          });
        });
      } else if (i === 5){
        obtenerLibrosVerne(actionThrillers).then(libros => {
          const actionThrillersCard = document.getElementById("card__aventura");    
          libros.forEach(libro => {
            const libroCard = document.createElement("libro-card");
            libroCard.setAttribute("titulo", libro.titulo);
            libroCard.setAttribute("resumen", libro.resumen);
            libroCard.setAttribute("imagen", libro.imagen);
            actionThrillersCard.appendChild(libroCard);
          });
        });
      }
    });
  }
}
getCardClick()

class libro extends HTMLElement{
  static get observedAttributes(){
    return ['view'];
  }
  constructor(){
    super();
  }
  connectedCallback(){
    const shadowRoot = this.attachShadow({mode: "open"});
    const titulo = document.createElement("h3")
    const title = this.getAttribute("titulo") 
    titulo.textContent = title;
    const resumen = document.createElement("p")
    const description = this.getAttribute("resumen")
    resumen.textContent = description;
    const imagen = document.createElement("img")
    const image = this.getAttribute("imagen")
    const content = document.createElement("div")
    content.className = "content"
    const btnImagen = document.createElement("button")
    btnImagen.textContent = "Ver imagen"
    btnImagen.type = "button"
    btnImagen.className = "btn-imagen"
    btnImagen.addEventListener('click', () => {
      if (image) window.open(image, '_blank');
    });
    const style = document.createElement("style")
    style.textContent = `
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 400px;
        height: 26rem;
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        overflow: hidden;
      }
      .content {
        padding: 1rem;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      img {
        width: 100%;
        height: 14rem;
        object-fit: cover;
      }
      .btn-imagen {
        margin-top: 1rem;
        padding: 0.75rem 1rem;
        border: none;
        border-radius: 999px;
        background: #1f5a8a;
        color: white;
        font-weight: 700;
        cursor: pointer;
        transition: background 0.2s ease;
      }
      .btn-imagen:hover {
        background: #163f5d;
      }
      :host([view="images"]) .content {
        display: none;
      }
      :host([view="text"]) img {
        display: none;
      }
      h3 {
        font-size: 1.3em;
        margin: 0 0 0.5rem;
      }
      p {
        font-size: 0.95em;
        color: #555;
        margin: 0;
        line-height: 1.4;
      }
    ` 
    shadowRoot.appendChild(style);
    imagen.src = image;
    imagen.alt = title;
    content.appendChild(titulo);
    content.appendChild(resumen);
    content.appendChild(btnImagen);
    shadowRoot.appendChild(content);
    shadowRoot.appendChild(imagen);
  } 
}
customElements.define("libro-card", libro); 