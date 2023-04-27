import React from "react";

function Card({card, onCardClick}) {
    return (
        <div className="card">
          <button className="card__button-delete link-hover"></button>     
          <img className="card__place-image" src={card.link} alt={card.name} onClick={() => onCardClick(card)}/>
          <div className="card__caption-place">
            <p className="card__name-place">{card.name}</p>
            <div className="card__like_container">
              <button className="card__like link-hover" type="button"></button>
              <span className="element__like-counter"></span>
            </div>
          </div>
      </div>
    )
}

export default Card;