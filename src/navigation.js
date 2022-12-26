searchFormBtn.addEventListener('click',()=> {
    location.hash = `#search=${searchFormInput.value}`;
});

trendingBtn.addEventListener('click',()=>{
    location.hash = '#trends';
});

arrowBtn.addEventListener('click',()=>{
    history.back();
});

window.addEventListener('DOMContentLoaded',navigator,false);
window.addEventListener('hashchange',navigator,false);

function navigator(){
    if(location.hash.startsWith('#trends')){

        treendsPage();

    }else if(location.hash.startsWith('#search=')){

        searchPage();

    }else if(location.hash.startsWith('#movie=')){

        moviePage();

    }else if(location.hash.startsWith('#category=')){

        categoryPage();

    }else{

        homePage();
    }

    window.scroll(0,0); // POSICIONAMOS LA PAGINA EN LA PARTE SUPERIOR
}

function homePage(){

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMoviesPreview();
    getCategoriesPreview();
}

function searchPage(){
    console.log('estas en search');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    headerTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    arrowBtn.classList.remove('header-arrow--white');

    const [_,query] = location.hash.split('=');

    getMoviesBySearch(query);
}

function categoryPage(){
    console.log('estas en category');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    headerCategoryTitle.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_,categoryData] = location.hash.split('=');
    const [categoryId,categoryName] = categoryData.split('-');

    headerCategoryTitle.textContent = categoryName;

    getMovieByCategory(categoryId);
}

function moviePage(){

    headerSection.classList.add('header-container--long');
    //headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerCategoryTitle.classList.add('inactive');
    headerTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    const [_,movieId] = location.hash.split('=');

    getMovieById(movieId);
}

function treendsPage(){
    console.log('estas en trends');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    headerCategoryTitle.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    arrowBtn.classList.remove('header-arrow--white');

    headerCategoryTitle.innerHTML = 'Tendencias';
    getTrendingMovies();
}