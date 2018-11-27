import React, { Component } from 'react';


class Pagination extends Component {
    constructor(props) {
        super(props);
 

        this.changePage = this.changePage.bind(this);
    }

    renderPages(pages) {
        var pageCount = [];
        for (let i = 1; i <= pages; i++) { pageCount.push(i); }
        return pageCount.map((i) => {
            return (
                <div onClick={this.changePage} id={i} key={i}>{i}</div>
            );
        });
    }

    changePage(event) {
        event.preventDefault();
        this.props.fetchUsers(null, event.target.id, null);
    }

    handleOnClick(e) {
        var sort = e.target.id;
        if (this.state.sort === e.target.id) { sort = 'DESC_' + e.target.id; }
        this.setState({ sort: sort });
        this.props.fetchUsers(null, null, sort);
    }

    render() {

        if (this.props.pages <= 1) {
            return (
                <div></div>
            )
        }

        return (
            <div className="pagination">
                {this.renderPages(this.props.pages)}
            </div>

        );
    }
}



export default Pagination;