import { NORMA_API } from "./consts"

// fetch burger data from api
export const getBurgersData = async () => {
  return await fetch(`${NORMA_API}/ingredients`)
    .then(checkResponse)
    .then(data => {
      if (data.success) return data.data;
      return Promise.reject(data)
    })
} 

// fetch order
export const createOrder = async (payload) => {
  const dataOrder = {
    "ingredients": payload
  };
  return await fetch(`${NORMA_API}/orders`, {
    method: 'POST', 
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataOrder)
  })
  .then(checkResponse)
}

const checkResponse = (response) => {
  return response.ok ? response.json() : response.json().then((err) => Promise.reject(err))
}
