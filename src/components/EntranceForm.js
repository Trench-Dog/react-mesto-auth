export default function EntranceForm(props) {
    return (
        <div className="entrance-form">
            <h2 className="popup__title entrance-form__title">{props.title}</h2>
            <form className="popup__form entrance-form__content" onSubmit={props.onSubmit}>
                {props.children}
                <button className="popup__save-button entrance-form__submit-button" type="submit">
                    {props.text}
                </button>
            </form>
            {props.confirmation}
        </div>
    );
}
