import { NORMA_API } from "./consts"

const checkResponse = (response) => {
  return response.ok ? response.json() : response.json().then((err) => Promise.reject(err))
}

function makeRequest(url, options) {
  return fetch(url, options).then(checkResponse);
}

// fetch burger data from api
export const getBurgersData = async () => {
  return await makeRequest(`${NORMA_API}/ingredients`)
    .then(data => {
      if (data.success) return data.data;
      return Promise.reject(data);
    })
} 

// fetch order
export const createOrder = async (payload) => {
  const dataOrder = {
    "ingredients": payload
  };
  return await makeRequest(`${NORMA_API}/orders`, {
    method: 'POST', 
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataOrder)
  })
}
