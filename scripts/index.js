const cardTemplate = document.querySelector("#card-template").content;

const deleteCard = (evt) => {
    const eventTarget = evt.target;
    const currentCard = eventTarget.closest('.card');
    currentCard.remove();
}

const createCard = (name, link, deleteFunction = deleteCard) => {
    const currentCard = cardTemplate.cloneNode(true);
    const cardImage = currentCard.querySelector('.card__image');
    cardImage.src = link;
    const cardTitle = currentCard.querySelector('.card__title');
    cardTitle.textContent = name;
    const cardDeleteButton = currentCard.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', deleteFunction);
    return currentCard;
}


const placesElement = document.querySelector('.places__list');
console.log('started');
for (const cardItems of initialCards) {
    const card = createCard(cardItems.name, cardItems.link);
    placesElement.append(card);
}
