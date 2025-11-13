// Date inițiale – câteva filme de exemplu
let movies = [
    {
        id: 1,
        title: "Inception",
        year: 2010,
        genre: "SF",
        rating: 8.8,
        description: "Un hoț care fură secrete din subconștient prin intermediul tehnologiei viselor este angajat pentru o misiune inversă: să implanteze o idee."
    },
    {
        id: 2,
        title: "The Dark Knight",
        year: 2008,
        genre: "Acțiune",
        rating: 9.0,
        description: "Batman se confruntă cu Joker, un criminal genial care dorește să arunce Gotham în haos."
    },
    {
        id: 3,
        title: "Interstellar",
        year: 2014,
        genre: "SF",
        rating: 8.6,
        description: "Un grup de astronauți călătorește printr-o gaură de vierme în căutarea unei noi case pentru omenire."
    },
    {
        id: 4,
        title: "Inside Out",
        year: 2015,
        genre: "Animație",
        rating: 8.1,
        description: "Emoțiile personificate ale unei fetițe încearcă să o ajute să facă față unei mari schimbări în viața ei."
    },
    {
        id: 5,
        title: "Forrest Gump",
        year: 1994,
        genre: "Dramă",
        rating: 8.8,
        description: "Povestea extraordinară a vieții lui Forrest Gump, un om cu un IQ scăzut dar cu o inimă mare."
    }
];

let filteredMovies = [...movies];
let selectedMovieId = null;

// Referințe la elementele din DOM
const movieListEl = document.getElementById("movieList");
const movieDetailsEl = document.getElementById("movieDetails");
const searchInputEl = document.getElementById("searchInput");
const genreFilterEl = document.getElementById("genreFilter");
const addMovieFormEl = document.getElementById("addMovieForm");

// Funcție de randare a listei de filme
function renderMovieList() {
    movieListEl.innerHTML = "";

    if (filteredMovies.length === 0) {
        movieListEl.innerHTML = "<li>Nu există filme care să corespundă filtrului.</li>";
        movieDetailsEl.innerHTML = "<p>Selectează un alt filtru sau adaugă un film nou.</p>";
        return;
    }

    filteredMovies.forEach(movie => {
        const li = document.createElement("li");
        li.className = "movie-item";
        li.dataset.id = movie.id;

        li.innerHTML = `
            <div class="movie-item-title">${movie.title}</div>
            <div class="movie-item-meta">
                <span>${movie.year}</span> · 
                <span>${movie.genre}</span> · 
                <span>⭐ ${movie.rating}</span>
            </div>
        `;

        li.addEventListener("click", () => {
            selectedMovieId = movie.id;
            renderMovieDetails(movie.id);
        });

        movieListEl.appendChild(li);
    });

    // Dacă nu e selectat nimic, selectăm primul film din listă
    if (!selectedMovieId && filteredMovies.length > 0) {
        selectedMovieId = filteredMovies[0].id;
        renderMovieDetails(selectedMovieId);
    }
}

// Funcție de afișare detalii film
function renderMovieDetails(movieId) {
    const movie = movies.find(m => m.id === movieId);
    if (!movie) {
        movieDetailsEl.innerHTML = "<p>Filmul nu a fost găsit.</p>";
        return;
    }

    movieDetailsEl.innerHTML = `
        <div class="movie-title">${movie.title}</div>
        <p>
            <span class="badge">${movie.year}</span>
            <span class="badge">${movie.genre}</span>
            <span class="badge">⭐ ${movie.rating}</span>
        </p>
        <p style="margin-top: 0.5rem;">${movie.description}</p>
    `;
}

// Funcție de aplicare filtre (căutare + gen)
function applyFilters() {
    const searchText = searchInputEl.value.toLowerCase();
    const selectedGenre = genreFilterEl.value;

    filteredMovies = movies.filter(movie => {
        const matchesText = movie.title.toLowerCase().includes(searchText);
        const matchesGenre = selectedGenre === "toate" || movie.genre === selectedGenre;
        return matchesText && matchesGenre;
    });

    selectedMovieId = null;
    renderMovieList();
}

// Gestionare formular adăugare film
addMovieFormEl.addEventListener("submit", event => {
    event.preventDefault();

    const title = document.getElementById("titleInput").value.trim();
    const year = parseInt(document.getElementById("yearInput").value, 10);
    const genre = document.getElementById("genreInput").value;
    const rating = parseFloat(document.getElementById("ratingInput").value);
    const description = document.getElementById("descriptionInput").value.trim();

    if (!title || !year || !genre || !rating || !description) {
        alert("Te rog completează toate câmpurile.");
        return;
    }

    const newMovie = {
        id: Date.now(), // id unic simplu
        title,
        year,
        genre,
        rating,
        description
    };

    movies.push(newMovie);

    // Reset formular
    addMovieFormEl.reset();

    // Reaplicăm filtrele curente
    applyFilters();

    // Selectăm automat filmul adăugat
    selectedMovieId = newMovie.id;
    renderMovieDetails(selectedMovieId);

    alert("Filmul a fost adăugat în listă (în memoria paginii).");
});

// Evenimente input pentru filtre
searchInputEl.addEventListener("input", applyFilters);
genreFilterEl.addEventListener("change", applyFilters);

// Inițializare
applyFilters();
