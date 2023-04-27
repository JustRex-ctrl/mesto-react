import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

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

  function closeAllPopups(){
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  return (
    <body className="page">
      <Header />
      <Main 
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onClose={closeAllPopups}
      />
      <section className="elements"></section>
      
    <PopupWithForm
      isOpen={isAddPlacePopupOpen}
      name="add-card"
      title="Новое место"
      onClose={closeAllPopups}
      buttonText='Сохранить'
    ><input className='popup__input' placeholder="Название" minLength="2" maxLength="30"></input>
     <input className='popup__input' placeholder="Ссылка на картинку"></input>
    </PopupWithForm>

    <PopupWithForm
      isOpen={isEditAvatarPopupOpen}
      name="avatar"
      title="Обновить аватар"
      onClose={closeAllPopups}
      buttonText='Сохранить'
      ><input className='popup__input' placeholder="Ссылка на картинку"></input>
    </PopupWithForm>

    <PopupWithForm
      isOpen={isEditProfilePopupOpen}
      name="edit-profile"
      title="Редактировать профиль"
      onClose={closeAllPopups}
      buttonText='Сохранить'
    ><input className='popup__input popup__input_name' placeholder="ФИО" minLength="2" maxLength="40"></input>
    <input className='popup__input popup__input_job' placeholder="Место работы" minLength="2" maxLength="200"></input>
    </PopupWithForm>

    <ImagePopup card={selectedCard} closeAllPopups={closeAllPopups} onClose={closeAllPopups} />

    <Footer/>
    </body>
  );
}

export default App;
