import EntranceForm from './EntranceForm';
import { useState } from 'react';

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <EntranceForm title="Вход" text={props.isLoading ? 'Выполняем вход...' : 'Войти'}>
            <input
                type="email"
                className="popup__data popup__data_type_name"
                name="email"
                placeholder="Email"
                required
                minLength="2"
                maxLength="40"
                value={email}
            />
            <span className="popup__reminder popup__reminder_type_name"></span>
            <input
                type="password"
                className="popup__data popup__data_type_description"
                name="description"
                placeholder="Пароль"
                required
                minLength="2"
                maxLength="200"
                value={password}
            />
            <span className="popup__reminder popup__reminder_type_description"></span>
        </EntranceForm>
    );
}
