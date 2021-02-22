function ImagePopup(props) {

    return(
        <div className={`popup popup_img ${props.card.link? "popup_opened":""}`}  id="popupImg">
            <div className="popup__container-img"> 
                <img className="popup__img" src={props.card.link} alt="#"/> 
                <div className="popup__img-caption">{props.card.name}</div>
                <button type="button" className="popup__close popup__close-img" aria-label="Закрыть попап" onClick={props.onClose}></button>
            </div>
        </div> 
    )
}

export default ImagePopup