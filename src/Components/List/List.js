import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import s from './List.module.css';
import noPoster from '../../img/no_poster.jpg';

export default function List({ title, array, baseUrl = '/movies' }) {
  //
  //
  const location = useLocation();

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
              <Link
                to={{
                  pathname: `${baseUrl}/${item.id}`,
                  state: {
                    from: { location, title },
                  },
                }}
                className={s.link}
              >
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

List.propTypes = {
  title: PropTypes.string.isRequired,
  array: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string,
      title: PropTypes.string.isRequired,
    }),
  ),
};
