import { useState, useEffect } from 'react';

import * as moviesAPI from '../../ApiServises/themoviedb';

import List from '../List';
import status from '../../status';

export default function TrandMovies() {
  const [trandMovies, setTrandMovies] = useState([]);
  const [currentStatus, setCurrentStatus] = useState(status.PENDING);

  useEffect(() => {
    setCurrentStatus(status.PENDING);
    setTimeout(() => {
      moviesAPI
        .fetchTrandMovies()
        .then(({ results }) => setTrandMovies(results))
        .then(() => setCurrentStatus(status.RESOLVED));
    }, 0);
  }, []);

  if (currentStatus === status.RESOLVED) {
    return (
      <>
        <List title="Tranding today" array={trandMovies} />
      </>
    );
  }

  if (currentStatus === status.PENDING) {
    return (
      <>
        <p>Загружаю...</p>
      </>
    );
  }
}
