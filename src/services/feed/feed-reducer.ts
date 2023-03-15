import { createReducer } from "@reduxjs/toolkit";
import { IFeedDetail } from "../../models/IFeed";
import { WebSocketStatus } from "../types/ws-types";
import { viewDetailOrder, wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "./actions";


type FeedState = {
  status: WebSocketStatus;
  connectionError: string,
  orders: IFeedDetail[];
  viewedOrder: IFeedDetail | null,
  total: number;
  totalToday: number;
  isLoading: boolean
}

const initialState: FeedState = {
  status: WebSocketStatus.OFFLINE,
  connectionError: '',
  orders: [],
  total: 0,
  totalToday: 0,
  viewedOrder: null,
  isLoading: false
}

export const feedReducer = createReducer(initialState, builder => {
  builder
    .addCase(wsConnecting, (state) => {
      state.status = WebSocketStatus.CONNECTING;
      state.isLoading = true;
    })
    .addCase(wsOpen, (state) => {
      state.status = WebSocketStatus.ONLINE;
      state.connectionError = ''
    })
    .addCase(wsClose, (state) => {
      state.status = WebSocketStatus.OFFLINE;
      state.connectionError = '';
      state.isLoading = false;
    })
    .addCase(wsError, (state, action) => {
      state.connectionError = action.payload;
      state.isLoading = false;
    })
    .addCase(wsMessage, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.isLoading = false;
    })
    .addCase(viewDetailOrder, (state, action) => {
      state.viewedOrder = action.payload;
    })
})

