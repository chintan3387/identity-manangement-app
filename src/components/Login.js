import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import Button from "react-bootstrap/Button";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import {connect} from "react-redux";
import * as actions from "../actions/index";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
        this.handleLogin = this.handleLogin.bind(this);
    }
    handleLogin(e) {
        e.preventDefault();
        const username = this.usernameRef.value;
        const password = this.passwordRef.value;
        this.props.handleLogin(username, password);
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar postion="static" title="Login"></AppBar>
                        <form className="root" style={{border: "2px solid #ccc", width: "35%", margin: "2rem auto"}}>
                            <InputLabel style={{float: "left", margin: "2em 0 0 2em"}}>Username</InputLabel>
                            <OutlinedInput
                                id="outlined-username"
                                placeholder="Enter Username"
                                inputRef={e => (this.usernameRef = e)}
                                style={{margin: "1em 0"}}
                                notched={true}
                            />
                            <br />
                            <InputLabel style={{float: "left", margin: "2em 0 0 2em"}}>Password</InputLabel>
                            <OutlinedInput
                                id="outlined-password"
                                type="password"
                                placeholder="Enter Password"
                                style={{margin: "1em 0"}}
                                inputRef={e => (this.passwordRef = e)}
                            />
                            <br />
                            <Button
                                variant="primary"
                                id="submit-login"
                                type="submit"
                                style={{
                                    margin: "30px auto",
                                    padding: "20px 40px",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    color: "#fff",
                                    borderRadius: "0.5em",
                                    backgroundColor: "rgb(0, 188, 212)"
                                }}
                                onClick={e => this.handleLogin(e)}
                            >
                                {" "}
                                Login{" "}
                            </Button>

                            {this.props.hasErrored && (
                                <div style={{argin: "20px 0"}}>
                                    <hr />
                                    {this.props.errorText}
                                </div>
                            )}
                        </form>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        hasErrored: state.error.hasErrored,
        errorText: state.error.errorText,
        isLoading: state.isLoading
    };
};
const mapDispatchToProps = dispatch => {
    return {
        handleLogin: (url, password) => dispatch(actions.handleLogin(url, password))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
