import { NavLink } from 'react-router-dom';
import clsx from 'clsx';  
import css from './components/Navigation';
    
const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
}   
<nav>
    <NavLink to="/" className={buildLinkClass}>
        Home
    </NavLink>
    <NavLink to="/movies" className={buildLinkClass}>
        Movies
    </NavLink>
</nav>