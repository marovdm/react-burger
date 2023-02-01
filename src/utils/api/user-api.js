import { makeRequest } from "./helpers-api";

export const registerUser= async (payload) => {
  const userData = { ...payload };
  return await makeRequest('auth/register', {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
}


export const resetPassword = async (payload) => {
  const resetData = {
    'email': payload
  };
  return await makeRequest('password-reset', {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(resetData)
  })
}


export const setPasswordAfterReset = async (payload) => {
  const newPassword = {
    'email': payload.email,
    'token': payload.token
  };
  return await makeRequest('reset', {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newPassword)
  })
} 