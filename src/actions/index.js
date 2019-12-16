import axios from "axios";
import {keys, LOGIN_URL, FETCH_USERS_URL} from "../utilities/helper";
import {history} from "../history";

export const requestHasErrored = (bool, error) => ({
    type: keys.REQUEST_HAS_ERRORED,
    error: {hasErrored: bool, errorText: error}
});

export const isLoading = bool => ({
    type: keys.IS_LOADING,
    payload: bool
});

export const fetchUsers = (searchText, allowAlias) => {
    return dispatch => {
        dispatch(isLoading(true));
        let url = `${FETCH_USERS_URL}?keyword=${searchText}&alias=${allowAlias}`;
        return axios
            .get(url, {
                withCredentials: true
            })
            .then(response => {
                dispatch(isLoading(false));
                if (response.status === 200 || response.status === 204) {
                    dispatch(fetchUsersSuccess(response.data));
                }
            })
            .catch(err => {
                let error = err.response.data ? err.response.data.error : "";
                dispatch(isLoading(false));
                dispatch(requestHasErrored(true, error));
            });
    };
};

export const handleLogin = (username, credential) => {
    return dispatch => {
        return axios
            .post(
                LOGIN_URL,
                {
                    username,
                    credential
                },
                {withCredentials: true}
            )
            .then(response => {
                if (response.status === 200) {
                    dispatch(loginSuccess(true));
                    history.push("/users");
                }
            })
            .catch(err => {
                err = err.response.data.replace ? JSON.parse(err.response.data.replace(/'/g, '"')) : "";
                console.log(err);
                const errMessage = err.operationError ? err.operationError.message : "";
                dispatch(requestHasErrored(true, errMessage));
            });
    };
};

export const fetchUsersSuccess = result => {
    return {
        type: keys.FETCH_USERS_SUCCESS,
        payload: result
    };
};

export const loginSuccess = bool => {
    return {
        type: keys.LOGIN_SUCCESS,
        payload: bool
    };
};
