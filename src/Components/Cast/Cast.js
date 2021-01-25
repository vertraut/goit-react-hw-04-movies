import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import s from './Cast.module.css';
import Spinner from '../Spinner';

import genderWomanImg from '../../img/gender_1_woman.jpg';
import genderManImg from '../../img/gender_2_man.jpg';

import status from '../../status';
import * as moviesAPI from '../../ApiServises/themoviedb';

export default function Cast({ movieID }) {
  const [cast, setCast] = useState([]);
  const [currentStatus, setCurrentStatus] = useState(status.PENDING);
  const [error, setError] = useState(null);

  const photoUrl = 'https://www.themoviedb.org/t/p/w132_and_h132_face';

  useEffect(() => {
    setCurrentStatus(status.PENDING);

    moviesAPI
      .fetchMovieCast(movieID)
      .then(({ cast }) => {
        setCast(cast);
        setCurrentStatus(status.RESOLVED);
      })
      .catch(error => {
        setError({ error });
        setCurrentStatus(status.REJECTED);
      });
  }, [movieID]);

  const genderImg = gender => {
    if (gender === 1) {
      return genderWomanImg;
    }

    return genderManImg;
  };

  const listGenerate = () => {
    if (cast.length === 0) return "We don't have any cast added to this movie.";
    return cast.map(person => {
      //
      const src = person.profile_path
        ? `${photoUrl}${person.profile_path}`
        : genderImg(person.gender);

      return (
        <li key={person.id}>
          <img className={s.img} src={src} alt={person.name} />
          {person.name}
        </li>
      );
    });
  };

  if (currentStatus === status.PENDING) {
    return <Spinner />;
  }

  if (currentStatus === status.RESOLVED) {
    return <ul className={s.list}>{listGenerate()}</ul>;
  }

  if (currentStatus === status.REJECTED) {
    return <div>{`Возникла ошибка ${error}`}</div>;
  }
}

Cast.propTypes = { movieID: PropTypes.string.isRequired };
