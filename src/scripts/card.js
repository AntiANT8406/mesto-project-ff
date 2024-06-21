export function deleteCard(event) {
  const card = event.target.closest(".card");
  card.remove();
}

export function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

export function createCard({ name, link }, deleteFunction, likeFunction, zoomFunction) {
  const currentCard = document.querySelector("#card-template").content.querySelector(".card").cloneNode(true);
  const cardImage = currentCard.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = "Фотография " + name;
  const cardTitle = currentCard.querySelector(".card__title");
  cardTitle.textContent = name;
  const cardDeleteButton = currentCard.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", deleteFunction);
  const cardLikeButton = currentCard.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", likeFunction);
  cardImage.addEventListener("click", () => {
    zoomFunction(name, link);
  });
  return currentCard;
}
