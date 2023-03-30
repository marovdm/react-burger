import { WebSocketStatus } from "../../types/ws-types";
import { viewDetailOrder, wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "../actions/actions";
import { feedReducer, initialState } from "../reducers/feed-reducer";

const order = {
  "_id": "641ec96b936b17001be7350c",
  "ingredients": [
      "60d3b41abdacab0026a733c6",
      "60d3b41abdacab0026a733cb",
      "60d3b41abdacab0026a733c9",
      "60d3b41abdacab0026a733d1",
      "60d3b41abdacab0026a733c9",
      "60d3b41abdacab0026a733c6"
  ],
  "status": "done",
  "name": "Био-марсианский бессмертный фалленианский краторный бургер",
  "createdAt": "2023-03-25T10:14:03.626Z",
  "updatedAt": "2023-03-25T10:14:04.020Z",
  "number": 45857
}

describe("FeedReducer", () => {
  it("should be start connecting web socket", () => {
    const action = { type: wsConnecting.type, payload: WebSocketStatus.CONNECTING }
    const result = feedReducer(initialState, action);

    expect(result.status).toEqual(WebSocketStatus.CONNECTING);
    expect(result.isLoading).toBeTruthy();
  })

  it("should be connected success web socket", () => {
    const action = { type: wsOpen.type }
    const result = feedReducer(initialState, action);

    expect(result.status).toEqual(WebSocketStatus.ONLINE);
    expect(result.connectionError).toBe('');
  })

  it("should be connecting close web socket", () => {
    const action = { type: wsClose.type }
    const result = feedReducer(initialState, action);

    expect(result.status).toEqual(WebSocketStatus.OFFLINE);
    expect(result.isLoading).toBeFalsy();
  })

  it("should be connecting error web socket", () => {
    const action = { type: wsError.type, payload: 'error' }
    const result = feedReducer(initialState, action);

    expect(result.connectionError).toBe('error');
    expect(result.isLoading).toBeFalsy();
  })

  it("should be send message web socket", () => {
    const payload = {
      orders: [order],
      total: 10,
      totalToday: 2
    }
    const action = { type: wsMessage.type, payload: payload}
    const result = feedReducer(initialState, action);

    expect(result.orders).toBe(payload.orders);
    expect(result.total).toBe(payload.total);
    expect(result.totalToday).toBe(payload.totalToday);
    expect(result.isLoading).toBeFalsy();
  })

  it("should be viewed order", () => {
    const action = { type: viewDetailOrder.type, payload: order }
    const result = feedReducer(initialState, action);

    expect(result.viewedOrder).toBe(order);
  })
})