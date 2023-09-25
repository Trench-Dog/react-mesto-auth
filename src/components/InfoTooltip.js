import successImage from '../images/popup-success-image.svg';
import errorImage from '../images/popup-error-image.svg';
import { useNavigate } from 'react-router-dom';

export default function InfoTooltip(props) {
    const navigate = useNavigate();
    function closePopup() {
        props.onClose();
        if (props.isSuccess) {
            navigate('/sign-in');
        }
    }
    return (
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_type_status">
                <img
                    className="popup__status-image"
                    src={props.isSuccess ? successImage : errorImage}
                />
                <h2 className="popup__status-message">
                    {props.isSuccess ? props.successText : props.errorText}
                </h2>
                <button
                    className="popup__close-button popup__close-button_type_status"
                    type="button"
                    onClick={closePopup}
                ></button>
            </div>
        </div>
    );
}
