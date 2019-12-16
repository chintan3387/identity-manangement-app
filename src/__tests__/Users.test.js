import React, {Component} from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, {mount} from "enzyme";
import Users from "../components/Users";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

Enzyme.configure({adapter: new Adapter()});

describe("Users Component", () => {
    const initialState = {
        isLoading: false,
        userList: [
            {
                username: "abc",
                displayName: "ABC",
                status: "actived",
                attributes: [{name: "user.ParentalRatingId", value: "23"}]
            }
        ],
        error: {},
        isAuthenticated: true
    };

    const mockStore = configureStore([thunk]);
    let store;
    let wrapper;
    beforeEach(() => {
        store = mockStore(initialState);
        store.dispatch = jest.fn();
        wrapper = mount(<Users store={store} />);
    });

    it("renders", () => {
        expect(wrapper.exists()).toEqual(true);
    });

    it("renders Button Component", () => {
        const button = wrapper.find("Button");
        expect(button.length).toEqual(1);
    });

    it("renders Table Component", () => {
        const table = wrapper.find("table");
        expect(table.length).toEqual(1);
    });

    it("calls click handler 1 time", () => {
        const button = wrapper.find("Button");
        button.simulate("click");
        expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
});
