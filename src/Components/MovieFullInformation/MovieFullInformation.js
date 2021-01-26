import { useState, useEffect } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';

import BackBtn from '../BackBtn';
import MovieDetails from './MovieDetails';
import AdditionalInformation from './AdditionalInformation';

import Spinner from '../Spinner';
import * as moviesAPI from '../../Servises/ApiServises/themoviedb';
import status from '../../status';

export default function MovieFullInformation() {
  const { movieID } = useParams();
  const location = useLocation();
  const history = useHistory();

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

  //проверяет наличие location.state.from
  const isLocationStateFrom = () => {
    if (location && location.state && location.state.from) {
      return true;
    }
    return false;
  };

  //есть ли переданное название кнопки?
  const btnGoBackTitle = () => {
    if (isLocationStateFrom() && location.state.from.title) {
      return location.state.from.title;
    }
    return 'Back to home';
  };

  //Есть ли location.state.from, чтобы передать его как проп для актеров и отзывов
  const linkState = () => {
    if (isLocationStateFrom()) {
      return location.state.from;
    }
    return null;
  };

  const onGoBack = () => {
    if (isLocationStateFrom() && location.state.from.location) {
      history.push(location.state.from.location);
      return;
    }
    history.push('/');
  };

  if (currentStatus === status.PENDING) {
    return <Spinner />;
  }

  if (currentStatus === status.REJECTED) {
    return <div>{`Возникла ошибка ${error}`}</div>;
  }

  if (currentStatus === status.RESOLVED) {
    return (
      <div>
        <BackBtn title={btnGoBackTitle()} onClick={onGoBack} />
        <MovieDetails movie={movie} />
        <AdditionalInformation title={movie.title} linkState={linkState()} />
      </div>
    );
  }
}
