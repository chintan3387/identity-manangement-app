import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loader = props => (
    <div>
        <CircularProgress style={{margin: "20px 0"}} />
    </div>
);

export default Loader;
