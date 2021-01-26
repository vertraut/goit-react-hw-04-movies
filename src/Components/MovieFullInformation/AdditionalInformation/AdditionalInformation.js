import { Route, NavLink, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

import s from './AdditionalInformation.module.css';
import routes from '../../../routes';

import Cast from '../../Cast';
import Reviews from '../../Reviews';

export default function AdditionalInformation({ title, linkState, movieID }) {
  const { url, path } = useRouteMatch();

  const tabsName = ['Cast', 'Reviews'];
  const ComponentCast = tabsName[0];

  return (
    <>
      <ul className={s.list}>
        {tabsName.map((tab, index) => (
          <li key={index}>
            <NavLink
              to={{
                pathname: `${url}${routes[tab.toLowerCase()]}`,
                state: { from: linkState },
              }}
              className={s.link}
              activeClassName={s.activLink}
            >
              {tab}
            </NavLink>
          </li>
        ))}
      </ul>

      <Route path={`${path}${routes.cast}`}>
        <Cast movieID={movieID} />
      </Route>
      <Route path={`${path}${routes.reviews}`}>
        <Reviews movieID={movieID} title={title} />
      </Route>
    </>
  );
}

AdditionalInformation.propTypes = {
  title: PropTypes.string.isRequired,
  linkState: PropTypes.object,
  movieID: PropTypes.string.isRequired,
};
