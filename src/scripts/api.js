const config = {
  baseUrl: "https://nomoreparties.co/v1/",
  cohort: "wff-cohort-17/",
  token: "8fcda09a-8f72-4dc5-aa90-849dbf4c62a2",
};

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export function makeRequest(url, method = "GET", body = null) {
  const parameters = {
    method: method,
    headers: {
      authorization: config.token,
      ...(method !== "GET" ? { "Content-Type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };
  return fetch(config.baseUrl + config.cohort + url, parameters).then(checkResponse);
}

export function getUserInfo() {
  return makeRequest("users/me")
  };


export function updateUserInfo(data) {
  return makeRequest("users/me", "PATCH", data);
}

export function updateAvatar(data) {
  return makeRequest("users/me/avatar", "PATCH", data);
}

export function getCards() {
  return makeRequest("cards");
}

export function deleteLike(cardId) {
  return makeRequest(`cards/${cardId}/likes`, "DELETE");
}

export function putLike(cardId) {
  return makeRequest(`cards/${cardId}/likes`, "PUT");
}

export function createCard(cardData) {
  return makeRequest("cards", "POST", cardData);
}
export function deleteCard(cardId) {
  return makeRequest(`cards/${cardId}`, "DELETE");
}

export function logError(error) {
  console.log(error);
}
