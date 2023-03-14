import { createReducer } from "@reduxjs/toolkit";
import { IFeedDetail } from "../../models/IFeed";
import { WebSocketStatus } from "../types/ws-types";
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "./actions";


type FeedState = {
  status: WebSocketStatus;
  connectionError: string,
  orders: IFeedDetail[];
  total: number;
  totalToday: number;
}

const initialState: FeedState = {
  status: WebSocketStatus.OFFLINE,
  connectionError: '',
  orders: [],
  total: 0,
  totalToday: 0,
}

export const feedReducer = createReducer(initialState, builder => {
  builder
    .addCase(wsConnecting, (state) => {
      state.status = WebSocketStatus.CONNECTING
    })
    .addCase(wsOpen, (state) => {
      state.status = WebSocketStatus.ONLINE;
      state.connectionError = ''
    })
    .addCase(wsClose, (state) => {
      state.status = WebSocketStatus.OFFLINE;
      state.connectionError = ''
    })
    .addCase(wsError, (state, action) => {
      state.connectionError = action.payload
    })
    .addCase(wsMessage, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    })
})