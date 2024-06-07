import './pages/index.css';
import {renderInitCards} from './scripts/cards.js';
import {createCard, deleteCard} from "./scripts/card";

const cardTemplate = document.querySelector("#card-template").content;
const placesElement = document.querySelector('.places__list');
placesElement.addEventListener('click', function cardClickHandler(event) {
    const target = event.target;
    if (target.classList.contains('card__delete-button')) {deleteCard(target.closest('.card'));}
})

renderInitCards(cardTemplate, placesElement, createCard, deleteCard);
