export default function ImagePopup(props) {
    return (
        <div className={`popup popup_type_image ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_type_image">
                <button
                    className="popup__close-button popup__close-button_type_close-image"
                    type="button"
                    onClick={props.onClose}
                ></button>
                <img className="popup__image" src={props.link} alt={props.name} />
                <h2 className="popup__place-name">{props.name}</h2>
            </div>
        </div>
    );
}
