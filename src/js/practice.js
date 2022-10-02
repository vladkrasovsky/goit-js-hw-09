// Написати функцію getFilmsDescriptionByQuery
// яка буде приймати query і повертати ПОВНИЙ опис для знайдених фільмів

// themoviedb API повертає масив фільмів при пошуку по квері, але там не повна інформація,
// тому нам потрібно зробити запит за фільмами по пошуковому слову

// потім отримавшии масив всіх знайдений фільмів забрати їх айдішніки
// і за допомогою Promise.all зробити запит за кожним фільмом по його айдішніку

// отримавши потрібні дані, зарендеріть фільми в список movies (створіть в HTML ul з классом movies)

// скріншот приблизного вигляду списка фільмів https://prnt.sc/JpsuSfNFDuDX

// Дані для запиту за фільмами

const URL = 'https://api.themoviedb.org';
const API_KEY = '1a277fcd67d620e5e54e2f4f933a05d4';
const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/w500';

// url для пошука фільмів по query `${URL}/3/search/movie?api_key=${API_KEY}&query=${query}&page=1`
// url для пошука повної інформації по фільму за його айдішніком `${URL}/3/movie/${movieId}?api_key=${API_KEY}`
// BASE_POSTER_URL базова урла до якої потрібно додати poster_path щоб отримати повний шлях до постера

const refs = {
  moviesList: document.querySelector('.movies'),
  searchForm: document.querySelector('.search-form'),
};

const handleSearchFormSubmit = e => {
  e.preventDefault();
  const { search } = e.currentTarget;
  getFilmsDescriptionByQuery(search.value);
};

refs.searchForm.addEventListener('submit', handleSearchFormSubmit);

const movieItemMarkup = item => {
  const productionCompaniesMarkup = item.production_companies
    .map(
      company =>
        `<li class="production-companies-item-name">${company.name}</li>`
    )
    .join('');

  return `<li class="movies-item">
      <h3 class="movie-original-title">${item.original_title}</h3>
      <img class="movie-image" src="${
        BASE_POSTER_URL + item.poster_path
      }" alt="" >
      <p class="movie-status">Status: ${item.status}</p>
      <p class="movie-overview">${item.overview}</p>
      <p class="movie-vote-average">Vote average: ${item.vote_average}</p>
      <p class="movie-runtime">Runtime: ${item.runtime} minutes</p>
      <p>Production companies:</p>
      <ul class="movie-production-companies">
          ${productionCompaniesMarkup}
      </ul>
  </li>`;
};

const renderMoviesItems = items => {
  refs.moviesList.innerHTML = items.map(movieItemMarkup).join('');
};

const getFilmByID = movieId =>
  fetch(`${URL}/3/movie/${movieId}?api_key=${API_KEY}`).then(res => res.json());

const getFilmsDescriptionByQuery = query => {
  fetch(`${URL}/3/search/movie?api_key=${API_KEY}&query=${query}&page=1`)
    .then(res => res.json())
    .then(({ results }) => {
      const promises = results.map(item => {
        return getFilmByID(item.id);
      });

      Promise.all(promises).then(renderMoviesItems);
    })
    .catch();
};

// getFilmsDescriptionByQuery('Batman');
