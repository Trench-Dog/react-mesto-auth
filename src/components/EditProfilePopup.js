import { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useContext(CurrentUserContext);
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleNameChange(e) {
        setName(e.target.value);
    }
    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser(name, description);
    }
    return (
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            text={props.isLoading ? 'Сохранение...' : 'Сохранить'}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                className="popup__data popup__data_type_name"
                name="name"
                placeholder="Имя"
                required
                minLength="2"
                maxLength="40"
                onChange={handleNameChange}
                value={name}
            />
            <span className="popup__reminder popup__reminder_type_name"></span>
            <input
                type="text"
                className="popup__data popup__data_type_description"
                name="description"
                placeholder="О себе"
                required
                minLength="2"
                maxLength="200"
                onChange={handleDescriptionChange}
                value={description}
            />
            <span className="popup__reminder popup__reminder_type_description"></span>
        </PopupWithForm>
    );
}
