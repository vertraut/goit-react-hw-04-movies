import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import MovieDetails from './MovieDetails';
import AdditionalInformation from './AdditionalInformation';

import Spinner from '../Spinner';
import * as moviesAPI from '../../ApiServises/themoviedb';
import status from '../../status';

export default function MovieFullInformation() {
  const { movieID } = useParams();

  const [movie, setMovie] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(status.PENDING);
  const [error, setError] = useState(null);

  useEffect(() => {
    moviesAPI
      .fetchMovieDetails(movieID)
      .then(setMovie)
      .then(() => setCurrentStatus(status.RESOLVED))
      .catch(error => {
        setError({ error });
        setCurrentStatus(status.REJECTED);
      });
  }, [movieID]);

  if (currentStatus === status.PENDING) {
    return <Spinner />;
  }

  if (currentStatus === status.REJECTED) {
    return <div>{`Возникла ошибка ${error}`}</div>;
  }

  if (currentStatus === status.RESOLVED) {
    return (
      <div>
        <MovieDetails movie={movie} />
        <AdditionalInformation title={movie.title} />
      </div>
    );
  }
}
