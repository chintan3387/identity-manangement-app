import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, {mount} from "enzyme";
import Login from "../components/Login";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

Enzyme.configure({adapter: new Adapter()});

describe("Login Component", () => {
    const initialState = {
        isLoading: false,
        userList: {},
        error: {},
        isAuthenticated: false
    };

    const mockStore = configureStore([thunk]);
    let store;
    let wrapper;
    beforeEach(() => {
        store = mockStore(initialState);
        store.dispatch = jest.fn();
        wrapper = mount(<Login store={store} />);
    });

    it("renders", () => {
        expect(wrapper.exists()).toEqual(true);
    });

    it("renders Button Component", () => {
        const button = wrapper.find("Button");
        expect(button.length).toEqual(1);
    });

    it("renders Username & Password Inputs", () => {
        expect(wrapper.find("input").length).toEqual(2);
    });
    it("calls click handler 1 time", () => {
        const button = wrapper.find("Button");
        button.simulate("click");
        expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
});
