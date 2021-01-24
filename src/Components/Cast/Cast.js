import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

import s from './Cast.module.css';

import genderWoman from '../../img/gender_1_woman.png';
import genderMan from '../../img/gender_2_man.png';

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
      return genderWoman;
    }

    return genderMan;
  };

  // console.log('-', useParams());

  const listGenerate = () => {
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
    return <div>Загружаем...</div>;
  }

  if (currentStatus === status.RESOLVED) {
    return <ul className={s.list}>{listGenerate()}</ul>;
  }

  if (currentStatus === status.REJECTED) {
    return <div>{`Возникла ошибка ${error}`}</div>;
  }
}
