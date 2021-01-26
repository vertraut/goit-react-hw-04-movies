import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import slugify from '../../Servises/slugify';
import routes from '../../routes';

import s from './List.module.css';
import noPoster from '../../img/no_poster.jpg';

export default function List({ title, array, baseUrl = routes.movies }) {
  //
  //
  const location = useLocation();

  const poster = poster => {
    if (!poster) {
      return noPoster;
    }
    return `https://www.themoviedb.org/t/p/w220_and_h330_face${poster}`;
  };

  const year = movie => {
    return movie.release_date.split('-', 1);
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
                  pathname: `${baseUrl}/${slugify(
                    `${item.title} ${item.id}}`,
                  )}`,
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

                <span>{year(item)}</span>
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
  baseUrl: PropTypes.string,
};
