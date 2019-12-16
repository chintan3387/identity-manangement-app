import React from "react";
import "./App.css";
import Login from "./components/Login";
import Users from "./components/Users";
import {Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

const ProtectedRoute = ({component: Component, isAuthenticated, ...rest}) => {
    return (
        <Route {...rest} render={props => (isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />)} />
    );
};

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/login" component={Login} />
                    <ProtectedRoute path="/users" isAuthenticated={this.props.isAuthenticated} component={Users} />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.isAuthenticated
    };
};

export default connect(mapStateToProps, null)(App);
