import React, { Component } from 'react';


class AddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            birthdate: '',
            email: '',
            children: ''
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onInputChange(event) {
        let val = event.target.value;
        if (event.target.name === 'children') {
            val = event.target.value.replace(/\D/g, '');
        }
        this.setState({ [event.target.name]: val });
    }
    onFormSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        this.props.addUser(data);
        this.setState({
            name: '',
            birthdate: '',
            email: '',
            children: ''
        });

    }
    render() {
        return (
            <form onSubmit={this.onFormSubmit} className="input-group">
                <input
                    name="name"
                    placeholder="Enter User name"
                    value={this.state.name}
                    onChange={this.onInputChange} />
                <input
                    name="birthdate"
                    placeholder="Enter birthdate"
                    type="date"
                    value={this.state.birthdate}
                    onChange={this.onInputChange} />
                <input
                    name="email"
                    placeholder="Enter email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onInputChange} />
                <input
                    name="children"
                    placeholder="Amount of children"
                    value={this.state.children}
                    onChange={this.onInputChange} />

                <span className="input-group-btn">
                    <button type="submit" className="btn btn-secondary">Add User</button>
                </span>
            </form>
        );
    }
}



export default AddForm;