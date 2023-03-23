import OrderReducer, {OrderState, toggleOpenedOrderModal} from '../reducers/order-slice';

describe('order-data-slice', () => {
  const state: OrderState = {
    orderData: null,
    isOpenedOrderModal: false,
    isLoading: false,
    error: '',
    hasError: false,
  }

  it('should be toggle state order modal', () => {
    const action = { type: toggleOpenedOrderModal.type, payload: true }
    const result = OrderReducer(state, action);

    expect(result.isOpenedOrderModal).toBeTruthy();
  })
})

