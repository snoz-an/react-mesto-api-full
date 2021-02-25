import React from 'react';
import { Route, Switch, Redirect, withRouter, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWidthForm from './PopupWidthForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import OkResponse from '../images/response-ok.svg';
import ErrResponse from '../images/response-err.svg';
import * as auth from '../utils/auth';

function App() {
  const [isEditProfilePopupOpen, setProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(false)
  const [currentUser, setCurrentUser ] = React.useState({})
  const [cards, setCards] = React.useState([])
  const [isInfoTooltipPopupOpen, setTooltipPopupOpen] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [image, setImage] = React.useState('')
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({
    email: '',
    password: ''
  });
  const history = useHistory();

  React.useEffect(() => {
    tokenCheck();
  }, []);

   React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if ( token ){
      const token = localStorage.getItem('jwt');
      Promise.all([ api.getUserProfile(token), api.getInitialCards(token) ])
        .then( ([res, data]) => {
          setCurrentUser(res)
          setCards(data)
        })
        .catch((err) => console.log(err))
    }
  }, [loggedIn]); 

  const handleRegister = (data) => {
    const {email, password} = data;
    return auth.register(email, password)
      .then(() => {
        setImage(OkResponse);
        setMessage('Вы успешно зарегистрировались!');
        setTooltipPopupOpen(true);
        history.push('/sign-in')
      })
      .catch((err) => {
        if (err) {
        setImage(ErrResponse);
        setMessage('Что-то пошло не так! Попробуйте еще раз.');
        setTooltipPopupOpen(true);
        }
      })
  }
  
  const handleLogin = (data) => {
    const {email, password} = data;
    return auth.authorize(email, password)
       .then((res) => {
          if(res.token) {
           localStorage.setItem('jwt', res.token)
           tokenCheck()
         }
       })
       .catch((err) => {
          if (err) {
            setImage(ErrResponse);
            setMessage('Что-то пошло не так! Попробуйте еще раз.');
            setTooltipPopupOpen(true);
          }
      })
  }
  
  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    history.push('/sign-in')
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserData({
              "id": res._id,
              "email": res.email
            });
            history.push('/');
          }
        })
        .catch(err => {
          console.log(err);
          history.push('/sign-in');
        });
    }
  }

   /* function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    if (!isLiked) { 
      const token = localStorage.getItem('jwt');
      api.likeCard(!isLiked,card._id, token)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err)=>{
        console.log(err)
        })
      } else {
        const token = localStorage.getItem('jwt');
          api.dislikeCard(card._id, token)
          .then((newCard) => {  
            const newCards = cards.map((c) => c._id === card._id ? newCard : c);
            setCards(newCards);
          })
          .catch((err)=>{
              console.log(err)
            })
          }  
  } */

   function handleCardLike(cardData) {
    const token = localStorage.getItem('jwt');
    const isLiked = cardData.likes.some(i => i === currentUser._id);
    
    api.likeCard(cardData._id, !isLiked, token)
      .then((newCard) => {
       const newCards = cards.map((c) => c._id === cardData._id ? newCard : c);
       /* const newCards = cards.map((c) =>  {
          return (c._id !== cardData._id) });*/
          console.log(newCards)
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      })
  } 


  /*function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) { 
      const token = localStorage.getItem('jwt');
      api.likeCard(card._id, token)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err)=>{
        console.log(err)
        })

      } else {
        const token = localStorage.getItem('jwt');
          api.dislikeCard(card._id, token)
          .then((newCard) => {  
            const newCards = cards.map((c) => c._id === card._id ? newCard : c);
            setCards(newCards);
          })
          .catch((err)=>{
              console.log(err)
            })
          }  
  }*/



  function handleCardDelete(card) {
    const token = localStorage.getItem('jwt');
    api.deleteCard(card._id, token)
    .then(() => {
    // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.filter((c) =>  {
      return (c._id !== card._id) });
      // Обновляем стейт
      setCards(newCards);
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  function handleUpdateUser(data) {
    const token = localStorage.getItem('jwt');
    api.setUserProfile(data, token)
    .then((user)=>{
      setCurrentUser(user.data)
      closeAllPopups();
      })
      .catch((err)=>{
        console.log(err)
      })
  }

  function handleUpdateAvatar(data){
    const token = localStorage.getItem('jwt');
    api.newAvatar(data, token)
    .then((user) =>{
      setCurrentUser(user.data)
      closeAllPopups()
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  function handleAddPlaceSubmit(data){
    const token = localStorage.getItem('jwt');
    api.addNewCard(data, token)
    .then((newCard) => {
      setCards(
        [newCard, ...cards]     
      )
      closeAllPopups()
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  function handleEditProfileClick() {
    setProfilePopupOpen(!isEditProfilePopupOpen)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  } 

  function closeAllPopups() {
    setProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setSelectedCard(false)
    setTooltipPopupOpen(false)
  }

  return (
    <>
    <CurrentUserContext.Provider value={currentUser}>
      <Header userData={userData} loggedIn={loggedIn} onSignOut={handleSignOut} />
      <Switch>
        <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} 
          onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} cards={cards} />
        <Route path="/sign-up">
          <Register onRegister={handleRegister} />
        </Route>

        <Route path="/sign-in">
          <Login onLogin={handleLogin} />
        </Route>
        <Route>
          {loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
        </Route>
      </Switch>
      <Footer />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/> 
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateAvatar} /> 
      <PopupWidthForm name="popupWarning" title="Вы уверены" textBtn="Да" />
      <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} image={image} message={message} />
    </CurrentUserContext.Provider>
    </>
  );
}

export default withRouter(App);
