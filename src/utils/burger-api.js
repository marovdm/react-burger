import { NORMA_API } from "./consts"

export const getBurgersData = async () => {
  return await fetch(`${NORMA_API}/ingredients`)
    .then(checkResponse)
} 

const checkResponse = (response) => {
  return response.ok ? response.json() : response.json().then((err) => Promise.reject(err))
}