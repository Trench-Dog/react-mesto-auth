import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card(props) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(like => like._id === currentUser._id);
    const cardLikeButtonClassName = `place__button ${isLiked && 'place__button_active'}`;
    function handleClick() {
        props.onCardClick(props.card);
    }
    function handleLike() {
        props.onCardLike(props.card, isLiked);
    }
    function handleDelete() {
        props.onCardDelete(props.card._id);
    }
    return (
        <li className="place">
            <img
                className="place__image"
                src={props.card.link}
                alt={props.card.name}
                onClick={handleClick}
            />
            <div className="place__description">
                <h2 className="place__title">{props.card.name}</h2>
                <div className="place__like">
                    <button
                        className={cardLikeButtonClassName}
                        type="button"
                        onClick={handleLike}
                    ></button>
                    <h3 className="place__like-counter">{props.card.likes.length}</h3>
                </div>
            </div>
            {isOwn && (
                <button className="place__delete-button" type="button" onClick={handleDelete} />
            )}
        </li>
    );
}
