import React, { Component } from 'react';
import axios from 'axios';
import AddForm from './addForm';
import TheTable from './theTable';
import SearchForm from './searchForm';
import TheDisplay from './theDisplay';
import Pagination from './pagination';
import '../App.css';

const ROOT_URL = `http://beta.polishgirl4u.com/modules/eggapi.php`;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      results: '',
      term: '',
      sort: 'name',
      pages: 1,
      page: 1
    };

    this.fetchUsers = this.fetchUsers.bind(this);
    this.addUser = this.addUser.bind(this);


  }



  async addUser(formdata) {
    await axios.post(
      ROOT_URL,
      formdata,
      {
        params: { a: 'add' },
        'Content-Type': 'multipart/form-data'
      })
    this.fetchUsers();
  }

  async fetchUsers(term = null, page = null, sort = null) {


    if (term !== null) { this.setState({ term: term }); } else { term = this.state.term; }
    if (page !== null) { this.setState({ page: page }); } else { page = this.state.page; }
    if (sort !== null) { this.setState({ sort: sort }); } else { sort = this.state.sort; }

    const response = await axios
      .get(ROOT_URL, {
        params: {
          a:    'get',
          term: term,
          page: page,
          sort: sort
        }
      })
    this.setState({ results: response.data.users });
    this.setState({ pages: response.data.pages });
  }


  componentDidMount() {
    this.fetchUsers(null, null, 'name');
  }

  render() {
    console.log(this.state.results);
    return (
      <div className="App">
        <AddForm addUser={this.addUser} />
        <TheDisplay sort={this.state.sort} />
        <SearchForm fetchUsers={this.fetchUsers} />
        <TheTable results={this.state.results} fetchUsers={this.fetchUsers} />
        <Pagination pages={this.state.pages} page={this.state.page} fetchUsers={this.fetchUsers} />
      </div>
    );
  }
}

export default App;
