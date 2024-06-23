export function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

export function createCard({ name, link}, likeFunction, zoomFunction) {
  const currentCard = document.querySelector("#card-template").content.querySelector(".card").cloneNode(true);
  const cardImage = currentCard.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = "Фотография " + name;
  const cardTitle = currentCard.querySelector(".card__title");
  cardTitle.textContent = name;

  cardImage.addEventListener("click", () => {
    zoomFunction(name, link);
  });
  return currentCard;
}
