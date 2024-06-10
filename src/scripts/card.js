import {openModal} from "./modal";

export function deleteCard(event) {
    const card = event.target.closest('.card');
    card.remove();
}

export function likeCard(event) {
    event.target.classList.toggle('card__like-button_is-active');
}

export function zoomCard(event) {
    const popupImageElement = document.querySelector('.popup_type_image');
    const cardElement = event.target.closest('.card');
    const imageCaption = cardElement.querySelector('.card__title').textContent;
    const imageLink = cardElement.querySelector('.card__image').src;
    const imageElement = popupImageElement.querySelector('.popup__image')
    imageElement.src = imageLink;
    popupImageElement.querySelector('.popup__caption').textContent = imageCaption;
    openModal(popupImageElement);
}

export function createCard(name, link, cardTemplate, deleteFunction, likeFunction, zoomFunction) {
    const currentCard = cardTemplate.cloneNode(true);
    const cardImage = currentCard.querySelector('.card__image');
    cardImage.src = link;
    cardImage.alt = 'Фотография ' + name;
    const cardTitle = currentCard.querySelector('.card__title');
    cardTitle.textContent = name;
    const cardDeleteButton = currentCard.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', deleteFunction);
    const cardLikeButton = currentCard.querySelector('.card__like-button');
    cardLikeButton.addEventListener('click', likeFunction);
    cardImage.addEventListener('click', zoomFunction);
    return currentCard;
}
