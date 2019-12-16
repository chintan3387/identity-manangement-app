import configureStore from "redux-mock-store";
import * as actions from "../actions/index";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {keys, LOGIN_URL, FETCH_USERS_URL} from "../utilities/helper";

const mockStore = configureStore([thunk]);
const store = mockStore();
const mock = new MockAdapter(axios);

describe("Login Actions", () => {
    beforeEach(() => {
        store.clearActions();
    });

    it("Dispatches the correct action and payload", () => {
        const expectedActions = [
            {
                payload: true,
                type: keys.IS_LOADING
            }
        ];

        store.dispatch(actions.isLoading(true));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should dispatch LOGIN_SUCCESS action", () => {
        mock.onPost(LOGIN_URL).reply(200, {
            type: keys.LOGIN_SUCCESS,
            response: {}
        });
        store.dispatch(actions.handleLogin("admin", "1111")).then(() => {
            let expectedActions = [keys.LOGIN_SUCCESS];

            const dispatchedActions = store.getActions();
            const actionTypes = dispatchedActions.map(action => action.type);

            expect(actionTypes).toEqual(expectedActions);
        });
    });

    it("should dispatch REQUEST_HAS_ERRORED", () => {
        mock.onPost(LOGIN_URL).reply(401, {
            type: keys.REQUEST_HAS_ERRORED,
            error: {
                hasErrored: true,
                errorText:
                    "Please contact the System Administrator at extension 1001 to create a new Login or reset your password."
            }
        });

        store.dispatch(actions.handleLogin("admin", "password")).then(() => {
            let expectedActions = [keys.REQUEST_HAS_ERRORED];

            const dispatchedActions = store.getActions();
            const actionTypes = dispatchedActions.map(action => action.type);
            expect(actionTypes).toEqual(expectedActions);
        });
    });

    it("should dispatch REQUEST_HAS_ERRORED without credentials ", () => {
        store.dispatch(actions.fetchUsers("test", true)).then(() => {
            let expectedActions = [keys.IS_LOADING, keys.IS_LOADING, keys.REQUEST_HAS_ERRORED];
            const dispatchedActions = store.getActions();
            const actionTypes = dispatchedActions.map(action => action.type);
            expect(actionTypes).toEqual(expectedActions);
        });
    });
});
