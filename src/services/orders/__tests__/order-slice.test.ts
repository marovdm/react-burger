import { createOrderQuery, getOrderInfo } from '../actions/action-creators';
import OrderReducer, {initialState, toggleOpenedOrderModal} from '../reducers/order-slice';

describe('order-data-slice', () => {
  const order = {
    "ingredients": [
    {
        "_id": "60d3b41abdacab0026a733cd",
        "name": "Соус фирменный Space Sauce",
        "type": "sauce",
        "proteins": 50,
        "fat": 22,
        "carbohydrates": 11,
        "calories": 14,
        "price": 80,
        "image": "https://code.s3.yandex.net/react/code/sauce-04.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/sauce-04-large.png",
        "__v": 0
    },
      ],
      "_id": "642334bf0905fd001b6242c9",
      "owner": {
          "name": "Dmitri",
          "email": "marov@progressivemedia.ru",
          "createdAt": "2023-02-06T20:56:02.027Z",
          "updatedAt": "2023-02-28T16:25:01.741Z"
      },
      "status": "done",
      "name": "Space краторный бургер",
      "createdAt": "2023-03-28T18:41:03.251Z",
      "updatedAt": "2023-03-28T18:41:03.745Z",
      "number": 46531,
      "price": 1335
  };

  it('should be toggle initialState order modal', () => {
    const action = { type: toggleOpenedOrderModal.type, payload: true }
    const result = OrderReducer(initialState, action);

    expect(result.isOpenedOrderModal).toBeTruthy();
  })

  it('should be "createOrderQuery.pending" action', () => {
    const result = OrderReducer(initialState, createOrderQuery.pending)

    expect(result.isLoading).toBeTruthy();
  })

  it('should be "createOrderQuery.fulfilled" action', () => {
    const payload = order;
    const action = { type: createOrderQuery.fulfilled.type, payload }
    const result = OrderReducer(initialState, action)

    expect(result.isLoading).toBeFalsy();
    expect(result.isOpenedOrderModal).toBeTruthy();
    expect(result.error).toBe('');
    expect(result.orderData).toEqual(payload);
  })

  it('should be "createOrderQuery.rejected" action', () => {
    const action = { type: createOrderQuery.rejected.type, payload: 'error' }
    const result = OrderReducer(initialState, action)

    expect(result.isLoading).toBeFalsy();
    expect(result.isOpenedOrderModal).toBeTruthy();
    expect(result.error).toBe('error');
  })

  it('should be "getOrderInfo.pending" action', () => {
    const result = OrderReducer(initialState, getOrderInfo.pending)

    expect(result.isLoading).toBeTruthy();
  })

  it('should be "getOrderInfo.fulfilled" action', () => {
    const result = OrderReducer(initialState, getOrderInfo.fulfilled)

    expect(result.isLoading).toBeFalsy();
    expect(result.error).toBe('');
  })

  it('should be "getOrderInfo.rejected" action', () => {
    const action = { type: getOrderInfo.rejected.type, payload: 'error' }
    const result = OrderReducer(initialState, action)

    expect(result.isLoading).toBeFalsy();
    expect(result.error).toBe('error');
  })
})

