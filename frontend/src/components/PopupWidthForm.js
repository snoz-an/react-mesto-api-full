function PopupWidthForm(props) {

    return(
        <section className={`popup ${props.isOpen? "popup_opened": ""}`}  id={props.name}>   
            <div className="popup__container"> 
                <form className="popup__form" name={`form-${props.name}`} noValidate onSubmit={props.onSubmit}>  
                    <button type="button" className="popup__close" aria-label="Закрыть попап"  onClick={props.onClose}></button> 
                    <h3 className="popup__header">{props.title}</h3>
                    {props.children}
                    <button type="submit" className="popup__save popup__save_add">{props.textBtn}</button>
                </form>
            </div>
        </section>
    )
}

export default PopupWidthForm