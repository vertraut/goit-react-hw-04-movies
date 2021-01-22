const API_KEY = '012d55b548e18985b02a233c2db23101';
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchWithErrorHandling(url = '', config = {}) {
  const responce = await fetch(url, config);
  return responce.ok
    ? await responce.json()
    : Promise.reject(new Error('Not Found'));
}
//список самых популярных фильмов на сегодня
export const fetchTrandMovies = () => {
  return fetchWithErrorHandling(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`,
  );
};

//поиск кинофильма по ключевому слову
export const fetchMovieByKeyword = query => {
  return fetchWithErrorHandling(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`,
  );
};

//запрос полной информации о фильме
export const fetchMovieDetails = movieId => {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`,
  );
};

//запрос информации о актёрском составе
export const fetchMovieCast = movieId => {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`,
  );
};

//запрос обзоров
export const fetchMovieReviews = movieId => {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`,
  );
};
