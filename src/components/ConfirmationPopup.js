import PopupWithForm from './PopupWithForm';
export default function ConfirmationPopup(props) {
    function handleSubmit(e) {
        e.preventDefault();
        props.onConfirmDelete(props.cardId);
    }
    return (
        <PopupWithForm
            name="confirm"
            title="Вы уверены?"
            text={props.isLoading ? 'Удаление...' : 'Да'}
            onClose={props.onClose}
            isOpen={props.isOpen}
            onSubmit={handleSubmit}
        ></PopupWithForm>
    );
}
