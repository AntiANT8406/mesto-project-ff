import { deleteCard, deleteLike, putLike, logError } from "./api";

function likedByUser(cardData, userData) {
  return cardData.likes.some((user) => user._id === userData._id);
}

export function createCardElement(cardData, userData, zoomFunction) {
  const currentCard = document.querySelector("#card-template").content.querySelector(".card").cloneNode(true);
  const cardImage = currentCard.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = "Фотография " + cardData.name;

  cardImage.addEventListener("click", () => {
    zoomFunction(cardData.name, cardData.link);
  });

  const cardTitle = currentCard.querySelector(".card__title");
  cardTitle.textContent = cardData.name;

  const cardLikeButton = currentCard.querySelector(".card__like-button");
  const cardLikesCount = currentCard.querySelector(".card__likes-count");
  cardLikesCount.textContent = cardData.likes.length;

  if (likedByUser(cardData, userData)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardLikeButton.addEventListener("click", () => {
    (cardLikeButton.classList.contains("card__like-button_is-active") ? deleteLike : putLike)(cardData._id)
      .then((cardData) => {
        cardLikeButton.classList.toggle("card__like-button_is-active");
        cardLikesCount.textContent = cardData.likes.length;
      })
      .catch(logError);
  });

  const cardDeleteButton = currentCard.querySelector(".card__delete-button");
  if (userData._id !== cardData.owner._id) {
    cardDeleteButton.classList.add("card__delete-button_disabled");
  } else {
    cardDeleteButton.addEventListener("click", () => {
      deleteCard(cardData._id)
        .then(() => currentCard.remove())
        .catch(logError);
    });
  }
  return currentCard;
}
