import { createAction } from "@reduxjs/toolkit";
import { IFeedDetail } from "../../models/IFeed";
import { IFetchFeedResponse } from "../../models/response/feed-response";

export const connect = createAction<string, 'CONNECT'>('CONNECT');
export const disconnect = createAction('DISCONNECT');

export const wsConnecting = createAction('WS_CONNECTING');
export const wsOpen = createAction('WS_OPEN');
export const wsClose = createAction('WS_CLOSE');
export const wsMessage = createAction<IFetchFeedResponse, 'WS_MESSAGE'>('WS_MESSAGE');
export const wsError = createAction<string, 'WS_ERROR'>('WS_ERROR');

export const viewDetailOrder = createAction<IFeedDetail, 'VIEW_DETAIL_ORDER'>('VIEW_DETAIL_ORDER');
