import { useParams, Route, NavLink, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import s from './AdditionalInformation.module.css';

import Cast from '../../Cast';
import Reviews from '../../Reviews';

export default function AdditionalInformation({ title }) {
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
        <Reviews movieID={movieID} title={title} />
      </Route>
    </>
  );
}

AdditionalInformation.propTypes = { title: PropTypes.string.isRequired };
