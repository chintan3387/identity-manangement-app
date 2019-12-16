import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";

export default class UserTable extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            rowsPerPage: 5,
            currPage: 0
        };

        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    }

    handleChangePage(e, newPage) {
        this.setState({
            currPage: newPage
        });
    }

    handleChangeRowsPerPage(event) {
        this.setState({
            rowsPerPage: parseInt(event.target.value, 10),
            currPage: 0
        });
    }
    renderTableRows() {
        let page = this.state.currPage;
        let rowsPerPage = this.state.rowsPerPage;
        return this.props.users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => {
            let color = user.attributes[0].value < 50 ? "red" : "#000";
            let tdStyle = {
                borderRight: "1px solid #ccc",
                color,
                fontSize: "16px"
            };
            return (
                <TableRow key={user.id}>
                    <TableCell style={tdStyle}>{user.username}</TableCell>
                    <TableCell style={tdStyle}>{user.displayName}</TableCell>
                    <TableCell style={tdStyle}>{user.status}</TableCell>
                </TableRow>
            );
        });
    }
    render() {
        const thStyle = {
            backgroundColor: "#808080",
            fontWeight: "bold",
            fontSize: "20px"
        };
        return (
            <React.Fragment>
                <h2 style={{textAlign: "left", marginLeft: "3em"}}>Users</h2>
                <Table style={{width: "90%", margin: "1em auto", border: "1px solid #696969"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={thStyle}>Username</TableCell>
                            <TableCell style={thStyle}>Name</TableCell>
                            <TableCell style={thStyle}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{this.renderTableRows()}</TableBody>
                </Table>
                <TablePagination
                    style={{margin: "0 3em 2em 0", fontWeight: "bold !important"}}
                    rowsPerPageOptions={[5, 10, 15]}
                    count={this.props.users.length}
                    component="div"
                    page={this.state.currPage}
                    rowsPerPage={this.state.rowsPerPage}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </React.Fragment>
        );
    }
}
