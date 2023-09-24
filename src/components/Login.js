import EntranceForm from './EntranceForm';
import { useState } from 'react';

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    function handleEmailChange(evt) {
        setEmail(evt.target.value);
    }
    function handlePasswordChange(evt) {
        setPassword(evt.target.value);
    }
    function handleSubmit(evt) {
        evt.preventDefault();
        if (!email || !password) {
            return;
        }
        props.onSubmit(password, email);
    }
    return (
        <EntranceForm
            title="Вход"
            text={props.isLoading ? 'Выполняем вход...' : 'Войти'}
            onSubmit={handleSubmit}
        >
            <input
                type="email"
                className="popup__data entrance-form__data"
                name="email"
                placeholder="Email"
                required
                minLength="2"
                maxLength="40"
                value={email}
                onChange={handleEmailChange}
            />
            <span className="popup__reminder entrance-form__reminder"></span>
            <input
                type="password"
                className="popup__data entrance-form__data"
                name="password"
                placeholder="Пароль"
                required
                minLength="2"
                maxLength="200"
                value={password}
                onChange={handlePasswordChange}
            />
            <span className="popup__reminder entrance-form__reminder"></span>
        </EntranceForm>
    );
}
