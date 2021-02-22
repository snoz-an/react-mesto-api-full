function infoTooltip(props) {

    return(
        <section className={`popup ${props.isOpen? "popup_opened": ""}`}  id={props.name}>   
            <div className="popup__container"> 
                <div className="popup__infotooltip">
                        <img alt="popup__response" className="popup__response" src={props.image}></img>
                        <h2 className="popup__infotooltip-title">{props.message}</h2>
                </div>
                <button className="popup__close" type="button" onClick={props.onClose}></button>
            </div>
        </section>
    )
}

export default infoTooltip