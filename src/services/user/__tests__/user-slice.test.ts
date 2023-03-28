import UserReducer, { UserState, resetError, setCredentials, setError, setLoading } from '../reducers/user-slice';

describe('order-data-slice', () => {
  const state: UserState = {
    user: {
      email: '',
      name: '',
    },
    isAuth: false,
    isLoading: false,
    hasError: false,
    error: '',
  }

  it('should be set credentials', () => {
    const user = {
      email: 'test@test.tt',
      name: 'test',
    }
    const action = { type: setCredentials.type, payload: user }
    const result = UserReducer(state, action);

    expect(result.user.email).toEqual(user.email);
    expect(result.user.name).toEqual(user.name);
  })

  it('should be toggle loading', () => {
    const action = { type: setLoading.type, payload: true}
    const result = UserReducer(state, action);

    expect(result.isLoading).toBeTruthy();
  })
  
  it('should be set error', () => {
    const action = { type: setError.type, payload: 'Ошибка'}
    const result = UserReducer(state, action);

    expect(result.hasError).toBeTruthy();
    expect(result.error).toEqual('Ошибка');
  })
  
  it('should be reset error', () => {
    const action = { type: resetError.type}
    const result = UserReducer(state, action);

    expect(result.hasError).toBeFalsy();
    expect(result.error).toEqual('');
  })
})

