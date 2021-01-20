import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={s.navigation}>
      <NavLink to="/" className={s.link} activeClassName={s.activLink}>
        Home
      </NavLink>
      <NavLink to="/movies" className={s.link} activeClassName={s.activLink}>
        Movies
      </NavLink>
    </nav>
  );
}
