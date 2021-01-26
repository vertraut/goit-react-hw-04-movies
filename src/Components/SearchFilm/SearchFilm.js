import { useState, useEffect } from 'react';

import { useRouteMatch } from 'react-router-dom';

import Spinner from '../Spinner';
import * as moviesAPI from '../../Servises/apiServises/themoviedb';
import status from '../../status';

import SearchBar from './SearchBar';
import List from '../List';

export default function SearchFilm() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [currentStatus, setCurrentStatus] = useState(status.IDLE);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query === '') return;

    setCurrentStatus(status.PENDING);

    moviesAPI
      .fetchMovieByKeyword(query)
      .then(({ results }) => setMovies(results))
      .then(() => setCurrentStatus(status.RESOLVED))
      .catch(error => {
        setError({ error });
        setCurrentStatus(status.REJECTED);
      });
  }, [query]);

  const { url } = useRouteMatch();

  const searchResult = () => {
    if (currentStatus === status.IDLE) {
      return <p>Please enter your query</p>;
    }

    if (currentStatus === status.PENDING) {
      return <Spinner />;
    }
    if (currentStatus === status.REJECTED) {
      return <div>{`Возникла ошибка ${error}`}</div>;
    }

    if (currentStatus === status.RESOLVED) {
      if (movies.length === 0) {
        return 'There are no movies that matched your query.';
      }
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
