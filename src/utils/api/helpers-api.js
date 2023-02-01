import { NORMA_API } from "../consts"

export function makeRequest(url, options) {
  return fetch(`${NORMA_API}/${url}`, options).then(checkResponse);
}

const checkResponse = (response) => {
  return response.ok ? response.json() : response.json().then((err) => Promise.reject(err))
}