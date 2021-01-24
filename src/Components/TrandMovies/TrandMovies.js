import { useState, useEffect } from 'react';

import * as moviesAPI from '../../ApiServises/themoviedb';

import Spinner from '../Spinner';
import List from '../List';
import status from '../../status';

export default function TrandMovies() {
  const [trandMovies, setTrandMovies] = useState([]);
  const [currentStatus, setCurrentStatus] = useState(status.PENDING);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCurrentStatus(status.PENDING);

    moviesAPI
      .fetchTrandMovies()
      .then(({ results }) => setTrandMovies(results))
      .then(() => setCurrentStatus(status.RESOLVED))
      .catch(error => {
        setError({ error });
        setCurrentStatus(status.REJECTED);
      });
  }, []);

  if (currentStatus === status.RESOLVED) {
    return (
      <>
        <List title="Tranding today" array={trandMovies} />
      </>
    );
  }

  if (currentStatus === status.REJECTED) {
    return <div>{`Возникла ошибка ${error}`}</div>;
  }

  if (currentStatus === status.PENDING) {
    return <Spinner />;
  }
}
