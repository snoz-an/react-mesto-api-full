import logo from '../images/Logo.svg';
import { Route, Link } from 'react-router-dom';

function Header({ onSignOut, userData, loggedIn }) {
    return(
        <header className="header">
            <img src={logo} alt="логотип" className="header__logo"/>
            <nav className="header__nav">

              <Route path="/sign-up">
                <Link to="/sign-in" className="header__in-link">Войти</Link>
              </Route>

              <Route path="/sign-in">
                <Link to="/sign-up" className="header__registration-link">Регистрация</Link>
              </Route>

              <Route exact path="/">
                <div className="header__data">
                  {loggedIn && <p className="header__email">{userData.email}</p>}
                  <button className="header__button-out" onClick={onSignOut} type="button">Выйти</button>
                </div>
              </Route>

            </nav>
         </header>
    ) 
}

export default Header