
import { makeRequest } from "./helpers-api";

// fetch burger data from api
export const getBurgersData = async () => {
  return await makeRequest('ingredients')
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
  return await makeRequest('orders', {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataOrder)
  })
}
