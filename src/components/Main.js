import React from 'react';
import apiSetting from '../utils/Api.js';
import Card from './Card.js';

function Main({onEditAvatar, onAddPlace, onEditProfile, onCardClick}) {
  const [userData, setUserData] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([apiSetting.getUserInfo(), apiSetting.getInitialCards()])
    .then(([userInfo, cards]) => {
      setUserData({
        userName: userInfo.name,
        userDescription: userInfo.about,
        userAvatar: userInfo.avatar,
      });
      setCards(cards);
    })
    .catch(err => console.log(`Ошибка: ${err.status}`));
  },[]);

    return (
    <main className="content">
      <section className="profile">
        <button className="profile__avatar-edit-btn" 
          style={{ backgroundImage: `url(${userData.avatar})` }}
          onClick={() => {onEditAvatar()}}>
            <img src={userData.userAvatar} alt="Аватар" className="profile__avatar"  name="avatar"/>
        </button>
        <div className="profile__info">
            <div className="profile__name">
                <h1 className="profile__name-title">Жак-Ив Кусто</h1>
                <button className="profile__edit-button link-hover" onClick={() => {onEditProfile(true)}} type="button"></button>
            </div>
            <p className="profile__activity">Исследователь океана</p>
        </div>
        <button className="profile__add-button link-hover" onClick={() => {onAddPlace(true)}} type="button"></button>
      </section>
      
      <section class="elements">
        {cards.map((card) => <Card key={card._id} card={card} onCardClick={onCardClick} />)}
      </section>
    </main>
    );
  }
  
  export default Main;