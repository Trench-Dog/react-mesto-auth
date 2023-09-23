export default function EntranceForm(props) {
    return (
        <div className="entrance-form">
            <h2 className="popup__title entrance-form__title">{props.title}</h2>
            <form className="popup__form">
                {props.children}
                <button className="popup__save-button" type="submit">
                    {props.text}
                </button>
            </form>
        </div>
    );
}
