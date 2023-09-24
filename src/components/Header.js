import logo from '../images/header-logo.svg';
export default function Header(props) {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип с надписью Место Россия" />
            <nav className="header__user-data"></nav>
        </header>
    );
}
