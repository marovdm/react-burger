import { combineReducers, configureStore } from "@reduxjs/toolkit";
import burgersReducer from './burger/reducers/burger-data-slice';
import orderReducer from "./orders/order-slice";
import userReducer from "./user/reducers/user-slice";


const rootReducer = combineReducers({
  burgers: burgersReducer,
  order: orderReducer,
  user: userReducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']