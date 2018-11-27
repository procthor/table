import React, { Component } from 'react';


class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = { term: '' };

        this.onInputChange = this.onInputChange.bind(this);

    }

    onInputChange(event) {
        this.setState({ term: event.target.value });
        this.props.fetchUsers(event.target.value, null, null);

    }

    render() {
        return (

            <input
                name="term"
                placeholder="Filter by phrase"
                className="term"
                value={this.state.term}
                onChange={this.onInputChange} />


        );
    }
}



export default SearchForm;