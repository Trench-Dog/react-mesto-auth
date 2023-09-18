import { useContext } from 'react';
import avatar_editor from '../images/profile-edit-image.svg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main(props) {
    const currentUser = useContext(CurrentUserContext);
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container" onClick={props.onEditAvatar}>
                    <img
                        className="profile__avatar"
                        src={currentUser.avatar}
                        alt="Аватар пользователя"
                    />
                    <img className="profile__avatar-editor" src={avatar_editor} />
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <p className="profile__description">{currentUser.about}</p>
                    <button
                        className="profile__edit-button"
                        type="button"
                        aria-label="Редактировать"
                        onClick={props.onEditProfile}
                    ></button>
                </div>
                <button
                    className="profile__add-button"
                    type="button"
                    onClick={props.onAddPlace}
                ></button>
            </section>
            <ul className="places">
                {props.cards.map(card => (
                    <Card
                        card={card}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                        key={card._id}
                    />
                ))}
            </ul>
        </main>
    );
}
