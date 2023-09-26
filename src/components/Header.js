import logo from '../images/header-logo.svg';
import { Link, useLocation } from 'react-router-dom';
export default function Header(props) {
    const location = useLocation();
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип с надписью Место Россия" />
            <nav className="header__user-data">
                {props.isLoggedIn ? (
                    <>
                        <p className="header__email">{props.email}</p>
                        <button className="header__sign-out" onClick={props.onSignOut}>
                            Выйти
                        </button>
                    </>
                ) : (
                    (location.pathname === '/sign-up' && (
                        <Link to="/sign-in" className="header__link">
                            Войти
                        </Link>
                    )) ||
                    (location.pathname === '/sign-in' && (
                        <Link to="/sign-up" className="header__link">
                            Регистрация
                        </Link>
                    ))
                )}
            </nav>
        </header>
    );
}
