import { NavLink } from 'react-router-dom';
import clsx from 'clsx';  
import css from './Navigation.module.css';
    
const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};
const Navigation = () => {
    return (
        <nav>
            <NavLink to="/" className={buildLinkClass}>
                Home
            </NavLink>
            <NavLink to="/movies" className={buildLinkClass}>
                Movies
            </NavLink>
        </nav>
    )
}   


export default Navigation