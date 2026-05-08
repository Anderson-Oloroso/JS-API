async function obtenerLibrosVerne(arreglo) {
  const base = "https://es.wikipedia.org/w/api.php";
  const librosDeseados = arreglo
  const params = {
    action: "query",
    titles: librosDeseados.join('|'),
    prop: "extracts|pageimages",
    exsentences: "3",
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
  "Dueño del mundo"
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

const allBooks = [
  scienceFiction,
  epicJourneys,
  exploration,
  survival,
  mystery,
  actionThrillers
]
const all = []
allBooks.forEach(e=>{
  e.forEach(b=>{
    all.push(b)
  })
})

const category = [
  {
    books: scienceFiction,
    index: "card__fiction"
  },
  {
    books: epicJourneys,
    index: "card__epica"
  },
  {
    books: exploration,
    index: "card__exploracion"
  },
  {
    books: survival,
    index: "card__supervivencia"
  },
  {
    books: mystery,
    index: "card__misterio"
  },
  {
    books: actionThrillers,
    index: "card__aventura"
  }
]
category.forEach(e=>{
  console.log(e)
})
// function getCardClick(){
//   const gridElementos = document.getElementsByClassName("grid");
//   for(let i = 0; i < gridElementos.length; i++){
//     gridElementos[i].addEventListener("click", () => {
//       if (i === 0){
//         obtenerLibrosVerne(scienceFiction).then(libros => {
//           const ficcion = document.getElementById("card__ficcion");
//           libros.forEach(e=>{
//             const card = insertCard(e.titulo, e.resumen, e.imagen)
//             ficcion.appendChild(card)
//           })
//         })
//       } else if (i === 1){
//         obtenerLibrosVerne(epicJourneys).then(libros => {
//           const epic = document.getElementById("card__epica");
//           libros.forEach(e=>{
//             const card = insertCard(e.titulo, e.resumen, e.imagen)
//             epic.appendChild(card)
//           })
//         });
//       } else if (i === 2){
//         obtenerLibrosVerne(exploration).then(libros => {
//           const explorationCard = document.getElementById("card__exploracion");
//           libros.forEach(e=>{
//             const card = insertCard(e.titulo, e.resumen, e.imagen)
//             explorationCard.appendChild(card)
//           })
//         });
//       } else if (i === 3){
//         obtenerLibrosVerne(survival).then(libros => {
//           const survivalCard = document.getElementById("card__supervivencia");
//           libros.forEach(e=>{
//             const card = insertCard(e.titulo, e.resumen,e.imagen)
//             survivalCard.appendChild(card)
//           })
//         });
//       } else if (i === 4){
//         obtenerLibrosVerne(mystery).then(libros => {
//           const mysteryCard = document.getElementById("card__misterio");
//           libros.forEach(e=>{
//             const card = insertCard(e.titulo, e.resumen,e.imagen)
//             mysteryCard.appendChild(card)
//           })
//         });
//       } else if (i === 5){
//         obtenerLibrosVerne(actionThrillers).then(libros => {
//           const actionThrillersCard = document.getElementById("card__aventura");    
//           libros.forEach(e=>{
//             const card = insertCard(e.titulo, e.resumen,e.imagen)
//             actionThrillersCard.appendChild(card)
//           })
//         }  
//     });
//   }
// }
// getCardClick()

function getCardClick(){
  const gridElementos = document.querySelectorAll(".grid")   
  // console.log(gridElementos) 
  // gridElementos.forEach((e, id) =>{
  //   const b = category[id]
  //   e.addEventListener("click",()=>{
  //     obtenerLibrosVerne(b.books)
  //     .then(libros=>{
  //       insertCard(libros, b.index)
  //     .catch(error =>{
  //       alert("No se obtuvo ningun dato")
  //     })
  //     })
  //   })
  // })
  gridElementos.forEach((e, idx)=>{
    e.addEventListener("click", ()=>{
      gridElementos[idx].insertCard()
    })
  })
}

function insertCard(libros, index){
  const boxCard = document.getElementById(index)
  boxCard.innerHTML = ''
  libros.forEach(libro=>{
    const card = insertCard(libro.titulo, libro.resumen, libro.imagen)
    boxCard.appendChild(card)
  })
}

function createCard(titulo, text, img){
  const tituloContent = document.createElement("h3")
  tituloContent.textContent = titulo

  const p = document.createElement("p")
  p.textContent = text

  const enlace = document.createElement("a")
  enlace.textContent = "Ver portada"
  enlace.setAttribute("target", "_blank")
  enlace.href = img
  
  const card = document.createElement("div")
  card.appendChild(tituloContent)
  card.appendChild(p)
  card.appendChild(enlace)
  
  return card
}

getCardClick()