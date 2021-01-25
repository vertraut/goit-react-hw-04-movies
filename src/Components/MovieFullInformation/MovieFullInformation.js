import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import BackBtn from '../BackBtn';
import MovieDetails from './MovieDetails';
import AdditionalInformation from './AdditionalInformation';

import Spinner from '../Spinner';
import * as moviesAPI from '../../ApiServises/themoviedb';
import status from '../../status';

export default function MovieFullInformation() {
  const { movieID } = useParams();
  const location = useLocation();
  console.log(
    '🚀 ~ file: MovieFullInformation.js ~ line 15 ~ MovieFullInformation ~ location',
    location,
  );

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
        <BackBtn title={location.state.from.title} />
        <MovieDetails movie={movie} />
        <AdditionalInformation title={movie.title} />
      </div>
    );
  }
}
