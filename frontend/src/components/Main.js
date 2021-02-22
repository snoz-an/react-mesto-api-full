import editButton from '../images/edit__button.svg'
import addButton from '../images/add__button.svg'
import React from 'react';
import Card from './Card'
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return(
        <>
        <main>
            <section className="profile">   
                <div className="profile__container">     
                    <img src={currentUser.avatar} alt="аватар" className="profile__avatar"/>
                    <button type="button" className="profile__avatar-button"  onClick={props.onEditAvatar}></button>
                        <div className="profile__info">
                            <div className="profile__info-container"><h1 className="profile__name">{currentUser.name}</h1>
                                <button type="button" className="profile__edit-button" onClick={props.onEditProfile}>
                                    <img src={editButton} alt="ручка" className="profile__edit-button-vector"/>
                                </button>
                            </div>
                            <p className="profile__activity">{currentUser.about}</p>          
                        </div>
                </div>
                <button type="button" className="profile__add-button"  onClick={props.onAddPlace}>
                    <img src={addButton} alt="добавить" className="profile__add-button-vector"/>
                </button>
            </section>    
        </main>

        <div id="elementsTemplate">
            <div className="elements cards">
              {props.cards.map((card)=> (
                <Card key={card._id} cardData={card} onCardClick={props.onCardClick} 
                onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
               )
               )}
            </div>
        </div> 
        </> 
    ) 
}

export default Main
