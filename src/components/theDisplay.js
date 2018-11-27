import React, { Component } from 'react';


class TheDisplay extends Component {

    render() {

        var sort = this.props.sort;
        var order = "ASC";
        if (sort.indexOf("DESC_") >= 0) {

            sort = sort.replace("DESC_", "");
            order = "DESC";

        }

        return (
            <div className="thedisplay">
                Sort by {sort},
                <br />
                order - {order}.
            </div>

        );
    }
}



export default TheDisplay;