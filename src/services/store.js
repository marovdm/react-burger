import { combineReducers, configureStore } from "@reduxjs/toolkit";
import burgersDataReducer from './reducers/burger-data-slice';
import OrderDataReducer from "./reducers/order-slice";
import userReducer from "./user/reducers/user-slice";


const rootReducer = combineReducers({
  burgers: burgersDataReducer,
  order: OrderDataReducer,
  user: userReducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true
  })
}