import React, { Component } from 'react';


class TheTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sort: 'name',

        };
        this.handleOnClick = this.handleOnClick.bind(this);

    }
    renderResults() {
        return this.props.results.map((user) => {
            return (
                <tr key={user.id}>
                    <td> {user.birthdate} </td>
                    <td >
                        {user.name}
                    </td>
                    <td>
                        {user.email}
                    </td>
                    <td>
                        {user.children}
                    </td>
                </tr>
            );
        });
    }


    handleOnClick(e) {
        var sort = e.target.id;
        if (this.state.sort === e.target.id) { sort = 'DESC_' + e.target.id; }
        this.setState({ sort: sort });
        this.props.fetchUsers(null, null, sort);
    }
    render() {

        if (this.props.results.length < 1) {
            return (
                <div>
                    No results
                </div>


            )
        }

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th onClick={this.handleOnClick} id="birthdate">Birthdate</th>
                            <th onClick={this.handleOnClick} id="name">Name</th>
                            <th onClick={this.handleOnClick} id="email">Email</th>
                            <th onClick={this.handleOnClick} id="children">Children</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.renderResults(this.props.results)}
                    </tbody>
                </table>
            </div>

        );
    }
}



export default TheTable;