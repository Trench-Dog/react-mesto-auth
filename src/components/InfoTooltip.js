import successImage from '../images/popup-success-image.svg';
import errorImage from '../images/popup-error-image.svg';

export default function InfoTooltip(props) {
    return (
        <div className="popup">
            <div className="popup__container popup__container_type_status">
                <img className="popup__status-image" src={successImage} />
                <h2 className="popup__status-message">{props.successText}</h2>
                <button
                    className="popup__close-button popup__close-button_type_status"
                    type="button"
                    onClick={props.onClose}
                ></button>
            </div>
        </div>
    );
}
