import { Route, NavLink, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

import s from './AdditionalInformation.module.css';
import routes from '../../../routes';

import Cast from '../../Cast';
import Reviews from '../../Reviews';

export default function AdditionalInformation({ title, linkState, movieID }) {
  const { url, path } = useRouteMatch();

  return (
    <>
      <ul className={s.list}>
        <li>
          <NavLink
            to={{
              pathname: `${url}${routes.cast}`,
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
              pathname: `${url}${routes.reviews}`,
              state: { from: linkState },
            }}
            className={s.link}
            activeClassName={s.activLink}
          >
            Reviews
          </NavLink>
        </li>
      </ul>

      <Route path={`${path}${routes.cast}`} exact>
        <Cast movieID={movieID} />
      </Route>
      <Route path={`${path}${routes.reviews}`} exact>
        <Reviews movieID={movieID} title={title} />
      </Route>
    </>
  );
}

AdditionalInformation.propTypes = {
  title: PropTypes.string.isRequired,
  linkState: PropTypes.object,
};
