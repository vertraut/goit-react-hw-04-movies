import React from 'react';
import { useParams, Route, NavLink, useRouteMatch } from 'react-router-dom';

import s from './AdditionalInformation.module.css';

import Cast from '../Cast';
import Reviews from '../Reviews';

export default function AdditionalInformation() {
  const { movieID } = useParams();
  const { url } = useRouteMatch();
  return (
    <>
      <ul className={s.list}>
        <li>
          <NavLink
            to={`${url}/cast`}
            className={s.link}
            activeClassName={s.activLink}
          >
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`${url}/reviews`}
            className={s.link}
            activeClassName={s.activLink}
          >
            Reviews
          </NavLink>
        </li>
      </ul>

      <Route path={`${url}/cast`} exact>
        <Cast movieID={movieID} />
      </Route>
      <Route path={`${url}/reviews`} exact>
        <Reviews />
      </Route>
    </>
  );
}
