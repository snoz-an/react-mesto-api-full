import React from 'react';
import PopupWidthForm from './PopupWidthForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

    const [name, setName ] = React.useState('');
    const [description, setDescription ] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }  

    const currentUser = React.useContext(CurrentUserContext);
    
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [props.isOpen]); 

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
          name,
          about: description
        });
    } 
    
    return (
        <PopupWidthForm isOpen={props.isOpen} onClose={props.onClose} name="popupEdit" title="Редактировать профиль" textBtn="Сохранить" onSubmit={handleSubmit}>
        <>
           <input value={name || ""} onChange={handleChangeName} required minLength="2" maxLength="40" type="text" name="name" placeholder="Имя" id="input-name" className="popup__input popup__input_name" type="text" />
           <span className="popup__error" id="input-name-error"></span>
           <input value={description || ""} onChange={handleChangeDescription} required minLength="2" maxLength="200" type="text" name="activity" placeholder="О себе" id="input-activity" className="popup__input popup__input_activity" type="text" />
           <span className="popup__error" id="input-activity-error"></span>
        </>
        </PopupWidthForm>
    )
}

export default EditProfilePopup