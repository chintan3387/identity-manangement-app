import {keys} from "../utilities/helper";
import * as reducers from "../reducers/index";

describe("IndentityManagementApp Reducers", () => {
    it("should return initial state", () => {
        expect(reducers.userList(undefined, {})).toEqual({});
    });
    it("should handle FETCH_USERS_SUCCESS", () => {
        expect(
            reducers.userList(undefined, {
                payload: {
                    username: "abc",
                    displayName: "ABC",
                    status: "active"
                },
                type: keys.FETCH_USERS_SUCCESS
            })
        ).toEqual({
            username: "abc",
            displayName: "ABC",
            status: "active"
        });
    });
});
