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
      index: "card__ficcion"
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

  function loading (){
    const loadingText = document.createElement("p")
    loadingText.textContent = "Cargando..."
    return loadingText
  }

  function getCardClick(){
    const gridElementos = document.querySelectorAll(".grid")   
    gridElementos.forEach((e, id) =>{
      const b = category[id]
      let isLoaded = false
      e.addEventListener("click",()=>{
        const boxCard = document.getElementById(b.index)
        if(isLoaded && boxCard.innerHTML !== ''){
          boxCard.innerHTML = ''
          isLoaded = false
          return
        }
        const loadingText = loading()
        e.appendChild(loadingText)
        obtenerLibrosVerne(b.books)
        .then(libros=>{
          e.removeChild(loadingText)
          insertCard(libros, b.index)
          isLoaded = true
        })
        .catch(error =>{
          alert("No se obtuvo ningun dato")
          isLoaded = false
        })
      })
    })
  }

  function insertCard(libros, index){
    const boxCard = document.getElementById(index)
    boxCard.innerHTML = ''
    libros.forEach(libro=>{
      const card = createCard(libro.titulo, libro.resumen, libro.imagen)
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

  function clearCategoryCards(){
    category.forEach(({ index }) => {
      const boxCard = document.getElementById(index)
      if (boxCard) boxCard.innerHTML = ''
    })
  }

  btn = document.getElementById("btnSearch")
  function searchBook(){
    const input = document.getElementById("inSearch")
    const content = input.value.trim()

    if (content === ''){
      alert("Ingrese un nombre para buscar")
      return
    }

    const resultados = all.filter(b => b.toLowerCase().includes(content.toLowerCase()))

    if (resultados.length === 0) {
      alert("Libro no encontrado")
      return
    }

    clearCategoryCards()

    obtenerLibrosVerne(resultados)
      .then(libros => {
        if (!libros || libros.length === 0) {
          alert("No se obtuvieron datos de la API para la búsqueda")
          return
        }

        libros.forEach(libro => {
          const categoria = category.find(cat =>
            cat.books.some(book => book.toLowerCase() === libro.titulo.toLowerCase())
          )

          if (categoria) {
            const boxCard = document.getElementById(categoria.index)
            if (boxCard) {
              boxCard.appendChild(createCard(libro.titulo, libro.resumen, libro.imagen))
            }
          }
        })
      })
      .catch(error => {
        console.error(error)
        alert("No se obtuvo ningún dato")
      })
  } 
  btn.addEventListener("click", searchBook)

  getCardClick()