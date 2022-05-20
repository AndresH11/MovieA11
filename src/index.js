// INSTANCIA DE AXIO

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    Headers:{
        'Content-type':'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    }
});

// UTILS

function createMovies(movies,container){

    container.innerHTML = ''; //LIMPIANDO EL CONTENIDO

    movies.forEach(movie => {

        // CREANDO ETIQUETAS
        const div = document.createElement('div');
        const imgPoster = document.createElement('img');

        // CREANDO EVENTO AL CONTENEDOR div

        div.addEventListener('click',()=>{
            location.hash = `#movie=${movie.id}`;
        });
        
        // COLOCANDO CLASES A LAS ETIQUETAS
        div.className = 'movie-container';
        imgPoster.className = 'movie-img';

        //COLOCANDO ALT A LA IMAGEN
        imgPoster.alt = movie.title;

        // COLOCANDO SRC A LA IMAGEN
        imgPoster.src = 'https://image.tmdb.org/t/p/w300/' + movie.poster_path;

        // COLOCANDO imgPoster DENTRO DE LA ETIQUETA div
        div.appendChild(imgPoster);

        // COLOCANDO vid DENTRO DEL PARAMETRO container
        container.appendChild(div);
    });
}

function createCategories(categories,container){

    container.innerHTML = ''; //LIMPIANDO SECCION
    
    categories.genres.forEach(categorie => {

        // CREANDO ETIQUETAS
        const div = document.createElement('div');
        const h3 = document.createElement('h3');

        // COLOCANDO CLASES A LAS ETIQUETAS
        div.className = 'category-container';
        h3.className = 'category-title';

        // AGREGANDO EVENTO A CADA CATEGORIA

        h3.addEventListener('click',()=> location.hash = `#category=${categorie.id}-${categorie.name}`);

        // COLOCANDO ID A LA ETIQUETA h3
        h3.id = 'id' + categorie.id;

        // COLOCANDO EL CONTENIDO DE LA ETIQUETA h3
        h3.textContent = categorie.name;

        // AÑADIMOS LA ETIQUETA h3 DENTRO DE LA ETIQUETA div
        div.appendChild(h3);

        //AÑADIMOS LA ETIQUETA div DENTRO DEL PARAMETRO container
        container.appendChild(div);
    });
}
//FUNCION TRENDGIN MOVIES

const getTrendingMoviesPreview = async()=>{

    const {data}= await api('trending/movie/day');
    const movies = data.results;  // CONSEGUIMOS LA LISTA DE PELICULAS

    createMovies(movies,trendingMoviesPreviewList);
}

// FUNCION LISTA DE CATEGORIA

const getCategoriesPreview = async()=>{

    const {data} = await api('genre/movie/list');

    createCategories(data,categoriesPreviewList);

}

// FUNCION PARA CONSEGUIR LA LISTA DE PELICULAS DE UNA CATEGORIA

const getMovieByCategory = async(id)=>{

    const {data}= await api('discover/movie',{
        params: {
            with_genres: id,
        },
    });

    const movies = data.results;  // CONSEGUIMOS LA LISTA DE PELICULAS
    
    createMovies(movies,genericSection);
}

const getMoviesBySearch = async(query) => {

    const {data}= await api('search/movie',{
        params: {
            query,
        },
    });

    const movies = data.results;  // CONSEGUIMOS LA LISTA DE PELICULAS
    
    createMovies(movies,genericSection);
}

const getTrendingMovies = async()=>{

    const {data}= await api('trending/movie/day');
    const movies = data.results;  // CONSEGUIMOS LA LISTA DE PELICULAS

    createMovies(movies,genericSection);
}

const getMovieById = async(id)=>{

    const {data}= await api(`movie/${id}`);

    const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + data.poster_path;

    headerSection.style.background = `
    
    linear-gradient(
        180deg,
        rgba(0,0,0,0.35) 19.27%,
        rgba(0,0,0,0) 29.17%
    ),
    url(${movieImgUrl})`;

    movieDetailTitle.textContent = data.title;
    movieDetailDescription.textContent = data.overview;
    movieDetailScore.textContent = data.vote_average;

    createCategories(data,movieDetailCategoriesList);
    getRelatedMoviesId(id);
}

const getRelatedMoviesId = async(id) => {
    const {data} = await api(`movie/${id}/similar`);
    const relatedMovies = data.results;

    createMovies(relatedMovies,relatedMoviesContainer);
}