import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

import s from './Cast.module.css';

import status from '../../status';
import * as moviesAPI from '../../ApiServises/themoviedb';

export default function Cast({ movieID }) {
  const [cast, setCast] = useState([]);
  const [currentStatus, setCurrentStatus] = useState(status.PENDING);
  const [error, setError] = useState(null);

  const photoUrl = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2';

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

  // console.log('-', useParams());

  const listGenerate = () => {
    return cast.map(person => {
      //
      const src = person.profile_path
        ? `${photoUrl}${person.profile_path}`
        : 'https://img2.freepng.ru/20180521/ocp/kisspng-computer-icons-user-profile-avatar-french-people-5b0365e4f1ce65.9760504415269493489905.jpg';

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
