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
                        <button className="header__sign-out" onClick={props.signOut}>
                            Выйти
                        </button>
                    </>
                ) : (
                    <Link to="/sign-in" className="header__link">
                        Войти
                    </Link>
                )}
            </nav>
        </header>
    );
}
