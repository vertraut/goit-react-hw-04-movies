import { useParams, Route, NavLink, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import s from './AdditionalInformation.module.css';

import Cast from '../../Cast';
import Reviews from '../../Reviews';

export default function AdditionalInformation({ title, linkState }) {
  const { movieID } = useParams();
  const { url, path } = useRouteMatch();

  console.log('-', linkState);

  return (
    <>
      <ul className={s.list}>
        <li>
          <NavLink
            to={{
              pathname: `${url}/cast`,
              state: { from: linkState },
            }}
            className={s.link}
            activeClassName={s.activLink}
          >
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink
            to={{
              pathname: `${url}/reviews`,
              state: { from: linkState },
            }}
            className={s.link}
            activeClassName={s.activLink}
          >
            Reviews
          </NavLink>
        </li>
      </ul>

      <Route path={`${path}/cast`} exact>
        <Cast movieID={movieID} />
      </Route>
      <Route path={`${path}/reviews`} exact>
        <Reviews movieID={movieID} title={title} />
      </Route>
    </>
  );
}

AdditionalInformation.propTypes = { title: PropTypes.string.isRequired };
