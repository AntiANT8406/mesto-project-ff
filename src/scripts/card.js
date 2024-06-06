export const deleteCard = (evt) => {
    const eventTarget = evt.target;
    const currentCard = eventTarget.closest('.card');
    currentCard.remove();
}

export const createCard = (cardItems, cardTemplate, deleteFunction) => {
    const currentCard = cardTemplate.cloneNode(true);
    const cardImage = currentCard.querySelector('.card__image');
    cardImage.src = cardItems.link;
    cardImage.alt = 'Фотография ' + cardItems.name;
    const cardTitle = currentCard.querySelector('.card__title');
    cardTitle.textContent = cardItems.name;
    const cardDeleteButton = currentCard.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', deleteFunction);
    return currentCard;
}