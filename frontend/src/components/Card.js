import React from 'react';
import Like from '../images/like.svg';
import Delete from '../images/card-delete.svg';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {
    const cardData = props.cardData;
    function handleClick() {
        props.onCardClick(cardData);
    } 

    function handleLikeClick() {
        props.onCardLike(cardData);
    } 

    function handleDeleteClick() {
        props.onCardDelete(cardData);
    } 

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = cardData.owner._id === currentUser._id;
    const isLiked = cardData.likes.some(i => i._id === currentUser._id);

    return(
        <div className="card">
            <img src = {cardData.link} alt={cardData.name} className="card__img" onClick={handleClick} />
            <div className="card__name-container">
                <h3 className="card__name">{cardData.name}</h3>
                    <div className="like__container">
                        <button type="button" className={`like ${isLiked && "like_active"}`} >
                            <img src={Like} alt="лайк" onClick={handleLikeClick}/>
                        </button>
                        <span className="like__counter">{cardData.likes.length}</span>
                    </div>
                    <button type="button" className="card__delete" onClick={handleDeleteClick}>
                        <img src={Delete} style={{display: isOwn? 'block': 'none' }} alt="удалить"/>
                    </button>
            </div>
        </div>
    ) 
}

export default Card