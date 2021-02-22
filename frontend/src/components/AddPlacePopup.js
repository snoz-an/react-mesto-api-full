import React from 'react';
import PopupWidthForm from './PopupWidthForm';

function AddPlacePopup(props) {
    const name = React.useRef()
    const link = React.useRef()

    React.useEffect(() => {
        name.current.value = '';
        link.current.value = '';
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
          name: name.current.value,
          link: link.current.value
        });
      }
    
return(

<PopupWidthForm isOpen={props.isOpen} onClose={props.onClose}  name="popupAdd" title="Новое место" textBtn="Создать" onSubmit={handleSubmit}>
    
       <input ref={name} required minLength="2" maxLength="30" type="text" name="card-name" placeholder="Название" id="input-text" className="popup__input popup__input_card-name"/>
       <span className="popup__error" id="input-text-error"></span>
       <input ref={link} required name="card-url" placeholder="Ссылка на картинку" id="input-url" className="popup__input popup__input_card-link" type="url"/>
       <span className="popup__error" id="input-url-error"></span>

</PopupWidthForm>
)
}

export default AddPlacePopup