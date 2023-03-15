import { combineReducers, configureStore } from "@reduxjs/toolkit";
import burgersReducer from './burger/reducers/burger-data-slice';
import orderReducer from "./orders/reducers/order-slice";
import userReducer from "./user/reducers/user-slice";
import { feedReducer } from "./feed/reducers/feed-reducer";
import { socketMiddleware } from './middleware/socket-middleware';
import { connect, disconnect, wsClose, wsError, wsMessage, wsOpen } from "./feed/actions/actions";

const rootReducer = combineReducers({
  burgers: burgersReducer,
  order: orderReducer,
  user: userReducer,
  feed: feedReducer
});

const wsFeedActions = {
  wsConnect: connect,
  wsDisconnect: disconnect,
  onOpen: wsOpen,
  onClose: wsClose,
  onError: wsError,
  onMessage: wsMessage
};

const wsFeedMiddleware = socketMiddleware(
  wsFeedActions
);

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(wsFeedMiddleware)
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']