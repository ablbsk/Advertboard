import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchAdverts } from '../../actions/filter-action';

class Search extends Component {

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.searchAdverts(this.state.search);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" id="search" onChange={this.handleChange} />
        <button>Search</button>
      </form>
    );
  };
}

const mapDispatchToProps =  {
  searchAdverts
};

export default connect(null, mapDispatchToProps)(Search);
