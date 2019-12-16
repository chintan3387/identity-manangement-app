import React from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "react-bootstrap/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Loader from "./Loader";
import UserTable from "./UserTable";
import _ from "lodash";
import * as actions from "../actions/index";
import {connect} from "react-redux";

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.searchRef = React.createRef();
        this.aliasRef = React.createRef();
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(e) {
        e.preventDefault();
        const searchText = this.searchRef.value;
        const allowAlias = this.aliasRef.checked;
        debugger;
        this.props.fetchUserList(searchText, allowAlias);
    }
    render() {
        console.log(`search term is: ${this.searchRef.value}`);
        return (
            <div>
                <form style={{border: "1px solid #ddd", backgroundColor: "#ccc", margin: "3em"}}>
                    <label style={{fontSize: "1.5em", margin: "1em 1em 0 2.5em", textAlign: "left", display: "block"}}>
                        Search User
                    </label>
                    <br />
                    <OutlinedInput
                        id="outlined-search"
                        type="text"
                        placeholder="Search..."
                        style={{margin: "1em 0", width: "80%", backgroundColor: "#fff"}}
                        inputRef={e => (this.searchRef = e)}
                    />
                    <Button
                        type="submit"
                        style={{
                            margin: "25px 10px",
                            padding: "18px 20px",
                            fontSize: "16px",
                            fontWeight: "bold",
                            color: "#fff",
                            borderRadius: "0.5em",
                            backgroundColor: "rgb(0, 188, 212)"
                        }}
                        onClick={e => this.handleSearch(e)}
                    >
                        {" "}
                        Search
                    </Button>
                    <br />
                    <div style={{textAlign: "left", marginLeft: "3em"}}>
                        <Checkbox color="default" inputRef={e => (this.aliasRef = e)} />
                        <label>Allow Alias</label>
                    </div>
                </form>
                {this.props.isLoading && <Loader />}
                {!_.isEmpty(this.props.userList) ? (
                    <React.Fragment>
                        <h2 style={{textAlign: "left", marginLeft: "3em"}}>
                            SEARCH RESULTS FOR: {this.searchRef.value}
                        </h2>
                        <UserTable users={this.props.userList} />
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        {this.searchRef.value && !this.props.isLoading && (
                            <h2>No Results Found for Search Term {this.searchRef.value}</h2>
                        )}
                    </React.Fragment>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userList: state.userList,
        isLoading: state.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserList: (searchText, allowAlias) => {
            dispatch(actions.fetchUsers(searchText, allowAlias));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
