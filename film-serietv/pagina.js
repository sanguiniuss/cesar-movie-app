const API_KEY = '137c9cd5b77f80c5567f75968f31542c';  
const BASE_URL = 'https://api.themoviedb.org/3/movie/popular';

async function getPopularMovies() {
    try {
        const response1 = await fetch(`${BASE_URL}?api_key=${API_KEY}&language=it-IT&page=1`);
        const response2 = await fetch(`${BASE_URL}?api_key=${API_KEY}&language=it-IT&page=2`);

        if (!response1.ok || !response2.ok) throw new Error('Errore nel recupero dei dati');

        const dati1 = await response1.json();
        const dati2 = await response2.json();

        const tuttiIFilm = [...dati1.results, ...dati2.results];

        mostraCarosello(tuttiIFilm.slice(0, 10));
        mostraGriglia(tuttiIFilm.slice(10, 40));
    } catch (errore) {
        console.error('Errore:', errore);
        document.getElementById('listaFilm').innerHTML = 'Errore: ' + errore.message;
    }
}

function mostraCarosello(film) {
    const contenitore = document.getElementById('listaFilm');
    contenitore.innerHTML = '';

    film.forEach(pellicola => {
        const elemento = document.createElement('div');
        elemento.classList.add('elementoFilm');
        elemento.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w300${pellicola.poster_path}" alt="${pellicola.title}">
        `;
        contenitore.appendChild(elemento);
    });

    const sinistra = document.querySelector('.pulsanteCarosello.sinistra');
    const destra = document.querySelector('.pulsanteCarosello.destra');

    if (sinistra && destra) {
        sinistra.addEventListener('click', () => {
            contenitore.scrollBy({ left: -400, behavior: 'smooth' });
        });
        destra.addEventListener('click', () => {
            contenitore.scrollBy({ left: 400, behavior: 'smooth' });
        });
    }
}

function mostraGriglia(film) {
    const griglia = document.getElementById('grigliaFilm');
    griglia.innerHTML = '';

    film.forEach(pellicola => {
        const elemento = document.createElement('div');
        elemento.classList.add('elementoFilm');
        elemento.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w300${pellicola.poster_path}" alt="${pellicola.title}">
        `;
        griglia.appendChild(elemento);
    });
}

getPopularMovies();
