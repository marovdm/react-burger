import { fetchUserProfile, userLogin, userLogout, userRegister } from '../actions/action-creators';
import UserReducer, { initialState, resetError, setCredentials, setError, setLoading } from '../reducers/user-slice';

describe('order-data-slice', () => {
  const user = {
    email: 'test@test.tt',
    name: 'test',
  }

  it('should be set credentials', () => {
    const action = { type: setCredentials.type, payload: user }
    const result = UserReducer(initialState, action);

    expect(result.user.email).toEqual(user.email);
    expect(result.user.name).toEqual(user.name);
  })

  it('should be toggle loading', () => {
    const action = { type: setLoading.type, payload: true}
    const result = UserReducer(initialState, action);

    expect(result.isLoading).toBeTruthy();
  })
  
  it('should be set error', () => {
    const action = { type: setError.type, payload: 'Ошибка'}
    const result = UserReducer(initialState, action);

    expect(result.hasError).toBeTruthy();
    expect(result.error).toEqual('Ошибка');
  })
  
  it('should be reset error', () => {
    const action = { type: resetError.type}
    const result = UserReducer(initialState, action);

    expect(result.hasError).toBeFalsy();
    expect(result.error).toEqual('');
  })

  it('should be "userLogin.pending" action', () => {
    const result = UserReducer(initialState, userLogin.pending)

    expect(result.isLoading).toBeTruthy();
  })

  it('should be "userLogin.fulfilled" action', () => {
    const action = { type: userLogin.fulfilled.type, payload: {user} }
    const result = UserReducer(initialState, action)

    expect(result.isLoading).toBeFalsy();
    expect(result.isAuth).toBeTruthy();
    expect(result.hasError).toBeFalsy();
    expect(result.error).toBe('');
    expect(result.user).toEqual(user);
  })

  it('should be "userLogin.rejected" action', () => {
    const result = UserReducer(initialState, {type: userLogin.rejected.type, payload: 'error'})

    expect(result.isLoading).toBeFalsy();
    expect(result.hasError).toBeTruthy();
    expect(result.error).toBe('error');
  })

  it('should be "userRegister.pending" action', () => {
    const result = UserReducer(initialState, userRegister.pending)

    expect(result.isLoading).toBeTruthy();
  })

  it('should be "userRegister.fulfilled" action', () => {
    const action = { type: userRegister.fulfilled.type, payload: {user} }
    const result = UserReducer(initialState, action)

    expect(result.isLoading).toBeFalsy();
    expect(result.isAuth).toBeTruthy();
    expect(result.hasError).toBeFalsy();
    expect(result.error).toBe('');
    expect(result.user).toEqual(user);
  })

  it('should be "userRegister.rejected" action', () => {
    const result = UserReducer(initialState, {type: userRegister.rejected.type, payload: 'error'})

    expect(result.isLoading).toBeFalsy();
    expect(result.hasError).toBeTruthy();
    expect(result.error).toBe('error');
  })

  it('should be "fetchUserProfile.pending" action', () => {
    const result = UserReducer(initialState, fetchUserProfile.pending)

    expect(result.isLoading).toBeTruthy();
  })

  it('should be "fetchUserProfile.fulfilled" action', () => {
    const action = { type: fetchUserProfile.fulfilled.type, payload: {user} }
    const result = UserReducer(initialState, action)

    expect(result.isLoading).toBeFalsy();
    expect(result.hasError).toBeFalsy();
    expect(result.error).toBe('');
    expect(result.user).toEqual(user);
  })

  it('should be "fetchUserProfile.rejected" action', () => {
    const result = UserReducer(initialState, {type: fetchUserProfile.rejected.type, payload: 'error'})

    expect(result.isLoading).toBeFalsy();
    expect(result.hasError).toBeTruthy();
    expect(result.error).toBe('error');
  })

  it('should be "userLogout.pending" action', () => {
    const result = UserReducer(initialState, userLogout.pending)

    expect(result.isLoading).toBeTruthy();
  })

  it('should be "userLogout.fulfilled" action', () => {
    const action = { type: userLogout.fulfilled.type, payload: {user} }
    const result = UserReducer(initialState, action)

    expect(result.isLoading).toBeFalsy();
    expect(result.isAuth).toBeFalsy();
    expect(result.hasError).toBeFalsy();
    expect(result.error).toBe('');
    expect(result.user).toEqual({name: '', email: ''});
  })

  it('should be "userLogout.rejected" action', () => {
    const result = UserReducer(initialState, {type: userLogout.rejected.type, payload: 'error'})

    expect(result.isLoading).toBeFalsy();
    expect(result.hasError).toBeTruthy();
    expect(result.error).toBe('error');
  })
})

