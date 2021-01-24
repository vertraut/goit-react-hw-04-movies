import React from 'react';
import { Link } from 'react-router-dom';

import s from './List.module.css';
import noPoster from '../../img/no_poster.jpg';

export default function List({ title, array, baseUrl = '/movies' }) {
  //
  //

  const poster = poster => {
    if (!poster) {
      return noPoster;
    }
    return `https://www.themoviedb.org/t/p/w220_and_h330_face${poster}`;
  };

  return (
    <div>
      <h2>{title}</h2>
      <ul className={s.list}>
        {array.map(item => {
          return (
            <li key={item.id} className={s.movie}>
              <Link to={`${baseUrl}/${item.id}`} className={s.link}>
                <img
                  src={poster(item.poster_path)}
                  alt={item.title}
                  className={s.img}
                />
                <h3> {item.title}</h3>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
