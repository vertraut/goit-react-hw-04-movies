import { useState, useEffect } from 'react';

import { useRouteMatch } from 'react-router-dom';

import * as moviesAPI from '../../ApiServises/themoviedb';
import status from '../../status';

import SearchBar from '../SearchBar';
import List from '../List';

export default function SearchFilm() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [currentStatus, setCurrentStatus] = useState(status.IDLE);

  useEffect(() => {
    if (query === '') return;
    setCurrentStatus(status.PENDING);
    setInterval(() => {
      moviesAPI
        .fetchMovieByKeyword(query)
        .then(({ results }) => setMovies(results))
        .then(() => setCurrentStatus(status.RESOLVED));
    }, 2000);
  }, [query]);

  const { url } = useRouteMatch();

  const searchResult = () => {
    if (currentStatus === status.IDLE) {
      return <p>Ждем, пока юзер сделает запрос</p>;
    }

    if (currentStatus === status.PENDING) {
      return <p>Обрабатываем запрос пользователя</p>;
    }

    if (currentStatus === status.RESOLVED) {
      return (
        <List title={`Results for "${query}"`} array={movies} baseUrl={url} />
      );
    }
  };

  return (
    <div>
      <SearchBar onSubmit={setQuery} />
      {searchResult()}
    </div>
  );
}
