import {keys} from "../utilities/helper";

export const requestHasErrored = (state = {}, action) => {
    switch (action.type) {
        case keys.REQUEST_HAS_ERRORED:
            return action.error;
        default:
            return state;
    }
};

export const userList = (state = {}, action) => {
    switch (action.type) {
        case keys.FETCH_USERS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};

export const isLoading = (state = false, action) => {
    switch (action.type) {
        case keys.IS_LOADING:
            return action.payload;
        default:
            return state;
    }
};

export const isAuthenticated = (state = false, action) => {
    switch (action.type) {
        case keys.LOGIN_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};
