const config = {
  baseUrl: "https://nomoreparties.co/v1/",
  cohort: "wff-cohort-17/",
  token: "8fcda09a-8f72-4dc5-aa90-849dbf4c62a2",
};

export function getRequest(url) {
  return fetch(config.baseUrl + config.cohort + url, {
    headers: {
      authorization: config.token,
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response.status);
  });
}

export function patchRequest(url, bodyData) {
  return fetch(config.baseUrl + config.cohort + url, {
    method: "PATCH",
    headers: {
      authorization: config.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response.status);
  });
}
