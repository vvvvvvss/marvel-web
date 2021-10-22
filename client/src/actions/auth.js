
export const auth = (tokenId) => async (dispatch) => {
    dispatch({ type : 'START_AUTH_LOADING'});
    sessionStorage.setItem('token', tokenId);
    const {data}
}