import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { IFetchFeedResponse } from "../../models/response/feed-response";
import { wsConnecting } from "../feed/actions/actions";
import { AppDispatch, RootState } from "../store";

type TwsActions = {
  wsConnect: ActionCreatorWithPayload<string>,
  wsDisconnect?: ActionCreatorWithoutPayload,
  wsSendMessage?: ActionCreatorWithPayload<any>,
  onOpen: ActionCreatorWithoutPayload,
  onClose: ActionCreatorWithoutPayload,
  onError: ActionCreatorWithPayload<string>,
  onMessage: ActionCreatorWithPayload<IFetchFeedResponse>
}

export const socketMiddleware = (wsActions: TwsActions): Middleware<{}, RootState> => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    return next => action => {
      
      const { dispatch } = store;
      
      const { payload } = action;
      
      const { wsConnect, wsDisconnect, wsSendMessage, 
        onOpen, onClose, onError, onMessage } = wsActions;

      if (wsConnect.match(action)) {
        socket = new WebSocket(action.payload);
        dispatch(wsConnecting());

        socket.onopen = (event: Event) => {
          dispatch(onOpen());
        };

        socket.onerror = (event: Event) => {
          dispatch(onError('error'))
        };

        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          
          const parsedData = JSON.parse(data);
          dispatch(onMessage(parsedData));
         
        };

        socket.onclose = (event: CloseEvent) => {
          dispatch(onClose());
        };
      }
      if (socket) {
        if (wsSendMessage?.match(action)) {
          const message = { ...payload };
          socket.send(JSON.stringify(message))
        }
        
        if (wsDisconnect?.match(action)) {
          socket.close();
          socket = null
        }
      }
        
      next(action);
    };
  };
};