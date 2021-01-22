import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import s from './MovieDetail.module.css';
import * as moviesAPI from '../../ApiServises/themoviedb';
import status from '../../status';

export default function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(status.PENDING);

  const { movieID } = useParams();

  useEffect(() => {
    setTimeout(() => {
      moviesAPI
        .fetchMovieDetails(movieID)
        .then(setMovie)
        .then(() => setCurrentStatus(status.RESOLVED));
    }, 0);
  }, [movieID]);

  const getGenres = () => {
    return movie.genres.map(item => item.name).join(', ');
  };

  if (currentStatus === status.PENDING) {
    return <div>Загружаю...</div>;
  }

  if (currentStatus === status.RESOLVED) {
    return (
      <div className={s.card}>
        <div className={s.img}>
          <img
            className={s.poster}
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div>
          <h2 className={s.title}>{movie.title}</h2>
          <p>Raiting: {movie.vote_average}</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h4>Genres</h4>
          <p>{getGenres()}</p>
        </div>
      </div>
    );
  }
}
