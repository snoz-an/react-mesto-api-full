import React from 'react';
import PopupWidthForm from './PopupWidthForm';

function EditAvatarPopup(props) {
    const avatarRef = React.useRef()

    React.useEffect(() => {
        avatarRef.current.value = '';
    }, [props.isOpen]);

    function handleAvatarSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            avatar: avatarRef.current.value
        });
    }

return (
    <PopupWidthForm  isOpen={props.isOpen} onClose={props.onClose} onUpdateUser={props.onUpdateUser} name="popupAvatar" title="Обновить аватар" textBtn="Сохранить" onSubmit={handleAvatarSubmit}>
        
               <input required name="avatar-url" placeholder="Ссылка на картинку" id="input-url" className="popup__input popup__input_avatar-link" type="url" ref={avatarRef}/>
               <span className="popup__error" id="input-url-error"></span>

    </PopupWidthForm>
)
}

export default EditAvatarPopup