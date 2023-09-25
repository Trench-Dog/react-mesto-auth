import logo from '../images/header-logo.svg';
import { Link } from 'react-router-dom';
export default function Header(props) {
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
                    (props.location.pathname === '/sign-up' && (
                        <Link to="/sign-in" className="header__link">
                            Войти
                        </Link>
                    )) ||
                    (props.location.pathname === '/sign-in' && (
                        <Link to="/sign-up" className="header__link">
                            Регистрация
                        </Link>
                    ))
                )}
            </nav>
        </header>
    );
}
