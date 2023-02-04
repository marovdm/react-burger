import { makeRequest } from "./helpers-api";

const config = {
  method: 'POST', 
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
}

export const registerUser= async (payload) => {
  const userData = { ...payload };
  console.log(userData);
  return await makeRequest('auth/register', {
    ...config,
    body: JSON.stringify(userData)
  })
}


export const resetPassword = async (payload) => {
  const resetData = {
    'email': payload
  };
  return await makeRequest('password-reset', {
    ...config,
    body: JSON.stringify(resetData)
  })
}


export const setPasswordAfterReset = async (payload) => {
  const newPassword = {
    'email': payload.email,
    'token': payload.token
  };
  return await makeRequest('reset', {
    ...config,
    body: JSON.stringify(newPassword)
  })
} 