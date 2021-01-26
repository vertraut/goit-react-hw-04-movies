import PropTypes from 'prop-types';

import noPoster from '../../../img/no_poster.jpg';

import s from './MovieDetail.module.css';

export default function MovieDetails({ movie }) {
  console.log(movie);
  const poster = poster => {
    if (!poster) {
      return noPoster;
    }
    return `https://image.tmdb.org/t/p/w500/${poster}`;
  };

  const year = () => {
    return movie.release_date.split('-', 1);
  };

  const raiting = () => {
    if (movie.vote_average === 0) {
      return;
    }
    return <p>Raiting: {movie.vote_average}</p>;
  };

  const getGenres = () => {
    if (movie.genres <= 0) {
      return;
    }
    return (
      <>
        <h4>Genres</h4>
        <p>{movie.genres.map(item => item.name).join(', ')}</p>
      </>
    );
  };

  return (
    <div className={s.card}>
      <div className={s.img}>
        <img
          className={s.poster}
          src={poster(movie.poster_path)}
          alt={movie.title}
        />
      </div>
      <div>
        <h2 className={s.title}>
          {movie.title} ({year()})
        </h2>

        {raiting()}

        {movie.overview && (
          <>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
          </>
        )}

        {getGenres()}
      </div>
    </div>
  );
}
MovieDetails.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    overview: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      }),
    ),
    vote_average: PropTypes.number.isRequired,
  }),
};
