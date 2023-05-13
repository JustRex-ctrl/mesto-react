import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import apiSetting from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '' });
  const [cards, setCards] = React.useState([]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) { 
    setSelectedCard(card);
  }

  function handleCardDelete(cardId) {
    apiSetting.deleteCard(cardId)
    .then(() => setCards(cards => cards.filter(с => с._id !== cardId)))
    .catch(err => console.log(`Ошибка: ${err.status}`));
}

  function handleUpdateUser(userData) {
    apiSetting.setUserInfo(userData)
    .then(res => {
    setCurrentUser(res);
    closeAllPopups();
  })
}

  function handleUpdateAvatar(avatar) {
    apiSetting.installAvatar(avatar)
    .then((res) => {
    setCurrentUser(res);
    closeAllPopups();
  })
  .catch(err => console.log(`Ошибка: ${err.status}`));
}
  function handleCardLike(card, isLiked) { 
    apiSetting.likeRemove(card._id, isLiked)
    .then((res) => setCards(cards => cards.map(c => c._id === card._id ? res : c)))
    .catch(err => console.log(`Ошибка: ${err.status}`));
}

  function handleAddPlaceSubmit(card) {
    apiSetting.getPlaceCard(card)
    .then(newCard => {
    setCards([newCard, ...cards]);
    closeAllPopups();
  })
  .catch(err => console.log(`Ошибка: ${err.status}`));
}

  function closeAllPopups(){
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  React.useEffect(() => {
    Promise.all([apiSetting.getUserInfo(), apiSetting.getInitialCards()])
    .then(([user, cards]) => {
      setCurrentUser(user);
      setCards(cards);
    })
    .catch(err => console.log(`Ошибка: ${err.status}`));
  },[]);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main 
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onClose={closeAllPopups}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        cards={cards}
      />
      
      <AddPlacePopup 
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <ImagePopup card={selectedCard} closeAllPopups={closeAllPopups} onClose={closeAllPopups}/>

      <Footer/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
