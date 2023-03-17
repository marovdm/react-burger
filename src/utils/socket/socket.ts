
import WebSocket from 'ws';

type TCallback<K extends WebsocketEvents> = {
  readonly listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any;
}

export enum WebsocketEvents {
  open = 'open',          // Connection is opened or re-opened
  close = 'close',        // Connection is closed
  error = 'error',        // An error occurred
  message = 'message',    // A message was received
}

interface WebsocketEventsConst {
  event: 'open'| 'close' | 'error' | 'message'
}

interface WebsocketEventMap {
  close: CloseEvent;
  error: Event;
  message: MessageEvent;
  open: Event;
}



class Socket {
  socket: WebSocket | null;
  constructor() {
    this.socket = null
  }

  connect(url: string) {
    if (!this.socket) {
      this.socket = new WebSocket(url)
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }
  }

  send(message: string) {
    if (this.socket) {
      this.socket.send(JSON.stringify(message))
    }
  }
  // // TODO спросить как правильно
  // on<K extends WebsocketEvents>(eventName: K, callback: WebsocketEventMap[K]) {
  //   if (this.socket) {
  //     this.socket.addEventListener(eventName, callback)
  //   }
  // }

}

export { Socket }